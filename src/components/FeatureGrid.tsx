import { Clock, Network, ShieldCheck } from "lucide-react";

export default function FeatureGrid() {
  const features = [
    {
      icon: <Clock size={20} className="text-blue-600" />,
      title: "Quick Summary",
      description: "Get the absolute gist of any topic in under 60 seconds. Perfect for a high-level overview.",
      bgColor: "bg-blue-100"
    },
    {
      icon: <Network size={20} className="text-purple-600" />,
      title: "Visual Aids",
      description: "Complex ideas broken down with intuitive diagrams and interactive visual metaphors.",
      bgColor: "bg-purple-100"
    },
    {
      icon: <ShieldCheck size={20} className="text-emerald-600" />,
      title: "Expert Verified",
      description: "Every simplification is cross-referenced with academic sources to ensure absolute accuracy.",
      bgColor: "bg-emerald-100"
    }
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl p-6 md:p-8 flex flex-col gap-3 md:gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.bgColor} mb-2`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm font-medium">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
