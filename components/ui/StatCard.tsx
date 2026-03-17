'use client';

import { useEffect, useState } from 'react';
import { animate } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string;
  numericValue?: number;
  delta?: string;
  deltaType?: 'positive' | 'negative' | 'neutral';
  prefix?: string;
  suffix?: string;
}

export function StatCard({ label, value, numericValue, delta, deltaType = 'neutral', prefix = '', suffix = '' }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (numericValue !== undefined) {
      const controls = animate(0, numericValue, {
        duration: 1.5,
        ease: 'easeOut',
        onUpdate: (v) => {
          if (numericValue >= 1000000) {
            setDisplayValue((v / 1000000).toFixed(1) + 'M');
          } else if (numericValue >= 1000) {
            setDisplayValue((v / 1000).toFixed(1) + 'K');
          } else if (numericValue % 1 !== 0) {
            setDisplayValue(v.toFixed(1));
          } else {
            setDisplayValue(Math.round(v).toString());
          }
        },
      });
      return () => controls.stop();
    }
  }, [numericValue]);

  const deltaColor = deltaType === 'positive' ? 'var(--color-success)' :
                     deltaType === 'negative' ? 'var(--color-danger)' : 'var(--color-text-3)';

  return (
    <div className="p-5 rounded-lg stat-card-hairline"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
      <p className="font-mono text-[10px] tracking-[0.15em] mb-3" style={{ color: 'var(--color-text-3)' }}>
        {label.toUpperCase()}
      </p>
      <p className="font-display text-2xl tabular-nums" style={{ color: 'var(--color-gold)' }}>
        {prefix}{numericValue !== undefined ? displayValue : value}{suffix}
      </p>
      {delta && (
        <p className="font-mono text-[11px] mt-1" style={{ color: deltaColor }}>{delta}</p>
      )}
    </div>
  );
}
