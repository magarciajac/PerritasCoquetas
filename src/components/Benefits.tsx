'use client'

const benefits = [
  {
    icon: '💖',
    title: 'Personalizado con Amor',
    description: 'Cada collar está diseñado con cuidado y atención al detalle, celebrando la personalidad única de tu mascota.'
  },
  {
    icon: '✨',
    title: 'Estilo Único',
    description: 'No hay dos collares iguales. Crea un accesorio único que se destaque entre la multitud.'
  },
  {
    icon: '🏆',
    title: 'Calidad Premium',
    description: 'Usamos solo los mejores materiales y artesanía para asegurar que tu collar sea tan duradero como hermoso.'
  },
  {
    icon: '👥',
    title: 'Para Amantes de Mascotas con Estilo',
    description: 'Únete a nuestra comunidad de dueños de mascotas que creen que sus amigos peludos merecen lo mejor.'
  }
]

export default function Benefits() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gray-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gray-50 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-stone-100 rounded-full blur-3xl transform -translate-x-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            ¿Por Qué Elegir PatitasCoquetas?
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
            Creemos que cada mascota merece brillar con un collar tan especial como ellos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="relative group">
              {/* Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 group-hover:bg-white group-hover:scale-105 group-hover:-translate-y-2">
                
                {/* Gradient border effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gray-300 via-stone-400 to-gray-300 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-sm"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-stone-100 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md group-hover:shadow-lg">
                    <span className="text-4xl">{benefit.icon}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {benefit.description}
                  </p>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-6 right-6 w-3 h-3 bg-gradient-to-br from-gray-400 to-stone-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-stone-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    </section>
  )
}