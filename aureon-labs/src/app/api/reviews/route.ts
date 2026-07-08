import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "productId requis" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ reviews: data });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { productId, userId, rating, title, comment } = body;

  if (!productId || !userId || !rating || !comment) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Note invalide (1-5)" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      product_id: productId,
      user_id: userId,
      rating,
      title: title?.slice(0, 120) ?? "",
      comment: comment.slice(0, 500),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ review: data }, { status: 201 });
}
