import { auth } from '@/lib/auth';
import { RoleGate } from '@/components/shell/RoleGate';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatCard } from '@/components/ui/StatCard';
import { AllocationChart } from '@/components/charts/AllocationChart';
import { TimelineChart } from '@/components/charts/TimelineChart';
import { GEO_DISTRIBUTION } from '@/lib/mock-data';

export default async function AnalyticsPage() {
  const session = await auth();
  const role = (session?.user as { role: string })?.role;
  const isGP = role === 'admin' || role === 'owner';

  return (
    <RoleGate path="/analytics">
      <div>
        <div className="mb-6">
          <h1 className="font-display text-[26px]" style={{ color: 'var(--color-text-1)' }}>Fund Analytics</h1>
          <p className="font-mono text-xs mt-1" style={{ color: 'var(--color-text-3)' }}>Fund I performance metrics</p>
        </div>

        {/* GP metrics or LP banner */}
        {isGP ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Net IRR" value="28%" numericValue={28} suffix="%" />
            <StatCard label="TVPI" value="1.8×" numericValue={1.8} suffix="×" />
            <StatCard label="DPI" value="0.4×" numericValue={0.4} suffix="×" />
            <StatCard label="RVPI" value="1.4×" numericValue={1.4} suffix="×" />
          </div>
        ) : (
          <div className="p-5 rounded-lg mb-8" style={{ border: '1px solid var(--color-gold)', background: 'var(--color-gold-dim)' }}>
            <p className="font-mono text-xs mb-1" style={{ color: 'var(--color-gold)' }}>▲ RESTRICTED VIEW</p>
            <p className="font-mono text-xs" style={{ color: 'var(--color-text-2)' }}>
              IRR, TVPI, and cash flow data are visible to GPs only.
            </p>
            <p className="font-mono text-xs mt-1" style={{ color: 'var(--color-text-3)' }}>
              Contact your GP representative for full performance reporting.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Allocation */}
          <div className="p-5 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <SectionLabel>Portfolio Allocation</SectionLabel>
            <AllocationChart />
          </div>

          {/* Deal velocity */}
          <div className="p-5 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <SectionLabel>Quarterly Deal Velocity</SectionLabel>
            <TimelineChart />
          </div>

          {/* Geo distribution */}
          <div className="p-5 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <SectionLabel>Geographic Distribution</SectionLabel>
            <div className="space-y-3 mt-2">
              {GEO_DISTRIBUTION.map(geo => (
                <div key={geo.name} className="flex items-center gap-3">
                  <span className="font-mono text-xs w-16" style={{ color: 'var(--color-text-2)' }}>{geo.name}</span>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-surface-3)' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${geo.value}%`, background: 'var(--color-gold)' }} />
                  </div>
                  <span className="font-mono text-xs tabular-nums w-8 text-right" style={{ color: 'var(--color-gold)' }}>{geo.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RoleGate>
  );
}
