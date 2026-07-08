"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, User, Heart, Settings, LogOut, ChevronRight } from "lucide-react";

type Tab = "orders" | "profile" | "wishlist" | "preferences";

const mockOrders = [
  { id: "ORD-001", date: "2024-11-20", total: 35.98, status: "delivered" as const, items: ["Padel Ace", "Obsidian"] },
  { id: "ORD-002", date: "2024-10-05", total: 17.99, status: "shipped" as const, items: ["The Crown"] },
  { id: "ORD-003", date: "2024-09-14", total: 53.97, status: "delivered" as const, items: ["Aurora", "Midnight Wave", "Ghost White"] },
];

const statusLabels = {
  pending: { label: "En attente", color: "#fbbf24" },
  shipped: { label: "Expédiée", color: "#00d9ff" },
  delivered: { label: "Livrée", color: "#22c55e" },
};

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>("orders");
  const [newsletter, setNewsletter] = useState(true);

  const tabs = [
    { id: "orders" as Tab, label: "Commandes", icon: <Package size={16} /> },
    { id: "profile" as Tab, label: "Profil", icon: <User size={16} /> },
    { id: "wishlist" as Tab, label: "Wishlist", icon: <Heart size={16} /> },
    { id: "preferences" as Tab, label: "Préférences", icon: <Settings size={16} /> },
  ];

  return (
    <div style={{ paddingTop: "100px", minHeight: "100vh" }}>
      <div className="container-main" style={{ paddingBottom: "4rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Mon compte
          </h1>
          <p style={{ color: "#666666", marginTop: "0.5rem" }}>Bienvenue, Enzo 👋</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "3rem" }} className="account-grid">
          {/* Sidebar */}
          <div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    background: tab === t.id ? "rgba(0,217,255,0.08)" : "transparent",
                    border: `1px solid ${tab === t.id ? "rgba(0,217,255,0.2)" : "transparent"}`,
                    borderRadius: "8px",
                    cursor: "pointer",
                    color: tab === t.id ? "#00d9ff" : "#b3b3b3",
                    fontSize: "0.875rem",
                    fontWeight: tab === t.id ? 600 : 400,
                    textAlign: "left",
                    transition: "all 0.2s",
                  }}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}

              <div style={{ borderTop: "1px solid #1a1a1a", marginTop: "1rem", paddingTop: "1rem" }}>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    background: "transparent",
                    border: "1px solid transparent",
                    borderRadius: "8px",
                    cursor: "pointer",
                    color: "#ef4444",
                    fontSize: "0.875rem",
                    width: "100%",
                  }}
                >
                  <LogOut size={16} />
                  Se déconnecter
                </button>
              </div>
            </nav>
          </div>

          {/* Content */}
          <div>
            {tab === "orders" && (
              <div>
                <h2 style={{ fontWeight: 700, marginBottom: "1.5rem", fontSize: "1.25rem" }}>Mes commandes</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {mockOrders.map((order) => {
                    const status = statusLabels[order.status];
                    return (
                      <div
                        key={order.id}
                        style={{
                          background: "#111111",
                          border: "1px solid #1a1a1a",
                          borderRadius: "10px",
                          padding: "1.5rem",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "1rem",
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                            <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>{order.id}</span>
                            <span
                              style={{
                                padding: "0.2rem 0.625rem",
                                borderRadius: "100px",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                background: `${status.color}20`,
                                color: status.color,
                                border: `1px solid ${status.color}40`,
                              }}
                            >
                              {status.label}
                            </span>
                          </div>
                          <p style={{ color: "#666666", fontSize: "0.8rem", marginBottom: "0.25rem" }}>
                            {new Date(order.date).toLocaleDateString("fr-FR")}
                          </p>
                          <p style={{ color: "#b3b3b3", fontSize: "0.875rem" }}>
                            {order.items.join(", ")}
                          </p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                          <span style={{ fontWeight: 700 }}>{order.total.toFixed(2)} €</span>
                          <button
                            style={{
                              background: "#1a1a1a",
                              border: "1px solid #333333",
                              borderRadius: "6px",
                              cursor: "pointer",
                              color: "#b3b3b3",
                              padding: "0.5rem 1rem",
                              fontSize: "0.8rem",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.25rem",
                            }}
                          >
                            Détails <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {tab === "profile" && (
              <div style={{ maxWidth: "480px" }}>
                <h2 style={{ fontWeight: 700, marginBottom: "1.5rem", fontSize: "1.25rem" }}>Mon profil</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.875rem", color: "#b3b3b3", marginBottom: "0.5rem" }}>Nom complet</label>
                    <input defaultValue="Enzo Pitre" className="input-field" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.875rem", color: "#b3b3b3", marginBottom: "0.5rem" }}>Email</label>
                    <input defaultValue="enzo.pitre33@gmail.com" type="email" className="input-field" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.875rem", color: "#b3b3b3", marginBottom: "0.5rem" }}>Téléphone</label>
                    <input placeholder="+33 6 00 00 00 00" className="input-field" />
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
                    <button className="btn-primary">Sauvegarder</button>
                    <button className="btn-secondary">Changer le mot de passe</button>
                  </div>
                </div>
              </div>
            )}

            {tab === "wishlist" && (
              <div>
                <h2 style={{ fontWeight: 700, marginBottom: "1.5rem", fontSize: "1.25rem" }}>Ma wishlist</h2>
                <p style={{ color: "#666666" }}>
                  Vos bracelets favoris apparaîtront ici. Ajoutez-les depuis la boutique en cliquant sur ❤.
                </p>
                <Link href="/shop" className="btn-primary" style={{ display: "inline-flex", marginTop: "1.5rem" }}>
                  Explorer la collection
                </Link>
              </div>
            )}

            {tab === "preferences" && (
              <div style={{ maxWidth: "480px" }}>
                <h2 style={{ fontWeight: 700, marginBottom: "1.5rem", fontSize: "1.25rem" }}>Préférences</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem 1.25rem",
                      background: "#111111",
                      border: "1px solid #1a1a1a",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: "0.25rem", fontSize: "0.9rem" }}>Newsletter</p>
                      <p style={{ color: "#666666", fontSize: "0.8rem" }}>Nouveaux drops, conseils et offres exclusives</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                      style={{ width: "18px", height: "18px", accentColor: "#00d9ff" }}
                    />
                  </label>

                  <button className="btn-primary" style={{ alignSelf: "flex-start" }}>
                    Sauvegarder
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .account-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
