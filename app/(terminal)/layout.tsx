import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/shell/Sidebar';
import { Topbar } from '@/components/shell/Topbar';
import { createClient } from '@/lib/supabase/server';
import { getRoleFromMetadata } from '@/lib/roles';

export default async function TerminalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const userInfo = {
    name: (user.user_metadata?.name as string | undefined) || user.email?.split('@')[0] || 'User',
    email: user.email,
    role: getRoleFromMetadata(user),
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={userInfo} />
      <div className="flex flex-col flex-1 ml-[220px] min-h-screen overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-8" style={{ background: 'var(--color-bg)' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
