'use client'

import { Button } from './ui/Button'

export default function BorderTypes() {
  const borderTypes = [
    { id: 1, title: 'Bordado Sencillo', description: '2 colores incluidos' },
    { id: 2, title: 'Bordado Premium', description: '3+ colores disponibles' },
    { id: 3, title: 'Bordado Especial', description: 'Diseños únicos' },
    { id: 4, title: 'Bordado Deluxe', description: 'Máximo detalle' }
  ]

  const handleWhatsAppContact = (borderType: string) => {
    const phoneNumber = '5261444620906'
    const message = `Hola! Me interesa el ${borderType}. ¿Podrían mostrarme ejemplos y precios?`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section id="tipos-bordado" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-stone-800 mb-6" 
              style={{ color: '#E91E63', fontWeight: 'bold' }}>
            Escoge tu tipo de bordado
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Diferentes estilos de bordado para que encuentres el perfecto para tu mascota
          </p>
        </div>

        {/* Border Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {borderTypes.map((borderType) => (
            <div 
              key={borderType.id}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
            >
              {/* Image Placeholder */}
              <div className="relative mb-6">
                <div className="w-full h-48 bg-gradient-to-br from-stone-100 to-stone-200 rounded-2xl flex items-center justify-center border-2 border-dashed border-stone-300 group-hover:border-orange-300 transition-colors">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-stone-300 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-stone-500">
                      Foto de muestra
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-stone-800 mb-2">
                  {borderType.title}
                </h3>
                <p className="text-stone-600 mb-4">
                  {borderType.description}
                </p>
                <Button
                  onClick={() => handleWhatsAppContact(borderType.title)}
                  variant="outline"
                  className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  Ver Ejemplos
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-stone-800 mb-4">
            ¿No sabes cuál elegir?
          </h3>
          <p className="text-stone-600 mb-6">
            Nuestros expertos te ayudarán a elegir el tipo de bordado perfecto para tu mascota
          </p>
          <Button
            onClick={() => handleWhatsAppContact('asesoría personalizada')}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 text-lg shadow-lg"
            size="lg"
          >
            Recibir Asesoría Gratuita
          </Button>
        </div>
      </div>
    </section>
  )
}