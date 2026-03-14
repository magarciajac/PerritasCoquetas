// Configuración de imágenes para PatitasCoquetas
// Agrega tus imágenes a las carpetas correspondientes y actualiza las rutas aquí

export const images = {
  // Materiales del collar
  materials: {
    dorado: {
      fallback: '🥇', // Emoji como fallback
      alt: 'Cuero premium con detalles dorados'
    },
    rosa: {
      fallback: '🌸',
      alt: 'Tela suave con acabado delicado'
    },
    plata: {
      fallback: '⚡',
      alt: 'Material sintético resistente'
    },
    negro: {
      fallback: '🖤',
      alt: 'Cuero genuino de alta calidad'
    }
  },

  // Diseños destacados para la galería
  featured: {
    design1: {
      path: '/images/material%20/diseno.jpg',
      fallback: '✨',
      alt: 'Collar personalizado especial PatitasCoquetas'
    },
    design2: {
      path: '/images/material%20/diseno2.jpg',
      fallback: '🐕‍🦺',
      alt: 'Collar personalizado PatitasCoquetas'
    },
    design3: {
      path: '/images/material%20/diseno3.jpg',
      fallback: '🐶',
      alt: 'Collar personalizado PatitasCoquetas'
    },
    design4: {
      path: '/images/material%20/diseno4.jpg',
      fallback: '🦮',
      alt: 'Collar personalizado PatitasCoquetas'
    }
  },

  // Dijes/charms
  charms: {
    corazon: {
      fallback: '💖',
      alt: 'Dije de corazón'
    },
    estrella: {
      fallback: '⭐',
      alt: 'Dije de estrella'
    },
    flor: {
      fallback: '🌸',
      alt: 'Dije de flor'
    },
    mono: {
      fallback: '🎀',
      alt: 'Dije de moño'
    },
    corona: {
      fallback: '👑',
      alt: 'Dije de corona'
    },
    luna: {
      fallback: '🌙',  
      alt: 'Dije de luna'
    }
  },

  // Otros elementos
  logo: {
    main: {
      fallback: '✨',
      alt: 'Logo PatitasCoquetas'
    }
  },

  // Ejemplos de trabajos para las secciones
  examples: {
    premium1: {
      fallback: '🧵',
      alt: 'Detalle de bordado premium'
    },
    premium2: {
      fallback: '💎',
      alt: 'Herrajes deluxe de acero'
    },
    collarSizes: {
      fallback: '📏',
      alt: 'Tabla de tallas de collares'
    }
  }
}

// Función helper para obtener la imagen o fallback
export function getImageSrc(category: keyof typeof images, item: string): {
  src: string;
  fallback: string;
  alt: string;
} {
  const imageData = (images[category] as any)?.[item]
  
  if (!imageData) {
    return {
      src: '',
      fallback: '📱',
      alt: 'Imagen no disponible'
    }
  }

  return {
    src: imageData.path || '', // Use empty string if no path
    fallback: imageData.fallback,
    alt: imageData.alt
  }
}

// Hook para verificar si una imagen existe
export function useImageFallback(src: string, fallback: string) {
  // En el futuro se puede implementar lógica para verificar si la imagen existe
  // Por ahora retorna la imagen si el src no está vacío
  return src ? src : null
}