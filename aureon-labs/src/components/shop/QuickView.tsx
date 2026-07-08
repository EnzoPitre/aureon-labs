"use client";

import { X, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import Toast, { useToast } from "@/components/ui/Toast";

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: QuickViewProps) {
  const { addItem } = useCartStore();
  const { toast, show, hide } = useToast();

  if (!product) return null;

  const handleAdd = () => {
    addItem(product);
    show(`${product.name} ajouté au panier`);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.65)",
          zIndex: 300,
          backdropFilter: "blur(8px)",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 301,
          width: "min(720px, 94vw)",
          background: "#080808",
          border: "1px solid #1e1e1e",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          animation: "fade-up 0.25s ease-out",
        }}
        className="quickview-grid"
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            minHeight: "380px",
            background: "#0a0a0a",
            borderRight: "1px solid #1e1e1e",
          }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{
              objectFit: "contain",
              padding: "2rem",
              filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.5))",
            }}
          />
        </div>

        {/* Info */}
        <div
          style={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              alignSelf: "flex-end",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#3a3a3a",
              padding: 0,
              marginBottom: "1.5rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#efefef")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#3a3a3a")}
          >
            <X size={16} strokeWidth={1.5} />
          </button>

          <div className="label" style={{ marginBottom: "0.75rem" }}>
            Aureon Labs
          </div>

          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              color: "#efefef",
              marginBottom: "0.75rem",
              lineHeight: 1.1,
            }}
          >
            {product.name}
          </h2>

          <div
            style={{
              fontSize: "11px",
              color: "#3a3a3a",
              letterSpacing: "0.04em",
              marginBottom: "1.25rem",
            }}
          >
            ★ {product.rating} · {product.reviewCount} avis
          </div>

          <p
            style={{
              color: "#5a5a5a",
              fontSize: "13px",
              lineHeight: 1.75,
              marginBottom: "2rem",
            }}
          >
            {product.description}
          </p>

          {/* Price + stock */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "2rem",
              paddingBottom: "1.5rem",
              borderBottom: "1px solid #1e1e1e",
            }}
          >
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                color: "#efefef",
              }}
            >
              {formatPrice(product.price)}
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "11px",
                color: "#3a3a3a",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  flexShrink: 0,
                }}
              />
              En stock
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginTop: "auto" }}>
            <button
              onClick={handleAdd}
              className="btn-primary"
              style={{ width: "100%", fontSize: "10px", justifyContent: "center" }}
            >
              <Plus size={11} strokeWidth={2.5} />
              Ajouter au panier
            </button>
            <Link
              href={`/shop/${product.slug}`}
              onClick={onClose}
              className="btn-secondary"
              style={{ width: "100%", textAlign: "center", fontSize: "10px" }}
            >
              Voir le produit complet
            </Link>
          </div>
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} onClose={hide} />

      <style>{`
        @media (max-width: 560px) {
          .quickview-grid {
            grid-template-columns: 1fr !important;
          }
          .quickview-grid > *:first-child {
            min-height: 240px !important;
          }
        }
      `}</style>
    </>
  );
}
