'use client'

import React from 'react'
import { Users, Music, Radio, Tv, Globe, Building, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function PartnersPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gold to-gold-dark rounded-2xl mb-6">
            <Users className="w-10 h-10 text-dark" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Partners
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We collaborate with industry-leading partners to provide our artists with the best distribution, 
            technology, media exposure, and performance opportunities.
          </p>
        </div>

        {/* Partner Categories */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Partner Network</h2>
          
          {/* Distribution Partners */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <Music className="w-8 h-8 text-gold mr-4" />
              <h3 className="text-2xl font-bold text-white">Distribution Partners</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { name: 'Spotify', logo: '🎵' },
                { name: 'Apple Music', logo: '🍎' },
                { name: 'Amazon Music', logo: '📦' },
                { name: 'YouTube Music', logo: '▶️' },
                { name: 'Tidal', logo: '🌊' },
                { name: 'Deezer', logo: '🎧' },
              ].map((partner) => (
                <div 
                  key={partner.name}
                  className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-xl p-6 text-center hover:border-gold/50 transition-all hover:transform hover:scale-105"
                >
                  <div className="text-4xl mb-3">{partner.logo}</div>
                  <p className="text-white font-semibold text-sm">{partner.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Partners */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <Globe className="w-8 h-8 text-gold mr-4" />
              <h3 className="text-2xl font-bold text-white">Technology Partners</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[
                { name: 'Cloudflare', logo: '☁️' },
                { name: 'Next.js', logo: '▲' },
                { name: 'Vercel', logo: '🔺' },
                { name: 'GitHub', logo: '🐙' },
                { name: 'Stripe', logo: '💳' },
              ].map((partner) => (
                <div 
                  key={partner.name}
                  className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-xl p-6 text-center hover:border-gold/50 transition-all hover:transform hover:scale-105"
                >
                  <div className="text-4xl mb-3">{partner.logo}</div>
                  <p className="text-white font-semibold text-sm">{partner.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Media Partners */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <Tv className="w-8 h-8 text-gold mr-4" />
              <h3 className="text-2xl font-bold text-white">Media Partners</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[
                { name: 'Complex', logo: '📰' },
                { name: 'Pitchfork', logo: '🎸' },
                { name: 'Billboard', logo: '📊' },
                { name: 'Rolling Stone', logo: '🎤' },
                { name: 'The FADER', logo: '📻' },
              ].map((partner) => (
                <div 
                  key={partner.name}
                  className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-xl p-6 text-center hover:border-gold/50 transition-all hover:transform hover:scale-105"
                >
                  <div className="text-4xl mb-3">{partner.logo}</div>
                  <p className="text-white font-semibold text-sm">{partner.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Venue Partners */}
          <div>
            <div className="flex items-center mb-8">
              <Building className="w-8 h-8 text-gold mr-4" />
              <h3 className="text-2xl font-bold text-white">Venue Partners</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Madison Square Garden', logo: '🏟️' },
                { name: 'The Fillmore', logo: '🎭' },
                { name: 'House of Blues', logo: '🎵' },
                { name: 'Red Rocks', logo: '🏔️' },
              ].map((partner) => (
                <div 
                  key={partner.name}
                  className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-xl p-6 text-center hover:border-gold/50 transition-all hover:transform hover:scale-105"
                >
                  <div className="text-4xl mb-3">{partner.logo}</div>
                  <p className="text-white font-semibold text-sm">{partner.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partner Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">What Our Partners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mr-4">
                  <Music className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-white font-semibold">Distribution Partner</p>
                  <p className="text-sm text-gray-400">Major Streaming Platform</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                "HLPFL consistently delivers high-quality content and maintains excellent communication. 
                Their artist-first approach sets them apart in the industry."
              </p>
              <div className="flex text-gold">
                {'★'.repeat(5)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mr-4">
                  <Radio className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-white font-semibold">Media Partner</p>
                  <p className="text-sm text-gray-400">Music Publication</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                "Working with HLPFL is always a pleasure. They bring us incredible talent and stories 
                that resonate with our audience. True professionals."
              </p>
              <div className="flex text-gold">
                {'★'.repeat(5)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mr-4">
                  <Building className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-white font-semibold">Venue Partner</p>
                  <p className="text-sm text-gray-400">Concert Hall</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                "HLPFL artists always deliver unforgettable performances. Their professionalism and talent 
                make every show a success. We love hosting their events."
              </p>
              <div className="flex text-gold">
                {'★'.repeat(5)}
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Partnership Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">For Distribution Partners</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Access to high-quality, curated content</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Exclusive early releases and premieres</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Professional metadata and asset delivery</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Dedicated account management</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Marketing and promotional support</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">For Media Partners</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Exclusive interviews and content access</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Early access to new releases and announcements</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Press kits and promotional materials</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Artist availability for features and reviews</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Co-marketing opportunities</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">For Technology Partners</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Integration opportunities with our platform</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Case study and success story features</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Beta testing and feedback opportunities</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Co-branded marketing initiatives</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Industry event collaboration</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">For Venue Partners</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Access to touring artists and talent</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Professional event coordination</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Marketing and promotional support</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Guaranteed professional performances</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Long-term booking relationships</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Become a Partner CTA */}
        <div className="bg-gradient-to-br from-gold/10 to-gold-dark/10 border border-gold/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Become a Partner
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our network of industry-leading partners and help us shape the future of music. 
            We're always looking for innovative collaborations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">50+</div>
              <div className="text-sm text-gray-400">Active Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">100+</div>
              <div className="text-sm text-gray-400">Collaborations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">15+</div>
              <div className="text-sm text-gray-400">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">5+</div>
              <div className="text-sm text-gray-400">Years</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-gold to-gold-dark text-dark">
                Partner With Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Partnership Criteria */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Partnership Criteria</h2>
          <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-8 md:p-12">
            <p className="text-gray-300 leading-relaxed mb-6">
              We carefully select partners who share our values and commitment to artist development. 
              We look for organizations that:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Demonstrate industry leadership and innovation</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Share our commitment to artist empowerment</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Maintain high professional standards</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Offer complementary services or reach</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Value long-term relationships over quick wins</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Embrace transparency and fair practices</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Bring unique value to our artist community</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Align with our vision for the music industry</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}