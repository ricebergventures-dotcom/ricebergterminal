'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match'); return; }
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error: updateErr } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateErr) {
      setError(updateErr.message);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#000000' }}>
      <motion.div
        className="w-full max-w-[380px] px-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/logo.png" alt="Riceberg Ventures" style={{ width: '120px', height: 'auto', marginBottom: '2rem' }} />

        <h2 className="text-2xl font-semibold mb-1" style={{ color: '#ffffff', fontFamily: 'Manrope, sans-serif' }}>
          Set new password
        </h2>
        <p className="text-sm mb-8" style={{ color: '#555', fontFamily: 'Manrope, sans-serif' }}>
          Choose a strong password for your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { id: 'password', label: 'NEW PASSWORD', value: password, onChange: setPassword, placeholder: 'Min. 8 characters' },
            { id: 'confirm', label: 'CONFIRM PASSWORD', value: confirm, onChange: setConfirm, placeholder: '••••••••' },
          ].map(field => (
            <div key={field.id}>
              <label className="block text-xs font-medium mb-2" style={{ color: '#666', fontFamily: 'Manrope, sans-serif', letterSpacing: '0.04em' }}>
                {field.label}
              </label>
              <input
                type="password"
                value={field.value}
                onChange={e => field.onChange(e.target.value)}
                onFocus={() => setFocused(field.id)}
                onBlur={() => setFocused(null)}
                required
                minLength={8}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                style={{ background: '#0d0d0d', border: `1px solid ${focused === field.id ? '#61d1dc' : '#1e1e1e'}`, color: '#ffffff', fontFamily: 'Manrope, sans-serif' }}
              />
            </div>
          ))}
          {error && <p className="text-sm" style={{ color: '#F87171', fontFamily: 'Manrope, sans-serif' }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-sm font-semibold transition-opacity flex items-center justify-center gap-2"
            style={{ background: '#61d1dc', color: '#000000', fontFamily: 'Manrope, sans-serif', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? <Loader2 size={15} className="animate-spin" /> : (<>Update password <ArrowRight size={15} /></>)}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
