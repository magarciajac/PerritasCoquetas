# 📸 Sistema de Imágenes - PatitasCoquetas

## Estructura de Carpetas

```
public/
└── images/
    ├── materials/          # Texturas de materiales del collar
    ├── featured/           # Diseños destacados para galería
    ├── charms/            # Imágenes de dijes/charms
    ├── examples/          # Ejemplos de trabajos y detalles
    └── README.md          # Este archivo
```

## 🎯 Cómo Funciona

### 1. **Agregar Imágenes**
Sube tus imágenes a las carpetas correspondientes siguiendo esta nomenclatura:

#### **Materiales** (`public/images/materials/`)
- `cuero-dorado.jpg` - Material dorado
- `tela-rosa.jpg` - Material rosa  
- `sintetico-plata.jpg` - Material plata
- `cuero-negro.jpg` - Material negro

#### **Diseños Destacados** (`public/images/featured/`)
- `collar-corgi-negro.jpg`
- `collar-afghan-dorado.jpg` 
- `collar-jack-rosa.jpg`
- `collar-golden-negro.jpg`
- `collar-chihuahua-multicolor.jpg`
- `collar-elegante-blanco.jpg`

#### **Dijes** (`public/images/charms/`)
- `charm-corazon.png`
- `charm-estrella.png`
- `charm-flor.png`
- `charm-mono.png`
- `charm-corona.png`
- `charm-luna.png`

### 2. **Actualizar Configuración**
Edita `/src/lib/images.ts` y actualiza las rutas según tus archivos.

### 3. **Fallback Automático**
Si no encuentras una imagen, automáticamente se muestra el emoji correspondiente.

## 🛠 Uso en Componentes

### Imagen Simple
```tsx
import PatitasImage from '@/components/ui/PatitasImage'
import { getImageSrc } from '@/lib/images'

const { src, fallback, alt } = getImageSrc('materials', 'dorado')

<PatitasImage 
  src={src}
  fallback={fallback}
  alt={alt}
  width={400}
  height={300}
  className="rounded-xl"
/>
```

### Textura de Material
```tsx
import { MaterialTexture } from '@/components/ui/PatitasImage'

<MaterialTexture 
  material="dorado" 
  size="lg"
  className="shadow-lg" 
/>
```

## 📋 Lista de Imágenes Requeridas

### ✅ **Materiales** (4 imágenes)
- [ ] `cuero-dorado.jpg` - Textura de cuero con detalles dorados
- [ ] `tela-rosa.jpg` - Tela suave rosada
- [ ] `sintetico-plata.jpg` - Material sintético plateado  
- [ ] `cuero-negro.jpg` - Cuero negro genuino

### ✅ **Diseños Destacados** (6 imágenes)
- [ ] `collar-corgi-negro.jpg` - Corgi con collar negro
- [ ] `collar-afghan-dorado.jpg` - Afghan Hound con collar dorado
- [ ] `collar-jack-rosa.jpg` - Jack Russell con collar rosa
- [ ] `collar-golden-negro.jpg` - Golden con collar negro
- [ ] `collar-chihuahua-multicolor.jpg` - Chihuahuas con collares coloridos
- [ ] `collar-elegante-blanco.jpg` - Collar elegante blanco/negro

### ✅ **Dijes** (6 imágenes)
- [ ] `charm-corazon.png` - Dije de corazón
- [ ] `charm-estrella.png` - Dije de estrella  
- [ ] `charm-flor.png` - Dije de flor
- [ ] `charm-mono.png` - Dije de moño
- [ ] `charm-corona.png` - Dije de corona
- [ ] `charm-luna.png` - Dije de luna

### ✅ **Extras Opcionales**
- [ ] `logo-patitas-coquetas.png` - Logo principal
- [ ] `detalle-bordado-premium.jpg` - Detalle de bordado
- [ ] `herrajes-deluxe.jpg` - Herrajes de calidad
- [ ] `tabla-tallas-collares.jpg` - Tabla de tallas

## 🎨 Especificaciones Recomendadas

### **Formato y Calidad**
- **Materiales**: 400x300px, JPG, alta calidad
- **Diseños**: 600x400px, JPG, alta resolución
- **Dijes**: 200x200px, PNG con fondo transparente
- **Logo**: 300x100px, PNG con fondo transparente

### **Estilo**
- Fondo neutro (blanco/beige claro)
- Buena iluminación natural
- Enfoque nítido en el producto
- Colores fieles al producto real

## 🔄 Beneficios del Sistema

1. **✨ Fallback Automático**: Si falta una imagen, muestra emoji
2. **🚀 Performance**: Solo carga imágenes que existen
3. **📱 Responsive**: Se adapta automáticamente al dispositivo
4. **🎯 SEO**: Alt text descriptivo automático
5. **🛠 Mantenimiento**: Fácil agregar/quitar imágenes

## 🚩 Estado Actual

**Sin imágenes**: Todos los componentes usan emojis como fallback.
**Con imágenes**: Automáticamente se mostrarán las imágenes reales.

¡Sube tus imágenes y verás el cambio inmediato! 📸✨