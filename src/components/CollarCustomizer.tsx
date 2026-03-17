'use client'

import { useState, useRef } from 'react'
import { Button } from './ui/Button'
import DesignPreviewModal from './DesignPreviewModal'
import ImageZoomModal from './ImageZoomModal'
import PatitasImage from './ui/PatitasImage'
import { getImageSrc } from '@/lib/images'

interface CollarCustomization {
  designType: null | { id: number; name: string; imageKey: string; description: string }
  embroideryType: null | { id: string; name: string; imageKey: string; description: string }
  // Bordados separados para diseño combinado
  embroideryDesign1: null | { id: string; name: string; imageKey: string; description: string }
  embroideryDesign2: null | { id: string; name: string; imageKey: string; description: string }
  color: { id: string; label: string; value: string }
  petName: string
  letterStyle: { id: string; name: string; style: string }
  charmType: { id: string; name: string; style: string }
  charms: { id: string; label: string; icon: string }[]
  size: { id: string; name: string; description: string }
  // Second collar for combined design
  secondCollar: {
    petName: string
    color: { id: string; label: string; value: string }
  }
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
  { id: 'black', label: 'Negro', value: '#000000', type: 'solid' },
  { id: 'brown', label: 'Café', value: '#8B4513', type: 'solid' },
  { id: 'tan', label: 'Beige', value: '#D2B48C', type: 'solid' },
  { id: 'red', label: 'Rojo', value: '#DC2626', type: 'solid' },
  { id: 'pink', label: 'Rosa', value: '#EC4899', type: 'solid' },
  { id: 'blue', label: 'Azul', value: '#3B82F6', type: 'solid' },
  { id: 'navy', label: 'Azul Marino', value: '#1E3A8A', type: 'solid' },
  { id: 'purple', label: 'Morado', value: '#7C3AED', type: 'solid' },
  { id: 'green', label: 'Verde', value: '#10B981', type: 'solid' },
  { id: 'yellow', label: 'Amarillo', value: '#F59E0B', type: 'solid' },
  { id: 'orange', label: 'Naranja', value: '#EA580C', type: 'solid' },
  { id: 'white', label: 'Blanco', value: '#FFFFFF', type: 'solid' },
  { id: 'gray', label: 'Gris', value: '#6B7280', type: 'solid' },
  { id: 'teal', label: 'Verde Azulado', value: '#0D9488', type: 'solid' },
  { id: 'lime', label: 'Verde Limón', value: '#65A30D', type: 'solid' },
  { id: 'cyan', label: 'Cian', value: '#0891B2', type: 'solid' },
  { id: 'indigo', label: 'Índigo', value: '#4338CA', type: 'solid' },
  { id: 'rose', label: 'Rosa Pálido', value: '#F43F5E', type: 'solid' },
  { id: 'emerald', label: 'Esmeralda', value: '#059669', type: 'solid' },
  { id: 'amber', label: 'Ámbar', value: '#D97706', type: 'solid' },
  { id: 'slate', label: 'Pizarra', value: '#475569', type: 'solid' },
  { id: 'multicolor1', label: 'Multicolor Rosa', value: 'linear-gradient(45deg, #EC4899, #F59E0B, #10B981)', type: 'multicolor' },
  { id: 'multicolor2', label: 'Multicolor Azul', value: 'linear-gradient(45deg, #3B82F6, #7C3AED, #0D9488)', type: 'multicolor' },
  { id: 'multicolor3', label: 'Multicolor Arcoíris', value: 'linear-gradient(45deg, #DC2626, #F59E0B, #10B981, #3B82F6, #7C3AED)', type: 'multicolor' },
  { id: 'camo', label: 'Camuflaje', value: 'linear-gradient(45deg, #4B5563, #065F46, #1F2937)', type: 'multicolor' }
]

const letterStyles = [
  { id: 'classic', name: 'Clásica', style: 'font-serif text-2xl' },
  { id: 'modern', name: 'Moderna', style: 'font-sans text-2xl font-bold' },
  { id: 'script', name: 'Cursiva', style: 'font-script text-2xl italic' },
  { id: 'bold', name: 'Negrita', style: 'font-sans text-2xl font-extrabold' }
]

const letterTypes = [
  { 
    id: 'type1', 
    name: 'Tipo Elegante', 
    imageKey: 'letter-type-1',
    description: 'Letras elegantes con serifs'
  },
  { 
    id: 'type2', 
    name: 'Tipo Moderno', 
    imageKey: 'letter-type-2',
    description: 'Letras modernas sans-serif'
  },
  { 
    id: 'type3', 
    name: 'Tipo Cursivo', 
    imageKey: 'letter-type-3',
    description: 'Letras cursivas y estilizadas'
  },
  { 
    id: 'type4', 
    name: 'Tipo Bold', 
    imageKey: 'letter-type-4',
    description: 'Letras gruesas y llamativas'
  }
]

const charmTypes = [
  { 
    id: 'charm1', 
    name: 'Charms Básicos', 
    imageKey: 'charm-type-1',
    description: 'Charms sencillos y elegantes'
  },
  { 
    id: 'charm2', 
    name: 'Charms Coloridos', 
    imageKey: 'charm-type-2',
    description: 'Charms vibrantes y alegres'
  },
  { 
    id: 'charm3', 
    name: 'Charms Metálicos', 
    imageKey: 'charm-type-3',
    description: 'Charms con acabados metálicos'
  },
  { 
    id: 'charm4', 
    name: 'Charms Premium', 
    imageKey: 'charm-type-4',
    description: 'Charms exclusivos y especiales'
  }
]

