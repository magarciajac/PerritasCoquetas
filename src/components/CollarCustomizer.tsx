'use client'

import { useState, useRef } from 'react'
import { Button } from './ui/Button'
import { MaterialTexture } from './ui/PatitasImage'
import DesignPreviewModal from './DesignPreviewModal'
import PatitasImage from './ui/PatitasImage'
import { getImageSrc } from '@/lib/images'
import { baseDesigns } from '@/lib/baseDesigns'

interface CollarCustomization {
  baseDesign?: { id: number; name: string; imageKey: string }
  color: { name: string; value: string; label: string }
  letterStyle: { name: string; preview: string; color: string }
  petName: string
  charms: { name: string; emoji: string; label: string }[]
  size?: { name: string; measurements: string; price: string }
}

interface Step {
  id: number
  title: string
  description: string
  completed: boolean
}

const collarColors = [
  { name: 'rosa', value: 'bg-pink-400', label: 'Rosa' },
  { name: 'rosa-claro', value: 'bg-pink-200', label: 'Rosa Claro' },
  { name: 'rojo', value: 'bg-red-600', label: 'Rojo' },
  { name: 'naranja', value: 'bg-orange-500', label: 'Naranja' },
  { name: 'amarillo', value: 'bg-yellow-400', label: 'Amarillo' },
  { name: 'verde-lima', value: 'bg-lime-400', label: 'Verde Lima' },
  { name: 'verde', value: 'bg-green-500', label: 'Verde' },
  { name: 'verde-oscuro', value: 'bg-green-700', label: 'Verde Oscuro' },
  { name: 'turquesa', value: 'bg-cyan-400', label: 'Turquesa' },
  { name: 'azul-claro', value: 'bg-sky-300', label: 'Azul Claro' },
  { name: 'azul', value: 'bg-blue-600', label: 'Azul' },
  { name: 'azul-marino', value: 'bg-blue-900', label: 'Azul Marino' },
  { name: 'morado', value: 'bg-purple-500', label: 'Morado' },
  { name: 'lavanda', value: 'bg-purple-300', label: 'Lavanda' },
  { name: 'cafe', value: 'bg-amber-700', label: 'Café' },
  { name: 'beige', value: 'bg-amber-200', label: 'Beige' },
  { name: 'gris', value: 'bg-gray-400', label: 'Gris' },
  { name: 'gris-oscuro', value: 'bg-gray-600', label: 'Gris Oscuro' },
  { name: 'negro', value: 'bg-gray-900', label: 'Negro' },
  { name: 'blanco', value: 'bg-white border-2 border-gray-300', label: 'Blanco' }
]

const multicolorPatterns = [
  { name: 'rosa-gris', value: 'bg-gradient-to-br from-pink-400 via-pink-300 to-gray-400', label: 'Rosa Gris' },
  { name: 'rojo-amarillo', value: 'bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400', label: 'Rojo Amarillo' },
  { name: 'rosa-blanco', value: 'bg-gradient-to-br from-pink-400 via-pink-200 to-white', label: 'Rosa Blanco' },
  { name: 'azul-amarillo', value: 'bg-gradient-to-br from-blue-600 via-blue-400 to-yellow-400', label: 'Azul Amarillo' },
  { name: 'negro-gris', value: 'bg-gradient-to-br from-gray-900 via-gray-600 to-gray-400', label: 'Negro Gris' },
  { name: 'camuflaje', value: 'bg-gradient-to-br from-green-900 via-green-700 to-amber-700', label: 'Camuflaje' },
  { name: 'arcoiris', value: 'bg-gradient-to-br from-pink-400 via-purple-500 to-cyan-400', label: 'Arcoíris' },
  { name: 'turquesa-morado', value: 'bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-500', label: 'Turquesa Morado' },
  { name: 'gris-blanco', value: 'bg-gradient-to-br from-gray-500 via-gray-300 to-white', label: 'Gris Blanco' },
  { name: 'azul-morado', value: 'bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800', label: 'Azul Morado' }
]

const letterStyles = [
  { name: 'dorado', preview: 'Aa', color: 'text-yellow-600' },
  { name: 'rosa', preview: 'Aa', color: 'text-rose-400' },
  { name: 'plata', preview: 'Aa', color: 'text-gray-400' },
  { name: 'negro', preview: 'Aa', color: 'text-gray-800' }
]

