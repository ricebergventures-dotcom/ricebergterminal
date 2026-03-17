'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await signIn('credentials', { email, password, redirect: false });
    if (res?.error) {
      setError('Invalid email or password.');
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#000000' }}>

      {/* Left panel — branding */}
      <motion.div
        className="hidden lg:flex flex-col justify-between w-[45%] p-14 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ borderRight: '1px solid #141414' }}
      >
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 80%, rgba(97,209,220,0.06) 0%, transparent 60%)' }} />

        {/* Logo */}
        <div>
          <Image src="/logo.png" alt="Riceberg Ventures" width={160} height={40} className="object-contain" />
        </div>

        {/* Bottom tagline */}
        <div>
          <p className="text-3xl font-semibold leading-snug mb-4" style={{ color: '#ffffff', fontFamily: 'Manrope, sans-serif' }}>
            The intelligence layer<br />for deep tech investing.
          </p>
          <p className="text-sm" style={{ color: '#555', fontFamily: 'Manrope, sans-serif' }}>
            Private access only. Authorised personnel.
          </p>
        </div>
      </motion.div>

      {/* Right panel — form */}
      <div className="flex flex-col justify-center flex-1 px-8 lg:px-20">
        <motion.div
          className="w-full max-w-[380px] mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <Image src="/logo.png" alt="Riceberg Ventures" width={140} height={35} className="object-contain" />
          </div>

          <h2 className="text-2xl font-semibold mb-1" style={{ color: '#ffffff', fontFamily: 'Manrope, sans-serif' }}>
            Sign in
          </h2>
          <p className="text-sm mb-8" style={{ color: '#555', fontFamily: 'Manrope, sans-serif' }}>
            Access the Riceberg Terminal
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: '#888', fontFamily: 'Manrope, sans-serif', letterSpacing: '0.04em' }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                required
                autoComplete="email"
                placeholder="you@riceberg.vc"
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                style={{
                  background: '#0d0d0d',
                  border: `1px solid ${focused === 'email' ? '#61d1dc' : '#1e1e1e'}`,
                  color: '#ffffff',
                  fontFamily: 'Manrope, sans-serif',
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: '#888', fontFamily: 'Manrope, sans-serif', letterSpacing: '0.04em' }}>
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                style={{
                  background: '#0d0d0d',
                  border: `1px solid ${focused === 'password' ? '#61d1dc' : '#1e1e1e'}`,
                  color: '#ffffff',
                  fontFamily: 'Manrope, sans-serif',
                }}
              />
            </div>

            {error && (
              <p className="text-sm" style={{ color: '#F87171', fontFamily: 'Manrope, sans-serif' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 mt-2"
              style={{
                background: '#61d1dc',
                color: '#000000',
                fontFamily: 'Manrope, sans-serif',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : (
                <>
                  Continue
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-8 pt-6" style={{ borderTop: '1px solid #141414' }}>
            <p className="text-xs mb-3" style={{ color: '#444', fontFamily: 'Manrope, sans-serif' }}>DEMO ACCESS</p>
            <div className="space-y-2">
              {[
                { email: 'admin@riceberg.vc', pass: 'Admin2024!', label: 'Admin', role: 'Full access' },
                { email: 'founder@riceberg.vc', pass: 'Owner2024!', label: 'GP', role: 'Owner access' },
                { email: 'lp1@example.com', pass: 'LP2024!', label: 'LP', role: 'Limited access' },
              ].map(c => (
                <button
                  key={c.email}
                  type="button"
                  onClick={() => { setEmail(c.email); setPassword(c.pass); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all text-left"
                  style={{
                    background: '#0a0a0a',
                    border: '1px solid #1a1a1a',
                    fontFamily: 'Manrope, sans-serif',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#2a2a2a')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#1a1a1a')}
                >
                  <span style={{ color: '#666' }}>{c.email}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: '#141414', color: '#61d1dc' }}>{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
