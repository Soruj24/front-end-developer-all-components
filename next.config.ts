import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  serverExternalPackages: [
    "@langchain/core",
    "@langchain/langgraph",
    "@langchain/langgraph-checkpoint",
    "@langchain/langgraph-sdk",
    "@langchain/openai",
    "@langchain/groq",
    "deepagents",
    "langchain",
    "openai",
    "@modelcontextprotocol/sdk",
    "nodemailer",
  ],
};

export default nextConfig;
