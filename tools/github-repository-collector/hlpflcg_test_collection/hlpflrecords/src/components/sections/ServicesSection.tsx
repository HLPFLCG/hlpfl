import React from 'react'
import { Music, Users, Globe, Headphones, TrendingUp, Award } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

export function ServicesSection() {
  const services = [
    {
      icon: Users,
      title: 'Artist Development',
      description: 'Comprehensive artist development programs to nurture talent and build successful, sustainable music careers.',
      features: ['Career Planning', 'Brand Development', 'Performance Training', 'Marketing Strategy']
    },
    {
      icon: Headphones,
      title: 'Music Production',
      description: 'State-of-the-art production facilities with world-class producers, engineers, and cutting-edge technology.',
      features: ['Recording Studios', 'Mixing & Mastering', 'Production Services', 'Sound Design']
    },
    {
      icon: Globe,
      title: 'Global Distribution',
      description: 'Worldwide distribution network to get your music to every major platform and reach millions of listeners.',
      features: ['Digital Distribution', 'Physical Releases', 'Playlist Placement', 'International Marketing']
    },
    {
      icon: Music,
      title: 'Publishing & Rights',
      description: 'Complete music publishing services including copyright protection, royalty collection, and licensing.',
      features: ['Copyright Registration', 'Royalty Management', 'Sync Licensing', 'Publishing Administration']
    },
    {
      icon: TrendingUp,
      title: 'Marketing & Promotion',
      description: 'Strategic marketing campaigns and promotional services to maximize your music\'s reach and impact.',
      features: ['Social Media Marketing', 'PR Campaigns', 'Radio Promotion', 'Influencer Partnerships']
    },
    {
      icon: Award,
      title: 'Career Management',
      description: 'Personalized career management and strategic guidance to navigate the music industry successfully.',
      features: ['Contract Negotiation', 'Tour Management', 'Brand Partnerships', 'Long-term Strategy']
    }
  ]

  return (
    <section className="py-20 px-4 bg-dark-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="text-gold">Complete Music</span> Business Solutions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to transform your musical talent into a thriving, legally compliant business.
            From production to promotion, we've got your music career covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={service.title} hover className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-2 text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Build Your Music Empire?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's turn your musical talent into a thriving business. Book a free discovery call and 
              let's discuss how we can help you build a legally solid, sustainable music career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gold text-dark px-8 py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors hover-lift">
                Book Free Discovery Call
              </button>
              <button className="border-2 border-gold text-gold px-8 py-3 rounded-lg font-semibold hover:bg-gold hover:text-dark transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
