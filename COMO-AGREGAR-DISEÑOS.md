# 📸 Cómo Agregar Más Diseños a la Galería

## Pasos Simples:

### 1️⃣ Agregar la imagen
Coloca tu nueva foto en: `public/images/material /`
- Ejemplo: `diseno5.jpg`, `diseno6.jpg`, etc.

### 2️⃣ Configurar en images.ts
Abre: `src/lib/images.ts`

Agrega en la sección `featured`:
```typescript
design5: {
  path: '/images/material%20/diseno5.jpg',
  fallback: '🐾',
  alt: 'Collar personalizado PatitasCoquetas'
}
```

### 3️⃣ Configurar en baseDesigns.ts
Abre: `src/lib/baseDesigns.ts`

Agrega al final del array:
```typescript
{ 
  id: 5, 
  name: 'Nombre del Diseño', 
  imageKey: 'design5', 
  description: 'Descripción breve del collar' 
}
```

## ✅ ¡Listo!

Tu nuevo diseño aparecerá automáticamente en:
- ✨ Sección "Diseños Destacados" de la landing
- 🖼️ Modal de galería del personalizador

## 📝 Notas:
- El `imageKey` debe coincidir con el nombre en `images.ts`
- El `id` debe ser único y consecutivo
- Puedes agregar tantos diseños como quieras
