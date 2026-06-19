import React from 'react';
import { TESTIMONIALS } from '../data';
import { Star, MessageSquareCode, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-16 bg-[#FAF9F6] border-y border-gray-100" id="pilgrim-testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-brand-green font-bold text-xs uppercase tracking-widest bg-brand-lightgreen px-3.5 py-1.5 rounded-full border border-brand-green/20">
            Voice of Pilgrims
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-brand-green mt-3">
            Trusted by Islamic Devotees
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-600 mt-4 text-sm sm:text-base leading-relaxed">
            Read heartfelt stories from our beloved Bangladeshi brother and sister pilgrims who concluded their Haj & Umrah under our support.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
            >
              
              {/* Giant floating Quote Icon */}
              <div className="absolute right-6 top-6 opacity-8 text-brand-gold select-none pointer-events-none group-hover:scale-110 transition duration-150">
                <Quote size={40} fill="currentColor" />
              </div>
              
              {/* Rating stars */}
              <div className="space-y-4">
                <div className="flex text-amber-500 gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      fill={idx < Math.floor(t.rating) ? 'currentColor' : 'none'}
                      className={idx < Math.floor(t.rating) ? 'text-brand-gold' : 'text-gray-200'}
                    />
                  ))}
                  <span className="text-[10px] text-gray-400 font-bold ml-1">{t.rating}</span>
                </div>

                <p className="text-xs text-gray-600 italic leading-relaxed font-sans">
                  "{t.quote}"
                </p>
              </div>

              {/* Profile details */}
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-brand-lightgold shadow-inner border border-brand-gold/30">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-green">{t.name}</h4>
                  <p className="text-[10px] text-gray-400 font-semibold">{t.location} • {t.year}</p>
                  <span className="inline-block mt-0.5 bg-brand-lightgold text-brand-darkgold font-bold text-[9px] px-1.5 py-0.2 rounded">
                    {t.packageTaken}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
