import React, { useState } from 'react';
import { Package } from '../types';
import { X, CheckCircle, AlertTriangle, Calendar, Star, MapPin, Coffee, ShoppingBag, ArrowRight } from 'lucide-react';

interface PackageDetailModalProps {
  pkg: Package | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (pkgId: string) => void;
}

export default function PackageDetailModal({ pkg, isOpen, onClose, onBookNow }: PackageDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'inclusion'>('overview');
  const [activeImage, setActiveImage] = useState<string>('');

  React.useEffect(() => {
    if (pkg && pkg.gallery && pkg.gallery.length > 0) {
      setActiveImage(pkg.gallery[0]);
    }
    setActiveTab('overview');
  }, [pkg]);

  if (!isOpen || !pkg) return null;

  // Format amount to BDT
  const formatBDT = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Dark overlay backdrop */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-black/60 backdrop-blur-xs cursor-pointer" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Set vertical centring helper */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal Window Panel */}
        <div className="relative z-10 inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-3xl shadow-2xl sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-brand-gold/20 w-full">
          
          {/* Header Banner */}
          <div className="bg-brand-green py-5 px-6 sm:px-8 text-white flex justify-between items-center relative border-b-4 border-brand-gold">
            <div>
              <span className="text-brand-gold text-[10px] uppercase tracking-widest font-extrabold">{pkg.type} 1448h sacred journey</span>
              <h3 className="text-lg sm:text-2xl font-display font-black tracking-tight mt-0.5" id="modal-title">
                {pkg.name}
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer"
            >
              <X size={22} />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Upper grid details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-2">
              
              {/* Left Column: Image Gallerizer (md: 6/12 col) */}
              <div className="md:col-span-6 space-y-3">
                <div className="h-64 rounded-2xl overflow-hidden border border-gray-100 shadow-inner relative">
                  <img 
                    src={activeImage || pkg.gallery[0]} 
                    alt="Haram Sanctuary" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white font-mono text-[9px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                    Official Photo Gallery
                  </div>
                </div>
                
                {/* Thumbnails list */}
                <div className="flex gap-2.5 overflow-x-auto py-1">
                  {pkg.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 cursor-pointer transition ${
                        (activeImage || pkg.gallery[0]) === img ? 'border-brand-gold scale-95' : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Key summary metrics (md: 6/12 col) */}
              <div className="md:col-span-6 flex flex-col justify-between">
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-brand-lightgold/70 border border-brand-gold/20 p-4 rounded-xl">
                    <div>
                      <span className="text-[10px] text-brand-darkgold font-bold block uppercase tracking-wider">Estimated Cost</span>
                      <strong className="text-2xl font-black text-brand-green font-sans">{formatBDT(pkg.price)}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-500 font-bold block uppercase tracking-wider">Full Duration</span>
                      <strong className="text-lg font-extrabold text-gray-800">{pkg.duration} Days</strong>
                    </div>
                  </div>

                  {/* Certified Lodging highlights */}
                  <div className="space-y-2 text-xs">
                    <h5 className="font-bold text-brand-green uppercase tracking-wide text-[10.5px]">Lodging & Stays</h5>
                    
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-brand-gold" />
                        <div>
                          <strong className="block text-gray-800">Makkah Accommodation</strong>
                          <span className="text-gray-500 mt-0.5 block">{pkg.makkahHotel}</span>
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        {Array.from({ length: pkg.makkahHotelRating }).map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" />
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-brand-gold" />
                        <div>
                          <strong className="block text-gray-800">Madina Accommodation</strong>
                          <span className="text-gray-500 mt-0.5 block">{pkg.madinaHotel}</span>
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        {Array.from({ length: pkg.madinaHotelRating }).map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" />
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => onBookNow(pkg.id)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-brand-gold hover:bg-brand-gold/90 text-brand-green font-extrabold rounded-xl shadow-md transition transform active:scale-95 border-b-2 border-brand-darkgold cursor-pointer"
                  >
                    <span>Proceed to Book This Package</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

              </div>
            </div>

            {/* TAB CONTROLS (Overview, Itinerary, Inclusion) */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px space-x-6">
                {(['overview', 'itinerary', 'inclusion'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-bold border-b-2 transition select-none cursor-pointer capitalize ${
                      activeTab === tab
                        ? 'border-brand-green text-brand-green'
                        : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tab === 'inclusion' ? 'Inclusions & Exclusions' : tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* TAB VISUAL CONTENT */}
            <div className="py-2">
              
              {/* Tab 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-4 animate-fade-in">
                  <p className="text-sm text-gray-600 leading-relaxed font-sans">
                    {pkg.description}
                  </p>
                  
                  <div className="bg-brand-lightgold/50 border border-brand-gold/15 rounded-xl p-4 space-y-2">
                    <h6 className="text-xs font-extrabold text-brand-green uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <Coffee size={14} className="text-brand-darkgold" />
                      Services at a Glance
                    </h6>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <strong>🏨 Hotel Rating:</strong> {pkg.facilities.hotel}
                      </div>
                      <div>
                        <strong>✈️ Air tickets:</strong> {pkg.facilities.flight}
                      </div>
                      <div>
                        <strong>🍛 Food:</strong> {pkg.facilities.food}
                      </div>
                      <div>
                        <strong>🚌 AC Transport:</strong> {pkg.facilities.transport}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: ITINERARY SCHEDULE */}
              {activeTab === 'itinerary' && (
                <div className="space-y-4 animate-fade-in">
                  <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wide">Sacred Daily Route Itinerary</span>
                  
                  {/* Timeline listing */}
                  <div className="relative border-l-2 border-brand-gold pl-6 ml-3 space-y-6 py-1">
                    {pkg.itinerary.map((it, idx) => (
                      <div key={idx} className="relative">
                        {/* Bullet circle */}
                        <div className="absolute -left-[31px] top-0 flex items-center justify-center w-5.5 h-5.5 rounded-full bg-brand-gold text-brand-green text-[9px] font-bold shadow-sm">
                          {idx + 1}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-brand-darkgold uppercase tracking-wide">{it.day}: {it.title}</span>
                          <p className="text-xs text-gray-600 mt-1 leading-relaxed font-sans">
                            {it.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* Tab 3: INCLUSION & EXCLUSION side by side */}
              {activeTab === 'inclusion' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                  
                  {/* Whats included */}
                  <div className="p-4 rounded-xl bg-brand-lightgreen/30 border border-brand-green/20 space-y-3">
                    <h6 className="text-[11px] font-extrabold text-[#0D3E27] uppercase tracking-wider flex items-center gap-1.5 border-b border-brand-green/15 pb-2">
                      <CheckCircle size={15} className="text-brand-green" />
                      What is Invoiced & Included
                    </h6>
                    <ul className="space-y-2 text-xs text-gray-700 font-sans">
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-brand-green font-bold text-[13px]">✓</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Whats excluded */}
                  <div className="p-4 rounded-xl bg-red-50/50 border border-red-200/50 space-y-3">
                    <h6 className="text-[11px] font-extrabold text-red-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-red-200/30 pb-2">
                      <AlertTriangle size={15} className="text-red-500" />
                      What is Excluded
                    </h6>
                    <ul className="space-y-2 text-xs text-gray-500 font-sans">
                      {pkg.exclusions.map((exc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">×</span>
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              )}

            </div>

          </div>

          {/* Footer controls */}
          <div className="bg-gray-50 py-4 px-6 sm:px-8 flex justify-end gap-3 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-100 transition cursor-pointer"
            >
              Close Details
            </button>
            <button
              onClick={() => onBookNow(pkg.id)}
              className="px-6 py-2.5 bg-brand-green hover:bg-brand-green/95 text-white text-xs font-black rounded-lg transition shadow cursor-pointer"
            >
              Book Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
