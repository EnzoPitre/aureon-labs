"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

export default function Toast({ message, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 2800);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.75rem",
        right: "1.75rem",
        background: "#ece6dc",
        border: "1px solid #c9bfae",
        padding: "0.875rem 1.125rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        zIndex: 500,
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        animation: "fade-up 0.25s ease-out",
        minWidth: "240px",
        maxWidth: "320px",
      }}
    >
      <span
        style={{
          width: "18px",
          height: "18px",
          border: "1px solid #c9bfae",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: "#282828",
        }}
      >
        <Check size={10} strokeWidth={2.5} />
      </span>
      <span style={{ fontSize: "12px", color: "#282828", flex: 1, letterSpacing: "0.01em" }}>
        {message}
      </span>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#a39a8a",
          padding: 0,
          display: "flex",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#5c564e")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#a39a8a")}
      >
        <X size={13} strokeWidth={1.5} />
      </button>
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState({ visible: false, message: "" });

  const show = (message: string) => setToast({ visible: true, message });
  const hide = () => setToast((t) => ({ ...t, visible: false }));

  return { toast, show, hide };
}
