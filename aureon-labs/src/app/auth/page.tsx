"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Mode = "login" | "register";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "register" && password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    const { error: authError } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (authError) {
      setError(
        authError.message === "Invalid login credentials"
          ? "Email ou mot de passe incorrect."
          : authError.message
      );
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "88px 1rem 2rem",
        background: "radial-gradient(ellipse at 50% 50%, rgba(0,217,255,0.05) 0%, transparent 60%), #0a0a0a",
      }}
    >
      <div style={{ width: "100%", maxWidth: "440px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
              <span className="gradient-text">Aureon</span>
              <span style={{ color: "#b3b3b3" }}> Labs</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#111111",
            border: "1px solid #1a1a1a",
            borderRadius: "16px",
            padding: "2.5rem",
          }}
        >
          {/* Tab switcher */}
          <div
            style={{
              display: "flex",
              background: "#1a1a1a",
              borderRadius: "8px",
              padding: "4px",
              marginBottom: "2rem",
            }}
          >
            {(["login", "register"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); setSuccess(false); }}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  background: mode === m ? "#ffffff" : "transparent",
                  color: mode === m ? "#0a0a0a" : "#666666",
                  transition: "all 0.2s",
                }}
              >
                {m === "login" ? "Connexion" : "Inscription"}
              </button>
            ))}
          </div>

          {success ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✓</div>
              <h3 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
                {mode === "login" ? "Connecté !" : "Compte créé !"}
              </h3>
              <p style={{ color: "#b3b3b3", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                {mode === "register"
                  ? "Un email de confirmation a été envoyé."
                  : "Bienvenue de retour."}
              </p>
              <Link href="/account" className="btn-primary" style={{ display: "inline-flex" }}>
                Mon compte <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {error && (
                <div
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    borderRadius: "6px",
                    padding: "0.75rem 1rem",
                    color: "#ef4444",
                    fontSize: "0.875rem",
                  }}
                >
                  {error}
                </div>
              )}

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", color: "#b3b3b3", marginBottom: "0.5rem" }}>
                  Email
                </label>
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
                  Mot de passe
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={8}
                    className="input-field"
                    style={{ paddingRight: "3rem" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    style={{
                      position: "absolute",
                      right: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#666666",
                    }}
                  >
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {mode === "register" && (
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", color: "#b3b3b3", marginBottom: "0.5rem" }}>
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="input-field"
                  />
                </div>
              )}

              {mode === "login" && (
                <div style={{ textAlign: "right" }}>
                  <button
                    type="button"
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#666666", fontSize: "0.8rem" }}
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
              )}

              {mode === "register" && (
                <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer", fontSize: "0.8rem", color: "#b3b3b3" }}>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    required
                    style={{ marginTop: "2px", accentColor: "#00d9ff" }}
                  />
                  J&apos;accepte les conditions générales de vente et la politique de confidentialité.
                </label>
              )}

              <button
                type="submit"
                disabled={loading || (mode === "register" && !agreed)}
                className="btn-primary"
                style={{ justifyContent: "center", opacity: loading ? 0.7 : 1, marginTop: "0.5rem" }}
              >
                {loading ? "..." : mode === "login" ? "Se connecter" : "Créer mon compte"}
                {!loading && <ArrowRight size={14} />}
              </button>
            </form>
          )}
        </div>

        <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#666666", fontSize: "0.8rem" }}>
          {mode === "login" ? "Pas encore de compte ?" : "Déjà un compte ?"}{" "}
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#00d9ff", fontSize: "0.8rem" }}
          >
            {mode === "login" ? "Créer un compte" : "Se connecter"}
          </button>
        </p>
      </div>
    </div>
  );
}
