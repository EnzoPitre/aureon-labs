"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Star, Package, Ruler, Weight } from "lucide-react";
import { Product, Review } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore, useWishlistStore } from "@/lib/store";
import ProductCard from "@/components/shop/ProductCard";
import Toast, { useToast } from "@/components/ui/Toast";

interface Props {
  product: Product;
  related: Product[];
}

const mockReviews: Review[] = [
  {
    id: "1",
    productId: "1",
    userId: "u1",
    userName: "Antoine M.",
    rating: 5,
    title: "Qualité exceptionnelle",
    comment: "Je suis bluffé par la qualité de ce bracelet. Confortable toute la journée, même pendant mes entraînements les plus intenses. Le design est sobre et élégant.",
    helpfulCount: 24,
    createdAt: "2024-11-15",
  },
  {
    id: "2",
    productId: "1",
    userId: "u2",
    userName: "Sophie L.",
    rating: 5,
    title: "Parfait pour le quotidien",
    comment: "Je le porte depuis 3 mois. Il tient bien, se nettoie facilement et reste aussi beau qu'au premier jour. Livraison rapide, packaging premium.",
    helpfulCount: 18,
    createdAt: "2024-10-28",
  },
  {
    id: "3",
    productId: "1",
    userId: "u3",
    userName: "Maxime R.",
    rating: 4,
    title: "Très bon produit",
    comment: "Design au top, matière de qualité. Je mets 4 étoiles car j'aurais aimé un peu plus de variété de tailles. Sinon, c'est excellent.",
    helpfulCount: 9,
    createdAt: "2024-09-12",
  },
];

function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: "2px" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < Math.floor(rating) ? "#f59e0b" : "none"}
          style={{ color: i < Math.floor(rating) ? "#f59e0b" : "#282828" }}
        />
      ))}
    </span>
  );
}

