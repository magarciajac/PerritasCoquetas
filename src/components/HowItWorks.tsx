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
    <section id="como-funciona" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-6">
            Cómo Funciona
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Cuatro simples pasos para crear un collar que tu mascota amará.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="text-center group">
              {/* Step Number */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <span className="text-sm font-medium text-orange-600">
                    {step.number}
                  </span>
                </div>
                
                {/* Connecting Line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%_+_1rem)] w-[calc(100%_-_2rem)] h-0.5 bg-gradient-to-r from-orange-200 to-gray-100" />
                )}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">{step.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 font-light leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button 
            onClick={() => {
              const customizerSection = document.getElementById('personalizar')
              if (customizerSection) {
                customizerSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="inline-flex items-center px-8 py-4 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors font-light"
          >
            ✨ Empezar Ahora
          </button>
        </div>
      </div>
    </section>
  )
}