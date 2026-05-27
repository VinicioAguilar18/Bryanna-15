import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/bryanna-15",
  images: {
    unoptimized: true,
  },
  // Silence the "multiple lockfiles" workspace-root warning
  outputFileTracingRoot: require("path").join(__dirname, "../../"),
};

export default nextConfig;
