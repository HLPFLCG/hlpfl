/**
 * Image Optimization Utilities
 * Provides helpers for responsive images, lazy loading, and WebP conversion
 */

export interface ResponsiveImageConfig {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(src: string, widths: number[] = [320, 640, 768, 1024, 1920, 2560]): string {
  return widths
    .map((width) => {
      const extension = src.split('.').pop();
      const basePath = src.replace(`.${extension}`, '');
      return `${basePath}-${width}w.webp ${width}w`;
    })
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizes(breakpoints?: { [key: string]: string }): string {
  const defaultBreakpoints = {
    '(min-width: 1920px)': '2560px',
    '(min-width: 1024px)': '1920px',
    '(min-width: 768px)': '1024px',
    '(min-width: 640px)': '768px',
    '(min-width: 320px)': '640px',
  };

  const sizes = breakpoints || defaultBreakpoints;
  return Object.entries(sizes)
    .map(([query, size]) => `${query} ${size}`)
    .join(', ');
}

/**
 * Get optimized image props for Next.js Image component
 */
export function getOptimizedImageProps(config: ResponsiveImageConfig) {
  const {
    src,
    alt,
    sizes = '(min-width: 1024px) 50vw, 100vw',
    priority = false,
    quality = 85,
  } = config;

  return {
    src,
    alt,
    sizes,
    quality,
    priority,
    loading: priority ? ('eager' as const) : ('lazy' as const),
    placeholder: 'blur' as const,
    blurDataURL: generateBlurDataURL(),
  };
}

/**
 * Generate blur placeholder data URL
 */
export function generateBlurDataURL(width = 10, height = 10): string {
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) {
    // Return a simple gray blur placeholder for SSR
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZTVlNWU1Ii8+PC9zdmc+';
  }

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Create gradient blur effect
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#e5e5e5');
  gradient.addColorStop(1, '#d4d4d4');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL();
}

/**
 * Check if WebP is supported
 */
export function isWebPSupported(): boolean {
  if (typeof window === 'undefined') return false;

  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
}

/**
 * Get image format based on browser support
 */
export function getImageFormat(originalFormat: string): string {
  if (isWebPSupported()) {
    return 'webp';
  }
  return originalFormat;
}

/**
 * Lazy load image with Intersection Observer
 */
export function lazyLoadImage(img: HTMLImageElement, src: string) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    observer.observe(img);
  } else {
    // Fallback for browsers without Intersection Observer
    img.src = src;
  }
}

/**
 * Preload critical images
 */
export function preloadImage(src: string, as: 'image' | 'fetch' = 'image') {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = src;
  if (as === 'image') {
    link.type = 'image/webp';
  }
  document.head.appendChild(link);
}

/**
 * Calculate aspect ratio
 */
export function calculateAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
}

/**
 * Get responsive image dimensions
 */
export function getResponsiveDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number
): { width: number; height: number } {
  if (originalWidth <= maxWidth) {
    return { width: originalWidth, height: originalHeight };
  }

  const ratio = originalHeight / originalWidth;
  return {
    width: maxWidth,
    height: Math.round(maxWidth * ratio),
  };
}