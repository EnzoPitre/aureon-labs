import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";

export default function FeaturedCollection() {
  const featured = getFeaturedProducts();

  return (
    <section style={{ padding: "3rem 0", borderBottom: "1px solid #d8cfc0" }}>
      <div className="container-main">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#282828", margin: 0 }}>
            Nos best-sellers
          </h2>
          <Link href="/shop" style={{ fontSize: "13px", fontWeight: 600, color: "#282828" }}>
            Voir toute la collection →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
          }}
          className="featured-grid"
        >
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .featured-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
