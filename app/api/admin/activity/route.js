import { getAdminClient } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = getAdminClient()

  const [blog, projects, team, testimonials, services] = await Promise.all([
    supabase.from('blog_posts').select('title, created_at').order('created_at', { ascending: false }).limit(3),
    supabase.from('projects').select('title, created_at').order('created_at', { ascending: false }).limit(3),
    supabase.from('team_members').select('name, created_at').order('created_at', { ascending: false }).limit(2),
    supabase.from('testimonials').select('author, created_at').order('created_at', { ascending: false }).limit(2),
    supabase.from('services').select('title, created_at').order('created_at', { ascending: false }).limit(2),
  ])

  const activity = [
    ...(blog.data || []).map((r) => ({ title: r.title, section: 'Blog Post', created_at: r.created_at })),
    ...(projects.data || []).map((r) => ({ title: r.title, section: 'Project', created_at: r.created_at })),
    ...(team.data || []).map((r) => ({ title: r.name, section: 'Team Member', created_at: r.created_at })),
    ...(testimonials.data || []).map((r) => ({ title: r.author, section: 'Testimonial', created_at: r.created_at })),
    ...(services.data || []).map((r) => ({ title: r.title, section: 'Service', created_at: r.created_at })),
  ]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 10)

  return NextResponse.json({ activity })
}
