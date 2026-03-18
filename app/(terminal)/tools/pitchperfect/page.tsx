import { RoleGate } from '@/components/shell/RoleGate';
import { AppEmbed } from '@/components/ui/AppEmbed';

export default function PitchPerfectPage() {
  return (
    <RoleGate path="/tools/pitchperfect">
      <AppEmbed
        title="PitchPerfect"
        url="https://pitchperfect-eta.vercel.app/"
        accentColor="#fb7185"
      />
    </RoleGate>
  );
}
