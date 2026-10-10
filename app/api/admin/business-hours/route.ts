// app/api/admin/business-hours/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('business_hours').select('*').order('day_of_week');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ hours: data });
}

export async function PATCH(req: NextRequest) {
  const { hours } = await req.json();
  const supabase = createServerClient();
  for (const h of hours) {
    await supabase
      .from('business_hours')
      .update({ is_open: h.is_open, open_time: h.open_time, close_time: h.close_time })
      .eq('day_of_week', h.day_of_week);
  }
  return NextResponse.json({ success: true });
}
