import Navbar from "../components/Navbar";
import MemoriesSection from "../components/MemoriesSection";

/**
 * Dashboard page: Appears after completing all Valentine questions.
 * Cute layout with teddy & cat decorations and a Memories section.
 */
export default function DashboardPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fff5f8]">
      {/* Subtle dotted background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #d4145a 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />

      {/* Floating cute decorations — teddies and cats */}
      <div className="pointer-events-none fixed left-4 top-36 z-0 text-4xl opacity-70 md:left-8 md:text-5xl" aria-hidden>
        <span className="cute-float inline-block" style={{ animationDelay: "0s" }}>🧸</span>
      </div>
      <div className="pointer-events-none fixed right-6 top-44 z-0 text-3xl opacity-70 md:right-12 md:text-4xl" aria-hidden>
        <span className="cute-float inline-block" style={{ animationDelay: "0.3s" }}>🐱</span>
      </div>
      <div className="pointer-events-none fixed bottom-32 left-8 z-0 text-3xl opacity-60 md:left-16 md:text-4xl" aria-hidden>
        <span className="cute-float inline-block" style={{ animationDelay: "0.6s" }}>🧸</span>
      </div>
      <div className="pointer-events-none fixed bottom-48 right-10 z-0 text-3xl opacity-60 md:right-20 md:text-4xl" aria-hidden>
        <span className="cute-float inline-block" style={{ animationDelay: "0.2s" }}>🐱</span>
      </div>
      <div className="pointer-events-none fixed right-1/4 top-1/2 z-0 hidden text-2xl opacity-50 lg:block" aria-hidden>
        <span className="cute-float inline-block" style={{ animationDelay: "0.5s" }}>🧸</span>
      </div>
      <div className="pointer-events-none fixed left-1/4 top-1/3 z-0 hidden text-2xl opacity-50 lg:block" aria-hidden>
        <span className="cute-float inline-block" style={{ animationDelay: "0.4s" }}>🐱</span>
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Cute welcome strip */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-white/60 px-4 py-3 shadow-sm backdrop-blur-sm md:mb-8">
          <span className="text-2xl" aria-hidden>🧸</span>
          <p className="text-center text-sm font-medium text-[#6b4a5a] md:text-base">
            Welcome to our little corner of love — pick a memory to revisit
          </p>
          <span className="text-2xl" aria-hidden>🐱</span>
        </div>

        <MemoriesSection />
      </main>
    </div>
  );
}
