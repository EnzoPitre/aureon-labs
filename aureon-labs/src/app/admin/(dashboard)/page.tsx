"use client";

import { useEffect, useState } from "react";

type Stats = {
  revenue: number;
  revenue30d: number;
  orderCount: number;
  aov: number;
  pendingFulfillment: number;
};

function formatEur(cents: number) {
  return (cents / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  const cards = stats
    ? [
        { label: "Chiffre d'affaires total", value: formatEur(stats.revenue) },
        { label: "CA (30 derniers jours)", value: formatEur(stats.revenue30d) },
        { label: "Commandes payées", value: stats.orderCount },
        { label: "Panier moyen", value: formatEur(stats.aov) },
        { label: "En attente de préparation", value: stats.pendingFulfillment },
      ]
    : [];

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "2rem" }}>
        Vue d&apos;ensemble
      </h1>

      {!stats ? (
        <p style={{ color: "#5c564e" }}>Chargement...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {cards.map((c) => (
            <div
              key={c.label}
              style={{
                border: "1px solid #d8cfc0",
                borderRadius: "10px",
                padding: "1.25rem 1.5rem",
                background: "#ece6dc",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "#5c564e", marginBottom: "0.5rem" }}>
                {c.label}
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#282828" }}>
                {c.value}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
