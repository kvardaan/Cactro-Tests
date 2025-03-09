import express from "express"
import cors from "cors"

import { rootRouter } from "./routes"
import { loggingMiddleware } from "./middlewares"
import { config } from "./utils/envConfig"

const app = express()

app.use(express.json({ limit: "10mb" }))
app.use(loggingMiddleware)
app.use(
  cors({
    origin: config.portfolioUrl || "http://localhost:3000",
    methods: ["GET", "POST"],
  })
)

app.use(rootRouter)

export default app
