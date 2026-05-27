import type { NextConfig } from "next";
import path from "path";

/**
 * basePath is only applied during production builds (npm run build).
 * In development (npm run dev) basePath is "" so the app is reachable
 * at http://localhost:3000 without any sub-path prefix.
 *
 * Turbopack is disabled via the `--webpack` flag in the dev/build scripts.
 */
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // ── Static export for GitHub Pages ──────────────────────────────
  output: "export",
  basePath: isProd ? "/bryanna-15" : "",

  // ── Images ──────────────────────────────────────────────────────
  images: {
    unoptimized: true,
  },

  // ── Silences the "multiple lockfiles / workspace root" warning ──
  outputFileTracingRoot: path.join(process.cwd(), "../../"),
};

export default nextConfig;
