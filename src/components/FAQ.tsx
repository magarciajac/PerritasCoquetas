'use client'

import { useState } from 'react'

const faqs = [
  {
    id: 1,
    question: '¿Cómo hago un pedido?',
    answer: 'Es muy fácil! Primero personaliza tu collar usando nuestro diseñador interactivo, luego haz clic en "Enviar por WhatsApp". Te contactaremos para confirmar los detalles y procesar tu pedido.'
  },
  {
    id: 2,
    question: '¿Puedo elegir colores y dijes?',
    answer: 'Por supuesto! Nuestro personalizador te permite elegir entre múltiples colores de collar, estilos de letras, y una variedad de dijes encantadores como corazones, estrellas, flores y más.'
  },
  {
    id: 3,
    question: '¿Puedo solicitar un diseño personalizado que no se muestra en el personalizador?',
    answer: 'Absolutamente! Si tienes una idea específica en mente, envíanos un mensaje por WhatsApp con tu solicitud especial. Nos encanta crear diseños únicos y personalizados.'
  },
  {
    id: 4,
    question: '¿Cómo envío mi idea o diseño?',
    answer: 'Puedes usar nuestro personalizador en línea y enviarnos el diseño por WhatsApp, o simplemente escríbenos contándonos tu idea. También puedes enviar fotos de referencia si tienes algo específico en mente.'
  },
  {
    id: 5,
    question: '¿Cuánto tiempo tarda en hacerse un collar personalizado?',
    answer: 'Cada collar se hace a mano con amor y atención al detalle. El tiempo de producción típico es de 7-10 días hábiles, más el tiempo de envío. Te mantendremos informada sobre el progreso de tu pedido.'
  },
  {
    id: 6,
    question: '¿Qué tamaños están disponibles?',
    answer: 'Ofrecemos collares en múltiples tamaños para adaptarse a todas las razas, desde chihuahuas hasta mastines. Durante el proceso de pedido, te pediremos las medidas del cuello de tu mascota para asegurar un ajuste perfecto.'
  }
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-6">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
            Todo lo que necesitas saber sobre ordenar en PatitasCoquetas.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openItems.includes(faq.id)
            
            return (
              <div 
                key={faq.id}
                className="bg-stone-50 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-stone-100 transition-colors"
                >
                  <span className="font-medium text-gray-800 pr-4">
                    {faq.question}
                  </span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 font-light mb-6">
            ¿Tienes otra pregunta que no está aquí?
          </p>
          <button 
            onClick={() => window.open('https://wa.me/526144620906?text=Hola! Tengo una pregunta sobre los collares personalizados', '_blank')}
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-light"
          >
            💬 Pregúntanos por WhatsApp
          </button>
        </div>
      </div>
    </section>
  )
}