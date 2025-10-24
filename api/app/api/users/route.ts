import { NextRequest, NextResponse } from 'next/server';
import { ensureDatabase, User } from '@/lib/sequelize';

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

await ensureDatabase();

const isValidLineStatus = (value: unknown): value is 'online' | 'offline' =>
  value === 'online' || value === 'offline';

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');

    if (id) {
      const user = await User.findByPk(Number.parseInt(id, 10));
      if (!user) {
        return new NextResponse('User not found', { status: 404, headers: corsHeaders });
      }
      return NextResponse.json(user, { headers: corsHeaders });
    }

    const users = await User.findAll();
    return NextResponse.json(users, { headers: corsHeaders });
  } catch (error) {
    console.error('[users.GET]', error);
    return new NextResponse('Server error', { status: 500, headers: corsHeaders });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, lineStatus } = await request.json();

    if (typeof name !== 'string' || !isValidLineStatus(lineStatus)) {
      return new NextResponse('Missing or invalid name/lineStatus', {
        status: 400,
        headers: corsHeaders,
      });
    }

    const newUser = await User.create({ name, lineStatus });
    return NextResponse.json(newUser, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error('[users.POST]', error);
    return new NextResponse('Invalid request body', { status: 400, headers: corsHeaders });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return new NextResponse('Missing id', { status: 400, headers: corsHeaders });
    }

    const user = await User.findByPk(Number.parseInt(id, 10));
    if (!user) {
      return new NextResponse('User not found', { status: 404, headers: corsHeaders });
    }

    const { name, lineStatus } = await request.json();

    if (name !== undefined) {
      if (typeof name !== 'string') {
        return new NextResponse('Invalid name', { status: 400, headers: corsHeaders });
      }
      user.name = name;
    }

    if (lineStatus !== undefined) {
      if (!isValidLineStatus(lineStatus)) {
        return new NextResponse('Invalid lineStatus', { status: 400, headers: corsHeaders });
      }
      user.lineStatus = lineStatus;
    }

    await user.save();
    return NextResponse.json(user, { headers: corsHeaders });
  } catch (error) {
    console.error('[users.PATCH]', error);
    return new NextResponse('Invalid request', { status: 400, headers: corsHeaders });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return new NextResponse('Missing id', { status: 400, headers: corsHeaders });
    }

    const user = await User.findByPk(Number.parseInt(id, 10));
    if (!user) {
      return new NextResponse('User not found', { status: 404, headers: corsHeaders });
    }

    await user.destroy();
    return new NextResponse(null, { status: 204, headers: corsHeaders });
  } catch (error) {
    console.error('[users.DELETE]', error);
    return new NextResponse('Invalid request', { status: 400, headers: corsHeaders });
  }
}
