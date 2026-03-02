"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import FeatureGrid from "@/components/FeatureGrid";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (topic: string) => {
    setIsLoading(true);
    // Redirect to the result page with the searched topic as a query parameter
    router.push(`/result?topic=${encodeURIComponent(topic)}`);
  };

  return (
    <main className="flex-1 w-full relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header />

      <div className="flex flex-col items-center justify-center pt-8 md:pt-16 pb-4 md:pb-8">
        <section className="flex flex-col items-center text-center mt-4 md:mt-8 mb-8 md:mb-12 px-4 md:px-6 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-1.5 md:gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-wider mb-6 md:mb-8 border border-blue-100 dark:border-blue-800/50 shadow-sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600 dark:text-blue-400 md:w-3.5 md:h-3.5">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            AI-POWERED EXPLANATIONS
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-6 md:mb-8 transition-colors">
            Understand anything <br className="hidden sm:block md:hidden" /><span className="text-blue-600 dark:text-blue-500">in seconds.</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed transition-colors px-2">
            Stop feeling overwhelmed by complex jargon. Get clear, concise, and expert-verified breakdowns of any topic instantly. No account required.
          </p>
        </section>

        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {/* Loading State transition effect could go here if needed, but router.push handles it generally fast enough. */}
        {isLoading && (
          <div className="w-full max-w-3xl mx-auto px-6 mb-24 flex justify-center">
             <div className="flex flex-col items-center gap-4">
               <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-800 border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin"></div>
               <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Redirecting...</p>
             </div>
          </div>
        )}
      </div>

      {!isLoading && <FeatureGrid />}
      {!isLoading && <CtaBanner />}
      <Footer />
    </main>
  );
}
