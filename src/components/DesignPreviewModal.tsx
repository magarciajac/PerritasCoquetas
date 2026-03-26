'use client'

import { Button } from './ui/Button'

// Componentes de iconos SVG inline
const XIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const MessageCircleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

type CollarCharacterItem = {
  id: string
  type: 'letter' | 'charmColor'
  value: string
  color?: string
  label?: string
}

interface DesignPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  secondImageUrl?: string
  designDetails: {
    designType: string
    embroideryType: string
    color: string
    letterStyle: string
    letterStyleImage?: string
    letterColor: string
    charmType: string
    charmTypeImage?: string
    petName: string | { collar1: string; collar2: string }
    petNameItems?: CollarCharacterItem[]
    secondCollarItems?: CollarCharacterItem[]
    size: string
  }
  onConfirmOrder: () => void
}

/* Render each character with its individual color */
function ColoredName({ items, fallback, className = '' }: { items?: CollarCharacterItem[]; fallback: string; className?: string }) {
  if (!items || items.length === 0) {
    return <span className={className}>{fallback}</span>
  }
  return (
    <span className={`inline-flex flex-wrap gap-0.5 ${className}`}>
      {items.map((item) => (
        <span
          key={item.id}
          style={item.type === 'letter' && item.color ? { color: item.color } : undefined}
          className="font-bold"
        >
          {item.value}
        </span>
      ))}
    </span>
  )
}

/* ───────────────────────────────────────────────
   MOBILE SHARE CARD – compacta, screenshot-ready
   ─────────────────────────────────────────────── */
