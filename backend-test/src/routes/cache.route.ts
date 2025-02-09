import { Router } from "express"

import { addPair, getPair, deletePair } from "../controllers/cache.controller"
import {
  validatePair,
  doesPairExistWithKey,
  checkCacheLimit,
  ifPairExistWithKey,
} from "../middlewares"

const router = Router()

router.post("/", checkCacheLimit, doesPairExistWithKey, validatePair, addPair)
router.get("/:key", ifPairExistWithKey, getPair)
router.delete("/:key", ifPairExistWithKey, deletePair)

export { router as cacheRoutes }
