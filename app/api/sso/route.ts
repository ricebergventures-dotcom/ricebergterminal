import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';

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

  const admin = createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
  );

  // Generate a magic link for the user — they get silently signed into
  // the target app using their Supabase account (same email).
  const { data, error } = await admin.auth.admin.generateLink({
    type: 'magiclink',
    email: user.email,
    options: {
      redirectTo: target,
    },
  });

  if (error || !data?.properties?.action_link) {
    // If no Supabase account exists for this user, fall back to direct redirect
    console.error('SSO magic link error:', error?.message);
    return NextResponse.redirect(target);
  }

  return NextResponse.redirect(data.properties.action_link);
}
