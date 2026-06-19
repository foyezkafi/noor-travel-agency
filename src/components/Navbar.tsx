import React, { useState } from 'react';
import { Compass, Phone, Send, Eye, ShieldCheck, Menu, X, Landmark, Award } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBookingModal: (pkgId?: string) => void;
  bookingCount: number;
}

export default function Navbar({ activeTab, setActiveTab, onOpenBookingModal, bookingCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'packages', label: 'Haj & Umrah Packages' },
    { id: 'faqs', label: 'Pilgrim Guide & FAQ' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-brand-gold/20 shadow-md">
      {/* Top Banner with emergency/helpful links for BD pilgrims */}
      <div className="bg-brand-green text-white py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4 font-sans">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[11px] sm:text-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              Govt APPROVED Agency Code: <strong className="text-brand-gold">BD-HAJJ-1448</strong>
            </span>
            <span className="hidden md:inline text-white/80">|</span>
            <span className="hidden md:inline">Trusted by 12,000+ Bangladeshi Pilgrims Since 2012</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+8801712345678" className="flex items-center gap-1 hover:text-brand-gold transition duration-150">
              <Phone size={12} className="text-brand-gold" />
              <span>Hotline: +880 1712-345678</span>
            </a>
            <span className="hidden sm:inline text-white/50">|</span>
            <button 
              onClick={() => setActiveTab('admin')} 
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold cursor-pointer transition ${
                activeTab === 'admin' 
                  ? 'bg-brand-gold text-brand-green' 
                  : 'bg-white/10 hover:bg-brand-gold hover:text-brand-green'
              }`}
              id="admin-dashboard-btn"
            >
              <ShieldCheck size={12} />
              <span>Pilgrim Portal {bookingCount > 0 && <span className="bg-red-500 text-white rounded-full px-1.5 py-0.2 text-[9px]">{bookingCount}</span>}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo with star and crescent islamic brand aesthetic */}
          <div className="flex items-center">
            <button 
              onClick={() => setActiveTab('home')} 
              className="flex items-center gap-3 group text-left cursor-pointer"
            >
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-brand-green text-brand-gold overflow-hidden transition-all duration-300 group-hover:scale-105 shadow-inner border border-brand-gold">
                {/* Background dome graphic representing mosque style */}
                <div className="absolute -bottom-1 w-10 h-7 rounded-t-full bg-brand-darkgold/30"></div>
                {/* Compass or crescent sign representing Noor (Light / Guidance) */}
                <Compass size={24} className="animate-spin-slow text-brand-gold z-10" />
              </div>
              <div>
                <span className="font-display block text-xl sm:text-2xl font-bold tracking-tight text-brand-green leading-none">
                  NOOR <span className="text-brand-gold">TRAVEL BD</span>
                </span>
                <span className="text-[10px] sm:text-xs font-sans text-gray-500 uppercase tracking-widest block mt-0.5 font-medium">
                  Haj & Umrah Trusted Partner
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  activeTab === item.id
                    ? 'text-brand-green bg-brand-lightgold shadow-sm border-b-2 border-brand-gold'
                    : 'text-gray-700 hover:text-brand-green hover:bg-gray-50'
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Quick action button */}
            <div className="pl-4">
              <button
                onClick={() => onOpenBookingModal()}
                className="flex items-center gap-2 px-5 py-2.5 bg-brand-green hover:bg-brand-green/90 text-white rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-95 border-b-2 border-brand-darkgold cursor-pointer"
                id="cta-book-packages"
              >
                <Award size={16} className="text-brand-gold animate-pulse" />
                <span>Book Package Now</span>
              </button>
            </div>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-brand-green hover:text-brand-gold hover:bg-brand-lightgold focus:outline-none transition duration-150 cursor-pointer"
              aria-expanded="false"
              id="mobile-menu-trigger"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-brand-gold/20 animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-md text-base font-semibold ${
                  activeTab === item.id
                    ? 'bg-brand-lightgold text-brand-green border-l-4 border-brand-gold'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-brand-green'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setActiveTab('admin');
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-md text-base font-semibold ${
                activeTab === 'admin'
                  ? 'bg-brand-green text-white'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-brand-green'
              }`}
            >
              🔐 My Bookings & Admin Portal
            </button>

            <div className="pt-4 pb-2 px-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBookingModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-gold hover:bg-brand-gold/90 text-brand-green font-bold rounded-lg shadow-md transition"
              >
                <Send size={16} />
                <span>Book Your Package Now</span>
              </button>
            </div>
            
            <div className="px-4 py-2 border-t border-gray-100 flex flex-col gap-1 text-xs text-gray-500">
              <p className="font-semibold text-brand-green">📍 Dhaka Main Office:</p>
              <p>House 12/B, Road 4, Kakrail, Dhaka-1200</p>
              <p>📞 Phone: +880 1712-345678</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
