import { auth } from '@/lib/auth';
import { RoleGate } from '@/components/shell/RoleGate';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatCard } from '@/components/ui/StatCard';
import { LP_ACCOUNTS, LP_DOCUMENTS, PORTFOLIO_COMPANIES } from '@/lib/mock-data';
import { FileText, Download } from 'lucide-react';

export default async function LPPortalPage() {
  const session = await auth();
  const role = (session?.user as { role: string })?.role;
  const isGP = role === 'admin' || role === 'owner';

  return (
    <RoleGate path="/lp-portal">
      <div>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="font-display text-[26px]" style={{ color: 'var(--color-text-1)' }}>LP Portal</h1>
            <p className="font-mono text-xs mt-1" style={{ color: 'var(--color-text-3)' }}>Capital account &amp; documents</p>
          </div>
          {isGP && (
            <select className="font-mono text-xs px-3 py-2 rounded outline-none"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-2)' }}>
              {LP_ACCOUNTS.map(lp => <option key={lp.id} value={lp.id}>{lp.name}</option>)}
            </select>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Commitment" value="$2M" numericValue={2} prefix="$" suffix="M" />
          <StatCard label="Called" value="$1.4M" numericValue={1.4} prefix="$" suffix="M" />
          <StatCard label="Remaining" value="$600K" numericValue={600} prefix="$" suffix="K" />
          <StatCard label="Distributions" value="$180K" numericValue={180} prefix="$" suffix="K" deltaType="positive" delta="Paid" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Documents */}
          <div className="p-5 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <SectionLabel>Documents</SectionLabel>
            <div className="space-y-1">
              {LP_DOCUMENTS.map(doc => (
                <div key={doc.id}
                  className="flex items-center gap-3 py-2.5 px-2 rounded cursor-pointer transition-colors"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <FileText size={14} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs truncate" style={{ color: 'var(--color-text-1)' }}>{doc.name}</p>
                    <p className="font-mono text-[10px]" style={{ color: 'var(--color-text-3)' }}>{doc.date} · {doc.size}</p>
                  </div>
                  <Download size={13} style={{ color: 'var(--color-text-3)', flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio updates */}
          <div className="p-5 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <SectionLabel>Portfolio Updates</SectionLabel>
            <div className="space-y-3">
              {PORTFOLIO_COMPANIES.slice(0, 6).map(co => (
                <div key={co.id} className="py-2.5" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <p className="font-mono text-xs mb-1" style={{ color: 'var(--color-gold)' }}>{co.name}</p>
                  <p className="font-mono text-[11px]" style={{ color: 'var(--color-text-2)' }}>{co.lastUpdate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RoleGate>
  );
}
