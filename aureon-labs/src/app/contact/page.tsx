"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: "100px", minHeight: "100vh" }}>
      <div className="container-main" style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Info */}
          <div>
            <p style={{ color: "#00d9ff", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Contact
            </p>
            <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "1.5rem", lineHeight: 1.2 }}>
              On est là pour vous.
            </h1>
            <p style={{ color: "#b3b3b3", lineHeight: 1.8, marginBottom: "3rem" }}>
              Une question sur votre commande, un problème avec votre bracelet, ou juste
              envie de nous dire bonjour — on vous répond sous 24h.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                { icon: "📧", label: "Email", value: "hello@aureonlabs.com" },
                { icon: "💬", label: "Instagram DM", value: "@aureonlabs" },
                { icon: "⏱", label: "Temps de réponse", value: "< 24h en semaine" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
                  <div>
                    <p style={{ color: "#666666", fontSize: "0.8rem", marginBottom: "0.25rem" }}>{item.label}</p>
                    <p style={{ fontWeight: 500 }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div
            style={{
              background: "#111111",
              border: "1px solid #1a1a1a",
              borderRadius: "16px",
              padding: "2.5rem",
            }}
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <CheckCircle size={48} style={{ color: "#00d9ff", margin: "0 auto 1.5rem" }} />
                <h3 style={{ fontWeight: 700, marginBottom: "0.75rem" }}>Message envoyé !</h3>
                <p style={{ color: "#b3b3b3", fontSize: "0.9rem" }}>
                  On vous répond sous 24h. Merci de nous faire confiance.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <h2 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Nous écrire</h2>

                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", color: "#b3b3b3", marginBottom: "0.5rem" }}>Nom</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom"
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", color: "#b3b3b3", marginBottom: "0.5rem" }}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", color: "#b3b3b3", marginBottom: "0.5rem" }}>
                    Message
                    <span style={{ color: "#666666", marginLeft: "0.5rem" }}>({message.length}/1000)</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                    placeholder="Comment pouvons-nous vous aider ?"
                    rows={5}
                    required
                    className="input-field"
                    style={{ resize: "vertical", fontFamily: "inherit" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ justifyContent: "center", opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? "Envoi..." : "Envoyer le message"}
                  {!loading && <Send size={14} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </div>
  );
}
