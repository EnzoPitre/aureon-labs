const testimonials = [
  {
    name: "Thomas M.",
    sport: "Coach CrossFit · Paris",
    rating: 5,
    text: "Le bracelet The Crown est exactement ce que je cherchais depuis des mois. Qualité impeccable, confort parfait pendant les entraînements les plus intenses.",
    design: "The Crown",
  },
  {
    name: "Lucie D.",
    sport: "Marathonienne · Lyon",
    rating: 5,
    text: "Après 6 mois et plusieurs marathons, il est comme neuf. Le design est magnifique et il ne glisse jamais pendant l'effort.",
    design: "Grand Prix",
  },
  {
    name: "Antoine R.",
    sport: "Triathlète · Bordeaux",
    rating: 5,
    text: "Aucun signe d'usure après 8 mois. Livraison rapide, emballage soigné. Aureon Labs c'est du sérieux.",
    design: "Heritage Blue",
  },
];

export default function SocialProof() {
  return (
    <section style={{ padding: "3rem 0", borderBottom: "1px solid #d8cfc0", background: "#ece6dc" }}>
      <div className="container-main">
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#282828", marginBottom: "1.5rem" }}>
          Avis clients — 4.8/5 (2 847 avis)
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
          }}
          className="testimonials-grid"
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{
                background: "#f1ede7",
                border: "1px solid #d8cfc0",
                padding: "1.25rem",
              }}
            >
              <div style={{ color: "var(--amber)", fontSize: "13px", marginBottom: "0.5rem" }}>
                {"★".repeat(t.rating)}
              </div>
              <p style={{ color: "#4a4540", fontSize: "13px", lineHeight: 1.6, marginBottom: "0.875rem" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#282828" }}>{t.name}</div>
              <div style={{ fontSize: "12px", color: "#6b6459" }}>{t.sport} · {t.design}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
