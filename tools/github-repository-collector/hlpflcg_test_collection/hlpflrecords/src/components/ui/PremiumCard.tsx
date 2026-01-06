'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Card, CardProps } from './Card'

interface PremiumCardProps extends CardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  initialScale?: number
  hoverScale?: number
}

export function PremiumCard({ 
  children, 
  className, 
  delay = 0,
  duration = 0.6,
  initialScale = 0.9,
  hoverScale = 1.05,
  ...cardProps 
}: PremiumCardProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: initialScale,
        y: 30 
      }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        y: 0 
      }}
      transition={{ 
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: hoverScale,
        y: -10
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card 
        variant="premium" 
        hover 
        className={cn('transform-gpu', className)}
        {...cardProps}
      >
        {children}
      </Card>
    </motion.div>
  )
}

interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function AnimatedText({ 
  children, 
  className, 
  delay = 0,
  duration = 0.8,
  direction = 'up'
}: AnimatedTextProps) {
  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 }
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        ...directions[direction]
      }}
      whileInView={{ 
        opacity: 1,
        x: 0,
        y: 0
      }}
      transition={{ 
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ParallaxElementProps {
  children: React.ReactNode
  className?: string
  speed?: number
  offset?: number
}

export function ParallaxElement({ 
  children, 
  className, 
  speed = 0.5 
}: ParallaxElementProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [offset, setOffset] = React.useState(0)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const scrolled = window.pageYOffset
      const rate = scrolled * -speed
      
      setOffset(rate)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <motion.div
      ref={ref}
      style={{ transform: `translateY(${offset}px)` }}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}