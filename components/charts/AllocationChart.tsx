'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { SECTOR_ALLOCATION } from '@/lib/mock-data';

export function AllocationChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={SECTOR_ALLOCATION}
          cx="50%"
          cy="50%"
          innerRadius={65}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
        >
          {SECTOR_ALLOCATION.map((entry, index) => (
            <Cell key={index} fill={entry.color} stroke="var(--color-bg)" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', fontFamily: 'DM Mono', fontSize: 11 }}
          formatter={(v) => [`${v}%`, '']}
        />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontFamily: 'DM Mono', fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
