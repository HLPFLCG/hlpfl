'use client'

import React from 'react'
import { Music, Upload, Mail, User, Phone, Link as LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function SubmitMusicPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gold to-gold-dark rounded-2xl mb-6">
            <Music className="w-10 h-10 text-dark" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Submit Your Music
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join the HLPFL family and take your music career to the next level. 
            We're always looking for talented artists to join our revolutionary 50/50 partnership program.
          </p>
        </div>

        {/* Submission Form */}
        <div className="bg-dark-secondary rounded-2xl p-8 border border-gold/20">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">What We're Looking For</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>Original, authentic music with commercial potential</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>Artists with a clear vision and strong work ethic</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>Professional quality recordings and productions</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>Active social media presence and fan engagement</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Our 50/50 Model</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>Fair revenue sharing - you keep 50% of all earnings</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>Full creative control and artistic freedom</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>Comprehensive marketing and distribution support</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>Transparent accounting and regular royalty payments</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center py-8 border-t border-gold/20">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Submit?</h3>
            <p className="text-gray-300 mb-6">
              Send us your best 2-3 tracks along with a brief introduction about yourself and your music.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-gold to-gold-dark text-dark">
                <Mail className="mr-2 h-5 w-5" />
                Email Submission
              </Button>
              <Button variant="outline" size="lg">
                <Upload className="mr-2 h-5 w-5" />
                Upload Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-white mb-6">Get in Touch</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-dark-secondary rounded-xl p-6 border border-gray-800">
              <Mail className="w-8 h-8 text-gold mb-4 mx-auto" />
              <h4 className="text-white font-semibold mb-2">Email</h4>
              <p className="text-gray-300">submissions@hlpflrecords.com</p>
            </div>
            <div className="bg-dark-secondary rounded-xl p-6 border border-gray-800">
              <LinkIcon className="w-8 h-8 text-gold mb-4 mx-auto" />
              <h4 className="text-white font-semibold mb-2">Submit Online</h4>
              <p className="text-gray-300">Use our contact form for detailed submissions</p>
            </div>
            <div className="bg-dark-secondary rounded-xl p-6 border border-gray-800">
              <Phone className="w-8 h-8 text-gold mb-4 mx-auto" />
              <h4 className="text-white font-semibold mb-2">Phone</h4>
              <p className="text-gray-300">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}