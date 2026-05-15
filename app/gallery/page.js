import { createClient } from '@supabase/supabase-js'
import GalleryGrid from '@/components/GalleryGrid'

export const revalidate = 60

async function getImages() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const { data, error } = await supabase.storage
    .from('gallery')
    .list('', { limit: 200, sortBy: { column: 'created_at', order: 'desc' } })

  if (error || !data) return []

  return data
    .filter((f) => f.name !== '.emptyFolderPlaceholder')
    .map((file) => {
      const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(file.name)
      return { name: file.name, url: urlData.publicUrl }
    })
}

export default async function GalleryPage() {
  const images = await getImages()

  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap" rel="stylesheet" />

      <div className="px-8 pt-24 pb-16 max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-stone-400 uppercase mb-3">Our Work</p>
        <h1 className="text-5xl font-light text-stone-900 tracking-tight">Selected Projects</h1>
      </div>

      <GalleryGrid images={images} />
    </main>
  )
}
