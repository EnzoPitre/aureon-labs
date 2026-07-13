import { Truck, RotateCcw, Star, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: <Truck size={22} strokeWidth={1.25} />,
    title: "Livraison rapide",
    sub: "Expédié sous 24–48h · Suivi inclus",
  },
  {
    icon: <RotateCcw size={22} strokeWidth={1.25} />,
    title: "Retours 30 jours",
    sub: "Gratuits, sans question",
  },
  {
    icon: <Star size={22} strokeWidth={1.25} />,
    title: "Qualité premium",
    sub: "Nylon respirant · Fermoir déployant",
  },
  {
    icon: <ShieldCheck size={22} strokeWidth={1.25} />,
    title: "Paiement sécurisé",
    sub: "SSL · 3D Secure · Stripe",
  },
];

export default function TrustStrip() {
  return (
    <section
      style={{
        borderBottom: "1px solid #1e1e1e",
        background: "#0a0a0a",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
        className="trust-grid"
      >
        {items.map((item, i) => (
          <div
            key={item.title}
            className="trust-item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1.75rem 2rem",
              borderRight: i < items.length - 1 ? "1px solid #1e1e1e" : "none",
              transition: "background 0.2s",
            }}
          >
            <span style={{ color: "var(--cyan)", flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#efefef",
                  letterSpacing: "-0.01em",
                  marginBottom: "0.2rem",
                }}
              >
                {item.title}
              </div>
              <div style={{ fontSize: "11px", color: "#5a5a5a", lineHeight: 1.4 }}>
                {item.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .trust-item:hover {
          background: #111;
        }
        @media (max-width: 768px) {
          .trust-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .trust-grid > *:nth-child(2) {
            border-right: none !important;
          }
          .trust-grid > *:nth-child(1),
          .trust-grid > *:nth-child(2) {
            border-bottom: 1px solid #1e1e1e;
          }
          .trust-grid > *:nth-child(3) {
            border-right: 1px solid #1e1e1e !important;
          }
        }
      `}</style>
    </section>
  );
}
