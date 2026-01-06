'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { mockArtists } from '@/data/mockData'
import { Card, CardContent, CardMedia } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { PremiumCard, AnimatedText } from '@/components/ui/PremiumCard'
import { Music, Filter, Users, Star, Play } from 'lucide-react'

export default function ArtistsPage() {
  const genres = ['All', 'Pop', 'R&B', 'Hip-Hop', 'Rock', 'Electronic', 'Jazz', 'Classical']
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-dark-secondary">
      {/* Enhanced Header */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-gold/8 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-gold to-gold-dark rounded-2xl shadow-2xl">
              <Users className="text-dark w-8 h-8" />
            </div>
          </motion.div>
          
          <AnimatedText delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Our <span className="gradient-animate bg-clip-text text-transparent">Artists</span>
            </h1>
          </AnimatedText>
          
          <AnimatedText delay={0.3} className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
              Meet the incredible talent that makes up the HLPFL family. 
              Each artist brings their unique voice and vision to our collective mission of creating exceptional music.
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Enhanced Filter Section */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <Filter className="h-5 w-5 text-gold" />
                    <span className="text-gray-300 font-medium">Filter by Genre:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre, index) => (
                      <motion.button
                        key={genre}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 touch-feedback ${
                          genre === 'All' 
                            ? 'bg-gradient-to-r from-gold to-gold-dark text-dark shadow-lg' 
                            : 'bg-dark-secondary text-gray-300 hover:text-gold hover:bg-gold/10 hover:border-gold/30 border border-transparent'
                        }`}
                      >
                        {genre}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex items-center space-x-2 glass-dark px-4 py-2 rounded-xl"
                >
                  <Users className="h-4 w-4 text-gold" />
                  <span className="text-gold font-bold">{mockArtists.length}</span>
                  <span className="text-gray-400 text-sm">Artists</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Artists Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockArtists.map((artist, index) => (
              <PremiumCard 
                key={artist.id} 
                delay={index * 0.1}
                className="group"
              >
                <CardMedia className="mb-6">
                  {artist.image ? (
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${artist.image})` }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-dark-tertiary" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {!artist.image && (
                      <div className="text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                          <span className="text-gold text-3xl font-black">
                            {artist.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">Artist Image</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Play className="h-4 w-4 text-gold" />
                        <span className="text-white text-sm font-medium">Listen Now</span>
                      </div>
                      <Link href={`/artists/${artist.slug}`}>
                        <Button size="sm" className="w-full group/btn">
                          <span>View Profile</span>
                          <div className="ml-auto w-0 group-hover/btn:w-4 h-0.5 bg-dark transition-all duration-300" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardMedia>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                        {artist.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-gold" />
                        <p className="text-gray-400 text-sm font-medium">
                          {artist.genre.join(' • ')}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {artist.bio}
                    </p>
                    
                    {/* Enhanced Social Links */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                      <div className="flex space-x-3">
                        {artist.socials?.spotify && (
                          <motion.a
                            href={artist.socials.spotify}
                            className="w-10 h-10 rounded-lg bg-gold/10 hover:bg-gold/20 flex items-center justify-center transition-all duration-300 group"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Music className="h-4 w-4 text-gold" />
                          </motion.a>
                        )}
                        {artist.socials?.instagram && (
                          <motion.div
                            className="w-10 h-10 rounded-lg bg-gold/10 hover:bg-gold/20 flex items-center justify-center transition-all duration-300 cursor-pointer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="text-gold text-sm font-bold">IG</span>
                          </motion.div>
                        )}
                        {artist.socials?.twitter && (
                          <motion.div
                            className="w-10 h-10 rounded-lg bg-gold/10 hover:bg-gold/20 flex items-center justify-center transition-all duration-300 cursor-pointer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="text-gold text-sm font-bold">TW</span>
                          </motion.div>
                        )}
                      </div>
                      
                      <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gold hover:text-gold-light"
                      onClick={() => alert(`Artist profile for ${artist.name} coming soon!`)}
                    >
                      View Profile →
                    </Button>
                    </div>
                  </div>
                </CardContent>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative glass-dark rounded-3xl p-12 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/20 rounded-full blur-3xl -translate-y-32 translate-x-32" />
              
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-gold to-gold-dark rounded-2xl">
                  <Star className="text-dark w-8 h-8" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Want to Join Our <span className="gradient-animate bg-clip-text text-transparent">Roster</span>?
                </h2>
                
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  We're always looking for exceptional talent to join the HLPFL family. 
                  If you're passionate about music and ready to take your career to the next level, we want to hear from you.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" className="btn-premium group">
                      <Music className="mr-3 h-5 w-5" />
                      Submit Your Music
                      <div className="ml-auto w-0 group-hover:w-4 h-0.5 bg-dark transition-all duration-300" />
                    </Button>
                  </Link>
                  
                  <Button variant="outline" size="lg" className="btn-premium">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
