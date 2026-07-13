import React, { useState } from 'react';
import { PlusCircle, Warehouse, MapPin, BadgePercent, CheckCircle2, XCircle, ArrowRight, Sparkles, Trash2, LayoutGrid, Coins, UserCheck, ShieldCheck } from 'lucide-react';
import { StorageListing, BookingRequest, Language, User } from '../types';
import { TRANSLATIONS } from '../data';

interface ProviderDashboardProps {
  language: Language;
  user: User;
  listings: StorageListing[];
  bookings: BookingRequest[];
  onAddListing: (listing: StorageListing) => void;
  onRemoveListing: (listingId: string) => void;
  onAcceptBooking: (bookingId: string) => void;
  onRejectBooking: (bookingId: string) => void;
  onDiscussTerms: (bookingId: string, finalPrice: string, terms: string) => void;
  onOpenPayment: (booking: BookingRequest) => void;
  onOpenReceipt: (booking: BookingRequest) => void;
  onLogout: () => void;
}

export default function ProviderDashboard({
  language,
  user,
  listings,
  bookings,
  onAddListing,
  onRemoveListing,
  onAcceptBooking,
  onRejectBooking,
  onDiscussTerms,
  onOpenPayment,
  onOpenReceipt,
  onLogout
}: ProviderDashboardProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  // Form Fields
  const [storageName, setStorageName] = useState('');
  const [address, setAddress] = useState('');
  const [capacity, setCapacity] = useState('');
  const [description, setDescription] = useState('');
  const [priceSuggestion, setPriceSuggestion] = useState('');
  
  // Facilities checklists
  const [facilities, setFacilities] = useState<string[]>(["CCTV Security"]);
  
  // Storage preset category for image
  const [category, setCategory] = useState<'warehouse' | 'cold' | 'shop' | 'basement'>('warehouse');

  // Terms Discussion state
  const [activeTermsBooking, setActiveTermsBooking] = useState<BookingRequest | null>(null);
  const [negotiatedPrice, setNegotiatedPrice] = useState('');
  const [termsNotes, setTermsNotes] = useState('');

  const t = TRANSLATIONS[language];

  // Map categories to beautiful Unsplash images
  const categoryImages = {
    warehouse: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600",
    cold: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=600",
    shop: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600",
    basement: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600"
  };

  const handleFacilityToggle = (fac: string) => {
    if (facilities.includes(fac)) {
      setFacilities(facilities.filter(f => f !== fac));
    } else {
      setFacilities([...facilities, fac]);
    }
  };

  const handleAddListingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!storageName || !address || !capacity || !description) {
      alert("Please fill in all listing fields.");
      return;
    }

    const newListing: StorageListing = {
      id: `lst-${Math.random().toString(36).substr(2, 9)}`,
      name: storageName,
      address,
      capacity,
      description,
      facilities: facilities.length > 0 ? facilities : ["Secure Lockable"],
      providerId: user.id,
      providerName: user.name,
      priceSuggestion: priceSuggestion ? `₹${priceSuggestion} / month` : "Contact for Rent",
      image: categoryImages[category],
      isVerified: true // Auto-verified for high polish in testing
    };

    onAddListing(newListing);
    setShowAddForm(false);
    
    // Reset Form
    setStorageName('');
    setAddress('');
    setCapacity('');
    setDescription('');
    setPriceSuggestion('');
    setFacilities(["CCTV Security"]);
  };

  const handleLockTermsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTermsBooking) return;
    if (!negotiatedPrice) return;

    onDiscussTerms(activeTermsBooking.id, negotiatedPrice, termsNotes || "Agreed upon via StockBridge coordinator.");
    setActiveTermsBooking(null);
    setNegotiatedPrice('');
    setTermsNotes('');
  };

  // Filter listings by this provider
  const myListedSpaces = listings.filter((l) => l.providerId === user.id);

  // Filter bookings targeted to this provider's listings
  const myListingIds = myListedSpaces.map(l => l.id);
  
  // We can also allow them to see requests on initial listings (for demonstration of requests!)
  const providerBookings = bookings.filter((b) => 
    myListingIds.includes(b.listingId) || 
    // also fallback to match gopal Sharma listings if they are the demo provider
    (user.id === 'usr-provider' && (b.listingId === 'lst-1' || b.listingId === 'lst-2'))
  );

  // Compute stats
  const totalEarnings = bookings
    .filter((b) => (b.status === 'paid' && (myListingIds.includes(b.listingId) || (user.id === 'usr-provider' && (b.listingId === 'lst-1' || b.listingId === 'lst-2')))))
    .length * 30; // Let's simulate earnings or show booking counts

  return (
    <div id="provider-dashboard" className="space-y-6">
      {/* Simulation Helper Banner */}
      <div className="bg-emerald-50 border-2 border-slate-900 rounded-xl p-4 md:p-5 text-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded border border-slate-900 uppercase tracking-widest shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
              🏭 Space Provider Workspace
            </span>
            <h4 className="font-black text-base uppercase tracking-tight mt-1">Earn stable income from empty warehouse or shop corners</h4>
            <p className="text-xs text-slate-600 max-w-xl font-bold">
              You are logged in as a <strong>Storage Provider</strong>. You can list new spaces, view company booking requests, accept bookings, and discuss final lease prices.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] bg-white text-slate-900 px-3 py-1.5 rounded border-2 border-slate-900 font-black uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              Provider: {user.name}
            </span>
          </div>
        </div>
      </div>

      {/* Provider Quick KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)] flex items-center gap-4">
          <div className="w-12 h-12 rounded border-2 border-slate-900 bg-emerald-50 flex items-center justify-center text-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <Warehouse className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">My Listed Spaces</span>
            <span className="text-2xl font-black text-slate-950">{myListedSpaces.length}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)] flex items-center gap-4">
          <div className="w-12 h-12 rounded border-2 border-slate-900 bg-indigo-50 flex items-center justify-center text-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <BadgePercent className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Total Requests</span>
            <span className="text-2xl font-black text-slate-950">{providerBookings.length}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)] flex items-center gap-4">
          <div className="w-12 h-12 rounded border-2 border-slate-900 bg-amber-50 flex items-center justify-center text-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Booked Safe Rooms</span>
            <span className="text-2xl font-black text-slate-950">
              {providerBookings.filter(b => b.status === 'paid').length}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Columns: Listings and Manage Requests */}
        <div className="lg:col-span-2 space-y-6">
          {/* Listings manager header */}
          <div className="bg-white p-5 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-950 text-base uppercase tracking-tighter flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-indigo-600" />
                {t.myListings}
              </h3>
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                Add New Space
              </button>
            </div>

            {myListedSpaces.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-slate-300 rounded">
                <Warehouse className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h4 className="text-sm font-black uppercase text-slate-800">No Custom Storage Spaces Listed</h4>
                <p className="text-xs text-slate-500 font-bold mt-1">Click &quot;Add New Space&quot; above to list your first empty warehouse room!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myListedSpaces.map((lst) => (
                  <div key={lst.id} className="bg-slate-50 p-4 rounded border-2 border-slate-900 flex flex-col justify-between space-y-3 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <div className="flex gap-3">
                      <img
                        src={lst.image}
                        alt={lst.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded border border-slate-900 object-cover flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-xs font-black text-slate-900 leading-snug line-clamp-2 uppercase">{lst.name}</h4>
                        <span className="text-[10px] text-slate-500 flex items-center gap-0.5 mt-0.5 font-bold">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span className="line-clamp-1">{lst.address}</span>
                        </span>
                        <span className="text-[10px] font-black text-emerald-800 uppercase block mt-1">{lst.priceSuggestion}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Cap: {lst.capacity}</span>
                      <button
                        type="button"
                        onClick={() => onRemoveListing(lst.id)}
                        className="text-rose-600 hover:text-rose-800 p-1.5 rounded hover:bg-rose-50 transition-all cursor-pointer flex items-center gap-1 text-[10px] font-black uppercase tracking-wider border border-slate-900 bg-white shadow-[1px_1px_0px_rgba(0,0,0,1)] active:translate-x-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Manage Booking Requests */}
          <div className="bg-white p-5 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)] space-y-4">
            <h3 className="font-black text-slate-950 text-base uppercase tracking-tighter flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-indigo-600" />
              {t.viewRequests}
            </h3>

            {providerBookings.length === 0 ? (
              <div className="text-center py-10">
                <XCircle className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">No Booking Requests Received Yet.</p>
                <p className="text-[10px] text-slate-400 font-bold mt-1">Requests sent by companies will show up here immediately.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {providerBookings.map((bk) => (
                  <div key={bk.id} className="p-4 rounded-lg bg-slate-50 border-2 border-slate-900 shadow-[3px_3px_0px_rgba(0,0,0,1)] space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b-2 border-slate-200">
                      <div>
                        <span className="text-[10px] font-black tracking-wide uppercase bg-indigo-50 text-indigo-900 px-2.5 py-0.5 rounded border border-slate-900">
                          Request for: {bk.listingName}
                        </span>
                        <h4 className="text-xs font-black text-slate-950 mt-1 uppercase">From Company: {bk.companyName}</h4>
                      </div>
                      <span className="text-[9px] text-slate-500 font-black uppercase tracking-wider">Requested: {bk.createdAt}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-black tracking-wider">Planned Start Date:</span>
                        <span className="font-black text-slate-700">{bk.date}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-black tracking-wider">Company Contact Number:</span>
                        <span className="font-black text-slate-700">{bk.companyPhone}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                      <span className="text-[9px] text-slate-400 font-black block mb-1 uppercase tracking-wider">Company Message / Inventory details:</span>
                      <p className="text-xs text-slate-700 italic font-medium">
                        &ldquo;{bk.rentalTermsDiscussed}&rdquo;
                      </p>
                    </div>

                    {/* Status check and provider CTA buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Status:</span>
                        <span className="text-[10px] font-black uppercase bg-indigo-100 text-indigo-950 border border-slate-900 px-2 py-0.5 rounded">{bk.status}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {bk.status === 'pending' && (
                          <>
                            <button
                              type="button"
                              onClick={() => onRejectBooking(bk.id)}
                              className="px-3.5 py-2 border-2 border-slate-900 bg-white text-slate-700 font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-slate-50 transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                            >
                              Reject
                            </button>
                            <button
                              type="button"
                              onClick={() => onAcceptBooking(bk.id)}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                            >
                              Accept Request
                            </button>
                          </>
                        )}

                        {bk.status === 'accepted' && (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTermsBooking(bk);
                              setNegotiatedPrice("10,000 / month");
                            }}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer flex items-center gap-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            Lock Final Terms
                          </button>
                        )}

                        {bk.status === 'confirmed' && (
                          <button
                            type="button"
                            onClick={() => onOpenPayment(bk)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer flex items-center gap-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                          >
                            Pay ₹30 Service Fee
                          </button>
                        )}

                        {bk.status === 'paid' && (
                          <button
                            type="button"
                            onClick={() => onOpenReceipt(bk)}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider border-2 border-slate-900 cursor-pointer flex items-center gap-1 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                          >
                            View Booking Receipt
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Column: Sidebar Information */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)] space-y-4">
            <h3 className="font-black text-slate-950 text-xs uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Why list with StockBridge?
            </h3>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed font-bold">
              <li className="flex gap-2">
                <span className="text-emerald-600 font-black">✓</span>
                <span><strong>No hidden commission:</strong> You decide the monthly rental directly with the companies. We only charge ₹30 flat coordination fee.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-600 font-black">✓</span>
                <span><strong>Verified listings:</strong> Storage photos increase trust, reducing uncertainty and fake enquiries.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-600 font-black">✓</span>
                <span><strong>Direct contact:</strong> Communicate smoothly through verified phone details provided.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add Storage Modal Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl border-2 border-slate-900 max-w-lg w-full overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)] animate-scale-up my-8">
            <div className="p-6 md:p-8 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900">
                <h3 className="text-xl font-black text-slate-950 uppercase tracking-tighter flex items-center gap-2">
                  <Warehouse className="w-5 h-5 text-indigo-600" />
                  {t.addStorageTitle}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-slate-400 hover:text-slate-950 text-lg cursor-pointer font-black"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddListingSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Storage Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gopal Safe Warehousing"
                    value={storageName}
                    onChange={(e) => setStorageName(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-xs font-bold rounded p-3 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">{t.capacityLabel}</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., 500 sq ft"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-xs font-bold rounded p-3 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Proposed Rent / month</label>
                    <input
                      type="text"
                      placeholder="e.g., ₹12,000"
                      value={priceSuggestion}
                      onChange={(e) => setPriceSuggestion(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-xs font-bold rounded p-3 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">{t.addressLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Near Metro Station, Karol Bagh, Delhi"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-xs font-bold rounded p-3 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Description & Access condition</label>
                  <textarea
                    required
                    placeholder="Provide details about loading bays, security, dry/wet, lease guidelines..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-xs font-bold rounded p-3 h-20 outline-none transition-all"
                  />
                </div>

                {/* Preset image selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Select Space Type (Adds suitable photo)</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { code: 'warehouse', label: 'Warehouse' },
                      { code: 'cold', label: 'Cold Storage' },
                      { code: 'shop', label: 'Local Shop' },
                      { code: 'basement', label: 'Basement' }
                    ].map((cat) => (
                      <button
                        key={cat.code}
                        type="button"
                        onClick={() => setCategory(cat.code as any)}
                        className={`py-2 rounded text-[10px] font-black uppercase tracking-wider border-2 border-slate-900 transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
                          category === cat.code
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Facilities Checklist */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Key Facilities Available</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["CCTV Security", "Temperature Control", "24/7 Access", "Forklift Provided", "Pest Control", "Ground Floor"].map((fac) => {
                      const selected = facilities.includes(fac);
                      return (
                        <button
                          key={fac}
                          type="button"
                          onClick={() => handleFacilityToggle(fac)}
                          className={`flex items-center gap-1.5 p-2 rounded border-2 border-slate-900 text-left text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
                            selected
                              ? 'bg-emerald-50 text-emerald-950'
                              : 'bg-white text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span className={selected ? 'text-emerald-600 font-extrabold' : 'text-slate-300'}>
                            {selected ? '✓' : '+'}
                          </span>
                          {fac}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest border-2 border-slate-900 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  List Storage Space
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Lock terms modal for Provider */}
      {activeTermsBooking && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleLockTermsSubmit} className="bg-white rounded-xl border-2 border-slate-900 max-w-md w-full overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)] p-6 md:p-8 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900">
              <h3 className="font-black text-slate-950 text-base uppercase tracking-wider flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-600" />
                Agree & Lock Rental Terms
              </h3>
              <button
                type="button"
                onClick={() => setActiveTermsBooking(null)}
                className="text-slate-400 hover:text-slate-950 text-lg cursor-pointer font-black"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-600 font-bold">
                You are locking terms with <strong>{activeTermsBooking.companyName}</strong>. Type the final agreed price and any guidelines. Both parties will pay the flat ₹30 fee.
              </p>

              <div className="p-4 bg-slate-50 rounded border-2 border-slate-900 space-y-1.5 shadow-[3px_3px_0px_rgba(0,0,0,1)] text-xs font-bold uppercase">
                <div><span className="font-black text-slate-400">Space:</span> {activeTermsBooking.listingName}</div>
                <div><span className="font-black text-slate-400">Date:</span> {activeTermsBooking.date}</div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Final Agreed Monthly Rent</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 font-black text-sm">₹</span>
                  <input
                    type="text"
                    required
                    placeholder="12,000 / month"
                    value={negotiatedPrice}
                    onChange={(e) => setNegotiatedPrice(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-xs font-bold rounded pl-6 pr-4 py-3 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Agreed Guidelines</label>
                <textarea
                  placeholder="e.g., 3 months advance deposit, access allowed only during business hours."
                  value={termsNotes}
                  onChange={(e) => setTermsNotes(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-xs font-bold rounded p-3 h-16 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveTermsBooking(null)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-xs uppercase border-2 border-slate-900 rounded transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase border-2 border-slate-900 rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                Lock Terms
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
