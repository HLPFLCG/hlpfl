'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  variant?: 'default' | 'glass' | 'premium' | 'minimal'
}

export function Card({ children, className, hover = false, onClick, variant = 'default' }: CardProps) {
  const variants = {
    default: 'bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gray-800',
    glass: 'glass border border-gold/20',
    premium: 'bg-gradient-to-br from-gray-900 via-dark-secondary to-gray-900 border border-gold/30',
    minimal: 'bg-transparent border border-gray-800/50',
  }
  
  const hoverEffects = hover ? 'card-premium cursor-pointer' : ''
  
  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-500',
        variants[variant],
        hoverEffects,
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('mb-6', className)}>
      {children}
    </div>
  )
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('space-y-4', className)}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('mt-6 pt-6 border-t border-gray-700/50', className)}>
      {children}
    </div>
  )
}

export function CardMedia({ 
  children, 
  className, 
  aspectRatio = 'square' 
}: { 
  children: React.ReactNode
  className?: string
  aspectRatio?: 'square' | 'video' | 'portrait' 
}) {
  const aspectRatios = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
  }
  
  return (
    <div className={cn('relative overflow-hidden rounded-xl', aspectRatios[aspectRatio], className)}>
      {children}
    </div>
  )
}