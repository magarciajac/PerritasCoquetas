// Configuración de imágenes para PatitasCoquetas
// Agrega tus imágenes a las carpetas correspondientes y actualiza las rutas aquí

export const images = {
  // Logo de la marca
  logo: {
    path: '/images/logo/Logo.jpg',
    fallback: '✨ PatitasCoquetas ✨',
    alt: 'Logo PatitasCoquetas'
  },

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
      path: '/images/material%20/Diseno_1.jpg',
      fallback: '🐕‍🦺',
      alt: 'Collar personalizado PatitasCoquetas'
    },
    design3: {
      path: '/images/material%20/Diseno6.jpg',
      fallback: '🐶',
      alt: 'Collar personalizado PatitasCoquetas'
    },
    design4: {
      path: '/images/material%20/Diseno7.jpg',
      fallback: '🦮',
      alt: 'Collar personalizado PatitasCoquetas'
    },
    design5: {
      path: '/images/material%20/Diseno8.jpg',
      fallback: '🐾',
      alt: 'Collar personalizado PatitasCoquetas'
    },
    design6: {
      path: '/images/material%20/Diseno_2.jpg',
      fallback: '🎀',
      alt: 'Collar personalizado PatitasCoquetas'
    },
    design7: {
      path: '/images/material%20/Diseno_3.jpg',
      fallback: '💝',
      alt: 'Collar personalizado PatitasCoquetas'
    },
    design8: {
      path: '/images/material%20/Diseno_4.jpg',
      fallback: '🌟',
      alt: 'Collar personalizado PatitasCoquetas'
    },
    design9: {
      path: '/images/material%20/Diseno5.jpg',
      fallback: '💖',
      alt: 'Collar personalizado PatitasCoquetas'
    },
    design10: {
      path: '/images/material%20/Diseno9.jpg',
      fallback: '🦄',
      alt: 'Collar personalizado PatitasCoquetas'
    },
    design11: {
      path: '/images/material%20/diseno2.jpg',
      fallback: '🌺',
      alt: 'Collar personalizado PatitasCoquetas'
    },
    design12: {
      path: '/images/material%20/diseno3.jpg',
      fallback: '🎨',
      alt: 'Collar personalizado PatitasCoquetas'
    },
    design13: {
      path: '/images/material%20/diseno4.jpg',
      fallback: '🌈',
      alt: 'Collar personalizado PatitasCoquetas'
    },
    design14: {
      path: '/images/material%20/Diseno10.jpg',
      fallback: '✨',
      alt: 'Collar personalizado PatitasCoquetas'
    },
    design15: {
      path: '/images/material%20/DisenoC1.jpg',
      fallback: '💫',
      alt: 'Collar personalizado PatitasCoquetas'
    }
  },

  // Dijes/charms (fotos reales)
  charmPhotos: {
    charm1: {
      path: '/images/material%20/Charm1.jpg',
      fallback: '💖',
      alt: 'Charm Corazón - Dije de corazón elegante'
    },
    charm2: {
      path: '/images/material%20/Charm2.jpg',
      fallback: '⭐',
      alt: 'Charm Estrella - Dije de estrella brillante'
    },
    charm3: {
      path: '/images/material%20/Charm3.jpg',
      fallback: '🌸',
      alt: 'Charm Flor - Dije de flor delicada'
    },
    charm4: {
      path: '/images/material%20/Charm4.jpg',
      fallback: '🎀',
      alt: 'Charm Moño - Dije de moño elegante'
    },
    charm5: {
      path: '/images/material%20/Charm5.jpg',
      fallback: '👑',
      alt: 'Charm Corona - Dije de corona real'
    },
    charm6: {
      path: '/images/material%20/Charm6.jpg',
      fallback: '🌙',
      alt: 'Charm Luna - Dije de luna mágica'
    },
    charm7: {
      path: '/images/material%20/Charm7.jpg',
      fallback: '💎',
      alt: 'Charm Diamante - Dije de diamante premium'
    },
    charm8: {
      path: '/images/material%20/Charm8.jpg',
      fallback: '🦋',
      alt: 'Charm Mariposa - Dije de mariposa colorida'
    },
    charm9: {
      path: '/images/material%20/Charm9.jpg',
      fallback: '✨',
      alt: 'Charm Brillante - Dije brillante especial'
    }
  },

  // Estilos de letras (fotos reales)
  letterStyles: {
    style1: {
      path: '/images/material%20/Letras1.jpg',
      fallback: 'A',
      alt: 'Tipo Elegante - Letras elegantes con serifs'
    },
    style2: {
      path: '/images/material%20/Letras2.jpg',
      fallback: 'B',
      alt: 'Tipo Moderno - Letras modernas sans-serif'
    },
    style3: {
      path: '/images/material%20/Letras3.jpg',
      fallback: 'C',
      alt: 'Tipo Cursivo - Letras cursivas y estilizadas'
    },
    style4: {
      path: '/images/material%20/Letras4.jpg',
      fallback: 'D',
      alt: 'Tipo Bold - Letras gruesas y llamativas'
    }
  },

  // Dijes/charms (emoji fallbacks - deprecated)
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

  // Bordados específicos para Diseño 1
  design1Embroidery: {
    'design1-emb1': {
      path: '/images/material%20/diseno.jpg',
      fallback: '🧵',
      alt: 'Bordado Clásico D1 - Diseño elegante tradicional'
    },
    'design1-emb2': {
      path: '/images/material%20/diseno2.jpg',
      fallback: '🌸',
      alt: 'Bordado Floral D1 - Motivos florales'
    },
    'design1-emb3': {
      path: '/images/material%20/diseno3.jpg',
      fallback: '📐',
      alt: 'Bordado Geométrico D1 - Patrones geométricos'
    },
    'design1-emb4': {
      path: '/images/material%20/diseno4.jpg',
      fallback: '⚱️',
      alt: 'Bordado Vintage D1 - Estilo vintage'
    },
    'design1-emb5': {
      path: '/images/material%20/Diseno5.jpg',
      fallback: '✋',
      alt: 'Bordado Artesanal D1 - Hecho a mano'
    }
  },

  // Bordados específicos para Diseño 2
  design2Embroidery: {
    'design2-emb1': {
      path: '/images/material%20/Diseno_1.jpg',
      fallback: '🎨',
      alt: 'Bordado Moderno D2 - Diseño moderno específico'
    },
    'design2-emb2': {
      path: '/images/material%20/diseno_2.jpg',
      fallback: '🏙️',
      alt: 'Bordado Urbano D2 - Estilo urbano'
    },
    'design2-emb3': {
      path: '/images/material%20/diseno_3.jpg',
      fallback: '⭕',
      alt: 'Bordado Minimalista D2 - Diseño minimalista'
    },
    'design2-emb4': {
      path: '/images/material%20/diseno_4.jpg',
      fallback: '🔶',
      alt: 'Bordado Contemporáneo D2 - Estilo contemporáneo'
    },
    'design2-emb5': {
      path: '/images/material%20/DisenoC1.jpg',
      fallback: '💫',
      alt: 'Bordado Elegante D2 - Diseño elegante'
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
  // Para bordados de diseño 1, buscar en la sección específica
  if (item.startsWith('design1-emb')) {
    const embroideryData = (images.design1Embroidery as any)?.[item]
    if (embroideryData) {
      return {
        src: embroideryData.path || '',
        fallback: embroideryData.fallback,
        alt: embroideryData.alt
      }
    }
  }
  
  // Para bordados de diseño 2, buscar en la sección específica
  if (item.startsWith('design2-emb')) {
    const embroideryData = (images.design2Embroidery as any)?.[item]
    if (embroideryData) {
      return {
        src: embroideryData.path || '',
        fallback: embroideryData.fallback,
        alt: embroideryData.alt
      }
    }
  }
  
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