import { RoleGate } from '@/components/shell/RoleGate';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatCard } from '@/components/ui/StatCard';
import { PIPELINE_COMPANIES } from '@/lib/mock-data';

const STATUS_COLORS: Record<string, string> = {
  Screening: 'var(--color-text-3)',
  'First Meeting': 'var(--color-ice)',
  'Due Diligence': 'var(--color-warning)',
  'IC Review': 'var(--color-gold)',
};

export default function DealFlowPage() {
  return (
    <RoleGate path="/deal-flow">
      <div>
        <div className="mb-6">
          <h1 className="font-display text-[26px]" style={{ color: 'var(--color-text-1)' }}>Deal Flow</h1>
          <p className="font-mono text-xs mt-1" style={{ color: 'var(--color-text-3)' }}>Active pipeline · GP access only</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Active Pipeline" value="24" numericValue={24} />
          <StatCard label="In Due Diligence" value="6" numericValue={6} />
          <StatCard label="IC Approved" value="2" numericValue={2} />
          <StatCard label="Closed Q1" value="1" numericValue={1} />
        </div>

        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
          <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-2)' }}>
            <SectionLabel>Pipeline</SectionLabel>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-2)' }}>
                {['Company', 'Sector', 'Stage', 'Source', 'Status'].map(col => (
                  <th key={col} className="px-4 py-3 text-left font-mono text-[10px] tracking-[0.1em]"
                    style={{ color: 'var(--color-text-3)' }}>{col.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PIPELINE_COMPANIES.map(co => (
                <tr key={co.id} className="hover-row" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="px-4 py-3 font-mono text-sm" style={{ color: 'var(--color-text-1)' }}>{co.name}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--color-text-2)' }}>{co.sector}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--color-text-2)' }}>{co.stage}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--color-text-3)' }}>{co.source}</td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded"
                      style={{ color: STATUS_COLORS[co.pipelineStatus], border: `1px solid ${STATUS_COLORS[co.pipelineStatus]}40`, background: `${STATUS_COLORS[co.pipelineStatus]}10` }}>
                      {co.pipelineStatus}
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
