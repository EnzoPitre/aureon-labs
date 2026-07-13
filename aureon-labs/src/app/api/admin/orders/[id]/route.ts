import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const update: { admin_status?: string; tracking_number?: string } = {};

  if (typeof body.admin_status === "string") update.admin_status = body.admin_status;
  if (typeof body.tracking_number === "string") update.tracking_number = body.tracking_number;

  const { error } = await supabaseAdmin.from("orders").update(update).eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
