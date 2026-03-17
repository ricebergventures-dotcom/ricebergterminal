import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Riceberg Terminal',
  description: 'Private internal platform — Riceberg Ventures',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
