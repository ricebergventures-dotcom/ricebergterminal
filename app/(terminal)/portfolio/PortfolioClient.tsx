'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ExternalLink, Users } from 'lucide-react';
import { PortfolioCompany } from '@/lib/decile-hub';
import { getEnrichment, Sector } from '@/lib/portfolio-enrichment';

const FILTERS: (Sector | 'ALL')[] = ['ALL', 'SpaceTech', 'AI', 'BioTech', 'Health', 'CleanTech', 'DeepTech', 'Other'];

const SECTOR_COLORS: Record<Sector, string> = {
  SpaceTech: 'var(--color-cyan)',
  AI: '#A78BFA',
  BioTech: '#34D399',
  Health: '#FB7185',
  CleanTech: '#2DD4BF',
  DeepTech: '#61d1dc',
  Other: 'var(--color-text-3)',
};

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  } catch {
    return dateStr;
  }
}

export function PortfolioClient({ companies, role }: { companies: PortfolioCompany[]; role: string }) {
  const [filter, setFilter] = useState<Sector | 'ALL'>('ALL');
  const [selected, setSelected] = useState<PortfolioCompany | null>(null);

  // Merge Decile Hub data with static enrichment
  const enriched = companies.map(c => ({
    ...c,
    enrichment: getEnrichment(c.name),
  }));

  const filtered = filter === 'ALL'
    ? enriched
    : enriched.filter(c => c.enrichment?.sector === filter);

  const selectedEnriched = selected ? enriched.find(c => c.id === selected.id) : null;

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
              {['Company', 'Sector', 'Stage', 'Description', 'Added'].map(col => (
                <th key={col} className="px-4 py-3 text-left font-mono text-[10px] tracking-[0.1em]"
                  style={{ color: 'var(--color-text-3)' }}>{col.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center font-mono text-xs" style={{ color: 'var(--color-text-3)' }}>
                  No companies in this sector
                </td>
              </tr>
            )}
            {filtered.map((company, i) => {
              const sector = company.enrichment?.sector ?? 'Other';
              const color = SECTOR_COLORS[sector];
              return (
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
                  <td className="px-4 py-3">
                    <p className="font-mono text-sm" style={{ color: 'var(--color-text-1)' }}>{company.name}</p>
                    {company.enrichment?.highlight && (
                      <p className="font-mono text-[10px] mt-0.5" style={{ color: 'var(--color-text-3)' }}>
                        {company.enrichment.highlight}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded whitespace-nowrap"
                      style={{ color, border: `1px solid ${color}30`, background: `${color}10` }}>
                      {sector}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs whitespace-nowrap" style={{ color: 'var(--color-text-2)' }}>
                    {company.enrichment?.stage ?? company.stage?.name ?? '—'}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs max-w-xs" style={{ color: 'var(--color-text-3)' }}>
                    <span className="line-clamp-2">
                      {company.enrichment?.description ?? company.org?.short_description ?? '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs tabular-nums whitespace-nowrap" style={{ color: 'var(--color-text-3)' }}>
                    {formatDate(company.created_at)}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detail sheet */}
      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent style={{ background: 'var(--color-surface)', borderLeft: '1px solid var(--color-border)', color: 'var(--color-text-1)' }}>
          {selectedEnriched && (() => {
            const sector = selectedEnriched.enrichment?.sector ?? 'Other';
            const color = SECTOR_COLORS[sector];
            const website = selectedEnriched.enrichment?.website ?? selectedEnriched.org?.company_url ?? null;
            const description = selectedEnriched.enrichment?.description ?? selectedEnriched.org?.short_description ?? null;
            const people = selectedEnriched.org?.people ?? [];

            return (
              <>
                <SheetHeader className="mb-6">
                  <SheetTitle className="font-display text-xl" style={{ color: 'var(--color-text-1)' }}>
                    {selectedEnriched.name}
                  </SheetTitle>
                  <span className="font-mono text-xs px-2 py-0.5 rounded inline-block mt-1"
                    style={{ color, border: `1px solid ${color}40`, background: `${color}10` }}>
                    {sector}
                  </span>
                </SheetHeader>
                <div className="space-y-5">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.1em] mb-1" style={{ color: 'var(--color-text-3)' }}>STAGE</p>
                    <p className="font-mono text-sm" style={{ color: 'var(--color-text-1)' }}>
                      {selectedEnriched.enrichment?.stage ?? selectedEnriched.stage?.name ?? '—'}
                    </p>
                  </div>

                  {selectedEnriched.enrichment?.highlight && (
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.1em] mb-1" style={{ color: 'var(--color-text-3)' }}>HIGHLIGHTS</p>
                      <p className="font-mono text-sm" style={{ color: 'var(--color-cyan)' }}>
                        {selectedEnriched.enrichment.highlight}
                      </p>
                    </div>
                  )}

                  {website && (
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.1em] mb-1" style={{ color: 'var(--color-text-3)' }}>WEBSITE</p>
                      <a href={website} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 font-mono text-sm transition-opacity hover:opacity-80"
                        style={{ color: 'var(--color-cyan)' }}>
                        {website.replace(/^https?:\/\//, '')}
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  )}

                  <div>
                    <p className="font-mono text-[10px] tracking-[0.1em] mb-1" style={{ color: 'var(--color-text-3)' }}>ADDED TO PORTFOLIO</p>
                    <p className="font-mono text-sm" style={{ color: 'var(--color-text-1)' }}>
                      {formatDate(selectedEnriched.created_at)}
                    </p>
                  </div>

                  {description && (
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.1em] mb-1" style={{ color: 'var(--color-text-3)' }}>DESCRIPTION</p>
                      <p className="font-mono text-xs leading-relaxed" style={{ color: 'var(--color-text-2)' }}>
                        {description}
                      </p>
                    </div>
                  )}

                  {people.length > 0 && (
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.1em] mb-2" style={{ color: 'var(--color-text-3)' }}>CONTACTS</p>
                      <div className="space-y-2">
                        {people.map((person, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                              <Users size={10} style={{ color }} />
                            </div>
                            <p className="font-mono text-xs" style={{ color: 'var(--color-text-1)' }}>
                              {person.first_name} {person.last_name}
                              {person.title && <span style={{ color: 'var(--color-text-3)' }}> · {person.title}</span>}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </SheetContent>
      </Sheet>
    </>
  );
}
