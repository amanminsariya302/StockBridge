import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Smartphone, CheckCircle, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { BookingRequest } from '../types';

interface PaymentMockProps {
  booking: BookingRequest;
  role: 'company' | 'provider';
  onPaymentSuccess: (bookingId: string) => void;
  onCancel: () => void;
}

export default function PaymentMock({ booking, role, onPaymentSuccess, onCancel }: PaymentMockProps) {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('aman@oksbi');
  const [cardNumber, setCardNumber] = useState('4321 8876 5432 1010');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCVV, setCardCVV] = useState('123');

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate standard razorpay payment gateway processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onPaymentSuccess(booking.id);
      }, 1800);
    }, 2000);
  };

  return (
    <div id="payment-mock-container" className="max-w-md mx-auto my-6 p-4">
      {/* Back button */}
      <button
        onClick={onCancel}
        disabled={isProcessing || isSuccess}
        className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-700 bg-white border-2 border-slate-900 px-3.5 py-2 rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-50 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-xl border-2 border-slate-900 shadow-[8px_8px_0px_rgba(15,23,42,1)] p-6 md:p-8 space-y-6 relative overflow-hidden">
        {/* Processing State overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-6 z-10 text-center border-2 border-slate-900">
            <Loader2 className="w-12 h-12 text-slate-900 animate-spin mb-4" />
            <h4 className="text-lg font-black uppercase tracking-tighter text-slate-950">Processing Secure Payment...</h4>
            <p className="text-xs text-slate-500 font-bold mt-1">Please do not refresh this page or click back.</p>
            <div className="mt-8 p-3 bg-slate-50 border-2 border-slate-900 rounded text-[10px] font-black text-slate-700 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              GATEWAY_SEC_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
          </div>
        )}

        {/* Success State overlay */}
        {isSuccess && (
          <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 z-10 text-center border-2 border-slate-900 animate-fade-in">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 bg-emerald-100 rounded border-2 border-slate-900 flex items-center justify-center text-slate-900 mb-4 shadow-[3px_3px_0px_rgba(0,0,0,1)]"
            >
              <CheckCircle className="w-10 h-10" />
            </motion.div>
            <h4 className="text-xl font-black uppercase tracking-tighter text-slate-950">Payment Successful!</h4>
            <p className="text-xs text-slate-500 font-bold mt-1">Platform service fee received. Generating receipt.</p>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-950 bg-emerald-100 border-2 border-slate-900 px-3 py-1.5 rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] mt-4">
              ₹30 Secured
            </span>
          </div>
        )}

        {/* Title */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-950 border border-slate-900 shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            StockBridge Pay
          </span>
          <h3 className="text-xl font-black uppercase tracking-tighter text-slate-950">Secure Platform Fee</h3>
          <p className="text-xs text-slate-500 font-bold mt-1">
            Flat coordination fee to finalise your storage booking.
          </p>
        </div>

        {/* Invoice Summary */}
        <div className="p-4 bg-slate-50 rounded border-2 border-slate-900 shadow-[4px_4px_0px_rgba(0,0,0,1)] space-y-2.5 text-xs font-bold uppercase">
          <div className="flex items-center justify-between">
            <span className="font-black text-slate-500">Storage Unit:</span>
            <span className="font-black text-slate-800 text-right line-clamp-1">{booking.listingName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-black text-slate-500">Agreed Rent:</span>
            <span className="font-black text-slate-800">{booking.price}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-black text-slate-500">Payer Role:</span>
            <span className="font-black text-indigo-700 uppercase">{role === 'company' ? 'Company Client' : 'Storage Owner'}</span>
          </div>
          <div className="h-px bg-slate-200/60 my-1" />
          <div className="flex items-center justify-between pt-2.5 border-t-2 border-slate-900">
            <span className="font-black text-slate-800 text-sm">Platform Fee due:</span>
            <span className="font-black text-indigo-600 text-base">₹30.00</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handlePay} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Select Payment Method</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`flex items-center justify-center gap-2 p-3 rounded border-2 border-slate-900 text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
                  paymentMethod === 'upi'
                    ? 'bg-emerald-50 text-emerald-950'
                    : 'bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-4 h-4 text-slate-900" />
                UPI / QR
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center justify-center gap-2 p-3 rounded border-2 border-slate-900 text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
                  paymentMethod === 'card'
                    ? 'bg-emerald-50 text-emerald-950'
                    : 'bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4 text-slate-900" />
                Card Pay
              </button>
            </div>
          </div>

          {/* Conditional Input UI */}
          {paymentMethod === 'upi' ? (
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Enter UPI ID (e.g. Google Pay / Paytm)</label>
              <input
                type="text"
                required
                placeholder="yourname@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-xs font-bold rounded p-3 outline-none transition-all"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Card Number</label>
                <input
                  type="text"
                  required
                  placeholder="4321 8876 5432 1010"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-xs font-bold rounded p-3 outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">Expiry Date</label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-xs font-bold rounded p-3 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1">CVV</label>
                  <input
                    type="password"
                    required
                    maxLength={3}
                    placeholder="•••"
                    value={cardCVV}
                    onChange={(e) => setCardCVV(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-xs font-bold rounded p-3 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Secure disclaimer */}
          <div className="text-[10px] text-slate-400 text-center leading-normal font-bold uppercase">
            By proceeding, you agree to StockBridge rental matching guidelines. 256-bit SSL secured.
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest border-2 border-slate-900 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          >
            Pay Securely ₹30.00
          </button>
        </form>
      </div>
    </div>
  );
}
