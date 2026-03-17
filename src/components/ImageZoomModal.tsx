'use client'

import { useEffect } from 'react'
import PatitasImage from './ui/PatitasImage'

interface ImageZoomModalProps {
  isOpen: boolean
  onClose: () => void
  imageData: {
    src: string
    fallback: string
    alt: string
    title?: string
  }
}

export default function ImageZoomModal({ isOpen, onClose, imageData }: ImageZoomModalProps) {
  // Cerrar con tecla Escape
  useEffect(() => {
    if (!isOpen) return
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden' // Prevenir scroll del background
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-10 p-2 text-white hover:text-gray-300 transition-colors"
          aria-label="Cerrar vista ampliada"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Contenedor de imagen */}
        <div 
          className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()} // Evitar cerrar al hacer clic en la imagen
        >
          {/* Header con título si existe */}
          {imageData.title && (
            <div className="px-6 py-4 bg-gradient-to-r from-pink-50 to-purple-50 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">{imageData.title}</h3>
            </div>
          )}

          {/* Imagen ampliada */}
          <div className="p-6 flex justify-center">
            <div className="relative w-full max-w-2xl aspect-auto">
              <PatitasImage
                src={imageData.src}
                fallback={imageData.fallback}
                alt={imageData.alt}
                width={800}
                height={600}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-lg"
                priority={true}
              />
            </div>
          </div>

          {/* Footer con instrucciones */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-sm text-gray-600 text-center">
              Haz clic fuera de la imagen o presiona Esc para cerrar
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}