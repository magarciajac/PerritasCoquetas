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
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-6">
            ¿Por Qué Elegir PatitasCoquetas?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Creemos que cada mascota merece brillar con un collar tan especial como ellos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow group">
              {/* Icon */}
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">{benefit.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-600 font-light leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}