const typicalColors = [
  { id: 'red', label: '🔴', value: '#DC2626' },
  { id: 'blue', label: '🔵', value: '#3B82F6' },
  { id: 'green', label: '🟢', value: '#10B981' },
  { id: 'yellow', label: '🟡', value: '#F59E0B' },
  { id: 'purple', label: '🟣', value: '#7C3AED' },
  { id: 'orange', label: '🟠', value: '#EA580C' },
  { id: 'pink', label: '🩷', value: '#EC4899' },
  { id: 'black', label: '⚫', value: '#000000' }
]

const charmItems = [
  { id: 'heart', label: 'Corazón', icon: '❤️' },
  { id: 'bone', label: 'Hueso', icon: '🦴' },
  { id: 'star', label: 'Estrella', icon: '⭐' },
  { id: 'paw', label: 'Patita', icon: '🐾' },
  { id: 'crown', label: 'Corona', icon: '👑' },
  { id: 'bell', label: 'Campanita', icon: '🔔' }
]

// Bordados específicos para cada diseño
const embroideryTypesDesign1 = [
  { id: 'emb1-d1', name: 'Bordado Clásico D1', imageKey: 'design1-emb1', description: 'Diseño elegante tradicional para Diseño 1' },
  { id: 'emb2-d1', name: 'Bordado Floral D1', imageKey: 'design1-emb2', description: 'Diseño con motivos florales para Diseño 1' },
  { id: 'emb3-d1', name: 'Bordado Geométrico D1', imageKey: 'design1-emb3', description: 'Patrones geométricos para Diseño 1' },
  { id: 'emb4-d1', name: 'Bordado Vintage D1', imageKey: 'design1-emb4', description: 'Estilo vintage para Diseño 1' },
  { id: 'emb5-d1', name: 'Bordado Artesanal D1', imageKey: 'design1-emb5', description: 'Hecho a mano para Diseño 1' }
]

const embroideryTypesDesign2 = [
  { id: 'emb1-d2', name: 'Bordado Moderno D2', imageKey: 'design2-emb1', description: 'Diseño moderno específico para Diseño 2' },
  { id: 'emb2-d2', name: 'Bordado Urbano D2', imageKey: 'design2-emb2', description: 'Estilo urbano para Diseño 2' },
  { id: 'emb3-d2', name: 'Bordado Minimalista D2', imageKey: 'design2-emb3', description: 'Diseño minimalista para Diseño 2' },
  { id: 'emb4-d2', name: 'Bordado Contemporáneo D2', imageKey: 'design2-emb4', description: 'Estilo contemporáneo para Diseño 2' },
  { id: 'emb5-d2', name: 'Bordado Elegante D2', imageKey: 'design2-emb5', description: 'Diseño elegante para Diseño 2' }
]

const embroideryTypesDesign3 = [
  { id: 'emb1-d3', name: 'Bordado Combinado A', imageKey: 'design3-emb1', description: 'Primer estilo para diseño combinado' },
  { id: 'emb2-d3', name: 'Bordado Combinado B', imageKey: 'design3-emb2', description: 'Segundo estilo para diseño combinado' },
  { id: 'emb3-d3', name: 'Bordado Combinado C', imageKey: 'design3-emb3', description: 'Tercer estilo para diseño combinado' },
  { id: 'emb4-d3', name: 'Bordado Combinado D', imageKey: 'design3-emb4', description: 'Cuarto estilo para diseño combinado' },
  { id: 'emb5-d3', name: 'Bordado Combinado E', imageKey: 'design3-emb5', description: 'Quinto estilo para diseño combinado' }
]

// Función para obtener los bordados según el diseño seleccionado
const getEmbroideryTypesForDesign = (designId: number) => {
  switch (designId) {
    case 1: return embroideryTypesDesign1
    case 2: return embroideryTypesDesign2
    case 3: return embroideryTypesDesign3
    default: return embroideryTypesDesign1
  }
}