const charmOptions = [
  { name: 'corazon', emoji: '💖', label: 'Corazón' },
  { name: 'estrella', emoji: '⭐', label: 'Estrella' },
  { name: 'flor', emoji: '🌸', label: 'Flor' },
  { name: 'mono', emoji: '🎀', label: 'Moño' },
  { name: 'corona', emoji: '👑', label: 'Corona' },
  { name: 'luna', emoji: '🌙', label: 'Luna' }
]

const collarSizes = [
  { name: 'XS', measurements: '17-29cm', price: '$255' },
  { name: 'S', measurements: '25-40cm', price: '$290' },
  { name: 'M', measurements: '35-46cm', price: '$320' },
  { name: 'L', measurements: '40-55cm', price: '$500' },
  { name: 'XL', measurements: '50-66cm', price: '$700' }
]

export default function CollarCustomizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // State para el wizard de pasos
  const [currentStep, setCurrentStep] = useState(1)
  const [steps, setSteps] = useState<Step[]>([
    { id: 1, title: 'Diseño Base', description: 'Elige tu bordado favorito', completed: false },
    { id: 2, title: 'Color', description: 'Color del collar', completed: false },
    { id: 3, title: 'Personalizar', description: 'Nombre y dijes', completed: false },
    { id: 4, title: 'Talla', description: 'Tamaño del collar', completed: false }
  ])

  // State para la personalización
  const [customization, setCustomization] = useState<CollarCustomization>({
    color: collarColors[0],
    letterStyle: letterStyles[0],
    petName: '',
    charms: [],
    size: undefined // No talla por defecto - la seleccionan en paso 4
  })
  
  // Estados existentes
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
  const [generatedImageUrl, setGeneratedImageUrl] = useState('')
  const [nameSlots, setNameSlots] = useState<Array<{type: 'letter' | 'charm', content: string}>>([])
  const [draggedItem, setDraggedItem] = useState<{type: 'letter' | 'charm', content: string} | null>(null)
  const [draggedCharm, setDraggedCharm] = useState<typeof charmOptions[0] | null>(null)

  // Funciones de navegación
  const goToNextStep = () => {
    if (currentStep < 4) {
      markStepCompleted(currentStep)
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (stepNumber: number) => {
    setCurrentStep(stepNumber)
  }

  const markStepCompleted = (stepId: number) => {
    setSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === stepId ? { ...step, completed: true } : step
      )
    )
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1: return !!customization.baseDesign
      case 2: return steps[1].completed
      case 3: return nameSlots.length > 0
      case 4: return !!customization.size
      default: return false
    }
  }

  const getNextStepStatus = () => {
    const nextStep = currentStep + 1
    if (nextStep > 4) return 'completed'
    return canProceedToNext() ? 'available' : 'locked'
  }

  // Función para agregar letra
  const addLetter = (letter: string) => {
    if (nameSlots.length < 15) { // Límite total de slots
      setNameSlots(prev => [...prev, {type: 'letter', content: letter}])
      updatePetName([...nameSlots, {type: 'letter', content: letter}])
    }
  }

  // Función para remover item
  const removeItem = (index: number) => {
    const newSlots = nameSlots.filter((_, i) => i !== index)
    setNameSlots(newSlots)
    updatePetName(newSlots)
  }

  // Función para actualizar el nombre en customization
  const updatePetName = (slots: Array<{type: 'letter' | 'charm', content: string}>) => {
    const letters = slots.filter(slot => slot.type === 'letter').map(slot => slot.content).join('')
    const charms = slots.filter(slot => slot.type === 'charm').map(slot => 
      charmOptions.find(charm => charm.emoji === slot.content)
    ).filter(Boolean) as typeof charmOptions
    
    setCustomization(prev => ({ 
      ...prev, 
      petName: letters,
      charms: charms
    }))
  }

  const generateDesignImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    // Configurar canvas
    canvas.width = 400
    canvas.height = 300

    // Limpiar canvas
    ctx.fillStyle = '#f5f5f4'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Dibujar fondo del collar
    const collarColors = {
      'rosa-empolvado': '#fecaca',
      'beige': '#fed7aa', 
      'verde-sage': '#bbf7d0',
      'lavanda': '#e9d5ff',
      'camel': '#fdba74',
      'negro': '#1f2937'
    }

    // Dibujar collar con bordes redondeados
    ctx.fillStyle = collarColors[customization.color.name as keyof typeof collarColors] || '#fed7aa'
    const x = 50, y = 100, width = 300, height = 60, radius = 30
    
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
    ctx.fill()

    // Agregar texto del nombre - SIEMPRE dorado para visibilidad
    ctx.fillStyle = '#d97706'
    ctx.font = 'bold 24px serif'
    ctx.textAlign = 'center'
    ctx.strokeStyle = '#92400e'
    ctx.lineWidth = 1
    ctx.strokeText(customization.petName || nameSlots.filter(s => s.type === 'letter').map(s => s.content).join('') || 'BELLA', 200, 140)
    ctx.fillText(customization.petName || nameSlots.filter(s => s.type === 'letter').map(s => s.content).join('') || 'BELLA', 200, 140)

    // Agregar texto descriptivo
    ctx.fillStyle = '#374151'
    ctx.font = '16px sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText('PatitasCoquetas - Collar Personalizado', 50, 200)
    ctx.fillText(`Color: ${customization.color.label}`, 50, 220)
    ctx.fillText(`Material: ${customization.letterStyle.name}`, 50, 240)
    if (customization.charms.length > 0) {
      ctx.fillText(`Dijes: ${customization.charms.map(c => c.label).join(', ')}`, 50, 260)
    }

    return canvas.toDataURL('image/png')
  }

  const downloadDesignImage = () => {
    const imageData = generateDesignImage()
    if (!imageData) return

    const link = document.createElement('a')
    link.download = `collar-${customization.petName || 'BELLA'}-patitascoquetas.png`
    link.href = imageData
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Confirmación simple
    setTimeout(() => {
      alert('✅ Imagen descargada exitosamente!')
    }, 500)
  }

  const handleColorSelect = (color: typeof collarColors[0]) => {
    setCustomization(prev => ({ ...prev, color }))
    markStepCompleted(2)
  }

  // Drag and Drop functions
  const handleCharmDragStart = (charm: typeof charmOptions[0]) => {
    setDraggedCharm(charm)
  }

  const handleLetterDragStart = (letter: string) => {
    setDraggedItem({type: 'letter', content: letter})
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleSlotDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    
    if (draggedCharm) {
      // Insertar charm en la posición específica
      const newSlots = [...nameSlots]
      newSlots.splice(targetIndex, 0, {type: 'charm', content: draggedCharm.emoji})
      setNameSlots(newSlots)
      updatePetName(newSlots)
      setDraggedCharm(null)
    }
    
    if (draggedItem && draggedItem.type === 'letter') {
      // Insertar letra en la posición específica
      const newSlots = [...nameSlots]
      newSlots.splice(targetIndex, 0, draggedItem)
      setNameSlots(newSlots)
      updatePetName(newSlots)
      setDraggedItem(null)
    }
  }

  const handleWhatsAppSend = () => {
    // Generar imagen primero
    const imageUrl = generateDesignImage()
    if (imageUrl) {
      setGeneratedImageUrl(imageUrl)
      setIsModalOpen(true)
    }
  }

  const handleConfirmOrder = () => {
    const phoneNumber = '526143663694'
    const charmsText = customization.charms.length > 0 
      ? customization.charms.map(c => c.label).join(', ')
      : 'Ninguno'
    const message = `Hola! Quiero ordenar un collar personalizado para mi mascota:

DETALLES DEL DISEÑO:
- Diseño Base: ${customization.baseDesign?.name || 'No seleccionado'}
- Color del Collar: ${customization.color.label}
- Nombre: ${customization.petName || nameSlots.filter(s => s.type === 'letter').map(s => s.content).join('') || 'BELLA'}
- Dijes: ${charmsText}
- Talla: ${customization.size?.name} (${customization.size?.measurements})
- Precio: ${customization.size?.price}

Por favor confirmen:
- Tiempo de entrega  
- Proceso de pago
- Información de envío

Espero crear algo hermoso para mi mascota!`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    setIsModalOpen(false)
  }

  return (
    <section id="personalizar" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-6">
            Diseña Tu Collar
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Personaliza cada detalle en 3 sencillos pasos para crear un collar tan único como tu mascota.
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-16">
          <div className="flex justify-center">
            <div className="flex items-center space-x-8">
              {steps.map((step, index) => {
                const isClickable = step.id <= currentStep || (step.id === currentStep + 1 && canProceedToNext())
                const nextStepStatus = index === currentStep ? getNextStepStatus() : null
                
                return (
                  <div key={step.id} className="flex items-center">
                    {/* Step Circle */}
                    <div 
                      className={`relative transition-all duration-300 ${
                        isClickable ? 'cursor-pointer' : 'cursor-not-allowed'
                      } ${
                        step.id <= currentStep ? 'transform scale-110' : ''
                      }`}
                      onClick={() => isClickable && goToStep(step.id)}
                    >
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                          step.completed 
                            ? 'bg-green-500 text-white shadow-lg' 
                            : step.id === currentStep
                              ? 'bg-orange-500 text-white shadow-lg ring-4 ring-orange-200' 
                              : step.id === currentStep + 1 && canProceedToNext()
                                ? 'bg-orange-200 text-orange-600 shadow-md ring-2 ring-orange-300 animate-pulse'
                                : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {step.completed ? (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : step.id === currentStep + 1 && canProceedToNext() ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                          </svg>
                        ) : (
                          step.id
                        )}
                      </div>
                      
                      {/* Indicator de siguiente paso disponible */}
                      {step.id === currentStep + 1 && canProceedToNext() && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                      
                      {/* Step Label */}
                      <div className="absolute top-14 left-1/2 transform -translate-x-1/2 text-center">
                        <p className={`text-sm font-semibold ${
                          step.id === currentStep ? 'text-orange-600' : 
                          step.id === currentStep + 1 && canProceedToNext() ? 'text-orange-500' :
                          'text-gray-600'
                        }`}>
                          {step.title}
                        </p>
                        <p className={`text-xs ${
                          step.id === currentStep ? 'text-orange-500' : 
                          step.id === currentStep + 1 && canProceedToNext() ? 'text-orange-400' :
                          'text-gray-500'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Connection Line */}
                    {index < steps.length - 1 && (
                      <div 
                        className={`w-16 h-1 mx-4 transition-all duration-300 ${
                          step.completed ? 'bg-green-500' : 
                          step.id === currentStep && canProceedToNext() ? 'bg-orange-300' :
                          'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Preview Section - Siempre visible */}
          <div className="order-2 lg:order-1 lg:sticky lg:top-8">
            <h3 className="text-2xl font-light text-gray-800 mb-8 text-center lg:text-left">
              Vista Previa de Tu Diseño
            </h3>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="relative">
                {/* Collar Preview Mejorado */}
                <div 
                  className={`relative rounded-full p-6 mb-8 transition-all duration-500 shadow-lg overflow-hidden`}
                  style={{ width: '300px', height: '120px', margin: '0 auto' }}
                >
                  {/* Fondo base del collar con el color seleccionado */}
                  <div className={`absolute inset-0 ${customization.color.value} rounded-full`}></div>

                  {/* Pet Name Display - Siempre dorado para visibilidad */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-3xl font-bold text-yellow-600 transition-all duration-300 z-10"
                      style={{ 
                        fontFamily: 'serif',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3), 0 0 8px rgba(255,215,0,0.3)'
                      }}
                    >
                      {customization.petName || nameSlots.filter(s => s.type === 'letter').map(s => s.content).join('') || 'BELLA'}
                    </span>
                  </div>
                  
                  {/* Charm Display - Solo mostrar si hay charm seleccionado */}
                  {(nameSlots.some(s => s.type === 'charm') || customization.charms.length > 0) && (
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-white rounded-full p-3 shadow-xl border-4 border-white">
                        <span className="text-3xl">
                          {nameSlots.find(s => s.type === 'charm')?.content || customization.charms[0]?.emoji}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Indicator */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progreso del diseño</span>
                    <span>{Math.round((steps.filter(s => s.completed).length / steps.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(steps.filter(s => s.completed).length / steps.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-3 text-sm text-gray-600 bg-stone-50 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-800 text-center mb-3">Resumen del Diseño</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Diseño Base:</span>
                      <span className={`font-medium ${customization.baseDesign ? 'text-gray-800' : 'text-gray-400'}`}>
                        {customization.baseDesign?.name || 'Por seleccionar'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Color del Collar:</span>
                      <span className={`font-medium ${steps[1].completed ? 'text-gray-800' : 'text-gray-400'}`}>
                        {customization.color.label || 'Por seleccionar'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nombre:</span>
                      <span className={`font-medium ${nameSlots.length > 0 ? 'text-gray-800' : 'text-gray-400'}`}>
                        {nameSlots.filter(s => s.type === 'letter').map(s => s.content).join('') || customization.petName || 'Por personalizar'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dijes:</span>
                      <span className={`font-medium ${nameSlots.some(s => s.type === 'charm') ? 'text-gray-800' : 'text-gray-400'}`}>
                        {nameSlots.filter(s => s.type === 'charm').length > 0 
                          ? `${nameSlots.filter(s => s.type === 'charm').length} seleccionados`
                          : 'Ninguno'}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                      <span>Talla:</span>
                      <span className={`font-medium ${steps[3].completed ? 'text-gray-800' : 'text-gray-400'}`}>
                        {customization.size?.name ? `${customization.size.name} (${customization.size.measurements})` : 'Por seleccionar'}
                      </span>
                    </div>
                    {customization.size && (
                      <div className="flex justify-between items-center bg-orange-50 rounded-lg p-2 -mx-2">
                        <span className="font-semibold text-orange-900">Precio:</span>
                        <span className="font-bold text-xl text-orange-600">
                          {customization.size.price}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* WhatsApp CTA - Solo mostrar cuando esté completo */}
                {steps.every(step => step.completed) && (
                  <div className="mt-8 space-y-3 animate-pulse">
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        ✅ ¡Diseño Completado!
                      </div>
                    </div>
                    
                    <Button 
                      onClick={downloadDesignImage}
                      className="w-full bg-orange-200 hover:bg-orange-300 text-gray-800 py-3 rounded-2xl font-light"
                      size="md"
                    >
                      📷 Descargar Imagen del Diseño
                    </Button>
                    
                    <Button 
                      onClick={handleWhatsAppSend}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-light"
                      size="lg"
                    >
                      💬 Enviar Pedido por WhatsApp
                    </Button>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500 font-light">
                        💡 Tip: Descarga la imagen primero, luego envía el mensaje
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Step Content - Cambia según el paso actual */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-3xl p-8 shadow-lg min-h-[600px]">
              {/* Step 1: Selección de Diseño Base */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h4 className="text-2xl font-semibold text-gray-800 mb-4">
                      ✨ Elige tu Diseño Base
                    </h4>
                    <p className="text-gray-600 mb-8">
                      Selecciona el estilo de bordado que más te guste para tu mascota
                    </p>
                  </div>
                  
                  {/* Diseño seleccionado preview */}
                  {customization.baseDesign ? (
                    <div className="bg-gradient-to-br from-orange-50 to-rose-50 rounded-3xl p-8 border-2 border-orange-300">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
                          ✅ Diseño Seleccionado
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-64 h-64 bg-white rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                          <PatitasImage
                            src={getImageSrc('featured', customization.baseDesign.imageKey).src}
                            fallback={getImageSrc('featured', customization.baseDesign.imageKey).fallback}
                            alt={customization.baseDesign.name}
                            width={400}
                            height={400}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        <div className="text-center md:text-left flex-1">
                          <h5 className="text-2xl font-bold text-gray-800 mb-2">
                            {customization.baseDesign.name}
                          </h5>
                          <p className="text-gray-600 mb-6">
                            {customization.baseDesign.description}
                          </p>
                          <button
                            onClick={() => setIsGalleryModalOpen(true)}
                            className="px-6 py-3 bg-white text-orange-600 border-2 border-orange-300 rounded-full hover:bg-orange-50 transition-colors font-semibold"
                          >
                            🔄 Cambiar Diseño
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mb-8">
                        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-orange-100 to-rose-100 rounded-full flex items-center justify-center mb-6">
                          <svg className="w-16 h-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-xl text-gray-600 mb-8">
                          Aún no has seleccionado un diseño base
                        </p>
                      </div>
                      <button
                        onClick={() => setIsGalleryModalOpen(true)}
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full hover:from-orange-600 hover:to-rose-600 transition-all transform hover:scale-105 shadow-lg text-lg font-semibold"
                      >
                        🖼️ Ver Galería de Diseños
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Color */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h4 className="text-2xl font-semibold text-gray-800 mb-4">
                      🎨 Elige el Color del Collar
                    </h4>
                    <p className="text-gray-600 mb-8">
                      Selecciona el color que mejor represente la personalidad de tu mascota
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                    {collarColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => handleColorSelect(color)}
                        className={`group relative flex flex-col items-center gap-2 transition-all duration-300 ${
                          customization.color.name === color.name ? 'scale-110' : 'hover:scale-105'
                        }`}
                        title={color.label}
                      >
                        <div className={`w-14 h-14 rounded-full ${color.value} shadow-lg transition-all duration-300 ${
                          customization.color.name === color.name 
                            ? 'ring-4 ring-orange-400 ring-offset-2 shadow-xl' 
                            : 'hover:shadow-xl'
                        }`}>
                          {customization.color.name === color.name && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg">
                                <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <span className={`text-xs font-medium transition-colors ${
                          customization.color.name === color.name ? 'text-orange-600' : 'text-gray-600'
                        }`}>
                          {color.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  
                  {/* Sección de Multicolor */}
                  <div className="pt-8 border-t-2 border-gray-200">
                    <div className="text-center mb-6">
                      <h5 className="text-xl font-semibold text-gray-800 mb-2">
                        🌈 Diseños Multicolor
                      </h5>
                      <p className="text-sm text-gray-600">
                        Patrones especiales con combinaciones de colores
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                      {multicolorPatterns.map((pattern) => (
                        <button
                          key={pattern.name}
                          onClick={() => handleColorSelect(pattern)}
                          className={`group relative flex flex-col items-center gap-2 transition-all duration-300 ${
                            customization.color.name === pattern.name ? 'scale-110' : 'hover:scale-105'
                          }`}
                          title={pattern.label}
                        >
                          <div className={`w-14 h-14 rounded-full ${pattern.value} shadow-lg transition-all duration-300 ${
                            customization.color.name === pattern.name 
                              ? 'ring-4 ring-orange-400 ring-offset-2 shadow-xl' 
                              : 'hover:shadow-xl'
                          }`}>
                            {customization.color.name === pattern.name && (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg">
                                  <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <span className={`text-xs font-medium transition-colors ${
                            customization.color.name === pattern.name ? 'text-orange-600' : 'text-gray-600'
                          }`}>
                            {pattern.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Personalización */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h4 className="text-2xl font-semibold text-gray-800 mb-4">
                      ✨ Personaliza con Nombre y Dijes
                    </h4>
                    <p className="text-gray-600 mb-8">
                      Arrastra letras y dijes para crear el diseño perfecto
                    </p>
                  </div>

                  {/* Pet Name Builder */}
                  <div className="space-y-6">
                    <h5 className="text-lg font-semibold text-gray-800">
                      Crea el Nombre de tu Mascota
                    </h5>
                    
                    {/* Name Display Area */}
                    <div className="bg-gray-50 rounded-2xl p-6 min-h-24">
                      <p className="text-center text-sm text-gray-600 mb-4">
                        Arrastra letras y dijes aquí:
                      </p>
                      
                      <div className="flex flex-wrap justify-center gap-3 empty:min-h-16">
                        {nameSlots.map((slot, index) => (
                          <div key={`slot-${index}`} className="flex items-center">
                            {/* Slot actual */}
                            <div className="relative w-14 h-14 rounded-full flex items-center justify-center border-3 border-gray-300 bg-white shadow-md hover:shadow-lg transition-shadow">
                              {slot.type === 'letter' ? (
                                <span className="text-xl font-bold text-gray-800">{slot.content}</span>
                              ) : (
                                <span className="text-2xl">{slot.content}</span>
                              )}
                              <button
                                onClick={() => removeItem(index)}
                                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-sm hover:bg-red-600 transition-colors shadow-md"
                              >
                                ×
                              </button>
                            </div>
                            
                            {/* Drop zone between items */}
                            <div
                              className="w-10 h-14 flex items-center justify-center group"
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleSlotDrop(e, index + 1)}
                            >
                              <div className="w-3 h-10 border-l-3 border-dashed border-orange-300 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Drop zone inicial */}
                        {nameSlots.length === 0 && (
                          <div
                            className="w-full h-20 border-3 border-dashed border-orange-300 rounded-xl flex items-center justify-center text-orange-500 hover:border-orange-400 hover:bg-orange-50 transition-colors"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleSlotDrop(e, 0)}
                          >
                            <span className="font-medium">Arrastra aquí para empezar</span>
                          </div>
                        )}
                        
                        {/* Drop zone final */}
                        {nameSlots.length > 0 && (
                          <div
                            className="w-14 h-14 flex items-center justify-center group"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleSlotDrop(e, nameSlots.length)}
                          >
                            <div className="w-12 h-12 border-3 border-dashed border-orange-300 rounded-full flex items-center justify-center hover:bg-orange-50 transition-colors">
                              <span className="text-orange-400 text-2xl">+</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-center text-sm text-gray-500 mt-4">
                        Máximo 15 elementos total • {nameSlots.length}/15 usados
                      </p>
                    </div>
                  </div>

                  {/* Alphabet */}
                  <div className="space-y-6">
                    <h5 className="text-lg font-semibold text-gray-800">
                      Arrastra las Letras
                    </h5>
                    <div className="grid grid-cols-6 gap-3">
                      {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
                        <div
                          key={letter}
                          draggable
                          onDragStart={() => handleLetterDragStart(letter)}
                          className="w-12 h-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-full flex items-center justify-center text-lg font-bold text-blue-800 hover:border-blue-400 cursor-grab active:cursor-grabbing hover:shadow-lg transition-all duration-200 hover:scale-110"
                        >
                          {letter}
                        </div>
                      ))}
                    </div>
                    
                    {/* Números */}
                    <div>
                      <h6 className="text-md font-medium text-gray-600 mb-3">Números</h6>
                      <div className="grid grid-cols-5 gap-3">
                        {'0123456789'.split('').map((number) => (
                          <div
                            key={number}
                            draggable
                            onDragStart={() => handleLetterDragStart(number)}
                            className="w-12 h-12 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-full flex items-center justify-center text-lg font-bold text-green-800 hover:border-green-400 cursor-grab active:cursor-grabbing hover:shadow-lg transition-all duration-200 hover:scale-110"
                          >
                            {number}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Charms Selection */}
                  <div className="space-y-6">
                    <h5 className="text-lg font-semibold text-gray-800">
                      Arrastra los Dijes
                    </h5>
                    <p className="text-sm text-gray-600">
                      Arrastra los dijes entre las letras del nombre para crear combinaciones únicas
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {charmOptions.map((charm) => (
                        <div
                          key={charm.name}
                          draggable
                          onDragStart={() => handleCharmDragStart(charm)}
                          className="relative p-4 rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-pink-50 to-rose-50 hover:border-pink-300 transition-all duration-200 hover:scale-105 cursor-grab active:cursor-grabbing hover:shadow-lg"
                        >
                          <div className="text-4xl mb-3 text-center">{charm.emoji}</div>
                          <div className="text-sm text-gray-700 font-medium text-center">{charm.label}</div>
                          
                          {/* Drag indicator */}
                          <div className="absolute top-2 right-2 text-pink-400 opacity-70">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Selección de Talla */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h4 className="text-2xl font-semibold text-gray-800 mb-4">
                      📏 Selecciona la Talla del Collar
                    </h4>
                    <p className="text-gray-600 mb-8">
                      Mide el cuello de tu mascota para elegir la talla correcta
                    </p>
                  </div>

                  {/* Size Selection Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {collarSizes.map((size) => (
                      <div
                        key={size.name}
                        onClick={() => {
                          setCustomization(prev => ({ ...prev, size }))
                          markStepCompleted(4)
                        }}
                        className={`relative p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                          customization.size?.name === size.name
                            ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-rose-50 shadow-lg ring-4 ring-orange-200'
                            : 'border-gray-200 bg-white hover:border-orange-300 hover:shadow-md'
                        }`}
                      >
                        {/* Checkmark when selected */}
                        {customization.size?.name === size.name && (
                          <div className="absolute top-4 right-4 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}

                        <div className="text-center space-y-4">
                          <div className="text-4xl font-bold text-gray-800">
                            {size.name}
                          </div>
                          <div className="text-lg text-gray-600">
                            {size.measurements}
                          </div>
                          <div className="text-2xl font-bold text-orange-600">
                            {size.price}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Measurement Guide */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-2xl p-6 mt-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">
                          ¿Cómo medir el cuello de tu mascota?
                        </h3>
                        <p className="text-blue-800">
                          Usa una cinta métrica flexible alrededor del cuello de tu mascota, donde normalmente va el collar. 
                          Debe quedar ajustado pero cómodo (debes poder pasar 2 dedos entre el collar y el cuello).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
                <Button
                  onClick={goToPreviousStep}
                  disabled={currentStep === 1}
                  variant="outline"
                  className="px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Anterior
                </Button>

                <div className="text-center">
                  <span className="text-sm text-gray-600">
                    Paso {currentStep} de {steps.length}
                  </span>
                </div>

                <Button
                  onClick={goToNextStep}
                  disabled={currentStep === 4 || !canProceedToNext()}
                  className={`px-6 py-3 transition-all duration-300 ${
                    !canProceedToNext() && currentStep < 4 
                      ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-500' 
                      : canProceedToNext() && currentStep < 4
                        ? 'bg-orange-500 text-white shadow-lg hover:bg-orange-600 hover:scale-105'
                        : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  {currentStep === 4 ? '¡Completado!' : 
                   !canProceedToNext() ? 'Selecciona una opción' : 'Continuar'}
                  {currentStep < 4 && canProceedToNext() && (
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Canvas oculto para generar imagen */}
      <canvas 
        ref={canvasRef} 
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      {/* Modal de confirmación */}
      <DesignPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={generatedImageUrl}
        designDetails={{
          color: customization.color.label,
          font: customization.letterStyle.name,
          petName: customization.petName || nameSlots.filter(s => s.type === 'letter').map(s => s.content).join('') || 'BELLA',
          charm: customization.charms.map(c => c.label).join(', ')
        }}
        onConfirmOrder={handleConfirmOrder}
        onDownload={downloadDesignImage}
      />

      {/* Modal de Galería de Diseños */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay con blur */}
            <div 
              className="fixed inset-0 transition-opacity bg-gray-900/30 backdrop-blur-md"
              onClick={() => setIsGalleryModalOpen(false)}
            />

            {/* Modal Panel */}
            <div className="inline-block w-full max-w-7xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-3xl relative z-50">
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-rose-500 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      🖼️ Galería de Diseños
                    </h3>
                    <p className="text-orange-100">
                      Selecciona el estilo de bordado - podrás cambiar el color después
                    </p>
                  </div>
                  <button
                    onClick={() => setIsGalleryModalOpen(false)}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {baseDesigns.map((design) => {
                    const { src, fallback, alt } = getImageSrc('featured', design.imageKey)
                    const isSelected = customization.baseDesign?.id === design.id
                    
                    return (
                      <button
                        key={design.id}
                        onClick={() => {
                          setCustomization(prev => ({ 
                            ...prev, 
                            baseDesign: design 
                          }))
                          markStepCompleted(1)
                          setIsGalleryModalOpen(false)
                        }}
                        className={`group relative rounded-2xl border-3 transition-all duration-300 hover:scale-105 overflow-hidden ${
                          isSelected
                            ? 'border-orange-400 shadow-xl ring-4 ring-orange-200' 
                            : 'border-gray-200 hover:border-orange-300 hover:shadow-lg'
                        }`}
                      >
                        {/* Imagen */}
                        <div className="aspect-square bg-gradient-to-br from-orange-50 to-stone-100 flex items-center justify-center p-3">
                          <PatitasImage
                            src={src}
                            fallback={fallback}
                            alt={alt}
                            width={300}
                            height={300}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        {/* Info */}
                        <div className={`p-3 text-center transition-all ${
                          isSelected ? 'bg-orange-50' : 'bg-white'
                        }`}>
                          <h5 className="text-sm font-semibold text-gray-800 mb-1">
                            {design.name}
                          </h5>
                          
                          {isSelected ? (
                            <div className="flex items-center justify-center text-orange-600 font-semibold text-xs">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Seleccionado
                            </div>
                          ) : (
                            <div className="text-orange-500 font-medium text-xs">
                              Clic para seleccionar
                            </div>
                          )}
                        </div>
                        
                        {/* Checkmark */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
                
                {/* Nota informativa */}
                <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-blue-800">
                      <span className="font-semibold">Nota:</span> Estás eligiendo el estilo de bordado. En el siguiente paso podrás personalizar el color del collar a tu gusto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}