"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { getFeaturedProducts } from "@/lib/products";
import QuickView from "@/components/shop/QuickView";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import Toast, { useToast } from "@/components/ui/Toast";

const BADGES: Record<string, { label: string; cls: string }> = {
  "the-crown":    { label: "🔥 Best-seller #1", cls: "badge-hot" },
  "grand-prix":   { label: "🔥 Best-seller",    cls: "badge-hot" },
  "heritage-blue":{ label: "🔥 Best-seller",    cls: "badge-hot" },
  "padel-ace":    { label: "✨ Populaire",       cls: "badge-new" },
};

const STOCK_LABELS: Record<string, string> = {
  "the-crown":    "Plus que 4 en stock !",
  "grand-prix":   "Stock limité",
  "scuderia":     "Dernières unités",
};

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: "var(--amber)", fontSize: "11px", letterSpacing: "0.05em" }}>
      {"★".repeat(Math.round(rating))}
      {"☆".repeat(5 - Math.round(rating))}
    </span>
  );
}

export default function FeaturedCollection() {
  const featured = getFeaturedProducts();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [heroHovered, setHeroHovered] = useState(false);
  const { addItem } = useCartStore();
  const { toast, show, hide } = useToast();
  const heroProduct = featured[0];
  const gridProducts = featured.slice(1);

  return (
    <section style={{ padding: "7rem 0" }}>
      <div className="container-main">
        {/* Section header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3rem",
            paddingBottom: "1.75rem",
            borderBottom: "1px solid #e4e4e7",
          }}
        >
          <div>
            <div className="label" style={{ marginBottom: "0.5rem" }}>
              Collection phare
            </div>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                color: "#18181b",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Nos best-sellers
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
            <div style={{ fontSize: "12px", color: "var(--amber)" }}>
              ★★★★★{" "}
              <span style={{ color: "#64646c" }}>2 847 avis · 4.8/5</span>
            </div>
            <Link
              href="/shop"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#a1a1aa",
                textDecoration: "none",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#18181b")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#a1a1aa")}
            >
              Voir les 15 designs <ArrowRight size={11} strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            background: "#e4e4e7",
          }}
          className="featured-grid"
        >
          {/* Hero product */}
          {heroProduct && (
            <div
              style={{
                background: "#ffffff",
                position: "relative",
                overflow: "hidden",
                gridRow: "span 2",
              }}
              onMouseEnter={() => setHeroHovered(true)}
              onMouseLeave={() => setHeroHovered(false)}
            >
              {/* Badge */}
              {BADGES[heroProduct.slug] && (
                <div style={{ position: "absolute", top: "1rem", left: "1rem", zIndex: 2 }}>
                  <span className={BADGES[heroProduct.slug].cls}>
                    {BADGES[heroProduct.slug].label}
                  </span>
                </div>
              )}

              <Link href={`/shop/${heroProduct.slug}`} style={{ display: "block" }}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "110%",
                    background: "#ffffff",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={heroProduct.image}
                    alt={heroProduct.name}
                    fill
                    style={{
                      objectFit: "contain",
                      padding: "2.5rem",
                      transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      transform: heroHovered ? "scale(1.05)" : "scale(1)",
                      filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.5))",
                    }}
                    priority
                    sizes="50vw"
                  />
                </div>
              </Link>

              <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
                {/* Stock indicator */}
                {STOCK_LABELS[heroProduct.slug] && (
                  <div style={{ marginBottom: "0.625rem" }}>
                    <span className="badge-stock">⚡ {STOCK_LABELS[heroProduct.slug]}</span>
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.625rem",
                  }}
                >
                  <div>
                    <Link href={`/shop/${heroProduct.slug}`} style={{ textDecoration: "none" }}>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "#18181b",
                          marginBottom: "0.25rem",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {heroProduct.name}
                      </h3>
                    </Link>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Stars rating={heroProduct.rating} />
                      <span style={{ fontSize: "11px", color: "#8b8b93" }}>
                        ({heroProduct.reviewCount} avis)
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: "18px", fontWeight: 600, color: "#18181b" }}>
                    {formatPrice(heroProduct.price)}
                  </span>
                </div>

                {/* Add to cart — full width, prominent */}
                <button
                  onClick={() => {
                    addItem(heroProduct);
                    show(`${heroProduct.name} ajouté au panier`);
                  }}
                  className="btn-primary"
                  style={{
                    width: "100%",
                    marginTop: "0.75rem",
                    padding: "0.875rem",
                    gap: "0.5rem",
                  }}
                >
                  <ShoppingBag size={13} strokeWidth={2} />
                  Ajouter au panier
                </button>
              </div>
            </div>
          )}

          {/* Grid products */}
          {gridProducts.map((product) => (
            <div
              key={product.id}
              style={{ background: "#ffffff", position: "relative" }}
            >
              {/* Badge */}
              {BADGES[product.slug] && (
                <div style={{ position: "absolute", top: "0.875rem", left: "0.875rem", zIndex: 2 }}>
                  <span className={BADGES[product.slug].cls}>
                    {BADGES[product.slug].label}
                  </span>
                </div>
              )}

              <Link href={`/shop/${product.slug}`} style={{ display: "block" }}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "80%",
                    background: "#ffffff",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector("img");
                    if (img) (img as HTMLElement).style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector("img");
                    if (img) (img as HTMLElement).style.transform = "scale(1)";
                  }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{
                      objectFit: "contain",
                      padding: "1.5rem",
                      transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.4))",
                    }}
                    sizes="25vw"
                  />
                </div>
              </Link>

              <div style={{ padding: "0.875rem 1rem 1rem" }}>
                {STOCK_LABELS[product.slug] && (
                  <div style={{ marginBottom: "0.4rem" }}>
                    <span className="badge-stock">⚡ {STOCK_LABELS[product.slug]}</span>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.375rem" }}>
                  <Link href={`/shop/${product.slug}`} style={{ textDecoration: "none" }}>
                    <span style={{ fontSize: "13px", fontWeight: 500, color: "#18181b" }}>
                      {product.name}
                    </span>
                  </Link>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#18181b" }}>
                    {formatPrice(product.price)}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    <Stars rating={product.rating} />
                    <span style={{ fontSize: "10px", color: "#8b8b93" }}>({product.reviewCount})</span>
                  </div>
                  <button
                    onClick={() => {
                      addItem(product);
                      show(`${product.name} ajouté au panier`);
                    }}
                    style={{
                      background: "var(--cyan)",
                      border: "none",
                      cursor: "pointer",
                      color: "#ffffff",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.2s",
                      fontSize: "16px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cyan-dark)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "var(--cyan)")}
                    title="Ajouter au panier"
                  >
                    <ShoppingBag size={13} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/shop" className="btn-primary" style={{ padding: "1rem 2.5rem" }}>
            Voir les 15 designs exclusifs
            <ArrowRight size={13} strokeWidth={2.5} />
          </Link>
          <p style={{ marginTop: "0.875rem", fontSize: "12px", color: "#8b8b93" }}>
            Livraison gratuite dès 35€ · Retours 30 jours
          </p>
        </div>
      </div>

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      <Toast message={toast.message} visible={toast.visible} onClose={hide} />

      <style>{`
        @media (max-width: 768px) {
          .featured-grid {
            grid-template-columns: 1fr !important;
          }
          .featured-grid > *:first-child {
            grid-row: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
