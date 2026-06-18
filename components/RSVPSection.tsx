"use client";

import { motion } from "framer-motion";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const fromBottom = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function RSVPSection() {
  return (
    <section
      style={{ position: "relative", width: "100%", overflow: "hidden", padding: "64px 0 56px" }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 0,
          background:
            "radial-gradient(ellipse at 70% 20%, rgba(255,107,157,0.06) 0%, transparent 60%), " +
            "linear-gradient(180deg, #0B3D4E 0%, #072b38 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Decorative rings */}
      {[
        { size: 120, top: "8%",  left: "-15%", op: 0.06 },
        { size:  80, top: "70%", left: "80%",  op: 0.07 },
        { size:  50, top: "40%", left: "5%",   op: 0.09 },
      ].map((r, i) => (
        <div key={i} style={{ position: "absolute", top: r.top, left: r.left,
          width: r.size, height: r.size, borderRadius: "50%",
          border: `1.5px solid rgba(201,168,76,${r.op * 4})`,
          background: `rgba(201,168,76,${r.op})`, zIndex: 0, pointerEvents: "none" }} />
      ))}

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ position: "relative", zIndex: 1, padding: "0 24px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}
      >
        {/* Title */}
        <motion.h2
          variants={fromBottom}
          style={{
            fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
            fontSize: "2rem",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "12px",
            background: "linear-gradient(90deg, #ff6b9d, #ff9ff3, #ffd6e0, #ffb3c6, #ff6b9d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 2px 8px rgba(255,107,157,0.3))",
          }}
        >
          💌 Confirmar Asistencia
        </motion.h2>

        {/* Deadline note */}
        <motion.p
          variants={fromBottom}
          style={{
            fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
            fontSize: "0.9rem",
            fontStyle: "italic",
            color: "rgba(245,240,255,0.7)",
            textAlign: "center",
            marginBottom: "36px",
            lineHeight: 1.6,
          }}
        >
          
        </motion.p>

        {/* LiquidButton — WhatsApp CTA */}
        <motion.div variants={fromBottom} style={{ width: "85%", maxWidth: "320px" }}>
          <LiquidButton
            onClick={() => window.open("https://wa.me/50661993452", "_blank", "noopener,noreferrer")}
            className="w-full text-white font-bold text-lg py-4"
            style={{
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              borderRadius: "50px",
            }}
          >
            ✅ Confirmar por WhatsApp
          </LiquidButton>
        </motion.div>

        {/* Closing text */}
        <motion.p
          variants={fromBottom}
          style={{
            marginTop: "24px",
            fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
            fontSize: "1.3rem",
            fontStyle: "italic",
            color: "rgba(245,240,255,0.85)",
            textAlign: "center",
          }}
        >
          💙 Te esperamos 💙
        </motion.p>
      </motion.div>
    </section>
  );
}
