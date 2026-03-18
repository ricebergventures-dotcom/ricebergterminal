import { createClient } from '@/lib/supabase/server';
import { hasAccess, getRoleFromMetadata } from '@/lib/roles';

interface RoleGateProps {
  path: string;
  children: React.ReactNode;
}

export async function RoleGate({ path, children }: RoleGateProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const role = getRoleFromMetadata(user);

  if (!user || !hasAccess(role, path)) {
    return (
      <div className="flex flex-col items-start gap-4 p-8 rounded-xl max-w-lg"
        style={{ border: '1px solid var(--color-border-2)', background: 'var(--color-surface)' }}>
        <span className="text-xs tracking-[0.15em] font-medium" style={{ color: 'var(--color-text-3)', fontFamily: 'Manrope, sans-serif' }}>
          ACCESS DENIED
        </span>
        <p className="text-sm" style={{ color: 'var(--color-text-2)', fontFamily: 'Manrope, sans-serif' }}>
          Your role <span style={{ color: 'var(--color-cyan)' }}>{role?.toUpperCase()}</span> does not have permission to access this module.
        </p>
        <p className="text-xs" style={{ color: 'var(--color-text-3)', fontFamily: 'Manrope, sans-serif' }}>
          Contact your GP administrator to request elevated access.
        </p>
        <span className="font-mono text-sm blink-cursor" style={{ color: 'var(--color-cyan)' }}>▋</span>
      </div>
    );
  }

  return <>{children}</>;
}
