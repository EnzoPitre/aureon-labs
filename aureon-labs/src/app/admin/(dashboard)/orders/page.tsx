"use client";

import { useEffect, useState } from "react";

type OrderItem = { slug: string | null; name: string; quantity: number; unitAmount: number };

type Order = {
  id: string;
  stripe_session_id: string;
  customer_email: string | null;
  amount: number;
  items: OrderItem[];
  status: string;
  admin_status: string;
  tracking_number: string | null;
  created_at: string;
};

const ADMIN_STATUSES = [
  { value: "en_preparation", label: "En préparation" },
  { value: "expedie", label: "Expédiée" },
  { value: "livre", label: "Livrée" },
];

function formatEur(cents: number) {
  return (cents / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = () => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((d) => {
        setOrders(d.orders ?? []);
        setLoading(false);
      });
  };

  useEffect(load, []);

  const updateOrder = async (id: string, patch: Partial<Order>) => {
    setSavingId(id);
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    setSavingId(null);
  };

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "2rem" }}>Commandes</h1>

      {loading ? (
        <p style={{ color: "#64646c" }}>Chargement...</p>
      ) : orders.length === 0 ? (
        <p style={{ color: "#64646c" }}>Aucune commande.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e4e4e7", textAlign: "left" }}>
                {["Commande", "Client", "Articles", "Montant", "Paiement", "Statut", "Suivi", "Date"].map(
                  (h) => (
                    <th key={h} style={{ padding: "0.75rem 0.5rem", color: "#64646c", fontWeight: 500 }}>
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} style={{ borderBottom: "1px solid #f2f2f4", opacity: savingId === o.id ? 0.6 : 1 }}>
                  <td style={{ padding: "0.75rem 0.5rem", fontWeight: 600 }}>
                    {o.stripe_session_id.slice(-8).toUpperCase()}
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>{o.customer_email ?? "—"}</td>
                  <td style={{ padding: "0.75rem 0.5rem", maxWidth: "220px" }}>
                    {o.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>{formatEur(o.amount)}</td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>{o.status}</td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>
                    <select
                      value={o.admin_status}
                      onChange={(e) => updateOrder(o.id, { admin_status: e.target.value })}
                      style={{
                        border: "1px solid #e4e4e7",
                        borderRadius: "6px",
                        padding: "0.35rem 0.5rem",
                        fontSize: "0.8rem",
                        background: "#fff",
                      }}
                    >
                      {ADMIN_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>
                    <input
                      defaultValue={o.tracking_number ?? ""}
                      placeholder="N° suivi"
                      onBlur={(e) => {
                        if (e.target.value !== (o.tracking_number ?? "")) {
                          updateOrder(o.id, { tracking_number: e.target.value });
                        }
                      }}
                      style={{
                        border: "1px solid #e4e4e7",
                        borderRadius: "6px",
                        padding: "0.35rem 0.5rem",
                        fontSize: "0.8rem",
                        width: "110px",
                      }}
                    />
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem", color: "#64646c" }}>
                    {new Date(o.created_at).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
