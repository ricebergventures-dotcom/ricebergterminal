'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

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
    const supabase = createClient();
    const { error: authErr } = await supabase.auth.signInWithPassword({ email, password });
    if (authErr) {
      setError(authErr.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#000000' }}>

      {/* Left branding panel */}
      <motion.div
        className="hidden lg:flex flex-col justify-between w-[45%] p-14 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ borderRight: '1px solid #141414' }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 80%, rgba(97,209,220,0.06) 0%, transparent 60%)' }} />

        <div>
          <img src="/logo.png" alt="Riceberg Ventures" style={{ width: '140px', height: 'auto' }} />
        </div>

        <div>
          <p className="text-3xl font-semibold leading-snug mb-4" style={{ color: '#ffffff', fontFamily: 'Manrope, sans-serif' }}>
            The intelligence layer<br />for deep tech investing.
          </p>
          <p className="text-sm" style={{ color: '#444', fontFamily: 'Manrope, sans-serif' }}>
            Private access only. Authorised personnel.
          </p>
        </div>
      </motion.div>

      {/* Right form panel */}
      <div className="flex flex-col justify-center flex-1 px-8 lg:px-20">
        <motion.div
          className="w-full max-w-[380px] mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <img src="/logo.png" alt="Riceberg Ventures" style={{ width: '120px', height: 'auto' }} />
          </div>

          <h2 className="text-2xl font-semibold mb-1" style={{ color: '#ffffff', fontFamily: 'Manrope, sans-serif' }}>
            Sign in
          </h2>
          <p className="text-sm mb-8" style={{ color: '#555', fontFamily: 'Manrope, sans-serif' }}>
            Access the Riceberg Terminal.{' '}
            <Link href="/signup" style={{ color: '#61d1dc' }}>Create account</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: '#666', fontFamily: 'Manrope, sans-serif', letterSpacing: '0.04em' }}>
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

            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: '#666', fontFamily: 'Manrope, sans-serif', letterSpacing: '0.04em' }}>
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
              className="w-full py-3 rounded-lg text-sm font-semibold transition-opacity flex items-center justify-center gap-2 mt-2"
              style={{ background: '#61d1dc', color: '#000000', fontFamily: 'Manrope, sans-serif', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : (<>Continue <ArrowRight size={15} /></>)}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
