import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { stripe } from "@/lib/stripe";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("promo_codes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ promoCodes: data });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { code, label, discount_type, discount_value, max_uses, expires_at, show_on_site } = body;

  if (!code || !discount_type || discount_value === undefined) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  const normalizedCode = code.toUpperCase().trim();

  try {
    const coupon = await stripe.coupons.create(
      discount_type === "percentage"
        ? { percent_off: discount_value, duration: "once" }
        : { amount_off: Math.round(discount_value * 100), currency: "eur", duration: "once" }
    );

    await stripe.promotionCodes.create({
      promotion: { type: "coupon", coupon: coupon.id },
      code: normalizedCode,
      max_redemptions: max_uses || undefined,
      expires_at: expires_at ? Math.floor(new Date(expires_at).getTime() / 1000) : undefined,
    });
  } catch (error) {
    console.error("[PROMO CODES] Stripe creation failed:", error);
    return NextResponse.json(
      { error: "Ce code n'a pas pu être créé sur Stripe (peut-être déjà utilisé)." },
      { status: 500 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("promo_codes")
    .insert({
      code: normalizedCode,
      label: label || null,
      discount_type,
      discount_value,
      max_uses: max_uses || null,
      expires_at: expires_at || null,
      show_on_site: show_on_site ?? true,
      is_active: true,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ promoCode: data });
}
