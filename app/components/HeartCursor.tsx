"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Single heart particle with id, position, symbol, color, and timestamp */
interface HeartParticle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: string;
  createdAt: number;
}

// Array of colorful heart symbols - randomly selected for each particle
const HEART_SYMBOLS = ["❤️", "💗", "💖", "💕", "💓", "💝", "💘", "♥", "💞", "🧡", "💛", "💚", "💙", "💜", "🤍", "🖤"];

// Valentine color palette - randomly selected for each heart
const HEART_COLORS = [
  "#ff6b9d", // Pink
  "#ff85a2", // Soft pink
  "#d4145a", // Red
  "#e91e63", // Rose
  "#ffb3c6", // Light pink
  "#ff1493", // Deep pink
  "#ff69b4", // Hot pink
  "#ff1744", // Bright red
  "#f50057", // Pink-red
  "#c2185b", // Dark pink
];

const MAX_HEARTS = 200; // Increased for longer trail
const THROTTLE_MS = 60; // Reduced for more frequent hearts
const PARTICLE_LIFETIME_MS = 1500; // Increased for longer-lasting hearts
const TRAIL_OFFSET = 25; // Distance behind cursor (in pixels)

// Helper to get a random element from an array
const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/**
 * Renders a trail of glowing pink/red hearts that follow the mouse.
 * Uses CSS transitions for fade/scale (no framer-motion).
 */
export default function HeartCursor() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const nextId = useRef(0);
  const lastEmit = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef<{ x: number; y: number } | null>(null);

  const addHeart = useCallback((clientX: number, clientY: number) => {
    const now = Date.now();
    if (now - lastEmit.current < THROTTLE_MS) return;
    lastEmit.current = now;

    // Calculate offset behind cursor based on movement direction
    let offsetX = 0;
    let offsetY = 0;

    if (lastMousePos.current) {
      // Calculate movement direction
      const dx = clientX - lastMousePos.current.x;
      const dy = clientY - lastMousePos.current.y;
      const distance = Math.hypot(dx, dy);

      if (distance > 0) {
        // Normalize direction and place heart behind cursor
        const normalizedX = dx / distance;
        const normalizedY = dy / distance;
        // Offset in opposite direction (behind cursor)
        offsetX = -normalizedX * TRAIL_OFFSET;
        offsetY = -normalizedY * TRAIL_OFFSET;
      } else {
        // No movement, place slightly behind (default: up-left)
        offsetX = -TRAIL_OFFSET * 0.7;
        offsetY = -TRAIL_OFFSET * 0.7;
      }
    } else {
      // First movement, default offset
      offsetX = -TRAIL_OFFSET * 0.7;
      offsetY = -TRAIL_OFFSET * 0.7;
    }

    // Update last mouse position
    lastMousePos.current = { x: clientX, y: clientY };

    setHearts((prev) => {
      const next = [
        ...prev,
        {
          id: nextId.current++,
          x: clientX + offsetX,
          y: clientY + offsetY,
          symbol: getRandomElement(HEART_SYMBOLS),
          color: getRandomElement(HEART_COLORS),
          createdAt: now,
        },
      ];
      return next.slice(-MAX_HEARTS);
    });
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      addHeart(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [addHeart]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setHearts((prev) =>
        prev.filter((h) => now - h.createdAt < PARTICLE_LIFETIME_MS)
      );
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(
      typeof window !== "undefined" &&
        "ontouchstart" in window &&
        !window.matchMedia("(hover: hover)").matches
    );
  }, []);

  if (isTouch) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart-particle absolute text-3xl select-none"
          style={{
            left: heart.x,
            top: heart.y,
            transform: "translate(-50%, -50%)",
            color: heart.color,
            filter: `drop-shadow(0 0 12px ${heart.color})`,
          }}
        >
          {heart.symbol}
        </span>
      ))}
    </div>
  );
}
