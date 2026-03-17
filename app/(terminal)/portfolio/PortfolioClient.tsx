'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Company, Sector } from '@/lib/mock-data';

const FILTERS: (Sector | 'ALL')[] = ['ALL', 'SpaceTech', 'AI', 'BioTech', 'Health', 'CleanTech', 'Other'];

const SECTOR_COLORS: Record<Sector, string> = {
  SpaceTech: 'var(--color-ice)',
  AI: '#A78BFA',
  BioTech: 'var(--color-success)',
  Health: '#FB7185',
  CleanTech: '#2DD4BF',
  Other: 'var(--color-text-3)',
};

export function PortfolioClient({ companies, role }: { companies: Company[]; role: string }) {
  const [filter, setFilter] = useState<Sector | 'ALL'>('ALL');
  const [selected, setSelected] = useState<Company | null>(null);

  const filtered = filter === 'ALL' ? companies : companies.filter(c => c.sector === filter);

  return (
    <>
      {/* Filter bar */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map(f => (
          <button key={f}
            onClick={() => setFilter(f)}
            className="font-mono text-xs px-3 py-1.5 rounded transition-all"
            style={{
              background: filter === f ? 'var(--color-gold-dim)' : 'var(--color-surface)',
              border: `1px solid ${filter === f ? 'var(--color-gold)' : 'var(--color-border)'}`,
              color: filter === f ? 'var(--color-gold)' : 'var(--color-text-2)',
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
              {['Company', 'Sector', 'Stage', 'Check Size', 'Status'].map(col => (
                <th key={col} className="px-4 py-3 text-left font-mono text-[10px] tracking-[0.1em]"
                  style={{ color: 'var(--color-text-3)' }}>{col.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
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
                <td className="px-4 py-3 font-mono text-sm" style={{ color: 'var(--color-text-1)' }}>{company.name}</td>
                <td className="px-4 py-3">
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded"
                    style={{ color: SECTOR_COLORS[company.sector], border: `1px solid ${SECTOR_COLORS[company.sector]}30`, background: `${SECTOR_COLORS[company.sector]}10` }}>
                    {company.sector}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--color-text-2)' }}>{company.stage}</td>
                <td className="px-4 py-3 font-mono text-xs tabular-nums" style={{ color: role === 'lp' ? 'var(--color-text-3)' : 'var(--color-gold)' }}>
                  {role === 'lp' ? '██████' : company.checkSize}
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded"
                    style={{ color: 'var(--color-success)', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
                    {company.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail sheet */}
      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent style={{ background: 'var(--color-surface)', borderLeft: '1px solid var(--color-border)', color: 'var(--color-text-1)' }}>
          {selected && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="font-display text-xl" style={{ color: 'var(--color-text-1)' }}>{selected.name}</SheetTitle>
                <span className="font-mono text-xs px-2 py-0.5 rounded inline-block mt-1"
                  style={{ color: SECTOR_COLORS[selected.sector], border: `1px solid ${SECTOR_COLORS[selected.sector]}40` }}>
                  {selected.sector}
                </span>
              </SheetHeader>
              <div className="space-y-5">
                {[
                  { label: 'Stage', value: selected.stage },
                  { label: 'Geography', value: selected.geography },
                  { label: 'Founded', value: selected.foundedYear.toString() },
                  { label: 'Founders', value: selected.founders.join(', ') },
                  { label: 'Investment Date', value: '2022–2023' },
                ].map(row => (
                  <div key={row.label}>
                    <p className="font-mono text-[10px] tracking-[0.1em] mb-1" style={{ color: 'var(--color-text-3)' }}>{row.label.toUpperCase()}</p>
                    <p className="font-mono text-sm" style={{ color: 'var(--color-text-1)' }}>{row.value}</p>
                  </div>
                ))}
                <div>
                  <p className="font-mono text-[10px] tracking-[0.1em] mb-1" style={{ color: 'var(--color-text-3)' }}>LAST UPDATE</p>
                  <p className="font-mono text-xs" style={{ color: 'var(--color-text-2)' }}>{selected.lastUpdate}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.1em] mb-1" style={{ color: 'var(--color-text-3)' }}>DESCRIPTION</p>
                  <p className="font-mono text-xs" style={{ color: 'var(--color-text-2)' }}>{selected.description}</p>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
