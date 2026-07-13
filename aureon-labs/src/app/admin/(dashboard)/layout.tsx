"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, Tag, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Commandes", icon: Package },
  { href: "/admin/promo-codes", label: "Codes promo", icon: Tag },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "220px 1fr" }}>
      <aside
        style={{
          borderRight: "1px solid #d8cfc0",
          padding: "1.5rem 1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: "0.9rem", padding: "0.5rem 0.75rem", marginBottom: "1.5rem" }}>
          Aureon Labs <span style={{ color: "#5c564e", fontWeight: 400 }}>Admin</span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.625rem 0.75rem",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: active ? 600 : 400,
                  color: active ? "#282828" : "#3a3632",
                  background: active ? "rgba(40,40,40,0.08)" : "transparent",
                  textDecoration: "none",
                }}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.625rem 0.75rem",
            border: "none",
            background: "transparent",
            color: "#ef4444",
            fontSize: "0.85rem",
            cursor: "pointer",
            borderRadius: "8px",
          }}
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </aside>

      <main style={{ padding: "2.5rem 3rem" }}>{children}</main>
    </div>
  );
}
