interface ConversationData {
  sessionId: string
  userId: string
  messages: Array<{
    id: string
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
  }>
  startTime: Date
  endTime?: Date
  userSatisfaction?: number
  topics: string[]
  userEngagement: {
    messageCount: number
    avgResponseTime: number
    sessionDuration: number
    bounceRate: boolean
  }
  outcomes: {
    contactedSupport: boolean
    submittedMusic: boolean
    requestedServices: boolean
    scheduleCall: boolean
  }
}

export class ChatbotAnalytics {
  private static instance: ChatbotAnalytics
  private conversations: Map<string, ConversationData> = new Map()

  static getInstance(): ChatbotAnalytics {
    if (!ChatbotAnalytics.instance) {
      ChatbotAnalytics.instance = new ChatbotAnalytics()
    }
    return ChatbotAnalytics.instance
  }

  // Track conversation start
  startConversation(sessionId: string, userId: string): void {
    const conversation: ConversationData = {
      sessionId,
      userId,
      messages: [],
      startTime: new Date(),
      topics: [],
      userEngagement: {
        messageCount: 0,
        avgResponseTime: 0,
        sessionDuration: 0,
        bounceRate: false
      },
      outcomes: {
        contactedSupport: false,
        submittedMusic: false,
        requestedServices: false,
        scheduleCall: false
      }
    }
    
    this.conversations.set(sessionId, conversation)
    this.sendToAnalytics('conversation_started', { sessionId, userId })
  }

  // Track message
  trackMessage(sessionId: string, message: string, sender: 'user' | 'bot', responseTime?: number): void {
    const conversation = this.conversations.get(sessionId)
    if (!conversation) return

    const messageData = {
      id: Date.now().toString(),
      text: message,
      sender,
      timestamp: new Date()
    }

    conversation.messages.push(messageData)
    conversation.userEngagement.messageCount++
    
    if (sender === 'user' && responseTime) {
      conversation.userEngagement.avgResponseTime = 
        (conversation.userEngagement.avgResponseTime + responseTime) / 2
    }

    // Update topics
    this.updateTopics(conversation, message)
    
    // Update outcomes
    this.updateOutcomes(conversation, message)
    
    this.sendToAnalytics('message_tracked', {
      sessionId,
      messageLength: message.length,
      sender,
      responseTime
    })
  }

  // End conversation
  endConversation(sessionId: string, satisfaction?: number): void {
    const conversation = this.conversations.get(sessionId)
    if (!conversation) return

    conversation.endTime = new Date()
    conversation.userSatisfaction = satisfaction
    conversation.userEngagement.sessionDuration = 
      conversation.endTime.getTime() - conversation.startTime.getTime()
    
    // Check for bounce (single message, very short session)
    conversation.userEngagement.bounceRate = 
      conversation.messages.length <= 2 && conversation.userEngagement.sessionDuration < 30000

    this.sendToAnalytics('conversation_ended', {
      sessionId,
      duration: conversation.userEngagement.sessionDuration,
      messageCount: conversation.messages.length,
      satisfaction,
      bounceRate: conversation.userEngagement.bounceRate,
      outcomes: conversation.outcomes
    })
  }

  // Get conversation statistics
  getStatistics(): {
    totalConversations: number
    avgSessionDuration: number
    avgMessagesPerSession: number
    topTopics: Array<{ topic: string; count: number }>
    satisfactionRate: number
    conversionRate: number
  } {
    const conversations = Array.from(this.conversations.values())
    
    if (conversations.length === 0) {
      return {
        totalConversations: 0,
        avgSessionDuration: 0,
        avgMessagesPerSession: 0,
        topTopics: [],
        satisfactionRate: 0,
        conversionRate: 0
      }
    }

    const totalDuration = conversations.reduce((sum, conv) => 
      sum + (conv.userEngagement.sessionDuration || 0), 0
    )
    
    const totalMessages = conversations.reduce((sum, conv) => 
      sum + conv.userEngagement.messageCount, 0
    )

    const topicCounts = new Map<string, number>()
    conversations.forEach(conv => {
      conv.topics.forEach(topic => {
        topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1)
      })
    })

    const topTopics = Array.from(topicCounts.entries())
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    const satisfiedConversations = conversations.filter(conv => 
      conv.userSatisfaction && conv.userSatisfaction >= 4
    ).length

