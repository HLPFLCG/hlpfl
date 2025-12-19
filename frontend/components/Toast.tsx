'use client';

import { Toaster } from 'sonner';

/**
 * Toast Notification Component
 * Provides a consistent way to show toast notifications across the app
 * Uses sonner library for beautiful, accessible toast notifications
 */
export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      duration={4000}
      toastOptions={{
        style: {
          background: 'white',
          color: '#1f2937',
          border: '1px solid #e5e7eb',
        },
        className: 'toast',
      }}
    />
  );
}

// Export toast function for easy use
export { toast } from 'sonner';