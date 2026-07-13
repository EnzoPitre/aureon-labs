const benefits = [
  { title: "Compatible WHOOP 4.0 & 5.0", desc: "Installation en secondes, aucun outil." },
  { title: "Nylon premium respirant", desc: "Séchage rapide, zéro irritation." },
  { title: "Fermoir déployant sécurisé", desc: "Reste en place, aucun risque de perte." },
  { title: "Séries limitées", desc: "Chaque design est produit en quantité limitée." },
];

export default function StorySection() {
  return (
    <section style={{ padding: "3rem 0", borderBottom: "1px solid #d8cfc0" }}>
      <div className="container-main">
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#282828", marginBottom: "1.5rem" }}>
          Pourquoi choisir Aureon Labs
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
          }}
          className="benefits-grid"
        >
          {benefits.map((item) => (
            <div key={item.title} style={{ border: "1px solid #d8cfc0", padding: "1.25rem", background: "#f1ede7" }}>
              <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#282828", marginBottom: "0.4rem" }}>
                {item.title}
              </h4>
              <p style={{ color: "#6b6459", fontSize: "13px", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .benefits-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
