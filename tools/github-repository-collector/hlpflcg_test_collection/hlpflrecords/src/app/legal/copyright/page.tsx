import React from 'react'
import { Copyright, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Copyright Policy | HLPFL',
  description: 'Copyright Policy and DMCA information for HLPFL. Learn about our copyright protection and infringement procedures.',
}

export default function CopyrightPage() {
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
            <Copyright className="w-8 h-8 text-dark" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Copyright Policy
          </h1>
          <p className="text-gray-400">
            Last Updated: December 17, 2024
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-gold max-w-none">
          <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-8 md:p-12 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Copyright Protection</h2>
              <p className="text-gray-300 leading-relaxed">
                HLPFL respects the intellectual property rights of others and expects our users to do the same. All content on this website, including but not limited to music, text, graphics, logos, images, audio clips, video clips, and software, is the property of HLPFL, our artists, or our content suppliers and is protected by United States and international copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Ownership of Content</h2>
              
              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">2.1 HLPFL Content</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Unless otherwise noted, all materials on this website are owned by HLPFL and are protected by copyright, trademark, and other intellectual property laws. This includes:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Website design and layout</li>
                <li>HLPFL logo and branding</li>
                <li>Text content and copy</li>
                <li>Graphics and visual elements</li>
                <li>Software and code</li>
              </ul>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">2.2 Artist Content</h3>
              <p className="text-gray-300 leading-relaxed">
                Music, lyrics, artwork, and other creative works by our artists remain the property of the respective artists. HLPFL operates under a 50/50 partnership model where artists retain 100% ownership of their master recordings and compositions. We hold licenses to distribute, market, and promote this content as outlined in individual artist agreements.
              </p>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">2.3 Third-Party Content</h3>
              <p className="text-gray-300 leading-relaxed">
                Some content on our website may be owned by third parties. Such content is used with permission or under applicable licenses and remains the property of its respective owners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Permitted Uses</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You may access and use our website for personal, non-commercial purposes only. Specifically, you may:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>View and listen to content on our website</li>
                <li>Download materials expressly made available for download</li>
                <li>Share links to our content on social media</li>
                <li>Print single copies of pages for personal reference</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Prohibited Uses</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Without express written permission from HLPFL or the applicable rights holder, you may NOT:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Copy, reproduce, or distribute any content from this website</li>
                <li>Modify, adapt, or create derivative works</li>
                <li>Use content for commercial purposes</li>
                <li>Download or rip music files</li>
                <li>Remove copyright notices or watermarks</li>
                <li>Use automated systems (bots, scrapers) to access content</li>
                <li>Frame or embed our content on other websites</li>
                <li>Reverse engineer any software or technology</li>
                <li>Use content in ways that suggest endorsement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. DMCA Policy</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                HLPFL complies with the Digital Millennium Copyright Act (DMCA) and will respond to valid notices of copyright infringement. If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible on this website, please notify our Copyright Agent.
              </p>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">5.1 Filing a DMCA Notice</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                To file a DMCA notice, you must provide a written communication that includes:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>A physical or electronic signature of the copyright owner or authorized representative</li>
                <li>Identification of the copyrighted work claimed to have been infringed</li>
                <li>Identification of the material that is claimed to be infringing, with sufficient detail to locate it</li>
                <li>Your contact information (address, telephone number, email)</li>
                <li>A statement that you have a good faith belief that the use is not authorized</li>
                <li>A statement that the information in the notice is accurate</li>
                <li>A statement, under penalty of perjury, that you are authorized to act on behalf of the copyright owner</li>
              </ul>

              <div className="mt-6 p-4 bg-dark/50 rounded-lg">
                <p className="text-gray-300">
                  <strong className="text-white">DMCA Copyright Agent:</strong><br />
                  HLPFL<br />
                  Attn: Copyright Agent<br />
                  Email: contact@hlpfl.org<br />
                  Subject Line: "DMCA Takedown Request"
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">5.2 Counter-Notification</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you believe that material you posted was removed or disabled by mistake or misidentification, you may file a counter-notification with our Copyright Agent. The counter-notification must include:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Your physical or electronic signature</li>
                <li>Identification of the material that was removed</li>
                <li>A statement under penalty of perjury that you have a good faith belief the material was removed by mistake</li>
                <li>Your name, address, and telephone number</li>
                <li>A statement consenting to jurisdiction of the federal court</li>
              </ul>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">5.3 Repeat Infringer Policy</h3>
              <p className="text-gray-300 leading-relaxed">
                HLPFL will terminate the accounts of users who are repeat infringers of copyright in appropriate circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Music Licensing</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you wish to use music from our catalog for commercial purposes, you must obtain a proper license. We offer various licensing options:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li><strong className="text-white">Sync Licensing:</strong> For use in film, TV, commercials, and video content</li>
                <li><strong className="text-white">Mechanical Licensing:</strong> For reproduction and distribution</li>
                <li><strong className="text-white">Performance Licensing:</strong> For public performances</li>
                <li><strong className="text-white">Master Use Licensing:</strong> For use of specific recordings</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                For licensing inquiries, please visit our <Link href="/licensing" className="text-gold hover:text-gold-light">Licensing page</Link> or contact contact@hlpfl.org.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Artist Rights and Protections</h2>
              
              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">7.1 Master Recording Ownership</h3>
              <p className="text-gray-300 leading-relaxed">
                Under our 50/50 partnership model, artists retain 100% ownership of their master recordings. HLPFL holds exclusive distribution rights as outlined in individual artist agreements but does not claim ownership of the masters.
              </p>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">7.2 Composition Rights</h3>
              <p className="text-gray-300 leading-relaxed">
                Artists retain full ownership of their musical compositions (lyrics and melodies). Publishing rights are managed according to individual agreements, with artists maintaining control over their creative works.
              </p>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">7.3 Moral Rights</h3>
              <p className="text-gray-300 leading-relaxed">
                We respect artists' moral rights, including the right to be identified as the creator and the right to object to derogatory treatment of their work.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. User-Generated Content</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                When you submit content to HLPFL (such as music submissions, comments, or other materials):
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>You retain ownership of your content</li>
                <li>You grant us a non-exclusive license to review and evaluate your submissions</li>
                <li>You warrant that you own or have rights to the content</li>
                <li>You warrant that your content does not infringe on third-party rights</li>
                <li>You agree not to submit content that violates any laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Trademark Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                The following are trademarks or service marks of HLPFL:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>HLPFL®</li>
                <li>HLPFL logo and design marks</li>
                <li>Associated branding and slogans</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                All other trademarks, service marks, and trade names referenced on this website are the property of their respective owners. Use of any trademark without express written permission is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Fair Use</h2>
              <p className="text-gray-300 leading-relaxed">
                We recognize that copyright law provides for "fair use" of copyrighted materials under certain circumstances. Fair use is a legal doctrine that permits limited use of copyrighted material without permission for purposes such as criticism, comment, news reporting, teaching, scholarship, or research. However, fair use is determined on a case-by-case basis, and we encourage you to seek legal advice if you believe your use qualifies as fair use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. International Copyright</h2>
              <p className="text-gray-300 leading-relaxed">
                Our content is protected by international copyright treaties and conventions. Unauthorized use of our content may violate copyright, trademark, and other laws in your jurisdiction. We reserve the right to enforce our intellectual property rights to the fullest extent of the law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Reporting Copyright Violations</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you become aware of any copyright violations on our website or involving our content, please report them immediately:
              </p>
              <div className="mt-4 p-4 bg-dark/50 rounded-lg">
                <p className="text-gray-300">
                  <strong className="text-white">Report Copyright Violations:</strong><br />
                  Email: contact@hlpfl.org<br />
                  Subject: "Copyright Violation Report"<br />
                  Include: URL, description of violation, your contact information
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Disclaimer</h2>
              <p className="text-gray-300 leading-relaxed">
                While we make every effort to ensure that all content on our website respects copyright and intellectual property rights, we cannot guarantee that all content is free from infringement. If you believe any content infringes your rights, please contact us immediately using the procedures outlined above.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">14. Changes to This Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Copyright Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Your continued use of our website after changes are posted constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">15. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                For questions about this Copyright Policy or to report copyright infringement:
              </p>
              <div className="mt-4 p-4 bg-dark/50 rounded-lg">
                <p className="text-gray-300">
                  <strong className="text-white">HLPFL - Legal Department</strong><br />
                  General Inquiries: legal@hlpfl.org<br />
                  DMCA Notices: dmca@hlpfl.org<br />
                  Copyright Issues: copyright@hlpfl.org<br />
                  Licensing: licensing@hlpfl.org<br />
                  Website: <a href="https://hlpfl.org" className="text-gold hover:text-gold-light">hlpfl.org</a>
                </p>
              </div>
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
            href="/legal/privacy"
            className="p-4 bg-dark-secondary border border-gold/20 rounded-lg hover:border-gold/50 transition-colors"
          >
            <h3 className="text-white font-semibold mb-1">Privacy Policy</h3>
            <p className="text-sm text-gray-400">How we handle your data</p>
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