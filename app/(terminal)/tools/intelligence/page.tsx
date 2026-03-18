import { RoleGate } from '@/components/shell/RoleGate';
import { AppEmbed } from '@/components/ui/AppEmbed';

export default function IntelligencePage() {
  return (
    <RoleGate path="/tools/intelligence">
      <AppEmbed
        title="Riceberg Intelligence"
        url="https://riceberg-intelligence.vercel.app/"
        accentColor="#61d1dc"
      />
    </RoleGate>
  );
}
