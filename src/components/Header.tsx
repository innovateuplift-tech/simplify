import { Compass, Sun } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-6 px-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 rounded-lg p-2 text-white">
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
          <h1 className="font-bold text-xl leading-tight">Simplifier</h1>
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Intelligence</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors">
          <Compass size={16} />
          Explore
        </button>
        <button className="p-2.5 text-slate-500 hover:text-slate-900 border border-slate-200 rounded-full transition-colors">
          <Sun size={20} />
        </button>
      </div>
    </header>
  );
}
