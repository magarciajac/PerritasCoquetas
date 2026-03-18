'use client'

import { Button } from './ui/Button'

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <nav className="hidden md:flex space-x-12 flex-1 justify-center">
            <a href="#inicio" className="text-gray-600 hover:text-orange-300 transition-colors text-lg font-medium">
              Inicio
            </a>
            <a href="#disenos" className="text-gray-600 hover:text-orange-300 transition-colors text-lg font-medium">
              Diseños
            </a>
            <a href="#personalizar" className="text-gray-600 hover:text-orange-300 transition-colors text-lg font-medium">
              Personalizar
            </a>
            <a href="#como-funciona" className="text-gray-600 hover:text-orange-300 transition-colors text-lg font-medium">
              Cómo Funciona
            </a>
          </nav>
          
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('https://wa.me/526143663694?text=Hola! Me interesa conocer más sobre los collares personalizados', '_blank')}
              className="border-orange-200 text-orange-300 hover:bg-orange-50 px-6 py-3 text-lg font-medium"
            >
              Mensaje por WhatsApp
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-800">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}