"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, RotateCcw, Truck, Star } from "lucide-react";
import { products } from "@/lib/products";

const TOTAL_REVIEWS = 2847;
const AVG_RATING = 4.8;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero() {
  const heroProducts = products.slice(0, 3);
  const alpsSession = products.find((p) => p.slug === "alps-session") ?? heroProducts[0];

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid #e4e4e7",
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
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          style={{ marginBottom: "2rem" }}
        >
          <span className="proof-pill">
            <Star size={11} fill="currentColor" />
            {AVG_RATING}/5 · {TOTAL_REVIEWS.toLocaleString("fr-FR")} avis vérifiés · #1 bracelet WHOOP en France
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          style={{
            fontSize: "clamp(3rem, 6vw, 6rem)",
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            color: "#18181b",
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
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          style={{
            color: "#64646c",
            fontSize: "15px",
            lineHeight: 1.75,
            maxWidth: "400px",
            marginBottom: "0.75rem",
          }}
        >
          15 designs exclusifs pour athlètes qui refusent le bracelet standard.
          Nylon premium, fermoir déployant, taille universelle.
        </motion.p>

        {/* Price */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
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
              color: "#18181b",
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
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.5rem" }}
        >
          <Link href="/shop" className="btn-primary">
            Commander maintenant
            <ArrowRight size={12} strokeWidth={2.5} />
          </Link>
          <Link href="/shop" className="btn-ghost">
            Voir les 15 designs
          </Link>
        </motion.div>

        {/* Mobile lifestyle image */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="hero-mobile-image"
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "4/3",
            marginBottom: "2.5rem",
            overflow: "hidden",
            border: "1px solid #e4e4e7",
          }}
        >
          <Image
            src="/lifestyle/alps-session-flatlay.png"
            alt={alpsSession.name}
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="100vw"
          />
        </motion.div>

        {/* Trust row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
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
                color: "#8b8b93",
                fontSize: "12px",
              }}
            >
              <span style={{ color: "#a1a1aa" }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={6}
          style={{
            display: "flex",
            gap: "2.5rem",
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid #e4e4e7",
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
        </motion.div>
      </div>

      {/* Right — Editorial lifestyle visual */}
      <div
        style={{
          position: "relative",
          borderLeft: "1px solid #e4e4e7",
          background: "#ffffff",
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
              "radial-gradient(ellipse at 60% 40%, rgba(37,99,235,0.06) 0%, transparent 60%)",
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

        {/* Flat-lay — background editorial shot */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            width: "78%",
            aspectRatio: "16/9",
            top: "10%",
            right: "-6%",
            filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.6))",
          }}
        >
          <Image
            src="/lifestyle/alps-session-flatlay.png"
            alt={`${alpsSession.name} — vue détaillée`}
            fill
            style={{ objectFit: "cover" }}
            sizes="35vw"
            priority
          />
        </motion.div>

        {/* On-wrist shot — floating accent card */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -6 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0],
            rotate: -4,
          }}
          transition={{
            opacity: { duration: 0.9, delay: 0.3 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
            rotate: { duration: 0.9, delay: 0.3 },
          }}
          style={{
            position: "absolute",
            width: "42%",
            aspectRatio: "1",
            bottom: "8%",
            left: "6%",
            border: "1px solid #d4d4d8",
            boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
        >
          <Image
            src="/lifestyle/alps-session-wrist.jpg"
            alt={`${alpsSession.name} — porté au poignet`}
            fill
            style={{ objectFit: "cover" }}
            sizes="20vw"
          />
        </motion.div>

        {/* Product info card — bottom right */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            position: "absolute",
            bottom: "1.5rem",
            right: "1.5rem",
            background: "rgba(255,255,255,0.9)",
            border: "1px solid #d4d4d8",
            backdropFilter: "blur(16px)",
            padding: "0.875rem 1.25rem",
            maxWidth: "200px",
          }}
        >
          <div className="label" style={{ fontSize: "9px", marginBottom: "0.25rem" }}>
            {alpsSession.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#18181b" }}>
              17,99€
            </span>
            <span style={{ fontSize: "10px", color: "var(--amber)" }}>
              ★ {alpsSession.rating}
            </span>
          </div>
          <div style={{ marginTop: "0.625rem" }}>
            <Link
              href={`/shop/${alpsSession.slug}`}
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
        </motion.div>

        {/* Live buyers indicator */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            background: "rgba(255,255,255,0.85)",
            border: "1px solid #d4d4d8",
            backdropFilter: "blur(12px)",
            padding: "0.5rem 0.875rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--green)",
              flexShrink: 0,
              boxShadow: "0 0 6px var(--green)",
            }}
          />
          <span style={{ fontSize: "10px", color: "#64646c", fontWeight: 500 }}>
            23 personnes regardent
          </span>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .hero-mobile-image {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr !important;
            min-height: auto;
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
