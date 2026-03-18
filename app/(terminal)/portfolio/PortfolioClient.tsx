'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ExternalLink } from 'lucide-react';
import { Prospect } from '@/lib/decile-hub';

type Sector = 'SpaceTech' | 'AI' | 'BioTech' | 'Health' | 'CleanTech' | 'DeepTech' | 'Other';

const FILTERS: (Sector | 'ALL')[] = ['ALL', 'SpaceTech', 'AI', 'BioTech', 'Health', 'CleanTech', 'DeepTech', 'Other'];

const SECTOR_COLORS: Record<Sector, string> = {
  SpaceTech: 'var(--color-cyan)',
  AI: '#A78BFA',
  BioTech: 'var(--color-success)',
  Health: '#FB7185',
  CleanTech: '#2DD4BF',
  DeepTech: '#61d1dc',
  Other: 'var(--color-text-3)',
};

function guessSector(name: string, description?: string): Sector {
  const text = `${name} ${description || ''}`.toLowerCase();
  if (/space|satellite|orbit|launch|rocket|aerospace/.test(text)) return 'SpaceTech';
  if (/ai |artificial intelligence|machine learning|llm|neural|nlp/.test(text)) return 'AI';
  if (/bio|genomic|gene|crispr|protein|sequenc|cell therapy|drug discovery/.test(text)) return 'BioTech';
  if (/health|medical|clinical|patient|diagnostic|therapeut|medtech/.test(text)) return 'Health';
  if (/clean|solar|wind|energy|carbon|emission|sustainab|battery|ev /.test(text)) return 'CleanTech';
  if (/quantum|photon|semiconductor|deep tech|hardware|sensor|robot/.test(text)) return 'DeepTech';
  return 'Other';
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  } catch {
    return dateStr;
  }
}

export function PortfolioClient({ companies, role }: { companies: Prospect[]; role: string }) {
  const [filter, setFilter] = useState<Sector | 'ALL'>('ALL');
  const [selected, setSelected] = useState<Prospect | null>(null);

  const withSectors = companies.map(c => ({
    ...c,
    sector: guessSector(c.name, c.short_description) as Sector,
  }));

  const filtered = filter === 'ALL' ? withSectors : withSectors.filter(c => c.sector === filter);
  const selectedWithSector = selected ? withSectors.find(c => c.id === selected.id) : null;

  return (
    <>
      {/* Filter bar */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map(f => (
          <button key={f}
            onClick={() => setFilter(f)}
            className="font-mono text-xs px-3 py-1.5 rounded transition-all"
            style={{
              background: filter === f ? 'rgba(97,209,220,0.1)' : 'var(--color-surface)',
              border: `1px solid ${filter === f ? 'var(--color-cyan)' : 'var(--color-border)'}`,
              color: filter === f ? 'var(--color-cyan)' : 'var(--color-text-2)',
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-2)' }}>
              {['Company', 'Sector', 'Stage', 'Pipeline', 'Added'].map(col => (
                <th key={col} className="px-4 py-3 text-left font-mono text-[10px] tracking-[0.1em]"
                  style={{ color: 'var(--color-text-3)' }}>{col.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center font-mono text-xs" style={{ color: 'var(--color-text-3)' }}>
                  No companies found
                </td>
              </tr>
            )}
            {filtered.map((company, i) => (
              <motion.tr key={company.id}
                onClick={() => setSelected(company)}
                className="cursor-pointer transition-colors"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                style={{ borderBottom: '1px solid var(--color-border)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <td className="px-4 py-3 font-mono text-sm" style={{ color: 'var(--color-text-1)' }}>
                  {company.name}
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded"
                    style={{
                      color: SECTOR_COLORS[company.sector],
                      border: `1px solid ${SECTOR_COLORS[company.sector]}30`,
                      background: `${SECTOR_COLORS[company.sector]}10`,
                    }}>
                    {company.sector}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--color-text-2)' }}>
                  {company.stage_name || '—'}
                </td>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--color-text-3)' }}>
                  {company.pipeline_name || '—'}
                </td>
                <td className="px-4 py-3 font-mono text-xs tabular-nums" style={{ color: 'var(--color-text-3)' }}>
                  {formatDate(company.created_at)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail sheet */}
      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent style={{ background: 'var(--color-surface)', borderLeft: '1px solid var(--color-border)', color: 'var(--color-text-1)' }}>
          {selectedWithSector && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="font-display text-xl" style={{ color: 'var(--color-text-1)' }}>
                  {selectedWithSector.name}
                </SheetTitle>
                <span className="font-mono text-xs px-2 py-0.5 rounded inline-block mt-1"
                  style={{
                    color: SECTOR_COLORS[selectedWithSector.sector],
                    border: `1px solid ${SECTOR_COLORS[selectedWithSector.sector]}40`,
                    background: `${SECTOR_COLORS[selectedWithSector.sector]}10`,
                  }}>
                  {selectedWithSector.sector}
                </span>
              </SheetHeader>
              <div className="space-y-5">
                {selectedWithSector.stage_name && (
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.1em] mb-1" style={{ color: 'var(--color-text-3)' }}>STAGE</p>
                    <p className="font-mono text-sm" style={{ color: 'var(--color-text-1)' }}>{selectedWithSector.stage_name}</p>
                  </div>
                )}
                <div>
                  <p className="font-mono text-[10px] tracking-[0.1em] mb-1" style={{ color: 'var(--color-text-3)' }}>PIPELINE</p>
                  <p className="font-mono text-sm" style={{ color: 'var(--color-text-1)' }}>{selectedWithSector.pipeline_name || '—'}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.1em] mb-1" style={{ color: 'var(--color-text-3)' }}>ADDED</p>
                  <p className="font-mono text-sm" style={{ color: 'var(--color-text-1)' }}>{formatDate(selectedWithSector.created_at)}</p>
                </div>
                {selectedWithSector.company_url && (
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.1em] mb-1" style={{ color: 'var(--color-text-3)' }}>WEBSITE</p>
                    <a href={selectedWithSector.company_url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 font-mono text-sm transition-colors"
                      style={{ color: 'var(--color-cyan)' }}>
                      {selectedWithSector.company_url.replace(/^https?:\/\//, '')}
                      <ExternalLink size={11} />
                    </a>
                  </div>
                )}
                {selectedWithSector.short_description && (
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.1em] mb-1" style={{ color: 'var(--color-text-3)' }}>DESCRIPTION</p>
                    <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--color-text-2)' }}>
                      {selectedWithSector.short_description}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