export default function ProductDetail({ product, related }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const { addItem } = useCartStore();
  const { toggle, has } = useWishlistStore();
  const { toast, show, hide } = useToast();
  const wished = has(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    show(`${product.name} ajouté au panier (×${quantity})`);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 600));
    setReviewSubmitted(true);
  };

  const specs = [
    { icon: <Ruler size={13} strokeWidth={1.5} />, label: "Largeur", value: product.specs.width },
    { icon: <Package size={13} strokeWidth={1.5} />, label: "Matière", value: product.specs.material },
    { icon: null, label: "Fermoir", value: product.specs.clasp },
    { icon: null, label: "Type", value: product.specs.type },
    { icon: null, label: "Marque", value: product.specs.brand },
    { icon: <Weight size={13} strokeWidth={1.5} />, label: "Poids", value: product.specs.weight },
  ];

  return (
    <div style={{ paddingTop: "88px" }}>
      {/* Breadcrumb */}
      <div
        className="container-main"
        style={{ paddingTop: "1.25rem", paddingBottom: "1.25rem", borderBottom: "1px solid #1e1e1e" }}
      >
        <nav style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "11px", color: "#3a3a3a", letterSpacing: "0.06em" }}>
          <Link
            href="/"
            style={{ color: "#3a3a3a", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#7a7a7a")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#3a3a3a")}
          >
            ACCUEIL
          </Link>
          <span>/</span>
          <Link
            href="/shop"
            style={{ color: "#3a3a3a", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#7a7a7a")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#3a3a3a")}
          >
            COLLECTION
          </Link>
          <span>/</span>
          <span style={{ color: "#7a7a7a" }}>{product.name.toUpperCase()}</span>
        </nav>
      </div>

      {/* Product hero */}
      <div className="container-main" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}
          className="product-grid"
        >
          {/* Images */}
          <div>
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingTop: "100%",
                background: "#0a0a0a",
                border: "1px solid #1e1e1e",
                overflow: "hidden",
              }}
            >
              <Image
                src={product.images[activeImage] || product.image}
                alt={product.name}
                fill
                style={{
                  objectFit: "contain",
                  padding: "2.5rem",
                  filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.5))",
                }}
                priority
              />
            </div>

            {product.images.length > 1 && (
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      position: "relative",
                      width: "64px",
                      height: "64px",
                      overflow: "hidden",
                      border: `1px solid ${activeImage === i ? "#00d4ff" : "#1e1e1e"}`,
                      cursor: "pointer",
                      padding: 0,
                      background: "#0a0a0a",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill style={{ objectFit: "contain", padding: "0.5rem" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ position: "sticky", top: "72px" }}>
            {product.badge && (
              <div
                className="label"
                style={{
                  display: "inline-block",
                  marginBottom: "1.25rem",
                  color: product.badge === "NOUVEAU" ? "#00d4ff" : "#9b30ff",
                  border: `1px solid ${product.badge === "NOUVEAU" ? "rgba(0,212,255,0.3)" : "rgba(155,48,255,0.3)"}`,
                  padding: "0.2rem 0.625rem",
                  fontSize: "10px",
                }}
              >
                {product.badge}
              </div>
            )}

            <div className="label" style={{ marginBottom: "0.75rem" }}>Aureon Labs</div>

            <h1
              style={{
                fontSize: "clamp(1.75rem, 2.5vw, 2.75rem)",
                fontWeight: 300,
                letterSpacing: "-0.04em",
                marginBottom: "1.25rem",
                lineHeight: 1.05,
                color: "#efefef",
              }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                marginBottom: "1.75rem",
                paddingBottom: "1.75rem",
                borderBottom: "1px solid #1e1e1e",
              }}
            >
              <Stars rating={product.rating} size={13} />
              <span style={{ fontSize: "12px", color: "#5a5a5a", letterSpacing: "0.02em" }}>
                {product.rating} · {product.reviewCount} avis
              </span>
            </div>

            {/* Price */}
            <div
              style={{
                fontSize: "2.25rem",
                fontWeight: 300,
                letterSpacing: "-0.04em",
                color: "#00d4ff",
                marginBottom: "0.625rem",
                lineHeight: 1,
              }}
            >
              {formatPrice(product.price)}
            </div>

            {/* Stock */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.75rem",
                fontSize: "11px",
                color: "#22c55e",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
              En stock — expédié sous 24h
            </div>

            <p style={{ color: "#5a5a5a", lineHeight: 1.75, marginBottom: "2rem", fontSize: "14px" }}>
              {product.description}
            </p>

            {/* Quantity */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.25rem" }}>
              <span className="label" style={{ fontSize: "10px" }}>Quantité</span>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid #1e1e1e" }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    background: "none", border: "none", cursor: "pointer", color: "#5a5a5a",
                    width: "36px", height: "36px", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "16px", lineHeight: 1, transition: "color 0.2s",
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    fontSize: "13px", color: "#efefef", minWidth: "36px", textAlign: "center",
                    borderLeft: "1px solid #1e1e1e", borderRight: "1px solid #1e1e1e",
                    height: "36px", display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    background: "none", border: "none", cursor: "pointer", color: "#5a5a5a",
                    width: "36px", height: "36px", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "16px", lineHeight: 1, transition: "color 0.2s",
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA */}
            <div style={{ display: "flex", gap: "0.625rem", marginBottom: "2.5rem" }}>
              <button
                onClick={handleAddToCart}
                className="btn-primary"
                style={{ flex: 1, justifyContent: "center", fontSize: "10px" }}
              >
                <ShoppingBag size={12} strokeWidth={2} />
                Ajouter au panier
              </button>
              <button
                onClick={() => toggle(product.id)}
                style={{
                  background: wished ? "rgba(155,48,255,0.08)" : "transparent",
                  border: `1px solid ${wished ? "#9b30ff" : "#282828"}`,
                  cursor: "pointer",
                  color: wished ? "#9b30ff" : "#3a3a3a",
                  width: "46px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                  flexShrink: 0,
                }}
                title={wished ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
                onMouseEnter={(e) => {
                  if (!wished) {
                    e.currentTarget.style.borderColor = "#9b30ff";
                    e.currentTarget.style.color = "#9b30ff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!wished) {
                    e.currentTarget.style.borderColor = "#282828";
                    e.currentTarget.style.color = "#3a3a3a";
                  }
                }}
              >
                <Heart size={15} fill={wished ? "#9b30ff" : "none"} strokeWidth={1.5} />
              </button>
            </div>

            {/* Specs — flat table */}
            <div style={{ borderTop: "1px solid #1e1e1e" }}>
              <div className="label" style={{ fontSize: "10px", padding: "1rem 0 0.75rem" }}>
                Spécifications
              </div>
              {specs.map((spec, i) => (
                <div
                  key={spec.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.5rem 0",
                    borderBottom: i < specs.length - 1 ? "1px solid #141414" : "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px", color: "#3a3a3a", display: "flex",
                      alignItems: "center", gap: "0.375rem", letterSpacing: "0.04em",
                    }}
                  >
                    {spec.icon}
                    {spec.label}
                  </span>
                  <span style={{ fontSize: "12px", color: "#7a7a7a" }}>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Story */}
      <div style={{ borderTop: "1px solid #1e1e1e", padding: "5rem 0", background: "#0e0e0e" }}>
        <div className="container-main" style={{ maxWidth: "760px" }}>
          <div className="label" style={{ marginBottom: "1rem", color: "#00d4ff" }}>
            À propos de ce design
          </div>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              marginBottom: "2.5rem",
              color: "#efefef",
              lineHeight: 1.1,
            }}
          >
            L&apos;histoire du{" "}
            <em style={{ fontStyle: "italic", color: "#5a5a5a" }}>{product.name}</em>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {product.story.split("\n\n").map((para, i) => (
              <p key={i} style={{ color: "#5a5a5a", lineHeight: 1.85, fontSize: "15px" }}>
                {para.trim()}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div style={{ padding: "5rem 0", borderTop: "1px solid #1e1e1e" }}>
        <div className="container-main">
          <div
            style={{
              marginBottom: "3rem",
              paddingBottom: "2rem",
              borderBottom: "1px solid #1e1e1e",
            }}
          >
            <div className="label" style={{ marginBottom: "0.75rem" }}>Avis clients</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Stars rating={product.rating} size={15} />
              <span style={{ fontSize: "1.5rem", fontWeight: 300, letterSpacing: "-0.03em", color: "#efefef" }}>
                {product.rating}
              </span>
              <span style={{ fontSize: "12px", color: "#3a3a3a" }}>
                / 5 — {product.reviewCount} avis
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: "720px", marginBottom: "4rem" }}>
            {mockReviews.map((review, i) => (
              <div
                key={review.id}
                style={{
                  padding: "1.75rem 0",
                  borderBottom: i < mockReviews.length - 1 ? "1px solid #1e1e1e" : "none",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <div>
                    <Stars rating={review.rating} size={12} />
                    <p style={{ fontSize: "13px", fontWeight: 500, color: "#efefef", marginTop: "0.4rem" }}>
                      {review.userName}
                    </p>
                  </div>
                  <span style={{ fontSize: "11px", color: "#3a3a3a", letterSpacing: "0.04em" }}>
                    {new Date(review.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <p style={{ fontSize: "13px", fontWeight: 500, color: "#7a7a7a", marginBottom: "0.5rem" }}>
                  {review.title}
                </p>
                <p style={{ color: "#3a3a3a", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>
                  {review.comment}
                </p>
                <div style={{ marginTop: "1rem" }}>
                  <button
                    style={{
                      background: "none",
                      border: "1px solid #1e1e1e",
                      color: "#3a3a3a",
                      fontSize: "10px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "0.25rem 0.625rem",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#3a3a3a"; e.currentTarget.style.color = "#7a7a7a"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.color = "#3a3a3a"; }}
                  >
                    Utile ({review.helpfulCount})
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Write a review */}
          <div style={{ maxWidth: "600px", padding: "2rem", background: "#0e0e0e", border: "1px solid #1e1e1e" }}>
            <div className="label" style={{ marginBottom: "1.5rem" }}>Donner un avis</div>

            {reviewSubmitted ? (
              <p style={{ color: "#00d4ff", fontSize: "13px", letterSpacing: "0.02em" }}>
                ✓ Merci pour votre avis ! Il sera publié après modération.
              </p>
            ) : (
              <form onSubmit={handleReviewSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <div className="label" style={{ fontSize: "10px", marginBottom: "0.625rem" }}>Note</div>
                  <div style={{ display: "flex", gap: "0.25rem" }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setReviewRating(n)}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: "0.125rem" }}
                      >
                        <Star
                          size={22}
                          fill={n <= reviewRating ? "#f59e0b" : "none"}
                          style={{ color: n <= reviewRating ? "#f59e0b" : "#282828", transition: "color 0.15s" }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="label" style={{ fontSize: "10px", marginBottom: "0.625rem" }}>Titre</div>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="Résumez votre expérience"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <div className="label" style={{ fontSize: "10px", marginBottom: "0.625rem" }}>
                    Commentaire{" "}
                    <span style={{ color: "#282828" }}>({reviewComment.length}/500)</span>
                  </div>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value.slice(0, 500))}
                    placeholder="Partagez votre expérience détaillée..."
                    rows={4}
                    className="input-field"
                    style={{ resize: "vertical", fontFamily: "inherit" }}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start", fontSize: "10px" }}>
                  Publier l&apos;avis
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div style={{ padding: "4rem 0", borderTop: "1px solid #1e1e1e" }}>
          <div className="container-main">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "3rem",
                paddingBottom: "2rem",
                borderBottom: "1px solid #1e1e1e",
              }}
            >
              <div>
                <div className="label" style={{ marginBottom: "0.5rem" }}>À découvrir</div>
                <h2
                  style={{
                    fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                    fontWeight: 300,
                    letterSpacing: "-0.03em",
                    color: "#efefef",
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
                  Vous aimerez aussi
                </h2>
              </div>
              <Link
                href="/shop"
                style={{
                  fontSize: "11px", color: "#3a3a3a", textDecoration: "none",
                  letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00d4ff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#3a3a3a")}
              >
                Voir tout
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "2rem 1.5rem" }}>
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sticky mobile CTA */}
      <div
        className="mobile-sticky-cta"
        style={{
          position: "fixed",
          bottom: 0, left: 0, right: 0,
          padding: "1rem",
          background: "rgba(8,8,8,0.95)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid #1e1e1e",
          zIndex: 50,
          display: "none",
        }}
      >
        <button
          onClick={handleAddToCart}
          className="btn-primary"
          style={{ width: "100%", justifyContent: "center", fontSize: "10px" }}
        >
          <ShoppingBag size={12} strokeWidth={2} />
          Ajouter — {formatPrice(product.price)}
        </button>
      </div>

      <Toast message={toast.message} visible={toast.visible} onClose={hide} />

      <style>{`
        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .mobile-sticky-cta {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
