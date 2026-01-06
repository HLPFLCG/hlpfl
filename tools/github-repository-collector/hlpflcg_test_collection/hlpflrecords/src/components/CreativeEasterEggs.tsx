'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the player to avoid SSR issues
const SecretMusicPlayer = dynamic(() => import('./SecretMusicPlayer'), { ssr: false });

// Unreleased Alki tracks - Easter egg exclusives
const TRACKS = [
  { id: '1', title: '5D', file: '/audio/5d.mp3', color: '#c87941', trigger: 'konami' },
  { id: '2', title: 'Home (Alone)', file: '/audio/home.mp3', color: '#d4945c', trigger: 'logo-clicks' },
  { id: '3', title: 'Regrets', file: '/audio/regrets ! wip 3 - alki.mp3', color: '#a86535', trigger: 'hidden' },
  { id: '4', title: 'Tear Me Apart', file: '/audio/tear-me-apart.mp3', color: '#c87941', trigger: 'time-based' },
  { id: '5', title: "Writin' My Wrongs", file: '/audio/writin-my-wrongs.mp3', color: '#d4945c', trigger: 'mouse-pattern' },
  { id: '6', title: 'PTSD', file: '/audio/ptsd.mp3', color: '#a86535', trigger: 'hidden' },
  { id: '7', title: 'Lottery', file: '/audio/lottery.mp3', color: '#c87941', trigger: 'hidden' },
  { id: '8', title: 'Doomed From The Start', file: '/audio/doomed.mp3', color: '#d4945c', trigger: 'hidden' },
  { id: '9', title: 'Death Of Me', file: '/audio/death-of-me.mp3', color: '#a86535', trigger: 'hidden' },
  { id: '10', title: 'Sad! Just In A Corvette', file: '/audio/sad-corvette.mp3', color: '#c87941', trigger: 'hidden' },
  { id: '11', title: '1113', file: '/audio/1113.mp3', color: '#d4945c', trigger: 'hidden' },
];

