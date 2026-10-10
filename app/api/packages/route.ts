// app/api/packages/route.ts
// GET — public packages list from Supabase

import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('studio_packages')
      .select('*')
      .eq('is_active', true)
      .neq('slug', 'custom-premium-experience')
      .order('display_order', { ascending: true });

    if (error) throw error;

    // Parse JSONB features
    const packages = (data || []).map((pkg: Record<string, unknown>) => ({
      ...pkg,
      features: Array.isArray(pkg.features) ? pkg.features : [],
    }));

    return NextResponse.json({ packages });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ packages: [], error: message }, { status: 500 });
  }
}
