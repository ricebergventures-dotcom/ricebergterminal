import { createClient } from '@/lib/supabase/server';
import { getRoleFromMetadata } from '@/lib/roles';
import { RoleGate } from '@/components/shell/RoleGate';
import { getPortfolioCompaniesWithDetails } from '@/lib/decile-hub';
import { PortfolioClient } from './PortfolioClient';

export default async function PortfolioPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const role = getRoleFromMetadata(user);

  const companies = await getPortfolioCompaniesWithDetails().catch(() => []);

  return (
    <RoleGate path="/portfolio">
      <div>
        <div className="mb-6">
          <h1 className="font-display text-[26px]" style={{ color: 'var(--color-text-1)' }}>Portfolio Tracker</h1>
          <p className="font-mono text-xs mt-1" style={{ color: 'var(--color-text-3)' }}>
            {companies.length} companies · Fund I
          </p>
        </div>
        <PortfolioClient companies={companies} role={role} />
      </div>
    </RoleGate>
  );
}
