import Link from "next/link";
import { ArrowRight } from "lucide-react";

const benefits = [
  {
    number: "01",
    title: "Compatible WHOOP 4.0 & 5.0",
    desc: "Conçu pour un fit parfait sur ton tracker. Aucun outil, installation en secondes.",
  },
  {
    number: "02",
    title: "Nylon premium respirant",
    desc: "Séchage ultra-rapide, zéro irritation. Parfait pour la salle, le trail et le sommeil.",
  },
  {
    number: "03",
    title: "Fermoir déployant sécurisé",
    desc: "Reste en place même sous l'effort le plus intense. Aucun risque de perte.",
  },
  {
    number: "04",
    title: "Séries limitées — exclusif",
    desc: "Chaque design est produit en quantité limitée. Ton bracelet reste unique.",
  },
];

export default function StorySection() {
  return (
    <section
      style={{
        borderTop: "1px solid #e4e4e7",
        borderBottom: "1px solid #e4e4e7",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
        className="story-outer"
      >
        {/* Left — why us */}
        <div
          style={{
            padding: "7rem 5rem 7rem 2.5rem",
            borderRight: "1px solid #e4e4e7",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          className="story-left"
        >
          <div className="label" style={{ marginBottom: "2rem" }}>
            Pourquoi Aureon Labs ?
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3.25rem)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#18181b",
              marginBottom: "2rem",
            }}
          >
            Le bracelet WHOOP
            <br />
            que tu mérites.
            <br />
            <em style={{ fontStyle: "italic", color: "var(--cyan)" }}>Enfin.</em>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
            <p style={{ color: "#64646c", fontSize: "14px", lineHeight: 1.8, margin: 0 }}>
              Le bracelet WHOOP par défaut est fonctionnel. Mais il ne dit rien de toi.
              Aureon Labs a créé 15 designs exclusifs pour les athlètes qui comprennent
              que chaque détail compte — y compris celui qu&apos;on voit en premier.
            </p>
            <p style={{ color: "#64646c", fontSize: "14px", lineHeight: 1.8, margin: 0 }}>
              Même matériau haute performance. Même compatibilité parfaite.
              Mais une identité qui t&apos;appartient.
            </p>
          </div>

          {/* Social proof mini */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem 1.25rem",
              background: "#fafafa",
              border: "1px solid #e4e4e7",
              marginBottom: "2.5rem",
            }}
          >
            <div style={{ fontSize: "24px" }}>⭐</div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#18181b" }}>
                4.8/5 sur 2 847 avis
              </div>
              <div style={{ fontSize: "11px", color: "#8b8b93" }}>
                &ldquo;Le meilleur achat pour mon WHOOP&rdquo; — avis moyen client
              </div>
            </div>
          </div>

          <Link href="/shop" className="btn-primary" style={{ alignSelf: "flex-start" }}>
            Choisir mon design
            <ArrowRight size={13} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Right — benefits list */}
        <div
          style={{
            padding: "7rem 2.5rem 7rem 5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          className="story-right"
        >
          <div className="label" style={{ marginBottom: "2.5rem" }}>
            Ce que tu obtiens
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {benefits.map((item, i) => (
              <div
                key={item.number}
                style={{
                  display: "grid",
                  gridTemplateColumns: "48px 1fr",
                  gap: "1.5rem",
                  padding: "1.75rem 0",
                  borderBottom: i < benefits.length - 1 ? "1px solid #e4e4e7" : "none",
                  alignItems: "start",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--cyan)",
                    opacity: 0.4,
                    letterSpacing: "0.04em",
                    paddingTop: "0.2rem",
                  }}
                >
                  {item.number}
                </span>
                <div>
                  <h4
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#18181b",
                      marginBottom: "0.4rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p style={{ color: "#8b8b93", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Price reminder */}
          <div
            style={{
              marginTop: "2rem",
              padding: "1.25rem",
              background: "rgba(37,99,235,0.04)",
              border: "1px solid rgba(37,99,235,0.12)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: "11px", color: "#8b8b93", marginBottom: "0.2rem" }}>
                À partir de
              </div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#18181b", letterSpacing: "-0.02em" }}>
                17,99€
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "11px", color: "var(--green)", marginBottom: "0.2rem" }}>
                ✓ Livraison offerte dès 35€
              </div>
              <div style={{ fontSize: "11px", color: "#8b8b93" }}>
                ↩ Retours gratuits 30 jours
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .story-outer {
            grid-template-columns: 1fr !important;
          }
          .story-left {
            padding: 4rem 1.25rem !important;
            border-right: none !important;
            border-bottom: 1px solid #e4e4e7 !important;
          }
          .story-right {
            padding: 4rem 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
