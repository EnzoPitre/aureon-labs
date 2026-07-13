import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { stripe } from "@/lib/stripe";

async function setStripePromotionCodeActive(code: string, active: boolean) {
  const existing = await stripe.promotionCodes.list({ code, limit: 1 });
  const promotionCode = existing.data[0];
  if (promotionCode) {
    await stripe.promotionCodes.update(promotionCode.id, { active });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const update: { is_active?: boolean; show_on_site?: boolean } = {};

  if (typeof body.is_active === "boolean") update.is_active = body.is_active;
  if (typeof body.show_on_site === "boolean") update.show_on_site = body.show_on_site;

  if (typeof update.is_active === "boolean") {
    const { data: promo } = await supabaseAdmin
      .from("promo_codes")
      .select("code")
      .eq("id", id)
      .single();

    if (promo) {
      try {
        await setStripePromotionCodeActive(promo.code, update.is_active);
      } catch (error) {
        console.error("[PROMO CODES] Stripe sync failed:", error);
      }
    }
  }

  const { error } = await supabaseAdmin.from("promo_codes").update(update).eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data: promo } = await supabaseAdmin
    .from("promo_codes")
    .select("code")
    .eq("id", id)
    .single();

  if (promo) {
    try {
      // Stripe promotion codes can't be deleted, only deactivated.
      await setStripePromotionCodeActive(promo.code, false);
    } catch (error) {
      console.error("[PROMO CODES] Stripe deactivation failed:", error);
    }
  }

  const { error } = await supabaseAdmin.from("promo_codes").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
