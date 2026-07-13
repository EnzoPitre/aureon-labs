"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { products } from "@/lib/products";
import { Product } from "@/types";
import ProductCard from "@/components/shop/ProductCard";
import QuickView from "@/components/shop/QuickView";

type SortOption = "relevance" | "price-asc" | "price-desc" | "rating";

const RATING_OPTIONS = [4, 4.5, 4.7];

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<SortOption>("relevance");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.tagline || "").toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (minRating > 0) {
      list = list.filter((p) => p.rating >= minRating);
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
    }

    return list;
  }, [search, minRating, sort]);

  const hasFilters = search || minRating > 0;

  return (
    <div style={{ paddingTop: "88px", minHeight: "100vh" }}>
      {/* Page header */}
      <div
        style={{
          padding: "4rem 0 3rem",
          borderBottom: "1px solid #d8cfc0",
        }}
      >
        <div className="container-main">
          <div className="label" style={{ marginBottom: "1rem" }}>
            Boutique
          </div>
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 500,
              fontStyle: "italic",
              letterSpacing: "0",
              margin: "0 0 0.75rem",
              lineHeight: 1,
              color: "#282828",
            }}
          >
            La collection
          </h1>
          <p style={{ fontSize: "13px", letterSpacing: "0.02em" }}>
            <span style={{ color: "#282828", fontWeight: 300 }}>{filtered.length}</span>
            <span style={{ color: "#a39a8a" }}> bracelet{filtered.length !== 1 ? "s" : ""} disponible{filtered.length !== 1 ? "s" : ""}</span>
          </p>
        </div>
      </div>

      {/* Filters bar */}
      <div
        style={{
          position: "sticky",
          top: "88px",
          zIndex: 50,
          background: "rgba(241,237,231,0.95)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid #d8cfc0",
          padding: "0.875rem 0",
        }}
      >
        <div
          className="container-main"
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Search */}
          <div style={{ position: "relative", flex: 1, minWidth: "180px", maxWidth: "300px" }}>
            <Search
              size={13}
              strokeWidth={1.5}
              style={{
                position: "absolute",
                left: "0",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#a39a8a",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Chercher un design..."
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #d8cfc0",
                padding: "0.375rem 0 0.375rem 1.25rem",
                color: "#282828",
                fontSize: "12px",
                outline: "none",
                fontFamily: "inherit",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#a39a8a")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#d8cfc0")}
            />
          </div>

          {/* Separator */}
          <div style={{ width: "1px", height: "20px", background: "#d8cfc0", flexShrink: 0 }} />

          {/* Rating filters */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <span className="label" style={{ fontSize: "10px", marginRight: "0.25rem" }}>
              Note min.
            </span>
            {RATING_OPTIONS.map((r) => (
              <button
                key={r}
                onClick={() => setMinRating(minRating === r ? 0 : r)}
                style={{
                  padding: "0.3rem 0.625rem",
                  border: `1px solid ${minRating === r ? "#282828" : "#d8cfc0"}`,
                  background: minRating === r ? "rgba(40,40,40,0.06)" : "transparent",
                  color: minRating === r ? "#282828" : "#a39a8a",
                  fontSize: "11px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                  letterSpacing: "0.02em",
                }}
              >
                {r}+
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            style={{
              background: "transparent",
              border: "1px solid #d8cfc0",
              color: "#5c564e",
              padding: "0.375rem 0.625rem",
              fontSize: "11px",
              cursor: "pointer",
              outline: "none",
              marginLeft: "auto",
              fontFamily: "inherit",
              letterSpacing: "0.04em",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#a39a8a")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#d8cfc0")}
          >
            <option value="relevance" style={{ background: "#f1ede7" }}>Pertinence</option>
            <option value="price-asc" style={{ background: "#f1ede7" }}>Prix croissant</option>
            <option value="price-desc" style={{ background: "#f1ede7" }}>Prix décroissant</option>
            <option value="rating" style={{ background: "#f1ede7" }}>Mieux notés</option>
          </select>

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={() => { setSearch(""); setMinRating(0); }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#a39a8a",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "11px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontFamily: "inherit",
                transition: "color 0.2s",
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#5c564e")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#a39a8a")}
            >
              <X size={11} strokeWidth={1.5} />
              Effacer
            </button>
          )}
        </div>
      </div>

      {/* Product grid */}
      <div className="container-main" style={{ paddingTop: "3rem", paddingBottom: "6rem" }}>
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "8rem 0",
              color: "#a39a8a",
            }}
          >
            <p style={{ fontSize: "14px", marginBottom: "0.5rem", color: "#83796b" }}>
              Aucun bracelet trouvé
            </p>
            <p style={{ fontSize: "12px" }}>Modifiez vos filtres</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "2rem 1.5rem",
            }}
          >
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}
      </div>

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
