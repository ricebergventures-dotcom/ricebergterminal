import { RoleGate } from '@/components/shell/RoleGate';
import { AppEmbed } from '@/components/ui/AppEmbed';

export default function LPDashboardPage() {
  return (
    <RoleGate path="/tools/lp-dashboard">
      <AppEmbed
        title="LP Dashboard"
        url="https://lp-dashboard-r21f.vercel.app/"
        accentColor="#4ade80"
      />
    </RoleGate>
  );
}
