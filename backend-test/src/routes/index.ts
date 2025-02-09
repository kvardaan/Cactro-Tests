import { Router } from "express"

import { cacheRoutes } from "./cache.route"

const router = Router()

router.use("/cache", cacheRoutes)

export { router as rootRouter }
