import { getAdminClient } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = getAdminClient()

  const { data, error } = await supabase.storage
    .from('gallery')
    .list('', { limit: 200, sortBy: { column: 'created_at', order: 'desc' } })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const images = data
    .filter((f) => f.name !== '.emptyFolderPlaceholder')
    .map((file) => {
      const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(file.name)
      return { name: file.name, path: file.name, url: urlData.publicUrl, createdAt: file.created_at }
    })

  return NextResponse.json({ images })
}
