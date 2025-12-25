/**
 * HLPFL Records Chatbot - Cloudflare Worker
 * Version: 2.0.0
 * 
 * A bulletproof, production-ready chatbot with:
 * - Comprehensive error handling
 * - Rate limiting
 * - Extensive knowledge base
 * - Asset serving (logo)
 * - CORS support
 * - Input validation
 * - Security features
 */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
  version: '2.0.0',
  company: 'HLPFL Records',
  rateLimit: {
    maxRequests: 20,
    windowMs: 60000 // 1 minute
  },
  maxMessageLength: 1000,
  allowedOrigins: ['*'], // Configure for production
  cache: {
    ttl: 3600, // 1 hour
    enabled: true
  }
};

// ============================================
// CORS HEADERS
// ============================================

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// ============================================
// KNOWLEDGE BASE
// ============================================

const knowledgeBase = {
  company: {
    name: "HLPFL Records",
    tagline: "World-Class Record Label & Artist Development",
    mission: "Elevating artists to global recognition",
    founded: "2009",
    yearsInBusiness: "15+",
    location: {
      city: "Grand Rapids",
      state: "Michigan",
      country: "United States"
    },
    contact: {
      email: "contact@hlpflrecords.com",
      phone: "+1 (555) 123-4567",
      website: "https://hlpfl.org",
      socialMedia: {
        instagram: "@hlpflrecords",
        twitter: "@hlpflrecords",
        facebook: "HLPFLRecords",
        youtube: "HLPFLRecords",
        tiktok: "@hlpflrecords"
      }
    },
    statistics: {
      artistsSigned: "50+",
      releases: "200+",
      totalStreams: "1,000,000,000+",
      industryAwards: "30+",
      countriesReached: "150+",
      playlistPlacements: "500+",
      radioStations: "1000+"
    },
    officeHours: {
      mondayFriday: "9:00 AM - 6:00 PM EST",
      saturday: "10:00 AM - 4:00 PM EST",
      sunday: "Closed",
      emergencyContact: "Available 24/7 for signed artists"
    }
  },

  services: {
    artistDevelopment: {
      name: "Artist Development",
      description: "Comprehensive artist development program designed to transform talented musicians into successful, sustainable artists with global reach",
      features: [
        "5-year career trajectory planning",
        "Goal setting and milestone tracking",
        "Market positioning and niche identification",
        "Brand development and visual identity",
        "Performance training and stage presence",
        "Music business education",
        "Mental health and wellness support"
      ],
      tiers: {
        emerging: {
          name: "Emerging Artist Program",
          duration: "6 months",
          focus: "Foundation building and initial releases",
          price: "Contact for pricing"
        },
        developing: {
          name: "Developing Artist Program",
          duration: "12 months",
          focus: "Audience growth and professional development",
          price: "Contact for pricing"
        },
        established: {
          name: "Established Artist Program",
          duration: "24 months",
          focus: "Global expansion and career sustainability",
          price: "Contact for pricing"
        }
      }
    },

    musicProduction: {
      name: "Music Production",
      description: "State-of-the-art music production services with world-class producers, engineers, and facilities",
      studios: {
        studioA: {
          name: "Studio A - Flagship Recording Suite",
          size: "1,200 sq ft main room + 400 sq ft isolation booths",
          equipment: "SSL 9000K console, Pro Tools HDX, Neumann microphones",
          rates: {
            hourly: "$150/hour",
            halfDay: "$600 (4 hours)",
            fullDay: "$1,000 (8 hours)"
          }
        },
        studioB: {
          name: "Studio B - Production Suite",
          size: "600 sq ft",
          equipment: "Avid S6 control surface, Pro Tools Ultimate, Focal monitors",
          rates: {
            hourly: "$100/hour",
            halfDay: "$400 (4 hours)",
            fullDay: "$700 (8 hours)"
          }
        },
        studioC: {
          name: "Studio C - Writing Room",
          size: "300 sq ft",
          equipment: "Logic Pro X, Yamaha C3 Grand Piano, vintage synths",
          rates: {
            hourly: "$50/hour",
            halfDay: "$200 (4 hours)",
            fullDay: "$350 (8 hours)"
          }
        }
      },
      services: [
        "Recording with premium equipment",
        "Professional mixing and mastering",
        "Beat production and sound design",
        "Vocal production and tuning",
        "Session musician coordination"
      ]
    },

    distribution: {
      name: "Global Distribution",
      description: "Worldwide distribution network to get your music to every major platform",
      platforms: [
        "Spotify",
        "Apple Music",
        "YouTube Music",
        "Amazon Music",
        "Tidal",
        "Deezer",
        "Pandora",
        "150+ additional platforms"
      ],
      features: [
        "Digital distribution to all major platforms",
        "Physical distribution (CD, vinyl)",
        "Playlist pitching and placement",
        "International marketing campaigns",
        "Royalty collection and reporting",
        "Release strategy and timing"
      ]
    },

    publishing: {
      name: "Publishing & Rights Management",
      description: "Complete music publishing services including copyright protection, royalty collection, and licensing",
      services: [
        "Copyright registration and protection",
        "Royalty management and collection",
        "Sync licensing for film, TV, and commercials",
        "Publishing administration",
        "Mechanical rights management",
        "Performance rights collection (ASCAP, BMI, SESAC)",
        "International royalty collection"
      ]
    },

    marketing: {
      name: "Marketing & Promotion",
      description: "Strategic marketing campaigns and promotional services to maximize your music's reach",
      services: [
        "Social media marketing (Instagram, TikTok, YouTube)",
        "PR campaigns and media outreach",
        "Radio promotion (terrestrial and digital)",
        "Influencer partnerships and collaborations",
        "Music video production and promotion",
        "Email marketing and fan engagement",
        "Paid advertising campaigns (Facebook, Instagram, TikTok)"
      ],
      platforms: {
        spotify: "Editorial playlist pitching, algorithmic optimization",
        appleMusic: "Editorial team connections, Apple Music Radio",
        youtube: "Video optimization, YouTube Shorts strategy",
        tiktok: "Viral sound promotion, influencer campaigns",
        instagram: "Reels strategy, Stories engagement, Feed optimization"
      }
    },

    management: {
      name: "Career Management",
      description: "Personalized career management and strategic guidance",
      services: [
        "Contract negotiation and legal support",
        "Tour management and booking",
        "Brand partnerships and endorsements",
        "Long-term career strategy",
        "Team building (lawyers, accountants, publicists)",
        "Financial planning and budgeting",
        "Industry networking and relationships"
      ]
    }
  },

  faqs: [
    {
      question: "How do I submit my music to HLPFL Records?",
      answer: "We're always excited to discover new talent! Here's how to submit:\n\n1. Visit hlpfl.org/contact\n2. Fill out the submission form\n3. Include links to your best 3-5 tracks (SoundCloud, Spotify, YouTube)\n4. Add a brief bio about yourself and your musical journey\n5. Tell us what makes you unique\n\nOur A&R team personally reviews every submission within 1-2 weeks. We look for exceptional talent, unique vision, and dedication to craft.",
      keywords: ["submit", "submission", "demo", "music", "send", "apply", "join"]
    },
    {
      question: "What genres do you work with?",
      answer: "HLPFL Records works with talented artists across all genres! While we have strong expertise in Pop, Hip-Hop, R&B, Rock, and Electronic music, we're open to any genre if the artist demonstrates exceptional talent and vision. We believe great music transcends genre boundaries.",
      keywords: ["genre", "style", "type", "music", "pop", "hip-hop", "rock", "electronic", "r&b"]
    },
    {
      question: "What are your services and pricing?",
      answer: "HLPFL Records offers comprehensive services:\n\n🎵 Artist Development - Career planning, brand development, performance training\n🎙️ Music Production - Recording, mixing, mastering (Studio rates: $50-150/hour)\n🌍 Global Distribution - Digital and physical distribution to 150+ platforms\n📄 Publishing & Rights - Copyright protection, royalty management\n📢 Marketing & Promotion - Social media, PR, radio promotion\n💼 Career Management - Contract negotiation, tour management\n\nPricing varies by service and project scope. Contact us at contact@hlpflrecords.com for a custom quote!",
      keywords: ["price", "cost", "fee", "rate", "service", "how much", "pricing"]
    },
    {
      question: "Do you offer recording studio services?",
      answer: "Yes! We have three professional recording studios:\n\n🎚️ Studio A (Flagship) - $150/hour\n• 1,200 sq ft main room\n• SSL 9000K console, Pro Tools HDX\n• Neumann microphones, world-class outboard gear\n\n🎛️ Studio B (Production) - $100/hour\n• 600 sq ft production suite\n• Avid S6 control surface\n• Perfect for mixing and production\n\n✍️ Studio C (Writing Room) - $50/hour\n• 300 sq ft intimate space\n• Yamaha C3 Grand Piano\n• Ideal for songwriting and pre-production\n\nAll studios include experienced engineers. Book at contact@hlpflrecords.com",
      keywords: ["studio", "recording", "record", "book", "session", "engineer"]
    },
    {
      question: "How does music distribution work?",
      answer: "Our distribution service gets your music everywhere:\n\n📱 Digital Platforms:\n• Spotify, Apple Music, YouTube Music\n• Amazon Music, Tidal, Deezer, Pandora\n• 150+ additional streaming platforms worldwide\n\n💿 Physical Distribution:\n• CD manufacturing and distribution\n• Vinyl pressing and distribution\n• Retail partnerships\n\n✨ Additional Services:\n• Playlist pitching to editorial teams\n• Release strategy and timing\n• Royalty collection and reporting\n• International marketing support\n\nWe handle all the technical details so you can focus on creating music!",
      keywords: ["distribution", "distribute", "release", "spotify", "apple music", "streaming"]
    },
    {
      question: "What is artist development?",
      answer: "Artist Development is our comprehensive program to build sustainable music careers:\n\n🎯 Career Planning:\n• 5-year trajectory planning\n• Goal setting and milestones\n• Market positioning\n\n🎨 Brand Development:\n• Visual identity and logo design\n• Social media aesthetic\n• Press kit and EPK creation\n\n🎤 Performance Training:\n• Stage presence coaching\n• Vocal technique\n• Live show production\n\n📚 Music Business Education:\n• Copyright and publishing\n• Contract negotiation\n• Revenue streams\n\n💪 Wellness Support:\n• Mental health resources\n• Work-life balance\n• Burnout prevention\n\nWe offer three tiers: Emerging (6 months), Developing (12 months), and Established (24 months).",
      keywords: ["artist development", "coaching", "training", "career", "brand"]
    },
    {
      question: "How do I get my music on Spotify playlists?",
      answer: "Getting on Spotify playlists requires strategy:\n\n📝 Editorial Playlists:\n• Submit via Spotify for Artists 7+ days before release\n• Provide detailed track information and story\n• Build momentum before release\n• Professional production quality is essential\n\n🤖 Algorithmic Playlists (Discover Weekly, Release Radar):\n• Encourage complete song plays (30+ seconds)\n• Drive saves and playlist adds\n• Maintain low skip rate\n• Build follower base\n• Consistent release schedule\n\n👥 User Playlists:\n• Research relevant playlist curators\n• Use platforms like SubmitHub\n• Build relationships with curators\n• Engage on social media\n\nHLPFL Records has direct relationships with Spotify's editorial team and can pitch on your behalf!",
      keywords: ["playlist", "spotify", "playlists", "editorial", "discover weekly"]
    },
    {
      question: "What are your office hours and contact information?",
      answer: "📍 HLPFL Records Contact Information:\n\n📧 Email: contact@hlpflrecords.com\n📞 Phone: +1 (555) 123-4567\n🌐 Website: https://hlpfl.org\n📍 Location: Grand Rapids, Michigan\n\n🕐 Office Hours:\n• Monday-Friday: 9:00 AM - 6:00 PM EST\n• Saturday: 10:00 AM - 4:00 PM EST\n• Sunday: Closed\n• Emergency: 24/7 for signed artists\n\n📱 Social Media:\n• Instagram: @hlpflrecords\n• Twitter: @hlpflrecords\n• Facebook: HLPFLRecords\n• YouTube: HLPFLRecords\n• TikTok: @hlpflrecords\n\nWe typically respond to emails within 24 hours!",
      keywords: ["contact", "email", "phone", "hours", "location", "address", "reach"]
    },
    {
      question: "Do you help with social media marketing?",
      answer: "Yes! Our marketing team specializes in social media growth:\n\n📸 Instagram:\n• Feed posts, Stories, Reels strategy\n• Content calendar planning\n• Engagement optimization\n• Influencer collaborations\n\n🎵 TikTok:\n• Viral sound promotion\n• Trending challenge participation\n• Creator partnerships\n• Algorithm optimization\n\n📺 YouTube:\n• Music video production\n• Channel optimization\n• YouTube Shorts strategy\n• Thumbnail and title optimization\n\n🐦 Twitter/X:\n• Real-time engagement\n• Industry networking\n• Announcement strategy\n\n💰 Paid Advertising:\n• Facebook/Instagram ads\n• TikTok ads\n• YouTube ads\n• Targeted campaigns\n\nWe create custom strategies based on your goals and budget!",
      keywords: ["social media", "instagram", "tiktok", "youtube", "marketing", "promotion"]
    },
    {
      question: "What makes HLPFL Records different?",
      answer: "HLPFL Records stands out in several ways:\n\n🎯 Artist-First Approach:\n• We prioritize your creative vision\n• Fair, transparent contracts\n• You retain ownership of your masters (in most deals)\n\n📊 Proven Track Record:\n• 15+ years in business (since 2009)\n• 50+ active artists\n• 200+ releases\n• 1 billion+ streams\n• 30+ industry awards\n\n🌍 Global Reach:\n• Distribution to 150+ countries\n• 500+ playlist placements\n• 1000+ radio stations\n\n💪 Comprehensive Support:\n• Full-service label (development to distribution)\n• Experienced team of industry professionals\n• State-of-the-art facilities\n• Personal attention to each artist\n\n🤝 Long-Term Partnerships:\n• We invest in your career, not just singles\n• Ongoing support and development\n• Building sustainable careers\n\nWe're not just a label - we're your partner in success!",
      keywords: ["different", "unique", "why", "choose", "about", "company"]
    }
  ],

  intents: {
    greeting: {
      keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening"],
      responses: [
        "Hello! Welcome to HLPFL Records. I'm here to help you with any questions about our services, artist opportunities, or how we can help elevate your music career. What can I assist you with today?",
        "Hi there! Thanks for visiting HLPFL Records - where we're dedicated to elevating artists to global recognition. How can I help you today?",
        "Welcome to HLPFL Records! Whether you're an artist looking to submit music, curious about our services, or just want to learn more about us, I'm here to help. What would you like to know?"
      ]
    },
    submission: {
      keywords: ["submit", "demo", "send music", "apply", "join", "sign", "how to submit"],
      responses: [
        "Great question! We're always excited to discover new talent. Here's how you can submit your music to HLPFL Records:\n\n1. Visit our submission page: hlpfl.org/contact\n2. Fill out the form with your information\n3. Include links to your music (SoundCloud, Spotify, YouTube, etc.)\n4. Add a brief bio about yourself and your musical journey\n\nOur A&R team reviews all submissions within 1-2 weeks. We look for artists who demonstrate exceptional talent, unique vision, and dedication to their craft.\n\nWould you like to know more about what we look for in artists?"
      ]
    },
    services: {
      keywords: ["services", "what do you do", "offer", "help", "provide"],
      responses: [
        "HLPFL Records provides comprehensive music business solutions:\n\n🎵 Artist Development - Career planning, brand development, performance training\n🎙️ Music Production - Recording, mixing, mastering with world-class producers\n🌍 Global Distribution - Digital and physical distribution to all major platforms\n📄 Publishing & Rights - Copyright protection, royalty management, sync licensing\n📢 Marketing & Promotion - Social media, PR campaigns, radio promotion\n💼 Career Management - Contract negotiation, tour management, strategic guidance\n\nWhich area would you like to learn more about?"
      ]
    },
    pricing: {
      keywords: ["price", "cost", "fee", "rate", "how much", "pricing", "expensive"],
      responses: [
        "Our pricing varies based on the services you need:\n\n🎙️ Studio Recording:\n• Studio A: $150/hour\n• Studio B: $100/hour\n• Studio C: $50/hour\n\n🎵 Production Services:\n• Mixing: $500-1,500 per song\n• Mastering: $100-200 per song\n• Full production: $1,000-5,000 per song\n\n🎯 Artist Development:\n• Emerging: 6-month program\n• Developing: 12-month program\n• Established: 24-month program\n\nFor custom quotes and package deals, contact us at contact@hlpflrecords.com or call +1 (555) 123-4567!"
      ]
    },
    contact: {
      keywords: ["contact", "email", "phone", "reach", "call", "message"],
      responses: [
        "You can reach HLPFL Records at:\n\n📧 Email: contact@hlpflrecords.com\n📞 Phone: +1 (555) 123-4567\n📍 Location: Grand Rapids, Michigan\n🌐 Website: https://hlpfl.org\n\n🕐 Office Hours:\n• Monday-Friday: 9:00 AM - 6:00 PM EST\n• Saturday: 10:00 AM - 4:00 PM EST\n• Sunday: Closed\n\nWe'd love to hear from you!"
      ]
    },
    thanks: {
      keywords: ["thank", "thanks", "appreciate", "grateful"],
      responses: [
        "You're very welcome! If you have any other questions about HLPFL Records, our services, or how we can help with your music career, feel free to ask. We're here to help!",
        "Happy to help! Don't hesitate to reach out if you need anything else. Good luck with your music!",
        "My pleasure! Remember, you can always contact us directly at contact@hlpflrecords.com or +1 (555) 123-4567. Have a great day!"
      ]
    },
    goodbye: {
      keywords: ["bye", "goodbye", "see you", "later", "peace"],
      responses: [
        "Thanks for chatting with HLPFL Records! If you have more questions later, we're always here. Have a great day and keep making amazing music! 🎵",
        "Goodbye! Remember, we're here whenever you need us. Visit hlpfl.org or email contact@hlpflrecords.com anytime. Take care!",
        "See you later! Don't forget to follow us on social media @hlpflrecords. Keep creating! 🎶"
      ]
    }
  }
};

