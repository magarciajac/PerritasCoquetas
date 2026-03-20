'use client'

const steps = [
  {
    number: '01',
    icon: '🎨',
    title: 'Elige Tu Estilo',
    description: 'Explora nuestros diseños destacados o comienza con tu combinación de colores favorita.'
  },
  {
    number: '02',
    icon: '✨',
    title: 'Personaliza los Detalles',
    description: 'Selecciona el color del collar, estilo de letras, agrega el nombre de tu mascota y elige dijes encantadores.'
  },
  {
    number: '03',
    icon: '💬',
    title: 'Envía por WhatsApp',
    description: 'Haz clic en el botón para enviarnos tu diseño personalizado directamente a través de WhatsApp.'
  },
  {
    number: '04',
    icon: '✅',
    title: 'Confirma y Crea',
    description: 'Confirmaremos los detalles, finalizaremos tu pedido y crearemos tu collar único con amor.'
  }
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-orange-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Cómo Funciona
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
            Cuatro simples pasos para crear un collar que tu mascota amará.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              {/* Connecting Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[calc(100%_+_12px)] w-6 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 z-0" />
              )}
              
              {/* Card */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center group-hover:bg-white group-hover:shadow-2xl transition-all duration-500 border border-white/50 group-hover:scale-105">
                
                {/* Step Number Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-sm font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                  <span className="text-4xl">{step.icon}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-pink-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-700 transition-colors">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <button 
            onClick={() => {
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
            }}
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            ✨ Empezar Ahora
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}