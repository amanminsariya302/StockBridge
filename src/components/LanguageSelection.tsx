import { motion } from 'motion/react';
import { Languages, Globe } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface LanguageSelectionProps {
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onNext: () => void;
}

export default function LanguageSelection({ currentLanguage, onSelectLanguage, onNext }: LanguageSelectionProps) {
  const languagesList: { code: Language; name: string; native: string; welcome: string; flag: string }[] = [
    { code: 'en', name: 'English', native: 'English', welcome: 'Connecting storage providers & businesses', flag: '🇬🇧' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', welcome: 'स्टोरेज प्रदाता और व्यवसायों को जोड़ना', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', welcome: 'స్టోరేజ్ ప్రొవైడర్లు & వ్యాపారాలను కలపడం', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', welcome: 'સ્ટોરેજ પ્રોવાઇડર અને કંપનીઓ વચ્ચે સેતુ', flag: '🇮🇳' }
  ];

  return (
    <div id="language-selection-container" className="flex flex-col items-center justify-center min-h-[80vh] max-w-2xl mx-auto px-4 py-8">
      {/* Title Tag */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 px-4 py-2 rounded border-2 border-slate-900 bg-orange-100 text-slate-900 text-[11px] font-black uppercase tracking-wider mb-8 shadow-[3px_3px_0px_rgba(0,0,0,1)]"
      >
        <Languages className="w-4 h-4" />
        <span>CHOOSE PREFERRED LANGUAGE / भाषा चुनें</span>
      </motion.div>

      <h2 id="lang-title" className="text-3xl md:text-4xl font-black text-slate-950 uppercase tracking-tighter text-center mb-2">
        Select Language
      </h2>
      <p id="lang-sub" className="text-slate-600 font-bold text-center mb-10 max-w-md">
        Choose your preferred language to customize the StockBridge experience. This can be changed anytime.
      </p>

      {/* Grid of Languages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
        {languagesList.map((lang) => {
          const isSelected = currentLanguage === lang.code;
          return (
            <motion.button
              key={lang.code}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelectLanguage(lang.code)}
              className={`flex items-start gap-4 p-5 rounded-xl border-2 border-slate-900 text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-[4px_4px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)] hover:bg-slate-50'
              }`}
            >
              <span className="text-3xl mt-0.5">{lang.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg uppercase tracking-tight">
                    {lang.native}
                  </span>
                  {isSelected && (
                    <span className="bg-orange-100 text-orange-950 text-[10px] uppercase font-black px-2.5 py-0.5 rounded border border-slate-900 shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                      Active
                    </span>
                  )}
                </div>
                <span className={`text-[11px] font-bold block mt-0.5 uppercase tracking-wider ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                  {lang.name}
                </span>
                <p className={`text-[11px] font-bold leading-snug mt-3 line-clamp-1 ${isSelected ? 'text-indigo-50' : 'text-slate-500'}`}>
                  {lang.welcome}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full sm:w-64 flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-xs tracking-widest border-2 border-slate-900 shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all rounded-lg cursor-pointer"
      >
        <Globe className="w-4 h-4" />
        {TRANSLATIONS[currentLanguage].startBtn}
      </motion.button>
    </div>
  );
}
