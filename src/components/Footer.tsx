import Link from "next/link";
import { Share2, AtSign } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full mt-24 border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 rounded-lg p-1.5 text-white">
              <svg
                width="20"
                height="20"
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
            <span className="font-bold text-lg">Simplifier</span>
          </div>

          <nav className="flex gap-8 text-sm font-medium text-slate-500">
            <Link href="#" className="hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Contact</Link>
          </nav>

          <div className="flex gap-3">
            <button className="p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition-colors">
              <Share2 size={16} />
            </button>
            <button className="p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition-colors">
              <AtSign size={16} />
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
          © {new Date().getFullYear()} Simplifier AI. One simple explanation at a time.
        </p>
      </div>
    </footer>
  );
}
