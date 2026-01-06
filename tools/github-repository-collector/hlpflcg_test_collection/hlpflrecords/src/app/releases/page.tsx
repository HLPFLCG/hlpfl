'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { mockReleases } from '@/data/mockData'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Calendar, Filter, Music, Play } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function ReleasesPage() {
  const [filter, setFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('latest')
  
  const types = ['all', 'album', 'single', 'ep']
  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'title', label: 'Title' },
    { value: 'artist', label: 'Artist' },
  ]

  const filteredReleases = mockReleases
    .filter(release => filter === 'all' || release.type === filter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        case 'oldest':
          return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        case 'title':
          return a.title.localeCompare(b.title)
        case 'artist':
          return a.artist.localeCompare(b.artist)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Music <span className="text-gold">Releases</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore our complete discography featuring the latest releases from our talented artists. 
            From chart-topping singles to groundbreaking albums, discover the sound of HLPFL.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-dark-secondary rounded-lg p-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <Filter className="h-5 w-5 text-gold" />
                <div className="flex gap-2">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilter(type)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                        filter === type 
                          ? 'bg-gold text-dark' 
                          : 'bg-dark text-gray-300 hover:text-gold'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-gray-400 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-dark text-gray-300 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Releases Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReleases.map((release) => (
              <Card key={release.id} hover className="overflow-hidden group">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={release.coverArt}
                    alt={`${release.title} by ${release.artist}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-dark px-3 py-1 rounded-full text-xs font-bold capitalize">
                      {release.type}
                    </span>
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button size="lg" className="bg-gold text-dark hover:bg-gold-light">
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-gold transition-colors">
                        {release.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        by <Link href={`/artists/${release.artistId}`} className="hover:text-gold transition-colors">
                          {release.artist}
                        </Link>
                      </p>
                    </div>
                    <div className="flex items-center text-gray-400 text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(release.releaseDate)}
                    </div>
                  </div>
                  
                  {release.description && (
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {release.description}
                    </p>
                  )}
                  
                  {release.tracks && (
                    <div className="mb-4">
                      <p className="text-gray-400 text-sm mb-2">
                        {release.tracks.length} tracks
                      </p>
                      <div className="space-y-1">
                        {release.tracks.slice(0, 3).map((track) => (
                          <div key={track.id} className="flex items-center justify-between text-xs text-gray-400">
                            <span>{track.title}</span>
                            <span>{track.duration}</span>
                          </div>
                        ))}
                        {release.tracks.length > 3 && (
                          <p className="text-xs text-gold">
                            +{release.tracks.length - 3} more tracks
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {release.links && (
                    <div className="flex space-x-2">
                      {release.links.spotify && (
                        <Button variant="ghost" size="sm" className="text-xs px-3">
                          Spotify
                        </Button>
                      )}
                      {release.links.apple && (
                        <Button variant="ghost" size="sm" className="text-xs px-3">
                          Apple Music
                        </Button>
                      )}
                      {release.links.youtube && (
                        <Button variant="ghost" size="sm" className="text-xs px-3">
                          YouTube
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-dark-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Looking for <span className="text-gold">Specific Music</span>?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Browse our artists' profiles or get in touch with us for more information about our catalog.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/artists">
              <Button variant="outline">
                Browse Artists
              </Button>
            </Link>
            <Link href="/contact">
              <Button>
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
