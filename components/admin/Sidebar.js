'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getBrowserClient } from '@/lib/supabase-admin'

const NAV = [
  { label: 'Dashboard',    href: '/admin',              icon: '◈' },
  { label: 'Gallery',      href: '/admin/gallery',      icon: '◫' },
  { label: 'Projects',     href: '/admin/projects',     icon: '◧' },
  { label: 'Blog',         href: '/admin/blog',         icon: '◪' },
  { label: 'Team',         href: '/admin/team',         icon: '◉' },
  { label: 'Testimonials', href: '/admin/testimonials', icon: '◎' },
  { label: 'Services',     href: '/admin/services',     icon: '◌' },
]

export default function Sidebar({ pathname }) {
  const router = useRouter()

  async function handleLogout() {
    const supabase = getBrowserClient()
    await supabase.auth.signOut()
    router.push('/admin-login')
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-stone-950 border-r border-stone-900 flex flex-col z-40">
      {/* Brand */}
      <div className="px-7 py-8 border-b border-stone-900">
        <p className="text-[9px] tracking-[0.4em] text-stone-600 uppercase mb-1">Studio Admin</p>
        <p className="text-stone-200 text-xl tracking-wide font-normal">Portal</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
        {NAV.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-200 ${
                active
                  ? 'bg-stone-100 text-stone-900'
                  : 'text-stone-500 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <span className={`text-base ${active ? 'text-stone-700' : ''}`}>{item.icon}</span>
              <span className="text-[10px] tracking-[0.25em] uppercase">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-7 py-6 border-t border-stone-900">
        <button
          onClick={handleLogout}
          className="text-[9px] tracking-[0.3em] uppercase text-stone-700 hover:text-red-400 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}
