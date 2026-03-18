import { createClient } from '@/lib/supabase/server';
import { getRoleFromMetadata } from '@/lib/roles';
import { RoleGate } from '@/components/shell/RoleGate';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatCard } from '@/components/ui/StatCard';
import { AllocationChart } from '@/components/charts/AllocationChart';
import { TimelineChart } from '@/components/charts/TimelineChart';
import { getDashboardStats } from '@/lib/decile-hub';

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const role = getRoleFromMetadata(user);
  const isGP = role === 'admin' || role === 'owner';

  const stats = await getDashboardStats().catch(() => null);

  return (
    <RoleGate path="/analytics">
      <div>
        <div className="mb-6">
          <h1 className="font-display text-[26px]" style={{ color: 'var(--color-text-1)' }}>Fund Analytics</h1>
          <p className="font-mono text-xs mt-1" style={{ color: 'var(--color-text-3)' }}>
            Riceberg Ventures Premier Fund I
          </p>
        </div>

        {/* Real fund metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Target Fund Size" value="$20M" numericValue={20} prefix="$" suffix="M" />
          <StatCard
            label="Portfolio Cos."
            value={stats ? stats.portfolioCount.toString() : '—'}
            numericValue={stats?.portfolioCount ?? 0}
            delta="Active"
            deltaType="neutral"
          />
          <StatCard
            label="Pipeline"
            value={stats ? stats.dealsCount.toString() : '—'}
            numericValue={stats?.dealsCount ?? 0}
            delta="Companies"
            deltaType="neutral"
          />
          <StatCard
            label="Investors"
            value={stats ? stats.lpCount.toString() : '—'}
            numericValue={stats?.lpCount ?? 0}
            delta="In CRM"
            deltaType="neutral"
          />
        </div>

        {/* GP-only notice for financial performance */}
        {!isGP && (
          <div className="p-5 rounded-lg mb-8" style={{ border: '1px solid var(--color-cyan-muted)', background: 'var(--color-cyan-dim)' }}>
            <p className="font-mono text-xs mb-1" style={{ color: 'var(--color-cyan)' }}>▲ RESTRICTED VIEW</p>
            <p className="font-mono text-xs" style={{ color: 'var(--color-text-2)' }}>
              IRR, TVPI, and detailed cash flow data are visible to GPs only.
            </p>
            <p className="font-mono text-xs mt-1" style={{ color: 'var(--color-text-3)' }}>
              Contact your GP representative for full performance reporting.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Allocation */}
          <div className="p-5 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <SectionLabel>Portfolio Allocation by Sector</SectionLabel>
            <AllocationChart />
          </div>

          {/* Deal velocity */}
          <div className="p-5 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <SectionLabel>Quarterly Deal Velocity</SectionLabel>
            <TimelineChart />
          </div>

          {/* Fund thesis */}
          <div className="p-5 rounded-lg lg:col-span-2" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <SectionLabel>Fund I Thesis</SectionLabel>
            <p className="font-mono text-xs mt-3 leading-relaxed" style={{ color: 'var(--color-text-2)' }}>
              A venture capital fund focused on early-stage deep tech startups by Indian / Indian-origin founders worldwide.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
              {[
                { label: 'Focus', value: 'Deep Tech' },
                { label: 'Stage', value: 'Pre-seed / Seed' },
                { label: 'Geography', value: 'Global' },
                { label: 'Currency', value: 'USD' },
              ].map(item => (
                <div key={item.label}>
                  <p className="font-mono text-[10px] tracking-[0.1em] mb-1" style={{ color: 'var(--color-text-3)' }}>{item.label.toUpperCase()}</p>
                  <p className="font-mono text-sm" style={{ color: 'var(--color-cyan)' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RoleGate>
  );
}