// ============================================
// RATE LIMITING
// ============================================

class RateLimiter {
  constructor() {
    this.requests = new Map();
  }

  isRateLimited(ip) {
    const now = Date.now();
    const userRequests = this.requests.get(ip) || [];
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(
      timestamp => now - timestamp < CONFIG.rateLimit.windowMs
    );
    
    if (validRequests.length >= CONFIG.rateLimit.maxRequests) {
      return true;
    }
    
    validRequests.push(now);
    this.requests.set(ip, validRequests);
    
    return false;
  }

  cleanup() {
    const now = Date.now();
    for (const [ip, timestamps] of this.requests.entries()) {
      const validRequests = timestamps.filter(
        timestamp => now - timestamp < CONFIG.rateLimit.windowMs
      );
      if (validRequests.length === 0) {
        this.requests.delete(ip);
      } else {
        this.requests.set(ip, validRequests);
      }
    }
  }
}

const rateLimiter = new RateLimiter();

// ============================================
// INTENT CLASSIFICATION
// ============================================

function classifyIntent(message) {
  if (!message || typeof message !== 'string') {
    return 'unknown';
  }

  const lowerMessage = message.toLowerCase().trim();
  
  // Check each intent
  for (const [intent, data] of Object.entries(knowledgeBase.intents)) {
    if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return intent;
    }
  }
  
  // Check FAQs
  for (const faq of knowledgeBase.faqs) {
    if (faq.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'faq';
    }
  }
  
  return 'general';
}

