import React from 'react'
import { FileText, ArrowLeft, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service | HLPFL',
  description: 'Terms of Service for HLPFL. Read our terms and conditions for using our services.',
}

export default function TermsEnhancedPage() {
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
            <FileText className="w-8 h-8 text-dark" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-400">
            Last Updated: December 19, 2024
          </p>
          
          {/* Important Notice */}
          <div className="mt-6 p-4 bg-gold/10 border border-gold/30 rounded-lg flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">
              <strong className="text-gold">Important:</strong> These terms contain binding arbitration and class action waiver provisions. 
              By using our services, you agree to resolve disputes through individual arbitration rather than court proceedings.
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-gold max-w-none">
          <div className="bg-gradient-to-br from-dark-secondary to-dark-tertiary border border-gold/20 rounded-2xl p-8 md:p-12 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                BY ACCESSING OR USING THE HLPFL RECORDS WEBSITE, SERVICES, OR ANY RELATED PLATFORMS ("SERVICES"), YOU AGREE TO BE BOUND BY THESE TERMS OF SERVICE ("TERMS"). 
                IF YOU DO NOT AGREE TO ALL OF THESE TERMS, DO NOT ACCESS OR USE THE SERVICES. YOUR USE OF THE SERVICES CONSTITUTES YOUR ACCEPTANCE OF THESE TERMS, 
                INCLUDING ANY MODIFICATIONS WE MAY MAKE FROM TIME TO TIME.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                These Terms constitute a legally binding agreement between you and HLPFL ("Company," "we," "us," or "our"). 
                By clicking "I Agree," accessing the Services, or using any part of the Services, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms and our Privacy Policy, which is incorporated herein by reference.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Modifications to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify, amend, or update these Terms at any time, in our sole discretion, without prior notice. 
                Any changes will be effective immediately upon posting to the Services. Your continued use of the Services after any such changes 
                constitutes your acceptance of the new Terms. It is your responsibility to review these Terms periodically.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4 font-semibold text-gold">
                YOU WAIVE ANY RIGHT TO RECEIVE SPECIFIC NOTICE OF SUCH CHANGES. IF YOU DO NOT AGREE TO THE MODIFIED TERMS, 
                YOUR SOLE REMEDY IS TO DISCONTINUE USING THE SERVICES.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. User Content and License Grant</h2>
              
              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">3.1 Your Content</h3>
              <p className="text-gray-300 leading-relaxed">
                When you submit, upload, post, or otherwise provide any content, including but not limited to music, text, images, videos, 
                or other materials ("User Content") to the Services, you grant HLPFL a perpetual, irrevocable, worldwide, royalty-free, 
                non-exclusive, transferable, and sublicensable license to use, reproduce, distribute, prepare derivative works of, display, 
                perform, and otherwise exploit your User Content in connection with the Services and our business operations.
              </p>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">3.2 Representations and Warranties</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                By submitting User Content, you represent and warrant that:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>You own or have the necessary rights, licenses, and permissions to submit the User Content</li>
                <li>Your User Content does not infringe any third-party intellectual property rights</li>
                <li>Your User Content does not violate any applicable laws or regulations</li>
                <li>You have obtained all necessary consents, releases, and permissions from any individuals featured in your User Content</li>
                <li>Your User Content does not contain any viruses, malware, or harmful code</li>
              </ul>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">3.3 No Obligation</h3>
              <p className="text-gray-300 leading-relaxed">
                We are under no obligation to accept, review, use, or respond to any User Content you submit. 
                We reserve the right to remove, modify, or refuse any User Content for any reason, in our sole discretion, without notice or liability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">4.1 Company Ownership</h3>
              <p className="text-gray-300 leading-relaxed">
                All content, features, and functionality of the Services, including but not limited to text, graphics, logos, icons, images, 
                audio clips, video clips, data compilations, software, and the compilation thereof (collectively, "Company Content"), 
                are the exclusive property of HLPFL or its licensors and are protected by United States and international copyright, 
                trademark, patent, trade secret, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">4.2 Restrictions</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                You may not, and you agree not to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Copy, modify, distribute, sell, or lease any part of the Services or Company Content</li>
                <li>Reverse engineer, decompile, or attempt to extract the source code of the Services</li>
                <li>Remove, alter, or obscure any copyright, trademark, or other proprietary rights notices</li>
                <li>Use any automated system or software to extract data from the Services ("scraping")</li>
                <li>Create derivative works based on the Services or Company Content</li>
                <li>Frame or mirror any part of the Services without our express written permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
              
              <p className="text-gray-300 leading-relaxed mb-4 font-semibold text-gold uppercase">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                IN NO EVENT SHALL HLPFL RECORDS, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AFFILIATES, OR LICENSORS BE LIABLE FOR ANY INDIRECT, 
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, 
                OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Your access to or use of or inability to access or use the Services</li>
                <li>Any conduct or content of any third party on the Services</li>
                <li>Any content obtained from the Services</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                <li>Any other matter relating to the Services</li>
              </ul>

              <p className="text-gray-300 leading-relaxed mt-4">
                WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED 
                OF THE POSSIBILITY OF SUCH DAMAGE, AND EVEN IF A REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.
              </p>

              <p className="text-gray-300 leading-relaxed mt-4 font-semibold">
                OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICES SHALL NOT EXCEED 
                THE GREATER OF (A) $100 USD OR (B) THE AMOUNT YOU HAVE PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Indemnification</h2>
              <p className="text-gray-300 leading-relaxed">
                You agree to defend, indemnify, and hold harmless HLPFL and its officers, directors, employees, agents, affiliates, 
                successors, and assigns from and against any and all claims, damages, obligations, losses, liabilities, costs, debt, and expenses 
                (including but not limited to attorney's fees) arising from:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-4">
                <li>Your use of and access to the Services</li>
                <li>Your violation of any term of these Terms</li>
                <li>Your violation of any third-party right, including without limitation any copyright, property, or privacy right</li>
                <li>Any claim that your User Content caused damage to a third party</li>
                <li>Any User Content you submit, post, or transmit through the Services</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                This indemnification obligation will survive the termination of these Terms and your use of the Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Dispute Resolution and Arbitration</h2>
              
              <div className="p-4 bg-gold/10 border border-gold/30 rounded-lg mb-4">
                <p className="text-gold font-semibold mb-2">PLEASE READ THIS SECTION CAREFULLY</p>
                <p className="text-gray-300 text-sm">
                  This section affects your legal rights and requires you to resolve disputes through binding arbitration rather than in court.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">7.1 Mandatory Arbitration</h3>
              <p className="text-gray-300 leading-relaxed">
                Except as otherwise provided herein, you and HLPFL agree that any dispute, claim, or controversy arising out of or relating to 
                these Terms or the Services (collectively, "Disputes") will be settled by binding arbitration, rather than in court. 
                This includes disputes arising out of or relating to interpretation or application of this arbitration provision, 
                including the enforceability, revocability, or validity of the arbitration provision or any portion of the arbitration provision.
              </p>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">7.2 Arbitration Rules and Forum</h3>
              <p className="text-gray-300 leading-relaxed">
                The arbitration will be administered by the American Arbitration Association ("AAA") under its Commercial Arbitration Rules 
                and the Supplementary Procedures for Consumer Related Disputes. The arbitration will be conducted in the English language 
                and will take place in Grand Rapids, Michigan, or another mutually agreed upon location.
              </p>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">7.3 Class Action Waiver</h3>
              <p className="text-gray-300 leading-relaxed font-semibold text-gold uppercase mb-4">
                YOU AND HLPFL RECORDS AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY 
                AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Unless both you and HLPFL agree otherwise, the arbitrator may not consolidate more than one person's claims, 
                and may not otherwise preside over any form of a representative or class proceeding. If this specific provision is found 
                to be unenforceable, then the entirety of this arbitration provision shall be null and void.
              </p>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">7.4 Exceptions to Arbitration</h3>
              <p className="text-gray-300 leading-relaxed">
                Notwithstanding the above, either party may bring an individual action in small claims court or seek injunctive or other equitable 
                relief in a court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation, or violation 
                of a party's copyrights, trademarks, trade secrets, patents, or other intellectual property rights.
              </p>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">7.5 Waiver of Jury Trial</h3>
              <p className="text-gray-300 leading-relaxed font-semibold">
                YOU AND HLPFL RECORDS HEREBY WAIVE ANY CONSTITUTIONAL AND STATUTORY RIGHTS TO SUE IN COURT AND HAVE A TRIAL IN FRONT OF A JUDGE OR A JURY.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Disclaimers and Warranties</h2>
              
              <p className="text-gray-300 leading-relaxed mb-4 font-semibold text-gold uppercase">
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                TO THE FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW, HLPFL RECORDS DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, 
                BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                HLPFL RECORDS DOES NOT WARRANT THAT:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>The Services will function uninterrupted, secure, or available at any particular time or location</li>
                <li>Any errors or defects will be corrected</li>
                <li>The Services are free of viruses or other harmful components</li>
                <li>The results of using the Services will meet your requirements</li>
                <li>The quality of any products, services, information, or other material obtained through the Services will meet your expectations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Termination</h2>
              
              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">9.1 Termination by Company</h3>
              <p className="text-gray-300 leading-relaxed">
                We may terminate or suspend your access to the Services immediately, without prior notice or liability, for any reason whatsoever, 
                including without limitation if you breach these Terms. Upon termination, your right to use the Services will immediately cease.
              </p>

              <h3 className="text-xl font-semibold text-gold mb-3 mt-6">9.2 Effect of Termination</h3>
              <p className="text-gray-300 leading-relaxed">
                All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, 
                ownership provisions, warranty disclaimers, indemnity, limitations of liability, and dispute resolution provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Governing Law and Jurisdiction</h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of Michigan, United States, 
                without regard to its conflict of law provisions. To the extent that any lawsuit or court proceeding is permitted under these Terms, 
                you and HLPFL agree to submit to the personal and exclusive jurisdiction of the state and federal courts located in 
                Kent County, Michigan.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Severability</h2>
              <p className="text-gray-300 leading-relaxed">
                If any provision of these Terms is held to be invalid or unenforceable by a court of competent jurisdiction, 
                the remaining provisions of these Terms will remain in full force and effect. Any invalid or unenforceable provision 
                will be deemed superseded by a valid, enforceable provision that most closely matches the intent of the original provision.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Entire Agreement</h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms, together with our Privacy Policy and any other legal notices published by us on the Services, 
                constitute the entire agreement between you and HLPFL concerning the Services. These Terms supersede all prior 
                or contemporaneous communications and proposals, whether electronic, oral, or written, between you and HLPFL.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Assignment</h2>
              <p className="text-gray-300 leading-relaxed">
                You may not assign or transfer these Terms, by operation of law or otherwise, without our prior written consent. 
                Any attempt by you to assign or transfer these Terms without such consent will be null and void. We may freely assign or transfer 
                these Terms without restriction. Subject to the foregoing, these Terms will bind and inure to the benefit of the parties, 
                their successors, and permitted assigns.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">14. No Waiver</h2>
              <p className="text-gray-300 leading-relaxed">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. 
                The waiver of any such right or provision will be effective only if in writing and signed by a duly authorized representative of HLPFL.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">15. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-4 bg-dark/50 rounded-lg">
                <p className="text-gray-300">
                  <strong className="text-white">HLPFL - Legal Department</strong><br />
                  Email: legal@hlpfl.org<br />
                  General Inquiries: contact@hlpfl.org<br />
                  Website: <a href="https://hlpfl.org" className="text-gold hover:text-gold-light">hlpfl.org</a>
                </p>
              </div>
            </section>

            <section className="mt-8 p-6 bg-gold/5 border border-gold/20 rounded-lg">
              <h3 className="text-lg font-bold text-gold mb-3">Acknowledgment</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                BY USING THE SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM. 
                YOU FURTHER ACKNOWLEDGE THAT THESE TERMS CONSTITUTE A BINDING AGREEMENT BETWEEN YOU AND HLPFL RECORDS.
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