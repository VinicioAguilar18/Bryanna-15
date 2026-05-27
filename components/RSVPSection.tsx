"use client";

import { motion } from "framer-motion";

/* ─── Stagger variants ─────────────────────────────────────────── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const fromBottom = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function RSVPSection() {
  function handleWhatsApp() {
    window.open("https://wa.me/50661993452", "_blank", "noopener,noreferrer");
  }

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        padding: "64px 0 56px",
      }}
    >
      {/* ── Background — deeper teal shade ───────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(ellipse at 70% 20%, rgba(255,107,157,0.06) 0%, transparent 60%), " +
            "linear-gradient(180deg, #0B3D4E 0%, #072b38 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Decorative floating rings ─────────────────────────── */}
      {[
        { size: 120, top: "8%",  left: "-15%", op: 0.06 },
        { size:  80, top: "70%", left: "80%",  op: 0.07 },
        { size:  50, top: "40%", left: "5%",   op: 0.09 },
      ].map((r, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: r.top,
            left: r.left,
            width:  r.size,
            height: r.size,
            borderRadius: "50%",
            border: `1.5px solid rgba(201,168,76,${r.op * 4})`,
            background: `rgba(201,168,76,${r.op})`,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ── Content ──────────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          position: "relative",
          zIndex: 1,
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0",
        }}
      >
        {/* ── Section title (rainbow gradient) ─────────────── */}
        <motion.h2
          variants={fromBottom}
          style={{
            fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
            fontSize: "clamp(1.9rem, 6.5vw, 2.4rem)",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "10px",
            background:
              "linear-gradient(90deg, #ff6b9d, #ff9ff3, #ffd6e0, #ffb3c6, #ff6b9d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 2px 8px rgba(255,107,157,0.3))",
          }}
        >
          💌 Confirmar Asistencia
        </motion.h2>

        {/* ── Subtitle ─────────────────────────────────────── */}
        <motion.p
          variants={fromBottom}
          style={{
            fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
            fontSize: "0.88rem",
            color: "rgba(245,240,255,0.65)",
            textAlign: "center",
            marginBottom: "36px",
            lineHeight: 1.6,
            maxWidth: "300px",
          }}
        >
          Tu confirmación nos ayuda a preparar todo
          <br />
          con amor para recibirte 🌊
        </motion.p>

        {/* ── WhatsApp CTA button ───────────────────────────── */}
        <motion.button
          variants={fromBottom}
          onClick={handleWhatsApp}
          whileHover={{ scale: 1.05, boxShadow: "0 12px 35px rgba(37,211,102,0.55)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "50px",
            padding: "16px 32px",
            fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
            fontSize: "1.05rem",
            fontWeight: 700,
            width: "85%",
            maxWidth: "320px",
            cursor: "pointer",
            boxShadow: "0 8px 25px rgba(37,211,102,0.38)",
            letterSpacing: "0.02em",
            transition: "box-shadow 0.25s ease",
          }}
        >
          {/* WhatsApp icon */}
          <WhatsAppIcon />
          ✅ Confirmar por WhatsApp
        </motion.button>

        {/* ── Warm closing line ─────────────────────────────── */}
        <motion.p
          variants={fromBottom}
          style={{
            marginTop: "28px",
            fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
            fontSize: "1.1rem",
            fontStyle: "italic",
            color: "rgba(245,240,255,0.8)",
            textAlign: "center",
          }}
        >
          Te esperamos con mucho amor 🐚🌊
        </motion.p>

        {/* ── Date reminder chip ────────────────────────────── */}
        <motion.div
          variants={fromBottom}
          style={{
            marginTop: "20px",
            padding: "8px 20px",
            background: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.3)",
            borderRadius: "50px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span style={{ fontSize: "1rem" }}>🗓️</span>
          <span
            style={{
              fontFamily: "var(--font-poppins), sans-serif",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#C9A84C",
              letterSpacing: "0.06em",
            }}
          >
            Sábado 27 de Junio · 5:00 PM
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── WhatsApp SVG icon ──────────────────────────────────────── */
function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ flexShrink: 0 }}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
