"use client";

import { X, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { items: getItems, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();
  const items = getItems();
  const total = totalPrice();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 200,
          backdropFilter: "blur(6px)",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(400px, 100vw)",
          background: "#f1ede7",
          borderLeft: "1px solid #d8cfc0",
          zIndex: 201,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid #d8cfc0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#282828",
            }}
          >
            Panier ({items.length})
          </span>
          <button
            onClick={closeCart}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#83796b",
              display: "flex",
              padding: 0,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#282828")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#83796b")}
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "1.5rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  border: "1px solid #d8cfc0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#c4b9a6",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <div>
                <p
                  style={{
                    color: "#a39a8a",
                    fontSize: "13px",
                    marginBottom: "1.25rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  Votre panier est vide
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="btn-primary"
                  style={{ fontSize: "10px" }}
                >
                  Explorer la collection
                </Link>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {items.map((item, i) => (
                <div
                  key={item.product.id}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    padding: "1.25rem 0",
                    borderBottom: i < items.length - 1 ? "1px solid #d8cfc0" : "none",
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      position: "relative",
                      width: 64,
                      height: 64,
                      flexShrink: 0,
                      background: "#ece6dc",
                      border: "1px solid #d8cfc0",
                    }}
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      style={{ objectFit: "contain", padding: "0.5rem" }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <p
                        style={{
                          fontWeight: 500,
                          fontSize: "13px",
                          color: "#282828",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {item.product.name}
                      </p>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#c4b9a6",
                          padding: 0,
                          flexShrink: 0,
                          marginLeft: "0.5rem",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#83796b")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#c4b9a6")}
                        title="Retirer"
                      >
                        <Trash2 size={13} strokeWidth={1.5} />
                      </button>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* Qty controls */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0",
                          border: "1px solid #d8cfc0",
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#83796b",
                            width: "26px",
                            height: "26px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                            lineHeight: 1,
                            transition: "color 0.2s",
                          }}
                        >
                          −
                        </button>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#282828",
                            minWidth: "24px",
                            textAlign: "center",
                            borderLeft: "1px solid #d8cfc0",
                            borderRight: "1px solid #d8cfc0",
                            height: "26px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#83796b",
                            width: "26px",
                            height: "26px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                            lineHeight: 1,
                            transition: "color 0.2s",
                          }}
                        >
                          +
                        </button>
                      </div>

                      <span style={{ fontSize: "13px", color: "#5c564e", fontWeight: 300 }}>
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: "1.5rem", borderTop: "1px solid #d8cfc0" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.375rem",
              }}
            >
              <span style={{ fontSize: "11px", color: "#83796b", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Sous-total
              </span>
              <span style={{ fontSize: "14px", fontWeight: 300, color: "#282828" }}>
                {formatPrice(total)}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ fontSize: "11px", color: "#a39a8a", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Livraison
              </span>
              <span style={{ fontSize: "11px", color: "#a39a8a" }}>
                Calculée au checkout
              </span>
            </div>

            <Link
              href="/cart"
              onClick={closeCart}
              className="btn-primary"
              style={{ width: "100%", marginBottom: "0.625rem", fontSize: "10px" }}
            >
              Passer la commande
            </Link>
            <button
              onClick={closeCart}
              className="btn-secondary"
              style={{ width: "100%", fontSize: "10px" }}
            >
              Continuer les achats
            </button>
          </div>
        )}
      </div>
    </>
  );
}
