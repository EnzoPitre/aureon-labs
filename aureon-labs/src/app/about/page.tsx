import type { Metadata } from "next";

export const metadata: Metadata = { title: "À propos" };

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "100px", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          padding: "5rem 0",
          borderBottom: "1px solid #ececef",
          background: "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.06) 0%, transparent 60%)",
        }}
      >
        <div className="container-main" style={{ maxWidth: "720px" }}>
          <p style={{ color: "#2563eb", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
            À propos
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "2rem" }}>
            Performance Meets Design
          </h1>
          <p style={{ color: "#52525b", fontSize: "1.1rem", lineHeight: 1.8 }}>
            Aureon Labs est né d&apos;une conviction : les meilleurs athlètes méritent les
            meilleurs équipements — y compris ceux qu&apos;on voit.
          </p>
        </div>
      </div>

      {/* Story */}
      <div style={{ padding: "6rem 0" }}>
        <div className="container-main" style={{ maxWidth: "720px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {[
              {
                title: "L'origine",
                body: "Tout a commencé avec une frustration simple : les bracelets WHOOP disponibles sur le marché étaient soit fonctionnels, soit beaux — jamais les deux. Comme athlètes et designers, nous avons décidé de ne pas choisir.",
              },
              {
                title: "Notre obsession",
                body: "Chaque bracelet Aureon Labs passe par des dizaines d'itérations avant d'arriver à vous. Nous testons les matières, les coloris, les textures. Nous courons avec. Nous noyons avec. Nous dormons avec. Si ça ne passe pas tous nos tests, ça ne sort pas.",
              },
              {
                title: "Notre promesse",
                body: "Chaque bracelet que vous recevez est une promesse : il sera aussi performant que beau, aussi durable que stylé. Et si jamais ce n'est pas le cas, on s'en occupe. Point.",
              },
              {
                title: "La vision",
                body: "Nous croyons que le marché des wearables haut de gamme mérite une marque qui comprend à la fois l'athlétisme et l'esthétique. Aureon Labs est cette marque — et nous ne faisons que commencer.",
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem", letterSpacing: "-0.01em" }}>
                  {section.title}
                </h2>
                <p style={{ color: "#52525b", lineHeight: 1.8 }}>{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div style={{ padding: "4rem 0", background: "#f7f7f8", borderTop: "1px solid #ececef" }}>
        <div className="container-main">
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "3rem", textAlign: "center" }}>
            Ce qui nous définit
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "⚡", title: "Performance d'abord", body: "Chaque matériau est choisi pour sa performance athétique. La beauté vient après — mais elle ne sacrifie jamais la fonction." },
              { icon: "🎨", title: "Design obsessionnel", body: "Des dizaines d'itérations par design. Si un coloris n'est pas exactement juste, on recommence. La médiocrité n'est pas une option." },
              { icon: "♻️", title: "Durabilité", body: "Des matières qui durent. Des processus responsables. Un produit qui s'améliore avec le temps." },
              { icon: "🔒", title: "Exclusivité", body: "Des séries limitées pour que votre bracelet reste unique. La rareté n'est pas un gimmick — c'est notre modèle." },
            ].map((value) => (
              <div
                key={value.title}
                style={{
                  background: "#ececef",
                  borderRadius: "12px",
                  border: "1px solid #e0e0e3",
                  padding: "2rem",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{value.icon}</div>
                <h3 style={{ fontWeight: 700, marginBottom: "0.75rem", fontSize: "1rem" }}>{value.title}</h3>
                <p style={{ color: "#71717a", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
