import { RoleGate } from '@/components/shell/RoleGate';
import { CapTableClient } from './CapTableClient';

export default function CapTablePage() {
  return (
    <RoleGate path="/cap-table">
      <CapTableClient />
    </RoleGate>
  );
}
