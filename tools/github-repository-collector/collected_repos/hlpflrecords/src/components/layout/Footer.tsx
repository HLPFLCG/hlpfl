import React from 'react'
import Link from 'next/link'
import { Instagram, Twitter, Youtube, Music, Mail } from 'lucide-react'
import Logo from '../Logo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/hlpfl_/' },
    { name: 'Twitter', icon: Twitter, href: 'https://x.com/hlpfl_' },
    { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/channel/UCI1nS0ba_-xx1FurXzQKLIg' },
    { name: 'Spotify', icon: Music, href: 'https://open.spotify.com/track/1pOtUZllzDi0fgrCXP0I15?si=13023055983d4834' },
    { name: 'Email', icon: Mail, href: 'mailto:founder@hlpfl.org' },
  ]

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Artists', href: '/artists' },
      { name: 'Releases', href: '/releases' },
      { name: 'News', href: '/news' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
    artists: [
      { name: 'Submit Music', href: '/submit' },
      { name: 'Artist Portal', href: '/portal' },
      { name: 'Licensing', href: '/licensing' },
    ],
  }

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Logo width={40} height={40} />
              <span className="text-white font-bold text-xl">HLPFL</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              11% commission, 0% BS. We own the tech, you own your success. That's helpful.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-400 hover:text-gold transition-colors duration-300"
                    aria-label={link.name}
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Artists</h3>
            <ul className="space-y-2">
              {footerLinks.artists.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} HLPFL. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            The 11% revolution: No backdoors, no hidden fees, just helpful.
          </p>
        </div>
      </div>
    </footer>
  )
}
