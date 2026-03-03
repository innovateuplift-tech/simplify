import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User, Sparkles, BookOpen } from "lucide-react";

export default function Creator() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-16 md:py-24 w-full">
        <div className="space-y-12">

          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white dark:border-slate-800 shadow-xl">
              <User className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Meet the Creator
            </h1>
            <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-bold">
              Rohit Gahrana
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-800/60 space-y-8 relative overflow-hidden">

            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Why I built Simplifier</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                  The internet is an incredible repository of human knowledge, yet so much of it is locked behind dense jargon, complex academic language, and assumptions of prior knowledge. I constantly found myself trying to learn about fascinating subjects—from quantum physics to blockchain architecture—only to hit a wall of incomprehensible terminology.
                </p>
                <br />
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                  I created Simplifier because I believe <strong>learning shouldn&apos;t be a struggle</strong>. Information is empowering, and everyone deserves the chance to understand the world around them regardless of their background or education level.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg text-purple-600 dark:text-purple-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">The Mission</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                  My ultimate goal is <strong>turning complex things into simple examples and explanation</strong>. By leveraging state-of-the-art AI, specifically Nvidia&apos;s powerful Nemotron architecture, this application bridges the gap between expert knowledge and curious minds. It breaks down complex topics into digestible analogies, highlights key terms, and adjusts reading levels so anyone can grasp the core concepts instantly.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-100 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400 italic font-medium">
                  &quot;If you can&apos;t explain it simply, you don&apos;t understand it well enough.&quot;
                </p>
              </div>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
