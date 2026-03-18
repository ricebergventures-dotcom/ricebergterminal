import { RoleGate } from '@/components/shell/RoleGate';
import { AppEmbed } from '@/components/ui/AppEmbed';

export default function RadarPage() {
  return (
    <RoleGate path="/tools/radar">
      <AppEmbed
        title="DeepTech Radar"
        url="https://deeptech-radar.vercel.app/"
        accentColor="#a78bfa"
      />
    </RoleGate>
  );
}
