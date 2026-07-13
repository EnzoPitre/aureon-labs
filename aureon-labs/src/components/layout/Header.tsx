"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/store";
import CartDrawer from "@/components/shop/CartDrawer";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCartStore();
  const count = totalItems();

  const navLinks = [
    { href: "/shop", label: "Collection" },
    { href: "/about", label: "À propos" },
    { href: "/contact", label: "Contact" },
  ];

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* Announcement bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "var(--announce-h)",
          background: "var(--cyan)",
          color: "#f1ede7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 101,
          fontSize: "12px",
          fontWeight: 600,
          textAlign: "center",
          padding: "0 1rem",
        }}
      >
        Livraison gratuite dès 35€ · Code WELCOME10 pour -10% sur ta 1ère commande
      </div>

      {/* Main header */}
      <header
        style={{
          position: "fixed",
          top: "var(--announce-h)",
          left: 0,
          right: 0,
          zIndex: 100,
          height: "var(--header-h)",
          display: "flex",
          alignItems: "center",
          background: "#f1ede7",
          borderBottom: "1px solid #d8cfc0",
        }}
      >
        <div
          className="container-main"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "3px" }}>
            <span style={{ fontSize: "16px", fontWeight: 700, color: "#282828" }}>Aureon Labs</span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="hidden-mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: "#4a4540", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <Link href="/auth" style={{ color: "#282828", display: "flex", alignItems: "center" }} title="Mon compte">
              <User size={18} strokeWidth={1.5} />
            </Link>

            <button
              onClick={toggleCart}
              style={{
                position: "relative",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#282828",
                display: "flex",
                alignItems: "center",
                padding: 0,
              }}
              title="Panier"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {count > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-8px",
                    background: "var(--cyan)",
                    color: "#f1ede7",
                    fontSize: "10px",
                    fontWeight: 700,
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {count}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#282828", display: "none", padding: 0 }}
              className="show-mobile"
            >
              {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "88px",
              left: 0,
              right: 0,
              background: "#f1ede7",
              borderBottom: "1px solid #d8cfc0",
              padding: "1.5rem 1.25rem",
              zIndex: 50,
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  color: "#4a4540",
                  textDecoration: "none",
                  padding: "0.875rem 0",
                  fontSize: "14px",
                  fontWeight: 500,
                  borderBottom: "1px solid #d8cfc0",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <CartDrawer />

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
