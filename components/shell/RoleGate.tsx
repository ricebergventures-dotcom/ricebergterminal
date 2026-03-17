import { auth } from '@/lib/auth';
import { hasAccess } from '@/lib/roles';
import { UserRole } from '@/lib/users';

interface RoleGateProps {
  path: string;
  children: React.ReactNode;
}

export async function RoleGate({ path, children }: RoleGateProps) {
  const session = await auth();
  const role = (session?.user as { role: string })?.role as UserRole;

  if (!role || !hasAccess(role, path)) {
    return (
      <div className="flex flex-col items-start gap-4 p-8 rounded-lg max-w-lg"
        style={{ border: '1px solid var(--color-border-2)', background: 'var(--color-surface)' }}>
        <span className="font-mono text-xs tracking-[0.15em]" style={{ color: 'var(--color-text-3)' }}>ACCESS DENIED</span>
        <p className="font-mono text-sm" style={{ color: 'var(--color-text-2)' }}>
          Your role <span style={{ color: 'var(--color-gold)' }}>[ {role?.toUpperCase() || 'UNKNOWN'} ]</span> does not have permission to access this module.
        </p>
        <p className="font-mono text-xs" style={{ color: 'var(--color-text-3)' }}>
          Contact your GP administrator to request elevated access.
        </p>
        <span className="font-mono text-sm blink-cursor" style={{ color: 'var(--color-gold)' }}>▋</span>
      </div>
    );
  }

  return <>{children}</>;
}
