import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
