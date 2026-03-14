'use client'

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-light transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.02]'
    
    const variants = {
      primary: 'bg-gray-800 text-white hover:bg-gray-900 shadow-md hover:shadow-lg',
      secondary: 'bg-orange-200 text-gray-800 hover:bg-orange-300',
      outline: 'border border-gray-200 bg-transparent hover:bg-gray-50 text-gray-700'
    }
    
    const sizes = {
      sm: 'h-10 px-4 text-sm',
      md: 'h-12 px-6 text-base', 
      lg: 'h-14 px-8 text-lg'
    }
    
    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} rounded-full ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'