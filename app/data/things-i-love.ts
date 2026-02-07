/**
 * Things I love about you — mixed content for Pinterest-style page.
 * Each item can be: text, image, video, or audio.
 */

export type ThingType = "text" | "image" | "video" | "audio";

export interface ThingILove {
  id: string;
  type: ThingType;
  title: string;
  /** For text: body content. For image/video/audio: optional caption. */
  caption?: string;
  /** For image: image URL. For video/audio: media URL. */
  url?: string;
  /** Optional emoji or small label on the card */
  emoji?: string;
}

export const THINGS_I_LOVE: ThingILove[] = [
  {
    id: "1",
    type: "text",
    title: "Your smile",
    caption:
      "The way you light up when you're happy. It's the first thing I notice and the last thing I think about at night.",
    emoji: "😊",
  },
  {
    id: "2",
    type: "text",
    title: "How you listen",
    caption:
      "You actually hear me. Not just the words—you get what I mean. That's rare and I never take it for granted.",
    emoji: "💕",
  },
  {
    id: "3",
    type: "image",
    title: "Our place",
    caption: "Anywhere with you feels like home.",
    url: "https://images.unsplash.com/photo-1529333244-e3dd518f738e?w=600&q=80",
    emoji: "🏠",
  },
  {
    id: "4",
    type: "text",
    title: "Your laugh",
    caption:
      "I could listen to you laugh all day. Seriously. I'll do dumb things just to hear it.",
    emoji: "😂",
  },
  {
    id: "5",
    type: "image",
    title: "Quiet moments",
    caption: "Coffee, rain, and you. Perfect.",
    url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    emoji: "☕",
  },
  {
    id: "6",
    type: "text",
    title: "Your honesty",
    caption:
      "You tell me the truth even when it's hard. I trust you completely because of that.",
    emoji: "🤍",
  },
  {
    id: "7",
    type: "text",
    title: "The way you care",
    caption:
      "Small things—remembering what I like, checking in, being there. It all adds up to feeling so loved.",
    emoji: "🧸",
  },
  {
    id: "8",
    type: "image",
    title: "Adventures with you",
    caption: "Every trip feels like the best one yet.",
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80",
    emoji: "🗺️",
  },
  {
    id: "9",
    type: "text",
    title: "Your voice",
    caption:
      "On the phone, in the morning, when you're excited about something. I could listen forever.",
    emoji: "🐱",
  },
  {
    id: "10",
    type: "text",
    title: "Us",
    caption:
      "Not just you, not just me—the way we are together. My favorite thing is us.",
    emoji: "💖",
  },
  {
    id: "11",
    type: "video",
    title: "Our song",
    caption: "This one always reminds me of you. Put your own video here — e.g. /videos/our-song.mp4",
    url: undefined, // Add e.g. url: "/videos/our-song.mp4" when you have a file in public/videos/
    emoji: "🎵",
  },
  {
    id: "12",
    type: "audio",
    title: "Voice note",
    caption: "A clip that makes me smile. Add your file in public/audio/ and set url to e.g. /audio/voice.mp3",
    url: undefined, // Add e.g. url: "/audio/voice.mp3" when you have a file in public/audio/
    emoji: "🎧",
  },
];
