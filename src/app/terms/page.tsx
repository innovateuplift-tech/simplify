import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-20 w-full">
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800/60">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-8">Terms of Service</h1>
          <div className="prose dark:prose-invert prose-slate max-w-none text-slate-600 dark:text-slate-400">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>Welcome to Simplifier. By accessing or using our website, you agree to be bound by these terms.</p>
            <h3>1. Description of Service</h3>
            <p>Simplifier provides AI-generated explanations of complex topics. The explanations are for educational purposes and should not replace professional advice.</p>
            <h3>2. User Conduct</h3>
            <p>You agree not to use the service for any unlawful purpose or to generate content that is harmful, abusive, or offensive.</p>
            <h3>3. Disclaimer of Warranties</h3>
            <p>Our service is provided &quot;as is&quot; and &quot;as available&quot;. We make no warranties regarding the accuracy or reliability of the AI-generated explanations.</p>
            <h3>4. Limitation of Liability</h3>
            <p>In no event shall Simplifier be liable for any indirect, incidental, or consequential damages arising from the use of our service.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
