'use client';

import { useState } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { PORTFOLIO_COMPANIES } from '@/lib/mock-data';

const CAP_TABLE_DATA: Record<string, { instrument: string; shares: string; ownership: string; entry: string; current: string }[]> = {
  'EtherealX': [
    { instrument: 'SAFE (MFN)', shares: '—', ownership: '8.2%', entry: '$3.2M', current: '$18.4M' },
    { instrument: 'Seed Preferred', shares: '124,500', ownership: '4.1%', entry: '$4.8M', current: '$21.0M' },
  ],
};

export function CapTableClient() {
  const [selected, setSelected] = useState('EtherealX');
  const data = CAP_TABLE_DATA[selected] || [];

  return (
    <>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="font-display text-[26px]" style={{ color: 'var(--color-text-1)' }}>Cap Table</h1>
          <p className="font-mono text-xs mt-1" style={{ color: 'var(--color-text-3)' }}>Riceberg position by portfolio company</p>
        </div>
        <select className="font-mono text-xs px-3 py-2 rounded outline-none"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-2)' }}
          value={selected} onChange={e => setSelected(e.target.value)}>
          {PORTFOLIO_COMPANIES.map(co => <option key={co.id}>{co.name}</option>)}
        </select>
      </div>

      <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-2)' }}>
              {['Instrument', 'Shares', '% Ownership', 'Entry Valuation', 'Current Valuation'].map(col => (
                <th key={col} className="px-4 py-3 text-left font-mono text-[10px] tracking-[0.1em]"
                  style={{ color: 'var(--color-text-3)' }}>{col.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? data.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--color-text-1)' }}>{row.instrument}</td>
                <td className="px-4 py-3 font-mono text-xs tabular-nums" style={{ color: 'var(--color-text-2)' }}>{row.shares}</td>
                <td className="px-4 py-3 font-mono text-xs tabular-nums" style={{ color: 'var(--color-gold)' }}>{row.ownership}</td>
                <td className="px-4 py-3 font-mono text-xs tabular-nums" style={{ color: 'var(--color-text-2)' }}>{row.entry}</td>
                <td className="px-4 py-3 font-mono text-xs tabular-nums" style={{ color: 'var(--color-success)' }}>{row.current}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center font-mono text-xs" style={{ color: 'var(--color-text-3)' }}>
                  No cap table data available for {selected}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
