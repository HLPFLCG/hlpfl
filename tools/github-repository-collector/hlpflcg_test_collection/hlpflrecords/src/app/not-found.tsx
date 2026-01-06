'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Home, Search, Music, ArrowLeft } from 'lucide-react'

/**
 * Custom 404 Not Found page
 * Provides helpful navigation options when users land on non-existent pages
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-gold/20 to-gold/5 rounded-full mb-6">
            <span className="text-6xl font-black text-gold">404</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Looks like this page doesn&apos;t exist or has been moved. 
          Don&apos;t worry, we&apos;ll help you find what you&apos;re looking for.
        </p>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Link href="/" className="block">
            <div className="bg-dark-secondary hover:bg-dark-tertiary p-6 rounded-lg transition-all duration-300 hover:scale-105 border border-gray-800 hover:border-gold/30">
              <Home className="w-8 h-8 text-gold mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Go Home</h3>
              <p className="text-gray-400 text-sm">Return to the homepage</p>
            </div>
          </Link>

          <Link href="/artists" className="block">
            <div className="bg-dark-secondary hover:bg-dark-tertiary p-6 rounded-lg transition-all duration-300 hover:scale-105 border border-gray-800 hover:border-gold/30">
              <Music className="w-8 h-8 text-gold mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Our Artists</h3>
              <p className="text-gray-400 text-sm">Discover our talent</p>
            </div>
          </Link>

          <Link href="/releases" className="block">
            <div className="bg-dark-secondary hover:bg-dark-tertiary p-6 rounded-lg transition-all duration-300 hover:scale-105 border border-gray-800 hover:border-gold/30">
              <Search className="w-8 h-8 text-gold mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Browse Releases</h3>
              <p className="text-gray-400 text-sm">Explore our music</p>
            </div>
          </Link>

          <Link href="/contact" className="block">
            <div className="bg-dark-secondary hover:bg-dark-tertiary p-6 rounded-lg transition-all duration-300 hover:scale-105 border border-gray-800 hover:border-gold/30">
              <ArrowLeft className="w-8 h-8 text-gold mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Contact Us</h3>
              <p className="text-gray-400 text-sm">Get in touch</p>
            </div>
          </Link>
        </div>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          
          <Link href="/contact">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Report Issue
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-gray-500 text-sm mt-8">
          Error Code: 404 | Page Not Found
        </p>
      </div>
    </div>
  )
}
