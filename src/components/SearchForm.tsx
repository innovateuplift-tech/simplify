"use client";

import { useState } from "react";
import { Search, TrendingUp, Sun, Grid } from "lucide-react";

interface SearchFormProps {
  onSearch: (topic: string) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSearch(topic.trim());
    }
  };

  const handleChipClick = (term: string) => {
    setTopic(term);
    onSearch(term);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 mb-16 md:mb-24 flex flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full relative shadow-lg shadow-slate-200/50 rounded-2xl mb-6 md:mb-8">
        <div className="relative flex items-center bg-white rounded-2xl border-2 border-slate-100 hover:border-blue-100 focus-within:border-blue-500 transition-colors p-2 h-14 md:h-16 lg:h-20">
          <Search className="text-slate-400 ml-2 md:ml-4 mr-2 md:mr-3 w-5 h-5 md:w-6 md:h-6" />
          <input
            type="text"
            placeholder="Enter any complex topic..."
            className="flex-1 bg-transparent border-none outline-none text-slate-800 text-base md:text-lg placeholder:text-slate-400 font-medium w-full"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold px-4 md:px-6 py-2 md:py-3 rounded-xl transition-colors h-full flex items-center ml-2 text-sm md:text-base whitespace-nowrap"
          >
            {isLoading ? "Simplifying..." : "Random Topic"}
          </button>
        </div>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 w-full">
        <span className="text-xs md:text-sm font-semibold text-slate-400 mr-1 md:mr-2 w-full text-center sm:w-auto sm:text-left mb-2 sm:mb-0">Trending topics:</span>
        <button
          onClick={() => handleChipClick("Inflation")}
          disabled={isLoading}
          className="flex items-center gap-1.5 md:gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs md:text-sm font-semibold px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-colors shadow-sm"
        >
          <TrendingUp size={14} className="w-3 h-3 md:w-4 md:h-4" />
          Inflation
        </button>
        <button
          onClick={() => handleChipClick("Black Holes")}
          disabled={isLoading}
          className="flex items-center gap-1.5 md:gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs md:text-sm font-semibold px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-colors shadow-sm"
        >
          <Sun size={14} className="w-3 h-3 md:w-4 md:h-4" />
          Black Holes
        </button>
        <button
          onClick={() => handleChipClick("Blockchain")}
          disabled={isLoading}
          className="flex items-center gap-1.5 md:gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs md:text-sm font-semibold px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-colors shadow-sm"
        >
          <Grid size={14} className="w-3 h-3 md:w-4 md:h-4" />
          Blockchain
        </button>
      </div>
    </div>
  );
}
