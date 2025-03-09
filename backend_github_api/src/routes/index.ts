import { Router } from "express"

import { githubRoutes } from "./github.route"

const router = Router()

router.use("/github", githubRoutes)

export { router as rootRouter }
