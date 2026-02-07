"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { VALENTINE_QUESTIONS } from "../valentine-questions";

const INITIAL_NO_SCALE = 1;
const NO_SCALE_FACTOR = 0.88;
const MIN_NO_SCALE = 0.4;
const DODGE_DISTANCE = 50;
const DODGE_RANGE = 120;
const MAX_OFFSET = 140;
const YES_GROW_SCALE = 1.25;

type Offset = { x: number; y: number };

/**
 * Main Valentine experience: questions one-by-one, Yes grows and advances,
 * No shrinks and dodges. Uses CSS transitions only (no framer-motion).
 */
export default function ValentineLanding() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(INITIAL_NO_SCALE);
  const [noOffset, setNoOffset] = useState<Offset>({ x: 0, y: 0 });
  const [questionKey, setQuestionKey] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const noWrapperRef = useRef<HTMLDivElement>(null);
  const noOffsetRef = useRef<Offset>(noOffset);
  const baseCenterRef = useRef<Offset | null>(null);

  noOffsetRef.current = noOffset;

  useEffect(() => {
    const el = noWrapperRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      baseCenterRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    };
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, [currentIndex]);

  useEffect(() => {
    let raf = 0;
    const handleMove = (e: MouseEvent) => {
      raf = requestAnimationFrame(() => {
        const base = baseCenterRef.current;
        const off = noOffsetRef.current;
        if (!base) return;
        const centerX = base.x + off.x;
        const centerY = base.y + off.y;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.hypot(dx, dy);
        if (dist < DODGE_RANGE && dist > 2) {
          const n = DODGE_DISTANCE / dist;
          setNoOffset((prev) => {
            const next = {
              x: prev.x - dx * n,
              y: prev.y - dy * n,
            };
            const mag = Math.hypot(next.x, next.y);
            if (mag > MAX_OFFSET) {
              const s = MAX_OFFSET / mag;
              next.x *= s;
              next.y *= s;
            }
            return next;
          });
        }
      });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleYes = useCallback(() => {
    setYesScale(YES_GROW_SCALE);
    setIsExiting(true);
    setTimeout(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex >= VALENTINE_QUESTIONS.length) {
        // All questions completed - navigate to dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      } else {
        setCurrentIndex(nextIndex);
        setQuestionKey((k) => k + 1);
        setYesScale(1);
        setIsExiting(false);
      }
    }, 320);
  }, [currentIndex, router]);

  const handleNo = useCallback(() => {
    setNoScale((s) => Math.max(MIN_NO_SCALE, s * NO_SCALE_FACTOR));
    const angle = Math.random() * Math.PI * 2;
    const jump = 60 + Math.random() * 40;
    setNoOffset((prev) => {
      let next = {
        x: prev.x + Math.cos(angle) * jump,
        y: prev.y + Math.sin(angle) * jump,
      };
      const mag = Math.hypot(next.x, next.y);
      if (mag > MAX_OFFSET) {
        const s = MAX_OFFSET / mag;
        next = { x: next.x * s, y: next.y * s };
      }
      return next;
    });
  }, []);

  useEffect(() => {
    setNoScale(INITIAL_NO_SCALE);
    setNoOffset({ x: 0, y: 0 });
  }, [currentIndex]);

  const question = VALENTINE_QUESTIONS[currentIndex];
  const isLast = currentIndex === VALENTINE_QUESTIONS.length - 1;

  return (
    <div className="valentine-page flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="relative flex flex-col items-center gap-10 text-center">
        <div
          key={questionKey}
          className={`flex flex-col items-center gap-10 transition-all duration-300 ease-out ${
            isExiting
              ? "opacity-0 -translate-y-3 scale-[0.98]"
              : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          <h1 className="max-w-md text-2xl font-semibold leading-tight text-[#4a1942] drop-shadow-sm sm:text-3xl md:text-4xl">
            {question}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={handleYes}
              className="rounded-full bg-[#d4145a] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-[transform,background-color] duration-200 ease-out hover:bg-[#b81050] focus:outline-none focus:ring-2 focus:ring-[#ff85a2] focus:ring-offset-2 active:scale-[0.98]"
              style={{
                transform: `scale(${yesScale})`,
              }}
            >
              Yes
            </button>

            <div ref={noWrapperRef} className="inline-block">
              <button
                type="button"
                onClick={handleNo}
                className="rounded-full bg-[#ff85a2] px-8 py-4 text-lg font-semibold text-white shadow-md transition-[transform,background-color] duration-200 ease-out hover:bg-[#ff6b9d] focus:outline-none focus:ring-2 focus:ring-[#ffb3c6] focus:ring-offset-2 active:scale-[0.97]"
                style={{
                  transform: `translate(${noOffset.x}px, ${noOffset.y}px) scale(${noScale})`,
                  transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>

        {isLast && (
          <p
            className="mt-4 text-sm text-[#8b5a6b]"
            style={{ animation: "fadeIn 0.5s ease-out 0.3s both" }}
          >
            You said yes to everything. That&apos;s love. ♥
          </p>
        )}
      </div>
    </div>
  );
}
