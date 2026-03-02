import { Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center mt-20 mb-12 px-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-8">
        <Zap size={14} className="fill-blue-600" />
        AI-POWERED EXPLANATIONS
      </div>

      <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
        Understand anything <span className="text-blue-600">in seconds.</span>
      </h2>

      <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
        Stop feeling overwhelmed by complex jargon. Get clear, concise, and expert-verified breakdowns of any topic instantly. No account required.
      </p>
    </section>
  );
}
