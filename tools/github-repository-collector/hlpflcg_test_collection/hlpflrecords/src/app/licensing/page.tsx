'use client'

import React from 'react'
import { Music, Film, Tv, Radio, Globe, Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function LicensingPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gold to-gold-dark rounded-2xl mb-6">
            <Music className="w-10 h-10 text-dark" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Music Licensing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access our catalog of exceptional music for your film, TV, commercial, game, or digital project. 
            Professional licensing with transparent pricing and quick turnaround.
          </p>
        </div>

        {/* Licensing Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-xl p-6 text-center">
            <Film className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Film & TV</h3>
            <p className="text-sm text-gray-400">
              Sync licensing for movies, series, and documentaries
            </p>
          </div>

          <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-xl p-6 text-center">
            <Tv className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Commercials</h3>
            <p className="text-sm text-gray-400">
              Music for advertising campaigns and brand content
            </p>
          </div>

          <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-xl p-6 text-center">
            <Radio className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Games & Apps</h3>
            <p className="text-sm text-gray-400">
              Interactive media and gaming soundtracks
            </p>
          </div>

          <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-xl p-6 text-center">
            <Globe className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Digital Content</h3>
            <p className="text-sm text-gray-400">
              YouTube, podcasts, social media, and streaming
            </p>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">Licensing Tiers</h2>
          <p className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto">
            Choose the licensing tier that fits your project's scope and budget
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Tier */}
            <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gray-700 rounded-2xl p-8 hover:border-gold/50 transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Basic</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-white">$500</span>
                  <span className="text-gray-400 ml-2">per track</span>
                </div>
                <p className="text-gray-400">Perfect for small projects and independent creators</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Single platform usage</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Up to 100K views/impressions</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">1-year license term</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Digital distribution only</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Standard support</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </div>

            {/* Professional Tier */}
            <div className="bg-gradient-to-br from-gold/10 to-gold-dark/10 border-2 border-gold rounded-2xl p-8 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gold text-dark px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-white">$2,500</span>
                  <span className="text-gray-400 ml-2">per track</span>
                </div>
                <p className="text-gray-400">Ideal for commercial projects and brands</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Multi-platform usage</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Up to 1M views/impressions</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">3-year license term</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Digital + broadcast rights</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Regional territory rights</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Priority support</span>
                </li>
              </ul>

              <Button className="w-full bg-gradient-to-r from-gold to-gold-dark text-dark">
                Get Started
              </Button>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gray-700 rounded-2xl p-8 hover:border-gold/50 transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-white">Custom</span>
                </div>
                <p className="text-gray-400">For major productions and global campaigns</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Unlimited platform usage</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Unlimited views/impressions</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Perpetual license option</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Worldwide territory rights</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Exclusive usage options</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Custom clearance services</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gold">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Browse Catalog</h3>
              <p className="text-gray-400">
                Explore our diverse music catalog and find the perfect track for your project
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gold">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Submit Request</h3>
              <p className="text-gray-400">
                Fill out our licensing form with your project details and requirements
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gold">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Get Quote</h3>
              <p className="text-gray-400">
                Receive a custom quote within 24 hours based on your usage needs
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gold">4</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">License & Use</h3>
              <p className="text-gray-400">
                Sign the agreement, receive your files, and start using the music
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-gold/10 to-gold-dark/10 border border-gold/30 rounded-2xl p-12 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to License Music?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get started with our simple licensing process or contact our team for custom solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-gold to-gold-dark text-dark">
                Request a License
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/releases">
              <Button size="lg" variant="outline">
                Browse Catalog
              </Button>
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gold mb-2">
                What's included in a sync license?
              </h3>
              <p className="text-gray-300">
                A sync license grants you the right to synchronize our music with your visual content. This includes the master recording and composition rights. The specific terms depend on your chosen tier and usage requirements.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gold mb-2">
                How long does the licensing process take?
              </h3>
              <p className="text-gray-300">
                We provide quotes within 24 hours of receiving your request. Once approved, licenses are typically issued within 2-3 business days. For urgent projects, we offer expedited processing.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gold mb-2">
                Can I use the music worldwide?
              </h3>
              <p className="text-gray-300">
                Territory rights vary by tier. Basic licenses cover single territories, Professional covers regional rights, and Enterprise offers worldwide rights. We can customize territory coverage based on your needs.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gold mb-2">
                What if I need exclusive rights?
              </h3>
              <p className="text-gray-300">
                Exclusive licensing is available through our Enterprise tier. This prevents the track from being licensed to other parties during your license period. Contact us for exclusive licensing quotes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gold mb-2">
                Do you offer custom music production?
              </h3>
              <p className="text-gray-300">
                Yes! In addition to licensing existing tracks, we offer custom music production services. Our talented artists and producers can create original music tailored to your project's specific needs.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gold mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-300">
                We accept all major credit cards, wire transfers, and ACH payments. For Enterprise clients, we can arrange custom payment terms and invoicing schedules.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Have Questions?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Our licensing team is here to help you find the perfect music for your project
          </p>
          <Link href="/contact">
            <Button size="lg" variant="outline">
              Contact Licensing Team
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}