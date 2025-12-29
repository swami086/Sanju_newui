export default function Testimonials() {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder, TechStart India',
      quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare."',
      avatar: '/images/avatar-placeholder.jpg'
    },
    {
      name: 'Name Surname',
      role: 'Position, Company name',
      quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare."',
      avatar: '/images/avatar-placeholder.jpg'
    },
    {
      name: 'Name Surname',
      role: 'Position, Company name',
      quote: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare."',
      avatar: '/images/avatar-placeholder.jpg'
    }
  ];

  return (
    <section className="bg-white section-spacing">
      <div className="container-wide">
        <div className="mb-20 text-center">
          <h2 className="text-[52px] font-medium font-poppins text-[#020603] mb-6">Customer testimonials</h2>
          <p className="text-lg text-black/60 max-w-2xl mx-auto font-inter">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div key={i} className="bg-[#f2f2f2] p-10 rounded-[24px] border border-black/5 flex flex-col gap-8">
              <img src="/icons/stars.svg" className="w-28 h-auto" alt="5 stars" />
              <p className="text-lg leading-relaxed text-black/80 font-inter italic">{item.quote}</p>
              <div className="flex items-center gap-4 mt-auto">
                <img src={item.avatar} className="w-14 h-14 rounded-full border border-black/10 grayscale" alt={item.name} />
                <div>
                  <p className="font-bold text-[#020603] text-base">{item.name}</p>
                  <p className="text-sm text-black/50">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}