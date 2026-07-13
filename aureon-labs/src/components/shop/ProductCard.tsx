"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore, useWishlistStore } from "@/lib/store";
import Toast, { useToast } from "@/components/ui/Toast";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCartStore();
  const { toggle, has } = useWishlistStore();
  const { toast, show, hide } = useToast();
  const wished = has(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    show(`${product.name} ajouté au panier`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
  };

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: "relative" }}
      >
        {/* Image */}
        <Link href={`/shop/${product.slug}`} style={{ display: "block" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "100%",
              background: "#ffffff",
              overflow: "hidden",
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{
                objectFit: "contain",
                padding: "1.5rem",
                transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transform: hovered ? "scale(1.05)" : "scale(1)",
                filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.4))",
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              style={{
                position: "absolute",
                top: "0.875rem",
                right: "0.875rem",
                background: "rgba(255,255,255,0.7)",
                border: "1px solid #d4d4d8",
                cursor: "pointer",
                color: wished ? "#18181b" : "#a1a1aa",
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(8px)",
                transition: "color 0.2s, border-color 0.2s",
                opacity: hovered ? 1 : 0,
              }}
              title={wished ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
            >
              <Heart size={11} fill={wished ? "#18181b" : "none"} strokeWidth={1.5} />
            </button>

            {/* Badge */}
            {product.badge && (
              <div
                style={{
                  position: "absolute",
                  top: "0.875rem",
                  left: "0.875rem",
                  background: "rgba(255,255,255,0.8)",
                  border: "1px solid #d4d4d8",
                  color: "#64646c",
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.2rem 0.5rem",
                  backdropFilter: "blur(8px)",
                }}
              >
                {product.badge}
              </div>
            )}

            {/* Slide-up add bar */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(12px)",
                borderTop: "1px solid #e4e4e7",
                padding: "0.625rem 1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transform: hovered ? "translateY(0)" : "translateY(100%)",
                transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <button
                onClick={handleAddToCart}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#18181b",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: 0,
                  fontFamily: "inherit",
                }}
              >
                <Plus size={11} strokeWidth={2.5} />
                Ajouter
              </button>
              {onQuickView && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onQuickView(product);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#a1a1aa",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: 0,
                    fontFamily: "inherit",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#64646c")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#a1a1aa")}
                >
                  Aperçu
                </button>
              )}
            </div>
          </div>
        </Link>

        {/* Info */}
        <div style={{ padding: "0.875rem 0 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: "0.5rem",
            }}
          >
            <Link href={`/shop/${product.slug}`} style={{ textDecoration: "none", minWidth: 0 }}>
              <h3
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#18181b",
                  letterSpacing: "0",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s",
                }}
              >
                {product.name}
              </h3>
            </Link>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 300,
                color: "#18181b",
                flexShrink: 0,
                letterSpacing: "-0.01em",
              }}
            >
              {formatPrice(product.price)}
            </span>
          </div>
          <div
            style={{
              marginTop: "0.2rem",
              fontSize: "11px",
              color: "#d1d1d6",
              letterSpacing: "0.02em",
            }}
          >
            <span style={{ color: "#f59e0b" }}>★</span> {product.rating} · {product.reviewCount} avis
          </div>
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} onClose={hide} />
    </>
  );
}
