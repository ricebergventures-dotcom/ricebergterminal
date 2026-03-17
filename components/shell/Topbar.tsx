'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';

const PAGE_NAMES: Record<string, string> = {
  '/dashboard': 'dashboard',
  '/portfolio': 'portfolio tracker',
  '/analytics': 'fund analytics',
  '/lp-portal': 'lp portal',
  '/deal-flow': 'deal flow',
  '/cap-table': 'cap table',
  '/team': 'team admin',
  '/settings': 'settings',
};

export function Topbar() {
  const pathname = usePathname();
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const pageName = PAGE_NAMES[pathname] || pathname.replace('/', '');

  return (
    <header className="h-[52px] flex items-center px-6 justify-between flex-shrink-0"
      style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
      <span className="font-mono text-xs" style={{ color: 'var(--color-text-2)' }}>{pageName}</span>
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs tabular-nums" style={{ color: 'var(--color-text-3)' }}>{time}</span>
        <div className="w-px h-4" style={{ background: 'var(--color-border)' }} />
        <button className="relative p-1 transition-colors" style={{ color: 'var(--color-text-3)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-2)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-3)')}>
          <Bell size={15} />
          <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-gold)' }} />
        </button>
      </div>
    </header>
  );
}
