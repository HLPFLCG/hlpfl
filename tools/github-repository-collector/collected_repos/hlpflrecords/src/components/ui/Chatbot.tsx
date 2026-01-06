'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from './Button'
import { ChatbotAnalytics } from '@/lib/chatbotAnalytics'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface ConversationData {
  sessionId: string
  userId: string
  messages: Message[]
  startTime: Date
  endTime?: Date
  userSatisfaction?: number
  topic: string[]
}

export function Chatbot() {
  // Helper functions - defined before use
  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const generateUserId = () => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') {
      return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    
    let userId = localStorage.getItem('hlpfl_user_id')
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('hlpfl_user_id', userId)
    }
    return userId
  }

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "🎵 Welcome to HLPFL! I'm your personal assistant here. Founded in 2009, we're a boutique record label that's helped over 50 artists achieve their dreams with 200+ releases and 1B+ streams globally. I'm here to help you discover how we can elevate your musical journey. What brings you to HLPFL today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationData, setConversationData] = useState<ConversationData>({
    sessionId: generateSessionId(),
    userId: generateUserId(),
    messages: [],
    startTime: new Date(),
    topic: []
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Enhanced bot responses with more personality and HLPFL-specific information
  const botResponses = {
    greetings: [
      "Hey there! 👋 Welcome to HLPFL! I'm excited to help you explore how we can transform your musical journey. What's on your mind today?",
      "Hello! 🎶 Great to see you at HLPFL! Whether you're an artist, industry professional, or music lover, I'm here to help. What can I do for you?",
      "Hi! Welcome to the HLPFL family! Since 2009, we've been passionate about elevating artists to global recognition. How can I assist you today?"
    ],
    about_hlpfl: [
      "HLPFL isn't just a record label - we're a family of music lovers dedicated to artistic excellence! Founded in 2009, we've grown from a small independent label to a respected name with 50+ artists, 200+ releases, and over 1 billion streams. What makes us special? Our artist-first approach means we focus on building sustainable careers, not just hits. We handle everything from production to promotion while letting artists maintain creative control. Want to know more about our success stories?",
      "Let me tell you about HLPFL! 🌟 We're a boutique label that believes in the power of authentic music. Over 15 years, we've discovered incredible talent and helped them reach millions. Our artists have won 30+ industry awards, and we've pioneered new approaches to artist development. We're not just about the music - we're about building legacies. Interested in learning about our unique artist development programs?",
      "HLPFL represents the pinnacle of artist development! We've been in the game since 2009, and in that time, we've perfected our approach to nurturing talent. Our secret? We combine traditional music industry expertise with cutting-edge digital strategies. Our team of 50+ professionals works tirelessly to ensure every artist gets personalized attention. We've distributed music across 100+ countries and have partnerships with major streaming platforms. Curious about our global reach?"
    ],
    artist_submission: [
      "Amazing! I'd love to help you submit your music to HLPFL! 🎤 Here's how it works: First, visit our contact page and include links to your best 2-3 tracks (SoundCloud, Spotify, or private links work great). Tell us about your musical journey, your goals, and what makes your sound unique. Our A&R team reviews every submission personally - we look for originality, technical skill, and that special spark that sets you apart. We typically respond within 5-7 business days. What genre would you say best describes your music?",
      "Fantastic that you're considering HLPFL! 🚀 We're always excited to discover new talent. For submissions, we want to get to know you as an artist, not just your music. Along with your tracks, share your story - what drives your creativity? What are your career aspirations? We've signed artists from bedroom producers to established performers. Our artist development program includes vocal coaching, production guidance, marketing strategy, and even mental health support. We invest in our artists holistically. What's your current experience level in the music industry?",
      "Ready to join the HLPFL family? 🎸 We're looking for artists who aren't just talented, but passionate and coachable too! When you submit, make sure to showcase your range - we love artists who can surprise us. Our submission process is thorough but fair: first, our A&R team listens, then if we're interested, we'll schedule a video call to discuss your vision. We've helped artists transition from local gigs to global stages. One thing that sets us apart - we offer creative development grants to signed artists! What's your biggest musical dream?"
    ],
    services: [
      "HLPFL offers comprehensive artist services that go way beyond just releasing music! 🎯 Here's what we provide: Artist Development (personal coaching, brand building, performance training), Music Production (state-of-the-art studios, world-class producers, mixing & mastering), Global Distribution (Spotify, Apple Music, TikTok, and 100+ more platforms), Marketing & Promotion (social media strategy, PR campaigns, influencer partnerships), Publishing & Rights (copyright protection, royalty collection, sync licensing), and Career Management (contract negotiation, tour planning, brand partnerships). Which area interests you most?",
      "Our services at HLPFL are designed to create sustainable music careers! 💪 We don't just sign artists - we build brands. Our production team has worked with Grammy-winning producers, our marketing campaigns have generated millions of streams, and our distribution network reaches every corner of the globe. We also offer unique services like mental health support, financial planning for artists, and even help with visual branding and music videos. We believe in nurturing the whole artist, not just their music. What's most important to you in a record label partnership?",
      "Let me break down HLPFL's service ecosystem! 🌍 We handle everything so you can focus on making incredible music. Our Artist Development program is legendary - we've helped artists improve vocal range by octaves, master production techniques, and develop authentic stage presence. Our Global Distribution gets your music to 1B+ potential listeners across streaming platforms, radio, and even physical stores. Our Marketing team has launched viral campaigns and secured playlist placements on major platforms. Plus, our Legal team ensures you're protected while maximizing your earnings. Ready to dive deeper into any of these services?"
    ],
    artists: [
      "Our HLPFL artist roster is incredibly diverse and talented! 🌟 We represent artists across Pop, R&B, Hip-Hop, Trap, Electronic, and even experimental genres. What's amazing is how each artist maintains their unique sound while benefiting from our support system. Some of our artists started as independent producers and are now selling out venues worldwide. Others were already established but joined us to reach the next level. We've helped artists get featured on major playlists, secure brand deals, and even perform at international festivals. Want to hear about some specific success stories?",
      "The artists at HLPFL are like family! 👨‍👩‍👧‍👦 We currently work with 50+ incredible talents, each bringing something special to the table. From emerging voices making waves on TikTok to established stars topping charts, our artists represent the future of music. We take pride in our artist development - many of our artists have grown exponentially in skill and reach since joining us. Several have won industry awards, others have secured major sync placements in films and commercials. The best part? Our artists actively collaborate with each other, creating amazing cross-genre projects. Which genre of music are you most passionate about?",
      "Let me tell you about our amazing HLPFL artists! 🎤 Each artist has a unique journey with us. Some discovered their sound through our artist development programs, others came to us already established but wanted to expand their reach. We've helped artists transition from local scenes to global stages, from independent releases to chart-topping hits. Our artists have been featured on major playlists like Spotify's Today's Top Hits, Apple Music's A-List, and TikTok viral trends. Many have secured brand partnerships and even ventured into fashion and film. We celebrate diversity in musical expression - from intimate singer-songwriters to high-energy performers. Would you like to know about artists in a specific genre?"
    ],
    contact: [
      "I'd love to connect you with the right people at HLPFL! 📞 You have several options: For artist submissions and general inquiries, use our contact form on the website. For urgent matters, email us at contact@hlpfl.org. You can also continue chatting with me - I'm here 24/7! Our team typically responds within 24-48 hours. If you're an artist looking to submit music, make sure to include your SoundCloud/Spotify links and a brief bio. For business partnerships or press inquiries, mention that in your subject line. What type of connection are you looking to make?",
      "Connecting with HLPFL is easy! 🌐 We want to hear from you! Our main contact form is the best starting point - it helps us direct your inquiry to the right team member. For artist submissions, be detailed about your music and goals. For business inquiries, include your company and what you're looking for. You can also find us on social media - we're active on Instagram, Twitter, and TikTok @hlpflrecords. We love hearing from music lovers, potential collaborators, and artists alike. Plus, you can always chat with me for quick questions! What's the best way to reach you?",
      "Let's make sure you connect with the right team at HLPFL! 🎯 We have different contact channels for different needs: Artist Development team handles new talent scouting, our Business Development team manages partnerships, Press inquiries go to our Communications team, and Fan inquiries come to me or our general inbox. We're pretty responsive - artist submissions get reviewed within a week, business inquiries within 48 hours. Don't be shy about following up if you don't hear back! We value every connection and potential collaboration. What specific team would you like to connect with?"
    ],
    founder: [
      "Ah, let me tell you about our incredible founder! 🌟 The visionary behind HLPFL started this journey in 2009 with a simple but powerful mission: to create a record label that truly puts artists first. With over 15 years in the music industry, they've seen everything from the rise of streaming to the pandemic's impact on live music. Their philosophy has always been about building sustainable careers, not just chasing hits. They're personally involved in artist development and have mentored dozens of successful musicians. What's really special is their background in both music production and business strategy - this unique combination helped shape HLPFL's artist-first approach. Would you like to know about their music industry journey?",
      "Our founder is the heart and soul of HLPFL! ❤️ They started as a musician themselves, so they understand the challenges artists face firsthand. Before founding HLPFL, they worked with major labels and saw how artists often got lost in the corporate machine. That experience inspired them to create something different - a label where creativity thrives and artists maintain control. They're known for being hands-on, often attending recording sessions and offering creative guidance. Many of our artists credit them with helping them find their authentic voice. Their vision has always been clear: discover exceptional talent, provide world-class support, and let the artists shine. What aspect of their philosophy resonates with you most?"
    ],
    success_stories: [
      "Let me share some incredible HLPFL success stories! 🏆 One of our artists went from making music in their bedroom to having 50M+ streams and selling out venues across Europe. Another discovered their unique sound through our artist development program and now has a Grammy nomination. We helped an indie band secure a major sync placement in a Netflix series, exposing them to millions of new fans. One of our hip-hop artists went from local open mics to performing at major festivals and signing brand deals. What all these stories have in common? Artists who trusted our process, stayed committed to their craft, and weren't afraid to evolve. Which type of success story inspires you most?",
      "I love sharing our success stories! ✨ They show what's possible when talent meets the right support. We had an R&B artist who was struggling to find their sound - through our vocal coaching and production guidance, they developed a signature style that landed them on major playlists. An electronic music producer joined us with 100 monthly listeners and now has 1M+ streams and international tour dates. One of our country artists secured a publishing deal through our industry connections. These stories aren't just about numbers - they're about artists finding their voice and connecting with audiences authentically. What's your musical dream?"
    ],
    industry_insights: [
      "Great question about the music industry! 🎵 The landscape has changed dramatically since we started in 2009. Streaming now dominates - that's why distribution is so crucial. Social media platforms like TikTok can make or break careers overnight. AI is changing music production, but human creativity remains irreplaceable. Live music is making a huge comeback post-pandemic. What's exciting is how independent artists can now compete with major labels if they have the right strategy and support. At HLPFL, we stay ahead of these trends to benefit our artists. Want to dive deeper into any specific industry topic?",
      "The music industry is fascinating right now! 🚀 We're seeing amazing convergence of technology and creativity. Short-form video content is driving music discovery more than radio. Direct-to-fan relationships are becoming more valuable than traditional marketing. Sync placements in films and shows can launch careers instantly. The rise of independent artists is challenging the old label model. At HLPFL, we embrace these changes while focusing on what's timeless: great music and authentic artist development. We're helping our artists build sustainable careers in this evolving landscape. What industry trends are you most curious about?"
    ],
    default: [
      "That's an interesting question! 🤔 While I'm primarily here to help with HLPFL, artist development, music submission, and our services, I'm happy to chat about the music industry more broadly. Is there something specific about HLPFL or the music business you'd like to explore? Perhaps you're curious about our artist development process, success stories, or how we help artists grow their careers?",
      "I'm here to help you discover what HLPFL can offer! 🎤 Whether you're an aspiring artist, industry professional, or music enthusiast, I can share information about our services, artist opportunities, submission process, and success stories. Feel free to ask me anything about how we help artists achieve their dreams. What brought you to HLPFL today?",
      "Great question! 👋 I'm your HLPFL assistant,专门 here to help you explore everything we offer - from artist development and music production to global distribution and career management. I can also share insights about our success stories, our 15+ year journey, and what makes our approach unique. What aspect of HLPFL interests you most?"
    ]
  }

  useEffect(() => {
    scrollToBottom()
    
    // Initialize analytics when chat opens
    if (isOpen && messages.length === 1) {
      const analytics = ChatbotAnalytics.getInstance()
      analytics.startConversation(conversationData.sessionId, conversationData.userId)
    }
  }, [messages, isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  

  const trackConversation = (message: string, sender: 'user' | 'bot') => {
    const analytics = ChatbotAnalytics.getInstance()
    
    if (sender === 'user') {
      analytics.trackMessage(conversationData.sessionId, message, sender)
    } else {
      analytics.trackMessage(conversationData.sessionId, message, sender, 0)
    }
    
    const updatedData = {
      ...conversationData,
      messages: [...conversationData.messages, {
        id: Date.now().toString(),
        text: message,
        sender,
        timestamp: new Date()
      }],
      topic: updateTopics(conversationData.topic, message)
    }
    
    setConversationData(updatedData)
    
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('hlpfl_chat_data', JSON.stringify(updatedData))
    }
  }

  const updateTopics = (currentTopics: string[], message: string): string[] => {
    const messageLower = message.toLowerCase()
    const newTopics = [...currentTopics]
    
    if (messageLower.includes('submit') || messageLower.includes('demo') || messageLower.includes('music')) {
      if (!newTopics.includes('artist_submission')) newTopics.push('artist_submission')
    }
    if (messageLower.includes('service') || messageLower.includes('production') || messageLower.includes('distribution')) {
      if (!newTopics.includes('services')) newTopics.push('services')
    }
    if (messageLower.includes('about') || messageLower.includes('story') || messageLower.includes('founder')) {
      if (!newTopics.includes('about_company')) newTopics.push('about_company')
    }
    if (messageLower.includes('contact') || messageLower.includes('email') || messageLower.includes('reach')) {
      if (!newTopics.includes('contact_inquiry')) newTopics.push('contact_inquiry')
    }
    
    return newTopics
  }

  const generateBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return getRandomResponse('greetings')
    } else if (lowerMessage.includes('hlpfl') || lowerMessage.includes('company') || lowerMessage.includes('about') || lowerMessage.includes('story')) {
      return getRandomResponse('about_hlpfl')
    } else if (lowerMessage.includes('founder') || lowerMessage.includes('who started') || lowerMessage.includes('ceo')) {
      return getRandomResponse('founder')
    } else if (lowerMessage.includes('success') || lowerMessage.includes('stories') || lowerMessage.includes('examples') || lowerMessage.includes('case study')) {
      return getRandomResponse('success_stories')
    } else if (lowerMessage.includes('submit') || lowerMessage.includes('demo') || lowerMessage.includes('apply') || lowerMessage.includes('join')) {
      return getRandomResponse('artist_submission')
    } else if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('provide') || lowerMessage.includes('help') || lowerMessage.includes('production') || lowerMessage.includes('distribution')) {
      return getRandomResponse('services')
    } else if (lowerMessage.includes('artist') || lowerMessage.includes('roster') || lowerMessage.includes('talent') || lowerMessage.includes('musicians')) {
      return getRandomResponse('artists')
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('call') || lowerMessage.includes('connect')) {
      return getRandomResponse('contact')
    } else if (lowerMessage.includes('industry') || lowerMessage.includes('trends') || lowerMessage.includes('business') || lowerMessage.includes('future')) {
      return getRandomResponse('industry_insights')
    } else {
      return getRandomResponse('default')
    }
  }

  const getRandomResponse = (category: keyof typeof botResponses): string => {
    const responses = botResponses[category]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    trackConversation(inputValue, 'user')
    setInputValue('')
    setIsTyping(true)

    // Simulate bot thinking with realistic delay
    const thinkingTime = Math.random() * 2000 + 1000 // 1-3 seconds
    await new Promise(resolve => setTimeout(resolve, thinkingTime))

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: generateBotResponse(inputValue),
      sender: 'bot',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, botResponse])
    trackConversation(botResponse.text, 'bot')
    setIsTyping(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleClose = () => {
    // End conversation tracking
    const analytics = ChatbotAnalytics.getInstance()
    analytics.endConversation(conversationData.sessionId)
    
    const finalData = {
      ...conversationData,
      endTime: new Date()
    }
    setConversationData(finalData)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('hlpfl_chat_data', JSON.stringify(finalData))
    }
    
    setIsOpen(false)
  }

  return (
    <>
      {/* Chat Toggle Button - Enhanced with HLPFL styling */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-gradient-to-r from-gold to-gold-dark text-dark p-4 rounded-full shadow-2xl hover:shadow-gold/25 transform hover:scale-105 transition-all duration-300 z-50 flex items-center gap-3 group ${isOpen ? 'hidden' : 'block'} border border-gold/20`}
      >
        <div className="relative">
          <svg
            className="w-6 h-6 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
        </div>
        <span className="pr-2 font-bold text-dark">Chat with HLPFL</span>
      </button>

      {/* Chat Window - Enhanced with HLPFL branding */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[400px] h-[600px] bg-dark rounded-2xl shadow-2xl z-50 flex flex-col border border-gold/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gold to-gold-dark p-6 rounded-t-2xl flex justify-between items-center border-b border-gold/20">
            <div>
              <h4 className="text-dark font-bold text-xl mb-1">HLPFL Assistant</h4>
              <p className="text-dark/80 text-sm font-medium">Your personal music industry guide 🎵</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-dark/70 text-xs">Online now</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-dark hover:bg-dark/20 p-2 rounded-full transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-dark to-dark-secondary">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-gold to-gold-dark text-dark'
                      : 'bg-dark-tertiary text-white border border-gold/20'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-dark/70' : 'text-gold/60'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-dark-tertiary text-white border border-gold/20 p-4 rounded-2xl">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-dark border-t border-gold/20">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about HLPFL..."
                className="flex-1 bg-dark-secondary text-white px-4 py-3 rounded-full border border-gold/20 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all duration-200"
              />
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === '' || isTyping}
                className="bg-gradient-to-r from-gold to-gold-dark text-dark p-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">
              Powered by HLPFL • 15+ years of artist development excellence
            </p>
          </div>
        </div>
      )}
    </>
  )
}