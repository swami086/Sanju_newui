'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQSection() {
  const faqs = [
    {
      q: 'What services does Gentle Space Company offer?',
      a: 'We specialize in leasing, renting, and managing premium office spaces and commercial properties across Bangalore.'
    },
    {
      q: 'Do you only operate in Bangalore?',
      a: 'Yes, we currently focus exclusively on commercial real estate within Bangalore’s prime business districts.'
    },
    {
      q: 'What types of office spaces do you provide?',
      a: 'We offer a variety of office spaces including co-working spaces, plug-and-play offices, bare shell units, and customized corporate offices.'
    },
    {
      q: 'What is the minimum lease term for an office space?',
      a: 'The typical minimum lease term is 11 months, but we also offer flexible plans for shorter durations depending on the property.'
    },
    {
      q: 'What types of commercial properties are available?',
      a: 'We provide retail spaces, showrooms, warehouse spaces, tech parks, and standalone commercial buildings.'
    },
    {
      q: 'Do you offer properties for purchase or only for rent/lease?',
      a: 'We primarily deal in leasing, but we also have select commercial properties available for sale.'
    },
    {
      q: 'Can I schedule a visit to view a commercial space?',
      a: 'Absolutely. You can schedule a property tour with our team by filling out the form on our website or calling us directly.'
    },
    {
      q: 'How is the rent or lease price determined?',
      a: 'Rental pricing depends on the location, size, type of space, and amenities offered. Our team will provide a detailed quote based on your requirements.'
    },
    {
      q: 'Are there any hidden charges?',
      a: 'No hidden fees. We maintain transparency with all terms including maintenance charges, security deposits, and taxes.'
    },
    {
      q: 'What documents are required to lease a space?',
      a: 'Common documents include company registration, PAN, ID proof of authorized signatory, and GST certificate (if applicable).'
    },
    {
      q: 'Is there a security deposit required?',
      a: 'Yes, a standard security deposit (usually 3–10 months\' rent) is required depending on the property and lease terms.'
    },
    {
      q: 'Do you offer co-working spaces?',
      a: 'Yes, we have co-working options in key locations across Bangalore ideal for startups, freelancers, and small teams.'
    },
    {
      q: 'Do you assist in finding office spaces for startups or small businesses?',
      a: 'Absolutely. We work with businesses of all sizes and offer flexible spaces tailored to your needs and budget.'
    },
    {
      q: 'How do I get started with Gentle Space Company?',
      a: 'Simply contact us through our website or give us a call, and our team will assist you in finding the right space.'
    }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-black py-24 border-t border-white/5">
      <div className="container-wide max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[40px] font-medium text-white mb-4">
            Gentle Space Company – Frequently Asked Questions (FAQs)
          </h2>
          <p className="text-white/50 font-inter">
            Everything you need to know about our commercial real estate services in Bangalore.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 rounded-2xl overflow-hidden bg-[#0a0a0a]">
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                aria-expanded={openIndex === i}
              >
                <span className="text-white font-medium">{faq.q}</span>
                <ChevronDown
                  className={`text-white/40 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                  size={20}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 text-white/50 text-base leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}