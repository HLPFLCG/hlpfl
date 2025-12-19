'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { apiClient } from '@/lib/api/client';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from 'lucide-react';

interface DashboardStats {
  posts: {
    total: number;
    published: number;
    scheduled: number;
    draft: number;
  };
  engagement: {
    total_impressions: number;
    total_likes: number;
    total_comments: number;
    total_shares: number;
  };
  financial?: {
    revenue: number;
    expenses: number;
    net_revenue: number;
    commission: number;
    artist_earnings: number;
  };
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [analyticsData, financialData] = await Promise.all([
          apiClient.getAnalyticsOverview({ days: 30 }),
          apiClient.getFinancialDashboard().catch(() => null),
        ]);

        setStats({
          posts: analyticsData.posts || { total: 0, published: 0, scheduled: 0, draft: 0 },
          engagement: analyticsData.engagement || { 
            total_impressions: 0, 
            total_likes: 0, 
            total_comments: 0, 
            total_shares: 0 
          },
          financial: financialData || undefined,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      </DashboardLayout>
    );
  }

  const statCards = [
    {
      name: 'Total Posts',
      value: stats?.posts.total || 0,
      change: '+12%',
      changeType: 'positive',
      icon: FileText,
      color: 'purple',
    },
    {
      name: 'Total Impressions',
      value: (stats?.engagement.total_impressions || 0).toLocaleString(),
      change: '+23%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'blue',
    },
    {
      name: 'Engagement',
      value: (
        (stats?.engagement.total_likes || 0) +
        (stats?.engagement.total_comments || 0) +
        (stats?.engagement.total_shares || 0)
      ).toLocaleString(),
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      color: 'green',
    },
    {
      name: 'Revenue',
      value: stats?.financial 
        ? `$${stats.financial.revenue.toLocaleString()}` 
        : '$0',
      change: '+15%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'yellow',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your account.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span className="font-medium">{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-600 mt-1">{stat.name}</p>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Posts Breakdown */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Posts Overview</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Published</span>
                <span className="font-semibold text-gray-900">{stats?.posts.published || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Scheduled</span>
                <span className="font-semibold text-gray-900">{stats?.posts.scheduled || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Drafts</span>
                <span className="font-semibold text-gray-900">{stats?.posts.draft || 0}</span>
              </div>
            </div>
          </div>

          {/* Engagement Breakdown */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Engagement</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Likes</span>
                <span className="font-semibold text-gray-900">
                  {(stats?.engagement.total_likes || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Comments</span>
                <span className="font-semibold text-gray-900">
                  {(stats?.engagement.total_comments || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Shares</span>
                <span className="font-semibold text-gray-900">
                  {(stats?.engagement.total_shares || 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Overview (if available) */}
        {stats?.financial && (
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-lg font-semibold mb-4">Financial Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-purple-100 text-sm">Net Revenue</p>
                <p className="text-2xl font-bold mt-1">
                  ${stats.financial.net_revenue.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-purple-100 text-sm">Commission (11%)</p>
                <p className="text-2xl font-bold mt-1">
                  ${stats.financial.commission.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-purple-100 text-sm">Your Earnings (89%)</p>
                <p className="text-2xl font-bold mt-1">
                  ${stats.financial.artist_earnings.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/posts/new"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition"
            >
              <FileText className="w-6 h-6 text-purple-600" />
              <div>
                <p className="font-semibold text-gray-900">Create Post</p>
                <p className="text-sm text-gray-600">Start a new post</p>
              </div>
            </a>
            <a
              href="/media"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition"
            >
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900">View Analytics</p>
                <p className="text-sm text-gray-600">Check performance</p>
              </div>
            </a>
            <a
              href="/teams"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition"
            >
              <Users className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold text-gray-900">Manage Team</p>
                <p className="text-sm text-gray-600">Invite members</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}