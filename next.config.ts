import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: { root: process.cwd() },
  experimental: { workerThreads: true, useTypeScriptCli: false, cpus: 2 }
};

export default nextConfig;
