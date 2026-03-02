"use client";
import { Compass, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="flex items-center justify-between py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <Link href="/" className="flex items-center gap-2">
        <div className="bg-blue-600 rounded-lg p-1.5 md:p-2 text-white">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17.5 19c-1.5-3-4.5-5-8.5-5s-7 2-8.5 5" />
            <path d="M22 19c-1.5-3-4.5-5-8.5-5" />
            <circle cx="9" cy="9" r="4" />
          </svg>
        </div>
        <div>
          <h1 className="font-bold text-lg md:text-xl leading-tight text-slate-900 dark:text-white">Simplifier</h1>
          <p className="text-[9px] md:text-[10px] uppercase tracking-wider text-slate-500 font-medium">Intelligence</p>
        </div>
      </Link>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="flex items-center gap-1.5 md:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-colors">
          <Compass size={16} className="w-4 h-4 md:w-4 md:h-4" />
          <span className="hidden sm:inline">Explore</span>
        </button>
        <button
           aria-label="Toggle theme"
           onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
           className="p-2.5 text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 rounded-full transition-colors"
        >
          {mounted && theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}
