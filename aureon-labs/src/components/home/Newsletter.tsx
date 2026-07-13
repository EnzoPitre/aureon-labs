"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #f1ede7 0%, #f1ede7 100%)",
        borderTop: "1px solid #d8cfc0",
      }}
    >
      <div className="container-main">
        <div
          style={{
            padding: "6rem 0",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
          className="newsletter-grid"
        >
          {/* Left */}
          <div>
            {/* Offer badge */}
            <div style={{ marginBottom: "1.5rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  background: "rgba(245, 158, 11, 0.1)",
                  border: "1px solid rgba(245, 158, 11, 0.25)",
                  color: "var(--amber)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                🎁 Offre exclusive abonnés
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "#282828",
                lineHeight: 1.05,
                margin: "0 0 1rem",
              }}
            >
              <span style={{ color: "var(--cyan)" }}>-10%</span> sur ta
              <br />
              première commande.
            </h2>

            <p style={{ color: "#5c564e", fontSize: "14px", lineHeight: 1.75, marginBottom: "1.5rem" }}>
              Rejoins 2 000+ athlètes qui performent avec style.
              <br />
              Accès en avant-première aux nouveaux drops. Zéro spam.
            </p>

            {/* Benefits list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                "Code -10% livré instantanément par email",
                "Accès prioritaire aux nouveaux designs",
                "Conseils performance exclusifs",
              ].map((b) => (
                <div
                  key={b}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    fontSize: "13px",
                    color: "#5c564e",
                  }}
                >
                  <span
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: "rgba(16,185,129,0.15)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Check size={9} strokeWidth={3} style={{ color: "var(--green)" }} />
                  </span>
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            <div
              style={{
                background: "#ece6dc",
                border: "1px solid #d8cfc0",
                padding: "2.5rem",
              }}
            >
              {submitted ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "rgba(16,185,129,0.15)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1rem",
                    }}
                  >
                    <Check size={22} strokeWidth={2} style={{ color: "var(--green)" }} />
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#282828",
                      letterSpacing: "-0.02em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Ton code arrive !
                  </h3>
                  <p style={{ color: "#5c564e", fontSize: "13px", lineHeight: 1.7 }}>
                    Vérifie ta boîte mail — ton code{" "}
                    <strong style={{ color: "var(--cyan)" }}>WELCOME10</strong> t&apos;attend.
                    <br />
                    Bienvenue dans la famille Aureon Labs.
                  </p>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#282828",
                        letterSpacing: "-0.02em",
                        marginBottom: "0.4rem",
                      }}
                    >
                      Obtenir mon code -10%
                    </div>
                    <div style={{ fontSize: "12px", color: "#83796b" }}>
                      Valable sur ta première commande · Sans minimum d&apos;achat
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ton@email.com"
                      required
                      style={{
                        width: "100%",
                        background: "#f1ede7",
                        border: "1px solid #c9bfae",
                        padding: "0.875rem 1rem",
                        color: "#282828",
                        fontSize: "14px",
                        outline: "none",
                        transition: "border-color 0.2s",
                        fontFamily: "inherit",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--cyan)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#c9bfae")}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary"
                      style={{
                        width: "100%",
                        padding: "1rem",
                        opacity: loading ? 0.7 : 1,
                        cursor: loading ? "wait" : "pointer",
                        fontSize: "12px",
                      }}
                    >
                      {loading ? "Envoi en cours..." : (
                        <>
                          Recevoir mon code -10%
                          <ArrowRight size={13} strokeWidth={2.5} />
                        </>
                      )}
                    </button>
                  </form>

                  <p style={{ marginTop: "1rem", fontSize: "11px", color: "#a39a8a", textAlign: "center" }}>
                    Pas de spam · Résiliable à tout moment · Données protégées
                  </p>
                </>
              )}
            </div>

            {/* Trust note */}
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                fontSize: "11px",
                color: "#a39a8a",
              }}
            >
              <span>🔒 Email sécurisé</span>
              <span>✓ 2 000+ abonnés</span>
              <span>⚡ Code instantané</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .newsletter-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            padding: 4rem 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
