'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

/**
 * Loading Spinner Component
 * Displays an animated loading spinner with optional text
 * Accessible and customizable
 */
export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2
        className={cn('animate-spin text-purple-600', sizeClasses[size], className)}
        aria-label="Loading"
      />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );
}

/**
 * Full Page Loading Component
 * Displays a centered loading spinner that covers the entire page
 */
export function LoadingPage({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <LoadingSpinner size="xl" text={text} />
    </div>
  );
}

/**
 * Skeleton Loader Component
 * Displays a skeleton loading state for content
 */
interface SkeletonProps {
  className?: string;
  count?: number;
}

export function Skeleton({ className, count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn('animate-pulse rounded-md bg-gray-200', className)}
          aria-label="Loading content"
        />
      ))}
    </>
  );
}

/**
 * Card Skeleton Component
 * Displays a skeleton loading state for card components
 */
export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <Skeleton className="mb-4 h-6 w-3/4" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  );
}

/**
 * Table Skeleton Component
 * Displays a skeleton loading state for table rows
 */
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}