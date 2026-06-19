import React, { useState } from 'react';
import { FAQS } from '../data';
import { HelpCircle, ChevronRight, ChevronDown, CheckSquare, RefreshCw } from 'lucide-react';

export default function FAQSection() {
  const [activeFAQ, setActiveFAQ] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'General' | 'Haj' | 'Umrah' | 'Visa'>('all');

  const categories = ['all', 'Haj', 'Umrah', 'Visa', 'General'];

  const filteredFAQs = FAQS.filter((faq) => {
    return selectedCategory === 'all' ? true : faq.category === selectedCategory;
  });

  return (
    <section className="py-16 bg-white" id="pilgrim-faq-guide">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-brand-darkgold font-bold text-xs uppercase tracking-widest bg-brand-lightgold px-3.5 py-1.5 rounded-full border border-brand-gold/20">
            Guidebook & Knowledge base
          </span>
          <h2 className="text-3xl font-display font-black text-brand-green mt-3">
            Haj & Umrah FAQs (Dhaka Office)
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 mt-4 text-xs sm:text-sm leading-relaxed">
            Essential queries regarding baggage guidelines, vaccinations, hotel distance checks, and Saudi Ministry laws answered clearly for Bengali travellers.
          </p>
        </div>

        {/* Category triggers */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8 bg-gray-50 p-2 rounded-2xl border border-gray-100 max-w-lg mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition select-none uppercase cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-brand-green text-white shadow'
                  : 'text-gray-500 hover:text-brand-green hover:bg-white'
              }`}
            >
              {cat === 'all' ? 'All Questions' : cat}
            </button>
          ))}
        </div>

        {/* Accordions stream */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => {
            const isOpen = activeFAQ === faq.id;
            
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen
                    ? 'border-brand-gold bg-brand-lightgold/30 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Accordion header button */}
                <button
                  onClick={() => setActiveFAQ(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left text-brand-green font-bold text-sm sm:text-base cursor-pointer focus:outline-none select-none hover:text-brand-darkgold transition-colors duration-150"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle size={18} className="text-brand-gold flex-shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <div>
                    {isOpen ? (
                      <ChevronDown size={18} className="text-brand-darkgold" />
                    ) : (
                      <ChevronRight size={18} className="text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Accordion expand block */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans border-t border-brand-gold/10 bg-white/70 animate-fade-in">
                    <p className="mt-1">{faq.answer}</p>
                    <div className="mt-3.5 flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-100 pt-3">
                      <span>Category: <strong className="text-brand-green uppercase font-bold">{faq.category}</strong></span>
                      <span className="text-brand-darkgold font-semibold">✓ Verified under MoH guidelines</span>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
