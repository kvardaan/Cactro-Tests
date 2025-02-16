import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prismaClient"

export async function POST(request: NextRequest) {
  const { optionId } = await request.json()

  const updateOption = await prisma.option.update({
    where: { id: optionId },
    data: {
      votes: {
        increment: 1,
      },
    },
  })

  return NextResponse.json(updateOption)
}
