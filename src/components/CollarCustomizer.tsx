'use client'

import { useState, useRef } from 'react'
import { Button } from './ui/Button'
import DesignPreviewModal from './DesignPreviewModal'
import PatitasImage from './ui/PatitasImage'
import { getImageSrc } from '@/lib/images'

interface CollarCustomization {
  designType: null | { id: number; name: string; imageKey: string; description: string }
  color: { id: string; label: string; value: string }
  petName: string
  letterStyle: { id: string; name: string; style: string }
  charms: { id: string; label: string; icon: string }[]
  size: { id: string; name: string; description: string }
}

const designTypes = [
  { 
    id: 1, 
    name: 'Diseño1', 
    imageKey: 'design1',
    description: 'Diseño simple y elegante'
  },
  { 
    id: 2, 
    name: 'Diseño2', 
    imageKey: 'design2', 
    description: 'Diseño moderno con estilo'
  },
  { 
    id: 3, 
    name: 'Combinado', 
    imageKey: 'design3', 
    description: 'Diseño complejo con múltiples elementos'
  }
]

const colors = [
  { id: 'black', label: 'Negro', value: '#000000' },
  { id: 'brown', label: 'Café', value: '#8B4513' },
  { id: 'tan', label: 'Beige', value: '#D2B48C' },
  { id: 'red', label: 'Rojo', value: '#DC2626' },
  { id: 'pink', label: 'Rosa', value: '#EC4899' },
  { id: 'blue', label: 'Azul', value: '#3B82F6' }
]

const letterStyles = [
  { id: 'classic', name: 'Clásica', style: 'font-serif text-2xl' },
  { id: 'modern', name: 'Moderna', style: 'font-sans text-2xl font-bold' },
  { id: 'script', name: 'Cursiva', style: 'font-script text-2xl italic' },
  { id: 'bold', name: 'Negrita', style: 'font-sans text-2xl font-extrabold' }
]

const charmTypes = [
  { id: 'heart', label: 'Corazón', icon: '❤️' },
  { id: 'bone', label: 'Hueso', icon: '🦴' },
  { id: 'star', label: 'Estrella', icon: '⭐' },
  { id: 'paw', label: 'Patita', icon: '🐾' },
  { id: 'crown', label: 'Corona', icon: '👑' },
  { id: 'bell', label: 'Campanita', icon: '🔔' }
]

const sizes = [
  { id: 'xs', name: 'Extra Pequeño', description: 'Para cachorros y perros muy pequeños (hasta 5 lbs)' },
  { id: 's', name: 'Pequeño', description: 'Perros pequeños (5-15 lbs)' },
  { id: 'm', name: 'Mediano', description: 'Perros medianos (15-35 lbs)' },
  { id: 'l', name: 'Grande', description: 'Perros grandes (35-65 lbs)' },
  { id: 'xl', name: 'Extra Grande', description: 'Perros extra grandes (65+ lbs)' }
]

