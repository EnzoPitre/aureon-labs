"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, User, Heart, Settings, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

type Tab = "orders" | "profile" | "wishlist" | "preferences";

type OrderItem = { slug: string | null; name: string; quantity: number; unitAmount: number };

type Order = {
  id: string;
  stripe_session_id: string;
  amount: number;
  currency: string;
  items: OrderItem[];
  status: "pending" | "paid" | "failed";
  admin_status: string;
  tracking_number: string | null;
  created_at: string;
};

const statusLabels: Record<string, { label: string; color: string }> = {
  en_preparation: { label: "En préparation", color: "#fbbf24" },
  expedie: { label: "Expédiée", color: "#282828" },
  livre: { label: "Livrée", color: "#22c55e" },
};

export default function AccountPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("orders");
  const [newsletter, setNewsletter] = useState(true);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/auth");
        return;
      }
      setUser(data.user);
    });
  }, [router]);

  useEffect(() => {
    if (!user?.email) return;
    supabase
      .from("orders")
      .select("*")
      .eq("customer_email", user.email)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setOrders((data as Order[]) ?? []);
        setLoadingOrders(false);
      });
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  const tabs = [
    { id: "orders" as Tab, label: "Commandes", icon: <Package size={16} /> },
    { id: "profile" as Tab, label: "Profil", icon: <User size={16} /> },
    { id: "wishlist" as Tab, label: "Wishlist", icon: <Heart size={16} /> },
    { id: "preferences" as Tab, label: "Préférences", icon: <Settings size={16} /> },
  ];

  if (!user) return null;

  return (
    <div style={{ paddingTop: "100px", minHeight: "100vh" }}>
      <div className="container-main" style={{ paddingBottom: "4rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Mon compte
          </h1>
          <p style={{ color: "#6b6459", marginTop: "0.5rem" }}>Bienvenue, {user.email} 👋</p>
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
                    background: tab === t.id ? "rgba(40,40,40,0.08)" : "transparent",
                    border: `1px solid ${tab === t.id ? "rgba(40,40,40,0.2)" : "transparent"}`,
                    borderRadius: "8px",
                    cursor: "pointer",
                    color: tab === t.id ? "#282828" : "#4a4540",
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

              <div style={{ borderTop: "1px solid #ddd5c7", marginTop: "1rem", paddingTop: "1rem" }}>
                <button
                  onClick={handleLogout}
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
                {loadingOrders ? (
                  <p style={{ color: "#6b6459" }}>Chargement...</p>
                ) : orders.length === 0 ? (
                  <p style={{ color: "#6b6459" }}>Vous n&apos;avez pas encore de commande.</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {orders.map((order) => {
                      const status = statusLabels[order.admin_status] ?? statusLabels.en_preparation;
                      return (
                        <div
                          key={order.id}
                          style={{
                            background: "#e8e1d5",
                            border: "1px solid #ddd5c7",
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
                              <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>
                                {order.stripe_session_id.slice(-8).toUpperCase()}
                              </span>
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
                            <p style={{ color: "#6b6459", fontSize: "0.8rem", marginBottom: "0.25rem" }}>
                              {new Date(order.created_at).toLocaleDateString("fr-FR")}
                            </p>
                            <p style={{ color: "#4a4540", fontSize: "0.875rem" }}>
                              {order.items.map((i) => i.name).join(", ")}
                            </p>
                            {order.tracking_number && (
                              <p style={{ color: "#6b6459", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                                Suivi : {order.tracking_number}
                              </p>
                            )}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <span style={{ fontWeight: 700 }}>{(order.amount / 100).toFixed(2)} €</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {tab === "profile" && (
              <div style={{ maxWidth: "480px" }}>
                <h2 style={{ fontWeight: 700, marginBottom: "1.5rem", fontSize: "1.25rem" }}>Mon profil</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.875rem", color: "#4a4540", marginBottom: "0.5rem" }}>Nom complet</label>
                    <input placeholder="Votre nom" className="input-field" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.875rem", color: "#4a4540", marginBottom: "0.5rem" }}>Email</label>
                    <input defaultValue={user.email} type="email" className="input-field" disabled />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.875rem", color: "#4a4540", marginBottom: "0.5rem" }}>Téléphone</label>
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
                <p style={{ color: "#6b6459" }}>
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
                      background: "#e8e1d5",
                      border: "1px solid #ddd5c7",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: "0.25rem", fontSize: "0.9rem" }}>Newsletter</p>
                      <p style={{ color: "#6b6459", fontSize: "0.8rem" }}>Nouveaux drops, conseils et offres exclusives</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                      style={{ width: "18px", height: "18px", accentColor: "#282828" }}
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