    const conversions = conversations.filter(conv => 
      Object.values(conv.outcomes).some(outcome => outcome)
    ).length

    return {
      totalConversations: conversations.length,
      avgSessionDuration: totalDuration / conversations.length,
      avgMessagesPerSession: totalMessages / conversations.length,
      topTopics,
      satisfactionRate: (satisfiedConversations / conversations.length) * 100,
      conversionRate: (conversions / conversations.length) * 100
    }
  }

  // Export data for external analytics
  exportData(): ConversationData[] {
    return Array.from(this.conversations.values())
  }

  // Private methods
  private updateTopics(conversation: ConversationData, message: string): void {
    const messageLower = message.toLowerCase()
    
    if (messageLower.includes('submit') || messageLower.includes('demo') || messageLower.includes('music')) {
      if (!conversation.topics.includes('artist_submission')) {
        conversation.topics.push('artist_submission')
      }
    }
    if (messageLower.includes('service') || messageLower.includes('production') || messageLower.includes('distribution')) {
      if (!conversation.topics.includes('services')) {
        conversation.topics.push('services')
      }
    }
    if (messageLower.includes('about') || messageLower.includes('story') || messageLower.includes('founder')) {
      if (!conversation.topics.includes('about_company')) {
        conversation.topics.push('about_company')
      }
    }
    if (messageLower.includes('contact') || messageLower.includes('email') || messageLower.includes('reach')) {
      if (!conversation.topics.includes('contact_inquiry')) {
        conversation.topics.push('contact_inquiry')
      }
    }
  }

  private updateOutcomes(conversation: ConversationData, message: string): void {
    const messageLower = message.toLowerCase()
    
    if (messageLower.includes('contact') || messageLower.includes('email') || messageLower.includes('call')) {
      conversation.outcomes.contactedSupport = true
    }
    if (messageLower.includes('submit') || messageLower.includes('demo')) {
      conversation.outcomes.submittedMusic = true
    }
    if (messageLower.includes('service') || messageLower.includes('production')) {
      conversation.outcomes.requestedServices = true
    }
    if (messageLower.includes('schedule') || messageLower.includes('appointment') || messageLower.includes('call')) {
      conversation.outcomes.scheduleCall = true
    }
  }

  private sendToAnalytics(event: string, data: any): void {
    // Send to your preferred analytics service
    // Examples:
    
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, {
        custom_parameter_1: JSON.stringify(data)
      })
    }

    // Mixpanel
    if (typeof window !== 'undefined' && (window as any).mixpanel) {
      (window as any).mixpanel.track(event, data)
    }

    // Custom endpoint
    if (typeof window !== 'undefined') {
      fetch('/api/chatbot-analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event, data, timestamp: new Date().toISOString() })
      }).catch((error) => {
        // Silent fail in production, log in development
        if (process.env.NODE_ENV === 'development') {
          console.error('Analytics error:', error)
        }
      })
    }

    // Log for development only
    if (process.env.NODE_ENV === 'development') {
      console.log(`Chatbot Analytics: ${event}`, data)
    }
  }

  // Public method to get real-time metrics
  getRealTimeMetrics(): {
    activeConversations: number
    messagesLastHour: number
    topTopicsToday: string[]
    avgResponseTime: number
  } {
    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    const conversations = Array.from(this.conversations.values())
    
    const activeConversations = conversations.filter(conv => !conv.endTime).length
    
    const messagesLastHour = conversations.reduce((count, conv) => {
      return count + conv.messages.filter(msg => 
        new Date(msg.timestamp) > oneHourAgo
      ).length
    }, 0)

    const todayTopics = new Map<string, number>()
    conversations
      .filter(conv => new Date(conv.startTime) >= today)
      .forEach(conv => {
        conv.topics.forEach(topic => {
          todayTopics.set(topic, (todayTopics.get(topic) || 0) + 1)
        })
      })

    const avgResponseTime = conversations.reduce((sum, conv) => 
      sum + conv.userEngagement.avgResponseTime, 0
    ) / conversations.length

    return {
      activeConversations,
      messagesLastHour,
      topTopicsToday: Array.from(todayTopics.keys()).slice(0, 3),
      avgResponseTime
    }
  }
}