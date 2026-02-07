"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Navbar with romantic image background and pink/red overlay.
 * Responsive: collapses to hamburger menu on mobile.
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative w-full overflow-hidden">
      {/* Background image with romantic overlay */}
      <div
        className="relative h-64 bg-cover bg-center bg-no-repeat md:h-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1200' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffb3c6;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%23ff85a2;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23d4145a;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='400' fill='url(%23grad)'/%3E%3Cpath d='M200,200 Q300,100 400,200 T600,200' stroke='%23fff' stroke-width='2' fill='none' opacity='0.3'/%3E%3Cpath d='M800,200 Q900,100 1000,200 T1200,200' stroke='%23fff' stroke-width='2' fill='none' opacity='0.3'/%3E%3C/svg%3E")`,
        }}
      >
        {/* Pink/red overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff85a2]/80 via-[#d4145a]/70 to-[#e91e63]/80" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-between px-4 py-6 md:px-8">
          {/* Logo/Brand — with teddy & cat */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-white drop-shadow-lg transition-transform hover:scale-105 md:text-3xl"
          >
            <span aria-hidden>🧸</span>
            <span>Valentine&apos;s</span>
            <span aria-hidden>🐱</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/dashboard"
              className="text-white/90 transition-colors hover:text-white hover:underline"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard#memories"
              className="text-white/90 transition-colors hover:text-white hover:underline"
            >
              Memories
            </Link>
            <Link
              href="/dashboard/things-i-love"
              className="text-white/90 transition-colors hover:text-white hover:underline"
            >
              Things I Love
            </Link>
            <Link
              href="/"
              className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30"
            >
              Back Home
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col gap-1.5 rounded-md p-2 text-white transition-colors hover:bg-white/20 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 w-6 bg-white transition-all ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-all ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-all ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute left-0 right-0 top-full z-20 bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out md:hidden ${
            isMenuOpen
              ? "max-h-80 opacity-100"
              : "max-h-0 overflow-hidden opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2 px-4 py-4">
            <Link
              href="/dashboard"
              className="rounded-md px-4 py-2 text-[#4a1942] transition-colors hover:bg-[#ffb3c6]"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard#memories"
              className="rounded-md px-4 py-2 text-[#4a1942] transition-colors hover:bg-[#ffb3c6]"
              onClick={() => setIsMenuOpen(false)}
            >
              Memories
            </Link>
            <Link
              href="/dashboard/things-i-love"
              className="rounded-md px-4 py-2 text-[#4a1942] transition-colors hover:bg-[#ffb3c6]"
              onClick={() => setIsMenuOpen(false)}
            >
              Things I Love
            </Link>
            <Link
              href="/"
              className="rounded-md bg-[#d4145a] px-4 py-2 text-center font-semibold text-white transition-colors hover:bg-[#b81050]"
              onClick={() => setIsMenuOpen(false)}
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
