"use client";
import { Settings } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="w-full max-w-5xl mx-auto px-8 py-12">
      <div className="bg-[#0f172a] rounded-[2rem] p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">

        {/* Decorative Grid Right */}
        <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-1/2 items-center justify-center opacity-40">
           <div className="grid grid-cols-2 gap-4 w-full h-full p-8 relative">
              <div className="bg-[#1e293b] rounded-2xl w-full h-full opacity-60"></div>
              <div className="bg-[#1e293b] rounded-2xl w-full h-full opacity-60"></div>
              <div className="bg-[#1e293b] rounded-2xl w-full h-full opacity-60"></div>
              <div className="bg-[#1e293b] rounded-2xl w-full h-full opacity-60"></div>

              {/* Center Gear Icon Overlay */}
              <div className="absolute inset-0 m-auto w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center z-10 shadow-xl opacity-90 transform rotate-12">
                <Settings size={40} className="text-blue-900" />
              </div>
           </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 max-w-md relative z-20">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Start learning better today
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed font-medium">
            Join curious minds who use Simplifier to master new subjects faster than ever. No sign-up required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-full transition-colors text-center shadow-lg shadow-blue-600/20"
            >
              Try a Search
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-8 rounded-full transition-colors border border-slate-700 text-center"
            >
              Popular Topics
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
