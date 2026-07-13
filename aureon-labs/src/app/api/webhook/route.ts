import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getProductByStripeProductId } from "@/lib/products";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("[WEBHOOK] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("[WEBHOOK] Payment completed:", session.id);

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 100,
        expand: ["data.price.product"],
      });

      const items = lineItems.data.map((li) => {
        const stripeProduct = li.price?.product;
        const productId = typeof stripeProduct === "string" ? stripeProduct : stripeProduct?.id;
        const product = productId ? getProductByStripeProductId(productId) : undefined;
        return {
          slug: product?.slug ?? null,
          name: product?.name ?? li.description ?? "Article",
          priceId: li.price?.id ?? null,
          quantity: li.quantity ?? 1,
          unitAmount: li.price?.unit_amount ?? 0,
        };
      });

      const { error: orderError } = await supabaseAdmin.from("orders").upsert(
        {
          stripe_session_id: session.id,
          customer_email: session.customer_details?.email ?? session.customer_email ?? null,
          amount: session.amount_total ?? 0,
          currency: session.currency ?? "eur",
          items,
          status: session.payment_status === "paid" ? "paid" : "pending",
        },
        { onConflict: "stripe_session_id" }
      );

      if (orderError) {
        console.error("[WEBHOOK] Failed to create order:", orderError);
        break;
      }

      for (const item of items) {
        if (!item.slug) continue;
        const { data: stockRow } = await supabaseAdmin
          .from("product_stock")
          .select("quantity")
          .eq("slug", item.slug)
          .single();

        if (stockRow) {
          await supabaseAdmin
            .from("product_stock")
            .update({ quantity: Math.max(stockRow.quantity - item.quantity, 0) })
            .eq("slug", item.slug);
        }
      }

      break;
    }

    case "payment_intent.payment_failed": {
      const intent = event.data.object as Stripe.PaymentIntent;
      console.error("[WEBHOOK] Payment failed:", intent.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
