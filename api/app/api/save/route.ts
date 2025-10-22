import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { stage, codeInput, message } = body;

    if (!stage || !codeInput) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const saved = await prisma.progress.create({
      data: { stage, codeInput, message },
    });

    return NextResponse.json({ success: true, saved });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const all = await prisma.progress.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(all);
}
