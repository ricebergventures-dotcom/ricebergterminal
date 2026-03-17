'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { QUARTERLY_DATA } from '@/lib/mock-data';

export function TimelineChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={QUARTERLY_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis dataKey="quarter" tick={{ fontFamily: 'DM Mono', fontSize: 10, fill: 'var(--color-text-3)' }} />
        <YAxis tick={{ fontFamily: 'DM Mono', fontSize: 10, fill: 'var(--color-text-3)' }} />
        <Tooltip contentStyle={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', fontFamily: 'DM Mono', fontSize: 11 }} />
        <Legend wrapperStyle={{ fontFamily: 'DM Mono', fontSize: 11 }} />
        <Bar dataKey="dealsReviewed" name="Reviewed" fill="var(--color-border-2)" radius={[2, 2, 0, 0]} />
        <Bar dataKey="dealsClosed" name="Closed" fill="var(--color-gold)" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
