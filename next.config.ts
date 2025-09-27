import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [
      new URL('https://static.wikia.nocookie.net/gensin-impact/images/**'),
      new URL('https://enka.network/ui/**'),
      new URL('https://upload-os-bbs.mihoyo.com/**')
    ],
  },
}

export default nextConfig;
