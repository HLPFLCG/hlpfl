import { useEffect, useState } from 'react'

interface ScrollEffectOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useScrollEffect(
  callback: (entry: IntersectionObserverEntry) => void,
  options: ScrollEffectOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = false } = options
  const [ref, setRef] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback(entry)
          if (triggerOnce) {
            observer.unobserve(ref)
          }
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(ref)

    return () => {
      observer.unobserve(ref)
    }
  }, [ref, callback, threshold, rootMargin, triggerOnce])

  return setRef
}

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset)
    }

    window.addEventListener('scroll', updatePosition)
    updatePosition()

    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  return scrollPosition
}

export function useParallax(speed: number = 0.5) {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref) return
      const rect = ref.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const elementTop = rect.top + scrollTop
      const elementHeight = rect.height
      const windowHeight = window.innerHeight
      
      // Calculate parallax offset
      let newOffset = 0
      if (elementTop < scrollTop + windowHeight && elementTop + elementHeight > scrollTop) {
        const scrolled = (scrollTop + windowHeight - elementTop) / (windowHeight + elementHeight)
        newOffset = (scrolled - 0.5) * elementHeight * speed
      }
      
      setOffset(newOffset)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [ref, speed])

  return { ref: setRef, offset, style: { transform: `translateY(${offset}px)` } }
}