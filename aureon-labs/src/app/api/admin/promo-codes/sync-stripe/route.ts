import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { stripe } from "@/lib/stripe";

export async function POST() {
  const { data: promoCodes, error } = await supabaseAdmin.from("promo_codes").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const results: { code: string; status: string }[] = [];

  for (const promo of promoCodes) {
    try {
      const existing = await stripe.promotionCodes.list({ code: promo.code, limit: 1 });
      if (existing.data.length > 0) {
        results.push({ code: promo.code, status: "déjà sur Stripe" });
        continue;
      }

      const coupon = await stripe.coupons.create(
        promo.discount_type === "percentage"
          ? { percent_off: promo.discount_value, duration: "once" }
          : { amount_off: Math.round(promo.discount_value * 100), currency: "eur", duration: "once" }
      );

      await stripe.promotionCodes.create({
        promotion: { type: "coupon", coupon: coupon.id },
        code: promo.code,
        active: promo.is_active,
        max_redemptions: promo.max_uses || undefined,
        expires_at: promo.expires_at ? Math.floor(new Date(promo.expires_at).getTime() / 1000) : undefined,
      });

      results.push({ code: promo.code, status: "créé sur Stripe" });
    } catch (err) {
      results.push({ code: promo.code, status: `erreur: ${err instanceof Error ? err.message : "inconnue"}` });
    }
  }

  return NextResponse.json({ results });
}
