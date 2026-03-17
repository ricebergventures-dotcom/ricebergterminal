export const SEED_USERS = [
  { id: '1', email: 'admin@riceberg.vc',   password: 'Admin2024!',  name: 'Alex Riceberg', role: 'admin'  as const },
  { id: '2', email: 'founder@riceberg.vc', password: 'Owner2024!', name: 'Sam Founder',   role: 'owner'  as const },
  { id: '3', email: 'lp1@example.com',     password: 'LP2024!',    name: 'Jordan Miles',  role: 'lp'     as const },
  { id: '4', email: 'lp2@example.com',     password: 'LP2024!',    name: 'Taylor Reed',   role: 'lp'     as const },
];

export type UserRole = 'admin' | 'owner' | 'lp';
