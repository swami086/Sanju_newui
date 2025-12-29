'use client';

export default function Solutions() {
  const tags = [
    "Full Lease Flexibility",
    "Rapid Response Commitment",
    "Custom Managed Offices"
  ];

  return (
    <section id="service" className="bg-black section-spacing border-t border-white/5">
      <div className="container-wide">
        <div className="max-w-4xl">
          <h2 className="text-[32px] md:text-[40px] font-medium text-white mb-6">
            Intelligent Workspace Solutions
          </h2>
          <p className="text-lg text-white/50 mb-10 max-w-2xl leading-relaxed font-inter font-light">
            We deliver high-performance office environments strategically engineered to support the evolving needs of Bangalore's top enterprises. From agile leasing structures to completely bespoke managed offices, our solutions provide the stability and scale your business demands.
          </p>

          <div className="flex flex-wrap gap-4">
            {tags.map((tag, i) => (
              <div
                key={i}
                className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 hover:bg-white/10 transition-colors cursor-default"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}