import { PrismaClient } from "@prisma/client"

import { config } from "@/lib/envConfig"

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (config.nodeEnv !== "production") globalThis.prismaGlobal = prisma
