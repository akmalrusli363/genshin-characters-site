import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [new URL('https://static.wikia.nocookie.net/gensin-impact/images/**')],
    domains: ['enka.network', 'upload-os-bbs.mihoyo.com'],
  },
}

export default nextConfig;
