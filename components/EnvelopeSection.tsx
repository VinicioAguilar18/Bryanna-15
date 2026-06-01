"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import styled from "@emotion/styled";
import { imgPath } from "@/lib/utils";

/* ─── Emotion styled components ────────────────────────────────── */

const ParchmentCard = styled(motion.div)`
  background: linear-gradient(145deg, #fffef7, #fef9e7, #fdf3c7);
  border-radius: 18px;
  border: 1.5px solid #c9a84c;
  box-shadow:
    0 6px 28px rgba(201, 168, 76, 0.22),
    0 1px 4px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  padding: 28px 22px 24px;
  width: 100%;
  overflow: hidden;
`;

const DateText = styled.p`
  font-family: var(--font-dancing), "Dancing Script", cursive;
  font-size: clamp(1.4rem, 5vw, 1.9rem);
  font-weight: 700;
  color: #c9a84c;
  text-align: center;
  line-height: 1.4;
  margin-bottom: 4px;
`;

/* ─── Animated shimmer divider ───────────────────────────────── */
function ShimmerDivider() {
  return (
    <div
      style={{
        position: "relative",
        height: "2px",
        margin: "18px 0",
        background: "linear-gradient(90deg, transparent, #C9A84C 40%, transparent)",
        overflow: "hidden",
        borderRadius: "2px",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
        }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
      />
    </div>
  );
}

/* ─── Map loading skeleton ───────────────────────────────────── */
function MapSkeleton() {
  return (
    <div
      className="skeleton-pulse"
      style={{
        width: "100%",
        height: "220px",
        borderRadius: "12px",
        background: "linear-gradient(135deg, rgba(11,61,78,0.15) 0%, rgba(201,168,76,0.1) 100%)",
        border: "2px solid rgba(201,168,76,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <span style={{ fontSize: "1.8rem" }}>🗺️</span>
      <span style={{ fontFamily: "var(--font-poppins), sans-serif", fontSize: "0.78rem", color: "#0B3D4E" }}>
        Cargando mapa…
      </span>
    </div>
  );
}

/* ─── Card stagger variants ──────────────────────────────────── */
const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.08 } },
} as const;

const cardItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
} as const;

