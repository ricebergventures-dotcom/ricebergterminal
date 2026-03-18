import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const ALLOWED_TARGETS = [
  'https://riceberg-intelligence.vercel.app',
  'https://deeptech-radar.vercel.app',
  'https://pitchperfect-eta.vercel.app',
  'https://lp-dashboard-r21f.vercel.app',
];

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const target = req.nextUrl.searchParams.get('target');
  if (!target || !ALLOWED_TARGETS.some(a => target.startsWith(a))) {
    return NextResponse.json({ error: 'Invalid target' }, { status: 400 });
  }

  // Direct redirect — SSO magic link requires Supabase Redirect URL allowlist
  // configuration per target app. Until configured, send user directly.
  return NextResponse.redirect(target);
}
