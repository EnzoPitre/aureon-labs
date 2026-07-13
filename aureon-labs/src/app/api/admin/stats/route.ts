import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data: orders, error } = await supabaseAdmin
    .from("orders")
    .select("amount, status, admin_status, created_at");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const paidOrders = orders.filter((o) => o.status === "paid");
  const revenue = paidOrders.reduce((sum, o) => sum + o.amount, 0);
  const aov = paidOrders.length > 0 ? revenue / paidOrders.length : 0;

  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
  const revenue30d = paidOrders
    .filter((o) => new Date(o.created_at).getTime() >= thirtyDaysAgo)
    .reduce((sum, o) => sum + o.amount, 0);

  const pendingFulfillment = paidOrders.filter(
    (o) => o.admin_status === "en_preparation"
  ).length;

  return NextResponse.json({
    revenue,
    revenue30d,
    orderCount: paidOrders.length,
    aov,
    pendingFulfillment,
  });
}
