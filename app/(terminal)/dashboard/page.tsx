import { createClient } from '@/lib/supabase/server';
import { getRoleFromMetadata } from '@/lib/roles';
import { StatCard } from '@/components/ui/StatCard';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { getDashboardStats, getRecentActivity } from '@/lib/decile-hub';
import Link from 'next/link';
import { ExternalLink, Brain, Radar, Mic, Users, Briefcase, GitBranch, Clock } from 'lucide-react';

const ALL_PROJECT_CARDS = [
  {
    number: '01',
    title: 'Riceberg Intelligence',
    description: 'AI-powered research and market intelligence for deep tech investing.',
    href: '/api/sso?target=https://riceberg-intelligence.vercel.app/',
    icon: Brain,
    accentColor: '#61d1dc',
    internalOnly: false,
  },
  {
    number: '02',
    title: 'DeepTech Radar',
    description: 'Live deal flow tracker — scrapes 14 sources daily for early-stage signals.',
    href: '/api/sso?target=https://deeptech-radar.vercel.app/',
    icon: Radar,
    accentColor: '#a78bfa',
    internalOnly: true,
  },
  {
    number: '03',
    title: 'PitchPerfect',
    description: 'AI pitch deck analysis and scoring for inbound deal evaluation.',
    href: '/api/sso?target=https://pitchperfect-eta.vercel.app/',
    icon: Mic,
    accentColor: '#fb7185',
    internalOnly: true,
  },
  {
    number: '04',
    title: 'LP Dashboard',
    description: 'Limited partner portal for capital accounts, reports, and updates.',
    href: '/api/sso?target=https://lp-dashboard-r21f.vercel.app/',
    icon: Users,
    accentColor: '#4ade80',
    internalOnly: false,
  },
];

function formatTimeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function formatCurrency(amount: number, currency: string) {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toLocaleString()}`;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const firstName = (user?.user_metadata?.name as string | undefined)?.split(' ')[0] || user?.email?.split('@')[0] || 'there';
  const role = getRoleFromMetadata(user);
  const isGP = role === 'admin' || role === 'owner';
  const PROJECT_CARDS = ALL_PROJECT_CARDS.filter(c => !c.internalOnly || isGP);

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const [stats, activity] = await Promise.all([
    getDashboardStats().catch(() => null),
    getRecentActivity(8).catch(() => []),
  ]);

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-display text-[26px] font-semibold mb-1" style={{ color: 'var(--color-text-1)' }}>
          {greeting}, {firstName}
        </h1>
        <p className="text-xs" style={{ color: 'var(--color-text-3)', fontFamily: 'Manrope, sans-serif' }}>{dateStr}</p>
      </div>

      {/* Stat cards — real data only */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          label="Target Fund Size"
          value="$20M"
          numericValue={20}
          prefix="$"
          suffix="M"
        />
        <StatCard
          label="Portfolio Cos."
          value={stats ? stats.portfolioCount.toString() : '—'}
          numericValue={stats?.portfolioCount ?? 0}
          delta="Active"
          deltaType="neutral"
        />
        <StatCard
          label="Pipeline"
          value={stats ? stats.dealsCount.toString() : '—'}
          numericValue={stats?.dealsCount ?? 0}
          delta="Companies"
          deltaType="neutral"
        />
        <StatCard
          label="Investors"
          value={stats ? stats.lpCount.toString() : '—'}
          numericValue={stats?.lpCount ?? 0}
          delta="In CRM"
          deltaType="neutral"
        />
      </div>

      {/* Project tools */}
      <div className="mb-10">
        <SectionLabel>Platform Tools</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
          {PROJECT_CARDS.map(card => {
            const Icon = card.icon;
            return (
              <Link
                key={card.number}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl transition-all duration-200"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${card.accentColor}15`, border: `1px solid ${card.accentColor}30` }}>
                  <Icon size={18} style={{ color: card.accentColor }} />
                </div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-[10px] font-mono mb-1 block" style={{ color: 'var(--color-text-3)' }}>{card.number}</span>
                    <h3 className="text-sm font-semibold leading-tight" style={{ color: 'var(--color-text-1)', fontFamily: 'Manrope, sans-serif' }}>
                      {card.title}
                    </h3>
                  </div>
                  <ExternalLink size={13} style={{ color: 'var(--color-text-3)', flexShrink: 0, marginTop: 2 }}
                    className="group-hover:opacity-100 opacity-0 transition-opacity" />
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-2)', fontFamily: 'Manrope, sans-serif' }}>
                  {card.description}
                </p>
                <div className="mt-4 h-px w-0 group-hover:w-full transition-all duration-300 rounded-full"
                  style={{ background: card.accentColor }} />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent activity from Decile Hub */}
      <div className="p-5 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <SectionLabel>Recent Activity</SectionLabel>
        {activity.length === 0 ? (
          <p className="font-mono text-xs mt-4" style={{ color: 'var(--color-text-3)' }}>No recent activity</p>
        ) : (
          <div className="mt-3 space-y-1">
            {activity.map(item => {
              const isPortfolio = item.pipeline_name === 'Portfolio';
              const Icon = isPortfolio ? Briefcase : GitBranch;
              const color = isPortfolio ? 'var(--color-cyan)' : '#a78bfa';
              return (
                <div key={item.id} className="flex items-start gap-3 py-2.5"
                  style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${color}15` }}>
                    <Icon size={11} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs truncate" style={{ color: 'var(--color-text-1)' }}>{item.name}</p>
                    <p className="font-mono text-[10px] mt-0.5" style={{ color: 'var(--color-text-3)' }}>
                      {item.pipeline_name}{item.stage_name ? ` · ${item.stage_name}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Clock size={9} style={{ color: 'var(--color-text-3)' }} />
                    <span className="font-mono text-[10px]" style={{ color: 'var(--color-text-3)' }}>
                      {formatTimeAgo(item.updated_at)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
