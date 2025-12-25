import React from 'react'
import Script from 'next/script'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturedArtistsSection } from '@/components/sections/FeaturedArtistsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { organizationSchema, websiteSchema, serviceSchema } from '@/lib/structuredData'

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      
      <HeroSection />
      <FeaturedArtistsSection />
      <ServicesSection />
      <AboutSection />
    </>
  )
}
