import HeartCursor from "./components/HeartCursor";
import ValentineLanding from "./components/ValentineLanding";

/**
 * Valentine's Day landing: single-page experience with questions,
 * Yes/No buttons, heart cursor trail, and playful animations.
 */
export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#fff5f8]">
      <HeartCursor />
      <ValentineLanding />
    </main>
  );
}
