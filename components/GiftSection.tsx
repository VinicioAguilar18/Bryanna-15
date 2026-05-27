"use client";

import { motion } from "framer-motion";
import GiftBox3D from "./GiftBox3D";

/* ─── Stagger container variant ───────────────────────────────── */
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function GiftSection() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        padding: "60px 0 48px",
      }}
    >
      {/* ── Pearl-shimmer background overlay ────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(ellipse at 30% 60%, rgba(245,240,255,0.06) 0%, transparent 65%), " +
            "linear-gradient(180deg, #092f3d 0%, #0B3D4E 50%, #0a3545 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Content ──────────────────────────────────────────── */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* ── Section title ──────────────────────────────────── */}
        <motion.h2
          variants={item}
          style={{
            fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
            fontSize: "clamp(1.8rem, 6vw, 2.2rem)",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "20px",
            background:
              "linear-gradient(90deg, #ff6b9d, #ff9ff3, #ffd6e0, #ffb3c6, #ff6b9d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 2px 6px rgba(255,107,157,0.3))",
          }}
        >
          🎁 Un detalle de amor
        </motion.h2>

        {/* ── Decorative gold rule ─────────────────────────── */}
        <motion.div
          variants={item}
          style={{
            width: "60px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
            borderRadius: "2px",
            marginBottom: "24px",
          }}
        />

        {/* ── Body text ────────────────────────────────────── */}
        <motion.p
          variants={item}
          style={{
            fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
            fontSize: "0.95rem",
            lineHeight: 1.85,
            color: "rgba(245,240,255,0.9)",
            textAlign: "center",
            maxWidth: "360px",
          }}
        >
          Si deseas regalarme un detalle en este día tan especial, con mucha
          gratitud recibiré tu muestra de cariño, ya sea en efectivo o por{" "}
          <span
            style={{
              fontWeight: 600,
              color: "#C9A84C",
              whiteSpace: "nowrap",
            }}
          >
            Sinpe Móvil al&nbsp;6199-3452
          </span>
          . En la celebración encontrarás una mesita con sobres donde podrás
          dejarlo con todo tu amor.{" "}
          <span style={{ color: "#FF6B9D" }}>💝</span>
        </motion.p>

        {/* ── 3-D Gift Box ─────────────────────────────────── */}
        <motion.div
          variants={item}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <GiftBox3D />
        </motion.div>

        {/* ── Phone number pill ────────────────────────────── */}
        <motion.div
          variants={item}
          style={{
            marginTop: "4px",
            padding: "10px 24px",
            background: "rgba(201,168,76,0.12)",
            border: "1px solid rgba(201,168,76,0.35)",
            borderRadius: "50px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "1.1rem" }}>📱</span>
          <span
            style={{
              fontFamily: "var(--font-poppins), sans-serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: "#C9A84C",
              letterSpacing: "0.06em",
            }}
          >
            6199-3452
          </span>
          <span
            style={{
              fontFamily: "var(--font-poppins), sans-serif",
              fontSize: "0.75rem",
              color: "rgba(245,240,255,0.6)",
              fontWeight: 500,
            }}
          >
            Sinpe Móvil
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
