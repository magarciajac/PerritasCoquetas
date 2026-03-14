'use client'

import PatitasImage from './ui/PatitasImage'
import { getImageSrc } from '@/lib/images'
import { baseDesigns } from '@/lib/baseDesigns'

export default function FeaturedDesigns() {
  return (
    <section id="disenos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-6">
            Diseños Destacados
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Explora nuestra colección seleccionada de collares personalizados. Cada pieza 
            cuenta una historia única.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {baseDesigns.map((design) => {
            const { src, fallback, alt } = getImageSrc('featured', design.imageKey)
            
            return (
              <div key={design.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 to-stone-100 aspect-square flex items-center justify-center hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                  {/* Imagen o fallback */}
                  <PatitasImage
                    src={src}
                    fallback={fallback}
                    alt={alt}
                    width={500}
                    height={500}
                    className="w-full h-full object-contain p-4"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  
                  {/* Description overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <p className="text-sm text-gray-700 font-light">
                      {design.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-500 font-light mb-6">
            ¿No encuentras el diseño perfecto?
          </p>
          <button 
            onClick={() => {
              const customizerSection = document.getElementById('personalizar')
              if (customizerSection) {
                customizerSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="inline-flex items-center px-6 py-3 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-colors font-light"
          >
            ✨ Crea tu propio diseño
          </button>
        </div>
      </div>
    </section>
  )
}