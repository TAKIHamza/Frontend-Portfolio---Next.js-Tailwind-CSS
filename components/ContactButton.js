'use client'
import { submitContactMessage } from '@/services/contact';
import { useState, useEffect } from 'react';

const ContactButton = ({ currentUser = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: null,
    message: ''
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: '' });

    try {
      await submitContactMessage(formData, currentUser?.id);
      setSubmitStatus({
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsOpen(false), 2000);
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error.message || 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
      {/* Main Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`
          flex items-center justify-center
          w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
          rounded-full
          bg-gradient-to-br from-cyan-600 to-sky-700
          text-white
          shadow-lg hover:shadow-xl
          transition-all duration-300 ease-in-out
          ${isOpen ? '!w-32 sm:!w-40 !rounded-2xl' : ''}
          hover:scale-110
          focus:outline-none focus:ring-2 focus:ring-cyan-500
          overflow-hidden
          ${!isOpen && !isHovering ? 'animate-float' : ''}
          ${isHovering ? 'animate-vibrate' : ''}
        `}
        aria-label="Contact form"
      >
        <span className={`text-xl ${isOpen ? 'mr-1 sm:mr-2' : 'absolute'}`}>✉️</span>
        <span className={`
          whitespace-nowrap text-sm sm:text-base
          transition-all duration-300
          ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}
        `}>
          Contact
        </span>
      </button>

      {/* Contact Form */}
      {isVisible && (
        <div className={`
          absolute bottom-14 right-0 md:right-72 sm:bottom-10
          w-[22rem] sm:w-96 md:w-[39rem]
          bg-white dark:bg-gray-800
          border border-teal-500 dark:border-gray-700
          rounded-xl
          shadow-2xl
          p-6
          transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}
        `}>
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white text-center">
              Get in Touch
            </h3>
            
            {submitStatus.message && (
              <div className={`p-2 sm:p-3 rounded-lg text-sm ${
                submitStatus.success 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
              }`}>
                {submitStatus.message}
              </div>
            )}
            
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-slate-600 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full px-3 py-2 text-sm sm:text-base border border-slate-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-slate-600 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
                className="w-full px-3 py-2 text-sm sm:text-base border border-slate-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="message" className="block text-sm font-medium text-slate-600 dark:text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                rows="3"
                required
                className="w-full px-3 py-2 text-sm sm:text-base border border-slate-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full py-2 px-4 
                bg-gradient-to-r from-cyan-600 to-sky-700 
                text-white rounded-lg 
                transition-all duration-300 
                shadow-md hover:shadow-lg
                text-sm sm:text-base
                ${isSubmitting 
                  ? 'opacity-70 cursor-not-allowed' 
                  : 'hover:from-cyan-700 hover:to-sky-800 hover:animate-pulse'
                }`
              }
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : 'Send Message'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ContactButton;