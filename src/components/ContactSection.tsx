import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle, MessageCircle, ExternalLink, Calendar } from 'lucide-react';

export default function ContactSection() {
  // Contact feedback states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [subject, setSubject] = useState('Haj Query');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [errorFields, setErrorFields] = useState('');

  // Branches details state
  const [selectedBranch, setSelectedBranch] = useState<'dhaka' | 'ctg' | 'sylhet'>('dhaka');

  const branches = {
    dhaka: {
      name: 'Noor Travel BD (Dhaka Head Office)',
      address: 'House 12/B, Road 4 (Ground Floor), Kakrail, Dhaka-1200, Bangladesh',
      landmark: 'Opposite of Kakrail Mosque, Near Rajmoni Ishakha Hotel',
      phone: '+880 1712-345678, +880 2-9856412',
      email: 'dhaka@noortravelbd.com',
      hours: 'Saturday - Thursday: 9:00 AM - 8:00 PM',
      coordinates: '23.7398° N, 90.4101° E'
    },
    ctg: {
      name: 'Noor Travel BD (Chittagong Branch)',
      address: 'Al-Nur Shopping Center (3rd Floor), GEC Circle, Chittagong-4000, Bangladesh',
      landmark: 'Beside Peninsular Hotel, GEC More',
      phone: '+880 1799-887766, +880 31-654321',
      email: 'ctg@noortravelbd.com',
      hours: 'Saturday - Thursday: 10:00 AM - 7:00 PM',
      coordinates: '22.3592° N, 91.8219° E'
    },
    sylhet: {
      name: 'Noor Travel BD (Sylhet Branch)',
      address: 'East Zindabazar Golden Tower (Block-C), Sylhet-3100, Bangladesh',
      landmark: 'Near Al-Hamra Shopping City, Zindabazar More',
      phone: '+880 1755-112233',
      email: 'sylhet@noortravelbd.com',
      hours: 'Saturday - Thursday: 10:00 AM - 6:00 PM',
      coordinates: '24.8917° N, 91.8683° E'
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorFields('');
    
    // Validations
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorFields('Please fill out your Name, Email, and Message detail.');
      return;
    }

    if (mobile.trim() && mobile.length < 11) {
      setErrorFields('Please provide a proper 11-digit Bangladeshi contact number.');
      return;
    }

    setIsSent(true);
    setName('');
    setEmail('');
    setMobile('');
    setMessage('');
  };

  return (
    <section className="py-16 bg-white border-t border-gray-100" id="contact-us-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-brand-darkgold font-bold text-xs uppercase tracking-widest bg-brand-lightgold px-3.5 py-1.5 rounded-full border border-brand-gold/20">
            Reach Out Anytime
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-brand-green mt-3">
            Contact Noor Travel BD
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-600 mt-4 text-sm sm:text-base leading-relaxed">
            Need custom pricing, infant passports guidance or wish to arrange a physical appointment? Speak to our local team or send us an instant online bulletin.
          </p>
        </div>

        {/* Dual column contacts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form & quick cards (lg: 7/12) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-[#FAF9F6] rounded-3xl border border-brand-gold/15 p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-brand-green mb-1 flex items-center gap-2">
                ✉️ Send An Instant Query Bulletin
              </h3>
              <p className="text-xs text-gray-500 mb-6 font-semibold">Our expert Moallims or agents will answer with detailed schedules in your email within 1 hour.</p>
              
              {isSent ? (
                <div className="p-6 text-center space-y-3 bg-white border border-brand-green/20 rounded-2xl">
                  <div className="w-12 h-12 bg-brand-lightgreen text-brand-green rounded-full flex items-center justify-center mx-auto border border-brand-green/30">
                    <CheckCircle size={24} />
                  </div>
                  <h4 className="font-bold text-brand-green text-md">Query Bulletin Placed!</h4>
                  <p className="text-xs text-gray-600">Alhamdulillah, we have secured your inquiry parameters. A supervisor will call you back soon.</p>
                  <button 
                    onClick={() => setIsSent(false)}
                    className="text-xs text-brand-green hover:underline cursor-pointer font-bold"
                  >
                    Send Another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  {errorFields && (
                    <p className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-bold font-sans">
                      ⚠️ {errorFields}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">Full Name *</label>
                      <input
                        type="text"
                        placeholder="Mohammad Harun"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2.5 bg-white border border-gray-200 focus:border-brand-gold rounded-xl text-xs focus:outline-none transition font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">Email Address *</label>
                      <input
                        type="email"
                        placeholder="harun@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2.5 bg-white border border-gray-200 focus:border-brand-gold rounded-xl text-xs focus:outline-none transition font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">Mobile Number (Optional)</label>
                      <input
                        type="tel"
                        placeholder="e.g. 017XXXXXXXX"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full p-2.5 bg-white border border-gray-200 focus:border-brand-gold rounded-xl text-xs focus:outline-none transition font-sans font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">Query Motif</label>
                      <select 
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full p-2.5 bg-white border border-gray-200 focus:border-brand-gold rounded-xl text-xs font-bold text-gray-700 focus:outline-none"
                      >
                        <option value="Haj Query">Haj Package Booking</option>
                        <option value="Umrah Query">Umrah Services Config</option>
                        <option value="Visa Service">Saudi E-Visa Guidance</option>
                        <option value="Corporate Group">Custom Group travel plans</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">Your Question / Message *</label>
                    <textarea
                      placeholder="Write your details in Bengali or English. Describe traveler counts, approximate departure plans, or hotel criteria..."
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-2.5 bg-white border border-gray-200 focus:border-brand-gold rounded-xl text-xs focus:outline-none transition font-medium"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-green hover:bg-brand-green/95 text-white font-bold rounded-xl text-xs flex justify-center items-center gap-2 shadow-sm transition cursor-pointer font-sans tracking-wider uppercase"
                  >
                    <Send size={12} />
                    <span>Send Query Bulletin</span>
                  </button>

                </form>
              )}

            </div>

            {/* Helpline Social Contacts cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-wide block mb-1">Instant Chat</span>
                  <p className="text-xs text-gray-600 leading-normal">Get instant automated package charts and scholar replies on WhatsApp.</p>
                </div>
                {/* Real-world BD redirection standard link */}
                <a 
                  href="https://wa.me/8801712345678" 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-black text-emerald-700 hover:underline"
                >
                  <MessageCircle size={14} fill="currentColor" />
                  <span>Chat WhatsApp</span>
                </a>
              </div>

              <div className="bg-brand-lightgold/40 border border-brand-gold/15 p-4 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-brand-darkgold font-extrabold uppercase tracking-wide block mb-1">Dhaka Hotline</span>
                  <p className="text-xs text-gray-600 leading-normal">Speak directly to an experienced director or scholar guide directly.</p>
                </div>
                <a href="tel:+8801712345678" className="mt-3 text-xs font-black text-brand-green hover:underline">
                  📞 +880 1712345678
                </a>
              </div>

              <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wide block mb-1">Official Emails</span>
                  <p className="text-xs text-gray-600 leading-normal">Submit passport copies and document scans for pilgrim visa clearance.</p>
                </div>
                <span className="mt-3 text-xs font-bold text-gray-700">
                  info@noortravelbd.com
                </span>
              </div>

            </div>

          </div>

          {/* Right Column: Physical branch toggler & visual styled local map (lg: 5/12) */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6 flex flex-col justify-between">
            
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-md flex-1 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <span className="text-xs font-bold text-brand-darkgold block uppercase tracking-wider">Branch Details & Operations</span>
                
                {/* Branch trigger selectors */}
                <div className="flex gap-1.5 p-1 bg-gray-100 rounded-xl">
                  {Object.keys(branches).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedBranch(key as any)}
                      className={`flex-1 py-2 text-xs font-black rounded-lg transition uppercase select-none cursor-pointer ${
                        selectedBranch === key
                          ? 'bg-brand-green text-white shadow-sm'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {key === 'dhaka' ? 'Dhaka' : key === 'ctg' ? 'Chittagong' : 'Sylhet'}
                    </button>
                  ))}
                </div>

                {/* Selected branch parameters details card */}
                <div className="p-5 rounded-2xl bg-brand-lightgold/30 border border-brand-gold/15 space-y-4 animate-fade-in">
                  <h4 className="font-display font-bold text-brand-green text-lg">{branches[selectedBranch].name}</h4>
                  
                  <div className="space-y-3 text-xs text-gray-700">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-brand-darkgold flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Physical Location Address:</strong>
                        <p className="mt-0.5 text-gray-600 leading-normal font-sans">{branches[selectedBranch].address}</p>
                        <p className="mt-1 text-[11px] text-brand-darkgold font-semibold">📍 Landmark: {branches[selectedBranch].landmark}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Phone size={14} className="text-brand-darkgold flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Local Office Phones:</strong>
                        <p className="mt-0.5 font-sans font-semibold text-brand-green">{branches[selectedBranch].phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Calendar size={14} className="text-brand-darkgold flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Visiting Hours:</strong>
                        <p className="mt-0.5 text-gray-600 font-semibold">{branches[selectedBranch].hours}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* HIGH FIDELITY GEOGRAPHICAL MAP PREVIEW CARD (Simulated Interactive) */}
              <div className="h-64 rounded-2xl bg-[#EBE5D6] relative overflow-hidden border border-gray-200 flex flex-col justify-end p-4 shadow-sm select-none">
                
                {/* Visual Representation of Dhaka city with Baitul Mukarram and Kakrail branch map pins */}
                <div className="absolute inset-0 opacity-45 bg-[radial-gradient(#AA7C11_0.5px,transparent_0.5px)] bg-[size:16px_16px]"></div>
                
                {/* Rivers and Roads representation elements */}
                <div className="absolute top-[30%] left-0 right-0 h-4 bg-amber-200/50 transform rotate-12 blur-xs"></div>
                <div className="absolute top-0 bottom-0 left-[40%] w-6 bg-[#A1C6EC]/40 transform -rotate-45 blur-2xs"></div>

                <div className="absolute top-8 left-1/4 text-[10px] text-gray-500 font-extrabold uppercase tracking-widest pointer-events-none">
                  KRAIL VIP ROAD
                </div>

                <div className="absolute bottom-16 right-10 text-[10px] text-gray-500 font-extrabold uppercase tracking-widest pointer-events-none">
                  MOTIJHEEL C/A
                </div>

                {/* Pin 1: Baitul Mukarram Mosque */}
                <div className="absolute bottom-16 left-1/3 group cursor-pointer">
                  <div className="w-3 h-3 bg-brand-green border-2 border-white rounded-full animate-ping absolute"></div>
                  <div className="w-3 h-3 bg-brand-green border-2 border-white rounded-full relative"></div>
                  <span className="absolute left-4 -top-1 bg-white border border-gray-200 rounded px-1 text-[8px] font-black uppercase text-brand-green shadow truncate max-w-[120px]">
                    🕌 Baitul Mukarram
                  </span>
                </div>

                {/* Pin 2: Active Selected Branch locator */}
                <div className="absolute top-1/3 right-1/4 group cursor-pointer">
                  <div className="w-5 h-5 bg-brand-gold border-2 border-white rounded-full animate-pulse absolute -left-1 -top-1"></div>
                  <div className="flex items-center justify-center w-5 h-5 bg-brand-green text-brand-gold rounded-full relative border border-brand-gold">
                    🌟
                  </div>
                  <div className="absolute -left-16 -top-10 bg-brand-green text-white rounded-lg px-2.5 py-1 text-[9px] font-extrabold shadow-lg border border-brand-gold flex items-center gap-1 w-32 justify-between">
                    <span className="truncate">NOOR OFFICE</span>
                    <span className="text-brand-gold text-[8px] animate-bounce">📍</span>
                  </div>
                </div>

                {/* Map Bottom badge */}
                <div className="relative bg-white/95 backdrop-blur-sm p-2.5 rounded-xl border border-gray-100 flex justify-between items-center z-10 shadow-md">
                  <div className="text-left">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase">Physical Coordinates</span>
                    <strong className="text-xs text-brand-green font-mono">{branches[selectedBranch].coordinates}</strong>
                  </div>
                  <a 
                    href={`https://maps.google.com/?q=${branches[selectedBranch].name}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1 bg-brand-gold hover:bg-brand-gold/90 text-brand-green px-3 py-1 text-[10px] font-black rounded-lg transition cursor-pointer"
                  >
                    <span>Google Map</span>
                    <ExternalLink size={10} />
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
