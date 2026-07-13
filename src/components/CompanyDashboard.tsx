import React, { useState } from 'react';
import { Search, MapPin, ShieldCheck, ShieldAlert, SlidersHorizontal, ArrowLeft, Send, CheckCircle2, IndianRupee, Clock, CalendarDays, ExternalLink, RefreshCw, UserCheck } from 'lucide-react';
import { StorageListing, BookingRequest, Language, User } from '../types';
import { TRANSLATIONS } from '../data';

interface CompanyDashboardProps {
  language: Language;
  user: User;
  listings: StorageListing[];
  bookings: BookingRequest[];
  onAddBooking: (booking: BookingRequest) => void;
  onPayBooking: (bookingId: string) => void;
  onOpenPayment: (booking: BookingRequest) => void;
  onOpenReceipt: (booking: BookingRequest) => void;
  onDiscussTerms: (bookingId: string, finalPrice: string, terms: string) => void;
  onLogout: () => void;
}

export default function CompanyDashboard({
  language,
  user,
  listings,
  bookings,
  onAddBooking,
  onPayBooking,
  onOpenPayment,
  onOpenReceipt,
  onDiscussTerms,
  onLogout
}: CompanyDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<StorageListing | null>(null);
  
  // States for request sending
  const [bookingDate, setBookingDate] = useState('');
  const [bookingMsg, setBookingMsg] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // States for discussion modal
  const [activeDiscussionBooking, setActiveDiscussionBooking] = useState<BookingRequest | null>(null);
  const [proposedRent, setProposedRent] = useState('');
  const [agreedNotes, setAgreedNotes] = useState('');

  const t = TRANSLATIONS[language];

  // List of unique facilities from initial data
  const availableFacilities = ["CCTV Security", "Temperature Control", "24/7 Access", "Forklift Provided", "Pest Control", "Ground Floor"];

  // Filter listings
  const filteredListings = listings.filter((lst) => {
    const matchesSearch =
      lst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lst.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lst.capacity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lst.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFacility = selectedFacility
      ? lst.facilities.includes(selectedFacility)
      : true;

    return matchesSearch && matchesFacility;
  });

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListing) return;

    if (!bookingDate) {
      alert("Please select a preferred start date.");
      return;
    }

    const newBooking: BookingRequest = {
      id: `bk-${Math.random().toString(36).substr(2, 9)}`,
      listingId: selectedListing.id,
      listingName: selectedListing.name,
      companyId: user.id,
      companyName: user.name,
      companyPhone: user.phone,
      status: 'pending',
      companyPaidFee: false,
      providerPaidFee: false,
      createdAt: new Date().toLocaleDateString(),
      price: selectedListing.priceSuggestion || "TBD",
      date: bookingDate,
      rentalTermsDiscussed: bookingMsg || "Looking to store inventory starting " + bookingDate
    };

    onAddBooking(newBooking);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedListing(null);
      setBookingDate('');
      setBookingMsg('');
    }, 2000);
  };

  const handleLockTerms = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDiscussionBooking) return;
    if (!proposedRent) {
      alert("Please enter the locked agreed monthly rent.");
      return;
    }

    onDiscussTerms(activeDiscussionBooking.id, proposedRent, agreedNotes || "Terms finalized between parties.");
    setActiveDiscussionBooking(null);
    setProposedRent('');
    setAgreedNotes('');
  };

  // Filter user bookings
  const myBookings = bookings.filter((b) => b.companyId === user.id);

  return (
    <div id="company-dashboard" className="space-y-6">
      {/* Simulation Helper Banner */}
      <div className="bg-indigo-50 border-2 border-slate-900 rounded-xl p-4 md:p-5 text-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 bg-indigo-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded border border-slate-900 uppercase tracking-widest shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
              ⚙️ Simulation Active
            </span>
            <h4 className="font-black text-base uppercase tracking-tight mt-1">Instant Storage Matching Cycle</h4>
            <p className="text-xs text-slate-600 max-w-xl font-bold">
              You are logged in as a <strong>Company</strong>. You can find listings, send booking requests, discuss prices, and pay platform fees. To approve requests or add new warehouses, switch accounts or roles!
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] bg-white text-slate-900 px-3 py-1.5 rounded border-2 border-slate-900 font-black uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              🏢 {user.name}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Columns: Search & Explore listings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Card */}
          <div className="bg-white rounded-xl border-2 border-slate-900 p-5 shadow-[4px_4px_0px_rgba(15,23,42,1)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-950 uppercase tracking-tighter text-base flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
                {t.exploreTitle}
              </h3>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-900 px-2 py-0.5 rounded">
                {filteredListings.length} spaces
              </span>
            </div>

            <div className="relative">
              <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-slate-900 text-xs font-bold rounded pl-11 pr-4 py-3.5 outline-none transition-all"
              />
            </div>

            {/* Facility quick filter chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider mr-1">Filter:</span>
              <button
                type="button"
                onClick={() => setSelectedFacility(null)}
                className={`px-3 py-1.5 rounded text-xs font-black uppercase tracking-wider border-2 border-slate-900 transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
                  !selectedFacility
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                All
              </button>
              {availableFacilities.map((facility) => (
                <button
                  key={facility}
                  type="button"
                  onClick={() => setSelectedFacility(selectedFacility === facility ? null : facility)}
                  className={`px-3 py-1.5 rounded text-xs font-black uppercase tracking-wider border-2 border-slate-900 transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
                    selectedFacility === facility
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {facility}
                </button>
              ))}
            </div>
          </div>

          {/* Listings List */}
          {filteredListings.length === 0 ? (
            <div className="bg-white rounded-xl border-2 border-slate-900 p-12 text-center shadow-[4px_4px_0px_rgba(15,23,42,1)]">
              <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-base font-black uppercase tracking-tight text-slate-950">No Storage Spaces Found</h4>
              <p className="text-slate-500 text-xs font-bold max-w-sm mx-auto mt-1">
                Try searching for another keyword or clear the facility filters to explore more warehouse spaces.
              </p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedFacility(null); }}
                className="mt-4 text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 border-2 border-slate-900 px-4 py-2 rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-indigo-100 transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredListings.map((lst) => (
                <div
                  key={lst.id}
                  className="bg-white rounded-xl border-2 border-slate-900 hover:shadow-[8px_8px_0px_rgba(15,23,42,1)] shadow-[4px_4px_0px_rgba(15,23,42,1)] transition-all duration-200 overflow-hidden flex flex-col group"
                >
                  {/* Listing Image */}
                  <div className="relative h-44 bg-slate-200 overflow-hidden border-b-2 border-slate-900">
                    <img
                      src={lst.image}
                      alt={lst.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    {lst.isVerified && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-950 border border-slate-900 shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {t.verifiedBadge}
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 inline-flex items-center bg-slate-950 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded border border-slate-900 shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
                      {lst.priceSuggestion}
                    </span>
                  </div>

                  {/* Listing Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-black text-slate-950 leading-tight uppercase tracking-tight text-base group-hover:text-indigo-600 transition-colors">
                        {lst.name}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-start gap-1">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 text-slate-400 flex-shrink-0" />
                        <span className="line-clamp-1 font-bold">{lst.address}</span>
                      </p>
                      <p className="text-[10px] font-black uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200 w-max">
                        Capacity: {lst.capacity}
                      </p>
                    </div>

                    {/* Facilities list */}
                    <div className="flex flex-wrap gap-1.5">
                      {lst.facilities.slice(0, 3).map((f) => (
                        <span key={f} className="text-[9px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                          {f}
                        </span>
                      ))}
                      {lst.facilities.length > 3 && (
                        <span className="text-[9px] font-black uppercase tracking-wider bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded border border-slate-300">
                          +{lst.facilities.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedListing(lst)}
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      View Details & Book
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Column: My Booking History */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border-2 border-slate-900 p-5 shadow-[4px_4px_0px_rgba(15,23,42,1)] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-slate-900">
              <h3 className="font-black text-slate-950 text-xs uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                {t.activeBookings}
              </h3>
              <span className="text-[10px] font-black bg-indigo-100 text-indigo-900 border border-slate-900 px-2 py-0.5 rounded">
                {myBookings.length}
              </span>
            </div>

            {myBookings.length === 0 ? (
              <div className="text-center py-8 px-4">
                <CalendarDays className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">No storage bookings yet.</p>
                <p className="text-[10px] text-slate-400 font-bold mt-1">Explore listings on the left to send a booking request.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {myBookings.map((bk) => {
                  return (
                    <div key={bk.id} className="p-4 rounded-lg bg-slate-50 border-2 border-slate-900 shadow-[3px_3px_0px_rgba(0,0,0,1)] space-y-3">
                      <div>
                        <h4 className="text-xs font-black text-slate-950 uppercase tracking-tight line-clamp-1">{bk.listingName}</h4>
                        <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block mt-0.5">Requested: {bk.createdAt}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Rent:</span>
                        <span className="text-xs font-black text-slate-800 uppercase">{bk.price}</span>
                      </div>

                      {/* Status pill mapping */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                        <span className="text-[9px] uppercase font-black tracking-widest text-slate-400">Status</span>
                        {bk.status === 'pending' && (
                          <span className="text-[9px] font-black uppercase tracking-wider bg-amber-100 text-amber-950 px-2 py-0.5 border border-amber-900 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
                            ⏳ Pending Approval
                          </span>
                        )}
                        {bk.status === 'accepted' && (
                          <span className="text-[9px] font-black uppercase tracking-wider bg-blue-100 text-blue-950 px-2 py-0.5 border border-blue-900 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
                            🤝 Approved - Discuss
                          </span>
                        )}
                        {bk.status === 'confirmed' && (
                          <span className="text-[9px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-950 px-2 py-0.5 border border-indigo-900 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
                            Locked - Pay Fee
                          </span>
                        )}
                        {bk.status === 'paid' && (
                          <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-950 px-2 py-0.5 border border-emerald-900 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
                            ✅ Active Renting
                          </span>
                        )}
                      </div>

                      {/* Custom context CTA depending on state */}
                      {bk.status === 'accepted' && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveDiscussionBooking(bk);
                            setProposedRent(bk.price !== "TBD" ? bk.price : "₹10,000 / month");
                          }}
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-wider border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          Discuss & Lock Price
                        </button>
                      )}

                      {bk.status === 'confirmed' && (
                        <button
                          type="button"
                          onClick={() => onOpenPayment(bk)}
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-wider border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <IndianRupee className="w-3.5 h-3.5" />
                          Pay ₹30 Service Fee
                        </button>
                      )}

                      {bk.status === 'paid' && (
                        <button
                          type="button"
                          onClick={() => onOpenReceipt(bk)}
                          className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-[10px] uppercase tracking-wider border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          View Receipt
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Listing Detail & Request Modal */}
      {selectedListing && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl border-2 border-slate-900 max-w-lg w-full overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)] animate-scale-up my-8">
            {/* Header Banner */}
            <div className="relative h-48 bg-slate-100 border-b-2 border-slate-900">
              <img
                src={selectedListing.image}
                alt={selectedListing.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => { setSelectedListing(null); setBookingSuccess(false); }}
                className="absolute top-4 right-4 bg-slate-900 text-white p-2 rounded-lg border-2 border-slate-900 hover:bg-slate-800 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all cursor-pointer font-black text-xs"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-5">
              <div>
                {selectedListing.isVerified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-950 border border-slate-900 shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {t.verifiedBadge}
                  </span>
                )}
                <h3 className="text-xl font-black uppercase tracking-tighter text-slate-950">
                  {selectedListing.name}
                </h3>
                <p className="text-xs text-slate-500 flex items-start gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 text-slate-400 flex-shrink-0" />
                  <span className="font-bold">{selectedListing.address}</span>
                </p>
              </div>

              <div className="p-4 bg-slate-50 border-2 border-slate-900 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-black uppercase tracking-wider text-slate-500">Storage Capacity:</span>
                  <span className="font-black text-slate-800 uppercase">{selectedListing.capacity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-black uppercase tracking-wider text-slate-500">Owner / Provider:</span>
                  <span className="font-black text-slate-800 uppercase">{selectedListing.providerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-black uppercase tracking-wider text-slate-500">Expected Rent:</span>
                  <span className="font-black text-indigo-600 uppercase">{selectedListing.priceSuggestion}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">Description:</span>
                <p className="text-xs text-slate-600 leading-relaxed font-bold">
                  {selectedListing.description}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">Available Facilities:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedListing.facilities.map((fac) => (
                    <span key={fac} className="text-[10px] font-black uppercase tracking-wider bg-orange-50 text-orange-950 border border-slate-900 px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
                      ✓ {fac}
                    </span>
                  ))}
                </div>
              </div>

              {/* Booking Request Form */}
              <form onSubmit={handleSendRequest} className="pt-4 border-t-2 border-slate-900 space-y-4">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Book This Space</h4>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Preferred Start Date</label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-xs font-bold rounded p-3 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Notes or Inventory details (Optional)</label>
                    <textarea
                      placeholder="e.g. Need to store 200 boxes of retail packaging materials for 3 months."
                      value={bookingMsg}
                      onChange={(e) => setBookingMsg(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-xs font-bold rounded p-3 h-16 outline-none transition-all"
                    />
                  </div>
                </div>

                {bookingSuccess ? (
                  <div className="flex items-center justify-center gap-2 p-3 bg-emerald-100 text-emerald-950 border-2 border-slate-900 rounded text-xs font-black uppercase tracking-wider text-center shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-bounce" />
                    <span>Booking Request Sent Successfully!</span>
                  </div>
                ) : (
                  <button
                    id="btn-send-booking-request"
                    type="submit"
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest rounded border-2 border-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_rgba(15,23,42,1)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {t.requestBooking}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Discussion & Price Locking Modal */}
      {activeDiscussionBooking && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleLockTerms} className="bg-white rounded-xl border-2 border-slate-900 max-w-md w-full overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)] p-6 md:p-8 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900">
              <h3 className="font-black text-slate-950 text-base uppercase tracking-wider flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-600" />
                Agree & Lock Terms
              </h3>
              <button
                type="button"
                onClick={() => setActiveDiscussionBooking(null)}
                className="text-slate-400 hover:text-slate-950 text-lg cursor-pointer font-black"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-600 font-bold">
                Discuss terms directly with <strong>{activeDiscussionBooking.companyName === user.name ? "the Provider" : activeDiscussionBooking.companyName}</strong>. Type the final locked price and notes to proceed to the ₹30 service fee payment.
              </p>

              <div className="p-4 bg-slate-50 rounded border-2 border-slate-900 space-y-1.5 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                <span className="text-[9px] font-black text-slate-400 block uppercase tracking-wider">Requested Storage</span>
                <span className="text-xs font-black text-slate-800 block leading-tight uppercase">{activeDiscussionBooking.listingName}</span>
                <span className="text-[10px] text-slate-500 block font-bold">Requested Start: {activeDiscussionBooking.date}</span>
              </div>

              {/* Price Suggestion input */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Final Agreed Rental Rent (e.g., ₹12,000 / month)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 text-sm font-black">₹</span>
                  <input
                    type="text"
                    required
                    placeholder="12,000 per month"
                    value={proposedRent}
                    onChange={(e) => setProposedRent(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-xs font-bold rounded pl-8 pr-4 py-3 outline-none transition-all text-slate-800"
                  />
                </div>
              </div>

              {/* Agreement notes */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Agreed Terms & Conditions (Optional)</label>
                <textarea
                  placeholder="e.g. Deposit of 1 month, 3 months lease period minimum, includes power backup."
                  value={agreedNotes}
                  onChange={(e) => setAgreedNotes(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-xs font-bold rounded p-3 h-20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveDiscussionBooking(null)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase border-2 border-slate-900 rounded transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase border-2 border-slate-900 rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                Lock Agreement
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
