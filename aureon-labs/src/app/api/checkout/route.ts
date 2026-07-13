import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items } = body as {
      items: { productId: string; quantity: number }[];
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const lineItems = await Promise.all(
      items.map(async (item) => {
        const prices = await stripe.prices.list({
          product: item.productId,
          active: true,
          limit: 1,
        });

        const activePrice = prices.data[0];
        if (!activePrice) {
          throw new Error(`Aucun prix actif pour le produit ${item.productId}`);
        }

        return { price: activePrice.id, quantity: item.quantity };
      })
    );

    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      allow_promotion_codes: true,
      success_url: `${origin}/account?order=success`,
      cancel_url: `${origin}/cart`,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH", "CA", "US"],
      },
      locale: "fr",
      metadata: {
        source: "aureon-labs-web",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[CHECKOUT]", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du checkout" },
      { status: 500 }
    );
  }
}
