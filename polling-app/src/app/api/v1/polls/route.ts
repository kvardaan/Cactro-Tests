import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prismaClient"

export async function POST(request: NextRequest) {
  try {
    const { question, options } = await request.json()

    const newPoll = await prisma.poll.create({
      data: {
        question,
        options: {
          create: options.map((text: string) => ({ text })),
        },
      },
      include: {
        options: true,
      },
    })

    return NextResponse.json(newPoll)
  } catch (error) {
    return NextResponse.json({
      error: error || "Internal Server Error",
      status: 500,
    })
  }
}

export async function GET() {
  const polls = await prisma.poll.findMany({
    include: {
      options: true,
    },
  })

  return NextResponse.json(polls)
}
