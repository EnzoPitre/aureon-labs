import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GrainEffect from "@/components/layout/GrainEffect";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: {
    default: "Aureon Labs — Performance Meets Design",
    template: "%s | Aureon Labs",
  },
  description:
    "Bracelets WHOOP ultra-premium. Des designs exclusifs pour athlètes qui exigent la perfection.",
  keywords: ["WHOOP bracelet", "bracelet fitness", "bracelet premium", "Aureon Labs"],
  openGraph: {
    type: "website",
    siteName: "Aureon Labs",
    title: "Aureon Labs — Performance Meets Design",
    description: "Bracelets WHOOP ultra-premium pour athlètes d'exception.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${serif.variable}`}>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <GrainEffect />
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