export default function CollarCustomizer() {
  const [currentStep, setCurrentStep] = useState(0)
  const [customization, setCustomization] = useState<CollarCustomization>({
    designType: null,
    color: { id: '', label: '', value: '' },
    petName: '',
    letterStyle: { id: '', name: '', style: '' },
    charms: [],
    size: { id: '', name: '', description: '' }
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const steps = [
    'Tipo de Diseño',
    'Color del Collar', 
    'Letras y Texto',
    'Dijes y Charms',
    'Tamaño'
  ]

  const handleDesignTypeSelect = (design: typeof designTypes[0]) => {
    setCustomization(prev => ({
      ...prev,
      designType: design
    }))
  }

  const handleColorSelect = (color: typeof colors[0]) => {
    setCustomization(prev => ({
      ...prev,
      color: color
    }))
  }

  const handleLetterStyleSelect = (style: typeof letterStyles[0]) => {
    setCustomization(prev => ({
      ...prev,
      letterStyle: style
    }))
  }

  const handleCharmToggle = (charm: typeof charmTypes[0]) => {
    setCustomization(prev => {
      const isSelected = prev.charms.some(c => c.id === charm.id)
      const newCharms = isSelected 
        ? prev.charms.filter(c => c.id !== charm.id)
        : [...prev.charms, charm]
      return {
        ...prev,
        charms: newCharms
      }
    })
  }

  const handleSizeSelect = (size: typeof sizes[0]) => {
    setCustomization(prev => ({
      ...prev,
      size: size
    }))
  }

  const canProceed = () => {
    switch(currentStep) {
      case 0: return customization.designType !== null
      case 1: return customization.color.id !== ''
      case 2: return customization.petName.trim() !== '' && customization.letterStyle.id !== ''
      case 3: return true // Charms are optional
      case 4: return customization.size.id !== ''
      default: return false
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1 && canProceed()) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleConfirmOrder = () => {
    const phoneNumber = '526143663694'
    
    const message = `Hola! Quiero ordenar un collar personalizado para mi mascota:

DETALLES DEL DISEÑO:
- Tipo de Diseño: ${customization.designType?.name || 'No seleccionado'}
- Color: ${customization.color.label || 'No seleccionado'}
- Nombre: ${customization.petName || 'No definido'}
- Estilo de letra: ${customization.letterStyle.name || 'No seleccionado'}
- Charms: ${customization.charms.length > 0 ? customization.charms.map(c => c.label).join(', ') : 'Ninguno'}
- Tamaño: ${customization.size.name || 'No seleccionado'}

¡Espero crear algo hermoso para mi mascota!`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    setIsModalOpen(false)
  }

  const handleDownload = () => {
    console.log('Download initiated for design:', customization)
    setIsModalOpen(false)
  }

  const renderStepContent = () => {
    switch(currentStep) {
      case 0:
        return (
          <div>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Elige tu Tipo de Diseño
            </h3>
            <div className="space-y-6">
              {designTypes.map((design) => (
                <div
                  key={design.id}
                  className={`relative overflow-hidden rounded-xl border-3 transition-all duration-300 cursor-pointer ${
                    customization.designType?.id === design.id
                      ? 'border-pink-400 bg-pink-50 shadow-lg scale-[1.02]'
                      : 'border-gray-200 hover:border-pink-200 hover:shadow-md'
                  }`}
                  onClick={() => handleDesignTypeSelect(design)}
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center shadow-inner">
                          <PatitasImage
                            src={getImageSrc('featured', design.imageKey).src}
                            fallback={getImageSrc('featured', design.imageKey).fallback}
                            alt={design.name}
                            width={80}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-800 mb-2">{design.name}</h4>
                        <p className="text-gray-600">{design.description}</p>
                        {customization.designType?.id === design.id && (
                          <div className="mt-3">
                            <span className="inline-block bg-pink-500 text-white px-3 py-1 rounded-full text-sm">
                              ✓ Seleccionado
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 1:
        return (
          <div>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Selecciona el Color del Collar
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {colors.map((color) => (
                <div
                  key={color.id}
                  className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    customization.color.id === color.id
                      ? 'border-pink-500 bg-pink-50 shadow-lg'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                  onClick={() => handleColorSelect(color)}
                >
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                      style={{ backgroundColor: color.value }}
                    ></div>
                    <h4 className="text-lg font-semibold text-gray-800">{color.label}</h4>
                    {customization.color.id === color.id && (
                      <div className="mt-2">
                        <span className="text-pink-500 text-sm font-medium">✓ Seleccionado</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Personaliza las Letras
            </h3>
            <div className="space-y-8">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Nombre de tu Mascota
                </label>
                <input
                  type="text"
                  placeholder="Ej: BELLA"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none text-lg font-semibold text-center uppercase"
                  value={customization.petName}
                  onChange={(e) => setCustomization(prev => ({ ...prev, petName: e.target.value.toUpperCase() }))}
                  maxLength={12}
                />
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Estilo de Letra
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {letterStyles.map((style) => (
                    <div
                      key={style.id}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all text-center ${
                        customization.letterStyle.id === style.id
                          ? 'border-pink-500 bg-pink-50 shadow-lg'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                      onClick={() => handleLetterStyleSelect(style)}
                    >
                      <div className={`mb-3 ${style.style}`}>
                        {customization.petName || 'BELLA'}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800">{style.name}</h4>
                      {customization.letterStyle.id === style.id && (
                        <div className="mt-2">
                          <span className="text-pink-500 text-sm font-medium">✓ Seleccionado</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Agrega Dijes y Charms (Opcional)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {charmTypes.map((charm) => {
                const isSelected = customization.charms.some(c => c.id === charm.id)
                return (
                  <div
                    key={charm.id}
                    className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-pink-500 bg-pink-50 shadow-lg'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                    onClick={() => handleCharmToggle(charm)}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{charm.icon}</div>
                      <h4 className="text-lg font-semibold text-gray-800">{charm.label}</h4>
                      {isSelected && (
                        <div className="mt-2">
                          <span className="text-pink-500 text-sm font-medium">✓ Seleccionado</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            {customization.charms.length > 0 && (
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Seleccionados: {customization.charms.map(c => c.label).join(', ')}
                </p>
              </div>
            )}
          </div>
        )

      case 4:
        return (
          <div>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Selecciona el Tamaño
            </h3>
            <div className="space-y-4">
              {sizes.map((size) => (
                <div
                  key={size.id}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    customization.size.id === size.id
                      ? 'border-pink-500 bg-pink-50 shadow-lg'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                  onClick={() => handleSizeSelect(size)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{size.name}</h4>
                      <p className="text-gray-600">{size.description}</p>
                    </div>
                    {customization.size.id === size.id && (
                      <span className="text-pink-500 text-xl">✓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Diseña Tu Collar Personalizado
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sigue estos pasos para crear el collar perfecto para tu mascota
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-12">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === currentStep 
                      ? 'bg-pink-500 text-white'
                      : index < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {index < currentStep ? '✓' : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-1 mx-2 ${
                      index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-gray-600 font-medium">
            Paso {currentStep + 1} de {steps.length}: {steps[currentStep]}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Step content */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {renderStepContent()}
            
            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <Button
                onClick={prevStep}
                variant="secondary"
                disabled={currentStep === 0}
                className="px-6 py-3"
              >
                ← Anterior
              </Button>
              
              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="primary"
                  disabled={!canProceed()}
                  className="px-6 py-3"
                >
                  Ver Resumen Final
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  variant="primary"
                  disabled={!canProceed()}
                  className="px-6 py-3"
                >
                  Siguiente →
                </Button>
              )}
            </div>
          </div>

          {/* Live preview */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Vista Previa en Vivo
            </h3>
            <div className="text-center">
              <div className="inline-block bg-gray-100 rounded-lg p-8">
                <PatitasImage
                  src={customization.designType ? getImageSrc('featured', customization.designType.imageKey).src : getImageSrc('featured', 'collar-1').src}
                  fallback={customization.designType ? getImageSrc('featured', customization.designType.imageKey).fallback : getImageSrc('featured', 'collar-1').fallback}
                  alt="Preview del collar"
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              
              {/* Preview details */}
              <div className="mt-6 space-y-2">
                <h4 className={`text-xl font-semibold text-gray-800 ${customization.letterStyle.style}`}>
                  {customization.petName || 'Nombre de tu Mascota'}
                </h4>
                <div className="text-gray-600 space-y-1">
                  <p><strong>Diseño:</strong> {customization.designType?.name || 'No seleccionado'}</p>
                  <p><strong>Color:</strong> {customization.color.label || 'No seleccionado'}</p>
                  <p><strong>Estilo:</strong> {customization.letterStyle.name || 'No seleccionado'}</p>
                  <p><strong>Charms:</strong> {customization.charms.length > 0 ? customization.charms.map(c => c.label).join(', ') : 'Ninguno'}</p>
                  <p><strong>Tamaño:</strong> {customization.size.name || 'No seleccionado'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal para vista previa final */}
        <DesignPreviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageUrl={customization.designType ? getImageSrc('featured', customization.designType.imageKey).src : ''}
          designDetails={{
            color: customization.color.label || 'No seleccionado',
            font: customization.letterStyle.name || 'No seleccionado',
            petName: customization.petName || 'Nombre no definido',
            charm: customization.charms.length > 0 ? customization.charms.map(c => c.label).join(', ') : 'Ninguno'
          }}
          onConfirmOrder={handleConfirmOrder}
          onDownload={handleDownload}
        />
      </div>
    </section>
  )
}