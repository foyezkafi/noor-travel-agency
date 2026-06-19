import React, { useState, useEffect } from 'react';
import { Package, Booking } from '../types';
import { PACKAGES } from '../data';
import { X, Send, CreditCard, Calendar, Users, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackageId?: string;
  onBookingSubmit: (booking: Booking) => void;
}

export default function BookingFormModal({ isOpen, onClose, selectedPackageId, onBookingSubmit }: BookingFormModalProps) {
  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [packageId, setPackageId] = useState(selectedPackageId || PACKAGES[0].id);
  const [travelers, setTravelers] = useState(1);
  const [travelDate, setTravelDate] = useState('');
  const [notes, setNotes] = useState('');
  
  // Validation indicator
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedPNR, setGeneratedPNR] = useState('');

  // Sync state if selected package changes
  useEffect(() => {
    if (selectedPackageId) {
      setPackageId(selectedPackageId);
    }
  }, [selectedPackageId]);

  if (!isOpen) return null;

  // Active package pricing details
  const activePackage = PACKAGES.find(p => p.id === packageId) || PACKAGES[0];

  // Submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Field validation
    if (!name.trim()) {
      setErrorMsg('Please provide your full legal name matching your Passport/NID.');
      return;
    }
    if (!phone.trim() || phone.length < 11) {
      setErrorMsg('Please specify a valid 11-digit Bangladeshi mobile number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please input a valid email address for reservation documents.');
      return;
    }
    if (!travelDate) {
      setErrorMsg('Please specify your expected travel date.');
      return;
    }

    // Generate unique flight PNR reservation code for true immersion
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let pnr = 'NT-';
    for (let i = 0; i < 3; i++) {
      pnr += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    for (let i = 0; i < 3; i++) {
      pnr += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    const newBooking: Booking = {
      id: pnr, // Using PNR as booking ID
      name,
      phone,
      email,
      packageId,
      packageName: activePackage.name,
      travelers,
      travelDate,
      createdAt: new Date().toLocaleDateString('en-BD', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'Pending',
      notes,
    };

    onBookingSubmit(newBooking);
    setGeneratedPNR(pnr);
    setIsSuccess(true);
    
    // Reset fields after successful entry
    setName('');
    setPhone('');
    setEmail('');
    setTravelers(1);
    setTravelDate('');
    setNotes('');
  };

  const formatBDT = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Backdrop overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-black/60 backdrop-blur-xs cursor-pointer" 
          aria-hidden="true"
          onClick={handleClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal Panel Boarding Ticket styled wrapper */}
        <div className="relative z-10 inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-3xl shadow-2xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border-2 border-brand-gold/30 w-full font-sans">
          
          {/* Header */}
          <div className="bg-brand-green py-5 px-6 text-white flex justify-between items-center border-b-4 border-brand-gold">
            <div className="flex items-center gap-2">
              <Sparkles className="text-brand-gold animate-spin-slow" size={18} />
              <h3 className="text-md sm:text-xl font-display font-bold tracking-wide" id="modal-title">
                Secure Pilgrim Registration
              </h3>
            </div>
            <button 
              onClick={handleClose}
              className="p-1 px-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition text-xs cursor-pointer"
            >
              Close
            </button>
          </div>

          {/* Succeeded Success Card Content (Boarding ticket representation!) */}
          {isSuccess ? (
            <div className="p-6 sm:p-8 text-center space-y-5 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 border-2 border-emerald-300">
                <CheckCircle2 size={36} />
              </div>
              
              <div className="space-y-1">
                <h4 className="font-display font-black text-brand-green text-xl">Booking Submitted Successfully!</h4>
                <p className="text-xs text-gray-500">Mubarak! Your registration coordinates have been registered.</p>
              </div>

              {/* Pseudo Boarding ticket detail preview */}
              <div className="border border-brand-gold/30 rounded-2xl bg-brand-lightgold/50 grid grid-cols-1 divide-y divide-brand-gold/15 text-left text-xs overflow-hidden">
                <div className="p-4 flex justify-between items-center bg-brand-green text-white">
                  <div>
                    <span className="text-[10px] text-brand-gold block font-bold uppercase tracking-wider">RESERVATION PASS CODE (PNR)</span>
                    <strong className="text-lg font-mono tracking-widest">{generatedPNR}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-white/70 block uppercase">Office Status</span>
                    <span className="bg-amber-400 text-brand-green px-2 py-0.5 rounded text-[10px] font-extrabold font-mono">PENDING APPROVAL</span>
                  </div>
                </div>

                <div className="p-4 grid grid-cols-2 gap-y-3 font-medium text-gray-700">
                  <div>
                    <span className="text-[10px] text-gray-400 block font-bold uppercase">Pilgrim Head Name</span>
                    <span className="text-sm font-bold text-brand-green truncate">{name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block font-bold uppercase">Selected Package</span>
                    <span className="truncate block font-semibold">{activePackage.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block font-bold uppercase">Flight departure date</span>
                    <span className="font-mono">{travelDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block font-bold uppercase">Invoiced Total</span>
                    <span className="font-extrabold text-brand-green font-mono">{formatBDT(activePackage.price * travelers)}</span>
                  </div>
                </div>

                <div className="p-3 bg-white text-[10px] text-gray-400 leading-relaxed text-center font-semibold">
                  📞 Our representative will call you at <strong className="text-brand-green">{phone}</strong> within 1 hour with visa guidelines.
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="w-full py-3 bg-brand-green hover:bg-brand-green/95 text-white font-bold rounded-xl transition cursor-pointer text-xs uppercase"
                >
                  Done & Close Portal
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2 font-medium">
                  <AlertCircle size={14} className="flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Package Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Select Your Sacred package</label>
                <select
                  value={packageId}
                  onChange={(e) => setPackageId(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 focus:border-brand-gold focus:bg-white rounded-xl text-xs font-semibold text-gray-800 transition focus:outline-none"
                >
                  {PACKAGES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — ({p.duration} days | {formatBDT(p.price)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Nominated Name input */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Full Legal Name (Matching Passport)</label>
                <input
                  type="text"
                  placeholder="e.g. Mohammad Abdur Rahman"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 focus:border-brand-gold focus:bg-white rounded-xl text-xs focus:outline-none transition font-medium"
                />
              </div>

              {/* Contact phone number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">BD Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. 01712345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 focus:border-brand-gold focus:bg-white rounded-xl text-xs focus:outline-none transition font-sans font-medium"
                  />
                </div>

                {/* Email address */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 focus:border-brand-gold focus:bg-white rounded-xl text-xs focus:outline-none transition font-medium"
                  />
                </div>
              </div>

              {/* Number of Pilgrims & estimated dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide flex items-center gap-1">
                    <Users size={12} className="text-gray-400" />
                    <span>Traveler Count</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 focus:border-brand-gold focus:bg-white rounded-xl text-xs focus:outline-none transition font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide flex items-center gap-1">
                    <Calendar size={12} className="text-gray-400" />
                    <span>Expected Date</span>
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 focus:border-brand-gold focus:bg-white rounded-xl text-xs focus:outline-none transition font-semibold text-gray-700"
                  />
                </div>
              </div>

              {/* Extra instructions */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Special Requests or Medical Notes (Optional)</label>
                <textarea
                  placeholder="e.g. Need wheelchair assistance, quad sharing bedroom configurations, etc."
                  value={notes}
                  rows={2}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 focus:border-brand-gold focus:bg-white rounded-xl text-xs focus:outline-none transition resize-none font-medium text-gray-600"
                ></textarea>
              </div>

              {/* Price summary dashboard inside the ticket */}
              <div className="p-4 rounded-xl bg-brand-lightgold/70 border border-brand-gold/20 flex justify-between items-center text-xs">
                <div className="space-y-0.5">
                  <span className="text-gray-500 font-bold uppercase tracking-wider block text-[9.5px]">Calculation Breakdown</span>
                  <span className="text-gray-700 font-medium font-sans">
                    {formatBDT(activePackage.price)} × {travelers} Pilgrim(s)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 block font-bold text-[9px] uppercase tracking-widest">Est. Invoice Max</span>
                  <strong className="text-base text-brand-green font-black font-sans">
                    {formatBDT(activePackage.price * travelers)}
                  </strong>
                </div>
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                className="w-full py-3 bg-brand-green hover:bg-brand-green/95 text-white rounded-xl font-bold text-xs flex justify-center items-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer uppercase tracking-wider"
              >
                <Send size={14} />
                <span>Submit Pilgrim Booking Card</span>
              </button>

              <p className="text-[10px] text-gray-400 text-center leading-relaxed font-semibold">
                🔒 Data encrypted securely under government approved privacy policy. No advance payments required.
              </p>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}
