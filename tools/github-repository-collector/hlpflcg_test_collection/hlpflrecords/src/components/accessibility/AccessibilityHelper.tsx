'use client';

import { useEffect, useState } from 'react';

export const AccessibilityHelper = () => {
  const [announcements, setAnnouncements] = useState<string[]>([]);

  // Announce to screen readers
  const announce = (message: string) => {
    setAnnouncements(prev => [...prev, message]);
    setTimeout(() => {
      setAnnouncements(prev => prev.slice(1));
    }, 1000);
  };

  // Make announce function available globally
  useEffect(() => {
    (window as any).announceToScreenReader = announce;
  }, []);

  return (
    <>
      {/* Screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcements.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>

      {/* Focus visible styles */}
      <style jsx global>{`
        /* Enhanced focus indicators */
        *:focus-visible {
          outline: 2px solid #c87941;
          outline-offset: 2px;
          border-radius: 4px;
        }

        /* Remove default focus for mouse users */
        *:focus:not(:focus-visible) {
          outline: none;
        }

        /* Skip to content link */
        .skip-link {
          position: absolute;
          top: -40px;
          left: 0;
          background: #c87941;
          color: white;
          padding: 8px 16px;
          text-decoration: none;
          z-index: 100;
        }

        .skip-link:focus {
          top: 0;
        }

        /* Screen reader only class */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        .sr-only-focusable:focus,
        .sr-only-focusable:active {
          position: static;
          width: auto;
          height: auto;
          overflow: visible;
          clip: auto;
          white-space: normal;
        }
      `}</style>
    </>
  );
};

// Hook for keyboard navigation
export const useKeyboardNavigation = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab trap for modals
      if (e.key === 'Tab') {
        const modal = document.querySelector('[role="dialog"]');
        if (modal) {
          const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
};

// ARIA live region announcer
export const announceToScreenReader = (message: string) => {
  if (typeof window !== 'undefined' && (window as any).announceToScreenReader) {
    (window as any).announceToScreenReader(message);
  }
};