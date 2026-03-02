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
    <div className="w-full max-w-3xl mx-auto px-6 mb-24 flex flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full relative shadow-lg shadow-slate-200/50 rounded-2xl mb-8">
        <div className="relative flex items-center bg-white rounded-2xl border-2 border-slate-100 hover:border-blue-100 focus-within:border-blue-500 transition-colors p-2 h-16 sm:h-20">
          <Search className="text-slate-400 ml-4 mr-3" size={24} />
          <input
            type="text"
            placeholder="Enter any complex topic (e.g., Quantum Entanglement)"
            className="flex-1 bg-transparent border-none outline-none text-slate-800 text-lg placeholder:text-slate-400 font-medium"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="bg-[#0f172a] hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors h-full flex items-center ml-2"
          >
            {isLoading ? "Simplifying..." : "Simplify"}
          </button>
        </div>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-3 w-full">
        <span className="text-sm font-semibold text-slate-400 mr-2">Trending topics:</span>
        <button
          onClick={() => handleChipClick("Inflation")}
          disabled={isLoading}
          className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-sm font-semibold px-4 py-2 rounded-full transition-colors shadow-sm"
        >
          <TrendingUp size={14} />
          Inflation
        </button>
        <button
          onClick={() => handleChipClick("Black Holes")}
          disabled={isLoading}
          className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-sm font-semibold px-4 py-2 rounded-full transition-colors shadow-sm"
        >
          <Sun size={14} />
          Black Holes
        </button>
        <button
          onClick={() => handleChipClick("Blockchain")}
          disabled={isLoading}
          className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-sm font-semibold px-4 py-2 rounded-full transition-colors shadow-sm"
        >
          <Grid size={14} />
          Blockchain
        </button>
      </div>
    </div>
  );
}
