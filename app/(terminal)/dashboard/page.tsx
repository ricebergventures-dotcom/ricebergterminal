import { auth } from '@/lib/auth';
import { StatCard } from '@/components/ui/StatCard';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ActivityFeed } from '@/components/ui/ActivityFeed';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ACTIVITY_FEED } from '@/lib/mock-data';

const PROJECT_CARDS = [
  {
    number: '01',
    title: 'Riceberg Intelligence',
    description: 'AI-powered research and market intelligence for deep tech investing.',
    tags: ['AI Research', 'Market Intel'],
    href: 'https://riceberg-intelligence.vercel.app/',
    external: true,
  },
  {
    number: '02',
    title: 'DeepTech Radar',
    description: 'Live deal flow tracker — scrapes 14 sources daily for early-stage signals.',
    tags: ['Deal Flow', 'Gemini AI', 'Daily'],
    href: 'https://deeptech-radar.vercel.app/',
    external: true,
  },
  {
    number: '03',
    title: 'PitchPerfect',
    description: 'AI pitch deck analysis and scoring for inbound deal evaluation.',
    tags: ['Pitch Analysis', 'AI Scoring'],
    href: 'https://pitchperfect-eta.vercel.app/',
    external: true,
  },
  {
    number: '04',
    title: 'LP Dashboard',
    description: 'Limited partner portal for capital accounts, reports, and updates.',
    tags: ['LP Access', 'Documents'],
    href: 'https://lp-dashboard-r21f.vercel.app/',
    external: true,
  },
];

export default async function DashboardPage() {
  const session = await auth();
  const firstName = session?.user?.name?.split(' ')[0] || 'there';
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-display text-[26px] mb-1" style={{ color: 'var(--color-text-1)' }}>
          {greeting}, {firstName}
        </h1>
        <p className="font-mono text-xs" style={{ color: 'var(--color-text-3)' }}>{dateStr}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="AUM" value="$47M" numericValue={47} prefix="$" suffix="M" delta="+12% YoY" deltaType="positive" />
        <StatCard label="Dry Powder" value="$8.3M" numericValue={8.3} prefix="$" suffix="M" />
        <StatCard label="Portfolio Cos." value="11" numericValue={11} delta="Active" deltaType="neutral" />
        <StatCard label="Net IRR" value="28%" numericValue={28} suffix="%" delta="+4pp vs vintage" deltaType="positive" />
      </div>

      {/* Two-column below */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity feed */}
        <div className="p-5 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <SectionLabel>Recent Activity</SectionLabel>
          <ActivityFeed items={ACTIVITY_FEED} />
        </div>

        {/* Project cards */}
        <div>
          <SectionLabel>Project Tools</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROJECT_CARDS.map(card => (
              <ProjectCard key={card.number} {...card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
