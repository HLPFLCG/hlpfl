'use client';

import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const styles = {
  success: 'bg-green-50 text-green-900 border-green-200',
  error: 'bg-red-50 text-red-900 border-red-200',
  info: 'bg-blue-50 text-blue-900 border-blue-200',
  warning: 'bg-yellow-50 text-yellow-900 border-yellow-200',
};

function ToastItem({ toast, onClose }: ToastProps) {
  const Icon = icons[toast.type];

  useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(() => {
        onClose(toast.id);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onClose]);

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border shadow-lg animate-slide-in-right',
        styles[toast.type]
      )}
      role="alert"
      aria-live="assertive"
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => onClose(toast.id)}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleToast = (event: CustomEvent<Omit<Toast, 'id'>>) => {
      const id = Math.random().toString(36).substring(7);
      const newToast = { ...event.detail, id };
      setToasts((prev) => [...prev, newToast]);
    };

    window.addEventListener('toast' as any, handleToast);
    return () => window.removeEventListener('toast' as any, handleToast);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[10001] space-y-2 max-w-md">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>
  );
}

// Helper function to show toasts
export const toast = {
  success: (message: string, duration = 3000) => {
    window.dispatchEvent(
      new CustomEvent('toast', {
        detail: { message, type: 'success', duration },
      })
    );
  },
  error: (message: string, duration = 5000) => {
    window.dispatchEvent(
      new CustomEvent('toast', {
        detail: { message, type: 'error', duration },
      })
    );
  },
  info: (message: string, duration = 3000) => {
    window.dispatchEvent(
      new CustomEvent('toast', {
        detail: { message, type: 'info', duration },
      })
    );
  },
  warning: (message: string, duration = 4000) => {
    window.dispatchEvent(
      new CustomEvent('toast', {
        detail: { message, type: 'warning', duration },
      })
    );
  },
};