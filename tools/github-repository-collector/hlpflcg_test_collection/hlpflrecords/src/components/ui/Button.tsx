'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'premium'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
  loading?: boolean
}

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  loading = false,
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = 'relative inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-dark overflow-hidden group'
  
  const variants = {
    primary: 'bg-gradient-to-r from-gold to-gold-dark text-dark hover:from-gold-light hover:to-gold shadow-lg hover:shadow-xl hover:shadow-gold/30 transform hover:-translate-y-0.5',
    secondary: 'bg-gradient-to-r from-dark-secondary to-dark-tertiary text-white hover:from-dark-tertiary hover:to-dark border border-gray-700 hover:border-gold/50',
    outline: 'border-2 border-gold text-gold hover:bg-gradient-to-r hover:from-gold hover:to-gold-dark hover:text-dark hover:border-transparent',
    ghost: 'text-gold hover:bg-gold/10 hover:text-gold-light',
    premium: 'bg-gradient-to-r from-gold via-gold-light to-gold text-dark shadow-xl hover:shadow-2xl hover:shadow-gold/40 transform hover:-translate-y-1 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  }
  
  const loadingSpinner = (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  )
  
  return (
    <button
      className={cn(
        baseStyles, 
        variants[variant], 
        sizes[size],
        (loading || disabled) && 'opacity-50 cursor-not-allowed transform-none',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && loadingSpinner}
      <span className={cn(loading && 'opacity-70')}>
        {children}
      </span>
      {variant === 'premium' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      )}
    </button>
  )
}