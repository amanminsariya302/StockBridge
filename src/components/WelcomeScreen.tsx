import { motion } from 'motion/react';
import { Warehouse, ArrowRight, ShieldCheck, Banknote, MapPin, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface WelcomeScreenProps {
  language: Language;
  onContinue: () => void;
}

export default function WelcomeScreen({ language, onContinue }: WelcomeScreenProps) {
  const t = TRANSLATIONS[language];

  return (
    <div id="welcome-screen-container" className="flex flex-col items-center justify-center min-h-[85vh] max-w-4xl mx-auto px-4 py-8">
      {/* Visual Logo Container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-center w-24 h-24 rounded-3xl bg-indigo-600 text-white border-2 border-slate-900 shadow-[6px_6px_0px_rgba(15,23,42,1)] mb-8"
      >
        <Warehouse className="w-12 h-12" id="welcome-logo-icon" />
      </motion.div>

      {/* Main Title & Subtitle */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-orange-100 text-orange-900 border-2 border-slate-900 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_rgba(0,0,0,1)] mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          {t.logoSub}
        </span>
        <h1 id="welcome-title" className="text-5xl md:text-7xl font-black tracking-tighter text-slate-950 mb-6 uppercase leading-[0.9]">
          {t.welcome}
        </h1>
        <p id="welcome-subtitle" className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-bold">
          {t.welcomeSub}
        </p>
      </motion.div>

      {/* Feature Cards Grid (Why StockBridge?) */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mb-12"
      >
        <div id="feat-card-1" className="bg-white p-6 rounded-xl border-2 border-slate-900 shadow-[5px_5px_0px_rgba(15,23,42,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_rgba(15,23,42,1)] transition-all duration-200">
          <div className="w-12 h-12 rounded border-2 border-slate-900 bg-amber-100 flex items-center justify-center text-slate-900 mb-4 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-black text-slate-950 uppercase tracking-tight mb-2">Find Nearby Storage</h3>
          <p className="text-xs text-slate-600 font-bold leading-relaxed">
            Search warehouses, local backrooms, godowns, or cold storage rooms available around you instantly.
          </p>
        </div>

        <div id="feat-card-2" className="bg-white p-6 rounded-xl border-2 border-slate-900 shadow-[5px_5px_0px_rgba(15,23,42,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_rgba(15,23,42,1)] transition-all duration-200">
          <div className="w-12 h-12 rounded border-2 border-slate-900 bg-emerald-100 flex items-center justify-center text-slate-900 mb-4 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <Banknote className="w-6 h-6" />
          </div>
          <h3 className="font-black text-slate-950 uppercase tracking-tight mb-2">Monetize Empty Space</h3>
          <p className="text-xs text-slate-600 font-bold leading-relaxed">
            Rent out unused store corners, warehouses, or basements to verified businesses and earn stable income.
          </p>
        </div>

        <div id="feat-card-3" className="bg-white p-6 rounded-xl border-2 border-slate-900 shadow-[5px_5px_0px_rgba(15,23,42,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_rgba(15,23,42,1)] transition-all duration-200">
          <div className="w-12 h-12 rounded border-2 border-slate-900 bg-indigo-100 flex items-center justify-center text-slate-900 mb-4 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-black text-slate-950 uppercase tracking-tight mb-2">Flat Platform Fee</h3>
          <p className="text-xs text-slate-600 font-bold leading-relaxed">
            Decide rental terms directly with providers. Pay a transparent ₹30 fee only on successful connection!
          </p>
        </div>
      </motion.div>

      {/* Call to Action Button */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="w-full max-w-xs"
      >
        <button
          id="btn-welcome-continue"
          onClick={onContinue}
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm uppercase tracking-widest rounded-lg border-2 border-slate-900 shadow-[5px_5px_0px_rgba(15,23,42,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[3px_3px_0px_rgba(15,23,42,1)] transition-all cursor-pointer group"
        >
          {t.startBtn}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}
