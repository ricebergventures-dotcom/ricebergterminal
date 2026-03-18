import { RoleGate } from '@/components/shell/RoleGate';
import { createClient as createSupabase } from '@supabase/supabase-js';

const ROLE_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  admin:  { color: 'var(--color-cyan)',  bg: 'rgba(97,209,220,0.1)',   border: 'rgba(97,209,220,0.3)' },
  owner:  { color: '#A78BFA',            bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.3)' },
  lp:     { color: 'var(--color-text-3)', bg: 'var(--color-surface-2)', border: 'var(--color-border)' },
  user:   { color: 'var(--color-text-3)', bg: 'var(--color-surface-2)', border: 'var(--color-border)' },
};

const APP_COLORS: Record<string, string> = {
  'Terminal':     'var(--color-cyan)',
  'Intelligence': '#A78BFA',
  'LP Dashboard': '#4ade80',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

interface UnifiedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  confirmed: boolean;
  created_at: string;
  app: string;
}

async function getAllUsers(): Promise<UnifiedUser[]> {
  const results: UnifiedUser[] = [];

  // ── Terminal + DeepTech Radar (Supabase auth) ────────────────────────────────
  try {
    const terminal = createSupabase(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!,
    );
    const { data } = await terminal.auth.admin.listUsers({ perPage: 200 });
    for (const u of data?.users ?? []) {
      results.push({
        id: `terminal-${u.id}`,
        name: (u.user_metadata?.name as string) || u.email?.split('@')[0] || '—',
        email: u.email ?? '—',
        role: (u.user_metadata?.role as string) || 'lp',
        confirmed: !!u.email_confirmed_at,
        created_at: u.created_at,
        app: 'Terminal',
      });
    }
  } catch { /* ignore */ }

  // ── Riceberg Intelligence (ri_users custom table) ────────────────────────────
  try {
    const intel = createSupabase(
      process.env.INTELLIGENCE_SUPABASE_URL!,
      process.env.INTELLIGENCE_SUPABASE_SERVICE_KEY!,
    );
    const { data } = await intel.from('ri_users').select('id, name, email, role, created_at');
    for (const u of data ?? []) {
      results.push({
        id: `intel-${u.id}`,
        name: u.name || u.email?.split('@')[0] || '—',
        email: u.email ?? '—',
        role: u.role || 'user',
        confirmed: true,
        created_at: u.created_at,
        app: 'Intelligence',
      });
    }
  } catch { /* ignore */ }

  // ── LP Dashboard (Supabase auth) ─────────────────────────────────────────────
  try {
    const lp = createSupabase(
      process.env.LP_SUPABASE_URL!,
      process.env.LP_SUPABASE_SERVICE_KEY!,
    );
    const { data } = await lp.auth.admin.listUsers({ perPage: 200 });
    for (const u of data?.users ?? []) {
      results.push({
        id: `lp-${u.id}`,
        name: (u.user_metadata?.name as string) || (u.user_metadata?.full_name as string) || u.email?.split('@')[0] || '—',
        email: u.email ?? '—',
        role: (u.user_metadata?.role as string) || 'lp',
        confirmed: !!u.email_confirmed_at,
        created_at: u.created_at,
        app: 'LP Dashboard',
      });
    }
  } catch { /* ignore */ }

  return results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export default async function TeamPage() {
  const users = await getAllUsers();
  const appCounts = users.reduce<Record<string, number>>((acc, u) => {
    acc[u.app] = (acc[u.app] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <RoleGate path="/team">
      <div>
        <div className="mb-6">
          <h1 className="font-display text-[26px]" style={{ color: 'var(--color-text-1)' }}>Team & Users</h1>
          <p className="font-mono text-xs mt-1" style={{ color: 'var(--color-text-3)' }}>
            {users.length} users across {Object.keys(appCounts).length} apps
          </p>
        </div>

        {/* App breakdown */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {Object.entries(appCounts).map(([app, count]) => (
            <div key={app} className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: APP_COLORS[app] ?? 'var(--color-text-3)' }} />
              <span className="font-mono text-xs" style={{ color: 'var(--color-text-2)' }}>{app}</span>
              <span className="font-mono text-xs" style={{ color: 'var(--color-text-3)' }}>{count}</span>
            </div>
          ))}
        </div>

        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-2)' }}>
                {['Name', 'Email', 'App', 'Role', 'Status', 'Joined'].map(col => (
                  <th key={col} className="px-4 py-3 text-left font-mono text-[10px] tracking-[0.1em]"
                    style={{ color: 'var(--color-text-3)' }}>{col.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(user => {
                const roleStyle = ROLE_COLORS[user.role] ?? ROLE_COLORS.user;
                const appColor = APP_COLORS[user.app] ?? 'var(--color-text-3)';
                return (
                  <tr key={user.id} className="hover-row" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="px-4 py-3 font-mono text-sm" style={{ color: 'var(--color-text-1)' }}>{user.name}</td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--color-text-3)' }}>{user.email}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: appColor }} />
                        <span className="font-mono text-xs" style={{ color: 'var(--color-text-2)' }}>{user.app}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                        style={{ color: roleStyle.color, background: roleStyle.bg, border: `1px solid ${roleStyle.border}` }}>
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded"
                        style={{
                          color: user.confirmed ? 'var(--color-success)' : '#FB923C',
                          background: user.confirmed ? 'rgba(74,222,128,0.1)' : 'rgba(251,146,60,0.1)',
                          border: `1px solid ${user.confirmed ? 'rgba(74,222,128,0.2)' : 'rgba(251,146,60,0.2)'}`,
                        }}>
                        {user.confirmed ? 'Active' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs tabular-nums" style={{ color: 'var(--color-text-3)' }}>
                      {formatDate(user.created_at)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </RoleGate>
  );
}
