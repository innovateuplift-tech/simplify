"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, GraduationCap, Loader2, Share2, Zap, Lightbulb, Check } from "lucide-react";

interface ExplanationData {
  title: string;
  category: string;
  shortDescription: string;
  tldr: string;
  sections: Array<{ title: string; content: string }>;
  keyTerms: Array<{ term: string; definition: string }>;
  deepDive: string;
}

function ResultContent() {
  const searchParams = useSearchParams();
  const topicParam = searchParams.get("topic");

  const [explanationData, setExplanationData] = useState<ExplanationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [readingLevel, setReadingLevel] = useState<"beginner" | "intermediate" | "expert">("intermediate");
  const [showDeepDive, setShowDeepDive] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!topicParam) return;

    const fetchExplanation = async () => {
      setIsLoading(true);
      setExplanationData(null);
      setError(null);

      try {
        const response = await fetch("/api/simplify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: topicParam, level: readingLevel }),
        });

        let data;
        try {
          data = await response.json();
        } catch {
          throw new Error("Failed to parse response from server.");
        }

        if (!response.ok) {
          throw new Error(data.error || "Failed to simplify the topic");
        }

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

    fetchExplanation();
  }, [topicParam, readingLevel]);

  const renderBoldedText = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-slate-900 dark:text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  if (!topicParam) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-slate-500 dark:text-slate-400">No topic provided. Please go back and search for a topic.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 flex flex-col items-center">
      {/* Loading State */}
      {isLoading && (
        <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-24 flex justify-center">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 text-blue-600 dark:text-blue-500 animate-spin" />
              <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Simplifying &quot;{topicParam}&quot;...</p>
            </div>
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 font-medium text-center shadow-sm">
            {error}
          </div>
        </div>
      )}

      {/* Result UI Layout */}
      {!isLoading && explanationData && (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">

            {/* Header Section */}
            <div className="mb-6 md:mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4 text-xs md:text-sm font-medium text-slate-500">
                  <span>{explanationData.category}</span>
                  <span>›</span>
                  <span className="text-slate-900 dark:text-slate-300 font-semibold">{explanationData.title}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4 tracking-tight leading-tight">
                {explanationData.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                {renderBoldedText(explanationData.shortDescription)}
              </p>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-10 items-start">
              {/* Main Content Column */}
              <div className="w-full lg:col-span-8 space-y-8 md:space-y-10">

                  {/* TLDR Highlight Box */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-5 md:p-8 border border-yellow-100 dark:border-yellow-900/30">
                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                      <Zap className="w-4 h-4 md:w-5 md:h-5 text-yellow-600 dark:text-yellow-500" fill="currentColor" />
                      <h4 className="text-yellow-800 dark:text-yellow-500 font-bold uppercase tracking-wider text-xs md:text-sm">TL;DR</h4>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                        {renderBoldedText(explanationData.tldr)}
                    </p>
                  </div>

                  {/* Dynamic Sections */}
                  <div className="space-y-8 md:space-y-10">
                    {explanationData.sections.map((section, idx) => (
                      <div key={idx}>
                          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">
                            {section.title}
                          </h2>
                          <div className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                            {renderBoldedText(section.content)}
                          </div>
                      </div>
                    ))}
                  </div>

                  <hr className="border-slate-200 dark:border-slate-800" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-4">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2000);
                      }}
                      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 md:py-3 px-5 md:px-6 rounded-xl transition-colors w-full sm:w-auto"
                    >
                      {isCopied ? (
                        <>
                          <Check size={18} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Share2 size={18} />
                          Share Explanation
                        </>
                      )}
                    </button>
                  </div>
              </div>

              {/* Sidebar Column */}
              <div className="w-full lg:col-span-4 space-y-6">

                  {/* Reading Levels Toggle */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
                    <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
                      Change Reading Level
                    </h3>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setReadingLevel("beginner")}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all font-semibold text-sm ${
                          readingLevel === "beginner"
                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <span className="text-lg">👶</span>
                        </div>
                        Like I&apos;m 5
                      </button>

                      <button
                        onClick={() => setReadingLevel("intermediate")}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all font-semibold text-sm ${
                          readingLevel === "intermediate"
                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <GraduationCap size={18} />
                        </div>
                        High School
                      </button>

                      <button
                        onClick={() => setReadingLevel("expert")}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all font-semibold text-sm ${
                          readingLevel === "expert"
                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <BookOpen size={18} />
                        </div>
                        Expert
                      </button>
                    </div>
                  </div>

                  {/* Key Terms */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
                    <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-5">
                      Key Terms
                    </h3>
                    <div className="space-y-5">
                        {explanationData.keyTerms.map((item, idx) => (
                          <div key={idx}>
                            <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">{item.term}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{renderBoldedText(item.definition)}</p>
                          </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                      <a
                        href={`https://en.wikipedia.org/wiki/${encodeURIComponent(explanationData.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors inline-block"
                      >
                        View Full Glossary
                      </a>
                    </div>
                  </div>

                  {/* Deep Dive */}
                  <div className="bg-blue-600 dark:bg-blue-700 rounded-2xl p-6 shadow-sm text-white relative overflow-hidden transition-colors">
                    <div className="relative z-10 flex flex-col items-start gap-3">
                      <div className="bg-white/20 p-2 rounded-full mb-1">
                        <Lightbulb className="w-5 h-5 text-white" fill="currentColor" />
                      </div>
                      <h3 className="font-bold text-lg">Deep Dive</h3>

                      {!showDeepDive ? (
                        <>
                          <p className="text-sm text-blue-100 dark:text-blue-50 leading-relaxed mb-4">
                            Want to learn more about the advanced concepts behind {explanationData.title.toLowerCase()}?
                          </p>
                          <button
                            onClick={() => setShowDeepDive(true)}
                            className="w-full bg-white text-blue-600 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 hover:bg-blue-50 font-bold py-2.5 rounded-xl text-sm transition-colors"
                          >
                            Continue Reading
                          </button>
                        </>
                      ) : (
                        <div className="animate-in fade-in slide-in-from-top-4 duration-500 w-full">
                          <div className="text-sm text-blue-50 leading-relaxed mb-4 border-t border-blue-500/50 dark:border-blue-400/30 pt-4">
                            {renderBoldedText(explanationData.deepDive)}
                          </div>
                          <button
                            onClick={() => setShowDeepDive(false)}
                            className="text-xs text-blue-200 dark:text-blue-200 hover:text-white dark:hover:text-white font-semibold flex items-center gap-1 transition-colors"
                          >
                            Hide Details
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

              </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default function ResultPage() {
  return (
    <main className="flex-1 w-full relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300 min-h-screen flex flex-col">
      <Header />
      <Suspense fallback={
        <div className="flex-1 flex justify-center py-24">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
      }>
        <ResultContent />
      </Suspense>
      <Footer />
    </main>
  );
}
