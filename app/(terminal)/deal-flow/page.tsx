import { RoleGate } from '@/components/shell/RoleGate';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatCard } from '@/components/ui/StatCard';
import { getDealFlowCompanies, Prospect } from '@/lib/decile-hub';

const STAGE_COLORS: Record<string, string> = {
  'Screening': 'var(--color-text-3)',
  'First Meeting': 'var(--color-cyan)',
  'Due Diligence': '#FB923C',
  'IC Review': '#A78BFA',
  'Term Sheet': '#FB7185',
  'Closed': 'var(--color-success)',
  'Passed': 'var(--color-text-3)',
};

function stageColor(stage: string | null): string {
  if (!stage) return 'var(--color-text-3)';
  for (const [key, color] of Object.entries(STAGE_COLORS)) {
    if (stage.toLowerCase().includes(key.toLowerCase())) return color;
  }
  return 'var(--color-text-3)';
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  } catch {
    return dateStr;
  }
}

export default async function DealFlowPage() {
  const companies = await getDealFlowCompanies().catch(() => [] as Prospect[]);

  const byStage = (stageName: string) =>
    companies.filter(c => c.stage_name?.toLowerCase().includes(stageName.toLowerCase())).length;

  return (
    <RoleGate path="/deal-flow">
      <div>
        <div className="mb-6">
          <h1 className="font-display text-[26px]" style={{ color: 'var(--color-text-1)' }}>Deal Flow</h1>
          <p className="font-mono text-xs mt-1" style={{ color: 'var(--color-text-3)' }}>
            {companies.length} companies · Active pipeline · GP access only
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Active Pipeline" value={companies.length.toString()} numericValue={companies.length} />
          <StatCard label="Due Diligence" value={byStage('Due Diligence').toString()} numericValue={byStage('Due Diligence')} />
          <StatCard label="IC Review" value={byStage('IC Review').toString()} numericValue={byStage('IC Review')} />
          <StatCard label="Term Sheet" value={byStage('Term Sheet').toString()} numericValue={byStage('Term Sheet')} />
        </div>

        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
          <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-2)' }}>
            <SectionLabel>Pipeline</SectionLabel>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-2)' }}>
                {['Company', 'Description', 'Stage', 'Pipeline', 'Added'].map(col => (
                  <th key={col} className="px-4 py-3 text-left font-mono text-[10px] tracking-[0.1em]"
                    style={{ color: 'var(--color-text-3)' }}>{col.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {companies.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center font-mono text-xs" style={{ color: 'var(--color-text-3)' }}>
                    No pipeline companies found
                  </td>
                </tr>
              )}
              {companies.map(co => {
                const color = stageColor(co.stage_name);
                return (
                  <tr key={co.id} className="hover-row" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="px-4 py-3 font-mono text-sm" style={{ color: 'var(--color-text-1)' }}>{co.name}</td>
                    <td className="px-4 py-3 font-mono text-xs max-w-xs" style={{ color: 'var(--color-text-3)' }}>
                      <span className="line-clamp-1">{co.short_description || '—'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded"
                        style={{ color, border: `1px solid ${color}40`, background: `${color}10` }}>
                        {co.stage_name || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--color-text-3)' }}>
                      {co.pipeline_name || '—'}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs tabular-nums" style={{ color: 'var(--color-text-3)' }}>
                      {formatDate(co.created_at)}
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
