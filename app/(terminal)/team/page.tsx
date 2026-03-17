import { RoleGate } from '@/components/shell/RoleGate';
import { TEAM_MEMBERS } from '@/lib/mock-data';

export default function TeamPage() {
  return (
    <RoleGate path="/team">
      <div>
        <div className="mb-6">
          <h1 className="font-display text-[26px]" style={{ color: 'var(--color-text-1)' }}>Team Admin</h1>
          <p className="font-mono text-xs mt-1" style={{ color: 'var(--color-text-3)' }}>Platform users and access control</p>
        </div>

        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-2)' }}>
                {['Name', 'Title', 'Email', 'Access Level', 'Status'].map(col => (
                  <th key={col} className="px-4 py-3 text-left font-mono text-[10px] tracking-[0.1em]"
                    style={{ color: 'var(--color-text-3)' }}>{col.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TEAM_MEMBERS.map(member => (
                <tr key={member.id} style={{ borderBottom: '1px solid var(--color-border)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td className="px-4 py-3 font-mono text-sm" style={{ color: 'var(--color-text-1)' }}>{member.name}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--color-text-2)' }}>{member.title}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--color-text-3)' }}>{member.email}</td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                      style={{ color: 'var(--color-gold)', border: '1px solid var(--color-gold-muted)', background: 'var(--color-gold-dim)' }}>
                      [ {member.accessLevel.toUpperCase()} ]
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded"
                      style={{
                        color: member.status === 'Active' ? 'var(--color-success)' : 'var(--color-text-3)',
                        background: member.status === 'Active' ? 'rgba(74,222,128,0.1)' : 'var(--color-surface-2)',
                        border: `1px solid ${member.status === 'Active' ? 'rgba(74,222,128,0.2)' : 'var(--color-border)'}`,
                      }}>
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </RoleGate>
  );
}
