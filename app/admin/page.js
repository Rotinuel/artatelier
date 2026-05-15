'use client'

import { useEffect, useState } from 'react'

const LABELS = {
  blog_posts:   'Blog Posts',
  projects:     'Projects',
  team_members: 'Team Members',
  testimonials: 'Testimonials',
  services:     'Services',
  gallery:      'Gallery Images',
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [activity, setActivity] = useState([])

  useEffect(() => {
    fetch('/api/admin/stats').then((r) => r.json()).then(setStats)
    fetch('/api/admin/activity')
      .then((r) => r.json())
      .then((d) => setActivity(d.activity || []))
  }, [])

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.35em] text-stone-500 uppercase mb-2">Overview</p>
        <h1 className="text-4xl font-normal text-stone-100 tracking-wide">Dashboard</h1>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {Object.entries(LABELS).map(([key, label]) => (
          <div key={key} className="bg-stone-900 border border-stone-800 p-6">
            <p className="text-[9px] tracking-[0.35em] text-stone-500 uppercase mb-3">{label}</p>
            <p className="text-4xl font-normal text-stone-100">
              {stats ? (stats[key] ?? 0) : '—'}
            </p>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="bg-stone-900 border border-stone-800">
        <div className="px-6 py-4 border-b border-stone-800">
          <p className="text-[9px] tracking-[0.35em] text-stone-500 uppercase">Recent Activity</p>
        </div>
        <div className="divide-y divide-stone-800/60">
          {activity.length === 0 ? (
            <p className="px-6 py-12 text-stone-700 text-xs text-center tracking-widest uppercase">
              No recent activity
            </p>
          ) : (
            activity.map((item, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between group">
                <div>
                  <p className="text-sm text-stone-300">{item.title}</p>
                  <p className="text-[9px] tracking-widest text-stone-600 uppercase mt-0.5">
                    {item.section}
                  </p>
                </div>
                <p className="text-[9px] text-stone-700">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
