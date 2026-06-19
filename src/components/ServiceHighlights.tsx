import React, { useState } from 'react';
import { Palmtree, Plane, Hotel, ShieldCheck, HeartHandshake, FileCheck, CheckCircle, HelpCircle, RefreshCw } from 'lucide-react';

interface ServiceHighlightsProps {
  onNavigateToPackages: (type?: 'haj' | 'umrah') => void;
  onOpenBookingModal: (pkgId?: string) => void;
}

export default function ServiceHighlights({ onNavigateToPackages, onOpenBookingModal }: ServiceHighlightsProps) {
  const [activeSubTab, setActiveSubTab] = useState<'hajj' | 'umrah' | 'visa' | 'flight' | 'hotel'>('hajj');
  
  // Interactive Simulator States
  const [passportSubmit, setPassportSubmit] = useState(false);
  const [passportType, setPassportType] = useState('Standard');
  const [flightFrom, setFlightFrom] = useState('DAC');
  const [flightTo, setFlightTo] = useState('JED');
  const [flightType, setFlightType] = useState('direct');
  const [selectedRating, setSelectedRating] = useState('5star');

  return (
    <section className="py-16 bg-white border-b border-gray-100 relative" id="services-highlights-section">
      {/* Absolute floating clouds/mosque element in BG if needed */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[url('https://images.unsplash.com/photo-1542856391-010fb87dcfed')] bg-no-repeat bg-cover"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-brand-darkgold font-bold text-xs uppercase tracking-widest bg-brand-lightgold px-3.5 py-1.5 rounded-full border border-brand-gold/30">
            Professional & Spiritual Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-brand-green mt-3">
            Premium Travel Solutions & Care
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-600 mt-4 text-sm sm:text-base leading-relaxed">
            Noor Travel BD provides custom packages tailored to Bangladeshi cultural and dietary expectations. Feel at home while praying at Mount Arafat and Masjid Al-Nabawi.
          </p>
        </div>

        {/* Dynamic Grid Layout for services */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 border border-gray-100 rounded-3xl p-6 md:p-8 bg-brand-lightgold/15 shadow-inner">
          
          {/* Left Navigation Buttons */}
          <div className="md:col-span-2 flex flex-col space-y-2">
            <h3 className="text-md font-bold text-brand-green tracking-wide px-3 uppercase text-xs mb-2">Our Key Offerings</h3>
            
            <button
              onClick={() => setActiveSubTab('hajj')}
              className={`flex items-center gap-4 p-4 rounded-xl text-left transition duration-200 cursor-pointer ${
                activeSubTab === 'hajj'
                  ? 'bg-brand-green text-white shadow-lg'
                  : 'bg-white hover:bg-brand-lightgold/40 text-gray-800 border border-gray-100'
              }`}
            >
              <div className={`p-2.5 rounded-lg ${activeSubTab === 'hajj' ? 'bg-brand-gold text-brand-green' : 'bg-brand-lightgold text-brand-darkgold'}`}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Haj Pilgrimage Packages</h4>
                <p className={`text-xs mt-0.5 ${activeSubTab === 'hajj' ? 'text-gray-200' : 'text-gray-500'}`}>Haj 1448H/2027 Registration</p>
              </div>
            </button>

            <button
              onClick={() => setActiveSubTab('umrah')}
              className={`flex items-center gap-4 p-4 rounded-xl text-left transition duration-200 cursor-pointer ${
                activeSubTab === 'umrah'
                  ? 'bg-brand-green text-white shadow-lg'
                  : 'bg-white hover:bg-brand-lightgold/40 text-gray-800 border border-gray-100'
              }`}
            >
              <div className={`p-2.5 rounded-lg ${activeSubTab === 'umrah' ? 'bg-brand-gold text-brand-green' : 'bg-brand-lightgold text-brand-darkgold'}`}>
                <Palmtree size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Umrah Packages (All Year)</h4>
                <p className={`text-xs mt-0.5 ${activeSubTab === 'umrah' ? 'text-gray-200' : 'text-gray-500'}`}>Economy, Premium & VIP options</p>
              </div>
            </button>

            <button
              onClick={() => setActiveSubTab('visa')}
              className={`flex items-center gap-4 p-4 rounded-xl text-left transition duration-200 cursor-pointer ${
                activeSubTab === 'visa'
                  ? 'bg-brand-green text-white shadow-lg'
                  : 'bg-white hover:bg-brand-lightgold/40 text-gray-800 border border-gray-100'
              }`}
            >
              <div className={`p-2.5 rounded-lg ${activeSubTab === 'visa' ? 'bg-brand-gold text-brand-green' : 'bg-brand-lightgold text-brand-darkgold'}`}>
                <FileCheck size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Saudi E-Visa Assistance</h4>
                <p className={`text-xs mt-0.5 ${activeSubTab === 'visa' ? 'text-gray-200' : 'text-gray-500'}`}>Fast e-visa issues in 24 hours</p>
              </div>
            </button>

            <button
              onClick={() => setActiveSubTab('flight')}
              className={`flex items-center gap-4 p-4 rounded-xl text-left transition duration-200 cursor-pointer ${
                activeSubTab === 'flight'
                  ? 'bg-brand-green text-white shadow-lg'
                  : 'bg-white hover:bg-brand-lightgold/40 text-gray-800 border border-gray-100'
              }`}
            >
              <div className={`p-2.5 rounded-lg ${activeSubTab === 'flight' ? 'bg-brand-gold text-brand-green' : 'bg-brand-lightgold text-brand-darkgold'}`}>
                <Plane size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Direct Flight Booking</h4>
                <p className={`text-xs mt-0.5 ${activeSubTab === 'flight' ? 'text-gray-200' : 'text-gray-500'}`}>Biman Bangladesh & Saudia flights</p>
              </div>
            </button>

            <button
              onClick={() => setActiveSubTab('hotel')}
              className={`flex items-center gap-4 p-4 rounded-xl text-left transition duration-200 cursor-pointer ${
                activeSubTab === 'hotel'
                  ? 'bg-brand-green text-white shadow-lg'
                  : 'bg-white hover:bg-brand-lightgold/40 text-gray-800 border border-gray-100'
              }`}
            >
              <div className={`p-2.5 rounded-lg ${activeSubTab === 'hotel' ? 'bg-brand-gold text-brand-green' : 'bg-brand-lightgold text-brand-darkgold'}`}>
                <Hotel size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Makkah & Madina Hotels</h4>
                <p className={`text-xs mt-0.5 ${activeSubTab === 'hotel' ? 'text-gray-200' : 'text-gray-500'}`}>Stays adjacent to holy courtyards</p>
              </div>
            </button>

          </div>

          {/* Right Interactive Box (Displays details depending on active selection) */}
          <div className="md:col-span-3 bg-white rounded-2xl border border-brand-gold/20 p-6 md:p-8 flex flex-col justify-between shadow-md relative overflow-hidden">
            
            {/* Hajj Services Tab info */}
            {activeSubTab === 'hajj' && (
              <div className="space-y-5 animate-fade-in">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-brand-lightgold text-brand-darkgold text-xs font-bold font-sans">1448H Season</span>
                  <h3 className="text-xl font-display font-bold text-brand-green">Approved Government Hajj Agency</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We are a direct Hajj organizer licensed by the Ministry of Religious Affairs (MoRA), Bangladesh. Our Hajj packages provide high-grade comforts directly mapped to the central rites.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl bg-brand-lightgold/50 border border-brand-gold/10">
                    <span className="block text-xs text-gray-500">Mina Location</span>
                    <strong className="block text-sm text-brand-green mt-0.5">VIP AC Camps (Zone-A)</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-brand-lightgold/50 border border-brand-gold/10">
                    <span className="block text-xs text-gray-500">Guidance</span>
                    <strong className="block text-sm text-brand-green mt-0.5">Renowned Islamic Scholars</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-brand-lightgold/50 border border-brand-gold/10">
                    <span className="block text-xs text-gray-500">Immigration</span>
                    <strong className="block text-sm text-brand-green mt-0.5">Makkah Route Initiative (DAC Airport)</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-brand-lightgold/50 border border-brand-gold/10">
                    <span className="block text-xs text-gray-500">Diet</span>
                    <strong className="block text-sm text-brand-green mt-0.5">Traditional Deshi Chefs</strong>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateToPackages('haj')}
                  className="w-full py-3 bg-brand-green text-white text-sm font-bold rounded-lg hover:bg-brand-green/95 transition cursor-pointer"
                >
                  View Approved Haj Packages
                </button>
              </div>
            )}

            {/* Umrah Services Tab info */}
            {activeSubTab === 'umrah' && (
              <div className="space-y-5 animate-fade-in">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-brand-lightgreen text-brand-green text-xs font-bold font-sans">Year Round</span>
                  <h3 className="text-xl font-display font-bold text-brand-green">Custom Group & Private Umrah</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Perform Umrah in private family blocks or custom corporate assemblies. We organize complete tailor-made schedules from Dhaka, Chittagong, and Sylhet.
                </p>
                <div className="p-4 rounded-xl bg-brand-lightgreen/30 border border-brand-green/10 flex items-start gap-3">
                  <HeartHandshake className="text-brand-green flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h5 className="font-bold text-xs text-brand-green">14-Day Sacred Guided Program</h5>
                    <p className="text-xs text-gray-600 mt-1">Includes 7 nights in Makkah and 7 nights in Madina, with continuous Islamic lectures regarding Umrah rules.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => onNavigateToPackages('umrah')}
                    className="flex-1 py-3 bg-brand-gold text-brand-green text-sm font-bold rounded-lg hover:bg-brand-gold/90 transition cursor-pointer"
                  >
                    Explore Umrah Packages
                  </button>
                </div>
              </div>
            )}

            {/* Saudi E-Visa Assistance Tab info */}
            {activeSubTab === 'visa' && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-display font-bold text-brand-green">Saudi Tourist & Umrah E-Visa Assistance</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  As an approved Umrah agency, we submit and clear Saudi tourist and pilgrim e-visas from Bangladesh in as fast as 24-48 working hours.
                </p>
                
                {/* Simulated Passport Validity Check */}
                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 space-y-3">
                  <span className="text-[11px] font-bold text-gray-400 block uppercase">Visa Assistant Simulation</span>
                  
                  {!passportSubmit ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Passport Type</label>
                        <select 
                          value={passportType} 
                          onChange={(e) => setPassportType(e.target.value)}
                          className="w-full p-2 text-xs border border-gray-200 rounded"
                        >
                          <option value="Standard">Bangladeshi Standard Passport</option>
                          <option value="Diplomatic">Bangladeshi Government Official / Diplomatic</option>
                        </select>
                      </div>
                      <button 
                        onClick={() => setPassportSubmit(true)}
                        className="w-full py-2 bg-brand-darkgold hover:bg-brand-darkgold/90 text-white text-xs font-bold rounded cursor-pointer"
                      >
                        Check Processing Time
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2 py-1">
                      <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                        <CheckCircle size={14} />
                        <span>Eligible for 1-Year Multi-Entry Saudi Tourist / Umrah Visa!</span>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        Bangladeshi standard passport holders with permanent addresses are cleared within **24 hours**. Free consultation with our Kakrail office team included!
                      </p>
                      <button 
                        onClick={() => setPassportSubmit(false)}
                        className="text-xs text-brand-green hover:underline cursor-pointer flex items-center gap-1 font-semibold"
                      >
                        <RefreshCw size={10} /> Reset Form
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-[11.5px] text-gray-400 font-medium">⚠️ Note: Passport must have at least 6 months validity from the date of travel.</p>
              </div>
            )}

            {/* Direct Flight Booking Tab info */}
            {activeSubTab === 'flight' && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-display font-bold text-brand-green">Airline Ticket Partner</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We secure official blocked airline seats on Biman Bangladesh Airlines, Saudia and Gulf Air to guarantee competitive group rates for our pilgrims.
                </p>

                {/* Simulated Flight routes selector */}
                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 space-y-4">
                  <span className="text-[11px] font-bold text-gray-400 block uppercase">Biman Bangladesh Route Partner</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">From Airport</label>
                      <select 
                        value={flightFrom} 
                        onChange={(e) => setFlightFrom(e.target.value)}
                        className="w-full p-2 text-xs border border-gray-200 rounded font-mono bg-white"
                      >
                        <option value="DAC">Dhaka (DAC)</option>
                        <option value="CGP">Chittagong (CGP)</option>
                        <option value="ZYL">Sylhet (ZYL)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">To Airport</label>
                      <select 
                        value={flightTo} 
                        onChange={(e) => setFlightTo(e.target.value)}
                        className="w-full p-2 text-xs border border-gray-200 rounded font-mono bg-white"
                      >
                        <option value="JED">Jeddah Hajj Terminal (JED)</option>
                        <option value="MED">Madina Prince Mohammad (MED)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1.5 text-xs text-gray-700">
                      <input 
                        type="radio" 
                        name="flight_t" 
                        checked={flightType === 'direct'} 
                        onChange={() => setFlightType('direct')}
                      />
                      <span>Direct flight</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-gray-700">
                      <input 
                        type="radio" 
                        name="flight_t" 
                        checked={flightType === 'transit'} 
                        onChange={() => setFlightType('transit')}
                      />
                      <span>Transit cheaper option</span>
                    </label>
                  </div>
                  <div className="p-2.5 rounded bg-brand-lightgold text-xs text-brand-darkgold font-semibold">
                    ✈️ Average ticket rate: <span className="font-mono text-brand-green font-bold text-sm">BDT {flightType === 'direct' ? '82,500' : '68,400'}</span> (Including 30kg baggage)
                  </div>
                </div>
              </div>
            )}

            {/* Makkah & Madina Hotels Tab info */}
            {activeSubTab === 'hotel' && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-display font-bold text-brand-green">Accredited Hotel Partnership</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Noor Travel guarantees confirmed room blockings with physical distance validation. No surprise hotels or unapproved distant locations.
                </p>

                {/* Hotel Rating Selection simulation details */}
                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 space-y-4">
                  <div className="flex gap-2">
                    {['5star', '4star', '3star'].map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setSelectedRating(tier)}
                        className={`flex-1 py-1.5 rounded text-xs font-bold transition cursor-pointer ${
                          selectedRating === tier
                            ? 'bg-brand-gold text-brand-green'
                            : 'bg-white text-gray-600 border border-gray-200'
                        }`}
                      >
                        {tier === '5star' ? '5★ Luxury' : tier === '4star' ? '4★ Premium' : '3★ Economy'}
                      </button>
                    ))}
                  </div>

                  <div>
                    {selectedRating === '5star' && (
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-brand-green">👑 Pullman Zamzam Makkah & Al-Aqeeq Madina</p>
                        <p className="text-[11px] text-gray-500 leading-relaxed">
                          Distance: <strong className="text-brand-green">50 - 150 Meters</strong>, directly part of Haram courtyard complexes. Perfect for elderly and children.
                        </p>
                      </div>
                    )}
                    {selectedRating === '4star' && (
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-brand-green">🏢 Hilton Suites & Al Kiswah Modern Towers</p>
                        <p className="text-[11px] text-gray-500 leading-relaxed">
                          Distance: <strong className="text-brand-green">300 - 600 Meters</strong> or backed by complimentary non-stop 24/7 VIP coaster shuttle service.
                        </p>
                      </div>
                    )}
                    {selectedRating === '3star' && (
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-brand-green">🏨 Swiss Holiday & Tulip Inn Al Dar</p>
                        <p className="text-[11px] text-gray-500 leading-relaxed">
                          Distance: <strong className="text-brand-green">450 - 800 Meters</strong>. Best budgets, very hygienic rooms, elevator access, helpful support staff.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom contact help */}
            <div className="border-t border-gray-100 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2 font-medium mt-4">
              <span>Have specific criteria or private group needs?</span>
              <a href="tel:+8801712345678" className="text-brand-green font-bold hover:underline">
                Call Expert Guide: +880 1712-345678
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
