"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import FeatureGrid from "@/components/FeatureGrid";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import { BookOpen, GraduationCap, Library, KeyRound, Sparkles } from "lucide-react";

interface ExplanationData {
  title: string;
  category: string;
  shortDescription: string;
  tldr: string;
  sections: Array<{ title: string; content: string }>;
  keyTerms: Array<{ term: string; definition: string }>;
  deepDive: string;
}

export default function Home() {
  const [explanationData, setExplanationData] = useState<ExplanationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedTopic, setSearchedTopic] = useState<string | null>(null);
  const [readingLevel, setReadingLevel] = useState<"beginner" | "intermediate" | "expert">("beginner");

  const handleSearch = async (topic: string) => {
    setIsLoading(true);
    setExplanationData(null);
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
      if (data.error) {
         throw new Error(data.error);
      }
      setExplanationData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching the explanation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderBoldedText = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-slate-900 dark:text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <main className="flex-1 w-full relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header />

      <div className="flex flex-col items-center justify-center pt-16 pb-8">
        <section className="flex flex-col items-center text-center mt-8 mb-12 px-6 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-8 border border-blue-100 dark:border-blue-800/50 shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600 dark:text-blue-400">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            AI-POWERED EXPLANATIONS
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-8 transition-colors">
            Understand anything <span className="text-blue-600 dark:text-blue-500">in seconds.</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed transition-colors">
            Stop feeling overwhelmed by complex jargon. Get clear, concise, and expert-verified breakdowns of any topic instantly. No account required.
          </p>
        </section>

        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {/* Loading State */}
        {isLoading && (
          <div className="w-full max-w-3xl mx-auto px-6 mb-24 flex justify-center">
             <div className="flex flex-col items-center gap-4">
               <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-800 border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin"></div>
               <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Simplifying &quot;{searchedTopic}&quot;...</p>
             </div>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="w-full max-w-3xl mx-auto px-6 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 font-medium text-center">
              {error}
            </div>
          </div>
        )}

        {/* Result UI Layout */}
        {!isLoading && explanationData && (
          <div className="w-full max-w-6xl mx-auto px-4 md:px-8 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">

             {/* Header Section */}
             <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 mb-8 shadow-sm border border-slate-100 dark:border-slate-800/60 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                       <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                          {explanationData.category}
                       </span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                      {explanationData.title}
                    </h3>
                    <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">
                      {explanationData.shortDescription}
                    </p>
                  </div>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Main Content Column */}
                <div className="lg:col-span-8 space-y-8">

                   {/* TLDR Highlight Box */}
                   <div className="bg-blue-600 text-white rounded-[2rem] p-8 shadow-lg shadow-blue-600/20 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Sparkles size={120} />
                      </div>
                      <div className="relative z-10">
                        <h4 className="text-blue-200 font-bold uppercase tracking-wider text-sm mb-3">TL;DR</h4>
                        <p className="text-2xl md:text-3xl font-bold leading-tight">
                           {explanationData.tldr}
                        </p>
                      </div>
                   </div>

                   {/* Dynamic Sections */}
                   <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100 dark:border-slate-800/60 space-y-10 transition-colors">
                      {explanationData.sections.map((section, idx) => (
                        <div key={idx}>
                           <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                              {section.title}
                           </h4>
                           <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                              {renderBoldedText(section.content)}
                           </p>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-4 space-y-6">

                   {/* Reading Levels Toggle */}
                   <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800/60 transition-colors">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <GraduationCap size={20} className="text-blue-600" />
                        Explanation Level
                      </h4>
                      <div className="flex flex-col gap-2">
                        {(["beginner", "intermediate", "expert"] as const).map((level) => (
                          <button
                            key={level}
                            onClick={() => setReadingLevel(level)}
                            className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium text-left ${
                              readingLevel === level
                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                                : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border border-transparent"
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              readingLevel === level ? "border-blue-600" : "border-slate-300 dark:border-slate-600"
                            }`}>
                               {readingLevel === level && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
                            </div>
                            <span className="capitalize">{level}</span>
                          </button>
                        ))}
                      </div>
                   </div>

                   {/* Key Terms */}
                   <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800/60 transition-colors">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                        <KeyRound size={20} className="text-blue-600" />
                        Key Terms
                      </h4>
                      <div className="space-y-4">
                         {explanationData.keyTerms.map((item, idx) => (
                           <div key={idx} className="border-l-2 border-slate-200 dark:border-slate-700 pl-4 py-1">
                              <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">{item.term}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.definition}</p>
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* Deep Dive */}
                   <div className="bg-slate-900 dark:bg-slate-800 rounded-[2rem] p-6 shadow-lg shadow-slate-900/10 text-white relative overflow-hidden transition-colors">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <BookOpen size={80} />
                      </div>
                      <div className="relative z-10">
                        <h4 className="font-bold mb-3 flex items-center gap-2 text-blue-300">
                          <Library size={18} />
                          Nerd Out (Deep Dive)
                        </h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {explanationData.deepDive}
                        </p>
                      </div>
                   </div>

                </div>
             </div>
          </div>
        )}
      </div>

      {!explanationData && !isLoading && <FeatureGrid />}
      {!explanationData && !isLoading && <CtaBanner />}
      <Footer />
    </main>
  );
}
