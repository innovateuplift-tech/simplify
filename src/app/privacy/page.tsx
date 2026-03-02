import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-20 w-full">
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800/60">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-8">Privacy Policy</h1>
          <div className="prose dark:prose-invert prose-slate max-w-none text-slate-600 dark:text-slate-400">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>At Simplifier, we take your privacy seriously. This policy describes what information we collect and how we use it.</p>
            <h3>1. Information We Collect</h3>
            <p>We collect the topics you search for to improve our AI models and provide better explanations. We do not require you to create an account or provide personal information.</p>
            <h3>2. How We Use Information</h3>
            <p>The information we collect is used solely to generate explanations and analyze trending topics on our platform.</p>
            <h3>3. Third-Party Services</h3>
            <p>We use third-party AI services (such as Google Generative AI) to process your queries. Your search terms are sent to these services for processing.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
