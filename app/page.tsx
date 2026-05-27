import HeroSection from "@/components/HeroSection";
import EnvelopeSection from "@/components/EnvelopeSection";
import GiftSection from "@/components/GiftSection";
import RSVPSection from "@/components/RSVPSection";

export default function Home() {
  return (
    /**
     * Mobile-first wrapper: max 430 px, centered, dark teal background.
     * All sections stack vertically inside this container.
     */
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        backgroundColor: "#0B3D4E",
        minHeight: "100dvh",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <HeroSection />
      <EnvelopeSection />
      <GiftSection />
      <RSVPSection />

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer
        style={{
          textAlign: "center",
          padding: "24px 16px",
          fontFamily: "var(--font-poppins), sans-serif",
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "0.05em",
        }}
      >
        💙 Bryanna Aguilar · 2025 💙
      </footer>
    </div>
  );
}
