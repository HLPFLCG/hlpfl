'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class EnhancedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Send to analytics/error tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: false,
      });
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black p-4">
          <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Oops! Something went wrong
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                  We encountered an unexpected error
                </p>
              </div>
            </div>

            {this.state.error && (
              <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 mb-6">
                <p className="text-sm font-mono text-zinc-700 dark:text-zinc-300 mb-2">
                  {this.state.error.message}
                </p>
                {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                  <details className="mt-4">
                    <summary className="text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-200">
                      Show error details
                    </summary>
                    <pre className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 overflow-auto max-h-64 p-2 bg-zinc-100 dark:bg-zinc-900 rounded">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c87941] to-[#d4945c] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>
              <button
                onClick={this.handleReload}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Reload Page
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
              >
                <Home className="w-5 h-5" />
                Go Home
              </button>
            </div>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center mt-6">
              If this problem persists, please contact support at{' '}
              <a
                href="mailto:contact@hlpfl.org"
                className="text-[#c87941] hover:underline"
              >
                contact@hlpfl.org
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}