'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';

// Single track player - NO MENU, NO TRACK SWITCHING
// Each trigger opens a NEW instance for THAT track only

interface Track {
  id: string;
  title: string;
  file: string;
  color: string;
}

interface SecretMusicPlayerProps {
  track: Track;
  onClose: () => void;
}

const SecretMusicPlayer = ({ track, onClose }: SecretMusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize audio context and visualizer
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current && audioRef.current && !sourceRef.current) {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      } catch (error) {
        console.error('Audio context error:', error);
      }
    }
  }, []);

  // Draw visualizer
  const drawVisualizer = useCallback(() => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    ctx.fillStyle = 'rgba(10, 10, 10, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;

      const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
      gradient.addColorStop(0, '#d4945c');
      gradient.addColorStop(0.5, track.color);
      gradient.addColorStop(1, '#a86535');

      ctx.fillStyle = gradient;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

      ctx.shadowBlur = 15;
      ctx.shadowColor = track.color;

      x += barWidth + 1;
    }

    ctx.shadowBlur = 0;
    animationFrameRef.current = requestAnimationFrame(drawVisualizer);
  }, [track.color]);

  // Auto-play on mount
  useEffect(() => {
    if (audioRef.current) {
      initAudioContext();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      }).catch(console.error);
    }
  }, [initAudioContext]);

  // Start visualizer when playing
  useEffect(() => {
    if (isPlaying && analyserRef.current) {
      drawVisualizer();
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, drawVisualizer]);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      initAudioContext();
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  }, [isPlaying, initAudioContext]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  // Handle volume change
  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  // Handle seek
  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  }, []);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onClose, togglePlay, toggleMute]);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl mx-4 bg-gradient-to-br from-zinc-900 to-black rounded-2xl shadow-2xl overflow-hidden border border-zinc-800"
        style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors"
          aria-label="Close player"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Visualizer */}
        <div className="relative w-full h-48 bg-black">
          <canvas
            ref={canvasRef}
            width={800}
            height={192}
            className="w-full h-full"
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: track.color }}></div>
            </div>
          )}
        </div>

        {/* Track info */}
        <div className="p-6 space-y-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-1">{track.title}</h3>
            <p className="text-sm text-zinc-400">Alki - Unreleased Track</p>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${track.color} 0%, ${track.color} ${(currentTime / duration) * 100}%, #3f3f46 ${(currentTime / duration) * 100}%, #3f3f46 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-zinc-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={togglePlay}
              className="p-4 rounded-full transition-all hover:scale-110"
              style={{ backgroundColor: track.color }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-6 bg-white rounded"></div>
                    <div className="w-1.5 h-6 bg-white rounded"></div>
                  </div>
                </div>
              ) : (
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                </div>
              )}
            </button>
          </div>

          {/* Volume control */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-zinc-400" />
              ) : (
                <Volume2 className="w-5 h-5 text-zinc-400" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${track.color} 0%, ${track.color} ${volume * 100}%, #3f3f46 ${volume * 100}%, #3f3f46 100%)`
              }}
            />
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="text-center text-xs text-zinc-500 pt-2 border-t border-zinc-800">
            <span className="font-mono">SPACE</span> to play/pause • <span className="font-mono">M</span> to mute • <span className="font-mono">ESC</span> to close
          </div>
        </div>

        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={track.file}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={() => setIsPlaying(false)}
          preload="auto"
        />
      </div>
    </div>
  );
};

export default SecretMusicPlayer;