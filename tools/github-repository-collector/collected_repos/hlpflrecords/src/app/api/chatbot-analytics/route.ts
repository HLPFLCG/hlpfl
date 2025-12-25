import { NextRequest, NextResponse } from 'next/server'
import { ChatbotAnalytics } from '@/lib/chatbotAnalytics'

// This is a simple in-memory storage for demonstration
// In production, you'd want to use a proper database
const analyticsData: Array<{
  event: string
  data: any
  timestamp: string
}> = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, data, timestamp } = body

    // Store the analytics data
    analyticsData.push({
      event,
      data,
      timestamp: timestamp || new Date().toISOString()
    })

    // Here you could also send data to external analytics services
    // like Google Analytics, Mixpanel, Amplitude, etc.
    
    // Log for development only
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics received:', { event, data, timestamp })
    }

    // In a real implementation, you might want to:
    // 1. Validate the data
    // 2. Store in a database (PostgreSQL, MongoDB, etc.)
    // 3. Send to external analytics services
    // 4. Trigger real-time notifications if needed

    return NextResponse.json({ 
      success: true, 
      message: 'Analytics data received successfully',
      stored: analyticsData.length
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Analytics error:', error)
    }
    return NextResponse.json(
      { error: 'Failed to process analytics data' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const analytics = ChatbotAnalytics.getInstance()
    const statistics = analytics.getStatistics()
    const realTimeMetrics = analytics.getRealTimeMetrics()

    return NextResponse.json({
      success: true,
      data: {
        statistics,
        realTimeMetrics,
        recentEvents: analyticsData.slice(-10), // Last 10 events
        totalEvents: analyticsData.length
      }
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Analytics fetch error:', error)
    }
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}