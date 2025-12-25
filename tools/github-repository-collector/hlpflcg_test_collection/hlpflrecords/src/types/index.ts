export interface Artist {
  id: string
  name: string
  slug: string
  bio: string
  genre: string[]
  image: string
  socials?: {
    spotify?: string
    instagram?: string
    twitter?: string
    youtube?: string
    website?: string
  }
}

export interface Release {
  id: string
  title: string
  artist: string
  artistId: string
  type: 'single' | 'album' | 'ep'
  releaseDate: Date
  coverArt: string
  description?: string
  tracks?: Track[]
  links?: {
    spotify?: string
    apple?: string
    youtube?: string
    soundcloud?: string
  }
}

export interface Track {
  id: string
  title: string
  duration: string
  preview?: string
}

export interface NewsPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: Date
  author: string
  image?: string
  category: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  socials?: {
    linkedin?: string
    twitter?: string
    email?: string
    instagram?: string
    spotify?: string
    website?: string
  }
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
  type: 'general' | 'artist-submission' | 'business'
}