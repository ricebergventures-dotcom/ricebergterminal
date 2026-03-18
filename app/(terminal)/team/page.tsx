import { RoleGate } from '@/components/shell/RoleGate';
import { createClient as createAdminClient } from '@supabase/supabase-js';

const ROLE_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  admin: { color: 'var(--color-cyan)', bg: 'rgba(97,209,220,0.1)', border: 'rgba(97,209,220,0.3)' },
  owner: { color: '#A78BFA', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.3)' },
  lp:    { color: 'var(--color-text-3)', bg: 'var(--color-surface-2)', border: 'var(--color-border)' },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default async function TeamPage() {
  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
  );

  const { data } = await admin.auth.admin.listUsers({ perPage: 100 });
  const users = (data?.users ?? []).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <RoleGate path="/team">
      <div>
        <div className="mb-6">
          <h1 className="font-display text-[26px]" style={{ color: 'var(--color-text-1)' }}>Team & Users</h1>
          <p className="font-mono text-xs mt-1" style={{ color: 'var(--color-text-3)' }}>
            {users.length} users · Platform access control
          </p>
        </div>

        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-2)' }}>
                {['Name', 'Email', 'Role', 'Status', 'Joined'].map(col => (
                  <th key={col} className="px-4 py-3 text-left font-mono text-[10px] tracking-[0.1em]"
                    style={{ color: 'var(--color-text-3)' }}>{col.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(user => {
                const role = (user.user_metadata?.role as string) || 'lp';
                const roleStyle = ROLE_COLORS[role] ?? ROLE_COLORS.lp;
                const name = (user.user_metadata?.name as string) || user.email?.split('@')[0] || '—';
                const isConfirmed = !!user.email_confirmed_at;

                return (
                  <tr key={user.id} className="hover-row" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="px-4 py-3 font-mono text-sm" style={{ color: 'var(--color-text-1)' }}>{name}</td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--color-text-3)' }}>{user.email}</td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                        style={{ color: roleStyle.color, background: roleStyle.bg, border: `1px solid ${roleStyle.border}` }}>
                        {role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded"
                        style={{
                          color: isConfirmed ? 'var(--color-success)' : '#FB923C',
                          background: isConfirmed ? 'rgba(74,222,128,0.1)' : 'rgba(251,146,60,0.1)',
                          border: `1px solid ${isConfirmed ? 'rgba(74,222,128,0.2)' : 'rgba(251,146,60,0.2)'}`,
                        }}>
                        {isConfirmed ? 'Active' : 'Pending'}
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
