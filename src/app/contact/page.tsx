import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header />
      <main className="flex-grow max-w-3xl mx-auto px-6 py-20 w-full flex items-center justify-center">
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-10 md:p-14 shadow-sm border border-slate-100 dark:border-slate-800/60 w-full text-center">

          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>

          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Get in Touch</h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
            Have a question, feedback, or a partnership idea? We&apos;d love to hear from you. The easiest way to reach out is directly via email.
          </p>

          <a
            href="mailto:hello@rohitgahrana.com"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-transform hover:-translate-y-1 shadow-lg shadow-blue-600/20"
          >
            hello@rohitgahrana.com
          </a>

          <p className="text-sm text-slate-500 dark:text-slate-500 mt-8">
            I aim to respond to all inquiries within 24-48 hours.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
