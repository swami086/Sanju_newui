const reasons = [
  {
    id: 1,
    title: 'Local Expertise',
    description: 'Deep understanding of the Bengaluru real estate market.',
    image: '/images/local-expertise.png'
  },
  {
    id: 2,
    title: 'Trust & Transparency',
    description: 'Transparent processes and honest advice.',
    image: '/images/trust-transparency.png'
  },
  {
    id: 3,
    title: 'Tailored Solutions',
    description: 'Customized solutions to fit your unique business needs.',
    image: '/images/tailored-solutions.png'
  }
];

export default function WhyChooseGentle() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-8 md:px-16">
      <h2 className="text-3xl font-bold text-theme-primary mb-12 font-manrope">
        Why Choose Gentle Space?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {reasons.map((reason) => (
          <div key={reason.id} className="flex flex-col gap-6 group">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img
                src={reason.image}
                alt={reason.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-medium text-theme-primary font-manrope">
                {reason.title}
              </h3>
              <p className="text-sm font-normal text-theme-secondary leading-relaxed font-manrope">
                {reason.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}