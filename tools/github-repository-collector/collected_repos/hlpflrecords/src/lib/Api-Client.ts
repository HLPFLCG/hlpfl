// API Client for HLPFL Chatbot
interface ChatMessage {
  message: string
  userId: string
  sessionId?: string
}

interface ChatResponse {
  response: string
  timestamp: string
  sessionId?: string
}

export class ChatbotAPIClient {
  private readonly baseURL: string
  private readonly userId: string

  constructor(baseURL: string = 'https://hlpfl.io') {
    this.baseURL = baseURL
    this.userId = this.getOrCreateUserId()
  }

  private getOrCreateUserId(): string {
    if (typeof window !== 'undefined') {
      let userId = localStorage.getItem('hlpfl_user_id')
      if (!userId) {
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem('hlpfl_user_id', userId)
      }
      return userId
    }
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  async sendMessage(message: string, sessionId?: string): Promise<ChatResponse> {
    const payload: ChatMessage = {
      message,
      userId: this.userId,
      sessionId
    }

    try {
      const response = await fetch(`${this.baseURL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'HLPFL-Chatbot/1.0'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      const data: ChatResponse = await response.json()
      return data
    } catch (error) {
      console.error('Chatbot API Error:', error)
      // Fallback to local responses
      return this.getFallbackResponse(message)
    }
  }

  private getFallbackResponse(message: string): ChatResponse {
    const fallbacks = [
      "I'm experiencing some technical difficulties, but I'm here to help! Could you try asking again?",
      "Thanks for your message! I'm connecting to our systems now. How can I help you with HLPFL?",
      "I'm here to assist you with HLPFL! What would you like to know about our services or artist opportunities?"
    ]
    
    return {
      response: fallbacks[Math.floor(Math.random() * fallbacks.length)],
      timestamp: new Date().toISOString()
    }
  }
}
