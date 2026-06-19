import React, { useState, useMemo } from 'react';
import { Package } from '../types';
import { PACKAGES } from '../data';
import { Search, Clock, ShieldCheck, Star, Ship, ArrowRight, CheckCircle2, DollarSign, Filter, Sparkles } from 'lucide-react';

interface PackagesSectionProps {
  onViewDetails: (pkg: Package) => void;
  onBookNow: (pkgId: string) => void;
  preselectedType?: 'haj' | 'umrah' | null;
}

export default function PackagesSection({ onViewDetails, onBookNow, preselectedType }: PackagesSectionProps) {
  // State for search & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'haj' | 'umrah'>(
    preselectedType ? preselectedType : 'all'
  );
  const [filterCategory, setFilterCategory] = useState<'all' | 'Economy' | 'Premium' | 'VIP'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(800000);

  // Sync types if preselected type changes
  React.useEffect(() => {
    if (preselectedType) {
      setFilterType(preselectedType);
    }
  }, [preselectedType]);

  // Format price in BDT
  const formatBDT = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Filtered list
  const filteredPackages = useMemo(() => {
    return PACKAGES.filter((pkg) => {
      const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.makkahHotel.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesType = filterType === 'all' ? true : pkg.type === filterType;
      const matchesCategory = filterCategory === 'all' ? true : pkg.category === filterCategory;
      const matchesPrice = pkg.price <= maxPrice;

      return matchesSearch && matchesType && matchesCategory && matchesPrice;
    });
  }, [searchQuery, filterType, filterCategory, maxPrice]);

  return (
    <section className="py-16 bg-[#FAF9F6] relative" id="packages-catalog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-brand-green font-extrabold text-xs uppercase tracking-widest bg-brand-lightgreen px-3.5 py-1.5 rounded-full border border-brand-green/20">
            Sacred Travel Catalogue
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-brand-green mt-3">
            Haj & Umrah Packages 1448H
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-600 mt-4 text-sm sm:text-base leading-relaxed">
            All pricing formatted in <strong className="text-brand-green">Bangladeshi Taka (BDT)</strong> under complete transparency guidelines. Secure your registration today.
          </p>
        </div>

        {/* Searching and filter controls block */}
        <div className="bg-white rounded-3xl border border-brand-gold/20 p-5 mb-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Search input (4/12 col) */}
            <div className="lg:col-span-4 relative">
              <input
                type="text"
                placeholder="Search by hotel, package, inclusions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-brand-gold focus:bg-white rounded-xl text-sm focus:outline-none transition"
              />
              <Search className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
            </div>

            {/* Type toggle ('all', 'haj', 'umrah') (3/12 col) */}
            <div className="lg:col-span-3 flex bg-gray-50 border border-gray-200 p-1.5 rounded-xl">
              {['all', 'haj', 'umrah'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type as any)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase transition cursor-pointer select-none ${
                    filterType === type
                      ? 'bg-brand-green text-white shadow-sm'
                      : 'text-gray-600 hover:text-brand-green'
                  }`}
                >
                  {type === 'all' ? 'All Packages' : type === 'haj' ? 'Hajj' : 'Umrah'}
                </button>
              ))}
            </div>

            {/* Category selection (Economy, Premium, VIP) (2/12 col) */}
            <div className="lg:col-span-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as any)}
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:border-brand-gold"
              >
                <option value="all">Any Category</option>
                <option value="Economy">Economy</option>
                <option value="Premium">Premium Luxury</option>
                <option value="VIP">Royal VIP</option>
              </select>
            </div>

            {/* Price slider (3/12 col) */}
            <div className="lg:col-span-3 bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex flex-col justify-center">
              <div className="flex justify-between items-center text-[11px] font-bold text-gray-600 mb-1">
                <span>Max Budget:</span>
                <span className="text-brand-green">{formatBDT(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="150000"
                max="800000"
                step="25000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-brand-gold cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* Dynamic results layout */}
        {filteredPackages.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl p-8 max-w-md mx-auto">
            <Filter size={48} className="mx-auto text-brand-gold/60 mb-4 animate-pulse" />
            <h3 className="font-display font-bold text-lg text-brand-green">No Packages Matched</h3>
            <p className="text-xs text-gray-500 mt-2">Adjust your filters, budget slider range, or change search keyword terms to see other package configurations.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setFilterType('all');
                setFilterCategory('all');
                setMaxPrice(800000);
              }}
              className="mt-5 px-4 py-2 bg-brand-green hover:bg-brand-green/95 text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => {
              const isHaj = pkg.type === 'haj';
              const isVIP = pkg.category === 'VIP';
              
              return (
                <div
                  key={pkg.id}
                  className={`bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between border-2 group ${
                    isVIP 
                      ? 'border-brand-gold scale-[1.01] bg-gradient-to-b from-[#FEFBEC]/30 to-white' 
                      : isHaj
                      ? 'border-brand-gold/20'
                      : 'border-transparent'
                  }`}
                  id={`pkg-card-${pkg.id}`}
                >
                  
                  {/* Package Top Cover Image with Ribbon badges */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={pkg.gallery[0]}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Ribbon badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md ${
                        isHaj ? 'bg-brand-green border border-brand-gold/30' : 'bg-brand-darkgold'
                      }`}>
                        {isHaj ? '🕌 Hajj 1448H' : '🌙 Umrah Service'}
                      </span>
                      
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide text-gray-900 border ${
                        pkg.category === 'VIP' 
                          ? 'bg-amber-300 border-amber-500' 
                          : pkg.category === 'Premium' 
                          ? 'bg-teal-100 border-teal-300 text-teal-800' 
                          : 'bg-gray-100 border-gray-300 text-gray-700'
                      }`}>
                        {pkg.category} Package
                      </span>
                    </div>

                    {/* Flight brand logo visual on overlay */}
                    <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md font-sans">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>Dhaka Direct Flight Carrier Partner</span>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-3 right-4 bg-brand-gold text-brand-green px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-md">
                      {pkg.duration} Days
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    
                    <div className="space-y-4">
                      {/* Package Name with category highlight */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-brand-darkgold font-bold">
                          <Star size={12} fill="currentColor" />
                          <Star size={12} fill="currentColor" />
                          <Star size={12} fill="currentColor" />
                          <span>Guaranteed Standard Match</span>
                        </div>
                        <h3 className="text-lg font-bold text-brand-green leading-snug group-hover:text-brand-darkgold transition duration-200">
                          {pkg.name}
                        </h3>
                      </div>

                      {/* Hotel features breakdown */}
                      <div className="grid grid-cols-1 gap-2 pt-1.5 pb-2 text-xs border-y border-gray-100">
                        <div className="flex items-start gap-2">
                          <span className="text-gray-400 font-bold">🕋 Makkah Stay:</span>
                          <span className="text-gray-700 font-medium line-clamp-1">{pkg.makkahHotel}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-400 font-bold">🕌 Madina Stay:</span>
                          <span className="text-gray-700 font-medium line-clamp-1">{pkg.madinaHotel}</span>
                        </div>
                      </div>

                      {/* Highlighted Facilities */}
                      <div className="space-y-2 py-0.5 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="text-brand-gold font-bold">⭐</span>
                          <span className="line-clamp-1"><strong>Hotel:</strong> {pkg.facilities.hotel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-brand-gold font-bold">⭐</span>
                          <span className="line-clamp-1"><strong>Flight:</strong> {pkg.facilities.flight}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-brand-gold font-bold">⭐</span>
                          <span className="line-clamp-1"><strong>Food:</strong> {pkg.facilities.food}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-brand-gold font-bold">⭐</span>
                          <span className="line-clamp-1"><strong>Transport:</strong> {pkg.facilities.transport}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price and Navigation trigger area */}
                    <div className="pt-6 mt-5 border-t border-gray-100">
                      
                      <div className="flex items-baseline justify-between mb-4">
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Per Pilgrim Price</span>
                        <div className="text-right">
                          <span className="text-2xl font-black text-brand-green tracking-tight font-sans">
                            {formatBDT(pkg.price)}
                          </span>
                          <span className="text-[10px] text-gray-500 block mt-0.5 font-semibold">BDT All-Inclusive</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => onViewDetails(pkg)}
                          className="py-2.5 bg-gray-50 hover:bg-brand-lightgold hover:text-brand-green border border-gray-200 hover:border-brand-gold rounded-xl text-xs font-bold text-gray-700 text-center transition cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => onBookNow(pkg.id)}
                          className="py-2.5 bg-brand-green hover:bg-brand-green/95 text-white rounded-xl text-xs font-black text-center shadow-sm hover:shadow transition transform active:scale-95 border-b border-brand-darkgold cursor-pointer"
                        >
                          Book Now
                        </button>
                      </div>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
