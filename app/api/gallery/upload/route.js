import { getAdminClient } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req) {
  const cookieStore = cookies()
  const supabase = getAdminClient()

  // Verify session via cookie
  const { data: { user } } = await supabase.auth.getUser(
    cookieStore.get('sb-access-token')?.value
  )

  const formData = await req.formData()
  const files = formData.getAll('files')

  if (!files || files.length === 0) {
    return NextResponse.json({ error: 'No files provided' }, { status: 400 })
  }

  const results = []
  const errors = []

  for (const file of files) {
    if (!file.type.startsWith('image/')) {
      errors.push({ name: file.name, error: 'Not an image' })
      continue
    }
    if (file.size > 10 * 1024 * 1024) {
      errors.push({ name: file.name, error: 'Exceeds 10MB limit' })
      continue
    }

    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())

    const { data, error } = await supabase.storage
      .from('gallery')
      .upload(fileName, buffer, { contentType: file.type, upsert: false })

    if (error) {
      errors.push({ name: file.name, error: error.message })
    } else {
      const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(data.path)
      results.push({ name: file.name, path: data.path, url: urlData.publicUrl })
    }
  }

  return NextResponse.json({ uploaded: results, errors })
}
