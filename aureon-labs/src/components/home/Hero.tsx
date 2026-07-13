import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";

export default function Hero() {
  const alpsSession = products.find((p) => p.slug === "alps-session") ?? products[0];

  return (
    <section
      style={{
        position: "relative",
        borderBottom: "1px solid #d8cfc0",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "380px",
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(40,40,40,0.35)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "1.5rem",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: "#f1ede7",
              marginBottom: "0.75rem",
            }}
          >
            Ton WHOOP. Ton style.
          </h1>
          <p
            style={{
              color: "#f1ede7",
              fontSize: "15px",
              maxWidth: "480px",
              marginBottom: "1.5rem",
            }}
          >
            15 designs exclusifs de bracelets premium à partir de 21,99€.
          </p>
          <Link href="/shop" className="btn-primary">
            Découvrir la collection
          </Link>
        </div>
      </div>
    </section>
  );
}