const CreativeEasterEggs = () => {
  const [activeTrack, setActiveTrack] = useState<typeof TRACKS[0] | null>(null);
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
  const [logoClicks, setLogoClicks] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  const [mousePattern, setMousePattern] = useState<{ x: number; y: number; time: number }[]>([]);
  
  const logoClickTimeout = useRef<NodeJS.Timeout>();
  const lastTriggerTime = useRef(0);
  const hasTriggeredToday = useRef<Set<string>>(new Set());

  // Rate limiting - prevent spam
  const canTrigger = useCallback((triggerType: string) => {
    const now = Date.now();
    if (now - lastTriggerTime.current < 2000) return false; // 2 second cooldown
    
    // Check if already triggered today
    const today = new Date().toDateString();
    const key = `${triggerType}-${today}`;
    if (hasTriggeredToday.current.has(key)) return false;
    
    lastTriggerTime.current = now;
    hasTriggeredToday.current.add(key);
    return true;
  }, []);

  // Show notification
  const showNotification = useCallback((message: string, emoji: string = '🎵') => {
    const notification = document.createElement('div');
    notification.textContent = `${emoji} ${message}`;
    notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-[#c87941] to-[#d4945c] text-white px-6 py-3 rounded-lg font-semibold shadow-lg z-[9999] animate-slide-in-right';
    notification.style.fontFamily = "'Space Grotesk', system-ui, sans-serif";
    
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.animation = 'slide-out-right 0.5s ease-out forwards';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 500);
    }, 3000);
  }, []);

  // Track analytics
  const trackEvent = useCallback((label: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'easter_egg', {
        event_category: 'engagement',
        event_label: label,
      });
    }
  }, []);

  // 1. KONAMI CODE: ↑↑↓↓←→←→BA
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      const newSequence = [...konamiSequence, e.key].slice(-10);
      setKonamiSequence(newSequence);

      const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
      if (JSON.stringify(newSequence) === JSON.stringify(konami)) {
        if (canTrigger('konami')) {
          showNotification('KONAMI CODE ACTIVATED!', '🎮');
          trackEvent('konami_code');
          setActiveTrack(TRACKS[0]);
          setKonamiSequence([]);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [konamiSequence, canTrigger, showNotification, trackEvent]);

  // 2. LOGO CLICKS: Click logo 7 times in 3 seconds
  useEffect(() => {
    const handleLogoClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const logo = target.closest('a[href="/"]') || target.closest('[class*="logo"]');
      
      if (logo) {
        setLogoClicks(prev => prev + 1);
        
        if (logoClickTimeout.current) {
          clearTimeout(logoClickTimeout.current);
        }
        
        logoClickTimeout.current = setTimeout(() => {
          setLogoClicks(0);
        }, 3000);
      }
    };

    document.addEventListener('click', handleLogoClick);
    return () => {
      document.removeEventListener('click', handleLogoClick);
      if (logoClickTimeout.current) {
        clearTimeout(logoClickTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (logoClicks === 7) {
      if (canTrigger('logo-clicks')) {
        showNotification('Secret Logo Pattern Unlocked!', '🔓');
        trackEvent('logo_clicks');
        setActiveTrack(TRACKS[1]);
      }
      setLogoClicks(0);
    }
  }, [logoClicks, canTrigger, showNotification, trackEvent]);

  // EASTER EGG: Scroll depth tracker (currently disabled)
  /*
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      
      setScrollDepth(scrollPercent);
      
      if (scrollPercent >= 77.5 && scrollPercent <= 78) {
        if (canTrigger('scroll-depth')) {
          showNotification('Perfect Scroll Depth Achieved!', '📜');
          trackEvent('scroll_depth');
          setActiveTrack(TRACKS[2]);
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  */

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [canTrigger, showNotification, trackEvent]);

  // 4. TIME-BASED: Visit at 11:11 AM or PM
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      if ((hours === 11 || hours === 23) && minutes === 11) {
        if (canTrigger('time-based')) {
          showNotification('11:11 - Make a Wish!', '⏰');
          trackEvent('time_based');
          setActiveTrack(TRACKS[3]);
        }
      }
    };

    // Check immediately
    checkTime();
    
    // Check every minute
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, [canTrigger, showNotification, trackEvent]);

  // 5. MOUSE PATTERN: Draw a circle with mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = { x: e.clientX, y: e.clientY, time: Date.now() };
      
      setMousePattern(prev => {
        const updated = [...prev, newPoint].slice(-50); // Keep last 50 points
        
        // Check if pattern forms a circle
        if (updated.length >= 30) {
          const isCircle = checkCirclePattern(updated);
          if (isCircle && canTrigger('mouse-pattern')) {
            showNotification('Secret Mouse Pattern Detected!', '🖱️');
            trackEvent('mouse_pattern');
            setActiveTrack(TRACKS[4]);
            return [];
          }
        }
        
        return updated;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [canTrigger, showNotification, trackEvent]);

  // Helper function to detect circle pattern
  const checkCirclePattern = (points: { x: number; y: number; time: number }[]) => {
    if (points.length < 30) return false;
    
    // Calculate center point
    const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
    const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length;
    
    // Calculate average radius
    const radii = points.map(p => Math.sqrt(Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2)));
    const avgRadius = radii.reduce((sum, r) => sum + r, 0) / radii.length;
    
    // Check if all points are roughly equidistant from center (within 30% tolerance)
    const isCircular = radii.every(r => Math.abs(r - avgRadius) / avgRadius < 0.3);
    
    // Check if pattern was drawn in reasonable time (2-10 seconds)
    const timeDiff = points[points.length - 1].time - points[0].time;
    const isReasonableTime = timeDiff >= 2000 && timeDiff <= 10000;
    
    return isCircular && isReasonableTime && avgRadius > 50; // Minimum radius of 50px
  };

  // 6. HIDDEN TEXT: Type "hlpfl" anywhere
  useEffect(() => {
    let typedText = '';
    
    const handleKeyPress = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
      
      typedText = (typedText + e.key.toLowerCase()).slice(-5);
      
      if (typedText === 'hlpfl') {
        if (canTrigger('hidden-text')) {
          showNotification('HLPFL Secret Code Activated!', '🔐');
          trackEvent('hidden_text');
          // Play random hidden track (tracks 6-11)
          const hiddenTracks = TRACKS.slice(5); // Get tracks 6-11
          const randomTrack = hiddenTracks[Math.floor(Math.random() * hiddenTracks.length)];
          setActiveTrack(randomTrack);
        }
        typedText = '';
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [canTrigger, showNotification, trackEvent]);

  // 7. DOUBLE CLICK: Double-click on footer
  useEffect(() => {
    const handleDoubleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const footer = target.closest('footer');
      
      if (footer) {
        if (canTrigger('footer-double-click')) {
          showNotification('Footer Secret Discovered!', '👣');
          trackEvent('footer_double_click');
          // Play random hidden track (tracks 6-11)
          const hiddenTracks = TRACKS.slice(5); // Get tracks 6-11
          const randomTrack = hiddenTracks[Math.floor(Math.random() * hiddenTracks.length)];
          setActiveTrack(randomTrack);
        }
      }
    };

    document.addEventListener('dblclick', handleDoubleClick);
    return () => document.removeEventListener('dblclick', handleDoubleClick);
  }, [canTrigger, showNotification, trackEvent]);

  return (
    <>
      {activeTrack && (
        <SecretMusicPlayer
          track={activeTrack}
          onClose={() => setActiveTrack(null)}
        />
      )}
    </>
  );
};

export default CreativeEasterEggs;
