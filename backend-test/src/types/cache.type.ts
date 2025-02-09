import { z } from "zod"

export const cacheSchema = z.object({
  key: z.string(),
  value: z.string(),
})
