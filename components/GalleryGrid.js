'use client'

import { useState } from 'react'

export default function GalleryGrid({ images }) {
  const [lightbox, setLightbox] = useState(null)

  if (images.length === 0) {
    return (
      <div className="text-center py-32 text-stone-300 tracking-widest uppercase text-sm">
        No projects yet
      </div>
    )
  }

  return (
    <>
      <div className="px-8 pb-24 max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((img, i) => (
          <div
            key={img.name}
            onClick={() => setLightbox(i)}
            className="break-inside-avoid cursor-pointer group overflow-hidden bg-stone-100"
          >
            <img
              src={img.url}
              alt={`Project ${i + 1}`}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-8 text-white/60 hover:text-white text-sm tracking-widest uppercase"
          >
            Close
          </button>
          {lightbox > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1) }}
              className="absolute left-6 text-white/60 hover:text-white text-2xl px-4 py-8"
            >
              ‹
            </button>
          )}
          <img
            src={images[lightbox].url}
            alt={`Project ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          {lightbox < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1) }}
              className="absolute right-6 text-white/60 hover:text-white text-2xl px-4 py-8"
            >
              ›
            </button>
          )}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest">
            {lightbox + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  )
}
