"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const columns = [
    {
      title: "Boutique",
      links: [
        { href: "/shop", label: "Collection complète" },
        { href: "/shop", label: "Nouveautés" },
        { href: "/shop", label: "Best-sellers" },
      ],
    },
    {
      title: "Marque",
      links: [
        { href: "/about", label: "À propos" },
        { href: "/contact", label: "Contact" },
      ],
    },
    {
      title: "Compte",
      links: [
        { href: "/auth", label: "Connexion" },
        { href: "/account", label: "Mes commandes" },
        { href: "/account", label: "Wishlist" },
      ],
    },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid #1e1e1e",
        marginTop: "8rem",
      }}
    >
      {/* Brand strip */}
      <div
        style={{
          padding: "4rem 0 3rem",
          borderBottom: "1px solid #1e1e1e",
          overflow: "hidden",
        }}
      >
        <div className="container-main">
          <div
            style={{
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              fontWeight: 300,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "#141414",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            AUREON LABS
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="container-main" style={{ padding: "3rem 2.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "3rem",
          }}
          className="footer-grid"
        >
          {/* Brand description */}
          <div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#efefef",
                marginBottom: "1rem",
              }}
            >
              Aureon Labs
            </div>
            <p
              style={{
                color: "#3a3a3a",
                fontSize: "13px",
                lineHeight: 1.7,
                maxWidth: "260px",
              }}
            >
              Des bracelets WHOOP d&apos;exception pour ceux qui refusent de choisir entre la performance et l&apos;élégance.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#3a3a3a",
                  marginBottom: "1.25rem",
                }}
              >
                {col.title}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{
                      color: "#5a5a5a",
                      fontSize: "13px",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#efefef")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#5a5a5a")}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: "2rem",
            borderTop: "1px solid #1e1e1e",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ color: "#2a2a2a", fontSize: "12px", letterSpacing: "0.04em" }}>
            © {year} Aureon Labs. Tous droits réservés.
          </p>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["Twitter", "Instagram", "LinkedIn"].map((social) => (
              <span
                key={social}
                style={{
                  color: "#2a2a2a",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#5a5a5a")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#2a2a2a")}
              >
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
          .footer-grid > *:first-child {
            grid-column: 1 / -1;
          }
        }
      `}</style>
    </footer>
  );
}
