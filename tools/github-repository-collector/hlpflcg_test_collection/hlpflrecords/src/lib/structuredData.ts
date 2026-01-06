/**
 * Structured Data (JSON-LD) for SEO
 * Helps search engines understand the content and context of the website
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "HLPFL",
  "alternateName": "HLPFL",
  "url": "https://hlpfl.org",
  "logo": "https://hlpfl.org/logo.svg",
  "description": "Premier record label dedicated to discovering, developing, and promoting exceptional musical talent. Founded in 2009 with revolutionary 50/50 artist partnerships.",
  "foundingDate": "2009",
  "founders": [
    {
      "@type": "Person",
      "name": "James Rockel",
      "jobTitle": "Founder & CEO"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Music Row",
    "addressLocality": "Grand Rapids",
    "addressRegion": "MI",
    "postalCode": "37203",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-616-313-5215",
    "contactType": "Customer Service",
    "email": "contact@hlpfl.org",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://twitter.com/hlpflrecords",
    "https://instagram.com/hlpflrecords",
    "https://facebook.com/hlpflrecords",
    "https://youtube.com/hlpflrecords"
  ]
}

export const musicGroupSchema = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "name": "HLPFL Artists",
  "description": "Collective of talented artists signed to HLPFL",
  "genre": ["Hip Hop", "R&B", "Pop", "Electronic"],
  "foundingLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Grand Rapids",
      "addressRegion": "MI",
      "addressCountry": "US"
    }
  }
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "HLPFL",
  "url": "https://hlpfl.org",
  "description": "Official website of HLPFL - Premier record label for artist development and music production",
  "publisher": {
    "@type": "Organization",
    "name": "HLPFL"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://hlpfl.org/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Music Production & Artist Development",
  "provider": {
    "@type": "Organization",
    "name": "HLPFL"
  },
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Music Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Artist Development",
          "description": "Comprehensive artist development program with 50/50 partnership model"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Music Production",
          "description": "Professional music production and recording services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Distribution",
          "description": "Global music distribution across all major platforms"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Marketing & Promotion",
          "description": "Strategic marketing and promotional campaigns for artists"
        }
      }
    ]
  }
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is HLPFL' 50/50 partnership model?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HLPFL offers a revolutionary 50/50 partnership model where artists retain 50% ownership of their work while receiving full support from our label. This ensures fair compensation and creative control for artists."
      }
    },
    {
      "@type": "Question",
      "name": "How can I submit my music to HLPFL?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can submit your music through our contact form by selecting 'Artist Submission' as the inquiry type. Include links to your work and a brief bio. We review all submissions and respond within 1-2 weeks."
      }
    },
    {
      "@type": "Question",
      "name": "What services does HLPFL provide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HLPFL provides comprehensive services including artist development, music production, global distribution, marketing and promotion, and ongoing career support for our artists."
      }
    }
  ]
}

/**
 * Helper function to generate JSON-LD script tag
 */
export function generateStructuredData(schema: object): string {
  return JSON.stringify(schema)
}