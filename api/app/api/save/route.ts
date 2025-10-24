import { NextRequest, NextResponse } from 'next/server';
import { Submission, ensureDatabase } from '@/lib/sequelize';

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

await ensureDatabase();

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const { username, stage, code } = await request.json();

    if (typeof username !== 'string' || username.trim().length === 0) {
      return new NextResponse('Missing or invalid username', { status: 400, headers: corsHeaders });
    }

    if (typeof stage !== 'number' || !Number.isInteger(stage) || stage < 1) {
      return new NextResponse('Missing or invalid stage', { status: 400, headers: corsHeaders });
    }

    if (typeof code !== 'string' || code.trim().length === 0) {
      return new NextResponse('Missing or invalid code', { status: 400, headers: corsHeaders });
    }

    const submission = await Submission.create({
      username: username.trim(),
      stage,
      code,
    });

    return NextResponse.json(submission, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error('[save.POST]', error);
    return new NextResponse('Invalid request body', { status: 400, headers: corsHeaders });
  }
}

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams.get('username') ?? undefined;
    const stage = request.nextUrl.searchParams.get('stage');

    const where: Record<string, unknown> = {};
    if (username) {
      where.username = username;
    }
    if (stage) {
      const stageNumber = Number(stage);
      if (!Number.isInteger(stageNumber)) {
        return new NextResponse('Invalid stage filter', { status: 400, headers: corsHeaders });
      }
      where.stage = stageNumber;
    }

    const submissions = await Submission.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    return NextResponse.json(submissions, { headers: corsHeaders });
  } catch (error) {
    console.error('[save.GET]', error);
    return new NextResponse('Server error', { status: 500, headers: corsHeaders });
  }
}
