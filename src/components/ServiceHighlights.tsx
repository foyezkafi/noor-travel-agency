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

      
    </section>
  );
}
