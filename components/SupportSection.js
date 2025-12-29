export default function SupportSection() {
  const cards = [
    {
      category: 'Guidance',
      title: 'Real estate consultancy for your business',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      image: '/images/card-placeholder.png',
      btn1: 'Learn',
      btn2: 'Manage'
    },
    {
      category: 'Management',
      title: 'Ongoing support after you move in',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      image: '/images/card-placeholder.png',
      btn1: 'Button',
      btn2: 'Button'
    }
  ];

  return (
    <section className="bg-neutral-100 section-spacing">
      <div className="container-wide">
        <div className="mb-20 text-center">
          <p className="text-black/60 font-medium mb-4 uppercase tracking-[0.2em] text-xs">Support</p>
          <h2 className="text-[52px] font-medium font-poppins text-[#020603] mb-6">Beyond finding your space</h2>
          <p className="text-lg text-black/60 max-w-2xl mx-auto font-inter">We guide you through every decision with expert knowledge and real experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((item, i) => (
            <div key={i} className="bg-white rounded-[24px] border border-black/5 overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-500">
              <div className="aspect-[16/9] bg-neutral-200 relative overflow-hidden">
                <img src={item.image} className="w-full h-full object-cover grayscale" alt="" />
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <p className="text-xs text-black/50 mb-4 font-semibold uppercase tracking-widest">{item.category}</p>
                <h3 className="text-[44px] font-medium font-poppins text-[#020603] mb-6 leading-[1.1] tracking-tight">{item.title}</h3>
                <p className="text-black/60 mb-10 leading-relaxed font-inter text-lg">{item.desc}</p>
                <div className="flex gap-4">
                  <button className="bg-white border border-black/20 text-black px-8 py-3 rounded-xl font-bold hover:bg-black/5 transition-all">{item.btn1}</button>
                  <button className="flex items-center gap-2 text-black font-bold hover:opacity-70 transition-opacity">
                    {item.btn2}
                    <img src="/icons/arrow-right.svg" className="w-3" alt="" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}