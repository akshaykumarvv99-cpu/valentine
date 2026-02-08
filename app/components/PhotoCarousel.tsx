"use client";

import { useCallback, useEffect, useState } from "react";

/** Replace these with your own image paths in /public (e.g. /photos/1.jpg) */
const DEFAULT_PHOTOS = [
  { src: "https://picsum.photos/1200/700?random=1", alt: "Memory 1" },
  { src: "https://picsum.photos/1200/700?random=2", alt: "Memory 2" },
  { src: "https://picsum.photos/1200/700?random=3", alt: "Memory 3" },
  { src: "https://picsum.photos/1200/700?random=4", alt: "Memory 4" },
  { src: "https://picsum.photos/1200/700?random=5", alt: "Memory 5" },
];

const AUTOPLAY_MS = 4500;

export default function PhotoCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const photos = DEFAULT_PHOTOS;
  const len = photos.length;

  const goTo = useCallback(
    (next: number) => {
      setDirection(next >= index ? "next" : "prev");
      setIndex((prev) => (next + len) % len);
    },
    [index, len]
  );

  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  useEffect(() => {
    if (isPaused || len <= 1) return;
    const t = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [index, isPaused, len, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <section id="some-photos" className="py-10 md:py-16">
      {/* Section header — fancy title */}
      <div className="mb-8 text-center md:mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-[#d4145a]">
          Our Gallery
        </p>
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-[#4a1942] md:text-4xl lg:text-5xl">
          Some Photos
        </h2>
        <p className="mx-auto max-w-xl text-base text-[#8b5a6b] md:text-lg">
          A few moments we&apos;ve captured together 💕
        </p>
      </div>

      {/* Carousel container */}
      <div
        className="group relative mx-auto max-w-5xl px-2 sm:px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Main image area — rounded, shadow, overflow */}
        <div className="relative overflow-hidden rounded-3xl bg-white/50 shadow-2xl ring-1 ring-[#ffb3c6]/30 backdrop-blur-sm">
          <div className="relative aspect-[16/10] w-full min-h-[280px] sm:min-h-[340px] md:aspect-[16/9]">
            {photos.map((photo, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-all duration-500 ease-out"
                style={{
                  opacity: i === index ? 1 : 0,
                  transform:
                    i === index
                      ? "scale(1)"
                      : direction === "next"
                        ? "scale(1.08)"
                        : "scale(0.96)",
                  zIndex: i === index ? 1 : 0,
                }}
                aria-hidden={i !== index}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 1024px"
                  fetchPriority={i === 0 ? "high" : "low"}
                />
                {/* Subtle gradient overlay at bottom */}
                <div
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent"
                  aria-hidden
                />
              </div>
            ))}
          </div>

          {/* Prev button */}
          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#4a1942] shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#d4145a] focus:ring-offset-2 md:left-4 md:h-14 md:w-14"
            aria-label="Previous photo"
          >
            <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#4a1942] shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#d4145a] focus:ring-offset-2 md:right-4 md:h-14 md:w-14"
            aria-label="Next photo"
          >
            <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className="h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                style={{
                  width: i === index ? 24 : 8,
                  backgroundColor: i === index ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)",
                }}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Caption / counter */}
        <p className="mt-4 text-center text-sm font-medium text-[#8b5a6b]">
          {index + 1} / {len}
        </p>
      </div>
    </section>
  );
}
