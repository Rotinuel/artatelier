'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getBrowserClient } from '@/lib/supabase-admin'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setError(null)
    const supabase = getBrowserClient()

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div
      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
      className="min-h-screen bg-stone-950 flex items-center justify-center px-4 relative overflow-hidden"
    >
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap" rel="stylesheet" />

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(#d6d3d1 1px, transparent 1px), linear-gradient(90deg, #d6d3d1 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-stone-700" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-stone-700" />

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="w-12 h-px bg-stone-600 mx-auto mb-3" />
            <p className="text-[10px] tracking-[0.5em] text-stone-500 uppercase">Architecture Studio</p>
            <div className="w-12 h-px bg-stone-600 mx-auto mt-3" />
          </div>
          <h1 className="text-4xl font-normal text-stone-100 tracking-wide">Admin Portal</h1>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-[10px] tracking-[0.3em] text-stone-500 uppercase mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-500 transition-colors placeholder-stone-700"
              placeholder="admin@studio.com"
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.3em] text-stone-500 uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full bg-transparent border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-stone-500 transition-colors placeholder-stone-700"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 text-xs tracking-wide">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-2 bg-stone-100 text-stone-900 py-3.5 text-[10px] tracking-[0.4em] uppercase font-medium hover:bg-white transition-colors disabled:opacity-40"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  )
}
