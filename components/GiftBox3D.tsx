"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Sparkle particle data (precomputed, no Math.random) ──────── */
const SPARKLES = [
  { id: 0, tx: -42, ty: -50, delay: 0.0,  emoji: "⭐" },
  { id: 1, tx:  38, ty: -58, delay: 0.25, emoji: "✨" },
  { id: 2, tx:  52, ty: -20, delay: 0.5,  emoji: "⭐" },
  { id: 3, tx: -50, ty:  -8, delay: 0.75, emoji: "✨" },
  { id: 4, tx:  16, ty: -66, delay: 1.0,  emoji: "⭐" },
  { id: 5, tx: -20, ty: -64, delay: 1.25, emoji: "✨" },
] as const;

/* ─── Heart burst data ─────────────────────────────────────────── */
const HEARTS = [
  { id: 0, tx: -50, ty: -70, emoji: "💕" },
  { id: 1, tx: -20, ty: -85, emoji: "💖" },
  { id: 2, tx:  10, ty: -90, emoji: "💝" },
  { id: 3, tx:  40, ty: -75, emoji: "💗" },
  { id: 4, tx:  55, ty: -55, emoji: "💓" },
] as const;

/* ─── Box dimensions ───────────────────────────────────────────── */
const BOX_W   = 110; // px — body width
const BOX_H   = 88;  // px — body height
const LID_H   = 30;  // px — lid height
const RIB_W   = 14;  // px — ribbon width

/* ─── Colors ───────────────────────────────────────────────────── */
const ROSE    = "#FF6B9D";
const ROSE_D  = "#d94f80";   // darker side-face shade
const GOLD    = "#C9A84C";
const GOLD_D  = "#a07830";   // darker ribbon shade

export default function GiftBox3D() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        padding: "40px 0 20px",
        position: "relative",
      }}
    >
      {/* ── Outer perspective wrapper ────────────────────────── */}
      <div style={{ perspective: "500px", position: "relative" }}>
        {/* ── Inner tilt (gives 3-D illusion) ──────────────── */}
        <motion.div
          style={{
            transform: "rotateX(10deg) rotateY(-15deg)",
            cursor: "pointer",
            position: "relative",
          }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* ══ LID ════════════════════════════════════════════ */}
          <motion.div
            style={{
              position: "relative",
              width: BOX_W + 8,   /* lid slightly wider than body */
              marginLeft: -4,
              height: LID_H,
              borderRadius: "6px 6px 2px 2px",
              background: `linear-gradient(160deg, ${ROSE} 60%, ${ROSE_D} 100%)`,
              boxShadow:
                "0 -2px 6px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.25)",
              zIndex: 10,
              overflow: "hidden",
              transformOrigin: "bottom center",
            }}
            /* Idle bounce: lid bobs up/down */
            animate={
              hovered
                ? { y: -(LID_H + 12), rotateX: -25 }
                : { y: [0, -14, 0] }
            }
            transition={
              hovered
                ? { type: "spring", stiffness: 200, damping: 16 }
                : {
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }
            }
          >
            {/* Ribbon on lid — horizontal strip */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: RIB_W,
                marginTop: -(RIB_W / 2),
                background: `linear-gradient(180deg, ${GOLD} 0%, ${GOLD_D} 100%)`,
                opacity: 0.95,
              }}
            />

            {/* Bow knot on lid */}
            <BowKnot />
          </motion.div>

          {/* ══ BOX BODY ════════════════════════════════════════ */}
          <div
            style={{
              position: "relative",
              width: BOX_W,
              height: BOX_H,
              borderRadius: "0 0 8px 8px",
              background: `linear-gradient(160deg, ${ROSE} 55%, ${ROSE_D} 100%)`,
              boxShadow:
                "4px 8px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
              overflow: "hidden",
            }}
          >
            {/* Vertical ribbon */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "50%",
                width: RIB_W,
                marginLeft: -(RIB_W / 2),
                background: `linear-gradient(180deg, ${GOLD} 0%, ${GOLD_D} 100%)`,
              }}
            />
            {/* Horizontal ribbon */}
            <div
              style={{
                position: "absolute",
                top: "38%",
                left: 0,
                right: 0,
                height: RIB_W,
                background: `linear-gradient(180deg, ${GOLD} 0%, ${GOLD_D} 100%)`,
              }}
            />
            {/* Subtle shine */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: "65%",
                bottom: 0,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.12) 0%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* ══ SPARKLE PARTICLES ══════════════════════════════ */}
          {SPARKLES.map((s) => (
            <motion.span
              key={s.id}
              style={{
                position: "absolute",
                top: "0%",
                left: "50%",
                fontSize: "13px",
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
              }}
              animate={{
                x: [0, s.tx * 0.4, s.tx, s.tx * 0.4, 0],
                y: [0, s.ty * 0.6, s.ty, s.ty * 0.6, 0],
                opacity: [0, 1, 0.8, 0.4, 0],
                scale: [0, 1.1, 1, 0.6, 0],
              }}
              transition={{
                duration: 2.4,
                delay: s.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            >
              {s.emoji}
            </motion.span>
          ))}

          {/* ══ HEART BURST (hover only) ═══════════════════════ */}
          <AnimatePresence>
            {hovered &&
              HEARTS.map((h) => (
                <motion.span
                  key={h.id}
                  style={{
                    position: "absolute",
                    top: "10%",
                    left: "45%",
                    fontSize: "16px",
                    lineHeight: 1,
                    userSelect: "none",
                    pointerEvents: "none",
                    zIndex: 20,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                  animate={{ x: h.tx, y: h.ty, opacity: 0, scale: 1.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.85, ease: "easeOut" }}
                >
                  {h.emoji}
                </motion.span>
              ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Shadow beneath the box ───────────────────────────── */}
        <div
          style={{
            position: "absolute",
            bottom: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: BOX_W * 0.85,
            height: "12px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.25)",
            filter: "blur(6px)",
          }}
        />
      </div>
    </div>
  );
}

/* ─── Bow knot (SVG ribbon bow on lid) ───────────────────────── */
function BowKnot() {
  return (
    <svg
      viewBox="0 0 60 30"
      width="44"
      height="22"
      style={{
        position: "absolute",
        top: "-11px",
        left: "50%",
        transform: "translateX(-50%)",
        filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.25))",
        overflow: "visible",
      }}
    >
      {/* Left loop */}
      <ellipse
        cx="18"
        cy="15"
        rx="16"
        ry="9"
        fill="#C9A84C"
        transform="rotate(-20 18 15)"
        opacity="0.95"
      />
      {/* Right loop */}
      <ellipse
        cx="42"
        cy="15"
        rx="16"
        ry="9"
        fill="#C9A84C"
        transform="rotate(20 42 15)"
        opacity="0.95"
      />
      {/* Centre knot */}
      <ellipse cx="30" cy="15" rx="6" ry="5" fill="#e8c96a" />
    </svg>
  );
}
