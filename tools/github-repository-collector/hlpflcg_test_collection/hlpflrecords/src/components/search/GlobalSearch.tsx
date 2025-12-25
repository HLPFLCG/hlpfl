'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { mockReleases } from '@/data/mockData';
import Link from 'next/link';

interface SearchResult {
  type: 'release' | 'artist';
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  image?: string;
}

export const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Search function
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search releases
    mockReleases.forEach(release => {
      if (
        release.title.toLowerCase().includes(query) ||
        release.artist.toLowerCase().includes(query)
      ) {
        searchResults.push({
          type: 'release',
          id: release.id,
          title: release.title,
          subtitle: release.artist,
          url: '/releases',
          image: release.coverArt,
        });
      }
    });

    // Limit results
    setResults(searchResults.slice(0, 10));
    setSelectedIndex(0);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 150);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        window.location.href = results[selectedIndex].url;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
      >
        <Search size={18} />
        <span className="hidden md:inline text-sm">Search</span>
        <kbd className="hidden md:inline px-2 py-1 text-xs bg-white/10 rounded">⌘K</kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 z-[9998]"
        onClick={() => setIsOpen(false)}
      />

      {/* Search Modal */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[9999] px-4">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-[#c87941] rounded-xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-white/10">
            <Search size={20} className="text-[#c87941]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search releases, artists..."
              className="flex-1 bg-transparent text-white placeholder-white/50 outline-none"
              autoFocus
            />
            <button
              onClick={() => {
                setIsOpen(false);
                setQuery('');
              }}
              className="text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {results.length === 0 && query && (
              <div className="p-8 text-center text-white/50">
                No results found for "{query}"
              </div>
            )}

            {results.length === 0 && !query && (
              <div className="p-8 text-center text-white/50">
                <p className="mb-2">Start typing to search...</p>
                <p className="text-xs">Try searching for releases or artists</p>
              </div>
            )}

            {results.map((result, index) => (
              <Link
                key={result.id}
                href={result.url}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 p-4 hover:bg-white/5 transition-colors ${
                  index === selectedIndex ? 'bg-white/10' : ''
                }`}
              >
                {result.image && (
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                )}
                <div className="flex-1">
                  <p className="text-white font-semibold">{result.title}</p>
                  {result.subtitle && (
                    <p className="text-white/60 text-sm">{result.subtitle}</p>
                  )}
                </div>
                <span className="text-xs text-white/40 uppercase">{result.type}</span>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-white/10 bg-black/30">
            <div className="flex items-center justify-between text-xs text-white/50">
              <div className="flex items-center gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span>{results.length} results</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};