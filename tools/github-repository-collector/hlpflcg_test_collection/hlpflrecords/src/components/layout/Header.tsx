'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Music } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Logo from '@/components/Logo'
import { GlobalSearch } from '@/components/search/GlobalSearch'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navigation = [
    { name: 'Home', href: '/', icon: null },
    { name: 'Artists', href: '/artists', icon: null },
    { name: 'Releases', href: '/releases', icon: null },
    { name: 'About', href: '/about', icon: null },
    { name: 'News', href: '/news', icon: null },
    { name: 'Contact', href: '/contact', icon: null },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-dark py-2' : 'glass py-4'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Enhanced Logo */}
            <Link href="/" className="group flex items-center space-x-3">
              <div className="relative">
                <Logo width={48} height={48} className="w-12 h-12 shadow-lg group-hover:shadow-gold transition-all duration-300 group-hover:scale-105" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl leading-none">HLPFL</span>
              </div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="nav-link-premium text-gray-300 hover:text-gold font-medium transition-all duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Search & CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <GlobalSearch />
              <Link href="/contact">
                <Button variant="outline" size="sm" className="btn-premium group">
                  <span className="mr-2">Submit Music</span>
                  <div className="w-0 group-hover:w-4 h-0.5 bg-gold transition-all duration-300" />
                </Button>
              </Link>
            </div>

            {/* Enhanced Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="touch-feedback p-2 rounded-lg glass hover:bg-gold/10 transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X size={24} className="text-gold" />
                ) : (
                  <Menu size={24} className="text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Enhanced Mobile Navigation Overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        <div className={`absolute top-0 left-0 h-full w-80 max-w-[85vw] glass-dark transform transition-all duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-gold/20">
              <div className="flex items-center space-x-3">
                <Logo width={40} height={40} className="w-10 h-10" />
                <div className="flex flex-col">
                  <span className="text-white font-bold text-lg leading-none">HLPFL</span>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="touch-feedback p-2 rounded-lg hover:bg-gold/10 transition-all duration-300"
              >
                <X size={20} className="text-gray-300" />
              </button>
            </div>

            {/* Mobile Navigation Items */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-2">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-between p-4 rounded-lg text-gray-300 hover:text-gold hover:bg-gold/10 transition-all duration-300 group"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="font-medium">{item.name}</span>
                    <div className="w-5 h-5 rounded-full border-2 border-gold/30 group-hover:border-gold transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="p-6 border-t border-gold/20">
              <Link href="/contact">
                <Button className="w-full btn-premium group">
                  <Music className="mr-3 h-5 w-5" />
                  Submit Your Music
                  <div className="ml-auto w-0 group-hover:w-4 h-0.5 bg-gold transition-all duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
