'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BarChart3, MessageSquare, Users, Clock, TrendingUp, Award } from 'lucide-react'

interface AnalyticsData {
  statistics: {
    totalConversations: number
    avgSessionDuration: number
    avgMessagesPerSession: number
    topTopics: Array<{ topic: string; count: number }>
    satisfactionRate: number
    conversionRate: number
  }
  realTimeMetrics: {
    activeConversations: number
    messagesLastHour: number
    topTopicsToday: string[]
    avgResponseTime: number
  }
}

export function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d')

  useEffect(() => {
    fetchAnalyticsData()
    const interval = setInterval(fetchAnalyticsData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [timeRange])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/chatbot-analytics')
      const data = await response.json()
      
      if (data.success) {
        setAnalyticsData(data.data)
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to fetch analytics:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}m ${seconds}s`
  }

  if (loading && !analyticsData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Unable to load analytics data</p>
        <Button onClick={fetchAnalyticsData} className="mt-4">
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Chatbot Analytics</h2>
          <p className="text-gray-400">Real-time insights into chatbot performance and user engagement</p>
        </div>
        <div className="flex gap-2">
          {(['24h', '7d', '30d'] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Conversations</p>
                <p className="text-2xl font-bold text-white">{analyticsData.statistics.totalConversations}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-gold" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Session Duration</p>
                <p className="text-2xl font-bold text-white">
                  {formatDuration(analyticsData.statistics.avgSessionDuration)}
                </p>
              </div>
              <Clock className="h-8 w-8 text-gold" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Satisfaction Rate</p>
                <p className="text-2xl font-bold text-white">
                  {analyticsData.statistics.satisfactionRate.toFixed(1)}%
                </p>
              </div>
              <Award className="h-8 w-8 text-gold" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Conversion Rate</p>
                <p className="text-2xl font-bold text-white">
                  {analyticsData.statistics.conversionRate.toFixed(1)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-gold" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Metrics */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">Real-time Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-dark-secondary p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Conversations</p>
                  <p className="text-xl font-bold text-gold">
                    {analyticsData.realTimeMetrics.activeConversations}
                  </p>
                </div>
                <Users className="h-6 w-6 text-gold" />
              </div>
            </div>
            
            <div className="bg-dark-secondary p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Messages (Last Hour)</p>
                  <p className="text-xl font-bold text-gold">
                    {analyticsData.realTimeMetrics.messagesLastHour}
                  </p>
                </div>
                <MessageSquare className="h-6 w-6 text-gold" />
              </div>
            </div>
            
            <div className="bg-dark-secondary p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg Response Time</p>
                  <p className="text-xl font-bold text-gold">
                    {(analyticsData.realTimeMetrics.avgResponseTime / 1000).toFixed(1)}s
                  </p>
                </div>
                <Clock className="h-6 w-6 text-gold" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Top Topics (All Time)</h3>
            <div className="space-y-3">
              {analyticsData.statistics.topTopics.map((topic, index) => (
                <div key={topic.topic} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-gold font-bold">#{index + 1}</span>
                    <span className="text-white capitalize">
                      {topic.topic.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-gray-400">{topic.count} mentions</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Today's Top Topics</h3>
            <div className="space-y-3">
              {analyticsData.realTimeMetrics.topTopicsToday.map((topic, index) => (
                <div key={topic} className="flex items-center gap-3">
                  <span className="text-gold font-bold">#{index + 1}</span>
                  <span className="text-white capitalize">
                    {topic.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">Engagement Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-2">Avg Messages per Session</p>
              <p className="text-3xl font-bold text-gold">
                {analyticsData.statistics.avgMessagesPerSession.toFixed(1)}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Conversation Quality Score</p>
              <p className="text-3xl font-bold text-gold">
                {((analyticsData.statistics.satisfactionRate + analyticsData.statistics.conversionRate) / 2).toFixed(1)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}