'use client'

import { useState, useEffect, useRef } from 'react'

export default function AdminGalleryPage() {
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [lightbox, setLightbox] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => { fetchImages() }, [])

  async function fetchImages() {
    const res = await fetch('/api/gallery/images')
    const data = await res.json()
    if (data.images) setImages(data.images)
  }

  async function handleUpload(files) {
    if (!files?.length) return
    setUploading(true)
    setFeedback(null)

    const formData = new FormData()
    Array.from(files).forEach((f) => formData.append('files', f))

    const res = await fetch('/api/gallery/upload', { method: 'POST', body: formData })
    const data = await res.json()
    setUploading(false)

    if (data.uploaded?.length > 0) {
      setFeedback({ type: 'success', text: `${data.uploaded.length} image(s) uploaded` })
      fetchImages()
    }
    if (data.errors?.length > 0) {
      setFeedback({
        type: 'error',
        text: data.errors.map((e) => `${e.name}: ${e.error}`).join(' · '),
      })
    }
  }

  async function handleDelete(path) {
    if (!confirm('Permanently delete this image?')) return
    const res = await fetch('/api/gallery/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
    })
    if (res.ok) {
      setImages((prev) => prev.filter((img) => img.path !== path))
      setFeedback({ type: 'success', text: 'Image removed' })
      if (lightbox !== null) setLightbox(null)
    }
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[10px] tracking-[0.35em] text-stone-500 uppercase mb-2">Media</p>
          <h1 className="text-4xl font-normal text-stone-100 tracking-wide">Gallery</h1>
        </div>
        <p className="text-stone-600 text-xs tracking-widest">{images.length} images</p>
      </div>

      {feedback && (
        <div className={`mb-5 px-4 py-3 text-xs tracking-widest border ${
          feedback.type === 'success'
            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900'
            : 'bg-red-950/40 text-red-400 border-red-900'
        }`}>
          {feedback.text}
        </div>
      )}

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleUpload(e.dataTransfer.files) }}
        onClick={() => fileInputRef.current?.click()}
        className={`border border-dashed p-16 text-center cursor-pointer transition-all duration-300 mb-8 ${
          dragOver
            ? 'border-stone-400 bg-stone-900'
            : 'border-stone-800 hover:border-stone-600 bg-stone-950'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
        {uploading ? (
          <p className="text-[10px] tracking-[0.4em] text-stone-500 uppercase animate-pulse">
            Uploading...
          </p>
        ) : (
          <>
            <p className="text-[10px] tracking-[0.4em] text-stone-500 uppercase">
              Drop images or click to browse
            </p>
            <p className="text-[9px] text-stone-700 tracking-wide mt-2">
              JPG · PNG · WEBP · Max 10MB
            </p>
          </>
        )}
      </div>

      {/* Grid */}
      {images.length === 0 ? (
        <p className="text-stone-700 text-center py-16 text-xs tracking-widest uppercase">
          No images yet
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {images.map((img, i) => (
            <div
              key={img.path}
              className="group relative aspect-[4/3] bg-stone-900 overflow-hidden cursor-pointer"
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.url}
                alt={img.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(img.path) }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] tracking-widest uppercase bg-red-900/80 text-red-300 px-3 py-1.5 hover:bg-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && images[lightbox] && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-8 text-stone-500 hover:text-white text-[9px] tracking-[0.4em] uppercase"
          >
            Close
          </button>
          {lightbox > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1) }}
              className="absolute left-6 text-stone-600 hover:text-white text-3xl px-4 py-8"
            >
              ‹
            </button>
          )}
          <img
            src={images[lightbox].url}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[85vw] object-contain"
          />
          {lightbox < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1) }}
              className="absolute right-6 text-stone-600 hover:text-white text-3xl px-4 py-8"
            >
              ›
            </button>
          )}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-stone-600 text-[9px] tracking-widest">
            {lightbox + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  )
}
