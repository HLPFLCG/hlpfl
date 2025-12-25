import React from 'react'
import { Shield, ArrowLeft, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | HLPFL',
  description: 'Privacy Policy for HLPFL. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyEnhancedPage() {
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
            <Shield className="w-8 h-8 text-dark" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400">
            Last Updated: December 19, 2024
          </p>
          
          {/* Important Notice */}
          <div className="mt-6 p-4 bg-gold/10 border border-gold/30 rounded-lg flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">
              <strong className="text-gold">Important:</strong> By using our services, you automatically consent to our data collection, 
              processing, and sharing practices as described in this policy. Continued use constitutes ongoing consent.
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-gold max-w-none">
          <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-8 md:p-12 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance and Consent</h2>
              <p className="text-gray-300 leading-relaxed">
                BY ACCESSING OR USING THE HLPFL WEBSITE, SERVICES, OR ANY RELATED PLATFORMS ("SERVICES"), YOU EXPRESSLY CONSENT TO THE COLLECTION, 
                USE, DISCLOSURE, AND PROCESSING OF YOUR PERSONAL INFORMATION AS DESCRIBED IN THIS PRIVACY POLICY. IF YOU DO NOT AGREE TO THIS PRIVACY POLICY, 
                DO NOT ACCESS OR USE THE SERVICES.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                Your use of the Services constitutes your acknowledgment that you have read and understood this Privacy Policy and agree to be bound by its terms. 
                This consent is ongoing and continues for as long as you use the Services and indefinitely thereafter unless you explicitly withdraw consent in writing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Automatic Consent and Modifications</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify, amend, or update this Privacy Policy at any time, in our sole discretion, without prior notice. 
                Any changes will be effective immediately upon posting to the Services. Your continued use of the Services after any such changes 
                constitutes your automatic acceptance of the new Privacy Policy.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4 font-semibold text-gold">
                YOU WAIVE ANY RIGHT TO RECEIVE SPECIFIC NOTICE OF SUCH CHANGES AND AGREE THAT YOUR CONTINUED USE OF THE SERVICES CONSTITUTES 
                ACCEPTANCE OF ALL MODIFICATIONS, REGARDLESS OF WHETHER YOU HAVE REVIEWED THE UPDATED POLICY.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">3.1 Personal Information</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We collect all information you provide to us, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Full name, stage name, and any aliases</li>
                <li>Email address, phone number, and mailing address</li>
                <li>Social media handles and profiles</li>
                <li>Payment information and financial data</li>
                <li>Music samples, recordings, and creative works</li>
                <li>Photographs, videos, and other media</li>
                <li>Demographic information (age, gender, location)</li>
                <li>Professional information and career history</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">3.2 Automatically Collected Information</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We automatically collect extensive information about your device and usage, including:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>IP address, MAC address, and device identifiers</li>
                <li>Browser type, version, and settings</li>
                <li>Operating system and device information</li>
                <li>Referring and exit pages</li>
                <li>Pages visited, time spent, and click patterns</li>
                <li>Search queries and interactions</li>
                <li>Location data (GPS, WiFi, cellular)</li>
                <li>Cookies, web beacons, and similar technologies</li>
                <li>Keystroke patterns and mouse movements</li>
                <li>Screen resolution and device capabilities</li>
              </ul>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">3.3 Third-Party Information</h3>
              <p className="text-gray-300 leading-relaxed">
                We may collect information about you from third-party sources, including social media platforms, data brokers, 
                public databases, marketing partners, and other sources. We combine this information with data we collect directly from you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. How We Use Your Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may use your information for any lawful purpose, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Providing, maintaining, and improving our Services</li>
                <li>Processing transactions and managing accounts</li>
                <li>Communicating with you about our Services</li>
                <li>Marketing, advertising, and promotional purposes</li>
                <li>Analyzing usage patterns and user behavior</li>
                <li>Developing new products and services</li>
                <li>Personalizing your experience</li>
                <li>Conducting research and analytics</li>
                <li>Preventing fraud and enhancing security</li>
                <li>Complying with legal obligations</li>
                <li>Enforcing our terms and policies</li>
                <li>Any other purpose with your consent or as permitted by law</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4 font-semibold">
                We reserve the right to use your information for any purpose not prohibited by applicable law, 
                and your use of the Services constitutes consent to such use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Information Sharing and Disclosure</h2>
              
              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">5.1 Broad Sharing Rights</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may share your information with third parties for any lawful purpose, including:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Service providers and business partners</li>
                <li>Affiliates and subsidiaries</li>
                <li>Marketing and advertising partners</li>
                <li>Analytics and data processing companies</li>
                <li>Payment processors and financial institutions</li>
                <li>Cloud storage and hosting providers</li>
                <li>Professional advisors (lawyers, accountants)</li>
                <li>Potential buyers or investors in business transactions</li>
                <li>Law enforcement and government agencies</li>
                <li>Any party with your consent or as permitted by law</li>
              </ul>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">5.2 Business Transfers</h3>
              <p className="text-gray-300 leading-relaxed">
                In the event of a merger, acquisition, reorganization, bankruptcy, or sale of assets, your information may be transferred 
                to the acquiring entity without your consent. The acquiring entity may use your information for any lawful purpose.
              </p>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">5.3 Aggregated and De-Identified Data</h3>
              <p className="text-gray-300 leading-relaxed">
                We may aggregate, anonymize, or de-identify your information and use or share it for any purpose without restriction. 
                We retain all rights to such data even after you stop using our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Data Retention</h2>
              <p className="text-gray-300 leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
                or as required or permitted by law. This may include retaining your information indefinitely for:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-4">
                <li>Business records and analytics</li>
                <li>Legal compliance and dispute resolution</li>
                <li>Fraud prevention and security</li>
                <li>Backup and disaster recovery</li>
                <li>Historical archives and research</li>
                <li>Any other legitimate business purpose</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4 font-semibold">
                We have no obligation to delete your information and may retain it indefinitely at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights and Limitations</h2>
              
              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">7.1 Limited Rights</h3>
              <p className="text-gray-300 leading-relaxed">
                While certain jurisdictions may provide you with rights regarding your personal information, these rights are subject to 
                significant limitations and exceptions. We may deny your requests if:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-4">
                <li>Complying would be excessively burdensome or expensive</li>
                <li>The request is frivolous or vexatious</li>
                <li>Disclosure would compromise our business interests</li>
                <li>The information is subject to legal privilege</li>
                <li>Retention is required for legal or business purposes</li>
                <li>Any other reason permitted by law</li>
              </ul>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">7.2 Verification Requirements</h3>
              <p className="text-gray-300 leading-relaxed">
                To exercise any rights, you must provide extensive verification of your identity, which may include government-issued ID, 
                proof of address, and other documentation. We may deny requests if verification is insufficient.
              </p>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">7.3 Response Time</h3>
              <p className="text-gray-300 leading-relaxed">
                We will respond to verified requests within the time required by applicable law, which may be up to 90 days or longer. 
                We may extend this period with notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. International Data Transfers</h2>
              <p className="text-gray-300 leading-relaxed">
                Your information may be transferred to, stored, and processed in any country where we or our service providers operate, 
                including countries that may not provide the same level of data protection as your home country. By using our Services, 
                you consent to such transfers and acknowledge that your information may be subject to foreign laws and accessible to 
                foreign governments, courts, and law enforcement agencies.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4 font-semibold">
                YOU WAIVE ANY CLAIMS RELATED TO THE TRANSFER OF YOUR INFORMATION TO OTHER JURISDICTIONS AND AGREE THAT SUCH TRANSFERS 
                ARE NECESSARY FOR THE PERFORMANCE OF OUR SERVICES.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Cookies and Tracking Technologies</h2>
              <p className="text-gray-300 leading-relaxed">
                We use cookies, web beacons, pixels, local storage, and other tracking technologies to collect information about your 
                browsing activities. By using our Services, you consent to our use of these technologies. We may use:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-4">
                <li>Essential cookies for site functionality</li>
                <li>Analytics cookies to understand usage patterns</li>
                <li>Advertising cookies for targeted marketing</li>
                <li>Social media cookies for sharing features</li>
                <li>Third-party cookies from our partners</li>
                <li>Any other tracking technologies we deem appropriate</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                While you may be able to disable some cookies through your browser settings, doing so may limit your ability to use our Services. 
                We are not responsible for any limitations resulting from your cookie preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Security Disclaimer</h2>
              <p className="text-gray-300 leading-relaxed">
                While we implement reasonable security measures, we cannot guarantee the security of your information. You acknowledge and accept 
                the inherent risks of transmitting information over the internet. We are not liable for any unauthorized access, use, or disclosure 
                of your information, regardless of cause.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4 font-semibold text-gold uppercase">
                YOU ASSUME ALL RISKS ASSOCIATED WITH THE SECURITY OF YOUR INFORMATION AND WAIVE ANY CLAIMS AGAINST US FOR SECURITY BREACHES, 
                DATA LOSS, OR UNAUTHORIZED ACCESS.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Children's Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                Our Services are not intended for children under the age of 13 (or 16 in the European Economic Area). We do not knowingly collect 
                personal information from children. If we become aware that we have collected information from a child, we may delete it or retain it 
                at our discretion. Parents or guardians who believe their child has provided information should contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Third-Party Links and Services</h2>
              <p className="text-gray-300 leading-relaxed">
                Our Services may contain links to third-party websites and services. We are not responsible for the privacy practices or content of 
                these third parties. Your interactions with third-party sites are governed by their privacy policies, not ours. We encourage you to 
                review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. California Privacy Rights</h2>
              <p className="text-gray-300 leading-relaxed">
                California residents may have certain rights under the California Consumer Privacy Act (CCPA). However, these rights are subject to 
                significant limitations and exceptions. We may deny requests that are manifestly unfounded or excessive. We do not sell personal 
                information in the traditional sense, but we may share information with partners for business purposes.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                To exercise CCPA rights, you must submit a verifiable request with extensive documentation. We may take up to 90 days to respond 
                and may deny requests at our discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">14. European Privacy Rights</h2>
              <p className="text-gray-300 leading-relaxed">
                If you are located in the European Economic Area (EEA), you may have rights under the General Data Protection Regulation (GDPR). 
                However, we process your information based on multiple legal bases, including:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-4">
                <li>Your explicit consent</li>
                <li>Performance of a contract with you</li>
                <li>Compliance with legal obligations</li>
                <li>Our legitimate business interests</li>
                <li>Protection of vital interests</li>
                <li>Public interest or official authority</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                We may deny requests to exercise GDPR rights if doing so would compromise our business operations or if exceptions apply under applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">15. Marketing Communications</h2>
              <p className="text-gray-300 leading-relaxed">
                By providing your contact information, you consent to receive marketing communications from us and our partners. 
                You may opt out of marketing emails by clicking the unsubscribe link, but we may continue to send you transactional 
                and service-related communications. Opting out of marketing does not affect our right to use your information for other purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">16. Changes to This Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify this Privacy Policy at any time without notice. Changes are effective immediately upon posting. 
                Your continued use of the Services after changes constitutes acceptance of the modified policy. We have no obligation to notify 
                you of changes or to maintain previous versions of this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">17. Dispute Resolution</h2>
              <p className="text-gray-300 leading-relaxed">
                Any disputes arising from this Privacy Policy shall be resolved through binding arbitration as specified in our Terms of Service. 
                You waive any right to bring claims in court or to participate in class actions. This arbitration provision survives termination 
                of your use of the Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">18. Governing Law</h2>
              <p className="text-gray-300 leading-relaxed">
                This Privacy Policy is governed by the laws of the State of Michigan, United States, without regard to conflict of law principles. 
                You consent to the exclusive jurisdiction of courts in Kent County, Michigan for any disputes not subject to arbitration.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">19. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have questions about this Privacy Policy, you may contact us at:
              </p>
              <div className="mt-4 p-4 bg-dark/50 rounded-lg">
                <p className="text-gray-300">
                  <strong className="text-white">HLPFL - Privacy Team</strong><br />
                  Email: privacy@hlpfl.org<br />
                  General Inquiries: contact@hlpfl.org<br />
                  Website: <a href="https://hlpfl.org" className="text-gold hover:text-gold-light">hlpfl.org</a>
                </p>
              </div>
              <p className="text-gray-300 leading-relaxed mt-4 text-sm">
                Please note that we may take up to 90 days to respond to privacy inquiries and may require extensive verification before responding.
              </p>
            </section>

            <section className="mt-8 p-6 bg-gold/5 border border-gold/20 rounded-lg">
              <h3 className="text-lg font-bold text-gold mb-3">Acknowledgment and Consent</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                BY USING THE SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ THIS PRIVACY POLICY AND CONSENT TO ALL COLLECTION, USE, DISCLOSURE, 
                AND PROCESSING OF YOUR INFORMATION AS DESCRIBED HEREIN. YOU FURTHER ACKNOWLEDGE THAT THIS CONSENT IS ONGOING AND CONTINUES 
                INDEFINITELY UNLESS EXPLICITLY WITHDRAWN IN WRITING.
              </p>
            </section>

          </div>
        </div>

        {/* Related Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <Link 
            href="/legal/cookies"
            className="p-4 bg-dark-secondary border border-gold/20 rounded-lg hover:border-gold/50 transition-colors"
          >
            <h3 className="text-white font-semibold mb-1">Cookie Policy</h3>
            <p className="text-sm text-gray-400">How we use cookies</p>
          </Link>
        </div>
      </div>
    </div>
  )
}