function MobileSummary({
  imageUrl,
  secondImageUrl,
  designDetails,
  onClose,
  onConfirmOrder
}: Omit<DesignPreviewModalProps, 'isOpen'>) {
  const isCombined = typeof designDetails.petName === 'object'

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 flex flex-col">
      {/* ── Scrollable share-card area ── */}
      <div className="flex-1 overflow-y-auto px-3 pt-3 pb-2">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header compacto */}
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2.5 flex items-center justify-between">
            <div className="min-w-0">
              <h2 className="text-base font-bold leading-tight">🐕 Resumen del Collar</h2>
              <p className="text-pink-100 text-[11px] leading-tight">PatitasCoquetas ✨</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors flex-shrink-0 ml-2"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Preview mini – grid 2x2 */}
          <div className="px-3 pt-3 pb-2">
            <div className="grid grid-cols-2 gap-2">
              {/* Collar principal */}
              <div className="bg-gray-50 rounded-lg p-1.5 border border-gray-200">
                <img
                  src={imageUrl}
                  alt="Collar"
                  className="w-full h-20 object-contain rounded"
                />
                <p className="text-[10px] text-gray-500 text-center mt-0.5 font-medium truncate">
                  {isCombined ? 'Collar 1' : 'Tu collar'}
                </p>
              </div>

              {/* Segundo collar si es combinado, sino placeholder */}
              {isCombined && secondImageUrl ? (
                <div className="bg-gray-50 rounded-lg p-1.5 border border-gray-200">
                  <img
                    src={secondImageUrl}
                    alt="Collar 2"
                    className="w-full h-20 object-contain rounded"
                  />
                  <p className="text-[10px] text-gray-500 text-center mt-0.5 font-medium truncate">Collar 2</p>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg p-1.5 border border-gray-200 border-dashed">
                  <div className="w-full h-20 flex items-center justify-center text-gray-400">
                    <span className="text-3xl">🐕</span>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center mt-0.5 font-medium">Collar único</p>
                </div>
              )}

              {/* Letra */}
              {designDetails.letterStyleImage && designDetails.letterStyle !== 'Sin letras' ? (
                <div className="bg-gray-50 rounded-lg p-1.5 border border-gray-200">
                  <img
                    src={designDetails.letterStyleImage}
                    alt={designDetails.letterStyle}
                    className="w-full h-20 object-contain rounded"
                  />
                  <p className="text-[10px] text-gray-500 text-center mt-0.5 font-medium truncate">{designDetails.letterStyle}</p>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg p-1.5 border border-gray-200 border-dashed">
                  <div className="w-full h-20 flex items-center justify-center text-gray-400">
                    <span className="text-2xl">ABC</span>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center mt-0.5 font-medium">Sin letras</p>
                </div>
              )}

              {/* Charm */}
              {designDetails.charmTypeImage && designDetails.charmType !== 'Sin charm' ? (
                <div className="bg-gray-50 rounded-lg p-1.5 border border-gray-200">
                  <img
                    src={designDetails.charmTypeImage}
                    alt={designDetails.charmType}
                    className="w-full h-20 object-contain rounded"
                  />
                  <p className="text-[10px] text-gray-500 text-center mt-0.5 font-medium truncate">{designDetails.charmType}</p>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg p-1.5 border border-gray-200 border-dashed">
                  <div className="w-full h-20 flex items-center justify-center text-gray-400">
                    <span className="text-2xl">✨</span>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center mt-0.5 font-medium">Sin charm</p>
                </div>
              )}
            </div>
          </div>

          {/* Grid 2 columnas de datos */}
          <div className="px-3 pb-2">
            <div className="grid grid-cols-3 gap-1.5">
              <MiniChip label="Diseño" value={designDetails.designType} />
              <MiniChip label="Bordado" value={designDetails.embroideryType} />
              <MiniChip label="Tamaño" value={designDetails.size} />
              <MiniChip label="Letra" value={designDetails.letterStyle} />
              <MiniChip label="Charm" value={designDetails.charmType} />
            </div>
            {/* Colores seleccionados - fila separada para que se vean todos */}
            <div className="mt-1.5 bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-100">
              <span className="text-[10px] text-gray-400 font-medium block leading-tight text-center mb-1">Color</span>
              <div className="flex flex-wrap gap-1 justify-center">
                {designDetails.color.split(', ').map((c, i) => (
                  <span key={i} className="inline-block px-2 py-0.5 bg-pink-100 text-pink-800 text-[11px] font-semibold rounded-md border border-pink-200">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contenido del Collar */}
          <div className="px-3 pb-3">
            <div className="bg-pink-50 border border-pink-200 rounded-xl p-2.5">
              <h4 className="text-xs font-bold text-pink-700 mb-1.5 text-center">
                📿 Contenido del Collar
              </h4>
              {isCombined ? (
                <div className="space-y-1.5">
                  <div className="bg-white rounded-lg px-2.5 py-1.5 border border-pink-100">
                    <span className="text-[10px] text-pink-500 font-semibold block">Collar 1 (Bordado)</span>
                    <div className="text-sm leading-tight break-all">
                      <ColoredName
                        items={designDetails.petNameItems}
                        fallback={(designDetails.petName as { collar1: string; collar2: string }).collar1}
                      />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg px-2.5 py-1.5 border border-pink-100">
                    <span className="text-[10px] text-pink-500 font-semibold block">Collar 2 (Sencillo)</span>
                    <div className="text-sm leading-tight break-all">
                      <ColoredName
                        items={designDetails.secondCollarItems}
                        fallback={(designDetails.petName as { collar1: string; collar2: string }).collar2}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg px-3 py-2 border border-pink-100 text-center">
                  <div className="text-lg break-all">
                    <ColoredName
                      items={designDetails.petNameItems}
                      fallback={designDetails.petName as string}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instrucciones – debajo del card, fuera del screenshot principal */}
        <div className="mt-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5">
          <h4 className="font-bold text-blue-800 text-xs mb-1.5">📋 Para completar tu pedido:</h4>
          <ol className="text-blue-700 text-[11px] space-y-0.5 leading-snug">
            <li>1. Toma screenshot de esta pantalla</li>
            <li>2. Presiona &quot;Enviar por WhatsApp&quot;</li>
            <li>3. Adjunta el screenshot en WhatsApp</li>
          </ol>
        </div>
      </div>

      {/* ── Botones fijos abajo, fuera del scroll ── */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200 px-3 py-2.5 flex gap-2">
        <Button
          onClick={() => onConfirmOrder()}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 text-sm shadow-md rounded-xl"
        >
          <MessageCircleIcon />
          <span className="ml-1">WhatsApp</span>
        </Button>
        <Button
          onClick={onClose}
          variant="secondary"
          className="flex-1 text-gray-600 hover:bg-gray-100 py-2.5 border border-gray-300 text-sm rounded-xl"
        >
          ✏️ Editar
        </Button>
      </div>
    </div>
  )
}

/* Helper: mini chip de dato */
function MiniChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-100 text-center min-w-0">
      <span className="text-[10px] text-gray-400 font-medium block leading-tight">{label}</span>
      <span className="text-[11px] text-gray-800 font-semibold block leading-tight truncate">{value}</span>
    </div>
  )
}

