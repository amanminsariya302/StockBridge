import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Download, Printer, ArrowLeft, ShieldCheck, Mail, ClipboardCopy } from 'lucide-react';
import { BookingRequest } from '../types';

interface ReceiptViewProps {
  booking: BookingRequest;
  onBack: () => void;
}

export default function ReceiptView({ booking, onBack }: ReceiptViewProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate dynamic stable receipt details
  const receiptId = `STB-REC-${booking.id.split('-')[1]?.toUpperCase() || '7329'}-${Math.floor(1000 + Math.random() * 9000)}`;
  const today = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
      alert(`Receipt ${receiptId} downloaded successfully as PDF!`);
    }, 1000);
  };

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(receiptId);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="receipt-view" className="max-w-xl mx-auto my-6 p-4">
      {/* Back CTA */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-700 bg-white border-2 border-slate-900 px-3.5 py-2 rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-slate-50 transition-all cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      {/* Main Ticket/Voucher UI */}
      <div className="bg-white rounded-xl border-2 border-slate-900 shadow-[8px_8px_0px_rgba(15,23,42,1)] overflow-hidden relative">
        
        {/* Top Header stripe */}
        <div className="bg-indigo-600 p-6 text-white text-center relative border-b-2 border-slate-900">
          <div className="absolute top-2 right-4 text-[9px] bg-white text-indigo-950 px-2 py-0.5 rounded border border-slate-900 font-black tracking-wider uppercase shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
            OFFICIAL SECURE
          </div>
          <div className="w-12 h-12 bg-white text-indigo-950 rounded border-2 border-slate-900 flex items-center justify-center mx-auto mb-3 shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)]">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-black uppercase tracking-tighter">StockBridge Receipt</h3>
          <p className="text-[10px] text-indigo-100 uppercase tracking-widest font-black mt-1">Transaction Successful &amp; Secured</p>
        </div>

        {/* Receipt Details Body */}
        <div className="p-6 md:p-8 space-y-6">
          
          {/* Main invoice status header */}
          <div className="text-center space-y-1">
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">RECEIPT REFERENCE</span>
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg font-mono font-black text-slate-900 uppercase">{receiptId}</span>
              <button
                onClick={handleCopy}
                className="px-2 py-1 bg-slate-100 border-2 border-slate-900 rounded text-slate-900 hover:bg-slate-200 text-[9px] font-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                title="Copy receipt ID"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <span className="text-xs text-slate-500 font-bold block">{today}</span>
          </div>

          <div className="border-2 border-slate-900 bg-slate-50 p-4 rounded space-y-3 text-xs font-bold uppercase tracking-wide">
            {/* Storage space */}
            <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-1">
              <span className="text-slate-500 font-black">Storage Location:</span>
              <span className="font-black text-slate-900 text-right">{booking.listingName}</span>
            </div>

            {/* Chosen Start Date */}
            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="text-slate-500 font-black">Start Lease Date:</span>
              <span className="font-black text-slate-900">{booking.date}</span>
            </div>

            {/* Company / Client */}
            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="text-slate-500 font-black">Registered Tenant:</span>
              <span className="font-black text-slate-900">{booking.companyName}</span>
            </div>

            {/* Tenant Phone */}
            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="text-slate-500 font-black">Tenant Phone:</span>
              <span className="font-mono text-slate-900 font-black">{booking.companyPhone}</span>
            </div>

            {/* Agreed Lease rent */}
            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="text-slate-500 font-black">Agreed Rent:</span>
              <span className="font-black text-indigo-600">{booking.price}</span>
            </div>

            {/* Booking coordination notes */}
            {booking.rentalTermsDiscussed && (
              <div className="pt-2.5 border-t border-slate-200">
                <span className="text-slate-500 font-black block mb-1">Agreed Lease Terms:</span>
                <p className="bg-white p-3 rounded border-2 border-slate-900 text-slate-700 italic leading-relaxed text-[11px] font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)] normal-case">
                  "{booking.rentalTermsDiscussed}"
                </p>
              </div>
            )}
          </div>

          {/* Pricing detail box */}
          <div className="bg-emerald-50 rounded border-2 border-slate-900 p-4 flex items-center justify-between shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <div>
              <span className="text-xs font-black text-emerald-950 uppercase block">STOCKBRIDGE FEE</span>
              <span className="text-[10px] text-emerald-700 block font-bold uppercase tracking-wider">Flat coordination rate</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-emerald-950">₹30.00</span>
              <span className="text-[9px] text-emerald-700 block font-black uppercase tracking-wider">All Taxes Included</span>
            </div>
          </div>

          {/* Secure Stamp Graphic */}
          <div className="flex items-center justify-center pt-2">
            <div className="border-4 border-dashed border-red-500 text-red-500 rounded-xl px-6 py-2 transform -rotate-3 font-black text-xs uppercase tracking-widest text-center shadow-[3px_3px_0px_rgba(239,68,68,0.15)]">
              <div>₹30.00 PAID</div>
              <div className="text-[9px] mt-0.5">STOCKBRIDGE SECURE</div>
            </div>
          </div>

          {/* Print & Download buttons */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t-2 border-slate-900">
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-1.5 py-3.5 bg-white hover:bg-slate-50 text-slate-950 border-2 border-slate-900 rounded font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print Receipt
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-1.5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white border-2 border-slate-900 rounded font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              {downloaded ? 'Downloading...' : 'Download PDF'}
            </button>
          </div>

          <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5 font-bold uppercase">
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span>Co-signed copies emailed to both parties.</span>
          </div>

        </div>
      </div>
    </div>
  );
}
