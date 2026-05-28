"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type MotionStyle } from "framer-motion";

/* ─── Base button (shadcn-style) ────────────────────────────────── */
export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

/* ─── Liquid button variants ────────────────────────────────────── */
export const liquidbuttonVariants = cva(
  "relative overflow-hidden inline-flex items-center justify-center font-semibold transition-all duration-300 cursor-pointer border-none",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
        whatsapp: "bg-gradient-to-r from-green-500 to-teal-500 text-white",
        gold: "bg-gradient-to-r from-yellow-400 to-amber-500 text-white",
      },
      size: {
        default: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        sm: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

/* ─── LiquidButton ──────────────────────────────────────────────── */
export interface LiquidButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  variant?: VariantProps<typeof liquidbuttonVariants>["variant"];
  size?: VariantProps<typeof liquidbuttonVariants>["size"];
  style?: MotionStyle;
}

export function LiquidButton({
  className,
  variant,
  size,
  children,
  style,
  onClick,
  disabled,
  type,
}: LiquidButtonProps) {
  return (
    <motion.button
      className={liquidbuttonVariants({ variant, size, className })}
      style={{
        boxShadow: "0 8px 25px rgba(37,211,102,0.38)",
        ...style,
      }}
      whileHover={{ scale: 1.05, boxShadow: "0 12px 35px rgba(37,211,102,0.55)" }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      type={type ?? "button"}
    >
      {/* Moving shimmer strip */}
      <motion.span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
        animate={{ x: ["-110%", "210%"] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 1.2,
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </motion.button>
  );
}

/* ─── MetalButton ───────────────────────────────────────────────── */
export interface MetalButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  style?: MotionStyle;
}

export function MetalButton({
  className = "",
  children,
  style,
  onClick,
}: MetalButtonProps) {
  return (
    <motion.button
      className={`relative overflow-hidden inline-flex items-center justify-center px-6 py-3 font-semibold text-white border-none cursor-pointer ${className}`}
      style={{
        background: "linear-gradient(135deg, #8B7355, #C9A84C, #8B7355)",
        boxShadow: "0 4px 15px rgba(201,168,76,0.4)",
        borderRadius: "8px",
        ...style,
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 6px 20px rgba(201,168,76,0.6)",
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      type="button"
    >
      {children}
    </motion.button>
  );
}