// ============================================
// RESPONSE GENERATION
// ============================================

function generateResponse(intent, message = '') {
  try {
    // Handle specific intents
    if (knowledgeBase.intents[intent]) {
      const responses = knowledgeBase.intents[intent].responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Handle FAQ matching
    if (intent === 'faq') {
      const lowerMessage = message.toLowerCase();
      for (const faq of knowledgeBase.faqs) {
        if (faq.keywords.some(keyword => lowerMessage.includes(keyword))) {
          return faq.answer;
        }
      }
    }
    
    // Default response
    return `I'd be happy to help you learn about HLPFL Records! I can assist with:\n\n• Submitting your music\n• Our services (production, distribution, marketing)\n• Studio booking and pricing\n• Artist development programs\n• Contact information\n• Playlist strategies\n• Social media marketing\n\nWhat would you like to know more about?`;
    
  } catch (error) {
    console.error('Error generating response:', error);
    return "I'm here to help! Could you please rephrase your question?";
  }
}

// ============================================
// INPUT VALIDATION
// ============================================

function validateInput(message) {
  if (!message) {
    return { valid: false, error: 'Message is required' };
  }
  
  if (typeof message !== 'string') {
    return { valid: false, error: 'Message must be a string' };
  }
  
  if (message.trim().length === 0) {
    return { valid: false, error: 'Message cannot be empty' };
  }
  
  if (message.length > CONFIG.maxMessageLength) {
    return { valid: false, error: `Message too long (max ${CONFIG.maxMessageLength} characters)` };
  }
  
  return { valid: true };
}

// ============================================
// ERROR HANDLING
// ============================================

function createErrorResponse(error, status = 500) {
  return new Response(
    JSON.stringify({
      error: error.message || 'Internal server error',
      status: status,
      timestamp: new Date().toISOString()
    }),
    {
      status: status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
}

// ============================================
// LOGO SVG CONTENT
// ============================================

const logoSVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 612 612" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
  <defs>
    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#CD8B5C;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#B87A4D;stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="306" cy="306" r="250" fill="url(#logoGradient)" />
  <text x="306" y="356" font-family="Arial, sans-serif" font-size="120" font-weight="bold" text-anchor="middle" fill="#FFFFFF">H</text>
</svg>`;

// ============================================
// MAIN WORKER
// ============================================

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
      
      // Handle CORS preflight
      if (request.method === 'OPTIONS') {
        return new Response(null, { 
          headers: corsHeaders,
          status: 204
        });
      }
      
      // Rate limiting check
      if (rateLimiter.isRateLimited(clientIP)) {
        return createErrorResponse(
          { message: 'Rate limit exceeded. Please try again later.' },
          429
        );
      }
      
      // Cleanup rate limiter periodically
      if (Math.random() < 0.01) {
        rateLimiter.cleanup();
      }
      
      // ============================================
      // ROUTES
      // ============================================
      
      // Root endpoint
      if (url.pathname === '/' || url.pathname === '') {
        return new Response(
          JSON.stringify({
            message: 'HLPFL Records Chatbot API',
            version: CONFIG.version,
            company: CONFIG.company,
            endpoints: {
              '/': 'API information',
              '/api/health': 'Health check',
              '/api/chat': 'Chat endpoint (POST)',
              '/api/docs': 'API documentation',
              '/api/services': 'Services information',
              '/api/company': 'Company information',
              '/assets/logo.svg': 'Company logo'
            },
            documentation: '/api/docs'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          }
        );
      }
      
      // Health check
      if (url.pathname === '/api/health') {
        return new Response(
          JSON.stringify({
            status: 'healthy',
            version: CONFIG.version,
            timestamp: new Date().toISOString(),
            company: CONFIG.company,
            uptime: 'operational'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          }
        );
      }
      
      // API Documentation
      if (url.pathname === '/api/docs') {
        return new Response(
          JSON.stringify({
            api: 'HLPFL Records Chatbot API',
            version: CONFIG.version,
            description: 'A bulletproof chatbot API for HLPFL Records with comprehensive music industry knowledge',
            endpoints: {
              '/': {
                method: 'GET',
                description: 'API information and available endpoints'
              },
              '/api/health': {
                method: 'GET',
                description: 'Health check endpoint'
              },
              '/api/chat': {
                method: 'POST',
                description: 'Chat with the HLPFL Records AI assistant',
                body: {
                  message: 'string (required) - User message (max 1000 characters)',
                  sessionId: 'string (optional) - Session identifier for conversation tracking'
                },
                response: {
                  response: 'string - Bot response',
                  intent: 'string - Detected intent',
                  sessionId: 'string - Session identifier',
                  timestamp: 'string - ISO timestamp'
                },
                errors: {
                  400: 'Bad request (invalid input)',
                  429: 'Rate limit exceeded',
                  500: 'Internal server error'
                }
              },
              '/api/services': {
                method: 'GET',
                description: 'Get detailed information about HLPFL Records services'
              },
              '/api/company': {
                method: 'GET',
                description: 'Get company information and statistics'
              },
              '/assets/logo.svg': {
                method: 'GET',
                description: 'Get HLPFL Records logo (SVG format)'
              }
            },
            rateLimit: {
              maxRequests: CONFIG.rateLimit.maxRequests,
              windowMs: CONFIG.rateLimit.windowMs,
              description: `Maximum ${CONFIG.rateLimit.maxRequests} requests per ${CONFIG.rateLimit.windowMs / 1000} seconds`
            },
            company: knowledgeBase.company
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          }
        );
      }
      
      // Services endpoint
      if (url.pathname === '/api/services') {
        return new Response(
          JSON.stringify({
            company: knowledgeBase.company.name,
            services: knowledgeBase.services
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          }
        );
      }
      
      // Company information endpoint
      if (url.pathname === '/api/company') {
        return new Response(
          JSON.stringify({
            company: knowledgeBase.company
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          }
        );
      }
      
      // Logo asset
      if (url.pathname === '/assets/logo.svg') {
        return new Response(logoSVG, {
          headers: {
            ...corsHeaders,
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'public, max-age=31536000',
            'X-Content-Type-Options': 'nosniff'
          },
          status: 200
        });
      }
      
      // Chat endpoint
      if (url.pathname === '/api/chat' && request.method === 'POST') {
        try {
          // Parse request body
          let body;
          try {
            body = await request.json();
          } catch (e) {
            return createErrorResponse({ message: 'Invalid JSON in request body' }, 400);
          }
          
          const userMessage = body.message;
          const sessionId = body.sessionId || `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          
          // Validate input
          const validation = validateInput(userMessage);
          if (!validation.valid) {
            return createErrorResponse({ message: validation.error }, 400);
          }
          
          // Classify intent and generate response
          const intent = classifyIntent(userMessage);
          const response = generateResponse(intent, userMessage);
          
          // Return response
          return new Response(
            JSON.stringify({
              response: response,
              intent: intent,
              sessionId: sessionId,
              timestamp: new Date().toISOString(),
              messageLength: userMessage.length
            }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 200
            }
          );
          
        } catch (error) {
          console.error('Chat endpoint error:', error);
          return createErrorResponse(error, 500);
        }
      }
      
      // 404 - Not Found
      return new Response(
        JSON.stringify({
          error: 'Not Found',
          message: 'The requested endpoint does not exist',
          availableEndpoints: ['/', '/api/health', '/api/chat', '/api/docs', '/api/services', '/api/company', '/assets/logo.svg']
        }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
      
    } catch (error) {
      console.error('Worker error:', error);
      return createErrorResponse(error, 500);
    }
  }
};