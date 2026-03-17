'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError('! INVALID CREDENTIALS');
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--color-bg)' }}>

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />

      {/* Horizon line */}
      <div className="absolute w-full h-px" style={{ bottom: '33%', background: 'var(--color-border)' }} />

      {/* Iceberg SVG */}
      <motion.div
        className="absolute"
        style={{ bottom: '28%', left: '50%', transform: 'translateX(-50%)' }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 0.12 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg width="320" height="200" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="160,0 200,70 240,60 280,140 220,130 200,160 160,100 120,160 100,130 40,140 80,60 120,70" fill="var(--color-gold)" />
          <polygon points="160,100 120,160 100,130 40,140 80,200 240,200 280,140 220,130 200,160" fill="var(--color-gold-dim)" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Login card */}
      <motion.div
        className="relative z-10 w-full max-w-sm mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="p-8 rounded-lg border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl mb-1" style={{ color: 'var(--color-text-1)' }}>RICEBERG</h1>
            <p className="font-mono text-xs tracking-[0.2em]" style={{ color: 'var(--color-gold)', letterSpacing: '0.2em' }}>
              TERMINAL · PRIVATE ACCESS
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-xs mb-1.5" style={{ color: 'var(--color-text-3)', letterSpacing: '0.1em' }}>EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded font-mono text-sm outline-none transition-colors"
                style={{
                  background: 'var(--color-surface-3)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-1)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>
            <div>
              <label className="block font-mono text-xs mb-1.5" style={{ color: 'var(--color-text-3)', letterSpacing: '0.1em' }}>PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded font-mono text-sm outline-none transition-colors"
                style={{
                  background: 'var(--color-surface-3)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-1)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>

            {error && (
              <p className="font-mono text-xs" style={{ color: 'var(--color-danger)' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded font-mono text-xs tracking-[0.15em] transition-all mt-2 flex items-center justify-center gap-2"
              style={{
                background: 'transparent',
                border: '1px solid var(--color-gold)',
                color: 'var(--color-gold)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-gold-dim)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : null}
              [ AUTHENTICATE ]
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-3 rounded" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
            <p className="font-mono text-xs mb-2" style={{ color: 'var(--color-text-3)', letterSpacing: '0.1em' }}>DEMO CREDENTIALS</p>
            <div className="space-y-1">
              {[
                { email: 'admin@riceberg.vc', pass: 'Admin2024!', role: 'ADMIN' },
                { email: 'founder@riceberg.vc', pass: 'Owner2024!', role: 'OWNER' },
                { email: 'lp1@example.com', pass: 'LP2024!', role: 'LP' },
              ].map(c => (
                <div key={c.email} className="flex gap-2 items-center font-mono text-xs cursor-pointer"
                  onClick={() => { setEmail(c.email); setPassword(c.pass); }}
                  style={{ color: 'var(--color-text-2)' }}
                >
                  <span style={{ color: 'var(--color-gold)' }}>[{c.role}]</span>
                  <span>{c.email}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
