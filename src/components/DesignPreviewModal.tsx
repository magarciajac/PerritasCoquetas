'use client'

import { Button } from './ui/Button'

// Componentes de iconos SVG inline
const XIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
)

const MessageCircleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

interface DesignPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  secondImageUrl?: string  // Nueva prop para la segunda imagen del combinado
  designDetails: {
    designType: string
    embroideryType: string
    color: string
    letterStyle: string
    letterStyleImage?: string  // Nueva prop para imagen de letra
    letterColor: string
    charmType: string
    charmTypeImage?: string    // Nueva prop para imagen de charm
    petName: string | { collar1: string; collar2: string }
    size: string
  }
  onConfirmOrder: () => void
}

export default function DesignPreviewModal({
  isOpen,
  onClose,
  imageUrl,
  secondImageUrl,
  designDetails,
  onConfirmOrder
}: DesignPreviewModalProps) {
  if (!isOpen) return null

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
                    <p className="text-gray-700 font-semibold text-base">{designDetails.color}</p>
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
                          <p className="text-gray-900 font-bold">{designDetails.petName.collar1}</p>
                        </div>
                        <div className="bg-gray-50 rounded p-3 border border-gray-100">
                          <span className="font-medium text-gray-600">Collar 2:</span>
                          <p className="text-gray-900 font-bold">{designDetails.petName.collar2}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded p-3 border border-gray-100">
                        <p className="text-gray-900 font-bold text-xl">{designDetails.petName}</p>
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
              <li className="flex items-start"><span className="font-bold text-lg mr-2">2.</span> <span className="font-medium">Presiona el botón "Enviar por WhatsApp"</span></li>
              <li className="flex items-start"><span className="font-bold text-lg mr-2">3.</span> <span className="font-medium">En WhatsApp, adjunta el screenshot de tu orden</span></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}