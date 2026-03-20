'use client'

import { Button } from './ui/Button'

export default function Header() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const headerOffset = 100 // Compensar header sticky + margen extra
      const elementPosition = section.offsetTop
      const offsetPosition = elementPosition - headerOffset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handlePersonalizarClick = () => {
    scrollToSection('personalizar')
  }

  const handleDisenosClick = () => {
    scrollToSection('disenos')
  }

  const handleInicioClick = () => {
    scrollToSection('inicio')
  }

  const handleComoFuncionaClick = () => {
    scrollToSection('como-funciona')
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <nav className="hidden md:flex space-x-12 justify-center flex-1">
            <button onClick={handleInicioClick} className="text-gray-600 hover:text-green-500 transition-colors text-lg font-medium">
              Inicio
            </button>
            <button onClick={handleDisenosClick} className="text-gray-600 hover:text-green-500 transition-colors text-lg font-medium">
              Diseños
            </button>
            <button onClick={handlePersonalizarClick} className="text-gray-600 hover:text-green-500 transition-colors text-lg font-medium">
              Personalizar
            </button>
            <button onClick={handleComoFuncionaClick} className="text-gray-600 hover:text-green-500 transition-colors text-lg font-medium">
              Cómo Funciona
            </button>
          </nav>
          
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