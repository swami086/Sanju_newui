'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: 'Fully Furnished Offices',
    desc: 'Ready-to-move-in spaces with modern amenities.',
    image: '/images/service-furnished.png'
  },
  {
    title: 'Custom Built Workspaces',
    desc: 'Spaces tailored to your team\'s unique needs.',
    image: '/images/service-custom.png'
  },
  {
    title: 'Co-working Spaces',
    desc: 'Collaborative environments for startups and freelancers.',
    image: '/images/service-coworking.png'
  },
  {
    title: 'Private Cabins',
    desc: 'Focused workspaces for privacy and concentration.',
    image: '/images/service-private.png'
  },
  {
    title: 'Enterprise Offices',
    desc: 'Scale your business with premium managed offices.',
    image: '/images/hero-office.png' // Reusing hero image for now
  },
  {
    title: 'Virtual Offices',
    desc: 'A professional business address without the physical space.',
    image: '/images/service-furnished.png' // Reusing furnished image for now
  }
];

export default function OurServices() {
  return (
    <section className="bg-black py-20">
      <div className="container-wide">
        <h2 className="text-[28px] font-medium text-white mb-12">Our Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-2xl mb-6 bg-neutral-900">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">{service.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}