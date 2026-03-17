import { ActivityEntry } from '@/lib/mock-data';

export function ActivityFeed({ items }: { items: ActivityEntry[] }) {
  return (
    <div className="space-y-2">
      {items.map(item => (
        <div key={item.id} className="flex gap-3 font-mono text-xs py-1.5"
          style={{ borderBottom: '1px solid var(--color-border)' }}>
          <span className="flex-shrink-0 tabular-nums" style={{ color: 'var(--color-text-3)' }}>{item.timestamp}</span>
          <span style={{ color: 'var(--color-text-2)' }}>
            {item.text}
            {item.entity && (
              <span style={{ color: 'var(--color-gold)' }}> {item.entity}</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
