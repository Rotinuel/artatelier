'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getBrowserClient } from '@/lib/supabase-admin'
import Sidebar from '@/components/admin/Sidebar'

export default function AdminLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const supabase = getBrowserClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/admin-login')
      } else {
        setChecking(false)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace('/admin-login')
    })

    return () => subscription.unsubscribe()
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <p className="text-stone-600 text-[10px] tracking-[0.4em] uppercase animate-pulse">
          Loading...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-950 flex" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap" rel="stylesheet" />
      <Sidebar pathname={pathname} />
      <main className="flex-1 ml-60 p-10 overflow-auto">{children}</main>
    </div>
  )
}
