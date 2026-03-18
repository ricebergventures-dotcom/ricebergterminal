'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error: authErr } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role: 'lp' },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (authErr) {
      setError(authErr.message);
      setLoading(false);
    } else {
      setSuccess('Check your email to confirm your account, then sign in.');
      setLoading(false);
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
          <div className="lg:hidden mb-10">
            <img src="/logo.png" alt="Riceberg Ventures" style={{ width: '120px', height: 'auto' }} />
          </div>

          <h2 className="text-2xl font-semibold mb-1" style={{ color: '#ffffff', fontFamily: 'Manrope, sans-serif' }}>
            Create account
          </h2>
          <p className="text-sm mb-8" style={{ color: '#555', fontFamily: 'Manrope, sans-serif' }}>
            Already have access?{' '}
            <Link href="/login" style={{ color: '#61d1dc' }}>Sign in</Link>
          </p>

          {success ? (
            <div className="p-4 rounded-lg text-sm" style={{ background: '#0d2f33', border: '1px solid #61d1dc', color: '#61d1dc', fontFamily: 'Manrope, sans-serif' }}>
              {success}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: '#666', fontFamily: 'Manrope, sans-serif', letterSpacing: '0.04em' }}>
                  FULL NAME
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  required
                  placeholder="Alex Riceberg"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={{ background: '#0d0d0d', border: `1px solid ${focused === 'name' ? '#61d1dc' : '#1e1e1e'}`, color: '#ffffff', fontFamily: 'Manrope, sans-serif' }}
                />
              </div>
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
                  style={{ background: '#0d0d0d', border: `1px solid ${focused === 'email' ? '#61d1dc' : '#1e1e1e'}`, color: '#ffffff', fontFamily: 'Manrope, sans-serif' }}
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
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={{ background: '#0d0d0d', border: `1px solid ${focused === 'password' ? '#61d1dc' : '#1e1e1e'}`, color: '#ffffff', fontFamily: 'Manrope, sans-serif' }}
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
                {loading ? <Loader2 size={15} className="animate-spin" /> : (<>Create account <ArrowRight size={15} /></>)}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