const embroideryTypes = [
  { id: 'emb1', name: 'Bordado Clásico', imageKey: 'design1', description: 'Diseño elegante tradicional' },
  { id: 'emb3', name: 'Bordado Floral', imageKey: 'design3', description: 'Diseño con motivos florales' },
  { id: 'emb4', name: 'Bordado Geométrico', imageKey: 'design4', description: 'Patrones geométricos modernos' },
  { id: 'emb5', name: 'Bordado Vintage', imageKey: 'design5', description: 'Estilo vintage clásico' },
  { id: 'emb6', name: 'Bordado Artesanal', imageKey: 'design6', description: 'Hecho a mano con detalles únicos' }
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
  const [draggedLetter, setDraggedLetter] = useState<string | null>(null)
  const [draggedColor, setDraggedColor] = useState<string | null>(null)
  const [isLetterTypeModalOpen, setIsLetterTypeModalOpen] = useState(false)
  const [isCharmTypeModalOpen, setIsCharmTypeModalOpen] = useState(false)
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false)
  const [zoomImageData, setZoomImageData] = useState<{ src: string; fallback: string; alt: string; title?: string } | null>(null)
  const [customization, setCustomization] = useState<CollarCustomization>({
    designType: null,
    embroideryType: null,
    embroideryDesign1: null,
    embroideryDesign2: null,
    color: { id: '', label: '', value: '' },
    petName: '',
    letterStyle: { id: '', name: '', style: '' },
    charmType: { id: '', name: '', style: '' },
    charms: [],
    size: { id: '', name: '', description: '' },
    secondCollar: {
      petName: '',
      color: { id: '', label: '', value: '' }
    }
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  const steps = [
    'Tipo de Diseño',
    'Tipo de Bordado',
    'Color del Collar', 
    'Letras y Texto',
    'Tamaño'
  ]

  const handleDesignTypeSelect = (design: typeof designTypes[0]) => {
    setCustomization(prev => ({
      ...prev,
      designType: design,
      embroideryType: null, // Reset embroidery when changing design type
      embroideryDesign1: null, // Reset diseño combinado bordados
      embroideryDesign2: null
    }))
  }

  const handleEmbroideryTypeSelect = (embroidery: typeof embroideryTypesDesign1[0] | typeof embroideryTypesDesign2[0] | typeof embroideryTypesDesign3[0]) => {
    setCustomization(prev => ({
      ...prev,
      embroideryType: embroidery
    }))
  }

  // Handlers específicos para diseño combinado
  const handleEmbroideryDesign1Select = (embroidery: typeof embroideryTypesDesign1[0]) => {
    setCustomization(prev => ({
      ...prev,
      embroideryDesign1: embroidery
    }))
  }

  const handleEmbroideryDesign2Select = (embroidery: typeof embroideryTypesDesign2[0]) => {
    setCustomization(prev => ({
      ...prev,
      embroideryDesign2: embroidery
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

  const handleLetterTypeSelect = (letterType: typeof letterTypes[0]) => {
    // Map letter type to style for compatibility
    const styleMapping: { [key: string]: typeof letterStyles[0] } = {
      'type1': letterStyles[0], // Elegante -> Clásica
      'type2': letterStyles[1], // Moderno -> Moderna  
      'type3': letterStyles[2], // Cursivo -> Cursiva
      'type4': letterStyles[3]  // Bold -> Negrita
    }
    
    setCustomization(prev => ({
      ...prev,
      letterStyle: styleMapping[letterType.id] || letterStyles[0]
    }))
    setIsLetterTypeModalOpen(false)
  }

  const handleCharmTypeSelect = (charmType: typeof charmTypes[0]) => {
    // Map charm type to style
    const charmStyleMapping: { [key: string]: { id: string; name: string; style: string } } = {
      'charm1': { id: 'charm1', name: 'Básicos', style: 'charm-basic' },
      'charm2': { id: 'charm2', name: 'Coloridos', style: 'charm-colorful' },
      'charm3': { id: 'charm3', name: 'Metálicos', style: 'charm-metallic' },
      'charm4': { id: 'charm4', name: 'Premium', style: 'charm-premium' }
    }
    
    setCustomization(prev => ({
      ...prev,
      charmType: charmStyleMapping[charmType.id] || charmStyleMapping['charm1']
    }))
    setIsCharmTypeModalOpen(false)
  }

  const handleZoomImage = (embroidery: any, title: string) => {
    const imageData = getImageSrc('featured', embroidery.imageKey)
    setZoomImageData({
      src: imageData.src,
      fallback: imageData.fallback,
      alt: imageData.alt,
      title: `${title} - ${embroidery.name}`
    })
    setIsImageZoomOpen(true)
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, letter: string) => {
    // Solo permitir drag si ya se seleccionaron ambos tipos
    if (!customization.letterStyle.id || !customization.charmType.id) {
      e.preventDefault()
      return
    }
    setDraggedLetter(letter)
    setDraggedColor(null)
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleColorDragStart = (e: React.DragEvent<HTMLDivElement>, colorId: string) => {
    // Solo permitir drag si ya se seleccionaron ambos tipos
    if (!customization.letterStyle.id || !customization.charmType.id) {
      e.preventDefault()
      return
    }
    setDraggedColor(colorId)
    setDraggedLetter(null)
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleDropOnName = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (Array.from(customization.petName).length < 12) {
      if (draggedLetter) {
        setCustomization(prev => ({
          ...prev,
          petName: prev.petName + draggedLetter
        }))
      } else if (draggedColor) {
        const colorEmoji = typicalColors.find(c => c.id === draggedColor)?.label || '🔴'
        setCustomization(prev => ({
          ...prev,
          petName: prev.petName + colorEmoji
        }))
      }
    }
    setDraggedLetter(null)
    setDraggedColor(null)
  }

  const handleRemoveLetter = (index: number) => {
    setCustomization(prev => {
      const characters = Array.from(prev.petName)
      characters.splice(index, 1)
      return {
        ...prev,
        petName: characters.join('')
      }
    })
  }

  const handleClearName = () => {
    setCustomization(prev => ({
      ...prev,
      petName: ''
    }))
  }

  // Second collar handlers for combined design
  const handleDropOnSecondCollar = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (Array.from(customization.secondCollar.petName).length < 12) {
      if (draggedLetter) {
        setCustomization(prev => ({
          ...prev,
          secondCollar: {
            ...prev.secondCollar,
            petName: prev.secondCollar.petName + draggedLetter
          }
        }))
      } else if (draggedColor) {
        const colorEmoji = typicalColors.find(c => c.id === draggedColor)?.label || '🔴'
        const selectedColor = typicalColors.find(c => c.id === draggedColor)
        setCustomization(prev => ({
          ...prev,
          secondCollar: {
            ...prev.secondCollar,
            petName: prev.secondCollar.petName + colorEmoji,
            color: selectedColor || { id: '', label: '', value: '' }
          }
        }))
      }
    }
    setDraggedLetter(null)
    setDraggedColor(null)
  }

  const handleRemoveSecondCollarLetter = (index: number) => {
    setCustomization(prev => {
      const characters = Array.from(prev.secondCollar.petName)
      characters.splice(index, 1)
      return {
        ...prev,
        secondCollar: {
          ...prev.secondCollar,
          petName: characters.join('')
        }
      }
    })
  }

  const handleClearSecondCollarName = () => {
    setCustomization(prev => ({
      ...prev,
      secondCollar: {
        ...prev.secondCollar,
        petName: ''
      }
    }))
  }

  const handleCharmToggle = (charm: typeof charmItems[0]) => {
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

  // Check if current design type requires color selection
  const requiresColor = () => {
    return customization.designType && customization.designType.id !== 2
  }

  const getActiveStepLabel = () => {
    // For Diseño2, skip color step in display
    if (customization.designType?.id === 2 && currentStep === 2) {
      return steps[3] // Show letters step instead of color
    }
    return steps[currentStep]
  }

  const getActiveStepNumber = () => {
    // For Diseño2, adjust step numbers when color is skipped
    if (customization.designType?.id === 2) {
      if (currentStep <= 1) return currentStep + 1
      if (currentStep === 3) return 3 // Letters step shows as step 3
      if (currentStep === 4) return 4 // Size step shows as step 4
    }
    return currentStep + 1
  }

  // Check if current design type requires embroidery selection
  const requiresEmbroidery = () => {
    return customization.designType && (customization.designType.id === 1 || customization.designType.id === 2 || customization.designType.id === 3)
  }

  const canProceed = () => {
    switch(currentStep) {
      case 0: return customization.designType !== null
      case 1: {
        if (!requiresEmbroidery()) return true
        // Para diseño combinado, requiere ambos bordados
        if (customization.designType?.id === 3) {
          return customization.embroideryDesign1 !== null && customization.embroideryDesign2 !== null
        }
        return customization.embroideryType !== null
      }
      case 2: return !requiresColor() || customization.color.id !== ''
      case 3: {
        const baseRequirements = customization.petName.trim() !== '' && customization.letterStyle.id !== '' && customization.charmType.id !== ''
        // For combined design (design 3), also require second collar to have a name
        if (customization.designType?.id === 3) {
          return baseRequirements && customization.secondCollar.petName.trim() !== ''
        }
        return baseRequirements
      }
      case 4: return customization.size.id !== ''
      default: return false
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1 && canProceed()) {
      let nextStepIndex = currentStep + 1
      
      // Skip color step if Diseño2 is selected (go directly from embroidery to letters)
      if (currentStep === 1 && customization.designType?.id === 2) {
        nextStepIndex = 3 // Skip step 2 (color) and go to step 3 (letters)
      }
      
      setCurrentStep(nextStepIndex)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      let prevStepIndex = currentStep - 1
      
      // Skip color step when going back if Diseño2 is selected
      if (currentStep === 3 && customization.designType?.id === 2) {
        prevStepIndex = 1 // Skip step 2 (color) and go back to step 1 (embroidery)
      }
      
      setCurrentStep(prevStepIndex)
    }
  }

  const handleConfirmOrder = () => {
    const phoneNumber = '526143663694'
    
    let message = `Hola! Quiero ordenar un collar personalizado para mi mascota:

DETALLES DEL DISEÑO:
- Tipo de Diseño: ${customization.designType?.name || 'No seleccionado'}`

    // Mostrar bordados según el tipo de diseño
    if (customization.designType?.id === 3) {
      // Diseño combinado - mostrar ambos bordados
      message += `
- Bordado Diseño 1: ${customization.embroideryDesign1?.name || 'No seleccionado'}
- Bordado Diseño 2: ${customization.embroideryDesign2?.name || 'No seleccionado'}`
    } else if (requiresEmbroidery() && customization.embroideryType) {
      // Otros diseños que requieren bordado
      message += `
- Tipo de Bordado: ${customization.embroideryType.name}`
    }

    message += `
- Color: ${customization.color.label || 'No seleccionado'}`

    // Para diseño combinado, mostrar ambos collares
    if (customization.designType?.id === 3) {
      message += `
- PRIMER COLLAR: ${customization.petName || 'No definido'}
- SEGUNDO COLLAR: ${customization.secondCollar.petName || 'No definido'}`
    } else {
      message += `
- Nombre: ${customization.petName || 'No definido'}`
    }

    message += `
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
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Elige tu Tipo de Diseño
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                  <div className="p-3 text-center">
                    <div className="w-full h-96 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl shadow-inner mb-3 overflow-hidden relative">
                      <PatitasImage
                        src={getImageSrc('featured', design.imageKey).src}
                        fallback={getImageSrc('featured', design.imageKey).fallback}
                        alt={design.name}
                        width={500}
                        height={600}
                        className="w-full h-full object-contain absolute inset-0 p-2"
                      />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{design.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{design.description}</p>
                    {customization.designType?.id === design.id && (
                      <span className="inline-block bg-pink-500 text-white px-3 py-1 rounded-full text-sm">
                        ✓ Seleccionado
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 1:
        // Only show embroidery step for Designo1, Design2 and Combinado
        if (!requiresEmbroidery()) {
          return null
        }
        
        // Para diseño combinado (Opción B): mostrar ambos grupos en una sola pantalla
        if (customization.designType?.id === 3) {
          return (
            <div>
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Selecciona los Bordados para el Diseño Combinado
              </h3>
              <p className="text-center text-gray-600 mb-8">
                Elige un bordado del Diseño 1 y uno del Diseño 2
              </p>
              
              <div className="space-y-12">
                {/* Bordados Diseño 1 */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-700 mb-6 text-center">
                    Bordados Diseño 1 {customization.embroideryDesign1 && '(✓ Seleccionado)'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {embroideryTypesDesign1.map((embroidery) => (
                      <div
                        key={embroidery.id}
                        className={`relative overflow-hidden rounded-xl border-3 transition-all duration-300 cursor-pointer ${
                          customization.embroideryDesign1?.id === embroidery.id
                            ? 'border-pink-400 bg-pink-50 shadow-lg scale-[1.02]'
                            : 'border-gray-200 hover:border-pink-200 hover:shadow-md'
                        }`}
                        onClick={() => handleEmbroideryDesign1Select(embroidery)}
                      >
                        <div className="p-3 text-center">
                          <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-inner mb-3 overflow-hidden relative group">
                            <PatitasImage
                              src={getImageSrc('featured', embroidery.imageKey).src}
                              fallback={getImageSrc('featured', embroidery.imageKey).fallback}
                              alt={embroidery.name}
                              width={400}
                              height={400}
                              className="w-full h-full absolute inset-0"
                            />
                            {/* Botón de zoom */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleZoomImage(embroidery, 'Bordados Diseño 1')
                              }}
                              className="absolute top-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 transform hover:scale-110"
                              aria-label="Ver imagen ampliada"
                            >
                              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </button>
                          </div>
                          <h5 className="text-sm font-bold text-gray-800 mb-2">{embroidery.name}</h5>
                          <p className="text-xs text-gray-600 mb-3">{embroidery.description}</p>
                          {customization.embroideryDesign1?.id === embroidery.id && (
                            <span className="inline-block bg-pink-500 text-white px-2 py-1 rounded-full text-xs">
                              ✓ Seleccionado
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Bordados Diseño 2 */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-700 mb-6 text-center">
                    Bordados Diseño 2 {customization.embroideryDesign2 && '(✓ Seleccionado)'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {embroideryTypesDesign2.map((embroidery) => (
                      <div
                        key={embroidery.id}
                        className={`relative overflow-hidden rounded-xl border-3 transition-all duration-300 cursor-pointer ${
                          customization.embroideryDesign2?.id === embroidery.id
                            ? 'border-purple-400 bg-purple-50 shadow-lg scale-[1.02]'
                            : 'border-gray-200 hover:border-purple-200 hover:shadow-md'
                        }`}
                        onClick={() => handleEmbroideryDesign2Select(embroidery)}
                      >
                        <div className="p-3 text-center">
                          <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-inner mb-3 overflow-hidden relative group">
                            <PatitasImage
                              src={getImageSrc('featured', embroidery.imageKey).src}
                              fallback={getImageSrc('featured', embroidery.imageKey).fallback}
                              alt={embroidery.name}
                              width={400}
                              height={400}
                              className="w-full h-full absolute inset-0"
                            />
                            {/* Botón de zoom */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleZoomImage(embroidery, 'Bordados Diseño 2')
                              }}
                              className="absolute top-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 transform hover:scale-110"
                              aria-label="Ver imagen ampliada"
                            >
                              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </button>
                          </div>
                          <h5 className="text-sm font-bold text-gray-800 mb-2">{embroidery.name}</h5>
                          <p className="text-xs text-gray-600 mb-3">{embroidery.description}</p>
                          {customization.embroideryDesign2?.id === embroidery.id && (
                            <span className="inline-block bg-purple-500 text-white px-2 py-1 rounded-full text-xs">
                              ✓ Seleccionado
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        }
        
        // Para otros diseños, mostrar bordados normalmente
        return (
          <div>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Selecciona el Tipo de Bordado
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {getEmbroideryTypesForDesign(customization.designType?.id || 1).map((embroidery) => (
                <div
                  key={embroidery.id}
                  className={`relative overflow-hidden rounded-xl border-3 transition-all duration-300 cursor-pointer ${
                    customization.embroideryType?.id === embroidery.id
                      ? 'border-pink-400 bg-pink-50 shadow-lg scale-[1.02]'
                      : 'border-gray-200 hover:border-pink-200 hover:shadow-md'
                  }`}
                  onClick={() => handleEmbroideryTypeSelect(embroidery)}
                >
                    <div className="p-3 text-center">
                      <div className="w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-inner mb-3 overflow-hidden relative group">
                        <PatitasImage
                          src={getImageSrc('featured', embroidery.imageKey).src}
                          fallback={getImageSrc('featured', embroidery.imageKey).fallback}
                          alt={embroidery.name}
                          width={500}
                          height={600}
                          className="w-full h-full absolute inset-0"
                        />
                        {/* Botón de zoom */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleZoomImage(embroidery, 'Bordados')
                          }}
                          className="absolute top-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 transform hover:scale-110"
                          aria-label="Ver imagen ampliada"
                        >
                          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </button>
                      </div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">{embroidery.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{embroidery.description}</p>
                    {customization.embroideryType?.id === embroidery.id && (
                      <span className="inline-block bg-pink-500 text-white px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm">
                        ✓ Seleccionado
                      </span>
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
              Selecciona el Color del Collar
            </h3>
            
            <div className="space-y-8">
              {/* Colores Sólidos */}
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Colores Sólidos</h4>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10 gap-3 max-w-5xl mx-auto">
                  {colors.filter(color => color.type === 'solid').map((color) => (
                    <div
                      key={color.id}
                      className={`relative p-2 rounded-xl border-2 cursor-pointer transition-all ${
                        customization.color.id === color.id
                          ? 'border-pink-500 bg-pink-50 shadow-lg'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                      onClick={() => handleColorSelect(color)}
                    >
                      <div className="text-center">
                        <div 
                          className="w-10 h-10 rounded-full mx-auto mb-2 border-2 border-white shadow-md"
                          style={{ 
                            background: color.value.includes('gradient') ? color.value : color.value,
                            border: color.id === 'white' ? '2px solid #e5e7eb' : '2px solid white'
                          }}
                        ></div>
                        <h5 className="text-xs font-medium text-gray-800 leading-tight">{color.label}</h5>
                        {customization.color.id === color.id && (
                          <div className="mt-1">
                            <span className="text-pink-500 text-xs font-medium">✓</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colores Multicolor */}
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Colores Multicolor</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  {colors.filter(color => color.type === 'multicolor').map((color) => (
                    <div
                      key={color.id}
                      className={`relative p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        customization.color.id === color.id
                          ? 'border-pink-500 bg-pink-50 shadow-lg'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                      onClick={() => handleColorSelect(color)}
                    >
                      <div className="text-center">
                        <div 
                          className="w-12 h-12 rounded-full mx-auto mb-3 border-2 border-white shadow-md"
                          style={{ 
                            background: color.value
                          }}
                        ></div>
                        <h5 className="text-sm font-medium text-gray-800">{color.label}</h5>
                        {customization.color.id === color.id && (
                          <div className="mt-1">
                            <span className="text-pink-500 text-sm font-medium">✓ Seleccionado</span>
                          </div>
                        )}
                      </div>
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
              Personaliza las Letras
              {customization.designType?.id === 3 && (
                <span className="block text-base font-normal text-gray-600 mt-2">
                  Diseño Combinado - Dos Collares
                </span>
              )}
            </h3>
            <div className="space-y-8">
              
              {/* Selección de Tipos - 50/50 Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Tipo de Letra - 50% */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Tipo de Letra
                  </label>
                  <div className="text-center">
                    {customization.letterStyle.id ? (
                      <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <span className="text-green-500 text-xl">✓</span>
                          <span className="text-sm font-semibold text-gray-800">
                            {customization.letterStyle.name}
                          </span>
                        </div>
                        <button
                          onClick={() => setIsLetterTypeModalOpen(true)}
                          className="text-pink-500 hover:text-pink-600 underline text-sm"
                        >
                          Cambiar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsLetterTypeModalOpen(true)}
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-xl"
                      >
                        Seleccionar Tipo de Letra
                      </button>
                    )}
                  </div>
                </div>

                {/* Tipo de Charm - 50% */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Tipo de Charm
                  </label>
                  <div className="text-center">
                    {customization.charmType.id ? (
                      <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <span className="text-green-500 text-xl">✓</span>
                          <span className="text-sm font-semibold text-gray-800">
                            {customization.charmType.name}
                          </span>
                        </div>
                        <button
                          onClick={() => setIsCharmTypeModalOpen(true)}
                          className="text-pink-500 hover:text-pink-600 underline text-sm"
                        >
                          Cambiar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsCharmTypeModalOpen(true)}
                        className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-xl"
                      >
                        Seleccionar Tipo de Charm
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Nombre de la Mascota - Drag & Drop (solo si ambos tipos están seleccionados) */}
              {customization.letterStyle.id && customization.charmType.id && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-lg font-semibold text-gray-700">
                      Nombre de tu Mascota
                    </label>
                    <button
                      onClick={handleClearName}
                      className="text-sm text-gray-500 hover:text-pink-500 underline"
                    >
                      Limpiar
                    </button>
                  </div>
                  
                  {/* Área de construcción del nombre */}
                  <div
                    className="w-full min-h-[80px] p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 mb-4 flex items-center justify-center flex-wrap gap-2"
                    onDragOver={handleDragOver}
                    onDrop={handleDropOnName}
                  >
                    {Array.from(customization.petName).length === 0 ? (
                      <span className="text-gray-400 text-lg">
                        Arrastra letras y colores aquí
                      </span>
                    ) : (
                      Array.from(customization.petName).map((char, index) => (
                        <div
                          key={`${char}-${index}`}
                          className={`relative bg-white border-2 border-pink-300 rounded-lg px-3 py-2 text-2xl font-bold text-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                            /[A-Z]/.test(char) ? customization.letterStyle.style : ''
                          }`}
                          onClick={() => handleRemoveLetter(index)}
                          title="Clic para eliminar"
                        >
                          {char}
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            ×
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-6">
                    Máximo 12 caracteres • Clic para eliminar • Caracteres: {Array.from(customization.petName).length}/12
                  </p>

                  {/* Grid de Letras y Colores */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Alfabeto para arrastrar */}
                    <div>
                      <h4 className="text-md font-semibold text-gray-700 mb-3">
                        Letras:
                      </h4>
                      <div className="grid grid-cols-6 sm:grid-cols-7 gap-2">
                        {alphabet.map((letter) => (
                          <div
                            key={letter}
                            draggable={Array.from(customization.petName).length < 12}
                            onDragStart={(e) => handleDragStart(e, letter)}
                            className={`bg-white border-2 border-gray-300 rounded-lg px-2 py-2 text-lg font-bold text-center cursor-grab active:cursor-grabbing hover:bg-pink-50 hover:border-pink-300 transition-all ${
                              Array.from(customization.petName).length >= 12 ? 'opacity-50 cursor-not-allowed' : ''
                            } ${customization.letterStyle.style}`}
                            title={Array.from(customization.petName).length >= 12 ? 'Máximo alcanzado' : `Arrastra ${letter}`}
                          >
                            {letter}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Colores típicos para arrastrar */}
                    <div>
                      <h4 className="text-md font-semibold text-gray-700 mb-3">
                        Colores:
                      </h4>
                      <div className="grid grid-cols-4 gap-3">
                        {typicalColors.map((colorItem) => (
                          <div
                            key={colorItem.id}
                            draggable={Array.from(customization.petName).length < 12}
                            onDragStart={(e) => handleColorDragStart(e, colorItem.id)}
                            className={`bg-white border-2 border-gray-300 rounded-lg px-3 py-3 text-2xl text-center cursor-grab active:cursor-grabbing hover:bg-purple-50 hover:border-purple-300 transition-all ${
                              Array.from(customization.petName).length >= 12 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            title={Array.from(customization.petName).length >= 12 ? 'Máximo alcanzado' : `Arrastra ${colorItem.label}`}
                          >
                            {colorItem.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Segundo Collar (solo para diseño combinado) */}
                  {customization.designType?.id === 3 && (
                    <div className="mt-8">
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-lg font-semibold text-gray-700">
                        Segundo Collar
                      </label>
                      <button
                        onClick={handleClearSecondCollarName}
                        className="text-sm text-gray-500 hover:text-purple-500 underline"
                      >
                        Limpiar
                      </button>
                    </div>
                    
                    {/* Área de construcción del segundo collar */}
                    <div
                      className="w-full min-h-[80px] p-4 border-2 border-dashed border-purple-300 rounded-xl bg-purple-50 mb-4 flex items-center justify-center flex-wrap gap-2"
                      onDragOver={handleDragOver}
                      onDrop={handleDropOnSecondCollar}
                    >
                      {Array.from(customization.secondCollar.petName).length === 0 ? (
                        <span className="text-gray-400 text-lg">
                          Arrastra letras y colores aquí
                        </span>
                      ) : (
                        Array.from(customization.secondCollar.petName).map((char, index) => (
                          <div
                            key={`second-${char}-${index}`}
                            className={`relative bg-white border-2 border-purple-300 rounded-lg px-3 py-2 text-2xl font-bold text-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                              /[A-Z]/.test(char) ? customization.letterStyle.style : ''
                            }`}
                            onClick={() => handleRemoveSecondCollarLetter(index)}
                            title="Clic para eliminar"
                          >
                            {char}
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              ×
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-6">
                      Máximo 12 caracteres • Clic para eliminar • Caracteres: {Array.from(customization.secondCollar.petName).length}/12
                    </p>
                  </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal para selección de tipo de letra */}
            {isLetterTypeModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">
                        Selecciona el Tipo de Letra
                      </h3>
                      <button
                        onClick={() => setIsLetterTypeModalOpen(false)}
                        className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {letterTypes.map((letterType) => (
                        <div
                          key={letterType.id}
                          className="border-2 border-gray-200 rounded-xl p-4 cursor-pointer hover:border-pink-300 hover:shadow-lg transition-all"
                          onClick={() => handleLetterTypeSelect(letterType)}
                        >
                          <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center">
                            <PatitasImage
                              src={getImageSrc('materials', letterType.imageKey).src}
                              fallback={getImageSrc('materials', letterType.imageKey).fallback}
                              alt={letterType.name}
                              width={300}
                              height={200}
                              className="w-full h-full object-contain rounded-xl"
                            />
                          </div>
                          <h4 className="text-lg font-bold text-gray-800 mb-2">{letterType.name}</h4>
                          <p className="text-sm text-gray-600">{letterType.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal para selección de tipo de charm */}
            {isCharmTypeModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">
                        Selecciona el Tipo de Charm
                      </h3>
                      <button
                        onClick={() => setIsCharmTypeModalOpen(false)}
                        className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {charmTypes.map((charmType) => (
                        <div
                          key={charmType.id}
                          className="border-2 border-gray-200 rounded-xl p-4 cursor-pointer hover:border-purple-300 hover:shadow-lg transition-all"
                          onClick={() => handleCharmTypeSelect(charmType)}
                        >
                          <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl mb-4 flex items-center justify-center">
                            <PatitasImage
                              src={getImageSrc('charms', charmType.imageKey).src}
                              fallback={getImageSrc('charms', charmType.imageKey).fallback}
                              alt={charmType.name}
                              width={300}
                              height={200}
                              className="w-full h-full object-contain rounded-xl"
                            />
                          </div>
                          <h4 className="text-lg font-bold text-gray-800 mb-2">{charmType.name}</h4>
                          <p className="text-sm text-gray-600">{charmType.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
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
              {steps.map((step, index) => {
                // Skip embroidery step in display if not required
                if (index === 1 && !requiresEmbroidery()) {
                  return null
                }
                
                let adjustedIndex = index
                if (!requiresEmbroidery() && index > 1) {
                  adjustedIndex = index - 1
                }
                
                return (
                  <div key={index} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      adjustedIndex === currentStep 
                        ? 'bg-pink-500 text-white'
                        : adjustedIndex < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {adjustedIndex < currentStep ? '✓' : adjustedIndex + 1}
                    </div>
                    {index < steps.length - 1 && (index !== 0 || requiresEmbroidery()) && (
                      <div className={`w-8 h-1 mx-2 ${
                        adjustedIndex < currentStep ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          <p className="text-center text-gray-600 font-medium">
            Paso {getActiveStepNumber()} de {requiresColor() ? steps.length : steps.length - 1}: {getActiveStepLabel()}
          </p>
        </div>

        <div className={`grid gap-8 ${currentStep >= 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
          {/* Step content */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
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

          {/* Live preview - only show from colors step onward */}
          {currentStep >= 2 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
                Vista Previa en Vivo
              </h3>
              <div className="text-center">
                {/* Primera imagen del collar */}
                <div className="inline-block bg-gray-100 rounded-lg p-8 mb-6">
                  <PatitasImage
                    src={customization.designType?.id === 3 && customization.embroideryDesign1 ?
                         getImageSrc('featured', customization.embroideryDesign1.imageKey).src :
                         customization.embroideryType ? getImageSrc('featured', customization.embroideryType.imageKey).src :
                         customization.designType ? getImageSrc('featured', customization.designType.imageKey).src : 
                         getImageSrc('featured', 'collar-1').src}
                    fallback={customization.designType?.id === 3 && customization.embroideryDesign1 ?
                             getImageSrc('featured', customization.embroideryDesign1.imageKey).fallback :
                             customization.embroideryType ? getImageSrc('featured', customization.embroideryType.imageKey).fallback :
                             customization.designType ? getImageSrc('featured', customization.designType.imageKey).fallback : 
                             getImageSrc('featured', 'collar-1').fallback}
                    alt="Preview del collar"
                    width={300}
                    height={200}
                    className="rounded-lg"
                  />
                  {customization.designType?.id === 3 && (
                    <p className="text-sm text-gray-600 mt-2">Collar con {customization.embroideryDesign1?.name || 'Bordado 1'}</p>
                  )}
                </div>

                {/* Segundo collar solo para diseño combinado */}
                {customization.designType?.id === 3 && (
                  <div className="inline-block bg-gray-100 rounded-lg p-8 mb-6 ml-4">
                    <PatitasImage
                      src={customization.embroideryDesign2 ? getImageSrc('featured', customization.embroideryDesign2.imageKey).src :
                           getImageSrc('featured', 'collar-1').src}
                      fallback={customization.embroideryDesign2 ? getImageSrc('featured', customization.embroideryDesign2.imageKey).fallback :
                               getImageSrc('featured', 'collar-1').fallback}
                      alt="Preview del segundo collar"
                      width={300}
                      height={200}
                      className="rounded-lg"
                    />
                    <p className="text-sm text-gray-600 mt-2">Collar con {customization.embroideryDesign2?.name || 'Bordado 2'}</p>
                  </div>
                )}
                
                {/* Preview details */}
                <div className="mt-6 space-y-2">
                  <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
                    {/* Primer collar */}
                    <div className="bg-pink-50 rounded-lg p-4">
                      <h4 className={`text-lg font-semibold text-gray-800 ${customization.letterStyle.style}`}>
                        {customization.designType?.id === 3 ? 'Primer Collar:' : ''} {customization.petName || 'Nombre de tu Mascota'}
                      </h4>
                    </div>
                    
                    {/* Segundo collar solo para diseño combinado */}
                    {customization.designType?.id === 3 && (
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className={`text-lg font-semibold text-gray-800 ${customization.letterStyle.style}`}>
                          Segundo Collar: {customization.secondCollar.petName || 'Sin nombre'}
                        </h4>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-gray-600 space-y-1 mt-4">
                    <p><strong>Diseño:</strong> {customization.designType?.name || 'No seleccionado'}</p>
                    
                    {/* Mostrar bordados según tipo de diseño */}
                    {customization.designType?.id === 3 ? (
                      <>
                        <p><strong>Bordado Diseño 1:</strong> {customization.embroideryDesign1?.name || 'No seleccionado'}</p>
                        <p><strong>Bordado Diseño 2:</strong> {customization.embroideryDesign2?.name || 'No seleccionado'}</p>
                      </>
                    ) : (
                      requiresEmbroidery() && (
                        <p><strong>Bordado:</strong> {customization.embroideryType?.name || 'No seleccionado'}</p>
                      )
                    )}
                    <p><strong>Color:</strong> {customization.color.label || 'No seleccionado'}</p>
                    <p><strong>Estilo:</strong> {customization.letterStyle.name || 'No seleccionado'}</p>
                    <p><strong>Charms:</strong> {customization.charms.length > 0 ? customization.charms.map(c => c.label).join(', ') : 'Ninguno'}</p>
                    <p><strong>Tamaño:</strong> {customization.size.name || 'No seleccionado'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal para vista previa final */}
        <DesignPreviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageUrl={customization.designType?.id === 3 && customization.embroideryDesign1 ?
                   getImageSrc('featured', customization.embroideryDesign1.imageKey).src :
                   customization.embroideryType ? getImageSrc('featured', customization.embroideryType.imageKey).src : 
                   customization.designType ? getImageSrc('featured', customization.designType.imageKey).src : ''}
          designDetails={{
            color: customization.color.label || 'No seleccionado',
            font: customization.letterStyle.name || 'No seleccionado',
            petName: customization.designType?.id === 3 ?
                     `Collar 1: ${customization.petName || 'Sin nombre'} | Collar 2: ${customization.secondCollar.petName || 'Sin nombre'}` :
                     customization.petName || 'Nombre no definido',
            charm: customization.charms.length > 0 ? customization.charms.map(c => c.label).join(', ') : 'Ninguno'
          }}
          onConfirmOrder={handleConfirmOrder}
          onDownload={handleDownload}
        />

        {/* Modal de vista ampliada de imágenes */}
        <ImageZoomModal
          isOpen={isImageZoomOpen}
          onClose={() => setIsImageZoomOpen(false)}
          imageData={zoomImageData || { src: '', fallback: '', alt: '' }}
        />
      </div>
    </section>
  )
}