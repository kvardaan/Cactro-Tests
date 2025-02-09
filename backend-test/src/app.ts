import express from "express"

import { rootRouter } from "./routes"
import { loggingMiddleware } from "./middlewares"

const app = express()

app.use(express.json())
app.use(loggingMiddleware)

app.use("/api/v1", rootRouter)

export default app
