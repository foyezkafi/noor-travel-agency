import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceHighlights from './components/ServiceHighlights';
import PackagesSection from './components/PackagesSection';
import PackageDetailModal from './components/PackageDetailModal';
import BookingFormModal from './components/BookingFormModal';
import ContactSection from './components/ContactSection';
import Testimonials from './components/Testimonials';
import FAQSection from './components/FAQSection';
import BookingDashboard from './components/BookingDashboard';
import LiveChat from './components/LiveChat';

import { Package, Booking } from './types';
import { PACKAGES } from './data';
import { Compass, Phone, Send, Eye, ShieldCheck, Mail, MapPin, Award, CheckCircle } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'noor_travel_bd_bookings_1448';

// Populated mock initial bookings to give immediate administrative feeling
const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'NT-KML329',
    name: 'Al-Haj Mohammad Kamal Uddin',
    phone: '01711223344',
    email: 'kamal.dhaka@gmail.com',
    packageId: 'haj-vip',
    packageName: 'Haj 1448H VIP Royal Package',
    travelers: 2,
    travelDate: '2027-05-12',
    createdAt: 'Jun 10, 2026, 11:30 AM',
    status: 'Pending',
    notes: 'Requested Fairmont Clock Tower direct Kaaba-view room upgrade. NID & Passports submitted.'
  },
  {
    id: 'NT-FTM405',
    name: 'Begum Fatema Tuz Zahra',
    phone: '01822334455',
    email: 'fatema.ctg@yahoo.com',
    packageId: 'umrah-premium',
    packageName: 'Premium Umrah Package',
    travelers: 3,
    travelDate: '2026-10-14',
    createdAt: 'Jun 15, 2026, 04:15 PM',
    status: 'Approved',
    notes: 'Direct Biman flight confirmed. Wheelchair assistance requested for Makkah airport arrival.'
  },
  {
    id: 'NT-RAH921',
    name: 'Haji Abdur Rahman Al-Siddiki',
    phone: '01912345678',
    email: 'rahman.sylhet@outlook.com',
    packageId: 'umrah-economy',
    packageName: 'Economy Umrah Package',
    travelers: 1,
    travelDate: '2026-11-05',
    createdAt: 'Jun 18, 2026, 09:10 AM',
    status: 'Approved',
    notes: 'Standard single pilgrim package. Waived Qurbani option selected.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  
  // Modals status
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingPackageId, setBookingPackageId] = useState<string | undefined>(undefined);

  // Bookings list state
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load bookings from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setBookings(JSON.parse(stored));
      } else {
        setBookings(INITIAL_BOOKINGS);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
      }
    } catch (e) {
      console.error('Error loading localStorage bookings:', e);
      setBookings(INITIAL_BOOKINGS);
    }
  }, []);

  // Save bookings to localstorage on change
  const saveBookings = (updatedBookings: Booking[]) => {
    setBookings(updatedBookings);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBookings));
    } catch (e) {
      console.error('Error saving packages:', e);
    }
  };

  // Trigger Booking Modal with preselected package
  const handleOpenBookingModal = (pkgId?: string) => {
    setBookingPackageId(pkgId);
    setIsBookingModalOpen(true);
  };

  // Trigger Package detail view modal
  const handleOpenDetailModal = (pkg: Package) => {
    setSelectedPkg(pkg);
    setIsDetailModalOpen(true);
  };

  // Booking submit response handler
  const handleBookingSubmit = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    saveBookings(updated);
  };

  // Booking Update status (Admin Console operation)
  const handleUpdateBookingStatus = (id: string, newStatus: Booking['status'], notes?: string) => {
    const updated = bookings.map((b) => {
      if (b.id === id) {
        return { ...b, status: newStatus, notes: notes };
      }
      return b;
    });
    saveBookings(updated);
  };

  // Booking Delete handle
  const handleDeleteBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    saveBookings(updated);
  };

  // Quick category trigger navigation
  const [preselectedCatalogType, setPreselectedCatalogType] = useState<'haj' | 'umrah' | null>(null);
  const handleNavigateToCatalog = (type?: 'haj' | 'umrah') => {
    setPreselectedCatalogType(type || null);
    setActiveTab('packages');
    
    // Quick auto-scroll to packages catalog
    setTimeout(() => {
      const el = document.getElementById('packages-catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="font-sans min-h-screen flex flex-col justify-between bg-[#FAF9F6]">
      
      {/* Top sticky bar and navigation menu */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenBookingModal={() => handleOpenBookingModal()}
        bookingCount={bookings.length}
      />

      {/* Render Dynamic view depending on active tab status */}
      <main className="flex-grow">
        
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            {/* Slider and Countdown timer */}
            <Hero 
              onOpenBookingModal={() => handleOpenBookingModal()} 
              onNavigateToPackages={() => handleNavigateToCatalog()}
            />
            {/* Interactive services simulator list */}
            <ServiceHighlights 
              onNavigateToPackages={(type) => handleNavigateToCatalog(type)}
              onOpenBookingModal={(id) => handleOpenBookingModal(id)}
            />
            {/* Spotlighted catalog packages (Show top 3 first) */}
            <div className="bg-white py-4 border-b border-gray-50">
              <PackagesSection 
                onViewDetails={handleOpenDetailModal}
                onBookNow={handleOpenBookingModal}
                preselectedType={null}
              />
            </div>
            {/* Beautiful real pilgrim testimonials */}
            <Testimonials />
            {/* Quick mini FAQs block */}
            <FAQSection />
            {/* Contact cards, inquiry form and map */}
            <ContactSection />
          </div>
        )}

        {/* View 2: Packages listing */}
        {activeTab === 'packages' && (
          <div className="animate-fade-in">
            <PackagesSection 
              onViewDetails={handleOpenDetailModal}
              onBookNow={handleOpenBookingModal}
              preselectedType={preselectedCatalogType}
            />
            <Testimonials />
          </div>
        )}

        {/* View 3: FAQS Guides */}
        {activeTab === 'faqs' && (
          <div className="animate-fade-in py-8">
            <FAQSection />
          </div>
        )}

        {/* View 4: Contacts Branch Page */}
        {activeTab === 'contact' && (
          <div className="animate-fade-in">
            <ContactSection />
          </div>
        )}

        {/* View 5: Admin Panel Portal */}
        {activeTab === 'admin' && (
          <div className="animate-fade-in">
            <BookingDashboard 
              bookings={bookings}
              onUpdateStatus={handleUpdateBookingStatus}
              onDeleteBooking={handleDeleteBooking}
              onOpenBookingModal={() => handleOpenBookingModal()}
            />
          </div>
        )}

      </main>

      {/* FOOTER AREA - Premium layout fitting Bangladeshi credentials guidelines and colors */}
      <footer className="bg-brand-green text-white border-t-4 border-brand-gold pt-16 pb-8 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            
            {/* Column 1: Brand description and credentials */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold">
                  <span className="text-brand-gold font-bold">✨</span>
                </div>
                <span className="font-display text-lg font-bold tracking-wider text-brand-gold">NOOR TRAVEL BD</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                Approved Hajj & Umrah Travel Agency certified by the Ministry of Religious Affairs (MoRA), Government of Bangladesh. Delivering ultimate spiritual peace to Bangladeshi pilgrims for over a decade.
              </p>
              <div className="space-y-1 text-xs">
                <p className="text-[11px]"><strong className="text-brand-gold">Govt License:</strong> BD-HAJJ-1448</p>
                <p className="text-[11px]"><strong className="text-brand-gold">IATA Code:</strong> 42-205634</p>
              </div>
            </div>

            {/* Column 2: Branches List Address short overview */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm tracking-wide text-brand-gold uppercase">Physical Branches</h4>
              <ul className="space-y-3.5 text-xs text-gray-300 leading-relaxed font-sans">
                <li className="flex gap-2">
                  <span className="text-brand-gold font-bold">📍</span>
                  <div>
                    <strong className="text-white block text-[11px]">Dhaka (Haramain Office):</strong>
                    <span>House 12/B, Road 4, Kakrail (Opposite of Mosque), Dhaka</span>
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-gold font-bold">📍</span>
                  <div>
                    <strong className="text-white block text-[11px]">Chittagong (GEC Branch):</strong>
                    <span>Al-Nur Shopping Center (3rd Floor), GEC, Chittagong</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Navigation map trigger helper links */}
            <div className="space-y-4 font-sans">
              <h4 className="font-bold text-sm tracking-wide text-brand-gold uppercase">Interactive Navigator</h4>
              <ul className="space-y-2 text-xs text-gray-300 font-semibold">
                <li>
                  <button onClick={() => setActiveTab('home')} className="hover:text-brand-gold transition cursor-pointer">
                    🏠 Home & Pilgrim Slides
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigateToCatalog()} className="hover:text-brand-gold transition cursor-pointer">
                    🕌 Hajj & Umrah Packages Catalog
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('faqs')} className="hover:text-brand-gold transition cursor-pointer">
                    📖 Pilgrim Guidebook FAQs
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('contact')} className="hover:text-brand-gold transition cursor-pointer">
                    📞 Contact Office & Branches
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('admin')} className="hover:text-brand-gold transition cursor-pointer">
                    🔐 Access Pilgrim Portal Console
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Quick trust highlights */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm tracking-wide text-brand-gold uppercase">Official Guarantees</h4>
              <ul className="space-y-2 text-xs text-gray-300 leading-relaxed font-sans">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold p-0.5 rounded bg-white/5">✓</span>
                  <span>100% Confirmed Visa Process</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold p-0.5 rounded bg-white/5">✓</span>
                  <span>Double Checked Hotel Blockings</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold p-0.5 rounded bg-white/5">✓</span>
                  <span>Dedicated Expert Moallims Team</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold p-0.5 rounded bg-white/5">✓</span>
                  <span>Safe Luggage Logistics & Zamzam Porting</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright line and legal highlights */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
            <p className="font-sans">
              © {new Date().getFullYear()} <strong className="text-brand-gold">Noor Travel BD</strong>. All rights reserved physically and electronically across Bangladesh.
            </p>
            <div className="flex gap-4 font-semibold text-gray-400">
              <span className="hover:text-brand-gold cursor-pointer">Privacy Guidelines</span>
              <span>|</span>
              <span className="hover:text-brand-gold cursor-pointer">Refund Policies</span>
              <span>|</span>
              <span className="hover:text-brand-gold cursor-pointer">Saudi MoH Laws</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Dynamic Overlay Dialog: Detail views */}
      <PackageDetailModal 
        pkg={selectedPkg}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onBookNow={(id) => {
          setIsDetailModalOpen(false);
          handleOpenBookingModal(id);
        }}
      />

      {/* Dynamic Overlay Dialog: Boarding ticket style booking form */}
      <BookingFormModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedPackageId={bookingPackageId}
        onBookingSubmit={handleBookingSubmit}
      />

      {/* Floating real-time client support Chat assistant */}
      <LiveChat />

    </div>
  );
}
