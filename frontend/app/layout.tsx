import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ErrorBoundary from '@/components/ErrorBoundary';
import { ToastProvider } from '@/components/Toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HLPFL - Social Media Management Platform',
  description: 'Artist-first social media management with complete financial transparency',
  keywords: [
    'social media management',
    'artist management',
    'content scheduling',
    'analytics',
    'HLPFL',
  ],
  authors: [{ name: 'HLPFL' }],
  creator: 'HLPFL',
  publisher: 'HLPFL',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portal.hlpfl.org',
    title: 'HLPFL - Social Media Management Platform',
    description: 'Artist-first social media management with complete financial transparency',
    siteName: 'HLPFL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HLPFL - Social Media Management Platform',
    description: 'Artist-first social media management with complete financial transparency',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#9333ea',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#9333ea" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          {children}
          <ToastProvider />
        </ErrorBoundary>
      </body>
    </html>
  );
}