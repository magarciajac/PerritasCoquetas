'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/526144620906?text=Hola! Me gustaría obtener más información sobre PatitasCoquetas', '_blank')
  }

  return (
    <footer className="bg-stone-100 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-light text-gray-800">
              ✨ PatitasCoquetas ✨
            </h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Accesorios personalizados para mascotas hechos con amor. 
              Celebrando la personalidad única de cada peludo especial.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-light text-gray-800">Contáctanos</h4>
            <div className="space-y-2 text-gray-600 font-light">
              <p> WhatsApp: +52 614 462 0906</p>
              <p>📍 Chihuahua, Chih.</p>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="space-y-4">
            <h4 className="text-lg font-light text-gray-800">¿Necesitas ayuda?</h4>
            <p className="text-gray-600 font-light">
              Estamos aquí para hacer realidad el collar perfecto para tu mascota
            </p>
            <button 
              onClick={handleWhatsAppClick}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-light"
            >
              💬 Chatea con Nosotras
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-stone-200 mt-12 pt-8 text-center">
          <p className="text-gray-500 font-light">
            &copy; {currentYear} PatitasCoquetas. Accesorios personalizados para mascotas hechos con amor.
          </p>
          <p className="text-gray-400 font-light mt-2 text-sm">
            Síguenos en Instagram @patitascoquetas para inspiración e historias de clientes
          </p>
        </div>
      </div>
    </footer>
  )
}