import { UserRole } from './users';

export const ROLE_PERMISSIONS: Record<string, UserRole[]> = {
  '/dashboard': ['admin', 'owner', 'lp'],
  '/portfolio': ['admin', 'owner', 'lp'],
  '/analytics': ['admin', 'owner', 'lp'],
  '/lp-portal': ['admin', 'owner', 'lp'],
  '/deal-flow': ['admin', 'owner'],
  '/cap-table': ['admin', 'owner'],
  '/team': ['admin'],
  '/settings': ['admin'],
};

export function hasAccess(role: UserRole, path: string): boolean {
  const allowed = ROLE_PERMISSIONS[path];
  if (!allowed) return true;
  return allowed.includes(role);
}
