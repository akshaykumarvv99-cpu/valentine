"use client";

/**
 * Memories section: A romantic scrapbook-style memory wall.
 * Fetches posts from the API and links each card to its blog page.
 */

import { useEffect, useState } from "react";
import Link from "next/link";

export interface Memory {
  id: number;
  slug: string;
  title: string;
  date: string;
  content: string;
  emoji: string;
  image?: string;
  video?: string;
  audio?: string;
  excerpt?: string;
}

const API_BLOG = "/api/blog";

export default function MemoriesSection() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_BLOG)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load memories");
        return res.json();
      })
      .then((data: Memory[]) => setMemories(data))
      .catch((e) => setError(e instanceof Error ? e.message : "Something went wrong"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="memories" className="py-8 md:py-12">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="mb-3 text-3xl font-bold text-[#4a1942] md:text-4xl lg:text-5xl">
            💖 Our Memories 💖
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#8b5a6b] md:text-xl">
            Loading our beautiful moments... 🧸🐱
          </p>
        </div>
        <div className="flex justify-center py-16">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#ffb3c6] border-t-[#d4145a]" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="memories" className="py-8 md:py-12">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="mb-3 text-3xl font-bold text-[#4a1942] md:text-4xl lg:text-5xl">
            💖 Our Memories 💖
          </h2>
        </div>
        <div className="py-16 text-center">
          <p className="text-xl text-[#8b5a6b]">Couldn&apos;t load memories. Please try again. 🐱</p>
        </div>
      </section>
    );
  }

  return (
    <section id="memories" className="py-8 md:py-12">
      {/* Section Header */}
      <div className="mb-8 text-center md:mb-12">
        <h2 className="mb-3 text-3xl font-bold text-[#4a1942] md:text-4xl lg:text-5xl">
          💖 Our Memories 💖
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-[#8b5a6b] md:text-xl">
          A collection of beautiful moments we&apos;ve shared together — click a card to read more 🧸
        </p>
      </div>

      {/* Memory Cards Grid — each links to its blog page */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {memories.map((memory, index) => (
          <MemoryCard key={memory.id} memory={memory} index={index} />
        ))}
      </div>

      {memories.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-xl text-[#8b5a6b]">No memories yet. Start creating some! 💕</p>
        </div>
      )}
    </section>
  );
}

function MemoryCard({ memory, index }: { memory: Memory; index: number }) {
  return (
    <Link href={`/dashboard/blog/${memory.id}`} className="block transition-transform hover:scale-[1.02]">
      <article
        className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
        style={{
          animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
        }}
      >
        <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-gradient-to-br from-[#ffb3c6] to-[#ff85a2] opacity-20" />
        <div className="mb-4 inline-block rounded-full bg-gradient-to-br from-[#ff85a2] to-[#d4145a] p-3 text-2xl shadow-md">
          {memory.emoji}
        </div>
        <time className="mb-2 block text-sm font-medium text-[#8b5a6b]">{memory.date}</time>
        <h3 className="mb-3 text-xl font-bold text-[#4a1942] transition-colors group-hover:text-[#d4145a]">
          {memory.title}
        </h3>
        <p className="leading-relaxed text-[#6b4a5a]">
          {memory.excerpt ?? memory.content}
        </p>
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#ffb3c6] via-[#ff85a2] to-[#d4145a]" />
        <span className="mt-3 inline-block text-sm font-medium text-[#d4145a] group-hover:underline">
          Read more →
        </span>
      </article>
    </Link>
  );
}
