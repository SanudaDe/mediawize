// app/api/admin/settings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('booking_settings').select('*').order('key');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ settings: data });
}

export async function PATCH(req: NextRequest) {
  const { settings } = await req.json();
  const supabase = createServerClient();
  for (const s of settings) {
    await supabase.from('booking_settings').update({ value: s.value }).eq('key', s.key);
  }
  return NextResponse.json({ success: true });
}