/* ───────────────────────────────────────────────
   DESKTOP SUMMARY – la UI actual sin cambios
   ─────────────────────────────────────────────── */
function DesktopSummary({
  imageUrl,
  secondImageUrl,
  designDetails,
  onClose,
  onConfirmOrder
}: Omit<DesignPreviewModalProps, 'isOpen'>) {
  return (
    <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-y-auto border border-white/20">
        
        {/* Header compacto */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">🐕 Resumen del Collar</h2>
              <p className="text-pink-100 text-sm">PatitasCoquetas ✨</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
            >
              <XIcon />
            </button>
          </div>
        </div>

        {/* Contenido en grid horizontal */}
        <div className="p-6">
          
          {/* Layout horizontal: imagen + especificaciones */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Imagen(es) del collar */}
            <div className="lg:col-span-1">
              {/* Grid de 2x2 para todas las imágenes */}
              <div className="grid grid-cols-2 gap-4">
                {/* Imagen principal del collar */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow">
                  <img
                    src={imageUrl}
                    alt="Collar con bordado"
                    className="w-full h-32 object-contain rounded-lg"
                  />
                  <p className="text-gray-600 mt-2 text-sm text-center font-medium">Collar principal</p>
                </div>
                
                {/* Segunda imagen para combinados O espacio vacío */}
                {typeof designDetails.petName === 'object' && secondImageUrl ? (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow">
                    <img
                      src={secondImageUrl}
                      alt="Collar sencillo"
                      className="w-full h-32 object-contain rounded-lg"
                    />
                    <p className="text-gray-600 mt-2 text-sm text-center font-medium">Collar secundario</p>
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-xl p-4 border border-gray-200 border-dashed">
                    <div className="w-full h-32 flex items-center justify-center text-gray-400">
                      <span className="text-4xl">🐕</span>
                    </div>
                    <p className="text-gray-400 mt-2 text-sm text-center font-medium">Collar único</p>
                  </div>
                )}
                
                {/* Imagen de letra seleccionada */}
                {designDetails.letterStyleImage && designDetails.letterStyle !== 'Sin letras' ? (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow">
                    <img
                      src={designDetails.letterStyleImage}
                      alt={designDetails.letterStyle}
                      className="w-full h-32 object-contain rounded-lg"
                    />
                    <p className="text-gray-600 mt-2 text-sm text-center font-medium">{designDetails.letterStyle}</p>
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-xl p-4 border border-gray-200 border-dashed">
                    <div className="w-full h-32 flex items-center justify-center text-gray-400">
                      <span className="text-4xl">ABC</span>
                    </div>
                    <p className="text-gray-400 mt-2 text-sm text-center font-medium">Sin letras</p>
                  </div>
                )}
                
                {/* Imagen de charm seleccionado */}
                {designDetails.charmTypeImage && designDetails.charmType !== 'Sin charm' ? (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow">
                    <img
                      src={designDetails.charmTypeImage}
                      alt={designDetails.charmType}
                      className="w-full h-32 object-contain rounded-lg"
                    />
                    <p className="text-gray-600 mt-2 text-sm text-center font-medium">{designDetails.charmType}</p>
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-xl p-4 border border-gray-200 border-dashed">
                    <div className="w-full h-32 flex items-center justify-center text-gray-400">
                      <span className="text-4xl">✨</span>
                    </div>
                    <p className="text-gray-400 mt-2 text-sm text-center font-medium">Sin charm</p>
                  </div>
                )}
              </div>
              <p className="text-gray-600 mt-3 text-base text-center font-medium">Vista previa</p>
            </div>

            {/* Especificaciones compactas */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* 1. Tipo de Diseño */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-base">1</div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-base">Tipo de Diseño</h4>
                    <p className="text-gray-700 font-semibold text-base">{designDetails.designType}</p>
                  </div>
                </div>
              </div>

              {/* 2. Bordado */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-base">2</div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-base">Bordado</h4>
                    <p className="text-gray-700 font-semibold text-base">{designDetails.embroideryType}</p>
                  </div>
                </div>
              </div>

              {/* 3. Color del Paracord + Personalización */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-base flex-shrink-0">3</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-base">Color</h4>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {designDetails.color.split(', ').map((c, i) => (
                        <span key={i} className="inline-block px-2.5 py-1 bg-pink-100 text-pink-800 text-xs font-medium rounded-lg border border-pink-200">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Tamaño */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-base">4</div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-base">Tamaño</h4>
                    <p className="text-gray-700 font-semibold text-base">{designDetails.size}</p>
                  </div>
                </div>
              </div>

              {/* 5. Contenido del collar */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm sm:col-span-2">
                <div className="flex items-start space-x-3">
                  <div className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-base flex-shrink-0">5</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-base mb-3">Contenido del Collar</h4>
                    {typeof designDetails.petName === 'object' ? (
                      <div className="grid grid-cols-2 gap-3 text-base">
                        <div className="bg-gray-50 rounded p-3 border border-gray-100">
                          <span className="font-medium text-gray-600">Collar 1:</span>
                          <div className="text-gray-900">
                            <ColoredName
                              items={designDetails.petNameItems}
                              fallback={designDetails.petName.collar1}
                            />
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded p-3 border border-gray-100">
                          <span className="font-medium text-gray-600">Collar 2:</span>
                          <div className="text-gray-900">
                            <ColoredName
                              items={designDetails.secondCollarItems}
                              fallback={designDetails.petName.collar2}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded p-3 border border-gray-100">
                        <div className="text-xl">
                          <ColoredName
                            items={designDetails.petNameItems}
                            fallback={designDetails.petName}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción compactos */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button
              onClick={() => onConfirmOrder()}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 text-base shadow-lg"
            >
              <MessageCircleIcon />
              📱 Enviar por WhatsApp
            </Button>
            
            <Button
              onClick={onClose}
              variant="secondary"
              className="w-full text-gray-600 hover:bg-gray-100 py-4 border border-gray-300 text-base"
            >
              ✏️ Editar Diseño
            </Button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-4">
            <h4 className="font-bold text-blue-800 mb-4 text-lg">📋 Pasos para completar tu pedido:</h4>
            <ol className="text-blue-700 text-base space-y-3">
              <li className="flex items-start"><span className="font-bold text-lg mr-2">1.</span> <span className="font-medium">Toma screenshot de esta pantalla</span></li>
              <li className="flex items-start"><span className="font-bold text-lg mr-2">2.</span> <span className="font-medium">Presiona el botón &quot;Enviar por WhatsApp&quot;</span></li>
              <li className="flex items-start"><span className="font-bold text-lg mr-2">3.</span> <span className="font-medium">En WhatsApp, adjunta el screenshot de tu orden</span></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────────
   WRAPPER – elige mobile vs desktop
   ─────────────────────────────────────────────── */
export default function DesignPreviewModal({
  isOpen,
  onClose,
  imageUrl,
  secondImageUrl,
  designDetails,
  onConfirmOrder
}: DesignPreviewModalProps) {
  if (!isOpen) return null

  const sharedProps = { imageUrl, secondImageUrl, designDetails, onClose, onConfirmOrder }

  return (
    <>
      {/* Mobile: visible < md */}
      <div className="block md:hidden">
        <MobileSummary {...sharedProps} />
      </div>
      {/* Desktop: visible >= md */}
      <div className="hidden md:block">
        <DesktopSummary {...sharedProps} />
      </div>
    </>
  )
}