import { Router } from "express"

import { fetchRepoDetails, fetchUserData, createIssue } from "../controllers"

const router = Router()

router.get("/", fetchUserData)
router.get("/:repo", fetchRepoDetails)
router.post("/:repo/issues", createIssue)

export { router as githubRoutes }
