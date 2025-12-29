'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRollbar } from '@rollbar/react';

export default function ContactForm() {
  const rollbar = useRollbar();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirements: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/enquiries/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit enquiry');
      }

      setSuccess(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        requirements: ''
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      rollbar.error('Contact form submission failed', err, { formData: { ...formData, name: '[REDACTED]', email: '[REDACTED]' } });
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "w-full px-4 py-4 rounded-lg bg-theme-input-bg text-theme-primary placeholder-theme-tertiary border border-theme focus:ring-2 focus:ring-theme-brand outline-none transition-all duration-300";
  const labelStyles = "block text-base font-medium text-theme-primary mb-3 font-manrope";

  return (
    <section className="py-20 max-w-7xl mx-auto px-8 md:px-16" id="contact">
      <h2 className="text-3xl font-bold text-theme-primary mb-12 font-manrope">
        Contact Us
      </h2>

      <form onSubmit={handleSubmit} className="max-w-4xl relative">
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-8 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500 text-sm font-medium flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Thank you! Your enquiry has been submitted successfully.
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm font-medium flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mb-10">
          <div className="flex flex-col">
            <label className={labelStyles}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={inputStyles}
              required
              disabled={loading}
            />
          </div>
          <div className="flex flex-col">
            <label className={labelStyles}>Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your Company"
              className={inputStyles}
              disabled={loading}
            />
          </div>
          <div className="flex flex-col">
            <label className={labelStyles}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className={inputStyles}
              required
              disabled={loading}
            />
          </div>
          <div className="flex flex-col">
            <label className={labelStyles}>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone"
              className={inputStyles}
              disabled={loading}
            />
          </div>
        </div>

        <div className="mb-12 flex flex-col">
          <label className={labelStyles}>Requirements</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Your Requirements"
            className={`${inputStyles} h-40 resize-none`}
            required
            disabled={loading}
          />
        </div>

        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`px-10 py-3 bg-theme-brand text-white font-bold text-sm rounded shadow-lg transition-colors hover:bg-theme-brand-hover flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : 'Submit'}
          </motion.button>
        </div>
      </form>
    </section>
  );
}