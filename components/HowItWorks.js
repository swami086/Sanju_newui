export default function HowItWorks() {
  const steps = [
    {
      step: 'Step one',
      title: 'Browse verified properties',
      desc: 'Search our curated listings of premium offices in Bengaluru.',
      image: '/images/card-placeholder.png'
    },
    {
      step: 'Step two',
      title: 'Submit your enquiry',
      desc: 'Share your requirements and connect directly with property managers.',
      image: '/images/card-placeholder.png'
    },
    {
      step: 'Step three',
      title: 'Consult with experts',
      desc: 'Get personalized advice from our real estate consultancy team.',
      image: '/images/wide-card-placeholder.png'
    }
  ];

  return (
    <section className="bg-white section-spacing border-t border-black/5">
      <div className="container-wide">
        <div className="mb-20 text-center">
          <p className="text-black/60 font-medium mb-4 uppercase tracking-[0.2em] text-xs">Process</p>
          <h2 className="text-[52px] font-medium font-poppins text-[#020603] mb-6">How it works</h2>
          <p className="text-lg text-black/60 max-w-2xl mx-auto font-inter">Three simple steps to connect with your ideal workspace and expert guidance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, i) => (
            <div key={i} className="bg-[#f2f2f2] rounded-[24px] border border-black/5 overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300">
              <div className="aspect-[16/10] bg-[#e0e0e0] relative overflow-hidden">
                <img src={item.image} className="w-full h-full object-cover grayscale" alt="" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-xs text-black/50 mb-4 font-semibold uppercase tracking-widest">{item.step}</p>
                <h3 className="text-[28px] font-medium font-poppins text-[#020603] mb-4 leading-tight">{item.title}</h3>
                <p className="text-black/60 mb-8 leading-relaxed font-inter">{item.desc}</p>
                <button className="flex items-center gap-2 text-black font-semibold hover:opacity-70 transition-opacity self-start mt-auto">
                  {i === 0 ? 'Discover' : i === 1 ? 'Inquire' : 'Connect'}
                  <img src="/icons/arrow-right.svg" className="w-3" alt="" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}