import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreativeEasterEggs from '@/components/CreativeEasterEggs';

describe('CreativeEasterEggs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Konami Code Trigger', () => {
    it('activates when correct sequence is entered', async () => {
      render(<CreativeEasterEggs />);

      const konamiSequence = [
        'ArrowUp',
        'ArrowUp',
        'ArrowDown',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'ArrowLeft',
        'ArrowRight',
        'b',
        'a',
      ];

      konamiSequence.forEach((key) => {
        fireEvent.keyDown(document, { key });
      });

      await waitFor(() => {
        expect(document.querySelector('[role="alert"]')).toBeInTheDocument();
      });
    });

    it('does not activate with incorrect sequence', () => {
      render(<CreativeEasterEggs />);

      fireEvent.keyDown(document, { key: 'ArrowUp' });
      fireEvent.keyDown(document, { key: 'ArrowDown' });
      fireEvent.keyDown(document, { key: 'a' });

      expect(document.querySelector('[role="alert"]')).not.toBeInTheDocument();
    });
  });

  describe('Hidden Text Trigger', () => {
    it('activates when "hlpfl" is typed', async () => {
      render(<CreativeEasterEggs />);

      'hlpfl'.split('').forEach((char) => {
        fireEvent.keyPress(document, { key: char });
      });

      await waitFor(() => {
        expect(document.querySelector('[role="alert"]')).toBeInTheDocument();
      });
    });

    it('ignores typing in input fields', () => {
      render(
        <>
          <input data-testid="test-input" />
          <CreativeEasterEggs />
        </>
      );

      const input = document.querySelector('input');
      if (input) {
        'hlpfl'.split('').forEach((char) => {
          fireEvent.keyPress(input, { key: char });
        });
      }

      expect(document.querySelector('[role="alert"]')).not.toBeInTheDocument();
    });
  });

  describe('Rate Limiting', () => {
    it('prevents rapid trigger activation', async () => {
      render(<CreativeEasterEggs />);

      // Trigger twice rapidly
      'hlpfl'.split('').forEach((char) => {
        fireEvent.keyPress(document, { key: char });
      });

      await waitFor(() => {
        expect(document.querySelector('[role="alert"]')).toBeInTheDocument();
      });

      // Try to trigger again immediately
      'hlpfl'.split('').forEach((char) => {
        fireEvent.keyPress(document, { key: char });
      });

      // Should still only have one alert
      const alerts = document.querySelectorAll('[role="alert"]');
      expect(alerts.length).toBe(1);
    });
  });

  describe('Analytics Tracking', () => {
    it('tracks easter egg activation', async () => {
      const mockGtag = jest.fn();
      (window as any).gtag = mockGtag;

      render(<CreativeEasterEggs />);

      'hlpfl'.split('').forEach((char) => {
        fireEvent.keyPress(document, { key: char });
      });

      await waitFor(() => {
        expect(mockGtag).toHaveBeenCalledWith('event', 'easter_egg', {
          event_category: 'engagement',
          event_label: 'hidden_text',
        });
      });
    });
  });

  describe('Accessibility', () => {
    it('shows notifications with proper ARIA attributes', async () => {
      render(<CreativeEasterEggs />);

      'hlpfl'.split('').forEach((char) => {
        fireEvent.keyPress(document, { key: char });
      });

      await waitFor(() => {
        const notification = document.querySelector('[role="alert"]');
        expect(notification).toBeInTheDocument();
      });
    });
  });
});