/* ─── Main component ─────────────────────────────────────────── */
export default function EnvelopeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);

  const isEnvelopeInView = useInView(envelopeRef, { amount: 0.5, once: true });
  const [isOpen, setIsOpen] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (isEnvelopeInView) {
      const t = setTimeout(() => setIsOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, [isEnvelopeInView]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const sectionBgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative", width: "100%", overflow: "hidden", padding: "64px 0 56px" }}
    >
      {/* Background */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-10% 0",
          zIndex: 0,
          y: sectionBgY,
          background:
            "radial-gradient(ellipse at 60% 30%, rgba(201,168,76,0.07) 0%, transparent 70%), " +
            "linear-gradient(180deg, #0B3D4E 0%, #092f3d 100%)",
        }}
      />

      {/* Decorative bubbles */}
      {[
        { top: "8%",  left: "6%",  s: 40, op: 0.06 },
        { top: "72%", left: "88%", s: 60, op: 0.05 },
        { top: "45%", left: "2%",  s: 28, op: 0.07 },
      ].map((b, i) => (
        <div key={i} style={{ position: "absolute", top: b.top, left: b.left, width: b.s, height: b.s,
          borderRadius: "50%", border: `1px solid rgba(201,168,76,${b.op * 4})`,
          background: `rgba(201,168,76,${b.op})`, zIndex: 0, pointerEvents: "none" }} />
      ))}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 20px", display: "flex",
        flexDirection: "column", alignItems: "center" }}>

        {/* Section heading */}
        <motion.p
          style={{
            fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
            fontSize: "clamp(1.6rem, 5.5vw, 2rem)",
            color: "#C9A84C",
            textAlign: "center",
            marginBottom: "28px",
          }}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          🐚 Una invitación especial para ti
        </motion.p>

        {/* Envelope image */}
        <motion.div
          ref={envelopeRef}
          style={{ position: "relative", width: "240px", height: "auto", cursor: "pointer" }}
          initial={{ opacity: 0, scale: 0.8, y: 60 }}
          whileInView={{ opacity: 1, scale: 1.0, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              maxWidth: "320px",
              borderRadius: "16px",
              display: "block",
              margin: "0 auto",
            }}
          >
            <source src={imgPath("/images/Sobre.mp4")} type="video/mp4" />
          </video>

          {/* Flap overlay */}
          <motion.div
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%",
              background: "linear-gradient(180deg, rgba(201,168,76,0.45) 0%, rgba(201,168,76,0.15) 100%)",
              backdropFilter: "blur(2px)", borderRadius: "8px 8px 0 0", transformOrigin: "top center" }}
            initial={{ rotateX: 0, opacity: 1 }}
            animate={isOpen ? { rotateX: -172, opacity: 0 } : { rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* Sealed badge */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                style={{ position: "absolute", bottom: "-12px", left: "50%", transform: "translateX(-50%)",
                  background: "linear-gradient(135deg, #C9A84C, #e8c96a)", borderRadius: "50%",
                  width: "32px", height: "32px", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "14px", boxShadow: "0 2px 8px rgba(201,168,76,0.5)", zIndex: 2 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >💌</motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Invitation subtitle — appears after envelope opens ─── */}
        <AnimatePresence>
          {isOpen && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              style={{
                marginTop: "24px",
                fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
                fontSize: "1.4rem",
                fontStyle: "italic",
                textAlign: "center",
                background: "linear-gradient(90deg, #ff6b9d, #c084fc, #60a5fa, #34d399, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                padding: "0 8px",
              }}
            >
              ✨ Te invito a celebrar conmigo mis 15 años ✨
            </motion.p>
          )}
        </AnimatePresence>

        {/* Parchment card */}
        <AnimatePresence>
          {isOpen && (
            <ParchmentCard
              initial={{ opacity: 0, y: -28, scaleY: 0.85 }}
              animate={{ opacity: 1, y: 16, scaleY: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div variants={cardContainer} initial="hidden" animate="visible">
                {/* Date */}
                <motion.div variants={cardItem}>
                  <DateText>🐚 Sábado 27 de Junio · 5:00 PM</DateText>
                </motion.div>

                {/* Location detail */}
                <motion.div variants={cardItem}>
                  <p style={{
                    fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                    fontSize: "0.95rem",
                    color: "#5a3e1b",
                    textAlign: "center",
                    lineHeight: 1.5,
                    marginTop: "8px",
                    marginBottom: "4px",
                  }}>
                    📍 Lugar: <strong>Restaurante La Gallera</strong>,<br />
                    en La Uruca, frente al Holiday Inn
                  </p>
                </motion.div>

                {/* Shimmer divider */}
                <motion.div variants={cardItem}>
                  <ShimmerDivider />
                </motion.div>

                {/* Map */}
                <motion.div variants={cardItem} style={{ position: "relative" }}>
                  {!mapLoaded && <MapSkeleton />}

                  <iframe
                    title="Restaurante La Gallera"
                    src="https://maps.google.com/maps?q=Restaurante+La+Gallera+La+Uruca+San+Jose+Costa+Rica&output=embed"
                    width="100%"
                    height="220"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setMapLoaded(true)}
                    style={{
                      border: 0,
                      borderRadius: "12px",
                      display: mapLoaded ? "block" : "none",
                      outline: "2px solid #C9A84C",
                    }}
                  />

                  {/* Fallback link */}
                  <a
                    href="https://maps.app.goo.gl/kgzzM7p2orUe9LJM9"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      textAlign: "center",
                      marginTop: "10px",
                      fontFamily: "var(--font-poppins), sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "#C9A84C",
                      textDecoration: "none",
                      letterSpacing: "0.04em",
                    }}
                  >
                    📍 Ver en Google Maps
                  </a>
                </motion.div>
              </motion.div>
            </ParchmentCard>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
