import { getAdminClient } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export async function DELETE(req) {
  const { path } = await req.json()

  if (!path) {
    return NextResponse.json({ error: 'No path provided' }, { status: 400 })
  }

  const supabase = getAdminClient()
  const { error } = await supabase.storage.from('gallery').remove([path])

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
