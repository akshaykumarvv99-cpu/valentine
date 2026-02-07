/**
 * Blog / memory posts data.
 * Single source of truth for dashboard memories and blog pages.
 * Supports optional image, video, and audio media.
 */

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  content: string;
  emoji: string;
  /** Optional image URL (e.g. /photos/xyz.jpg or external) */
  image?: string;
  /** Optional video URL (e.g. /videos/xyz.mp4 or external) */
  video?: string;
  /** Optional audio URL (e.g. /audio/xyz.mp3 or external) */
  audio?: string;
  /** Short excerpt for cards */
  excerpt?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "our-first-meeting",
    title: "Our First Meeting",
    date: "February 14, 2023",
    content:
      "The day we first met. I knew from that moment that something special was beginning. Your smile lit up the entire room. Every little detail is still so clear in my mind.",
    excerpt: "The day we first met. I knew from that moment that something special was beginning.",
    emoji: "💕",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
  },
  {
    id: 2,
    slug: "coffee-date",
    title: "Coffee Date",
    date: "March 5, 2023",
    content:
      "Our first coffee together. We talked for hours and I didn't want it to end. Time flies when I'm with you. That corner table will always be our spot.",
    excerpt: "Our first coffee together. We talked for hours and I didn't want it to end.",
    emoji: "☕",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
  },
  {
    id: 3,
    slug: "sunset-walk",
    title: "Sunset Walk",
    date: "April 20, 2023",
    content:
      "Walking hand in hand as the sun set. The colors in the sky couldn't compare to the warmth in my heart. We didn't need to say much—being together was enough.",
    excerpt: "Walking hand in hand as the sun set. The colors couldn't compare to the warmth in my heart.",
    emoji: "🌅",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  },
  {
    id: 4,
    slug: "movie-night",
    title: "Movie Night",
    date: "May 15, 2023",
    content:
      "Cuddled up watching our favorite movie. These simple moments are the ones I treasure most. Popcorn, blankets, and you—perfect.",
    excerpt: "Cuddled up watching our favorite movie. These simple moments are the ones I treasure most.",
    emoji: "🎬",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    // Example: add your own video/audio files to /public and use e.g. /videos/movie-night.mp4
    // video: "/videos/movie-night.mp4",
    // audio: "/audio/our-song.mp3",
  },
  {
    id: 5,
    slug: "adventure-together",
    title: "Adventure Together",
    date: "June 10, 2023",
    content:
      "Exploring new places together. Every adventure is better when you're by my side. Here's to many more trips and memories.",
    excerpt: "Exploring new places together. Every adventure is better when you're by my side.",
    emoji: "🗺️",
    image: "https://images.unsplash.com/photo-1529333244-e3dd518f738e?w=800&q=80",
  },
  {
    id: 6,
    slug: "lazy-sunday",
    title: "Lazy Sunday",
    date: "July 22, 2023",
    content:
      "Spent the whole day together doing nothing and everything. Perfect days don't need plans, just you. More days like this, please.",
    excerpt: "Spent the whole day together doing nothing and everything. Perfect days don't need plans.",
    emoji: "☀️",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
  },
];

export function getPostById(id: number): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.id === id);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
