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
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl"
      onClick={onClose}
    >
      <div className="relative max-w-3xl w-full mx-2 md:mx-4 flex items-center justify-center">
        {/* Botón cerrar - más accesible en móvil */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 md:-top-14 md:-right-2 z-30 p-2 md:p-3 bg-white text-gray-800 hover:bg-gray-100 rounded-full shadow-2xl transition-all duration-200 hover:scale-110 border-2 border-gray-300"
          aria-label="Cerrar vista ampliada"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Contenedor de imagen */}
        <div 
          className="relative bg-white rounded-xl md:rounded-2xl shadow-xl overflow-hidden border border-gray-200 w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header con título si existe */}
          {imageData.title && (
            <div className="px-3 py-2 md:px-6 md:py-4 bg-gradient-to-r from-pink-50 to-purple-50 border-b border-gray-100">
              <h3 className="text-sm md:text-xl font-bold text-gray-800 leading-tight">{imageData.title}</h3>
            </div>
          )}

          {/* Imagen ampliada */}
          <div className="flex items-center justify-center p-2 md:p-6 bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <div className="flex items-center justify-center w-full">
              <PatitasImage
                src={imageData.src}
                fallback={imageData.fallback}
                alt={imageData.alt}
                width={600}
                height={500}
                className="max-w-full max-h-[70vh] md:max-h-[60vh] object-contain rounded-lg shadow-md"
                priority={true}
              />
            </div>
          </div>

          {/* Footer - oculto en móvil para dar más espacio a la imagen */}
          <div className="hidden md:block px-6 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-sm text-gray-600 text-center">
              Haz clic fuera de la imagen o presiona Esc para cerrar
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}