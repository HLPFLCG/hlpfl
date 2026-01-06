import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  type: string
}

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .trim()
    .slice(0, 5000) // Limit length
}

// Rate limiting storage (in-memory, consider Redis for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)
  
  if (!limit || now > limit.resetTime) {
    // Reset or create new limit
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }) // 1 minute window
    return true
  }
  
  if (limit.count >= 5) {
    // Max 5 requests per minute
    return false
  }
  
  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please try again later.' 
        },
        { status: 429 }
      )
    }
    
    // Parse request body
    const body: ContactFormData = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message || !body.type) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'All fields are required.' 
        },
        { status: 400 }
      )
    }
    
    // Validate email format
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email address.' 
        },
        { status: 400 }
      )
    }
    
    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      subject: sanitizeInput(body.subject),
      message: sanitizeInput(body.message),
      type: sanitizeInput(body.type),
      timestamp: new Date().toISOString(),
      ip: ip
    }
    
    // Validate lengths
    if (sanitizedData.name.length < 2 || sanitizedData.name.length > 100) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name must be between 2 and 100 characters.' 
        },
        { status: 400 }
      )
    }
    
    if (sanitizedData.subject.length < 5 || sanitizedData.subject.length > 200) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Subject must be between 5 and 200 characters.' 
        },
        { status: 400 }
      )
    }
    
    if (sanitizedData.message.length < 10 || sanitizedData.message.length > 5000) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Message must be between 10 and 5000 characters.' 
        },
        { status: 400 }
      )
    }
    
    // Log the submission (in production, send email or save to database)
    console.log('Contact form submission:', {
      ...sanitizedData,
      ip: '[REDACTED]' // Don't log IP in production logs
    })
    
    // TODO: Implement email sending
    // Example with a service like Resend, SendGrid, or AWS SES:
    /*
    await sendEmail({
      to: 'contact@hlpflrecords.com',
      from: 'noreply@hlpflrecords.com',
      replyTo: sanitizedData.email,
      subject: `[${sanitizedData.type}] ${sanitizedData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${sanitizedData.name} (${sanitizedData.email})</p>
        <p><strong>Type:</strong> ${sanitizedData.type}</p>
        <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted at: ${sanitizedData.timestamp}</small></p>
      `
    })
    */
    
    // For now, simulate successful submission
    // In production, only return success after email is sent
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.' 
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred while processing your request. Please try again later.' 
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}