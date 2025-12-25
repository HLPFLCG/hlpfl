'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { mockArtists } from '@/data/mockData'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function FeaturedArtistsSection() {
  return (
    <section className="py-20 px-4 bg-dark">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="text-gold">Artists</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Discover the incredible talent that makes up the HLPFL family. 
            From emerging voices to established stars, our artists represent the best in contemporary music.
          </p>
          <Link href="/artists">
            <Button variant="outline">
              View All Artists
            </Button>
          </Link>
        </div>

        {/* Artists Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockArtists.map((artist, index) => (
            <Card key={artist.id[1]} hover className="overflow-hidden group">
              <div className="relative aspect-square overflow-hidden">
                {artist.image && (
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${artist.image})` }}
                  />
                )}
                {!artist.image && (
                  <div className="w-full h-full bg-gradient-to-br from-gold/20 to-dark-tertiary flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-gold text-2xl font-bold">
                          {artist.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">Artist Image</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                  {artist.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {artist.genre.join(' • ')}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {artist.bio}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full"
                  onClick={() => alert(`Artist profile for ${artist.name} coming soon!`)}
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA for New Artists */}
        <div className="mt-16 text-center">
          <div className="border border-gray-800 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Are You the Next HLPFL Artist?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              We're always looking for exceptional talent to join our roster. 
              If you're passionate about music and ready to take your career to the next level, 
              we want to hear from you.
            </p>
            <Link href="/contact">
              <Button>
                Submit Your Music
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
