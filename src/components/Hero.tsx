'use client'

import { Button } from './ui/Button'

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
      customizerSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="inicio" 
      className="relative bg-gradient-to-br from-stone-50 to-orange-50/30 py-24 md:py-32 min-h-[80vh] flex items-center overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-12">
          {/* Main Title */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-800">
              <span className="text-orange-300">✨</span> PatitasCoquetas <span className="text-orange-300">✨</span>
            </h1>
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
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleWhatsAppClick}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-light rounded-full"
            >
              🔍 Mensaje por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}