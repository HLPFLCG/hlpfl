import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HLPFL - Chaos to Clarity',
  description: 'HLPFL - Est. 2019, pronounced "helpful". From chaos to clarity. Grand Rapids, MI.',
  metadataBase: new URL('https://new.hlpfl.org'),
  alternates: {
    canonical: '/',
  },
}

export default function MinimalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}