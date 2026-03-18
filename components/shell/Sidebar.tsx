'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import {
  LayoutDashboard, Briefcase, BarChart3, Users2, GitBranch,
  Table2, UserCog, Settings, LogOut, ChevronRight,
  Brain, Radar, Mic, ExternalLink
} from 'lucide-react';
import { UserRole } from '@/lib/users';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  roles: UserRole[];
  section?: string;
  external?: boolean;
  accent?: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={15} />, roles: ['admin', 'owner', 'lp'] },

  // External project tools
  { href: '/api/sso?target=https://riceberg-intelligence.vercel.app/', label: 'Intelligence', icon: <Brain size={15} />, roles: ['admin', 'owner', 'lp'], section: 'TOOLS', external: true, accent: '#61d1dc' },
  { href: '/api/sso?target=https://lp-dashboard-r21f.vercel.app/', label: 'LP Dashboard', icon: <Users2 size={15} />, roles: ['admin', 'owner', 'lp'], external: true, accent: '#4ade80' },
  { href: '/api/sso?target=https://deeptech-radar.vercel.app/', label: 'DeepTech Radar', icon: <Radar size={15} />, roles: ['admin', 'owner'], external: true, accent: '#a78bfa' },
  { href: '/api/sso?target=https://pitchperfect-eta.vercel.app/', label: 'PitchPerfect', icon: <Mic size={15} />, roles: ['admin', 'owner'], external: true, accent: '#fb7185' },

  // Internal pages
  { href: '/portfolio', label: 'Portfolio', icon: <Briefcase size={15} />, roles: ['admin', 'owner', 'lp'], section: 'FUND' },
  { href: '/analytics', label: 'Fund Analytics', icon: <BarChart3 size={15} />, roles: ['admin', 'owner', 'lp'] },
  { href: '/deal-flow', label: 'Deal Flow', icon: <GitBranch size={15} />, roles: ['admin', 'owner'] },
  { href: '/cap-table', label: 'Cap Table', icon: <Table2 size={15} />, roles: ['admin', 'owner'] },
  { href: '/team', label: 'Team', icon: <UserCog size={15} />, roles: ['admin'], section: 'ADMIN' },
  { href: '/settings', label: 'Settings', icon: <Settings size={15} />, roles: ['admin'] },
];

interface SidebarProps {
  user: { name?: string | null; email?: string | null; role: string };
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const role = user.role as UserRole;

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const visibleItems = NAV_ITEMS.filter(item => item.roles.includes(role));
  const initials = (user.name || 'U').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <aside className="fixed left-0 top-0 h-full w-[220px] flex flex-col sidebar-hairline relative z-20"
      style={{ background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)' }}>

      {/* Logo */}
      <div className="px-5 pt-5 pb-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <Link href="/dashboard">
          <Image
            src="/logo.png"
            alt="Riceberg Ventures"
            width={202}
            height={60}
            className="object-contain"
            style={{ width: '120px', height: 'auto' }}
            priority
          />
        </Link>
        <span className="text-[9px] tracking-[0.18em] mt-1.5 block" style={{ color: 'var(--color-text-3)', fontFamily: 'Manrope, sans-serif' }}>
          TERMINAL
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        {(() => {
          let lastSection: string | undefined = undefined;
          return visibleItems.map(item => {
            const showSection = item.section && item.section !== lastSection;
            if (item.section) lastSection = item.section;
            const isActive = !item.external && (pathname === item.href || pathname.startsWith(item.href + '/'));

            return (
              <div key={item.href}>
                {showSection && (
                  <div className="px-2 pt-4 pb-1">
                    <span className="text-[9px] tracking-[0.15em]" style={{ color: 'var(--color-text-3)', fontFamily: 'Manrope, sans-serif' }}>
                      {item.section}
                    </span>
                  </div>
                )}
                <Link
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                >
                  <motion.div
                    className="flex items-center gap-2.5 px-2 py-2 rounded-md cursor-pointer relative"
                    style={{
                      color: isActive ? 'var(--color-text-1)' : 'var(--color-text-2)',
                      background: isActive ? 'var(--color-surface-2)' : 'transparent',
                      borderLeft: isActive ? '2px solid var(--color-cyan)' : '2px solid transparent',
                    }}
                    whileHover={{ backgroundColor: 'var(--color-surface-2)' }}
                    transition={{ duration: 0.1 }}
                  >
                    <span style={{ color: item.accent || (isActive ? 'var(--color-cyan)' : 'var(--color-text-3)') }}>
                      {item.icon}
                    </span>
                    <span className="text-xs flex-1" style={{ fontFamily: 'Manrope, sans-serif' }}>{item.label}</span>
                    {item.external
                      ? <ExternalLink size={10} style={{ color: 'var(--color-text-3)', opacity: 0.5 }} />
                      : isActive && <ChevronRight size={12} style={{ color: 'var(--color-cyan)' }} />
                    }
                  </motion.div>
                </Link>
              </div>
            );
          });
        })()}
      </nav>

      {/* User */}
      <div className="p-4" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
            style={{ background: 'var(--color-cyan-dim)', color: 'var(--color-cyan)', border: '1px solid var(--color-cyan-muted)' }}>
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: 'var(--color-text-1)', fontFamily: 'Manrope, sans-serif' }}>{user.name}</p>
            <p className="text-[10px] truncate" style={{ color: 'var(--color-text-3)', fontFamily: 'Manrope, sans-serif' }}>{user.email}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] px-1.5 py-0.5 rounded" style={{
            color: 'var(--color-cyan)',
            border: '1px solid var(--color-cyan-muted)',
            background: 'var(--color-cyan-dim)',
            fontFamily: 'Manrope, sans-serif',
          }}>
            {role.toUpperCase()}
          </span>
          <button onClick={handleSignOut}
            className="flex items-center gap-1 text-[11px] transition-colors"
            style={{ color: 'var(--color-text-3)', fontFamily: 'Manrope, sans-serif' }}
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
