'use client'

import React from 'react'
import { Lock, User, FileText, DollarSign, Calendar, Download, MessageSquare, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function ArtistPortalPage() {
  // This would normally check authentication status
  const isAuthenticated = false

  if (!isAuthenticated) {
    return <LoginView />
  }

  return <DashboardView />
}

function LoginView() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gold to-gold-dark rounded-2xl mb-6">
            <Lock className="w-10 h-10 text-dark" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Artist Portal
          </h1>
          <p className="text-gray-300">
            Access your dashboard, contracts, and resources
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  className="w-full bg-dark border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  required
                  className="w-full bg-dark border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-700 bg-dark text-gold focus:ring-gold focus:ring-offset-dark"
                />
                <span className="text-sm text-gray-300">Remember me</span>
              </label>
              <a href="#" className="text-sm text-gold hover:text-gold-light">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-gold to-gold-dark text-dark font-bold"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">
              Not an artist yet?{' '}
              <Link href="/submit-music" className="text-gold hover:text-gold-light font-semibold">
                Submit your music
              </Link>
            </p>
          </div>
        </div>

        {/* Help */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Need help accessing your account?{' '}
            <Link href="/contact" className="text-gold hover:text-gold-light">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function DashboardView() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome back, Artist Name
          </h1>
          <p className="text-xl text-gray-300">
            Here's what's happening with your music
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-gold" />
              <span className="text-sm text-green-400">+12%</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">1.2M</div>
            <div className="text-sm text-gray-400">Total Streams</div>
          </div>

          <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-gold" />
              <span className="text-sm text-green-400">+8%</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">$4,250</div>
            <div className="text-sm text-gray-400">This Month</div>
          </div>

          <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <User className="w-8 h-8 text-gold" />
              <span className="text-sm text-green-400">+15%</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">45.2K</div>
            <div className="text-sm text-gray-400">Followers</div>
          </div>

          <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-gold" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">3</div>
            <div className="text-sm text-gray-400">Upcoming Releases</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start">
                  <FileText className="mr-3 h-5 w-5" />
                  View Contracts
                </Button>
                <Button variant="outline" className="justify-start">
                  <DollarSign className="mr-3 h-5 w-5" />
                  Royalty Statements
                </Button>
                <Button variant="outline" className="justify-start">
                  <Download className="mr-3 h-5 w-5" />
                  Marketing Materials
                </Button>
                <Button variant="outline" className="justify-start">
                  <MessageSquare className="mr-3 h-5 w-5" />
                  Contact A&R
                </Button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-dark/50 rounded-lg">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">New royalty payment processed</p>
                    <p className="text-sm text-gray-400">$4,250.00 deposited to your account</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-dark/50 rounded-lg">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Track reached 1M streams</p>
                    <p className="text-sm text-gray-400">"Your Song Title" milestone achieved</p>
                    <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-dark/50 rounded-lg">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">New marketing materials available</p>
                    <p className="text-sm text-gray-400">Press kit and promotional assets updated</p>
                    <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Releases */}
            <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Upcoming Releases</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-dark/50 rounded-lg">
                  <div className="w-16 h-16 bg-gold/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-gold" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">New Single</p>
                    <p className="text-sm text-gray-400">Release Date: January 15, 2025</p>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-dark/50 rounded-lg">
                  <div className="w-16 h-16 bg-gold/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-gold" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">EP Release</p>
                    <p className="text-sm text-gray-400">Release Date: February 1, 2025</p>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Resources */}
            <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Resources</h3>
              <div className="space-y-3">
                <a href="#" className="block p-3 bg-dark/50 rounded-lg hover:bg-dark/70 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Artist Guide</span>
                    <Download className="w-4 h-4 text-gray-400" />
                  </div>
                </a>
                <a href="#" className="block p-3 bg-dark/50 rounded-lg hover:bg-dark/70 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Marketing Toolkit</span>
                    <Download className="w-4 h-4 text-gray-400" />
                  </div>
                </a>
                <a href="#" className="block p-3 bg-dark/50 rounded-lg hover:bg-dark/70 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Press Kit</span>
                    <Download className="w-4 h-4 text-gray-400" />
                  </div>
                </a>
                <a href="#" className="block p-3 bg-dark/50 rounded-lg hover:bg-dark/70 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Brand Guidelines</span>
                    <Download className="w-4 h-4 text-gray-400" />
                  </div>
                </a>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Need Help?</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Our team is here to support you every step of the way.
              </p>
              <Button variant="outline" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </div>

            {/* Account */}
            <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Account</h3>
              <div className="space-y-3">
                <a href="#" className="block text-gray-300 hover:text-gold transition-colors text-sm">
                  Profile Settings
                </a>
                <a href="#" className="block text-gray-300 hover:text-gold transition-colors text-sm">
                  Payment Information
                </a>
                <a href="#" className="block text-gray-300 hover:text-gold transition-colors text-sm">
                  Notification Preferences
                </a>
                <a href="#" className="block text-gray-300 hover:text-gold transition-colors text-sm">
                  Security Settings
                </a>
                <button className="block text-red-400 hover:text-red-300 transition-colors text-sm">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}