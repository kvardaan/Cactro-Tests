import { StatusCodes } from "http-status-codes"
import { Request, Response, NextFunction } from "express"

import { config } from "../utils/env"
import prisma from "../utils/prismaClient"
import { cacheSchema } from "../types/cache.type"

export const validatePair = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const cachePairData = request.body

    const validatedCachePairData = cacheSchema.safeParse(cachePairData)

    if (!validatedCachePairData.success) {
      response.status(StatusCodes.BAD_REQUEST).json({
        error: validatedCachePairData.error.issues[0].message,
      })
      return
    }

    next()
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Something went wrong, try after some time!",
    })
    return
  }
}

export const doesPairExistWithKey = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { key } = request.body

    const existingPair = await prisma.cache.findUnique({
      where: {
        key: key,
      },
    })

    if (existingPair) {
      response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "A cache entry with this key, exists already!" })
      return
    }

    next()
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong, try after some time!" })
    return
  }
}

export const ifPairExistWithKey = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { key } = request.params

    const existingPair = await prisma.cache.findUnique({
      where: {
        key: key,
      },
    })

    if (!existingPair) {
      response
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "A cache entry with this key, does not exist!" })
      return
    }

    next()
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong, try after some time!" })
    return
  }
}

export const checkCacheLimit = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const count = await prisma.cache.count()

    if (count >= config.maxCacheSize) {
      response.status(StatusCodes.BAD_REQUEST).json({ error: "Cache is full!" })
      return
    }

    next()
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong, try after some time!" })
    return
  }
}
