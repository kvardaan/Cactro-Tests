import { config as conf } from "dotenv"

conf()

const _config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  githubApiUrl: process.env.GITHUB_API_URL || "https://api.github.com",
  githubUsername: process.env.GITHUB_USERNAME,
  githubAccessToken: process.env.GITHUB_ACCESS_TOKEN,
  portfolioUrl: process.env.PORTFOLIO_URL,
}

export const config = Object.freeze(_config)
