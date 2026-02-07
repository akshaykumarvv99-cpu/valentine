import Navbar from "@/app/components/Navbar";
import { THINGS_I_LOVE, type ThingILove } from "@/app/data/things-i-love";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Things I love about you 💕",
  description: "A little collection of what makes you so special.",
};

/**
 * Pinterest-style masonry page: mixed cards (text, image, video, audio).
 */
export default function ThingsILovePage() {
  return (
    <div className="min-h-screen bg-[#fff5f8]">
      {/* Subtle dotted background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #d4145a 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="mb-8 text-center md:mb-12">
          <h1 className="mb-3 text-3xl font-bold text-[#4a1942] md:text-4xl lg:text-5xl">
            Things I love about you
          </h1>
          <p className="mx-auto max-w-xl text-lg text-[#8b5a6b]">
            A little board of what makes you you — words, pics, songs, whatever fits 🧸🐱
          </p>
        </header>

        {/* Pinterest-style masonry: CSS columns */}
        <div className="things-masonry">
          {THINGS_I_LOVE.map((item) => (
            <PinCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}

function PinCard({ item }: { item: ThingILove }) {
  return (
    <article className="pin-card relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Card content by type */}
      {item.type === "text" && <TextPin item={item} />}
      {item.type === "image" && <ImagePin item={item} />}
      {item.type === "video" && <VideoPin item={item} />}
      {item.type === "audio" && <AudioPin item={item} />}
    </article>
  );
}

function TextPin({ item }: { item: ThingILove }) {
  return (
    <div className="p-5">
      <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-gradient-to-br from-[#ffb3c6] to-[#ff85a2] opacity-20" />
      {item.emoji && (
        <span className="mb-2 block text-2xl" aria-hidden>
          {item.emoji}
        </span>
      )}
      <h2 className="mb-2 text-lg font-bold text-[#4a1942]">{item.title}</h2>
      {item.caption && (
        <p className="text-[#6b4a5a] leading-relaxed">{item.caption}</p>
      )}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#ffb3c6] via-[#ff85a2] to-[#d4145a]" />
    </div>
  );
}

function ImagePin({ item }: { item: ThingILove }) {
  return (
    <>
      {item.url && (
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={item.url}
            alt=""
            className="h-full w-full object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-4">
        {item.emoji && (
          <span className="mr-2 text-xl" aria-hidden>
            {item.emoji}
          </span>
        )}
        <h2 className="inline text-lg font-bold text-[#4a1942]">{item.title}</h2>
        {item.caption && (
          <p className="mt-2 text-sm text-[#6b4a5a]">{item.caption}</p>
        )}
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-[#ffb3c6] via-[#ff85a2] to-[#d4145a]" />
    </>
  );
}

function VideoPin({ item }: { item: ThingILove }) {
  return (
    <>
      {item.url && (
        <div className="relative w-full overflow-hidden">
          <video
            src={item.url}
            controls
            className="h-auto w-full"
            playsInline
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <div className="p-4">
        {item.emoji && (
          <span className="mr-2 text-xl" aria-hidden>
            {item.emoji}
          </span>
        )}
        <h2 className="inline text-lg font-bold text-[#4a1942]">{item.title}</h2>
        {item.caption && (
          <p className="mt-2 text-sm text-[#6b4a5a]">{item.caption}</p>
        )}
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-[#ffb3c6] via-[#ff85a2] to-[#d4145a]" />
    </>
  );
}

function AudioPin({ item }: { item: ThingILove }) {
  return (
    <>
      <div className="p-5">
        {item.emoji && (
          <span className="mb-2 block text-2xl" aria-hidden>
            {item.emoji}
          </span>
        )}
        <h2 className="mb-3 text-lg font-bold text-[#4a1942]">{item.title}</h2>
        {item.url && (
          <audio src={item.url} controls className="w-full" preload="metadata">
            Your browser does not support the audio tag.
          </audio>
        )}
        {item.caption && (
          <p className="mt-3 text-sm text-[#6b4a5a]">{item.caption}</p>
        )}
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-[#ffb3c6] via-[#ff85a2] to-[#d4145a]" />
    </>
  );
}
