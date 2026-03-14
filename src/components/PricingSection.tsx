'use client'

import React from 'react'
import { Button } from './ui/Button'

export default function PricingSection() {
  const pricingData = [
    { size: 'XS', measurements: '17-29cm', price: '$255' },
    { size: 'S', measurements: '25-40cm', price: '$290' },
    { size: 'M', measurements: '35-46cm', price: '$320' },
    { size: 'L', measurements: '40-55cm', price: '$500' },
    { size: 'XL', measurements: '50-66cm', price: '$700' }
  ]

  const handleWhatsAppContact = () => {
    const phoneNumber = '526143663694'
    const message = `Hola! Me interesa conocer más sobre los precios de los collares personalizados. ¿Podrían brindarme más información?`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section id="precios" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-stone-800 mb-6">
            Precios por Talla
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Collares personalizados con bordado de alta calidad para tu mascota
          </p>
        </div>

        {/* Pricing Table */}
        <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-3xl p-8 mb-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-0">
            {/* Header Row */}
            <div className="bg-rose-200 p-4 text-center font-bold text-stone-800 rounded-tl-2xl border-b border-white">
              Talla
            </div>
            <div className="bg-rose-200 p-4 text-center font-bold text-stone-800 border-b border-white">
              Medidas
            </div>
            <div className="bg-rose-200 p-4 text-center font-bold text-stone-800 rounded-tr-2xl border-b border-white">
              Precio
            </div>

            {/* Data Rows */}
            {pricingData.map((item, index) => (
              <React.Fragment key={`row-${index}`}>
                <div 
                  className={`bg-rose-100 p-4 text-center text-xl font-bold text-stone-800 border-b border-white ${
                    index === pricingData.length - 1 ? 'rounded-bl-2xl' : ''
                  }`}
                >
                  {item.size}
                </div>
                <div 
                  className="bg-rose-100 p-4 text-center text-lg text-stone-700 border-b border-white"
                >
                  {item.measurements}
                </div>
                <div 
                  className={`bg-rose-100 p-4 text-center text-xl font-bold text-stone-800 border-b border-white ${
                    index === pricingData.length - 1 ? 'rounded-br-2xl' : ''
                  }`}
                >
                  {item.price}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded-r-2xl p-6 max-w-4xl mx-auto mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800 font-medium">
                <span className="font-bold">Nota importante:</span> Estos precios son para bordados sencillos solo con 2 colores. Si lleva 3 colores o más se agrega costo extra.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={handleWhatsAppContact}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 text-lg shadow-lg"
            size="lg"
          >
            Consultar Precio Personalizado
          </Button>
          <p className="text-sm text-stone-600 mt-3">
            ¿Tienes dudas sobre tallas o colores? ¡Contáctanos!
          </p>
        </div>
      </div>
    </section>
  )
}