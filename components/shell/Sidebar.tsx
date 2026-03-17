'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Briefcase, BarChart3, Users2, GitBranch,
  Table2, UserCog, Settings, LogOut, ChevronRight
} from 'lucide-react';
import { UserRole } from '@/lib/users';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  roles: UserRole[];
  section?: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={15} />, roles: ['admin', 'owner', 'lp'] },
  { href: '/portfolio', label: 'Portfolio', icon: <Briefcase size={15} />, roles: ['admin', 'owner', 'lp'], section: 'INVESTMENTS' },
  { href: '/analytics', label: 'Fund Analytics', icon: <BarChart3 size={15} />, roles: ['admin', 'owner', 'lp'] },
  { href: '/lp-portal', label: 'LP Portal', icon: <Users2 size={15} />, roles: ['admin', 'owner', 'lp'] },
  { href: '/deal-flow', label: 'Deal Flow', icon: <GitBranch size={15} />, roles: ['admin', 'owner'], section: 'OPERATIONS' },
  { href: '/cap-table', label: 'Cap Table', icon: <Table2 size={15} />, roles: ['admin', 'owner'] },
  { href: '/team', label: 'Team', icon: <UserCog size={15} />, roles: ['admin'], section: 'ADMIN' },
  { href: '/settings', label: 'Settings', icon: <Settings size={15} />, roles: ['admin'] },
];

interface SidebarProps {
  user: { name?: string | null; email?: string | null; role: string };
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const role = user.role as UserRole;

  const visibleItems = NAV_ITEMS.filter(item => item.roles.includes(role));

  const initials = (user.name || 'U').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <aside className="fixed left-0 top-0 h-full w-[220px] flex flex-col sidebar-hairline relative z-20"
      style={{ background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)' }}>

      {/* Logo */}
      <div className="px-5 pt-5 pb-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Riceberg" width={110} height={28} className="object-contain" style={{ filter: 'brightness(1.1)' }} />
        </Link>
        <span className="font-mono text-[9px] tracking-[0.2em] mt-1 block" style={{ color: 'var(--color-text-3)' }}>TERMINAL</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 overflow-y-auto">
        {(() => {
          let lastSection: string | undefined = undefined;
          return visibleItems.map(item => {
            const sectionHeader = item.section && item.section !== lastSection ? (
              <div key={`section-${item.section}`} className="px-2 pt-4 pb-1">
                <span className="font-mono text-[9px] tracking-[0.15em]" style={{ color: 'var(--color-text-3)' }}>{item.section}</span>
              </div>
            ) : null;
            lastSection = item.section || lastSection;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <div key={item.href}>
                {sectionHeader}
                <Link href={item.href}>
                  <motion.div
                    className="flex items-center gap-2.5 px-2 py-2 rounded-sm cursor-pointer relative"
                    style={{
                      color: isActive ? 'var(--color-text-1)' : 'var(--color-text-2)',
                      background: isActive ? 'var(--color-surface-2)' : 'transparent',
                      borderLeft: isActive ? '2px solid var(--color-gold)' : '2px solid transparent',
                    }}
                    whileHover={{ x: 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    <span style={{ color: isActive ? 'var(--color-gold)' : 'var(--color-text-3)' }}>{item.icon}</span>
                    <span className="font-mono text-xs">{item.label}</span>
                    {isActive && <ChevronRight size={12} className="ml-auto" style={{ color: 'var(--color-gold)' }} />}
                  </motion.div>
                </Link>
              </div>
            );
          });
        })()}
      </nav>

      {/* User */}
      <div className="p-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-medium flex-shrink-0"
            style={{ background: 'var(--color-gold-dim)', color: 'var(--color-gold)', border: '1px solid var(--color-gold-muted)' }}>
            {initials}
          </div>
          <div className="min-w-0">
            <p className="font-mono text-xs truncate" style={{ color: 'var(--color-text-1)' }}>{user.name}</p>
            <p className="font-mono text-[10px] truncate" style={{ color: 'var(--color-text-3)' }}>{user.email}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded" style={{
            color: 'var(--color-gold)',
            border: '1px solid var(--color-gold-muted)',
            background: 'var(--color-gold-dim)'
          }}>[ {role.toUpperCase()} ]</span>
          <button onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center gap-1 font-mono text-[10px] transition-colors"
            style={{ color: 'var(--color-text-3)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-danger)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-3)')}
          >
            <LogOut size={11} /> Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
