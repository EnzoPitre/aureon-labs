"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const total = totalPrice();
  const shipping = items.length > 0 ? 4.99 : 0;
  const grandTotal = total + shipping;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.product.stripeProductId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Erreur lors de la création du checkout");
      }

      window.location.href = data.url;
    } catch {
      setError("Impossible de démarrer le paiement. Réessaie dans un instant.");
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: "100px", minHeight: "100vh" }}>
      <div className="container-main" style={{ paddingBottom: "4rem" }}>
        <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "2.5rem" }}>
          Votre panier
        </h1>

        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 0" }}>
            <ShoppingBag size={64} style={{ margin: "0 auto 1.5rem", color: "#c7c7cc" }} />
            <h2 style={{ fontWeight: 600, marginBottom: "0.75rem", color: "#52525b" }}>
              Votre panier est vide
            </h2>
            <p style={{ color: "#71717a", marginBottom: "2rem" }}>
              Découvrez notre collection de bracelets premium.
            </p>
            <Link href="/shop" className="btn-primary">
              Explorer la collection
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: "3rem",
              alignItems: "start",
            }}
            className="cart-grid"
          >
            {/* Items */}
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      padding: "1.5rem",
                      background: "#f7f7f8",
                      borderRadius: "10px",
                      border: "1px solid #ececef",
                      alignItems: "center",
                    }}
                  >
                    {/* Image */}
                    <div style={{ position: "relative", width: 88, height: 88, flexShrink: 0, borderRadius: "8px", overflow: "hidden", background: "#ececef" }}>
                      <Image src={item.product.image} alt={item.product.name} fill style={{ objectFit: "cover" }} />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link href={`/shop/${item.product.slug}`} style={{ textDecoration: "none" }}>
                        <h3 style={{ fontWeight: 600, marginBottom: "0.25rem", fontSize: "1rem" }}>{item.product.name}</h3>
                      </Link>
                      <p style={{ color: "#71717a", fontSize: "0.875rem", marginBottom: "0.75rem" }}>
                        {item.product.tagline || item.product.description}
                      </p>
                      <span style={{ color: "#52525b", fontSize: "0.875rem" }}>
                        {formatPrice(item.product.price)} / pièce
                      </span>
                    </div>

                    {/* Qty */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#ececef", borderRadius: "8px", padding: "0.375rem 0.5rem" }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#52525b", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}
                      >
                        −
                      </button>
                      <span style={{ minWidth: "24px", textAlign: "center", fontWeight: 600, fontSize: "0.9rem" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#52525b", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}
                      >
                        +
                      </button>
                    </div>

                    {/* Line total */}
                    <div style={{ textAlign: "right", minWidth: "80px" }}>
                      <span style={{ fontWeight: 700, fontSize: "1rem" }}>
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#71717a", padding: "0.25rem", flexShrink: 0 }}
                      title="Retirer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <Link
                href="/shop"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "2rem",
                  color: "#52525b",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                }}
              >
                <ArrowLeft size={16} />
                Continuer les achats
              </Link>
            </div>

            {/* Summary */}
            <div
              style={{
                background: "#f7f7f8",
                borderRadius: "12px",
                border: "1px solid #ececef",
                padding: "1.75rem",
                position: "sticky",
                top: "88px",
              }}
            >
              <h2 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "1.5rem" }}>
                Récapitulatif
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#52525b" }}>Sous-total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#52525b" }}>Livraison</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#71717a", fontSize: "0.8rem" }}>TVA (20%)</span>
                  <span style={{ color: "#71717a", fontSize: "0.8rem" }}>Incluse</span>
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid #ececef",
                  paddingTop: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                }}
              >
                <span style={{ fontWeight: 700 }}>Total</span>
                <span style={{ fontWeight: 700, fontSize: "1.25rem" }}>
                  {formatPrice(grandTotal)}
                </span>
              </div>

              {error && (
                <div
                  style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.25)",
                    borderRadius: "6px",
                    padding: "0.625rem 0.875rem",
                    color: "#ef4444",
                    fontSize: "0.8rem",
                    marginBottom: "1rem",
                  }}
                >
                  {error}
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", padding: "1rem", fontSize: "1rem", opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "..." : "Passer la commande"}
              </button>

              <p style={{ color: "#71717a", fontSize: "0.75rem", textAlign: "center", marginTop: "1rem" }}>
                Paiement sécurisé via Stripe. Vos données sont protégées.
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cart-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
