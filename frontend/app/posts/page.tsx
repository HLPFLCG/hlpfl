'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { apiClient } from '@/lib/api/client';
import { 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Send,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

interface Post {
  id: string;
  content: string;
  platforms: string[];
  status: 'draft' | 'scheduled' | 'published';
  scheduled_for?: string;
  published_at?: string;
  created_at: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await apiClient.getPosts(params);
      setPosts(response.data || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await apiClient.deletePost(id);
      setPosts(posts.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post');
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await apiClient.publishPost(id);
      fetchPosts();
    } catch (error) {
      console.error('Failed to publish post:', error);
      alert('Failed to publish post');
    }
  };

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      twitter: '𝕏',
      linkedin: 'in',
      facebook: 'f',
      instagram: '📷',
    };
    return icons[platform] || platform.charAt(0).toUpperCase();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
            <p className="text-gray-600 mt-2">Manage your social media posts</p>
          </div>
          <Link
            href="/posts/new"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition"
          >
            <Plus className="w-5 h-5" />
            Create Post
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Posts</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
                <option value="draft">Drafts</option>
              </select>
            </div>
          </div>
        </div>

        {/* Posts List */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery ? 'Try a different search term' : 'Create your first post to get started'}
            </p>
            <Link
              href="/posts/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition"
            >
              <Plus className="w-5 h-5" />
              Create Post
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                      <div className="flex items-center gap-1">
                        {post.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-semibold"
                            title={platform}
                          >
                            {getPlatformIcon(platform)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-900 line-clamp-2">{post.content}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-600">
                    {post.status === 'scheduled' && post.scheduled_for && (
                      <span>Scheduled for {new Date(post.scheduled_for).toLocaleString()}</span>
                    )}
                    {post.status === 'published' && post.published_at && (
                      <span>Published {new Date(post.published_at).toLocaleString()}</span>
                    )}
                    {post.status === 'draft' && (
                      <span>Created {new Date(post.created_at).toLocaleString()}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/posts/${post.id}`}
                      className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
                      title="View"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <Link
                      href={`/posts/${post.id}/edit`}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    {post.status === 'draft' && (
                      <button
                        onClick={() => handlePublish(post.id)}
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                        title="Publish"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}