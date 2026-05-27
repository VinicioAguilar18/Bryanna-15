import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Bryanna-15",
  assetPrefix: "/Bryanna-15/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
