import { getAdminClient } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = getAdminClient()

  const [blog, projects, team, testimonials, services, gallery] = await Promise.all([
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('team_members').select('*', { count: 'exact', head: true }),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.storage.from('gallery').list('', { limit: 1000 }),
  ])

  const galleryCount = (gallery.data || []).filter(
    (f) => f.name !== '.emptyFolderPlaceholder'
  ).length

  return NextResponse.json({
    blog_posts:   blog.count ?? 0,
    projects:     projects.count ?? 0,
    team_members: team.count ?? 0,
    testimonials: testimonials.count ?? 0,
    services:     services.count ?? 0,
    gallery:      galleryCount,
  })
}
