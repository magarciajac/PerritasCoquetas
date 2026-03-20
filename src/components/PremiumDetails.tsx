'use client'

import { Button } from './ui/Button'

export default function PremiumDetails() {
  const premiumFeatures = [
    { 
      id: 1, 
      title: 'Materiales Premium',
      description: 'Cuero genuino de alta calidad, resistente y duradero'
    },
    { 
      id: 2, 
      title: 'Bordado Artesanal',
      description: 'Cada letra bordada a mano con hilo de primera calidad'
    },
    { 
      id: 3, 
      title: 'Herrajes Dueluxe',
      description: 'Hebillas y anillos de acero inoxidable antioxidante'
    },
    { 
      id: 4, 
      title: 'Acabados Perfectos',
      description: 'Costuras reforzadas y bordes pulidos profesionalmente'
    },
    { 
      id: 5, 
      title: 'Dijes Especiales',
      description: 'Accesorios únicos que dan personalidad al collar'
    },
    { 
      id: 6, 
      title: 'Garantía de Calidad',
      description: 'Respaldamos nuestro trabajo con garantía total'
    }
  ]

  const handleWhatsAppContact = () => {
    const phoneNumber = '526144620906'
    const message = `Hola! Me encantan los detalles premium de sus collares. ¿Podrían mostrarme más ejemplos de la calidad?`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section id="detalles-premium" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-stone-800 mb-6" 
              style={{ color: '#E91E63', fontWeight: 'bold' }}>
            Detalles premium
          </h2>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto">
            Cada collar es una obra de arte creada con los mejores materiales y técnicas artesanales
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {premiumFeatures.map((feature) => (
            <div 
              key={feature.id}
              className="group"
            >
              {/* Image Placeholder */}
              <div className="relative mb-6">
                <div className="w-full h-64 bg-gradient-to-br from-stone-100 to-stone-200 rounded-3xl flex items-center justify-center border-2 border-dashed border-stone-300 group-hover:border-orange-300 transition-all duration-300 hover:shadow-lg">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <p className="text-sm text-stone-500">
                      Foto de detalle
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-stone-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Guarantee Section */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 border border-orange-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-semibold text-stone-800 mb-4">
              Calidad Garantizada
            </h3>
            <p className="text-stone-600 mb-6 max-w-2xl mx-auto text-lg">
              Cada collar pasa por un control de calidad riguroso. Si no quedas 100% satisfecho, trabajaremos contigo hasta lograrlo.
            </p>
            <Button
              onClick={handleWhatsAppContact}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 text-lg shadow-lg"
              size="lg"
            >
              Ver Galería de Trabajos
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}