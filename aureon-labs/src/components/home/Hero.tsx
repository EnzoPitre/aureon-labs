"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, RotateCcw, Truck, Star } from "lucide-react";
import { products } from "@/lib/products";

const TOTAL_REVIEWS = 2847;
const AVG_RATING = 4.8;

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero() {
  const alpsSession = products.find((p) => p.slug === "alps-session") ?? products[0];

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid #d8cfc0",
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
          padding: "4rem 3rem 4rem 3rem",
          position: "relative",
          zIndex: 2,
        }}
        className="hero-left"
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          style={{ marginBottom: "1.5rem" }}
        >
          <span className="proof-pill">
            <Star size={11} fill="currentColor" />
            {AVG_RATING}/5 · {TOTAL_REVIEWS.toLocaleString("fr-FR")} avis vérifiés
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-serif"
          style={{
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            fontWeight: 500,
            fontStyle: "italic",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            color: "#282828",
            marginBottom: "1.5rem",
          }}
        >
          Ton WHOOP.
          <br />
          Ton style.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          style={{
            color: "#5c564e",
            fontSize: "16px",
            lineHeight: 1.7,
            maxWidth: "400px",
            marginBottom: "2rem",
          }}
        >
          15 designs exclusifs pour athlètes qui refusent le bracelet standard.
          Nylon premium, fermoir déployant, taille universelle.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          style={{ fontSize: "20px", fontWeight: 600, color: "#282828", marginBottom: "2rem" }}
        >
          21,99€
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "3rem" }}
        >
          <Link href="/shop" className="btn-primary">
            Commander maintenant
            <ArrowRight size={12} strokeWidth={2.5} />
          </Link>
          <Link href="/shop" className="btn-ghost">
            Voir la collection
          </Link>
        </motion.div>

        {/* Mobile image */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="hero-mobile-image"
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "4/3",
            marginBottom: "3rem",
            overflow: "hidden",
            border: "1px solid #d8cfc0",
            borderRadius: "8px",
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

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          style={{
            display: "flex",
            gap: "2rem",
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
                color: "#83796b",
                fontSize: "12px",
              }}
            >
              <span style={{ color: "#a39a8a" }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right — single clean product shot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          position: "relative",
          borderLeft: "1px solid #d8cfc0",
          background: "#ece6dc",
        }}
        className="hero-right"
      >
        <Image
          src="/lifestyle/alps-session-flatlay.png"
          alt={alpsSession.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="50vw"
          priority
        />
      </motion.div>

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
