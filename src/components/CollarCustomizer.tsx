'use client'
// Fixed JSX errors

import { useState, useRef } from 'react'
import { Button } from './ui/Button'
import DesignPreviewModal from './DesignPreviewModal'
import ImageZoomModal from './ImageZoomModal'
import PatitasImage from './ui/PatitasImage'
import { getImageSrc } from '@/lib/images'

type CollarCharacterItem = {
  id: string
  type: 'letter' | 'charmColor'
  value: string
  color?: string
  label?: string
}

let _itemIdCounter = 0
const nextItemId = () => `item-${++_itemIdCounter}-${Date.now()}`

interface CollarCustomization {
  designType: null | { id: number; name: string; imageKey: string; description: string }
  embroideryType: null | { id: string; name: string; imageKey: string; description: string }
  // Bordados separados para diseño combinado
  embroideryDesign1: null | { id: string; name: string; imageKey: string; description: string }
  embroideryDesign2: null | { id: string; name: string; imageKey: string; description: string }
  color: { id: string; label: string; value: string }
  petName: string
  petNameItems: CollarCharacterItem[]
  letterStyle: { id: string; name: string; style: string; imageKey: string }
  letterColor: { id: string; label: string; value: string }
  charmType: { id: string; name: string; style: string; imageKey: string }
  charms: { id: string; label: string; icon: string }[]
  size: { id: string; name: string; description: string; price: number }
  // Second collar for combined design
  secondCollar: {
    petName: string
    nameItems: CollarCharacterItem[]
    color: { id: string; label: string; value: string }
  }
}

const designTypes = [
  { 
    id: 1, 
    name: 'Bordado', 
    imageKey: 'design1',
    description: 'Collar con bordado decorativo en la parte inferior'
  },
  { 
    id: 2, 
    name: 'Sin Bordado', 
    imageKey: 'design2', 
    description: 'Diseño sencillo y minimalista, sin bordados adicionales'
  },
  { 
    id: 3, 
    name: 'Combinado', 
    imageKey: 'design3', 
    description: 'Dos collares personalizados con diferentes bordados'
  }
]

const colors = [
  // Colores Sólidos - Primera fila
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
  
  // Colores Sólidos - Segunda fila
  { id: 'orange', label: 'Naranja', value: '#EA580C', type: 'solid' },
  { id: 'white', label: 'Blanco', value: '#FFFFFF', type: 'solid' },
  { id: 'gray', label: 'Gris', value: '#6B7280', type: 'solid' },
  { id: 'teal', label: 'Verde Azulado', value: '#0D9488', type: 'solid' },
  { id: 'lime', label: 'Verde Limón', value: '#84CC16', type: 'solid' },
  { id: 'cyan', label: 'Cian', value: '#06B6D4', type: 'solid' },
  { id: 'indigo', label: 'Índigo', value: '#4338CA', type: 'solid' },
  { id: 'rose', label: 'Rosa Pálido', value: '#F43F5E', type: 'solid' },
  { id: 'amber', label: 'Ámbar', value: '#F59E0B', type: 'solid' },
  
  // Colores Sólidos - Tercera fila
  { id: 'slate', label: 'Pizarra', value: '#475569', type: 'solid' },
  
  // Colores Multicolor - Primera fila
  { id: 'multi_pink_purple', label: 'Rosa-Púrpura', value: 'linear-gradient(45deg, #EC4899, #A855F7)', type: 'multicolor' },
  { id: 'multi_red_fire', label: 'Rojo Fuego', value: 'linear-gradient(45deg, #DC2626, #F59E0B)', type: 'multicolor' },
  { id: 'multi_arcoiris', label: 'Arcoíris', value: 'linear-gradient(45deg, #06B6D4, #10B981, #F59E0B)', type: 'multicolor' },
  { id: 'multi_lime_yellow', label: 'Lima-Amarillo', value: 'linear-gradient(45deg, #84CC16, #F59E0B)', type: 'multicolor' },
  { id: 'multi_gray_diamond', label: 'Gris Diamante', value: 'linear-gradient(45deg, #6B7280, #D1D5DB)', type: 'multicolor' },
  { id: 'multi_blue_electric', label: 'Azul Eléctrico', value: 'linear-gradient(45deg, #1E40AF, #3B82F6)', type: 'multicolor' },
  { id: 'multi_sky_pattern', label: 'Patrón Cielo', value: 'linear-gradient(45deg, #0EA5E9, #7DD3FC)', type: 'multicolor' },
  { id: 'multi_purple_galaxy', label: 'Púrpura Galaxia', value: 'linear-gradient(45deg, #581C87, #A855F7)', type: 'multicolor' },
  { id: 'multi_forest_camo', label: 'Camuflaje Bosque', value: 'linear-gradient(45deg, #1F2937, #065F46)', type: 'multicolor' },
  { id: 'multi_orange_sunset', label: 'Atardecer Naranja', value: 'linear-gradient(45deg, #EA580C, #F97316)', type: 'multicolor' },
  
  // Colores Multicolor - Segunda fila
  { id: 'multi_mint_fresh', label: 'Menta Fresco', value: 'linear-gradient(45deg, #059669, #6EE7B7)', type: 'multicolor' },
  { id: 'multi_royal_blue', label: 'Azul Real', value: 'linear-gradient(45deg, #1E3A8A, #3B82F6)', type: 'multicolor' },
  { id: 'multi_pink_candy', label: 'Rosa Dulce', value: 'linear-gradient(45deg, #EC4899, #F9A8D4)', type: 'multicolor' },
  { id: 'multi_chocolate_brown', label: 'Café Chocolate', value: 'linear-gradient(45deg, #78350F, #A16207)', type: 'multicolor' },
  { id: 'multi_turquoise_wave', label: 'Onda Turquesa', value: 'linear-gradient(45deg, #0F766E, #5EEAD4)', type: 'multicolor' },
  { id: 'multi_neon_mix', label: 'Mezcla Neón', value: 'linear-gradient(45deg, #10B981, #3B82F6)', type: 'multicolor' },
  { id: 'multi_military_green', label: 'Verde Militar', value: 'linear-gradient(45deg, #1F2937, #047857)', type: 'multicolor' },
  { id: 'multi_arctic_blue', label: 'Azul Ártico', value: 'linear-gradient(45deg, #075985, #BAE6FD)', type: 'multicolor' },
  { id: 'multi_purple_pink', label: 'Púrpura-Rosa', value: 'linear-gradient(45deg, #7C3AED, #EC4899)', type: 'multicolor' },
  { id: 'multi_black_gray', label: 'Negro-Gris', value: 'linear-gradient(45deg, #000000, #6B7280)', type: 'multicolor' },
  
  // Colores Multicolor - Tercera fila (parcial)
  { id: 'multi_azul_blanco', label: 'Azul-Blanco', value: 'linear-gradient(45deg, #3B82F6, #DBEAFE)', type: 'multicolor' },
  { id: 'multi_verde_amarillo', label: 'Verde-Amarillo', value: 'linear-gradient(45deg, #84CC16, #F59E0B)', type: 'multicolor' }
]

const letterStyles = [
  { id: 'classic', name: 'Clásica', style: 'font-serif text-2xl', imageKey: 'style1' },
  { id: 'modern', name: 'Moderna', style: 'font-sans text-2xl font-bold', imageKey: 'style2' },
  { id: 'script', name: 'Cursiva', style: 'font-script text-2xl italic', imageKey: 'style3' },
  { id: 'bold', name: 'Negrita', style: 'font-sans text-2xl font-extrabold', imageKey: 'style4' }
]

