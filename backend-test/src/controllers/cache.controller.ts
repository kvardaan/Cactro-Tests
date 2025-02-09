import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

import prisma from "../utils/prismaClient"

// POST /api/v1/cache - adds a key value pair
export const addPair = async (request: Request, response: Response) => {
  try {
    const { key, value } = request.body

    await prisma.cache.create({
      data: {
        key,
        value,
      },
    })

    response.status(StatusCodes.OK).json({ message: "Cached successfully!" })
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to store the cache entry!" })
  }
}

// GET /api/v1/cache/:key - fetches a key value pair given the key
export const getPair = async (request: Request, response: Response) => {
  try {
    const { key } = request.params

    const pair = await prisma.cache.findUnique({
      where: {
        key,
      },
    })

    response.status(StatusCodes.OK).json({ value: pair?.value })
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve the cache entry!" })
  }
}

// DELETE /api/v1/cache/:key - deletes a key value pair given the key
export const deletePair = async (request: Request, response: Response) => {
  try {
    const { key } = request.params

    await prisma.cache.delete({
      where: {
        key,
      },
    })

    response
      .status(StatusCodes.OK)
      .json({ message: "Cache entry deleted successfully!" })
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to delete the cache entry!" })
  }
}
