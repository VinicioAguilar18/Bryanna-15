"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { imgPath } from "@/lib/utils";
import { AnimatedLetterText } from "@/components/ui/portfolio-text";

/* ─── Precomputed bubble data (avoids Math.random hydration mismatch) ── */
const BUBBLES = [
  { id: 0,  left: "5%",  size: 6,  duration: 5.2, delay: 0.0 },
  { id: 1,  left: "12%", size: 10, duration: 6.8, delay: 0.8 },
  { id: 2,  left: "22%", size: 4,  duration: 4.5, delay: 1.5 },
  { id: 3,  left: "35%", size: 8,  duration: 7.1, delay: 0.3 },
  { id: 4,  left: "48%", size: 12, duration: 5.8, delay: 2.1 },
  { id: 5,  left: "58%", size: 6,  duration: 6.2, delay: 0.9 },
  { id: 6,  left: "67%", size: 9,  duration: 4.8, delay: 1.7 },
  { id: 7,  left: "75%", size: 5,  duration: 7.4, delay: 0.5 },
  { id: 8,  left: "83%", size: 11, duration: 5.5, delay: 2.4 },
  { id: 9,  left: "91%", size: 7,  duration: 6.5, delay: 1.1 },
  { id: 10, left: "28%", size: 4,  duration: 4.2, delay: 3.0 },
  { id: 11, left: "42%", size: 9,  duration: 7.8, delay: 2.7 },
  { id: 12, left: "62%", size: 6,  duration: 5.0, delay: 1.9 },
  { id: 13, left: "78%", size: 13, duration: 6.8, delay: 0.7 },
  { id: 14, left: "18%", size: 8,  duration: 4.9, delay: 3.5 },
] as const;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Raw window scroll → video parallax (moves slower = depth) ── */
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 500], [0, 150]);

  /* ── Section-based scroll → static image parallax ────────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        minHeight: "100dvh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ── Video background — slowest layer (depth effect) ─────── */}
      <motion.video
        style={{ y: videoY }}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={imgPath("/images/Sobre.mp4")}
        aria-hidden
      />

      {/* ── Static image — in front of video ────────────────────── */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-10% 0",
          zIndex: 1,
          y: bgY,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgPath("/images/Sirenita%20Fondo.png")}
          alt="Fondo acuático bajo el mar"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </motion.div>

      {/* ── Dark gradient overlay ────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(11,61,78,0.65) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Floating bubbles ─────────────────────────────────────── */}
      {BUBBLES.map((b) => (
        <motion.div
          key={b.id}
          style={{
            position: "absolute",
            bottom: "-24px",
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.22)",
            border: "1px solid rgba(255,255,255,0.55)",
            zIndex: 3,
            backdropFilter: "blur(1px)",
          }}
          animate={{ y: ["0px", "-105vh"], opacity: [0.7, 0] }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* ── Title ────────────────────────────────────────────────── */}
      <motion.div
        style={{
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
          position: "relative",
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1
          style={{
            fontFamily: "var(--font-dancing), 'Dancing Script', cursive",
            fontSize: "clamp(3.5rem, 11vw, 5rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            filter:
              "drop-shadow(3px 3px 0px #c94b7b) drop-shadow(6px 6px 0px rgba(201,75,123,0.28))",
          }}
        >
          <AnimatedLetterText letterToReplace="a">
            15 años
          </AnimatedLetterText>
          <br />
          <AnimatedLetterText letterToReplace="a">
            Bryanna Aguilar
          </AnimatedLetterText>
        </h1>
      </motion.div>

      {/* ── Scroll indicator (two bouncing chevrons) ─────────────── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "28px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ChevronDown opacity={0.85} />
        <ChevronDown opacity={0.45} />
      </motion.div>
    </section>
  );
}

function ChevronDown({ opacity }: { opacity: number }) {
  return (
    <svg width="28" height="18" viewBox="0 0 28 18" fill="none" style={{ display: "block" }}>
      <path
        d="M4 4l10 10 10-10"
        stroke={`rgba(255,255,255,${opacity})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