const letterTypes = [
  { 
    id: 'type1', 
    name: 'Tipo Elegante', 
    imageKey: 'style1',
    description: 'Letras elegantes con serifs'
  },
  { 
    id: 'type2', 
    name: 'Tipo Moderno', 
    imageKey: 'style2',
    description: 'Letras modernas sans-serif'
  },
  { 
    id: 'type3', 
    name: 'Tipo Cursivo', 
    imageKey: 'style3',
    description: 'Letras cursivas y estilizadas'
  },
  { 
    id: 'type4', 
    name: 'Tipo Bold', 
    imageKey: 'style4',
    description: 'Letras gruesas y llamativas'
  }
]

const charmTypes = [
  { id: 'charm2', name: 'Charm Estrella', imageKey: 'charm2', description: 'Dije de estrella brillante' },
  { id: 'charm3', name: 'Charm Flor', imageKey: 'charm3', description: 'Dije de flor delicada' },
  { id: 'charm4', name: 'Charm Moño', imageKey: 'charm4', description: 'Dije de moño elegante' },
  { id: 'charm5', name: 'Charm Corona', imageKey: 'charm5', description: 'Dije de corona real' },
  { id: 'charm6', name: 'Charm Luna', imageKey: 'charm6', description: 'Dije de luna mágica' },
  { id: 'charm7', name: 'Charm Diamante', imageKey: 'charm7', description: 'Dije de diamante premium' },
  { id: 'charm8', name: 'Charm Mariposa', imageKey: 'charm8', description: 'Dije de mariposa colorida' },
  { id: 'charm9', name: 'Charm Brillante', imageKey: 'charm9', description: 'Dije brillante especial' }
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
  { id: 'emb1-d1', name: 'Trenza Espiral', imageKey: 'design1', description: '' },
  { id: 'emb2-d1', name: 'Trenza Forte', imageKey: 'design2', description: '' },
  { id: 'emb3-d1', name: 'Trenza Floral', imageKey: 'design3', description: '' },
  { id: 'emb4-d1', name: 'Trenza Clásica', imageKey: 'design4', description: '' },
  { id: 'emb5-d1', name: 'Nudo Clásico', imageKey: 'design5', description: '' }
]

const embroideryTypesDesign2 = [
  { id: 'emb1-d2', name: 'Trenza Espiral', imageKey: 'design6', description: '' },
  { id: 'emb2-d2', name: 'Trenza Forte', imageKey: 'design7', description: '' },
  { id: 'emb3-d2', name: 'Trenza Floral', imageKey: 'design8', description: '' },
  { id: 'emb4-d2', name: 'Trenza Clásica', imageKey: 'design9', description: '' },
  { id: 'emb5-d2', name: 'Nudo Clásico', imageKey: 'design10', description: '' }
]

const embroideryTypesDesign3 = [
  { id: 'emb1-d3', name: 'Trenza Espiral', imageKey: 'design11', description: '' },
  { id: 'emb2-d3', name: 'Trenza Forte', imageKey: 'design12', description: '' },
  { id: 'emb3-d3', name: 'Trenza Floral', imageKey: 'design13', description: '' },
  { id: 'emb4-d3', name: 'Trenza Clásica', imageKey: 'design14', description: '' },
  { id: 'emb5-d3', name: 'Nudo Clásico', imageKey: 'design15', description: '' }
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
  { id: 'emb1', name: 'Trenza Espiral', imageKey: 'design1', description: '' },
  { id: 'emb3', name: 'Trenza Forte', imageKey: 'design3', description: '' },
  { id: 'emb4', name: 'Trenza Floral', imageKey: 'design4', description: '' },
  { id: 'emb5', name: 'Trenza Clásica', imageKey: 'design5', description: '' },
  { id: 'emb6', name: 'Nudo Clásico', imageKey: 'design6', description: '' }
]

