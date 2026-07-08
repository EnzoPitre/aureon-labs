"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, RotateCcw, Truck, Star } from "lucide-react";
import { products } from "@/lib/products";

const TOTAL_REVIEWS = 2847;
const AVG_RATING = 4.8;

export default function Hero() {
  const heroProducts = products.slice(0, 3);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid #1e1e1e",
        paddingTop: "calc(var(--announce-h) + var(--header-h))",
      }}
      className="hero-section"
    >
      {/* Left — Text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "4rem 2.5rem 4rem 2.5rem",
          position: "relative",
          zIndex: 2,
        }}
        className="hero-left"
      >
        {/* Social proof pill */}
        <div style={{ marginBottom: "2rem" }}>
          <span className="proof-pill">
            <Star size={11} fill="currentColor" />
            {AVG_RATING}/5 · {TOTAL_REVIEWS.toLocaleString("fr-FR")} avis vérifiés · #1 bracelet WHOOP en France
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(3rem, 6vw, 6rem)",
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            color: "#efefef",
            marginBottom: "1.75rem",
          }}
        >
          Ton WHOOP.
          <br />
          Ton style.
          <br />
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 300,
              color: "var(--cyan)",
            }}
          >
            Zéro compromis.
          </em>
        </h1>

        <p
          style={{
            color: "#7a7a7a",
            fontSize: "15px",
            lineHeight: 1.75,
            maxWidth: "400px",
            marginBottom: "0.75rem",
          }}
        >
          15 designs exclusifs pour athlètes qui refusent le bracelet standard.
          Nylon premium, fermoir déployant, taille universelle.
        </p>

        {/* Price */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2.25rem",
          }}
        >
          <span
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "#efefef",
              letterSpacing: "-0.02em",
            }}
          >
            17,99€
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "var(--green)",
              fontWeight: 500,
            }}
          >
            · Livraison offerte dès 35€
          </span>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          <Link href="/shop" className="btn-primary">
            Commander maintenant
            <ArrowRight size={12} strokeWidth={2.5} />
          </Link>
          <Link href="/shop" className="btn-ghost">
            Voir les 15 designs
          </Link>
        </div>

        {/* Trust row */}
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { icon: <Truck size={13} strokeWidth={1.5} />, text: "Livraison 3–5j" },
            { icon: <RotateCcw size={13} strokeWidth={1.5} />, text: "Retours 30j" },
            { icon: <ShieldCheck size={13} strokeWidth={1.5} />, text: "Paiement sécurisé" },
          ].map((item) => (
            <div
              key={item.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "#5a5a5a",
                fontSize: "12px",
              }}
            >
              <span style={{ color: "#3a3a3a" }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "2.5rem",
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid #1e1e1e",
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "15", label: "Designs exclusifs" },
            { value: `${AVG_RATING}★`, label: "Note moyenne" },
            { value: "2 000+", label: "Clients satisfaits" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  color: "var(--cyan)",
                  lineHeight: 1,
                  marginBottom: "0.4rem",
                }}
              >
                {stat.value}
              </div>
              <div className="label" style={{ fontSize: "10px" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Product showcase */}
      <div
        style={{
          position: "relative",
          borderLeft: "1px solid #1e1e1e",
          background: "#0a0a0a",
          overflow: "hidden",
        }}
        className="hero-right"
      >
        {/* Radial glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 60% 40%, rgba(0,212,255,0.06) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        {/* LIMITED BADGE */}
        <div
          style={{
            position: "absolute",
            top: "1.5rem",
            left: "1.5rem",
            zIndex: 3,
          }}
        >
          <span className="badge-hot">🔥 Séries limitées</span>
        </div>

        {/* Product 1 — center, large */}
        <div
          style={{
            position: "absolute",
            width: "55%",
            aspectRatio: "1",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -52%) rotate(-8deg)",
            filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.6))",
          }}
        >
          <Image
            src={heroProducts[0].image}
            alt={heroProducts[0].name}
            fill
            style={{ objectFit: "contain" }}
            priority
            sizes="30vw"
          />
        </div>

        {/* Product 2 — top right */}
        <div
          style={{
            position: "absolute",
            width: "30%",
            aspectRatio: "1",
            top: "12%",
            right: "6%",
            opacity: 0.45,
            transform: "rotate(10deg)",
            filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.4))",
          }}
        >
          <Image
            src={heroProducts[1].image}
            alt={heroProducts[1].name}
            fill
            style={{ objectFit: "contain" }}
            sizes="15vw"
          />
        </div>

        {/* Product 3 — bottom left */}
        <div
          style={{
            position: "absolute",
            width: "28%",
            aspectRatio: "1",
            bottom: "12%",
            left: "4%",
            opacity: 0.35,
            transform: "rotate(-5deg)",
            filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.3))",
          }}
        >
          <Image
            src={heroProducts[2].image}
            alt={heroProducts[2].name}
            fill
            style={{ objectFit: "contain" }}
            sizes="15vw"
          />
        </div>

        {/* Product info card — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "1.5rem",
            right: "1.5rem",
            background: "rgba(8,8,8,0.9)",
            border: "1px solid #282828",
            backdropFilter: "blur(16px)",
            padding: "0.875rem 1.25rem",
            maxWidth: "200px",
          }}
        >
          <div className="label" style={{ fontSize: "9px", marginBottom: "0.25rem" }}>
            {heroProducts[0].name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#efefef" }}>
              17,99€
            </span>
            <span style={{ fontSize: "10px", color: "var(--amber)" }}>
              ★ {heroProducts[0].rating}
            </span>
          </div>
          <div style={{ marginTop: "0.625rem" }}>
            <Link
              href={`/shop/${heroProducts[0].slug}`}
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--cyan)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              Voir le design <ArrowRight size={9} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Live buyers indicator */}
        <div
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            background: "rgba(8,8,8,0.85)",
            border: "1px solid #282828",
            backdropFilter: "blur(12px)",
            padding: "0.5rem 0.875rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--green)",
              flexShrink: 0,
              boxShadow: "0 0 6px var(--green)",
            }}
          />
          <span style={{ fontSize: "10px", color: "#7a7a7a", fontWeight: 500 }}>
            23 personnes regardent
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr !important;
            min-height: 100svh;
            padding-top: calc(var(--announce-h) + var(--header-h)) !important;
          }
          .hero-right {
            display: none !important;
          }
          .hero-left {
            padding: 3rem 1.25rem 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
