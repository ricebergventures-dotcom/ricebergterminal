export type UserRole = 'admin' | 'owner' | 'lp';

export const ROLE_PERMISSIONS: Record<string, UserRole[]> = {
  '/dashboard':              ['admin', 'owner', 'lp'],
  '/portfolio':              ['admin', 'owner', 'lp'],
  '/analytics':              ['admin', 'owner', 'lp'],
  '/lp-portal':              ['admin', 'owner', 'lp'],
  '/deal-flow':              ['admin', 'owner'],
  '/cap-table':              ['admin', 'owner'],
  '/team':                   ['admin'],
  '/settings':               ['admin'],
  '/tools/intelligence':     ['admin', 'owner', 'lp'],
  '/tools/lp-dashboard':     ['admin', 'owner', 'lp'],
  '/tools/radar':            ['admin', 'owner'],
  '/tools/pitchperfect':     ['admin', 'owner'],
};

export function hasAccess(role: UserRole, path: string): boolean {
  const allowed = ROLE_PERMISSIONS[path];
  if (!allowed) return true;
  return allowed.includes(role);
}

export function getRoleFromMetadata(
  user: { user_metadata?: Record<string, unknown> } | null,
): UserRole {
  const role = user?.user_metadata?.role as string | undefined;
  if (role === 'admin' || role === 'owner') return role;
  return 'lp';
}
