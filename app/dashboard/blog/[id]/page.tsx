import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { getPostById } from "@/app/data/blog-posts";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getPostById(parseInt(id, 10));
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} 💕`,
    description: post.excerpt ?? post.content.slice(0, 160),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const numId = parseInt(id, 10);
  if (Number.isNaN(numId)) notFound();
  const post = getPostById(numId);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#fff5f8]">
      <Navbar />
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Cute decorations */}
        <div className="pointer-events-none absolute right-4 top-32 text-4xl opacity-60 md:right-8 md:text-5xl" aria-hidden>
          🧸
        </div>
        <div className="pointer-events-none absolute left-4 top-40 text-3xl opacity-60 md:left-8 md:text-4xl" aria-hidden>
          🐱
        </div>

        <article className="relative mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            href="/dashboard#memories"
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-[#4a1942] shadow-md transition-all hover:bg-white hover:shadow-lg"
          >
            ← Back to memories
          </Link>

          <header className="mb-8">
            <div className="mb-4 inline-block rounded-full bg-gradient-to-br from-[#ff85a2] to-[#d4145a] p-3 text-3xl shadow-lg">
              {post.emoji}
            </div>
            <time className="block text-sm font-medium text-[#8b5a6b]">{post.date}</time>
            <h1 className="mt-2 text-3xl font-bold text-[#4a1942] md:text-4xl lg:text-5xl">{post.title}</h1>
          </header>

          {/* Photo */}
          {post.image && (
            <figure className="mb-8 overflow-hidden rounded-2xl shadow-xl">
              <img
                src={post.image}
                alt=""
                className="h-auto w-full object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </figure>
          )}

          {/* Video */}
          {post.video && (
            <figure className="mb-8 overflow-hidden rounded-2xl shadow-xl">
              <video
                src={post.video}
                controls
                className="h-auto w-full"
                playsInline
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </figure>
          )}

          {/* Audio */}
          {post.audio && (
            <figure className="mb-8 rounded-2xl bg-white/80 p-4 shadow-lg">
              <audio src={post.audio} controls className="w-full" preload="metadata">
                Your browser does not support the audio tag.
              </audio>
            </figure>
          )}

          <div className="prose prose-lg max-w-none text-[#6b4a5a]">
            <p className="leading-relaxed whitespace-pre-line">{post.content}</p>
          </div>

          <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#ffb3c6]/50 pt-8">
            <Link
              href="/dashboard#memories"
              className="rounded-full bg-gradient-to-r from-[#ff85a2] to-[#d4145a] px-6 py-2.5 font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
            >
              💕 More memories
            </Link>
            <span className="text-2xl" aria-hidden>🧸🐱</span>
          </footer>
        </article>
      </main>
    </div>
  );
}
