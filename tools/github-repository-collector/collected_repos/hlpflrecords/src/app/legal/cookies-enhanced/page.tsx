import React from 'react'
import { Cookie, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Cookie Policy | HLPFL',
  description: 'Cookie Policy for HLPFL. Learn how we use cookies and tracking technologies.',
}

export default function CookiesEnhancedPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/"
          className="inline-flex items-center text-gold hover:text-gold-light mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold to-gold-dark rounded-xl mb-6">
            <Cookie className="w-8 h-8 text-dark" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-400">
            Last Updated: December 19, 2024
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-gold max-w-none">
          <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-8 md:p-12 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                This Cookie Policy explains how HLPFL ("we," "us," or "our") uses cookies and similar tracking technologies on our website 
                and services. By using our Services, you consent to our use of cookies as described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. What Are Cookies</h2>
              <p className="text-gray-300 leading-relaxed">
                Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work 
                more efficiently and to provide information to website owners. We use cookies and similar technologies including web beacons, 
                pixels, local storage, session storage, and other tracking mechanisms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">3.1 Essential Cookies</h3>
              <p className="text-gray-300 leading-relaxed">
                These cookies are necessary for the website to function and cannot be disabled. They include cookies that enable you to log in, 
                navigate the site, and access secure areas. Without these cookies, services you have requested cannot be provided.
              </p>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">3.2 Analytics Cookies</h3>
              <p className="text-gray-300 leading-relaxed">
                We use analytics cookies to understand how visitors interact with our website. These cookies collect information about pages visited, 
                time spent on pages, click patterns, and other usage data. We use this information to improve our Services and user experience.
              </p>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">3.3 Marketing and Advertising Cookies</h3>
              <p className="text-gray-300 leading-relaxed">
                These cookies track your browsing habits to deliver targeted advertising. They remember websites you visit and share this information 
                with advertising partners. We may use this data to show you relevant ads on our site and across the internet.
              </p>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">3.4 Social Media Cookies</h3>
              <p className="text-gray-300 leading-relaxed">
                These cookies enable social media features and allow you to share content. Social media platforms may track your activity across 
                different websites and build a profile of your interests.
              </p>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">3.5 Third-Party Cookies</h3>
              <p className="text-gray-300 leading-relaxed">
                We allow third-party service providers to place cookies on your device. These third parties may collect information about your 
                online activities over time and across different websites. We do not control these third-party cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. How We Use Cookies</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use cookies for various purposes, including:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Authenticating users and preventing fraud</li>
                <li>Remembering your preferences and settings</li>
                <li>Analyzing site traffic and usage patterns</li>
                <li>Personalizing content and advertisements</li>
                <li>Measuring the effectiveness of marketing campaigns</li>
                <li>Improving site functionality and user experience</li>
                <li>Tracking conversions and user journeys</li>
                <li>Conducting research and analytics</li>
                <li>Any other lawful business purpose</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Cookie Duration</h2>
              <p className="text-gray-300 leading-relaxed">
                We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device 
                for a set period or until you delete them). Persistent cookies may remain on your device for extended periods, potentially years, 
                to provide ongoing functionality and tracking.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Cookie Choices</h2>
              <p className="text-gray-300 leading-relaxed">
                Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. 
                However, disabling cookies may prevent you from using certain features of our Services and may significantly impact your user experience.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4 font-semibold">
                By continuing to use our Services with cookies enabled, you consent to our use of cookies as described in this policy. 
                We are not responsible for any limitations or issues resulting from your cookie preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Third-Party Cookie Policies</h2>
              <p className="text-gray-300 leading-relaxed">
                Third-party cookies are governed by the privacy policies of those third parties, not this Cookie Policy. We encourage you to 
                review the privacy policies of our third-party partners. We are not responsible for third-party cookie practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Updates to This Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. 
                Your continued use of the Services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have questions about our use of cookies, please contact us:
              </p>
              <div className="mt-4 p-4 bg-dark/50 rounded-lg">
                <p className="text-gray-300">
                  <strong className="text-white">HLPFL - Privacy Team</strong><br />
                  Email: privacy@hlpfl.org<br />
                  General Inquiries: contact@hlpfl.org<br />
                  Website: <a href="https://hlpfl.org" className="text-gold hover:text-gold-light">hlpfl.org</a>
                </p>
              </div>
            </section>

            <section className="mt-8 p-6 bg-gold/5 border border-gold/20 rounded-lg">
              <h3 className="text-lg font-bold text-gold mb-3">Consent</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                BY USING OUR SERVICES, YOU CONSENT TO OUR USE OF COOKIES AND TRACKING TECHNOLOGIES AS DESCRIBED IN THIS POLICY. 
                IF YOU DO NOT AGREE TO OUR USE OF COOKIES, PLEASE DISCONTINUE USE OF THE SERVICES.
              </p>
            </section>

          </div>
        </div>

        {/* Related Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/legal/privacy"
            className="p-4 bg-dark-secondary border border-gold/20 rounded-lg hover:border-gold/50 transition-colors"
          >
            <h3 className="text-white font-semibold mb-1">Privacy Policy</h3>
            <p className="text-sm text-gray-400">How we handle your data</p>
          </Link>
          <Link 
            href="/legal/terms"
            className="p-4 bg-dark-secondary border border-gold/20 rounded-lg hover:border-gold/50 transition-colors"
          >
            <h3 className="text-white font-semibold mb-1">Terms of Service</h3>
            <p className="text-sm text-gray-400">Our terms and conditions</p>
          </Link>
          <Link 
            href="/legal/copyright"
            className="p-4 bg-dark-secondary border border-gold/20 rounded-lg hover:border-gold/50 transition-colors"
          >
            <h3 className="text-white font-semibold mb-1">Copyright Policy</h3>
            <p className="text-sm text-gray-400">DMCA and copyright info</p>
          </Link>
        </div>
      </div>
    </div>
  )
}