'use client'

export default function FinalCTA() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '526143663694'
    const message = 'Hola! ✨ Estoy lista para crear un collar especial para mi mascota. ¿Podrían ayudarme con el proceso?'
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <section className="py-20 bg-gradient-to-br from-stone-100 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl p-12 shadow-lg">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-6">
            <span className="text-orange-300">✨</span> ¿Lista para Crear Algo Especial? <span className="text-orange-300">✨</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
            Tu mascota merece un collar tan único como ella. Diseñemos algo hermoso juntas.
          </p>
          
          <button 
            onClick={handleWhatsAppClick}
            className="inline-flex items-center px-8 py-4 bg-green-600 text-white text-lg rounded-full hover:bg-green-700 transition-all hover:scale-105 font-light shadow-lg"
          >
            💬 Ordena por WhatsApp
          </button>
          
          <div className="flex items-center justify-center mt-6 text-sm text-gray-500 font-light space-x-2">
            <span>Chatea con nosotras directamente</span>
            <span>•</span>
            <span>No necesitas cuenta</span>
            <span>•</span>
            <span>Comienza en segundos</span>
          </div>
        </div>
      </div>
    </section>
  )
}