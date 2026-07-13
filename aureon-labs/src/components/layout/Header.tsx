"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/store";
import CartDrawer from "@/components/shop/CartDrawer";

const announcements = [
  "🎁 Livraison gratuite dès 35€ · Code WELCOME10 pour -10% sur ta 1ère commande",
  "⚡ Expédition sous 24h · Retours gratuits 30 jours",
  "🔥 Séries limitées — Il reste peu de stock sur certains designs",
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [announceIdx, setAnnounceIdx] = useState(0);
  const [announceVisible, setAnnounceVisible] = useState(true);
  const { totalItems, toggleCart } = useCartStore();
  const count = totalItems();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnounceVisible(false);
      setTimeout(() => {
        setAnnounceIdx((i) => (i + 1) % announcements.length);
        setAnnounceVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { href: "/shop", label: "Collection" },
    { href: "/about", label: "À propos" },
    { href: "/contact", label: "Contact" },
  ];

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
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 101,
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textAlign: "center",
          padding: "0 1rem",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            transition: "opacity 0.3s, transform 0.3s",
            opacity: announceVisible ? 1 : 0,
            transform: announceVisible ? "translateY(0)" : "translateY(-6px)",
            display: "block",
          }}
        >
          {announcements[announceIdx]}
        </span>
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
          transition: "background 0.4s ease, border-color 0.4s ease",
          background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: `1px solid ${scrolled ? "#e4e4e7" : "transparent"}`,
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
          <Link
            href="/"
            style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "3px" }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#18181b",
              }}
            >
              Aureon
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 400,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#d1d1d6",
              }}
            >
              Labs
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", gap: "2.5rem", alignItems: "center" }} className="hidden-mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: "#8b8b93",
                  textDecoration: "none",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#18181b")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8b8b93")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            {/* Shop CTA — desktop */}
            <Link
              href="/shop"
              className="btn-primary hidden-mobile"
              style={{ padding: "0.5rem 1.25rem", fontSize: "10px" }}
            >
              Commander
            </Link>

            <Link
              href="/auth"
              style={{ color: "#8b8b93", display: "flex", alignItems: "center", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#18181b")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8b8b93")}
              title="Mon compte"
            >
              <User size={16} strokeWidth={1.5} />
            </Link>

            <button
              onClick={toggleCart}
              style={{
                position: "relative",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#18181b",
                display: "flex",
                alignItems: "center",
                padding: 0,
              }}
              title="Panier"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              {count > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-6px",
                    background: "var(--cyan)",
                    color: "#ffffff",
                    fontSize: "9px",
                    fontWeight: 700,
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    letterSpacing: 0,
                  }}
                >
                  {count}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#18181b",
                display: "none",
                padding: 0,
              }}
              className="show-mobile"
            >
              {menuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "52px",
              left: 0,
              right: 0,
              background: "#ffffff",
              borderBottom: "1px solid #e4e4e7",
              padding: "1.5rem 1.25rem",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  color: "#8b8b93",
                  textDecoration: "none",
                  padding: "0.875rem 0",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderBottom: "1px solid #e4e4e7",
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                marginTop: "1rem",
                textAlign: "center",
                color: "#ffffff",
                textDecoration: "none",
                padding: "0.875rem",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: "var(--cyan)",
              }}
            >
              Commander maintenant
            </Link>
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