const sizes = [
  { id: 'xs', name: 'Extra Pequeño', description: 'Medida del cuello: 17-29cm', price: 255 },
  { id: 's', name: 'Pequeño', description: 'Medida del cuello: 25-40cm', price: 290 },
  { id: 'm', name: 'Mediano', description: 'Medida del cuello: 35-46cm', price: 320 },
  { id: 'l', name: 'Grande', description: 'Medida del cuello: 40-55cm', price: 500 },
  { id: 'xl', name: 'Extra Grande', description: 'Medida del cuello: 50-66cm', price: 700 }
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
    petNameItems: [],
    letterStyle: { id: '', name: '', style: '', imageKey: '' },
    letterColor: { id: 'green', label: 'Verde', value: '#10B981' },
    charmType: { id: '', name: '', style: '', imageKey: '' },
    charms: [],
    size: { id: '', name: '', description: '', price: 0 },
    secondCollar: {
      petName: '',
      nameItems: [],
      color: { id: '', label: '', value: '' }
    }
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeCollarTarget, setActiveCollarTarget] = useState<'first' | 'second'>('first')
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

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
    scrollToNextButton()
  }

  const handleEmbroideryTypeSelect = (embroidery: typeof embroideryTypesDesign1[0] | typeof embroideryTypesDesign2[0] | typeof embroideryTypesDesign3[0]) => {
    setCustomization(prev => ({
      ...prev,
      embroideryType: embroidery
    }))
    scrollToNextButton()
  }

  // Handlers específicos para diseño combinado
  const handleEmbroideryDesign1Select = (embroidery: typeof embroideryTypesDesign1[0]) => {
    setCustomization(prev => ({
      ...prev,
      embroideryDesign1: embroidery
    }))
    scrollToNextButton()
  }

  const handleEmbroideryDesign2Select = (embroidery: typeof embroideryTypesDesign2[0]) => {
    setCustomization(prev => ({
      ...prev,
      embroideryDesign2: embroidery
    }))
    scrollToNextButton()
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

  const handleLetterColorSelect = (color: typeof colors[0]) => {
    setCustomization(prev => ({
      ...prev,
      letterColor: color
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
    
    const selectedStyle = styleMapping[letterType.id] || letterStyles[0]
    setCustomization(prev => ({
      ...prev,
      letterStyle: {
        ...selectedStyle,
        imageKey: letterType.imageKey // Agregar la imagen del tipo de letra
      }
    }))
    setIsLetterTypeModalOpen(false)
  }

  const handleCharmTypeSelect = (charmType: typeof charmTypes[0]) => {
    // Map charm type to style
    const charmStyleMapping: { [key: string]: { id: string; name: string; style: string; imageKey: string } } = {
      'charm1': { id: 'charm1', name: 'Básicos', style: 'charm-basic', imageKey: charmType.imageKey },
      'charm2': { id: 'charm2', name: 'Coloridos', style: 'charm-colorful', imageKey: charmType.imageKey },
      'charm3': { id: 'charm3', name: 'Metálicos', style: 'charm-metallic', imageKey: charmType.imageKey },
      'charm4': { id: 'charm4', name: 'Premium', style: 'charm-premium', imageKey: charmType.imageKey }
    }
    
    setCustomization(prev => ({
      ...prev,
      charmType: charmStyleMapping[charmType.id] || { ...charmStyleMapping['charm1'], imageKey: charmType.imageKey }
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

  const handleZoomDesignImage = (design: any) => {
    const imageData = getImageSrc('featured', design.imageKey)
    setZoomImageData({
      src: imageData.src,
      fallback: imageData.fallback,
      alt: imageData.alt,
      title: `${design.name} - ${design.description}`
    })
    setIsImageZoomOpen(true)
  }

  const handleZoomLetterImage = (letterType: any) => {
    const imageData = getImageSrc('letterStyles', letterType.imageKey)
    setZoomImageData({
      src: imageData.src,
      fallback: imageData.fallback,
      alt: imageData.alt,
      title: `${letterType.name} - ${letterType.description}`
    })
    setIsImageZoomOpen(true)
  }

  const handleZoomCharmImage = (charmType: any) => {
    const imageData = getImageSrc('charmPhotos', charmType.imageKey)
    setZoomImageData({
      src: imageData.src,
      fallback: imageData.fallback,
      alt: imageData.alt,
      title: `${charmType.name} - ${charmType.description}`
    })
    setIsImageZoomOpen(true)
  }

  // Funciones para móviles (tap to add) - Alternativa al drag & drop
  const handleAddLetter = (letter: string) => {
    const isCombined = customization.designType?.id === 3
    const targetIsSecond = isCombined && activeCollarTarget === 'second'
    const currentItems = targetIsSecond ? customization.secondCollar.nameItems : customization.petNameItems

    if (currentItems.length < 12 && customization.letterStyle.id) {
      const newItem: CollarCharacterItem = {
        id: nextItemId(),
        type: 'letter',
        value: letter,
        color: customization.letterStyle.id === 'script' ? '#000000' : customization.letterColor.value
      }
      if (targetIsSecond) {
        setCustomization(prev => ({
          ...prev,
          secondCollar: {
            ...prev.secondCollar,
            nameItems: [...prev.secondCollar.nameItems, newItem],
            petName: prev.secondCollar.nameItems.map(i => i.value).join('') + letter
          }
        }))
      } else {
        setCustomization(prev => ({
          ...prev,
          petNameItems: [...prev.petNameItems, newItem],
          petName: prev.petNameItems.map(i => i.value).join('') + letter
        }))
      }
      scrollToNextButton()
    }
  }

  const handleAddColor = (colorId: string, toSecondCollar?: boolean) => {
    const isCombined = customization.designType?.id === 3
    const targetIsSecond = toSecondCollar ?? (isCombined && activeCollarTarget === 'second')
    const currentItems = targetIsSecond ? customization.secondCollar.nameItems : customization.petNameItems

    if (currentItems.length < 12 && customization.charmType.id) {
      let colorEmoji = '🔴'
      let selectedColor = { id: '', label: '', value: '' }
      
      const typicalColor = typicalColors.find(c => c.id === colorId)
      const paracordColor = colors.find(c => c.id === colorId)
      
      if (typicalColor) {
        colorEmoji = typicalColor.label
        selectedColor = typicalColor
      } else if (paracordColor) {
        colorEmoji = paracordColor.label || '●'
        selectedColor = { id: paracordColor.id, label: paracordColor.label, value: paracordColor.value }
      }

      const newItem: CollarCharacterItem = {
        id: nextItemId(),
        type: 'charmColor',
        value: colorEmoji,
        label: selectedColor.label
      }
      
      if (targetIsSecond) {
        setCustomization(prev => ({
          ...prev,
          secondCollar: {
            ...prev.secondCollar,
            nameItems: [...prev.secondCollar.nameItems, newItem],
            petName: prev.secondCollar.nameItems.map(i => i.value).join('') + colorEmoji,
            color: selectedColor
          }
        }))
      } else {
        setCustomization(prev => ({
          ...prev,
          petNameItems: [...prev.petNameItems, newItem],
          petName: prev.petNameItems.map(i => i.value).join('') + colorEmoji
        }))
      }
      scrollToNextButton()
    }
  }

  // Detectar si es dispositivo táctil
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }

  // Auto-scroll al botón siguiente en móvil
  const scrollToNextButton = () => {
    if (isTouchDevice()) {
      setTimeout(() => {
        // Buscar el área de botones de navegación
        const buttonContainer = document.querySelector('.flex.justify-between.mt-8')
        if (buttonContainer) {
          const nextButton = buttonContainer.querySelector('button:not([disabled]):last-child') ||
                            buttonContainer.querySelector('button:last-child')
          
          if (nextButton) {
            nextButton.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'nearest' // Solo desplaza lo mínimo para que sea visible
            })
          }
        }
      }, 300) // Pequeño delay para que se procese la selección primero
    }
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, letter: string) => {
    // Solo permitir drag si se seleccionó tipo de letra
    if (!customization.letterStyle.id) {
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

  const handleParacordColorDragStart = (e: React.DragEvent<HTMLDivElement>, color: any) => {
    // Permitir arrastrar colores del paracord cuando solo se selecciono charm
    if (!customization.charmType.id) {
      e.preventDefault()
      return
    }
    // Crear un ID temporal para el color del paracord
    const tempColorId = `paracord_${color.id}`
    setDraggedColor(tempColorId)
    setDraggedLetter(null)
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleTypicalColorDragStart = (e: React.DragEvent<HTMLDivElement>, colorId: string) => {
    // Permitir arrastrar colores típicos cuando tienes charm seleccionado
    if (!customization.charmType.id) {
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
    if (customization.petNameItems.length < 12) {
      if (draggedLetter && customization.letterStyle.id) {
        const newItem: CollarCharacterItem = {
          id: nextItemId(),
          type: 'letter',
          value: draggedLetter,
          color: customization.letterStyle.id === 'script' ? '#000000' : customization.letterColor.value
        }
        setCustomization(prev => ({
          ...prev,
          petNameItems: [...prev.petNameItems, newItem],
          petName: prev.petNameItems.map(i => i.value).join('') + draggedLetter
        }))
      } else if (draggedColor && customization.charmType.id) {
        let colorEmoji = '🔴'
        if (draggedColor.startsWith('paracord_')) {
          const paracordColorId = draggedColor.replace('paracord_', '')
          const paracordColor = colors.find(c => c.id === paracordColorId)
          if (paracordColor) colorEmoji = paracordColor.label || '●'
        } else {
          colorEmoji = typicalColors.find(c => c.id === draggedColor)?.label || '🔴'
        }
        const newItem: CollarCharacterItem = { id: nextItemId(), type: 'charmColor', value: colorEmoji }
        setCustomization(prev => ({
          ...prev,
          petNameItems: [...prev.petNameItems, newItem],
          petName: prev.petNameItems.map(i => i.value).join('') + colorEmoji
        }))
      }
    }
    setDraggedLetter(null)
    setDraggedColor(null)
  }

  const handleRemoveLetter = (index: number) => {
    setCustomization(prev => {
      const newItems = [...prev.petNameItems]
      newItems.splice(index, 1)
      return {
        ...prev,
        petNameItems: newItems,
        petName: newItems.map(i => i.value).join('')
      }
    })
  }

  const handleClearName = () => {
    setCustomization(prev => ({
      ...prev,
      petName: '',
      petNameItems: []
    }))
  }

  // Second collar handlers for combined design
  const handleDropOnSecondCollar = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (customization.secondCollar.nameItems.length < 12) {
      if (draggedLetter && customization.letterStyle.id) {
        const newItem: CollarCharacterItem = {
          id: nextItemId(),
          type: 'letter',
          value: draggedLetter,
          color: customization.letterStyle.id === 'script' ? '#000000' : customization.letterColor.value
        }
        setCustomization(prev => ({
          ...prev,
          secondCollar: {
            ...prev.secondCollar,
            nameItems: [...prev.secondCollar.nameItems, newItem],
            petName: prev.secondCollar.nameItems.map(i => i.value).join('') + draggedLetter
          }
        }))
      } else if (draggedColor && customization.charmType.id) {
        let colorEmoji = '🔴'
        let selectedColor = { id: '', label: '', value: '' }
        if (draggedColor.startsWith('paracord_')) {
          const paracordColorId = draggedColor.replace('paracord_', '')
          const paracordColor = colors.find(c => c.id === paracordColorId)
          if (paracordColor) {
            colorEmoji = paracordColor.label || '●'
            selectedColor = { id: paracordColor.id, label: paracordColor.label, value: paracordColor.value }
          }
        } else {
          colorEmoji = typicalColors.find(c => c.id === draggedColor)?.label || '🔴'
          selectedColor = typicalColors.find(c => c.id === draggedColor) || { id: '', label: '', value: '' }
        }
        const newItem: CollarCharacterItem = { id: nextItemId(), type: 'charmColor', value: colorEmoji }
        setCustomization(prev => ({
          ...prev,
          secondCollar: {
            ...prev.secondCollar,
            nameItems: [...prev.secondCollar.nameItems, newItem],
            petName: prev.secondCollar.nameItems.map(i => i.value).join('') + colorEmoji,
            color: selectedColor
          }
        }))
      }
    }
    setDraggedLetter(null)
    setDraggedColor(null)
  }

  const handleRemoveSecondCollarLetter = (index: number) => {
    setCustomization(prev => {
      const newItems = [...prev.secondCollar.nameItems]
      newItems.splice(index, 1)
      return {
        ...prev,
        secondCollar: {
          ...prev.secondCollar,
          nameItems: newItems,
          petName: newItems.map(i => i.value).join('')
        }
      }
    })
  }

  const handleClearSecondCollarName = () => {
    setCustomization(prev => ({
      ...prev,
      secondCollar: {
        ...prev.secondCollar,
        petName: '',
        nameItems: []
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
    // Show color step by default until a design type is selected
    if (!customization.designType) return true
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
    // Default: show step numbers normally (1-5)
    return currentStep + 1
  }

  // Check if current design type requires embroidery selection
  const requiresEmbroidery = () => {
    // Show embroidery step by default until a design type is selected
    if (!customization.designType) return true
    // Todos los diseños tienen bordados, solo son diferentes tipos
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
        // Para diseño con bordado (tipo 1), requiere embroideryType
        if (customization.designType?.id === 1) {
          return customization.embroideryType !== null
        }
        // Para diseño sin bordado (tipo 2), no requiere embroideryType
        return true
      }
      case 2: return !requiresColor() || customization.color.id !== ''
      case 3: {
        // Para diseño combinado, completamente flexible
        if (customization.designType?.id === 3) {
          // Se puede avanzar siempre - todo es opcional
          return true
        }
        
        // Para diseño normal, también completamente flexible  
        // Se puede avanzar siempre - letras y charms son opcionales
        return true
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
      
      // Scroll automático a los steps
      setTimeout(() => {
        stepsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }, 100)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      let prevStepIndex = currentStep - 1
      
      // Skip color step when going back if Diseño2 is selected
      if (currentStep === 3 && customization.designType?.id === 2) {
        prevStepIndex = 1 // Skip step 2 (color) and go back to step 1 (embroidery)
      }
      
      // Resetear datos solo cuando regresa al step 1 (inicio)
      if (prevStepIndex === 0) {
        setCustomization({
          designType: null,
          embroideryType: null,
          embroideryDesign1: null,
          embroideryDesign2: null,
          color: { id: '', label: '', value: '' },
          petName: '',
          petNameItems: [],
          letterStyle: { id: '', name: '', style: '', imageKey: '' },
          letterColor: { id: 'green', label: 'Verde', value: '#10B981' },
          charmType: { id: '', name: '', style: '', imageKey: '' },
          charms: [],
          size: { id: '', name: '', description: '', price: 0 },
          secondCollar: {
            petName: '',
            nameItems: [],
            color: { id: '', label: '', value: '' }
          }
        })
      }
      
      setCurrentStep(prevStepIndex)
      
      // Scroll automático a los steps
      setTimeout(() => {
        stepsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }, 100)
    }
  }

  const handleConfirmOrder = () => {
    const phoneNumber = '526144620906'
    
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
- Color de letra: ${customization.letterColor.label || 'Verde'}
- Charms: ${customization.charms.length > 0 ? customization.charms.map(c => c.label).join(', ') : 'Ninguno'}
- Tamaño: ${customization.size.name || 'No seleccionado'}

¡Espero crear algo hermoso para mi mascota!`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    setIsModalOpen(false)
  }

  const handleDownload = () => {
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
                  <div className="p-4 text-center">
                    {/* Contenedor de imagen con tratamiento de doble capa */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-neutral-100 mb-4">
                      {/* Imagen de fondo borrosa */}
                      <div className="absolute inset-0">
                        <PatitasImage
                          src={getImageSrc('featured', design.imageKey).src}
                          fallback={getImageSrc('featured', design.imageKey).fallback}
                          alt={design.name}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover scale-110 blur-sm opacity-30"
                        />
                      </div>

                      {/* Overlay suave para unificar */}
                      <div className="absolute inset-0 bg-white/20" />

                      {/* Imagen principal completa */}
                      <div className="relative z-10 w-full h-full p-4 flex items-center justify-center">
                        <PatitasImage
                          src={getImageSrc('featured', design.imageKey).src}
                          fallback={getImageSrc('featured', design.imageKey).fallback}
                          alt={design.name}
                          width={300}
                          height={225}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>

                      {/* Marco interno sutil */}
                      <div className="pointer-events-none absolute inset-2 rounded-[20px] border border-white/50 z-20" />
                      
                      {/* Indicador de seleccionado */}
                      {customization.designType?.id === design.id && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center shadow-lg z-30">
                          <span className="text-white text-sm font-bold">✓</span>
                        </div>
                      )}

                      {/* Botón de zoom */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleZoomDesignImage(design)
                        }}
                        className="absolute bottom-3 right-3 w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 z-30 group"
                        aria-label={`Ver imagen ampliada de ${design.name}`}
                      >
                        <svg className="w-4 h-4 text-gray-700 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </button>
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
            
            {/* Nota informativa */}
            <div className="mt-8 max-w-4xl mx-auto">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-center">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-blue-700 text-sm font-medium text-center">
                      ✨ Todos los diseños incluyen letras personalizadas y charms decorativos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 1:
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
                              className="absolute bottom-3 right-3 w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 group"
                              aria-label="Ver imagen ampliada"
                            >
                              <svg className="w-4 h-4 text-gray-700 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                              className="absolute bottom-3 right-3 w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 group"
                              aria-label="Ver imagen ampliada"
                            >
                              <svg className="w-4 h-4 text-gray-700 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </button>
                          </div>
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
            {customization.designType?.id === 1 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-center font-medium">
                  💡 <strong>Guía:</strong> Como elegiste el diseño "Bordado", en este paso solo necesitas seleccionar el tipo de bordado que más te guste para tu collar.
                </p>
              </div>
            )}
            {customization.designType?.id === 2 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 text-center font-medium">
                  💡 <strong>Guía:</strong> Como elegiste el diseño "Sin Bordado", estos son estilos minimalistas que se enfocan en resaltar las letras personalizadas de tu mascota.
                </p>
              </div>
            )}
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
                          className="absolute bottom-3 right-3 w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 group"
                          aria-label="Ver imagen ampliada"
                        >
                          <svg className="w-4 h-4 text-gray-700 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            
            {/* Nota informativa para diseño combinado */}
            {customization.designType?.id === 3 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">ℹ️</span>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1">Diseño Combinado</h4>
                    <p className="text-blue-700 text-sm">
                      Este color será para el bordado del primer collar. El segundo collar será sencillo sin bordado.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-8">
              {/* Colores Sólidos */}
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-4">
                  Colores Sólidos: Toca + para agregar al nombre
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 max-w-5xl mx-auto">
                  {colors.filter(color => color.type === 'solid').map((color) => (
                    <div
                      key={color.id}
                      className="relative group"
                    >
                      <div
                        className={`relative p-3 rounded-xl border-2 cursor-pointer transition-all touch-manipulation ${
                          customization.color.id === color.id
                            ? 'border-pink-500 bg-pink-50 shadow-lg'
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                        onClick={() => handleColorSelect(color)}
                        title={`Seleccionar color: ${color.label}`}
                      >
                        <div className="text-center">
                          <div 
                            className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-white shadow-md"
                            style={{ 
                              background: color.value.includes('gradient') ? color.value : color.value,
                              border: color.id === 'white' ? '2px solid #e5e7eb' : '2px solid white'
                            }}
                          ></div>
                          <h5 className="text-xs font-medium text-gray-800 leading-tight break-words px-1 min-h-[2rem] flex items-center justify-center">{color.label}</h5>
                          {customization.color.id === color.id && (
                            <div className="mt-1">
                              <span className="text-pink-500 text-xs font-medium">✓</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Botón + para móviles */}
                      {isTouchDevice() && customization.charmType.id && customization.petNameItems.length < 12 && (
                        <button
                          onClick={() => handleAddColor(`paracord_${color.id}`)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 hover:bg-purple-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-md transition-all"
                          title={`Agregar ${color.label} al nombre`}
                        >
                          +
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Colores Multicolor */}
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-4">
                  Colores Multicolor: Toca + para agregar al nombre
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 max-w-5xl mx-auto">
                  {colors.filter(color => color.type === 'multicolor').map((color) => (
                    <div
                      key={color.id}
                      className="relative group"
                    >
                      <div
                        className={`relative p-3 rounded-xl border-2 cursor-pointer transition-all touch-manipulation ${
                          customization.color.id === color.id
                            ? 'border-pink-500 bg-pink-50 shadow-lg'
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                        onClick={() => handleColorSelect(color)}
                        title={`Seleccionar color: ${color.label}`}
                      >
                        <div className="text-center">
                          <div 
                            className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-white shadow-md"
                            style={{ 
                              background: color.value
                            }}
                          ></div>
                          <h5 className="text-xs font-medium text-gray-800 leading-tight break-words px-1 min-h-[2rem] flex items-center justify-center">{color.label}</h5>
                          {customization.color.id === color.id && (
                            <div className="mt-1">
                              <span className="text-pink-500 text-xs font-medium">✓</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Botón + para móviles */}
                      {isTouchDevice() && customization.charmType.id && customization.petNameItems.length < 12 && (
                        <button
                          onClick={() => handleAddColor(`paracord_${color.id}`)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 hover:bg-purple-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-md transition-all"
                          title={`Agregar ${color.label} al nombre`}
                        >
                          +
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 3: {
        const isCombined = customization.designType?.id === 3
        const activeTarget = isCombined ? activeCollarTarget : 'first'
        const activeItems = activeTarget === 'second' ? customization.secondCollar.nameItems : customization.petNameItems
        const activeCharCount = activeItems.length

        return (
          <div className="w-full max-w-full min-w-0 overflow-x-hidden box-border">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-center text-gray-800 mb-3 sm:mb-4 lg:mb-6">
              Personaliza las Letras
              {isCombined && (
                <span className="block text-xs sm:text-sm lg:text-base font-normal text-gray-600 mt-1 sm:mt-2">
                  Diseño Combinado - Dos Collares
                </span>
              )}
            </h3>
            
            {/* Instrucciones iniciales */}
            {!customization.letterStyle.id && !customization.charmType.id && (
              <div className="w-full max-w-full overflow-x-hidden box-border bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-3 lg:p-4 mb-4 sm:mb-6 lg:mb-8">
                <p className="text-blue-800 text-center font-medium text-xs sm:text-sm lg:text-base leading-relaxed break-words whitespace-normal" style={{ overflowWrap: 'anywhere' }}>
                  💡 <strong>¡Comienza aquí!</strong> Haz clic en los botones <span className="inline-flex items-center justify-center bg-pink-500 text-white w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[9px] sm:text-[10px] lg:text-xs leading-none">+</span> de abajo para agregar letras personalizadas o charms decorativos a tu collar
                </p>
              </div>
            )}
            
            <div className="w-full max-w-full min-w-0 space-y-3 sm:space-y-4 lg:space-y-8 box-border">
              
              {/* Selección de Tipos */}
              <div className="w-full max-w-full min-w-0 flex flex-col gap-3 sm:gap-4">
                
                {/* Tipo de Letra */}
                <div className="w-full min-w-0 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
                  <label className="flex-1 min-w-0 text-xs sm:text-sm lg:text-md font-semibold text-gray-700 break-words">
                    Tipo de Letra
                  </label>
                  {customization.letterStyle.id ? (
                    <button
                      onClick={() => setIsLetterTypeModalOpen(true)}
                      className="min-w-0 max-w-full sm:max-w-[60%] flex items-center space-x-1 sm:space-x-2 bg-green-100 hover:bg-green-200 px-2 sm:px-3 py-1 rounded-full transition-all shrink-0"
                    >
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-white text-[8px] sm:text-xs font-bold">✓</span>
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold text-green-700 truncate min-w-0">
                        {customization.letterStyle.name}
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsLetterTypeModalOpen(true)}
                      className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg shrink-0"
                      title="Haz clic aquí para agregar letras personalizadas"
                    >
                      <span className="text-white text-sm sm:text-base lg:text-lg font-bold">+</span>
                    </button>
                  )}
                </div>

                {/* Tipo de Charm */}
                <div className="w-full min-w-0 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
                  <label className="flex-1 min-w-0 text-xs sm:text-sm lg:text-md font-semibold text-gray-700 break-words">
                    Tipo de Charm
                  </label>
                  {customization.charmType.id ? (
                    <button
                      onClick={() => setIsCharmTypeModalOpen(true)}
                      className="min-w-0 max-w-full sm:max-w-[60%] flex items-center space-x-1 sm:space-x-2 bg-green-100 hover:bg-green-200 px-2 sm:px-3 py-1 rounded-full transition-all shrink-0"
                    >
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-white text-[8px] sm:text-xs font-bold">✓</span>
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold text-green-700 truncate min-w-0">
                        {customization.charmType.name}
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsCharmTypeModalOpen(true)}
                      className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg shrink-0"
                      title="Haz clic aquí para agregar charms decorativos"
                    >
                      <span className="text-white text-sm sm:text-base lg:text-lg font-bold">+</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Mensajes de sugerencia condicionales */}
              {customization.letterStyle.id && !customization.charmType.id && (
                <div className="w-full max-w-full box-border bg-purple-50 border border-purple-200 rounded-lg p-2 sm:p-3">
                  <p className="text-purple-700 text-xs sm:text-sm text-center break-words whitespace-normal">
                    ✨ <strong>Sugerencia:</strong> También puedes agregar un charm decorativo haciendo clic en el botón + violeta
                  </p>
                </div>
              )}

              {customization.charmType.id && !customization.letterStyle.id && (
                <div className="w-full max-w-full box-border bg-pink-50 border border-pink-200 rounded-lg p-2 sm:p-3">
                  <p className="text-pink-700 text-xs sm:text-sm text-center break-words whitespace-normal">
                    💝 <strong>Sugerencia:</strong> También puedes agregar letras personalizadas haciendo clic en el botón + rosado
                  </p>
                </div>
              )}

              {/* Áreas de nombre - visible cuando hay tipo de letra o charm seleccionado */}
              {(customization.letterStyle.id || customization.charmType.id) && (
                <div className="w-full max-w-full min-w-0 box-border">

                  {/* --- Diseño Combinado: dos áreas de nombre --- */}
                  {isCombined ? (
                    <div className="w-full space-y-3 sm:space-y-4">
                      {/* Badge indicando qué collar se edita */}
                      <div className="w-full text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                          activeTarget === 'first'
                            ? 'bg-pink-100 text-pink-700 border border-pink-300'
                            : 'bg-purple-100 text-purple-700 border border-purple-300'
                        }`}>
                          ✏️ Editando: {activeTarget === 'first' ? 'Collar 1 (Bordado)' : 'Collar 2 (Sencillo)'}
                        </span>
                      </div>

                      {/* Collar 1 */}
                      <div
                        onClick={() => setActiveCollarTarget('first')}
                        className={`w-full max-w-full rounded-lg p-2 sm:p-3 cursor-pointer transition-all box-border ${
                          activeTarget === 'first'
                            ? 'border-2 border-pink-400 bg-pink-50 shadow-md'
                            : 'border-2 border-gray-200 bg-gray-50 opacity-70 hover:opacity-90'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1 sm:mb-2">
                          <label className="text-xs sm:text-sm font-semibold text-gray-700 min-w-0 break-words">
                            Collar 1 (Bordado)
                          </label>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleClearName() }}
                            className="text-[10px] sm:text-xs text-gray-500 hover:text-pink-500 underline shrink-0"
                          >
                            Limpiar
                          </button>
                        </div>
                        <div
                          className="w-full max-w-full min-h-[40px] sm:min-h-[50px] p-1.5 sm:p-2 border-2 border-dashed border-pink-300 rounded-lg bg-white flex items-center justify-center flex-wrap gap-1 box-border overflow-x-hidden"
                          onDragOver={handleDragOver}
                          onDrop={handleDropOnName}
                        >
                          {customization.petNameItems.length === 0 ? (
                            <span className="text-gray-400 text-xs sm:text-sm text-center px-2 break-words">
                              {activeTarget === 'first' ? 'Toca letras abajo para agregar' : 'Toca aquí para editar este collar'}
                            </span>
                          ) : (
                            customization.petNameItems.map((item, index) => (
                              <div
                                key={item.id}
                                className={`relative bg-white border-2 border-pink-300 rounded px-1 sm:px-1.5 py-0.5 sm:py-1 text-xs sm:text-base font-bold shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0 ${
                                  item.type === 'letter' ? customization.letterStyle.style : ''
                                }`}
                                style={{
                                  color: item.type === 'letter' ? (item.color || '#374151') : '#374151'
                                }}
                                onClick={(e) => { e.stopPropagation(); handleRemoveLetter(index) }}
                                title="Clic para eliminar"
                              >
                                {item.value}
                              </div>
                            ))
                          )}
                        </div>
                        <p className="text-[9px] sm:text-[10px] text-gray-500 mt-1 break-words">
                          {customization.petNameItems.length}/12 caracteres
                        </p>
                      </div>

                      {/* Collar 2 */}
                      <div
                        onClick={() => setActiveCollarTarget('second')}
                        className={`w-full max-w-full rounded-lg p-2 sm:p-3 cursor-pointer transition-all box-border ${
                          activeTarget === 'second'
                            ? 'border-2 border-purple-400 bg-purple-50 shadow-md'
                            : 'border-2 border-gray-200 bg-gray-50 opacity-70 hover:opacity-90'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1 sm:mb-2">
                          <label className="text-xs sm:text-sm font-semibold text-gray-700 min-w-0 break-words">
                            Collar 2 (Sencillo)
                          </label>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleClearSecondCollarName() }}
                            className="text-[10px] sm:text-xs text-gray-500 hover:text-purple-500 underline shrink-0"
                          >
                            Limpiar
                          </button>
                        </div>
                        <div
                          className="w-full max-w-full min-h-[40px] sm:min-h-[50px] p-1.5 sm:p-2 border-2 border-dashed border-purple-300 rounded-lg bg-white flex items-center justify-center flex-wrap gap-1 box-border overflow-x-hidden"
                          onDragOver={handleDragOver}
                          onDrop={handleDropOnSecondCollar}
                        >
                          {customization.secondCollar.nameItems.length === 0 ? (
                            <span className="text-gray-400 text-xs sm:text-sm text-center px-2 break-words">
                              {activeTarget === 'second' ? 'Toca letras abajo para agregar' : 'Toca aquí para editar este collar'}
                            </span>
                          ) : (
                            customization.secondCollar.nameItems.map((item, index) => (
                              <div
                                key={item.id}
                                className={`relative bg-white border-2 border-purple-300 rounded px-1 sm:px-1.5 py-0.5 sm:py-1 text-xs sm:text-base font-bold shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0 ${
                                  item.type === 'letter' ? customization.letterStyle.style : ''
                                }`}
                                style={{
                                  color: item.type === 'letter' ? (item.color || '#374151') : '#374151'
                                }}
                                onClick={(e) => { e.stopPropagation(); handleRemoveSecondCollarLetter(index) }}
                                title="Clic para eliminar"
                              >
                                {item.value}
                              </div>
                            ))
                          )}
                        </div>
                        <p className="text-[9px] sm:text-[10px] text-gray-500 mt-1 break-words">
                          {customization.secondCollar.nameItems.length}/12 caracteres
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* --- Diseño Normal: un solo constructor de nombre --- */
                    <div className="w-full">
                      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-2 sm:mb-3">
                        <label className="text-sm sm:text-md lg:text-lg font-semibold text-gray-700 min-w-0 break-words">
                          Nombre de tu Mascota
                        </label>
                        <button
                          onClick={handleClearName}
                          className="text-xs text-gray-500 hover:text-pink-500 underline self-start sm:self-auto shrink-0"
                        >
                          Limpiar
                        </button>
                      </div>
                      
                      <div
                        className="w-full max-w-full min-h-[40px] sm:min-h-[50px] p-2 sm:p-3 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 mb-2 sm:mb-3 flex items-center justify-center flex-wrap gap-1 box-border overflow-x-hidden"
                        onDragOver={handleDragOver}
                        onDrop={handleDropOnName}
                      >
                        {customization.petNameItems.length === 0 ? (
                          <span className="text-gray-400 text-xs sm:text-sm text-center px-2 break-words">
                            Toca las letras de abajo para agregar al collar
                          </span>
                        ) : (
                          customization.petNameItems.map((item, index) => (
                            <div
                              key={item.id}
                              className={`relative bg-white border-2 border-pink-300 rounded px-1 sm:px-1.5 py-0.5 sm:py-1 text-xs sm:text-base font-bold shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0 ${
                                item.type === 'letter' ? customization.letterStyle.style : ''
                              }`}
                              style={{
                                color: item.type === 'letter' ? (item.color || '#374151') : '#374151'
                              }}
                              onClick={() => handleRemoveLetter(index)}
                              title="Clic para eliminar"
                            >
                              {item.value}
                            </div>
                          ))
                        )}
                      </div>
                      
                      <p className="text-[10px] sm:text-xs text-gray-500 mb-3 sm:mb-4 break-words">
                        Máximo 12 caracteres • Toca para agregar • Toca letra para eliminar • {customization.petNameItems.length}/12
                      </p>
                    </div>
                  )}

                  {/* Layout de Letras y Colores */}
                  <div className="w-full max-w-full min-w-0 space-y-4 sm:space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 box-border">
                    
                    {/* Alfabeto - Solo si seleccionó tipo de letra */}
                    {customization.letterStyle.id && (
                      <div className="w-full max-w-full min-w-0">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-3">
                          Letras {isCombined && <span className="text-[10px] sm:text-xs font-normal text-gray-500">(se agregan a {activeTarget === 'first' ? 'Collar 1' : 'Collar 2'})</span>}
                        </h4>
                        <div className="w-full grid grid-cols-7 sm:grid-cols-7 lg:grid-cols-7 gap-1 sm:gap-1.5">
                          {alphabet.map((letter) => (
                            <button
                              key={letter}
                              onClick={() => handleAddLetter(letter)}
                              disabled={activeCharCount >= 12}
                              className={`w-full aspect-square flex items-center justify-center rounded sm:rounded-lg text-xs sm:text-base lg:text-lg font-bold transition-all touch-manipulation bg-white border border-gray-300 hover:bg-purple-50 hover:border-purple-400 active:bg-purple-100 ${
                                activeCharCount >= 12 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                              } ${customization.letterStyle.style}`}
                              style={{
                                color: customization.letterStyle.id === 'script' ? '#000000' : customization.letterColor.value
                              }}
                              draggable={!isTouchDevice()}
                              onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent<HTMLDivElement>, letter)}
                            >
                              {letter}
                            </button>
                          ))}
                        </div>
                        
                        {/* Color de Letra - Solo mostrar si NO es tipo cursivo */}
                        {customization.letterStyle.id !== 'script' && (
                          <div className="w-full max-w-full mt-3 sm:mt-4 box-border">
                            <h4 className="text-xs sm:text-md font-semibold text-gray-700 mb-2 sm:mb-3">
                              Color de Letra:
                            </h4>
                            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                              {colors.filter(color => ['green', 'purple', 'orange', 'pink', 'blue'].includes(color.id)).map((color) => (
                                <div
                                  key={color.id}
                                  className={`relative p-1 rounded-lg border-2 cursor-pointer transition-all ${
                                    customization.letterColor.id === color.id
                                      ? 'border-pink-500 bg-pink-50 shadow-lg'
                                      : 'border-gray-200 hover:border-pink-300'
                                  }`}
                                  onClick={() => handleLetterColorSelect(color)}
                                >
                                  <div className="text-center">
                                    <div
                                      className="w-4 h-4 sm:w-6 sm:h-6 rounded-full mx-auto border border-white shadow-sm"
                                      style={{
                                        background: color.value,
                                        border: color.id === 'white' ? '1px solid #e5e7eb' : '1px solid white'
                                      }}
                                    ></div>
                                    {customization.letterColor.id === color.id && (
                                      <div className="mt-1">
                                        <span className="text-pink-500 text-[10px] sm:text-xs font-medium">✓</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Mensaje informativo para tipo cursivo */}
                        {customization.letterStyle.id === 'script' && (
                          <div className="w-full max-w-full mt-3 sm:mt-4 p-2 sm:p-3 bg-gray-100 rounded-lg box-border">
                            <p className="text-xs sm:text-sm text-gray-600 text-center break-words">
                              ℹ️ Las letras cursivas solo están disponibles en color negro
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Colores de charms - Solo si seleccionó tipo de charm */}
                    {customization.charmType.id && (
                      <div className="w-full max-w-full min-w-0">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-3">
                          Colores de charms {isCombined && <span className="text-[10px] sm:text-xs font-normal text-gray-500">(se agregan a {activeTarget === 'first' ? 'Collar 1' : 'Collar 2'})</span>}
                        </h4>
                        <div className="w-full grid grid-cols-7 sm:grid-cols-8 lg:grid-cols-8 gap-1 sm:gap-1.5">
                          {typicalColors.map((colorItem) => (
                            <button
                              key={colorItem.id}
                              onClick={() => handleAddColor(colorItem.id)}
                              disabled={activeCharCount >= 12}
                              className={`w-full aspect-square flex items-center justify-center rounded sm:rounded-lg text-xs sm:text-base bg-white border border-gray-300 hover:bg-purple-50 hover:border-purple-400 active:bg-purple-100 transition-all touch-manipulation ${
                                activeCharCount >= 12 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                              }`}
                              draggable={!isTouchDevice()}
                              onDragStart={(e) => handleTypicalColorDragStart(e as unknown as React.DragEvent<HTMLDivElement>, colorItem.id)}
                            >
                              {colorItem.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal para selección de tipo de letra */}
            {isLetterTypeModalOpen && (
              <div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-50 p-4">
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
                          className="cursor-pointer hover:scale-105 transition-all relative"
                          onClick={() => handleLetterTypeSelect(letterType)}
                        >
                          <div className="w-full h-48 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                            <PatitasImage
                              src={getImageSrc('letterStyles', letterType.imageKey).src}
                              fallback={getImageSrc('letterStyles', letterType.imageKey).fallback}
                              alt={letterType.name}
                              width={300}
                              height={200}
                              className="w-full h-full object-contain rounded-xl"
                            />
                            {/* Botón de zoom */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleZoomLetterImage(letterType)
                              }}
                              className="absolute bottom-3 right-3 w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 group"
                              aria-label={`Ver imagen ampliada de ${letterType.name}`}
                            >
                              <svg className="w-4 h-4 text-gray-700 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </button>
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
              <div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-50 p-4">
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
                          className="cursor-pointer hover:scale-105 transition-all relative"
                          onClick={() => handleCharmTypeSelect(charmType)}
                        >
                          <div className="w-full h-48 rounded-xl mb-4 flex items-center justify-center p-3 relative overflow-hidden">
                            <PatitasImage
                              src={getImageSrc('charmPhotos', charmType.imageKey).src}
                              fallback={getImageSrc('charmPhotos', charmType.imageKey).fallback}
                              alt={charmType.name}
                              width={300}
                              height={200}
                              className="max-w-full max-h-full object-contain rounded-xl"
                            />
                            {/* Botón de zoom */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleZoomCharmImage(charmType)
                              }}
                              className="absolute bottom-3 right-3 w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 group"
                              aria-label={`Ver imagen ampliada de ${charmType.name}`}
                            >
                              <svg className="w-4 h-4 text-gray-700 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </button>
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
      }

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
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800">{size.name}</h4>
                      <p className="text-gray-600">{size.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-xl font-bold text-pink-600">${size.price} MXN</p>
                        <p className="text-xs text-gray-500">Precio base aprox.</p>
                      </div>
                      {customization.size.id === size.id && (
                        <span className="text-pink-500 text-xl">✓</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Información sobre precios */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">💰</span>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Información sobre precios</h4>
                  {customization.designType?.id === 3 ? (
                    <div>
                      <p className="text-blue-700 text-sm mb-2">
                        <strong>Diseño Combinado:</strong> El precio mostrado es por cada collar individual. 
                        Tu pedido incluirá 2 collares personalizados. 🐕+🐕
                      </p>
                      <p className="text-blue-700 text-sm">
                        El precio final se confirmará por WhatsApp incluyendo todas las personalizaciones. ✨
                      </p>
                    </div>
                  ) : (
                    <p className="text-blue-700 text-sm">
                      Los precios mostrados son aproximados y corresponden al costo base del collar. 
                      El precio final incluirá todas las personalizaciones que hayas elegido 
                      (letras, charms, bordados especiales, etc.) y te será confirmado por nuestro 
                      equipo cuando envíes tu diseño por WhatsApp. 😊✨
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section ref={sectionRef} id="personalizar" className="py-12 bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Diseña Tu Collar Personalizado
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sigue estos pasos para crear el collar perfecto para tu mascota
          </p>
        </div>

        {/* Progress indicator - Mobile responsive */}
        <div ref={stepsRef} className="mb-8 sm:mb-12">
          <div className="flex justify-center mb-3 sm:mb-4 overflow-x-auto">
            <div className="flex items-center space-x-1 sm:space-x-2 px-4 min-w-max">
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
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                      adjustedIndex === currentStep 
                        ? 'bg-pink-500 text-white'
                        : adjustedIndex < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {adjustedIndex < currentStep ? '✓' : adjustedIndex + 1}
                    </div>
                    {index < steps.length - 1 && (index !== 0 || requiresEmbroidery()) && (
                      <div className={`w-4 sm:w-8 h-1 mx-1 sm:mx-2 ${
                        adjustedIndex < currentStep ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          <p className="text-center text-gray-600 font-medium text-sm sm:text-base px-4">
            Paso {getActiveStepNumber()} de {steps.length}: {getActiveStepLabel()}
          </p>
        </div>

        <div className={`grid gap-8 min-w-0 ${currentStep >= 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
          {/* Step content */}
          <div className="w-full max-w-full min-w-0 overflow-x-hidden box-border bg-white rounded-2xl shadow-xl p-6">
            {renderStepContent()}
            
            {/* Navigation buttons */}
            <div className="w-full max-w-full flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-8 box-border">
              <Button
                onClick={prevStep}
                variant="secondary"
                disabled={currentStep === 0}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 min-w-0"
              >
                ← Anterior
              </Button>
              
              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="primary"
                  disabled={!canProceed()}
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 min-w-0"
                >
                  Ver Resumen Final
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  variant="primary"
                  disabled={!canProceed()}
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 min-w-0"
                >
                  Siguiente →
                </Button>
              )}
            </div>
          </div>

          {/* Live preview - only show from colors step onward */}
          {currentStep >= 2 && (
            <div className="w-full max-w-full min-w-0 overflow-x-hidden box-border bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
                Vista Previa en Vivo
              </h3>
              <div className="text-center">
                {/* Imágenes del collar - Layout adaptativo */}
                {customization.designType?.id === 3 ? (
                  /* Diseño combinado - Layout horizontal compacto */
                  <div className="flex flex-wrap justify-center gap-4 mb-6">
                    {/* Primera imagen */}
                    <div className="bg-gray-100 rounded-xl p-4">
                      <div className="w-60 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                        <img
                          src={customization.embroideryDesign1 ?
                               getImageSrc('featured', customization.embroideryDesign1.imageKey).src :
                               getImageSrc('featured', 'collar-1').src}
                          alt="Preview del primer collar"
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                          }}
                          className="rounded"
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-2">Collar con {customization.embroideryDesign1?.name || 'Bordado 1'}</p>
                    </div>
                    
                    {/* Segunda imagen */}
                    <div className="bg-gray-100 rounded-xl p-4">
                      <div className="w-60 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                        <img
                          src={customization.embroideryDesign2 ? getImageSrc('featured', customization.embroideryDesign2.imageKey).src :
                               getImageSrc('featured', 'collar-1').src}
                          alt="Preview del segundo collar"
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                          }}
                          className="rounded"
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-2">Collar con {customization.embroideryDesign2?.name || 'Bordado 2'}</p>
                    </div>
                  </div>
                ) : (
                  /* Diseño simple - Layout normal */
                  <div className="inline-block bg-gray-100 rounded-2xl p-6 mb-6">
                    <div className="w-80 h-60 bg-gray-200 rounded-xl flex items-center justify-center">
                      <img
                        src={customization.embroideryType ? getImageSrc('featured', customization.embroideryType.imageKey).src :
                             customization.designType ? getImageSrc('featured', customization.designType.imageKey).src : 
                             getImageSrc('featured', 'collar-1').src}
                        alt="Preview del collar"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain'
                        }}
                        className="rounded-lg"
                      />
                    </div>
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
                    <p><strong>Color de Letra:</strong> {customization.letterColor.label || 'Verde'}</p>
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
          secondImageUrl={customization.designType?.id === 3 && customization.embroideryDesign2 ?
                          getImageSrc('featured', customization.embroideryDesign2.imageKey).src : undefined}
          designDetails={{
            // 1. Tipo de diseño
            designType: customization.designType?.name || 'No seleccionado',
            // 2. Tipo de bordado
            embroideryType: customization.designType?.id === 3 ? 
              `${customization.embroideryDesign1?.name || 'Collar personalizado'} + Collar personalizado` :
              customization.embroideryType?.name || (customization.designType?.id === 2 ? 'Sin bordado' : 'No seleccionado'),
            // 3. Color del paracord
            color: customization.color.label || 'No seleccionado',
            // 4. Letras y charms
            letterStyle: customization.letterStyle.name || 'Sin letras',
            letterStyleImage: customization.letterStyle.imageKey ? 
              getImageSrc('letterStyles', customization.letterStyle.imageKey).src : undefined,
            letterColor: customization.letterColor.label || 'Verde',
            charmType: customization.charmType.name || 'Sin charm',
            charmTypeImage: customization.charmType.imageKey ? 
              getImageSrc('charmPhotos', customization.charmType.imageKey).src : undefined,
            petName: customization.designType?.id === 3 ?
                     { collar1: customization.petName || 'Sin contenido', collar2: customization.secondCollar.petName || 'Sin contenido' } :
                     customization.petName || 'Sin contenido',
            // 5. Tamaño
            size: customization.size.name || 'No seleccionado'
          }}
          onConfirmOrder={handleConfirmOrder}
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