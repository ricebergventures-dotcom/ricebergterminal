import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/shell/Sidebar';
import { Topbar } from '@/components/shell/Topbar';

export default async function TerminalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const user = {
    name: session.user.name,
    email: session.user.email,
    role: (session.user as { role: string }).role,
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={user} />
      <div className="flex flex-col flex-1 ml-[220px] min-h-screen overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-8" style={{ background: 'var(--color-bg)' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
