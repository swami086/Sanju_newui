'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openAccordion, setOpenAccordion] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'What services does Gentle Space Company offer?',
      answer: 'We specialize in leasing, renting, and managing premium office spaces and commercial properties across Bangalore.'
    },
    {
      id: 2,
      question: 'Do you only operate in Bangalore?',
      answer: 'Yes, we currently focus exclusively on commercial real estate within Bangalore’s prime business districts.'
    },
    {
      id: 3,
      question: 'What types of office spaces do you provide?',
      answer: 'We offer a variety of office spaces including co-working spaces, plug-and-play offices, bare shell units, and customized corporate offices.'
    },
    {
      id: 4,
      question: 'What is the minimum lease term for an office space?',
      answer: 'The typical minimum lease term is 11 months, but we also offer flexible plans for shorter durations depending on the property.'
    },
    {
      id: 5,
      question: 'What types of commercial properties are available?',
      answer: 'We provide retail spaces, showrooms, warehouse spaces, tech parks, and standalone commercial buildings.'
    },
    {
      id: 6,
      question: 'Do you offer properties for purchase or only for rent/lease?',
      answer: 'We primarily deal in leasing, but we also have select commercial properties available for sale.'
    },
    {
      id: 7,
      question: 'Can I schedule a visit to view a commercial space?',
      answer: 'Absolutely. You can schedule a property tour with our team by filling out the form on our website or calling us directly.'
    },
    {
      id: 8,
      question: 'How is the rent or lease price determined?',
      answer: 'Rental pricing depends on the location, size, type of space, and amenities offered. Our team will provide a detailed quote based on your requirements.'
    },
    {
      id: 10,
      question: 'Are there any hidden charges?',
      answer: 'No hidden fees. We maintain transparency with all terms including maintenance charges, security deposits, and taxes.'
    },
    {
      id: 11,
      question: 'What documents are required to lease a space?',
      answer: 'Common documents include company registration, PAN, ID proof of authorized signatory, and GST certificate (if applicable).'
    },
    {
      id: 12,
      question: 'Is there a security deposit required?',
      answer: 'Yes, a standard security deposit (usually 3–10 months\' rent) is required depending on the property and lease terms.'
    },
    {
      id: 13,
      question: 'Do you offer co-working spaces?',
      answer: 'Yes, we have co-working options in key locations across Bangalore ideal for startups, freelancers, and small teams.'
    },
    {
      id: 14,
      question: 'Do you assist in finding office spaces for startups or small businesses?',
      answer: 'Absolutely. We work with businesses of all sizes and offer flexible spaces tailored to your needs and budget.'
    },
    {
      id: 15,
      question: 'How do I get started with Gentle Space Company?',
      answer: 'Simply contact us through our website or give us a call, and our team will assist you in finding the right space.'
    }
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-8 md:px-16" id="faq">
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="text-3xl font-bold text-theme-primary leading-tight font-manrope">
          Gentle Space Company – Frequently Asked Questions (FAQs)
        </h2>
        <p className="text-lg font-semibold text-theme-brand font-manrope">
          General Information
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="border border-theme rounded-lg bg-theme-card overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => setOpenAccordion(openAccordion === faq.id ? null : faq.id)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-theme-card-elevated transition-colors"
            >
              <span className="text-base font-medium text-theme-primary font-manrope">
                {faq.id}. {faq.question}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transform transition-transform duration-200 text-theme-primary ${openAccordion === faq.id ? 'rotate-180' : ''}`}
              >
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openAccordion === faq.id ? 'max-h-96' : 'max-h-0'
                }`}
            >
              <div className="px-6 pb-6 pt-2 border-t border-theme">
                <p className="text-base font-normal text-theme-secondary leading-relaxed font-manrope">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}