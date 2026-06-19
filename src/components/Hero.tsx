import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles, ChevronRight, CheckCircle2, RefreshCw } from 'lucide-react';

interface HeroProps {
  onOpenBookingModal: (pkgId?: string) => void;
  onNavigateToPackages: () => void;
}

export default function Hero({ onOpenBookingModal, onNavigateToPackages }: HeroProps) {
  // Carousel Slider Images and Captions
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=1600',
      tag: 'HOLY MAKKAH',
      title: 'Haj & Umrah Trusted Partner',
      subtitle: 'Perform your sacred rituals with utmost peacefulness and full dignity from Bangladesh.',
    },
    {
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1600',
      tag: 'BELOVED MADINA',
      title: 'Offer Salam at the Prophet’s Mosque',
      subtitle: 'Stay in certified 5★ hotels merely steps from the gates of Masjid al-Nabawi.',
    },
    {
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1600',
      tag: 'BIMAN BANGLADESH AIRLINES',
      title: 'Direct Non-Stop Special Flights',
      subtitle: 'Enjoy maximum passenger comfort on board our aircraft partners with authentic Bangladeshi meals.',
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Hajj countdown timer logic
  // Since time is June 19, 2026, let's target Hajj 1448 Hijri (Estimated around May 16, 2027)
  const targetDate = new Date('2027-05-16T00:00:00+06:00'); // Dhaka Time
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-black select-none overflow-hidden" id="hero-slider-section">
      {/* Background slide container */}
      <div className="relative h-[550px] sm:h-[650px] md:h-[600px] w-full">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-50' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.tag}
              className="w-full h-full object-cover transform scale-105 transition-all duration-[6000ms] ease-linear"
              referrerPolicy="no-referrer"
            />
            {/* Dark green overlay for elegant Islamic contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#04130C] via-[#04130C]/80 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Floating Crescent Decorative Elements on Desktop */}
      <div className="absolute top-10 right-10 opacity-30 pointer-events-none hidden lg:block animate-pulse">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
          <path d="M40,10 C60,10 75,25 75,45 C75,65 60,80 40,80 C32,80 25,76 20,70 C35,74 52,68 58,54 C64,40 58,22 43,15 C42,14.6 41,14.2 40,10 Z" fill="#E5B224" />
          <polygon points="50,20 53,27 60,27 55,31 57,38 50,34 43,38 45,31 40,27 47,27" fill="#E5B224" />
        </svg>
      </div>

      {/* Hero Content - Placed centrally on top of background */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold text-brand-gold text-xs font-semibold tracking-wider uppercase animate-bounce-slow">
            <Sparkles size={14} />
            <span>{slides[currentSlide].tag}</span>
          </div>

          {/* Golden Islamic Style Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight">
            Noor Travel BD <br/> 
            <span className="text-brand-gold font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 block">
              Haj & Umrah Trusted Travel Partner from Bangladesh
            </span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {slides[currentSlide].subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
            <button
              onClick={() => onOpenBookingModal()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold text-brand-green font-extrabold rounded-xl shadow-lg shadow-brand-gold/10 hover:shadow-brand-gold/30 hover:bg-brand-gold/90 transition-all duration-200 transform scale-100 hover:scale-102 cursor-pointer"
              id="hero-booking-btn"
            >
              <span>Book Your Package Now</span>
              <ChevronRight size={18} />
            </button>
            <button
              onClick={onNavigateToPackages}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition cursor-pointer"
            >
              <span>Explore Packages</span>
            </button>
          </div>

          {/* Quick guarantees badge */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-xs font-medium text-gray-300">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-brand-gold" />
              100% Authorized Visas
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-brand-gold" />
              Premium Hotels Near Haram
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-brand-gold" />
              Direct Flights (Biman/Saudia)
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-brand-gold" />
              Bangladeshi Cooked Food
            </span>
          </div>

        </div>
      </div>

      {/* Slide Navigation Indicators */}
      <div className="absolute bottom-32 sm:bottom-28 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              idx === currentSlide ? 'bg-brand-gold scale-125' : 'bg-white/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* HAJJ 1448H COUNTDOWN TICKER BOX */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-brand-green/90 border-t border-brand-gold/30 backdrop-blur-md text-white py-3 sm:py-4 px-4 select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-brand-gold/25 border border-brand-gold/30 text-brand-gold">
              <Calendar size={22} className="animate-pulse" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs text-brand-gold font-bold tracking-widest uppercase">COUNTDOWN TO HAJJ 1448H</p>
              <h4 className="font-semibold text-sm sm:text-base">Pre-Registration Open (May 2027 Season)</h4>
            </div>
          </div>

          {/* Real time timer ticker boxes */}
          <div className="flex items-center gap-2 sm:gap-3 text-center">
            
            <div className="flex flex-col">
              <span className="bg-black/40 border border-white/10 text-brand-gold font-mono text-base sm:text-xl font-bold rounded-lg px-2 py-1 min-w-[44px]">
                {timeLeft.days.toString().padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-white/70 mt-1 font-medium">Days</span>
            </div>
            
            <span className="text-brand-gold text-lg font-bold -mt-4">:</span>

            <div className="flex flex-col">
              <span className="bg-black/40 border border-white/10 text-brand-gold font-mono text-base sm:text-xl font-bold rounded-lg px-2 py-1 min-w-[44px]">
                {timeLeft.hours.toString().padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-white/70 mt-1 font-medium">Hrs</span>
            </div>

            <span className="text-brand-gold text-lg font-bold -mt-4">:</span>

            <div className="flex flex-col">
              <span className="bg-black/40 border border-white/10 text-brand-gold font-mono text-base sm:text-xl font-bold rounded-lg px-2 py-1 min-w-[44px]">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-white/70 mt-1 font-medium font-bold">Mins</span>
            </div>

            <span className="text-brand-gold text-lg font-bold -mt-4">:</span>

            <div className="flex flex-col">
              <span className="bg-black/40 border border-white/10 text-brand-gold font-mono text-base sm:text-xl font-bold rounded-lg px-2 py-1 min-w-[44px]">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-white/70 mt-1 font-medium">Secs</span>
            </div>
            
          </div>

          <div className="hidden lg:block text-right">
            <span className="text-[10px] text-white/60 block uppercase font-medium">Ministry Guidelines</span>
            <span className="text-xs text-brand-gold font-semibold">NID Card & Passport Required</span>
          </div>

        </div>
      </div>
      
    </div>
  );
}
