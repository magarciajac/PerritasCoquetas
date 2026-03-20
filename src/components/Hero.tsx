'use client'

import { Button } from './ui/Button'
import Image from 'next/image'

export default function Hero() {

  const handleWhatsAppClick = () => {
    const phoneNumber = '526143663694' // Número de WhatsApp configurado
    const message = 'Hola! Me interesa crear un collar personalizado para mi mascota'
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  const handleDesignClick = () => {
    const customizerSection = document.getElementById('personalizar')
    if (customizerSection) {
      const headerOffset = 100 // Compensar header sticky + margen extra
      const elementPosition = customizerSection.offsetTop
      const offsetPosition = elementPosition - headerOffset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section 
      id="inicio" 
      className="relative bg-gradient-to-br from-stone-50 to-orange-50/30 pt-8 pb-24 min-h-[80vh] flex items-center overflow-hidden"
    >
      {/* Franja rosa de portada que se extiende por toda la pantalla */}
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-r from-pink-100 via-pink-200 to-pink-100 shadow-lg"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-7">
          
          {/* Logo Central en la franja rosa */}
          <div className="flex justify-center pt-7 pb-4">
            <div className="relative transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-pink-300/50">
                <Image
                  src="/images/logo/Logo.jpg"
                  alt="PatitasCoquetas - Collares Personalizados"
                  width={380}
                  height={285}
                  className="object-contain rounded-xl"
                  priority
                />
              </div>
              {/* Decoraciones elegantes */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-pink-300/60 rounded-full blur-sm"></div>
              <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-orange-300/60 rounded-full blur-sm"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-yellow-300/60 rounded-full blur-sm"></div>
              <div className="absolute top-1/4 -right-8 w-6 h-6 bg-purple-300/60 rounded-full blur-sm"></div>
            </div>
          </div>

          {/* Main Title */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-700">
                Collares Personalizados para Perros,
              </h2>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-orange-300">
                Diseñados con Amor
              </h3>
            </div>
            <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto font-light text-gray-600">
              Crea un diseño único para tu mascota amada con colores 
              personalizados, dijes cuidadosamente seleccionados y letras 
              personalizadas. Cada collar está hecho para reflejar la personalidad 
              única de tu mascota.
            </p>
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={handleDesignClick}
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 text-lg font-light rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Diseña el Tuyo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}