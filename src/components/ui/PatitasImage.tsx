'use client'

import Image from 'next/image'
import { useState } from 'react'

interface PatitasImageProps {
  src: string
  fallback: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export default function PatitasImage({ 
  src, 
  fallback, 
  alt, 
  width = 400, 
  height = 400, 
  className = '', 
  priority = false,
  sizes
}: PatitasImageProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Si no hay src o hubo error, mostrar fallback
  if (!src || imageError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gradient-to-br from-stone-100 to-orange-50 ${className}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <span 
          className="text-6xl opacity-80"
          role="img"
          aria-label={alt}
        >
          {fallback}
        </span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width: `${width}px`, height: `${height}px` }}>
      {/* Fallback mientras carga */}
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-100 to-orange-50">
          <span 
            className="text-6xl opacity-80"
            role="img"
            aria-label={alt}
          >
            {fallback}
          </span>
        </div>
      )}
      
      {/* Imagen real */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={`transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}

// Componente específico para texturas de materiales  
export function MaterialTexture({ 
  material, 
  className = '',
  size = 'md' 
}: { 
  material: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizes = {
    sm: { width: 60, height: 40 },
    md: { width: 96, height: 64 }, 
    lg: { width: 120, height: 80 }
  }
  
  const { width, height } = sizes[size]
  
  // Mapeo de materiales a emojis (no cargar imágenes)
  const materialImages = {
    dorado: { src: '', fallback: '🥇' },
    rosa: { src: '', fallback: '🌸' },
    plata: { src: '', fallback: '⚡' },
    negro: { src: '', fallback: '🖤' }
  }
  
  const imageData = materialImages[material as keyof typeof materialImages] || 
                   { src: '', fallback: '📱' }
  
  return (
    <PatitasImage
      src={imageData.src}
      fallback={imageData.fallback}
      alt={`Textura de material ${material}`}
      width={width}
      height={height}
      className={`rounded-lg border-2 border-gray-200 ${className}`}
    />
  )
}