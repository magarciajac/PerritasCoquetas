'use client'

import { useState } from 'react'
import PatitasImage from './ui/PatitasImage'
import { getImageSrc } from '@/lib/images'
import { baseDesigns } from '@/lib/baseDesigns'

export default function FeaturedDesigns() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? baseDesigns.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === baseDesigns.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const currentDesign = baseDesigns[currentIndex]
  const { src, fallback, alt } = getImageSrc('featured', currentDesign.imageKey)

  return (
    <section id="disenos" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-3">
            Diseños Destacados
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Explora nuestra colección seleccionada de collares personalizados. Cada pieza 
            cuenta una historia única.
          </p>
        </div>
        
        {/* Carrusel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 to-stone-100 aspect-[4/3] flex items-center justify-center shadow-xl">
            {/* Imagen principal */}
            <div className="w-full h-full relative">
              <PatitasImage
                src={src}
                fallback={fallback}
                alt={alt}
                width={800}
                height={600}
                className="w-full h-full object-contain p-8"
              />
              
              {/* Descripción overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {currentDesign.name}
                </h3>
                <p className="text-gray-600 font-light">
                  {currentDesign.description}
                </p>
              </div>
            </div>

            {/* Botón anterior */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Botón siguiente */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Indicadores (bolitas) */}
          <div className="flex justify-center items-center mt-4 space-x-4">
            {baseDesigns.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`flex items-center justify-center transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 h-8 bg-orange-500 text-white rounded-full shadow-lg font-semibold text-sm'
                    : 'w-6 h-6 bg-gray-300 hover:bg-gray-400 rounded-full'
                }`}
              >
                {index === currentIndex && (index + 1)}
              </button>
            ))}
          </div>

          {/* Contador */}
          <div className="text-center mt-2">
            <span className="text-sm text-gray-500 font-medium">
              {currentIndex + 1} de {baseDesigns.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}