import { config as conf } from "dotenv"

conf()

const _config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  maxCacheSize: 10,
}

export const config = Object.freeze(_config)
