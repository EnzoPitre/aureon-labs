import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

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

  const { data, error } = await supabaseAdmin
    .from("promo_codes")
    .insert({
      code: code.toUpperCase().trim(),
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
