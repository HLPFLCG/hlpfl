import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HLPFL Records - World-Class Record Label',
    short_name: 'HLPFL',
    description: 'Premier record label dedicated to discovering, developing, and promoting exceptional musical talent.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#c87941',
    icons: [
      {
        src: '/images/favicon/hlpflsymbolpnggradient.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/favicon/hlpflsymbolpnggradient.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['music', 'entertainment', 'business'],
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en-US',
  }
}
