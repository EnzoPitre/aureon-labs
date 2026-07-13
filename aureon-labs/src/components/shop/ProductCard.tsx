"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import Toast, { useToast } from "@/components/ui/Toast";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { toast, show, hide } = useToast();

  const handleAddToCart = () => {
    addItem(product);
    show(`${product.name} ajouté au panier`);
  };

  return (
    <>
      <div
        style={{
          border: "1px solid #d8cfc0",
          background: "#f1ede7",
        }}
      >
        <Link href={`/shop/${product.slug}`} style={{ display: "block" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "100%",
              background: "#ffffff",
              borderBottom: "1px solid #d8cfc0",
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: "contain", padding: "1rem" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            {product.badge && (
              <div
                style={{
                  position: "absolute",
                  top: "0.625rem",
                  left: "0.625rem",
                  background: "#282828",
                  color: "#f1ede7",
                  fontSize: "10px",
                  fontWeight: 600,
                  padding: "0.2rem 0.5rem",
                }}
              >
                {product.badge}
              </div>
            )}
          </div>
        </Link>

        <div style={{ padding: "0.875rem" }}>
          <Link href={`/shop/${product.slug}`} style={{ textDecoration: "none" }}>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#282828",
                marginBottom: "0.25rem",
              }}
            >
              {product.name}
            </h3>
          </Link>
          <div style={{ fontSize: "12px", color: "#6b6459", marginBottom: "0.5rem" }}>
            <span style={{ color: "#f59e0b" }}>★</span> {product.rating} ({product.reviewCount} avis)
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#282828" }}>
              {formatPrice(product.price)}
            </span>
            <button
              onClick={handleAddToCart}
              className="btn-primary"
              style={{ padding: "0.5rem 0.875rem", fontSize: "11px" }}
            >
              Ajouter
            </button>
          </div>
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              style={{
                marginTop: "0.5rem",
                width: "100%",
                background: "none",
                border: "1px solid #d8cfc0",
                cursor: "pointer",
                color: "#4a4540",
                fontSize: "11px",
                padding: "0.4rem",
              }}
            >
              Aperçu rapide
            </button>
          )}
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} onClose={hide} />
    </>
  );
}
