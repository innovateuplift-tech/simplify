"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import FeatureGrid from "@/components/FeatureGrid";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedTopic, setSearchedTopic] = useState<string | null>(null);

  const handleSearch = async (topic: string) => {
    setIsLoading(true);
    setExplanation(null);
    setError(null);
    setSearchedTopic(topic);

    try {
      const response = await fetch("/api/simplify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error("Failed to simplify the topic");
      }

      const data = await response.json();
      setExplanation(data.explanation);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching the explanation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 w-full relative">
      <Header />

      <div className="flex flex-col items-center justify-center pt-16 pb-8">
        <section className="flex flex-col items-center text-center mt-8 mb-12 px-6 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-8 border border-blue-100 shadow-sm">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-blue-600"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            AI-POWERED EXPLANATIONS
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
            Understand anything <span className="text-blue-600">in seconds.</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Stop feeling overwhelmed by complex jargon. Get clear, concise, and expert-verified breakdowns of any topic instantly. No account required.
          </p>
        </section>

        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {/* Result Area */}
        {isLoading && (
          <div className="w-full max-w-3xl mx-auto px-6 mb-24 flex justify-center">
             <div className="flex flex-col items-center gap-4">
               <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
               <p className="text-slate-500 font-medium animate-pulse">Simplifying &quot;{searchedTopic}&quot;...</p>
             </div>
          </div>
        )}

        {!isLoading && explanation && (
          <div className="w-full max-w-3xl mx-auto px-6 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-2xl font-bold mb-6 text-slate-900">Explanation for <span className="text-blue-600">{searchedTopic}</span></h3>
              <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                {explanation.split('\n').map((line: string, index: number) => {
                   // A basic custom renderer for bold markdown
                   const boldRendered = line.split(/(\*\*.*?\*\*)/).map((part, i) => {
                     if (part.startsWith('**') && part.endsWith('**')) {
                       return <strong key={i} className="text-slate-900">{part.slice(2, -2)}</strong>;
                     }
                     return part;
                   });
                   return <p key={index} className="mb-4 last:mb-0">{boldRendered}</p>;
                })}
              </div>
            </div>
          </div>
        )}

        {!isLoading && error && (
          <div className="w-full max-w-3xl mx-auto px-6 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-red-50 p-6 rounded-2xl border border-red-200 text-red-600 font-medium text-center">
              {error}
            </div>
          </div>
        )}
      </div>

      {!explanation && !isLoading && <FeatureGrid />}
      {!explanation && !isLoading && <CtaBanner />}
      <Footer />
    </main>
  );
}
