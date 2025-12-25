import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SecretMusicPlayer from '@/components/SecretMusicPlayer';

// Mock audio element
const mockAudio = {
  play: jest.fn().mockResolvedValue(undefined),
  pause: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  currentTime: 0,
  duration: 180,
  volume: 0.7,
  muted: false,
};

global.HTMLMediaElement.prototype.play = mockAudio.play;
global.HTMLMediaElement.prototype.pause = mockAudio.pause;

describe('SecretMusicPlayer', () => {
  const mockTrack = {
    id: '1',
    title: 'Test Track',
    file: '/audio/test.mp3',
    color: '#c87941',
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with track information', () => {
    render(<SecretMusicPlayer track={mockTrack} onClose={mockOnClose} />);
    
    expect(screen.getByText('Test Track')).toBeInTheDocument();
    expect(screen.getByText('Alki - Unreleased Track')).toBeInTheDocument();
  });

  it('auto-plays on mount', async () => {
    render(<SecretMusicPlayer track={mockTrack} onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockAudio.play).toHaveBeenCalled();
    });
  });

  it('closes when close button is clicked', () => {
    render(<SecretMusicPlayer track={mockTrack} onClose={mockOnClose} />);
    
    const closeButton = screen.getByLabelText('Close player');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('closes when Escape key is pressed', () => {
    render(<SecretMusicPlayer track={mockTrack} onClose={mockOnClose} />);
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('toggles play/pause with Space key', async () => {
    render(<SecretMusicPlayer track={mockTrack} onClose={mockOnClose} />);
    
    await waitFor(() => {
      expect(mockAudio.play).toHaveBeenCalled();
    });

    fireEvent.keyDown(document, { key: ' ' });
    
    await waitFor(() => {
      expect(mockAudio.pause).toHaveBeenCalled();
    });
  });

  it('renders visualizer canvas', () => {
    const { container } = render(<SecretMusicPlayer track={mockTrack} onClose={mockOnClose} />);
    
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('width', '800');
    expect(canvas).toHaveAttribute('height', '192');
  });

  it('displays keyboard shortcuts hint', () => {
    render(<SecretMusicPlayer track={mockTrack} onClose={mockOnClose} />);
    
    expect(screen.getByText(/SPACE/)).toBeInTheDocument();
    expect(screen.getByText(/M/)).toBeInTheDocument();
    expect(screen.getByText(/ESC/)).toBeInTheDocument();
  });

  it('has proper ARIA labels', () => {
    render(<SecretMusicPlayer track={mockTrack} onClose={mockOnClose} />);
    
    expect(screen.getByLabelText('Close player')).toBeInTheDocument();
  });
});