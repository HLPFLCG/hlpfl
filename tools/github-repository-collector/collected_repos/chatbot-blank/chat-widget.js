/**
 * HLPFL Records Chat Widget
 * Version: 2.0.0
 * 
 * A bulletproof, production-ready chat widget with:
 * - HLPFL branding and logo
 * - Responsive design
 * - Error handling
 * - Typing indicators
 * - Message history
 * - Accessibility features
 */

class HLPFLChatWidget {
  constructor(options = {}) {
    this.apiUrl = options.apiUrl || 'https://hlpfl.io/api/chat';
    this.container = options.container || 'body';
    this.position = options.position || 'bottom-right';
    this.primaryColor = options.primaryColor || '#CD8B5C';
    this.sessionId = this.generateSessionId();
    this.messageHistory = [];
    this.isOpen = false;
    this.isTyping = false;
    
    this.init();
  }
  
  generateSessionId() {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  init() {
    this.injectStyles();
    this.createWidget();
    this.attachEventListeners();
  }
  
  injectStyles() {
    if (document.getElementById('hlpfl-chat-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'hlpfl-chat-styles';
    styles.textContent = `
      /* HLPFL Chat Widget Styles */
      .hlpfl-chat-widget {
        position: fixed;
        ${this.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
        ${this.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      }
      
      .hlpfl-chat-toggle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, ${this.primaryColor} 0%, #B87A4D 100%);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(205, 139, 92, 0.4);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        color: white;
        font-size: 24px;
      }
      
      .hlpfl-chat-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(205, 139, 92, 0.5);
      }
      
      .hlpfl-chat-toggle:active {
        transform: scale(0.95);
      }
      
      .hlpfl-chat-window {
        position: absolute;
        ${this.position.includes('bottom') ? 'bottom: 80px;' : 'top: 80px;'}
        ${this.position.includes('right') ? 'right: 0;' : 'left: 0;'}
        width: 380px;
        max-width: calc(100vw - 40px);
        height: 600px;
        max-height: calc(100vh - 120px);
        background: #FFFFFF;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        display: none;
        flex-direction: column;
        overflow: hidden;
        animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .hlpfl-chat-window.open {
        display: flex;
      }
      
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .hlpfl-chat-header {
        background: linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%);
        color: white;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid ${this.primaryColor};
        box-shadow: 0 2px 8px rgba(205, 139, 92, 0.3);
      }
      
      .hlpfl-chat-header-content {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
      }
      
      .hlpfl-chat-logo {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        background: ${this.primaryColor};
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 24px;
        color: white;
        flex-shrink: 0;
        box-shadow: 0 2px 8px rgba(205, 139, 92, 0.4);
      }
      
      .hlpfl-chat-logo img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 8px;
      }
      
      .hlpfl-chat-header-text {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      
      .hlpfl-chat-title {
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 0.3px;
        margin: 0;
      }
      
      .hlpfl-chat-subtitle {
        font-size: 13px;
        color: #A0A0A0;
        margin: 0;
      }
      
      .hlpfl-chat-close {
        background: transparent;
        border: none;
        color: white;
        font-size: 28px;
        cursor: pointer;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }
      
      .hlpfl-chat-close:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      
      .hlpfl-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background: #F5F5F5;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .hlpfl-chat-message {
        display: flex;
        gap: 12px;
        animation: messageSlide 0.3s ease;
      }
      
      @keyframes messageSlide {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .hlpfl-chat-message.user {
        flex-direction: row-reverse;
      }
      
      .hlpfl-chat-message-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: ${this.primaryColor};
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: 14px;
        flex-shrink: 0;
      }
      
      .hlpfl-chat-message.user .hlpfl-chat-message-avatar {
        background: #666666;
      }
      
      .hlpfl-chat-message-content {
        max-width: 70%;
        background: white;
        padding: 12px 16px;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        word-wrap: break-word;
        white-space: pre-wrap;
        line-height: 1.5;
      }
      
      .hlpfl-chat-message.user .hlpfl-chat-message-content {
        background: linear-gradient(135deg, ${this.primaryColor} 0%, #B87A4D 100%);
        color: white;
      }
      
      .hlpfl-chat-typing {
        display: flex;
        gap: 12px;
        align-items: center;
        padding: 12px 16px;
        background: white;
        border-radius: 12px;
        width: fit-content;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      .hlpfl-chat-typing-dots {
        display: flex;
        gap: 4px;
      }
      
      .hlpfl-chat-typing-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${this.primaryColor};
        animation: typingDot 1.4s infinite;
      }
      
      .hlpfl-chat-typing-dot:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .hlpfl-chat-typing-dot:nth-child(3) {
        animation-delay: 0.4s;
      }
      
      @keyframes typingDot {
        0%, 60%, 100% {
          transform: translateY(0);
          opacity: 0.7;
        }
        30% {
          transform: translateY(-10px);
          opacity: 1;
        }
      }
      
      .hlpfl-chat-input-container {
        padding: 16px;
        background: white;
        border-top: 1px solid #E0E0E0;
        display: flex;
        gap: 12px;
      }
      
      .hlpfl-chat-input {
        flex: 1;
        padding: 12px 16px;
        border: 2px solid #E0E0E0;
        border-radius: 24px;
        font-size: 14px;
        outline: none;
        transition: all 0.2s ease;
        font-family: inherit;
      }
      
      .hlpfl-chat-input:focus {
        border-color: ${this.primaryColor};
        box-shadow: 0 0 0 3px rgba(205, 139, 92, 0.1);
      }
      
      .hlpfl-chat-send {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: linear-gradient(135deg, ${this.primaryColor} 0%, #B87A4D 100%);
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        font-size: 18px;
        flex-shrink: 0;
      }
      
      .hlpfl-chat-send:hover:not(:disabled) {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(205, 139, 92, 0.4);
      }
      
      .hlpfl-chat-send:active:not(:disabled) {
        transform: scale(0.95);
      }
      
      .hlpfl-chat-send:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .hlpfl-chat-welcome {
        text-align: center;
        padding: 40px 20px;
        color: #666;
      }
      
      .hlpfl-chat-welcome h3 {
        margin: 0 0 12px 0;
        color: #333;
        font-size: 20px;
      }
      
      .hlpfl-chat-welcome p {
        margin: 0;
        font-size: 14px;
        line-height: 1.6;
      }
      
      /* Mobile responsiveness */
      @media (max-width: 480px) {
        .hlpfl-chat-window {
          width: calc(100vw - 40px);
          height: calc(100vh - 120px);
        }
        
        .hlpfl-chat-message-content {
          max-width: 80%;
        }
      }
      
      /* Scrollbar styling */
      .hlpfl-chat-messages::-webkit-scrollbar {
        width: 6px;
      }
      
      .hlpfl-chat-messages::-webkit-scrollbar-track {
        background: #F5F5F5;
      }
      
      .hlpfl-chat-messages::-webkit-scrollbar-thumb {
        background: ${this.primaryColor};
        border-radius: 3px;
      }
      
      .hlpfl-chat-messages::-webkit-scrollbar-thumb:hover {
        background: #B87A4D;
      }
    `;
    
    document.head.appendChild(styles);
  }
  
  createWidget() {
    const widget = document.createElement('div');
    widget.className = 'hlpfl-chat-widget';
    widget.innerHTML = `
      <button class="hlpfl-chat-toggle" aria-label="Open chat">
        💬
      </button>
      <div class="hlpfl-chat-window">
        <div class="hlpfl-chat-header">
          <div class="hlpfl-chat-header-content">
            <div class="hlpfl-chat-logo">
              <img src="${this.apiUrl.replace('/api/chat', '/assets/logo.svg')}" alt="HLPFL Records" onerror="this.parentElement.innerHTML='H'">
            </div>
            <div class="hlpfl-chat-header-text">
              <h3 class="hlpfl-chat-title">HLPFL Records</h3>
              <p class="hlpfl-chat-subtitle">Grand Rapids, MI</p>
            </div>
          </div>
          <button class="hlpfl-chat-close" aria-label="Close chat">×</button>
        </div>
        <div class="hlpfl-chat-messages">
          <div class="hlpfl-chat-welcome">
            <h3>Welcome to HLPFL Records! 🎵</h3>
            <p>We're here to help with artist development, music production, distribution, and more. How can we assist you today?</p>
          </div>
        </div>
        <div class="hlpfl-chat-input-container">
          <input 
            type="text" 
            class="hlpfl-chat-input" 
            placeholder="Ask about our services..." 
            maxlength="1000"
            aria-label="Chat message input"
          >
          <button class="hlpfl-chat-send" aria-label="Send message">➤</button>
        </div>
      </div>
    `;
    
    const container = document.querySelector(this.container);
    if (container) {
      container.appendChild(widget);
    } else {
      document.body.appendChild(widget);
    }
  }
  
  attachEventListeners() {
    const toggle = document.querySelector('.hlpfl-chat-toggle');
    const close = document.querySelector('.hlpfl-chat-close');
    const input = document.querySelector('.hlpfl-chat-input');
    const send = document.querySelector('.hlpfl-chat-send');
    
    if (toggle) {
      toggle.addEventListener('click', () => this.toggleChat());
    }
    
    if (close) {
      close.addEventListener('click', () => this.closeChat());
    }
    
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }
    
    if (send) {
      send.addEventListener('click', () => this.sendMessage());
    }
  }
  
  toggleChat() {
    const window = document.querySelector('.hlpfl-chat-window');
    if (window) {
      this.isOpen = !this.isOpen;
      window.classList.toggle('open', this.isOpen);
      
      if (this.isOpen) {
        const input = document.querySelector('.hlpfl-chat-input');
        if (input) input.focus();
      }
    }
  }
  
  closeChat() {
    const window = document.querySelector('.hlpfl-chat-window');
    if (window) {
      this.isOpen = false;
      window.classList.remove('open');
    }
  }
  
  async sendMessage() {
    const input = document.querySelector('.hlpfl-chat-input');
    const send = document.querySelector('.hlpfl-chat-send');
    
    if (!input || !send) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    // Disable input while sending
    input.disabled = true;
    send.disabled = true;
    
    // Add user message to chat
    this.addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    this.showTyping();
    
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          sessionId: this.sessionId
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Remove typing indicator
      this.hideTyping();
      
      // Add bot response
      this.addMessage(data.response, 'bot');
      
      // Store in history
      this.messageHistory.push({
        user: message,
        bot: data.response,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Chat error:', error);
      this.hideTyping();
      this.addMessage(
        "I'm having trouble connecting right now. Please try again in a moment, or contact us directly at contact@hlpflrecords.com",
        'bot'
      );
    } finally {
      // Re-enable input
      input.disabled = false;
      send.disabled = false;
      input.focus();
    }
  }
  
  addMessage(text, sender) {
    const messagesContainer = document.querySelector('.hlpfl-chat-messages');
    if (!messagesContainer) return;
    
    // Remove welcome message if it exists
    const welcome = messagesContainer.querySelector('.hlpfl-chat-welcome');
    if (welcome) {
      welcome.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `hlpfl-chat-message ${sender}`;
    
    const avatar = sender === 'user' ? 'U' : 'H';
    
    messageDiv.innerHTML = `
      <div class="hlpfl-chat-message-avatar">${avatar}</div>
      <div class="hlpfl-chat-message-content">${this.escapeHtml(text)}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  showTyping() {
    const messagesContainer = document.querySelector('.hlpfl-chat-messages');
    if (!messagesContainer || this.isTyping) return;
    
    this.isTyping = true;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'hlpfl-chat-message bot';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
      <div class="hlpfl-chat-message-avatar">H</div>
      <div class="hlpfl-chat-typing">
        <div class="hlpfl-chat-typing-dots">
          <div class="hlpfl-chat-typing-dot"></div>
          <div class="hlpfl-chat-typing-dot"></div>
          <div class="hlpfl-chat-typing-dot"></div>
        </div>
      </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  hideTyping() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
    this.isTyping = false;
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML.replace(/\n/g, '<br>');
  }
}

// Auto-initialize if script is loaded directly
if (typeof window !== 'undefined') {
  window.HLPFLChatWidget = HLPFLChatWidget;
  
  // Auto-initialize with default settings
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.hlpflChatWidget) {
      window.hlpflChatWidget = new HLPFLChatWidget({
        apiUrl: 'https://hlpfl.io/api/chat'
      });
    }
  });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HLPFLChatWidget;
}