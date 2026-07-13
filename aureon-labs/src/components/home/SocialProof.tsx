import Link from "next/link";
import { ArrowRight } from "lucide-react";

const testimonials = [
  {
    name: "Thomas M.",
    sport: "Coach CrossFit · Paris",
    rating: 5,
    text: "Le bracelet The Crown est exactement ce que je cherchais depuis des mois. Les autres coachs de la salle me demandent tous où je l'ai trouvé. Qualité impeccable, confort parfait pendant les WODs les plus intenses.",
    design: "The Crown",
    verified: true,
  },
  {
    name: "Lucie D.",
    sport: "Marathonienne · Lyon",
    rating: 5,
    text: "J'ai commandé Grand Prix après avoir vu une runneuse en course avec. Après 6 mois et plusieurs marathons, il est comme neuf. Le design est magnifique et il ne glisse jamais pendant l'effort. Je ne reviendrai jamais au bracelet stock.",
    design: "Grand Prix",
    verified: true,
  },
  {
    name: "Antoine R.",
    sport: "Triathlète · Bordeaux",
    rating: 5,
    text: "Heritage Blue is perfect. Je l'utilise pour la natation, le vélo et la course depuis 8 mois. Aucun signe d'usure, les couleurs sont intactes. Livraison en 3 jours, emballage soigné. Aureon Labs c'est du sérieux.",
    design: "Heritage Blue",
    verified: true,
  },
];

const RATING_BREAKDOWN = [
  { stars: 5, pct: 82 },
  { stars: 4, pct: 13 },
  { stars: 3, pct: 4 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0 },
];

export default function SocialProof() {
  return (
    <section
      style={{
        padding: "7rem 0",
        borderTop: "1px solid #d8cfc0",
        borderBottom: "1px solid #d8cfc0",
        background: "#f1ede7",
      }}
    >
      <div className="container-main">
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "end",
            marginBottom: "4rem",
            gap: "2rem",
          }}
          className="proof-header"
        >
          <div>
            <div className="label" style={{ marginBottom: "0.75rem" }}>
              Avis clients
            </div>
            <h2
              style={{
                fontSize: "clamp(1.375rem, 2.5vw, 1.75rem)",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: "#282828",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Ils ont fait le choix Aureon Labs.
            </h2>
          </div>

          {/* Aggregate score */}
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#282828",
                letterSpacing: "-0.01em",
                lineHeight: 1,
              }}
            >
              4.8
            </div>
            <div style={{ color: "var(--amber)", fontSize: "18px", marginBottom: "0.25rem" }}>
              ★★★★★
            </div>
            <div style={{ fontSize: "12px", color: "#83796b" }}>
              sur 2 847 avis vérifiés
            </div>

            {/* Rating bars */}
            <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.3rem", alignItems: "flex-end" }}>
              {RATING_BREAKDOWN.map((row) => (
                <div key={row.stars} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "10px", color: "#83796b", width: "10px" }}>{row.stars}</span>
                  <div
                    style={{
                      width: "80px",
                      height: "4px",
                      background: "#d8cfc0",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${row.pct}%`,
                        height: "100%",
                        background: row.stars >= 4 ? "var(--amber)" : "#a39a8a",
                        borderRadius: "2px",
                      }}
                    />
                  </div>
                  <span style={{ fontSize: "10px", color: "#a39a8a", width: "28px", textAlign: "right" }}>
                    {row.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "#d8cfc0",
            marginBottom: "3rem",
          }}
          className="testimonials-grid"
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card"
              style={{
                background: "#f1ede7",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                transition: "background 0.2s",
              }}
            >
              {/* Stars */}
              <div style={{ color: "var(--amber)", fontSize: "14px", letterSpacing: "0.05em" }}>
                {"★".repeat(t.rating)}
              </div>

              {/* Quote */}
              <p
                style={{
                  color: "#4a4540",
                  fontSize: "14px",
                  lineHeight: 1.75,
                  margin: 0,
                  flex: 1,
                  fontStyle: "italic",
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Footer */}
              <div
                style={{
                  paddingTop: "1rem",
                  borderTop: "1px solid #d8cfc0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#282828" }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: "11px", color: "#83796b", marginTop: "0.15rem" }}>
                    {t.sport}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  {t.verified && (
                    <div className="badge-new" style={{ marginBottom: "0.25rem" }}>
                      ✓ Achat vérifié
                    </div>
                  )}
                  <div style={{ fontSize: "10px", color: "#a39a8a" }}>
                    Design: {t.design}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <Link href="/shop" className="btn-primary">
            Rejoindre 2 000+ clients satisfaits
            <ArrowRight size={13} strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      <style>{`
        .testimonial-card:hover {
          background: #ece6dc;
        }
        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
          .proof-header {
            grid-template-columns: 1fr !important;
          }
          .proof-header > *:last-child {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}
