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
  designDetails: {
    color: string
    font: string
    petName: string
    charm: string
  }
  onConfirmOrder: () => void
  onDownload: () => void
}

export default function DesignPreviewModal({
  isOpen,
  onClose,
  imageUrl,
  designDetails,
  onConfirmOrder,
  onDownload
}: DesignPreviewModalProps) {
  if (!isOpen) return null

  const colorNames: Record<string, string> = {
    'Rosa Empolvado': 'Rosa Empolvado',
    'Beige': 'Beige', 
    'Verde Sage': 'Verde Sage',
    'Lavanda': 'Lavanda',
    'Camel': 'Camel',
    'Negro': 'Negro'
  }

  const fontNames: Record<string, string> = {
    'dorado': 'Cuero Dorado',
    'rosa': 'Tela Rosa',
    'plata': 'Sintético Plata',
    'negro': 'Cuero Negro'
  }

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-100/50">
          <h3 className="text-2xl font-bold text-stone-800">
            Confirmar Diseño
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-100/50 rounded-full transition-colors backdrop-blur-sm"
          >
            <XIcon />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image Preview */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-stone-50/80 to-stone-100/60 backdrop-blur-sm rounded-2xl p-6 inline-block border border-white/30 shadow-lg">
              <img
                src={imageUrl}
                alt="Diseño personalizado"
                className="w-64 h-48 object-contain mx-auto rounded-xl shadow-md"
              />
            </div>
            <p className="text-sm text-stone-600 mt-3 font-medium">
              Vista previa de tu collar personalizado
            </p>
          </div>

          {/* Instructions Box */}
          <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/70 backdrop-blur-sm border border-blue-200/50 rounded-2xl p-5 shadow-lg">
            <h5 className="font-semibold text-blue-800 mb-3 text-center text-lg">
              📱 Como adjuntar la imagen en WhatsApp
            </h5>
            <ol className="text-sm text-blue-700 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                <span>Se descargará automáticamente</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                <span>En WhatsApp, presiona el botón 📎 (clip)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                <span>Selecciona "Documento" o "Archivo"</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                <span>Busca en "Descargas" la imagen</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">5</span>
                <span>¡Selecciona y envía!</span>
              </li>
            </ol>
          </div>

          {/* Design Details */}
          <div className="bg-gradient-to-br from-stone-50/70 to-stone-100/50 backdrop-blur-sm rounded-2xl p-5 space-y-3 border border-white/30 shadow-lg">
            <h4 className="font-semibold text-stone-800 text-center text-lg">
              Detalles del Diseño
            </h4>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                <span className="font-medium text-stone-600">Color:</span>
                <p className="text-stone-800 font-semibold">{colorNames[designDetails.color] || designDetails.color}</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                <span className="font-medium text-stone-600">Material:</span>
                <p className="text-stone-800 font-semibold">{fontNames[designDetails.font] || designDetails.font}</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                <span className="font-medium text-stone-600">Nombre:</span>
                <p className="text-stone-800 font-bold text-lg">{designDetails.petName}</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                <span className="font-medium text-stone-600">Dijes:</span>
                <p className="text-stone-800 font-semibold">{designDetails.charm}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-2">
            <Button
              onClick={() => {
                onDownload()
                onConfirmOrder()
              }}
              className="w-full bg-gradient-to-r from-amber-500/90 to-orange-500/90 hover:from-amber-600 hover:to-orange-600 backdrop-blur-sm text-white font-semibold py-4 text-lg shadow-xl border border-white/20"
              size="lg"
            >
              <MessageCircleIcon />
              Descargar y Ordenar por WhatsApp
            </Button>
            
            <Button
              onClick={onDownload}
              variant="outline"
              className="w-full border-stone-300/60 text-stone-700 hover:bg-white/80 backdrop-blur-sm py-3 shadow-lg"
              size="lg"
            >
              <DownloadIcon />
              Solo Descargar Imagen
            </Button>
            
            <Button
              onClick={onClose}
              variant="secondary"
              className="w-full text-stone-600 hover:bg-white/60 backdrop-blur-sm py-2 border border-stone-200/50"
            >
              Editar Diseño
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}