import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const { code, subtotal } = (await req.json()) as { code?: string; subtotal?: number };

  if (!code || typeof subtotal !== "number") {
    return NextResponse.json({ valid: false, error: "Code requis" }, { status: 400 });
  }

  const normalizedCode = code.toUpperCase().trim();

  const { data: promo } = await supabaseAdmin
    .from("promo_codes")
    .select("*")
    .eq("code", normalizedCode)
    .single();

  if (!promo || !promo.is_active) {
    return NextResponse.json({ valid: false, error: "Code promo invalide." });
  }

  if (promo.expires_at && new Date(promo.expires_at) < new Date()) {
    return NextResponse.json({ valid: false, error: "Ce code promo a expiré." });
  }

  if (promo.max_uses && promo.current_uses >= promo.max_uses) {
    return NextResponse.json({ valid: false, error: "Ce code promo n'est plus disponible." });
  }

  const promotionCodes = await stripe.promotionCodes.list({ code: normalizedCode, active: true, limit: 1 });
  const stripePromotionCode = promotionCodes.data[0];

  if (!stripePromotionCode) {
    return NextResponse.json({
      valid: false,
      error: "Ce code n'est pas encore actif sur Stripe. Contacte le support.",
    });
  }

  const discountAmount =
    promo.discount_type === "percentage"
      ? Math.round(subtotal * (promo.discount_value / 100) * 100) / 100
      : Math.min(promo.discount_value, subtotal);

  return NextResponse.json({
    valid: true,
    code: normalizedCode,
    discountType: promo.discount_type,
    discountValue: promo.discount_value,
    discountAmount,
    stripePromotionCodeId: stripePromotionCode.id,
  });
}
