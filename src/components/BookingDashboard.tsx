import React, { useState } from 'react';
import { Booking, Package } from '../types';
import { PACKAGES } from '../data';
import { Search, Briefcase, Trash2, CheckCircle2, XCircle, AlertCircle, ShoppingBag, Landmark, Download, Eye, FileSpreadsheet, PlusCircle } from 'lucide-react';

interface BookingDashboardProps {
  bookings: Booking[];
  onUpdateStatus: (id: string, newStatus: Booking['status'], notes?: string) => void;
  onDeleteBooking: (id: string) => void;
  onOpenBookingModal: (pkgId?: string) => void;
}

export default function BookingDashboard({ bookings, onUpdateStatus, onDeleteBooking, onOpenBookingModal }: BookingDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'Pending' | 'Approved' | 'Cancelled'>('all');
  const [selectedBookingForNotes, setSelectedBookingForNotes] = useState<string | null>(null);
  const [adminNotesText, setAdminNotesText] = useState('');

  // Format money to BDT
  const formatBDT = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Helper: Find package price to calculate invoice sum
  const getInvoiceSum = (booking: Booking) => {
    const pkg = PACKAGES.find(p => p.id === booking.packageId);
    const unitPrice = pkg ? pkg.price : 180000;
    return unitPrice * booking.travelers;
  };

  // Statistics calculations
  const stats = React.useMemo(() => {
    let totalRevenue = 0;
    let totalTravelersCount = 0;
    let pendingCount = 0;
    let approvedCount = 0;

    bookings.forEach((b) => {
      const sum = getInvoiceSum(b);
      if (b.status === 'Approved') {
        totalRevenue += sum;
        approvedCount++;
      } else if (b.status === 'Pending') {
        pendingCount++;
      }
      totalTravelersCount += b.travelers;
    });

    return { totalRevenue, totalTravelersCount, pendingCount, approvedCount };
  }, [bookings]);

  // Filters process
  const filteredBookings = React.useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        b.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        b.phone.includes(searchQuery) ||
        b.packageName.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesStatus = activeTabFilter === 'all' ? true : b.status === activeTabFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchQuery, activeTabFilter]);

  const handleUpdateNotes = (bookingId: string) => {
    onUpdateStatus(bookingId, 'Pending', adminNotesText);
    setSelectedBookingForNotes(null);
    setAdminNotesText('');
    alert('Note appended to pilgrim reservation securely.');
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen" id="admin-reservation-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title with quick adding button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-brand-green">
              Pilgrim Portal & Booking Management
            </h2>
            <p className="text-xs text-gray-400 mt-1 font-semibold">
              🔐 Internal Administration Console & Secure Client Booking Manager.
            </p>
          </div>
          <button
            onClick={() => onOpenBookingModal()}
            className="flex items-center gap-2 bg-brand-green hover:bg-brand-green/95 text-white px-5 py-3 rounded-xl font-bold text-xs shadow-md transition cursor-pointer font-sans"
          >
            <PlusCircle size={16} />
            <span>Add Manual Reservation</span>
          </button>
        </div>

        {/* STATS BLOCKS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Completed Revenue</span>
              <strong className="text-xl sm:text-2xl font-black text-brand-green font-mono">{formatBDT(stats.totalRevenue)}</strong>
              <span className="text-[10.5px] text-gray-500 block">From Approved bookings only</span>
            </div>
            <div className="p-3 bg-brand-lightgreen text-brand-green rounded-2xl border border-brand-green/10">
              <Landmark size={24} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Total Pilgrims</span>
              <strong className="text-xl sm:text-2xl font-black text-brand-darkgold font-mono">{stats.totalTravelersCount} Pax</strong>
              <span className="text-[10.5px] text-gray-500 block">Combined active registrants</span>
            </div>
            <div className="p-3 bg-brand-lightgold text-brand-darkgold rounded-2xl border border-brand-gold/10">
              <Briefcase size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Pending Visas</span>
              <strong className="text-xl sm:text-2xl font-black text-amber-600 font-mono">{stats.pendingCount} Bookings</strong>
              <span className="text-[10.5px] text-gray-500 block">Requires dispatch follow-ups</span>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-200">
              <AlertCircle size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Approved Visas</span>
              <strong className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">{stats.approvedCount} Issued</strong>
              <span className="text-[10.5px] text-gray-500 block">Confirmed ticketing completed</span>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-200">
              <CheckCircle2 size={22} />
            </div>
          </div>

        </div>

        {/* MAIN LISTING AREA CARDS CONTAINER */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 overflow-hidden space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search bookings by PNR, Pilgrim Name, Phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-brand-gold transition font-medium"
              />
              <Search className="absolute left-3.5 top-3 text-gray-400" size={14} />
            </div>

            {/* Status tabs filter */}
            <div className="flex gap-1.5 p-1 bg-gray-100 rounded-xl w-full md:w-auto">
              {['all', 'Pending', 'Approved', 'Cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTabFilter(tab as any)}
                  className={`flex-1 md:flex-none px-4 py-2 text-[10px] font-extrabold uppercase transition rounded-lg select-none cursor-pointer ${
                    activeTabFilter === tab
                      ? 'bg-brand-green text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab === 'all' ? 'All Rows' : tab}
                </button>
              ))}
            </div>

          </div>

          {/* Bookings Table Representation for Responsive Devices */}
          {filteredBookings.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <ShoppingBag size={48} className="mx-auto text-gray-300 mb-2 animate-bounce-slow" />
              <h5 className="font-bold text-gray-400 text-sm">No Reservation Logs Found</h5>
              <p className="text-xs text-gray-500 mt-1">Book your package from the Home page or click top button to add manually.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-gray-100 font-sans">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 uppercase tracking-widest font-extrabold text-[9.5px]">
                    <th className="py-4 px-4 rounded-l-xl">PNR / Date</th>
                    <th className="py-4 px-4">Pilgrim Lead Details</th>
                    <th className="py-4 px-4">Selected Package</th>
                    <th className="py-4 px-4">Total Invoice</th>
                    <th className="py-4 px-4">Office status</th>
                    <th className="py-4 px-4 text-right rounded-r-xl">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredBookings.map((b) => {
                    const invoiceBDT = getInvoiceSum(b);
                    
                    return (
                      <tr key={b.id} className="hover:bg-brand-lightgold/10 transition duration-150">
                        {/* PNR Code */}
                        <td className="py-4 px-4">
                          <span className="font-mono font-black text-brand-green tracking-wider text-sm block">
                            {b.id}
                          </span>
                          <span className="text-[10px] text-gray-400 block mt-0.5">{b.createdAt}</span>
                        </td>

                        {/* Pilgrim customer details */}
                        <td className="py-4 px-4 space-y-1">
                          <strong className="text-sm text-gray-800 block leading-tight">{b.name}</strong>
                          <div className="text-[11px] text-gray-500 font-medium">
                            <span className="block">📞 {b.phone}</span>
                            <span className="block">✉️ {b.email}</span>
                          </div>
                        </td>

                        {/* Package Info */}
                        <td className="py-4 px-4">
                          <span className="font-semibold text-gray-700 block max-w-[200px] truncate">{b.packageName}</span>
                          <span className="text-[10px] text-brand-darkgold font-bold block mt-0.5">
                            ✈️ Depart: {b.travelDate}
                          </span>
                        </td>

                        {/* BDT invoice amount total */}
                        <td className="py-4 px-4 font-mono font-black text-gray-700 text-sm">
                          {formatBDT(invoiceBDT)}
                          <span className="text-[10px] text-gray-500 block mt-0.5 font-sans font-semibold">
                            ({b.travelers} Pax)
                          </span>
                        </td>

                        {/* Interactive Status Indicator drop-down representation */}
                        <td className="py-4 px-4">
                          <div>
                            <select
                              value={b.status}
                              onChange={(e) => onUpdateStatus(b.id, e.target.value as any, b.notes)}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase border-b-2 font-mono ${
                                b.status === 'Approved'
                                  ? 'bg-[#E1F0E5] text-brand-green border-[#0F5132]/50'
                                  : b.status === 'Pending'
                                  ? 'bg-amber-100 text-amber-700 border-amber-500/50'
                                  : 'bg-red-50 text-red-700 border-red-500/50'
                              } cursor-pointer focus:outline-none`}
                            >
                              <option value="Pending">🕒 Pending Visa</option>
                              <option value="Approved">✓ Confirm Ticketing</option>
                              <option value="Cancelled">× Cancel Booking</option>
                            </select>
                          </div>
                          
                          {/* Display Notes if present */}
                          {b.notes && (
                            <p className="mt-1.5 p-1 bg-gray-50 rounded border border-gray-100 text-[10px] text-gray-500 leading-normal max-w-[200px] truncate" title={b.notes}>
                              📝 Note: {b.notes}
                            </p>
                          )}
                        </td>

                        {/* Interactive operations links */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex justify-end gap-2 items-center">
                            
                            <button
                              onClick={() => {
                                setSelectedBookingForNotes(b.id);
                                setAdminNotesText(b.notes || '');
                              }}
                              className="p-2 text-gray-400 hover:text-brand-green hover:bg-gray-100 rounded-lg transition title={'Add internal notes'}"
                            >
                              📝
                            </button>

                            <button
                              onClick={() => {
                                if (confirm('Are you absolutely sure to revoke/remove this pilgrim reservation?')) {
                                  onDeleteBooking(b.id);
                                }
                              }}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Delete Record"
                            >
                              <Trash2 size={14} />
                            </button>

                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>

        {/* Modal-like Admin Append Notes overlay popup */}
        {selectedBookingForNotes && (
          <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-2xl w-full max-w-sm border border-brand-gold/20 space-y-4">
              <h4 className="font-display font-bold text-brand-green text-sm">Add Secure Office Notes</h4>
              <p className="text-xs text-gray-500">Record visa details, flight schedules, or document pick up states.</p>
              
              <textarea
                value={adminNotesText}
                onChange={(e) => setAdminNotesText(e.target.value)}
                placeholder="e.g. Passport received at Kakrail Office on 21 June. Visa submittal done."
                rows={4}
                className="w-full p-2.5 border rounded-xl text-xs focus:outline-none focus:border-brand-gold resize-none"
              ></textarea>

              <div className="flex gap-2 justify-end text-xs">
                <button
                  onClick={() => setSelectedBookingForNotes(null)}
                  className="px-4 py-2 border rounded-xl text-gray-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateNotes(selectedBookingForNotes)}
                  className="px-4 py-2 bg-brand-green text-white font-bold rounded-xl"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
