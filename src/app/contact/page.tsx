'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="font-serif text-3xl md:text-4xl mb-3 md:mb-4">Get in Touch</h1>
        <p className="text-gray-500 text-sm md:text-base">We&apos;d love to hear from you. Here&apos;s how you can reach us.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
        <div className="bg-white p-6 md:p-8 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-gray-100 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-brand-black">
            <Phone size={20} className="md:w-6 md:h-6" />
          </div>
          <h3 className="font-serif text-base md:text-lg font-bold mb-2">Phone</h3>
          <p className="text-gray-500 text-xs md:text-sm mb-1">+92 371 0483155</p>
          <p className="text-gray-500 text-xs md:text-sm">Mon-Sat, 9am - 6pm</p>
        </div>
        <div className="bg-white p-6 md:p-8 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-gray-100 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-brand-black">
            <Mail size={20} className="md:w-6 md:h-6" />
          </div>
          <h3 className="font-serif text-base md:text-lg font-bold mb-2">Email</h3>
          <p className="text-gray-500 text-xs md:text-sm mb-1">support@saimethnic.com</p>
          <p className="text-gray-500 text-xs md:text-sm">info@saimethnic.com</p>
        </div>
        <div className="bg-white p-6 md:p-8 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-gray-100 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-brand-black">
            <MapPin size={20} className="md:w-6 md:h-6" />
          </div>
          <h3 className="font-serif text-base md:text-lg font-bold mb-2">Location</h3>
          <p className="text-gray-500 text-xs md:text-sm">123 Fashion Avenue</p>
          <p className="text-gray-500 text-xs md:text-sm">Liberty Market, Lahore</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 shadow-sm">
        {submitted ? (
          <div className="text-center py-8 md:py-12">
            <h3 className="font-serif text-xl md:text-2xl mb-3 md:mb-4 text-green-600">Message Sent!</h3>
            <p className="text-gray-500 text-sm md:text-base">Thank you for contacting us. We will get back to you shortly.</p>
            <button onClick={() => setSubmitted(false)} className="mt-4 md:mt-6 underline text-xs md:text-sm">Send another message</button>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-xl md:text-2xl mb-4 md:mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-xs md:text-sm text-gray-600 mb-1">Name</label>
                  <input required className="w-full border border-gray-300 p-2.5 md:p-3 text-sm md:text-base focus:outline-none focus:border-brand-black" type="text" />
                </div>
                <div>
                  <label className="block text-xs md:text-sm text-gray-600 mb-1">Email</label>
                  <input required className="w-full border border-gray-300 p-2.5 md:p-3 text-sm md:text-base focus:outline-none focus:border-brand-black" type="email" />
                </div>
              </div>
              <div>
                <label className="block text-xs md:text-sm text-gray-600 mb-1">Subject</label>
                <input required className="w-full border border-gray-300 p-2.5 md:p-3 text-sm md:text-base focus:outline-none focus:border-brand-black" type="text" />
              </div>
              <div>
                <label className="block text-xs md:text-sm text-gray-600 mb-1">Message</label>
                <textarea required rows={5} className="w-full border border-gray-300 p-2.5 md:p-3 text-sm md:text-base focus:outline-none focus:border-brand-black"></textarea>
              </div>
              <button 
                type="submit"
                className="bg-brand-black text-white px-6 md:px-8 py-2.5 md:py-3 uppercase tracking-widest text-xs md:text-sm font-bold hover:bg-gold-500 transition-colors flex items-center space-x-2"
              >
                <span>Send Message</span>
                <Send size={14} className="md:w-4 md:h-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
