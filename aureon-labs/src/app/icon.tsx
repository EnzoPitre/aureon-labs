import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#282828",
          borderRadius: 7,
          fontFamily: "Georgia, serif",
        }}
      >
        <span
          style={{
            color: "#f1ede7",
            fontSize: 20,
            fontWeight: 700,
            transform: "translateY(-1px)",
          }}
        >
          A
        </span>
      </div>
    ),
    { ...size }
  );
}
