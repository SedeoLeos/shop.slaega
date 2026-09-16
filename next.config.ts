import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    /* Static export ships plain <img> with srcset; the pattern is
       declared so switching off `output: export` keeps working. */
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  trailingSlash: true,
};

export default nextConfig;
