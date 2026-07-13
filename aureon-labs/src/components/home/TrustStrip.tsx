import { Truck, RotateCcw, Star, ShieldCheck } from "lucide-react";

const items = [
  { icon: <Truck size={20} strokeWidth={1.5} />, title: "Livraison rapide", sub: "Expédié sous 24–48h" },
  { icon: <RotateCcw size={20} strokeWidth={1.5} />, title: "Retours 30 jours", sub: "Gratuits, sans question" },
  { icon: <Star size={20} strokeWidth={1.5} />, title: "Qualité premium", sub: "Nylon respirant" },
  { icon: <ShieldCheck size={20} strokeWidth={1.5} />, title: "Paiement sécurisé", sub: "SSL · Stripe" },
];

export default function TrustStrip() {
  return (
    <section style={{ borderBottom: "1px solid #d8cfc0", background: "#ece6dc" }}>
      <div
        className="container-main trust-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          padding: "1.5rem 0",
        }}
      >
        {items.map((item) => (
          <div key={item.title} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 1rem" }}>
            <span style={{ color: "#282828" }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#282828" }}>{item.title}</div>
              <div style={{ fontSize: "12px", color: "#6b6459" }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .trust-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
