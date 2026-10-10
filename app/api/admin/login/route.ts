// app/api/admin/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { validateAdminPassword, getExpectedAdminToken, ADMIN_COOKIE_NAME } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || !validateAdminPassword(password)) {
      return NextResponse.json(
        { success: false, error: 'Incorrect admin password' },
        { status: 401 }
      );
    }

    const token = await getExpectedAdminToken();

    const response = NextResponse.json({
      success: true,
      message: 'Admin authenticated successfully',
    });

    // Set HTTP-only secure session cookie (valid for 7 days)
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Login failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
