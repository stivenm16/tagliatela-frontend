import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ['picsum.photos', 'images.pexels.com'],
  },
  webpack(config) {
    // Find and exclude existing SVG handling
    const fileLoaderRule = config.module.rules.find(
      (rule: any) => rule.test && rule.test.test?.(".svg")
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }

    // Add SVGR loader
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
