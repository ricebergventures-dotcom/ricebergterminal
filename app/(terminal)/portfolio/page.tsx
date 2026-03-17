import { auth } from '@/lib/auth';
import { RoleGate } from '@/components/shell/RoleGate';
import { PORTFOLIO_COMPANIES } from '@/lib/mock-data';
import { PortfolioClient } from './PortfolioClient';

export default async function PortfolioPage() {
  const session = await auth();
  const role = (session?.user as { role: string })?.role;

  return (
    <RoleGate path="/portfolio">
      <div>
        <div className="mb-6">
          <h1 className="font-display text-[26px]" style={{ color: 'var(--color-text-1)' }}>Portfolio Tracker</h1>
          <p className="font-mono text-xs mt-1" style={{ color: 'var(--color-text-3)' }}>
            {PORTFOLIO_COMPANIES.length} companies · Fund I
          </p>
        </div>
        <PortfolioClient companies={PORTFOLIO_COMPANIES} role={role} />
      </div>
    </RoleGate>
  );
}
