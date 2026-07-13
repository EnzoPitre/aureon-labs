"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

type PromoCode = {
  id: string;
  code: string;
  label: string | null;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  max_uses: number | null;
  current_uses: number;
  is_active: boolean;
  show_on_site: boolean;
  expires_at: string | null;
  created_at: string;
};

const emptyForm = {
  code: "",
  label: "",
  discount_type: "percentage" as "percentage" | "fixed",
  discount_value: 10,
  max_uses: "",
  expires_at: "",
};

export default function AdminPromoCodesPage() {
  const [codes, setCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [creating, setCreating] = useState(false);

  const load = () => {
    fetch("/api/admin/promo-codes")
      .then((r) => r.json())
      .then((d) => {
        setCodes(d.promoCodes ?? []);
        setLoading(false);
      });
  };

  useEffect(load, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    await fetch("/api/admin/promo-codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        max_uses: form.max_uses ? Number(form.max_uses) : null,
        expires_at: form.expires_at || null,
      }),
    });
    setForm(emptyForm);
    setCreating(false);
    load();
  };

  const toggleActive = async (c: PromoCode) => {
    setCodes((prev) => prev.map((p) => (p.id === c.id ? { ...p, is_active: !p.is_active } : p)));
    await fetch(`/api/admin/promo-codes/${c.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !c.is_active }),
    });
  };

  const remove = async (c: PromoCode) => {
    if (!confirm(`Supprimer le code ${c.code} ?`)) return;
    setCodes((prev) => prev.filter((p) => p.id !== c.id));
    await fetch(`/api/admin/promo-codes/${c.id}`, { method: "DELETE" });
  };

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "2rem" }}>Codes promo</h1>

      <form
        onSubmit={handleCreate}
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          alignItems: "flex-end",
          border: "1px solid #e4e4e7",
          borderRadius: "10px",
          padding: "1.25rem",
          marginBottom: "2rem",
          background: "#fafafa",
        }}
      >
        <div>
          <label style={{ display: "block", fontSize: "0.75rem", color: "#64646c", marginBottom: "0.3rem" }}>
            Code
          </label>
          <input
            required
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            placeholder="ETE2026"
            style={{ border: "1px solid #e4e4e7", borderRadius: "6px", padding: "0.5rem 0.625rem", fontSize: "0.85rem", width: "140px" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.75rem", color: "#64646c", marginBottom: "0.3rem" }}>
            Type
          </label>
          <select
            value={form.discount_type}
            onChange={(e) => setForm({ ...form, discount_type: e.target.value as "percentage" | "fixed" })}
            style={{ border: "1px solid #e4e4e7", borderRadius: "6px", padding: "0.5rem 0.625rem", fontSize: "0.85rem" }}
          >
            <option value="percentage">Pourcentage</option>
            <option value="fixed">Montant fixe (€)</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.75rem", color: "#64646c", marginBottom: "0.3rem" }}>
            Valeur
          </label>
          <input
            required
            type="number"
            min={0}
            step="0.01"
            value={form.discount_value}
            onChange={(e) => setForm({ ...form, discount_value: Number(e.target.value) })}
            style={{ border: "1px solid #e4e4e7", borderRadius: "6px", padding: "0.5rem 0.625rem", fontSize: "0.85rem", width: "90px" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.75rem", color: "#64646c", marginBottom: "0.3rem" }}>
            Utilisations max
          </label>
          <input
            type="number"
            min={0}
            value={form.max_uses}
            onChange={(e) => setForm({ ...form, max_uses: e.target.value })}
            placeholder="Illimité"
            style={{ border: "1px solid #e4e4e7", borderRadius: "6px", padding: "0.5rem 0.625rem", fontSize: "0.85rem", width: "110px" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.75rem", color: "#64646c", marginBottom: "0.3rem" }}>
            Expire le
          </label>
          <input
            type="date"
            value={form.expires_at}
            onChange={(e) => setForm({ ...form, expires_at: e.target.value })}
            style={{ border: "1px solid #e4e4e7", borderRadius: "6px", padding: "0.5rem 0.625rem", fontSize: "0.85rem" }}
          />
        </div>
        <button type="submit" disabled={creating} className="btn-primary" style={{ height: "37px" }}>
          {creating ? "..." : "Créer"}
        </button>
      </form>

      {loading ? (
        <p style={{ color: "#64646c" }}>Chargement...</p>
      ) : codes.length === 0 ? (
        <p style={{ color: "#64646c" }}>Aucun code promo.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e4e4e7", textAlign: "left" }}>
              {["Code", "Réduction", "Utilisations", "Expire", "Actif", ""].map((h) => (
                <th key={h} style={{ padding: "0.75rem 0.5rem", color: "#64646c", fontWeight: 500 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {codes.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid #f2f2f4" }}>
                <td style={{ padding: "0.75rem 0.5rem", fontWeight: 600 }}>{c.code}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>
                  {c.discount_type === "percentage" ? `${c.discount_value}%` : `${c.discount_value}€`}
                </td>
                <td style={{ padding: "0.75rem 0.5rem" }}>
                  {c.current_uses}{c.max_uses ? ` / ${c.max_uses}` : ""}
                </td>
                <td style={{ padding: "0.75rem 0.5rem" }}>
                  {c.expires_at ? new Date(c.expires_at).toLocaleDateString("fr-FR") : "—"}
                </td>
                <td style={{ padding: "0.75rem 0.5rem" }}>
                  <button
                    onClick={() => toggleActive(c)}
                    style={{
                      border: "none",
                      borderRadius: "100px",
                      padding: "0.25rem 0.75rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      background: c.is_active ? "rgba(16,185,129,0.1)" : "rgba(113,113,122,0.1)",
                      color: c.is_active ? "#10b981" : "#71717a",
                    }}
                  >
                    {c.is_active ? "Actif" : "Inactif"}
                  </button>
                </td>
                <td style={{ padding: "0.75rem 0.5rem" }}>
                  <button
                    onClick={() => remove(c)}
                    style={{ border: "none", background: "none", cursor: "pointer", color: "#ef4444" }}
                    title="Supprimer"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
