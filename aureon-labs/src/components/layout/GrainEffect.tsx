"use client";

export default function GrainEffect() {
  return (
    <>
      <svg
        style={{ position: "fixed", top: 0, left: 0, width: 0, height: 0 }}
        aria-hidden="true"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: "-50%",
          width: "200%",
          height: "200%",
          pointerEvents: "none",
          zIndex: 9999,
          filter: "url(#noise)",
          opacity: 0.028,
          animation: "grain 6s steps(8) infinite",
        }}
      />
    </>
  );
}
