import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'music.song' | 'music.album';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export const generateSEO = ({
  title,
  description,
  keywords = [],
  image = '/images/og-image.jpg',
  url = 'https://hlpfl.org',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'HLPFL',
}: SEOProps): Metadata => {
  const fullTitle = `${title} | HLPFL Records`;
  const fullUrl = url.startsWith('http') ? url : `https://hlpfl.org${url}`;
  const fullImage = image.startsWith('http') ? image : `https://hlpfl.org${image}`;

  return {
    title: fullTitle,
    description,
    keywords: [...keywords, 'HLPFL', 'record label', 'music production'],
    authors: [{ name: author }],
    creator: author,
    publisher: 'HLPFL Records',
    
    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: 'HLPFL Records',
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImage],
      creator: '@HLPFL',
      site: '@HLPFL',
    },

    // Additional meta tags
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Verification
    verification: {
      google: 'your-google-verification-code',
    },
  };
};

// Schema.org structured data
export const generateMusicGroupSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: 'HLPFL Records',
    url: 'https://hlpfl.org',
    logo: 'https://hlpfl.org/images/logo.png',
    description: 'Premier record label dedicated to discovering and promoting exceptional musical talent',
    foundingDate: '2024',
    genre: ['Hip Hop', 'R&B', 'Pop'],
    sameAs: [
      'https://instagram.com/hlpfl',
      'https://twitter.com/hlpfl',
      'https://facebook.com/hlpfl',
    ],
  };
};

export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HLPFL Records',
    url: 'https://hlpfl.org',
    logo: 'https://hlpfl.org/images/logo.png',
    description: 'World-class record label for artist development and music production',
    email: 'contact@hlpfl.org',
    telephone: '+1-616-313-5215',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Grand Rapids',
      addressRegion: 'MI',
      addressCountry: 'US',
    },
    sameAs: [
      'https://instagram.com/hlpfl',
      'https://twitter.com/hlpfl',
      'https://facebook.com/hlpfl',
    ],
  };
};

export const generateMusicRecordingSchema = (track: {
  name: string;
  artist: string;
  duration?: string;
  url: string;
  image?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicRecording',
    name: track.name,
    byArtist: {
      '@type': 'MusicGroup',
      name: track.artist,
    },
    duration: track.duration,
    url: track.url,
    ...(track.image && { image: track.image }),
    recordLabel: {
      '@type': 'Organization',
      name: 'HLPFL Records',
    },
  };
};

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://hlpfl.org${item.url}`,
    })),
  };
};