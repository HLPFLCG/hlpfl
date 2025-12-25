'use client'

import { usePathname } from 'next/navigation'

interface SEOHeadProps {
  title?: string
  description?: string
  image?: string
  type?: string
}

/**
 * SEO Head component for dynamic meta tags
 * Provides page-specific SEO optimization
 */
export function SEOHead({ 
  title = 'HLPFL - World-Class Record Label',
  description = 'Premier record label dedicated to discovering, developing, and promoting exceptional musical talent.',
  image = '/images/og-image.jpg',
  type = 'website'
}: SEOHeadProps) {
  const pathname = usePathname()
  const url = `https://hlpfl.org${pathname}`

  return (
    <>
      {/* This component is for client-side SEO updates */}
      {/* Main SEO is handled in layout.tsx metadata */}
    </>
  )
}
