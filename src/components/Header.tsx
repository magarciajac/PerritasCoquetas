'use client'

import { Button } from './ui/Button'

export default function Header() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
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
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <nav className="flex space-x-4 sm:space-x-8 md:space-x-12 justify-center flex-1 overflow-x-auto">
            <button onClick={handleInicioClick} className="text-gray-600 hover:text-green-500 transition-colors text-sm sm:text-base lg:text-lg font-medium whitespace-nowrap">
              Inicio
            </button>
            <button onClick={handleDisenosClick} className="text-gray-600 hover:text-green-500 transition-colors text-sm sm:text-base lg:text-lg font-medium whitespace-nowrap">
              Diseños
            </button>
            <button onClick={handlePersonalizarClick} className="text-gray-600 hover:text-green-500 transition-colors text-sm sm:text-base lg:text-lg font-medium whitespace-nowrap">
              Personalizar
            </button>
            <button onClick={handleComoFuncionaClick} className="text-gray-600 hover:text-green-500 transition-colors text-sm sm:text-base lg:text-lg font-medium whitespace-nowrap">
              Cómo Funciona
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}