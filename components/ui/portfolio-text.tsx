"use client";

import { motion } from "framer-motion";

/* ─── Types ──────────────────────────────────────────────────────── */
interface AnimatedLetterTextProps {
  children: string;
  /** The letter (case-insensitive) that gets the float animation */
  letterToReplace: string;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── Gradient shared across all characters ─────────────────────── */
const GRADIENT_STYLE: React.CSSProperties = {
  background:
    "linear-gradient(90deg, #ff6b9d, #ff9ff3, #ffd6e0, #ffb3c6, #ff6b9d)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/**
 * Renders text character-by-character.
 * Every instance of `letterToReplace` (case-insensitive) gently floats
 * upward with a staggered delay, creating a wave effect through the title.
 *
 * Each character gets its own gradient span so the parent container can
 * use any layout (flex, block, etc.) without breaking the colour fill.
 */
export function AnimatedLetterText({
  children,
  letterToReplace,
  className,
  style,
}: AnimatedLetterTextProps) {
  let letterIdx = 0;

  return (
    <span className={className} style={{ display: "contents", ...style }}>
      {children.split("").map((char, i) => {
        if (char.toLowerCase() === letterToReplace.toLowerCase()) {
          const delay = letterIdx++ * 0.45;
          return (
            <motion.span
              key={i}
              style={{
                display: "inline-block",
                ...GRADIENT_STYLE,
                /* retain drop-shadow from parent h1 via filter */
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 2.6,
                delay,
                repeat: Infinity,
                ease: [0.45, 0, 0.55, 1] as const,
              }}
            >
              {char}
            </motion.span>
          );
        }

        /* Space — render as plain text node to preserve word spacing */
        if (char === " ") {
          return <span key={i} style={{ display: "inline" }}>{" "}</span>;
        }

        /* Regular character — apply gradient so colours match the animated ones */
        return (
          <span key={i} style={{ display: "inline", ...GRADIENT_STYLE }}>
            {char}
          </span>
        );
      })}
    </span>
  );
}
