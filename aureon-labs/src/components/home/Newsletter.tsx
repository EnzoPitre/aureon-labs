"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section style={{ background: "#ece6dc", borderTop: "1px solid #d8cfc0" }}>
      <div className="container-main" style={{ padding: "3rem 0", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#282828", marginBottom: "0.5rem" }}>
          -10% sur ta première commande
        </h2>
        <p style={{ color: "#5c564e", fontSize: "14px", marginBottom: "1.5rem" }}>
          Inscris-toi à la newsletter pour recevoir ton code de réduction.
        </p>

        {submitted ? (
          <p style={{ color: "#282828", fontSize: "14px", fontWeight: 600 }}>
            Merci ! Vérifie ta boîte mail — ton code WELCOME10 t&apos;attend.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap", maxWidth: "420px", margin: "0 auto" }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.com"
              required
              style={{
                flex: 1,
                minWidth: "200px",
                background: "#f1ede7",
                border: "1px solid #c9bfae",
                padding: "0.75rem 1rem",
                color: "#282828",
                fontSize: "14px",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <button type="submit" disabled={loading} className="btn-primary" style={{ padding: "0.75rem 1.25rem" }}>
              {loading ? "..." : "S'inscrire"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
