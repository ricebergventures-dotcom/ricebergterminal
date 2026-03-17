import { RoleGate } from '@/components/shell/RoleGate';
import { SectionLabel } from '@/components/ui/SectionLabel';

const ACCESS_LOG = [
  { ts: '2025-03-17 09:42:11', email: 'admin@riceberg.vc', event: 'Login successful' },
  { ts: '2025-03-17 08:15:03', email: 'founder@riceberg.vc', event: 'Login successful' },
  { ts: '2025-03-16 17:31:44', email: 'lp1@example.com', event: 'Login successful' },
  { ts: '2025-03-16 11:09:22', email: 'lp2@example.com', event: 'Login successful' },
  { ts: '2025-03-15 14:53:10', email: 'admin@riceberg.vc', event: 'Login successful' },
];

export default function SettingsPage() {
  return (
    <RoleGate path="/settings">
      <div>
        <div className="mb-6">
          <h1 className="font-display text-[26px]" style={{ color: 'var(--color-text-1)' }}>Settings</h1>
          <p className="font-mono text-xs mt-1" style={{ color: 'var(--color-text-3)' }}>Platform configuration</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Platform info */}
          <div className="p-5 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <SectionLabel>Platform Info</SectionLabel>
            <div className="space-y-4">
              {[
                { label: 'Version', value: 'v1.0.0' },
                { label: 'Framework', value: 'Next.js 14 (App Router)' },
                { label: 'Auth Provider', value: 'NextAuth.js v5' },
                { label: 'Deployment', value: 'Vercel' },
                { label: 'Last Deploy', value: 'Mar 17, 2025' },
                { label: 'Environment', value: 'Production' },
              ].map(row => (
                <div key={row.label} className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <span className="font-mono text-xs" style={{ color: 'var(--color-text-3)' }}>{row.label}</span>
                  <span className="font-mono text-xs" style={{ color: 'var(--color-text-1)' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Access log */}
          <div className="p-5 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <SectionLabel>Access Log</SectionLabel>
            <div className="space-y-1">
              {ACCESS_LOG.map((entry, i) => (
                <div key={i} className="py-2.5" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <div className="flex justify-between">
                    <span className="font-mono text-xs" style={{ color: 'var(--color-gold)' }}>{entry.email}</span>
                    <span className="font-mono text-[10px]" style={{ color: 'var(--color-success)' }}>{entry.event}</span>
                  </div>
                  <p className="font-mono text-[10px] mt-0.5" style={{ color: 'var(--color-text-3)' }}>{entry.ts}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RoleGate>
  );
}
