import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Phone, User as UserIcon, Building2, Warehouse, ShieldAlert, ArrowRight } from 'lucide-react';
import { Language, User, UserRole } from '../types';
import { TRANSLATIONS } from '../data';

interface LoginRegisterProps {
  language: Language;
  onAuthSuccess: (user: User) => void;
}

export default function LoginRegister({ language, onAuthSuccess }: LoginRegisterProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>('company');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const t = TRANSLATIONS[language];

  // Quick helper to autofill mock account for quick demonstration
  const handleAutofill = (selectedRole: UserRole) => {
    if (selectedRole === 'company') {
      setEmail('aman@company.in');
      setPassword('securepass');
      setName('Aman Enterprises');
      setPhone('9876543210');
    } else {
      setEmail('sharma@storages.com');
      setPassword('securepass');
      setName('Sharma Logistical Parks');
      setPhone('9123456780');
    }
    setRole(selectedRole);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    if (!isLogin && (!name || !phone)) {
      setError('Name and Phone number are required to register.');
      return;
    }

    // Generate simulated user
    const mockUser: User = {
      id: isLogin 
        ? (email.includes('sharma') || role === 'provider' ? 'usr-provider' : 'usr-company')
        : `usr-${Math.random().toString(36).substr(2, 9)}`,
      name: isLogin ? (email.includes('sharma') ? 'Sharma Logistical Parks' : 'Aman Enterprises') : name,
      email,
      phone: isLogin ? '9876543210' : phone,
      role: isLogin ? (email.includes('sharma') ? 'provider' : role) : role,
    };

    onAuthSuccess(mockUser);
  };

  return (
    <div id="auth-container" className="max-w-md mx-auto my-8 p-1">
      {/* Tab Selectors */}
      <div className="flex bg-slate-100 p-1.5 border-2 border-slate-900 rounded-xl mb-6 shadow-[3px_3px_0px_rgba(15,23,42,1)]">
        <button
          id="btn-tab-login"
          type="button"
          onClick={() => { setIsLogin(true); setError(''); }}
          className={`flex-1 py-3 text-center text-xs font-black uppercase tracking-wider rounded transition-all cursor-pointer ${
            isLogin ? 'bg-indigo-600 text-white border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Sign In
        </button>
        <button
          id="btn-tab-register"
          type="button"
          onClick={() => { setIsLogin(false); setError(''); }}
          className={`flex-1 py-3 text-center text-xs font-black uppercase tracking-wider rounded transition-all cursor-pointer ${
            !isLogin ? 'bg-indigo-600 text-white border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Register
        </button>
      </div>

      <div className="bg-white rounded-xl border-2 border-slate-900 shadow-[6px_6px_0px_rgba(15,23,42,1)] p-6 md:p-8">
        <h2 id="auth-title" className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-950 mb-1">
          {isLogin ? t.loginTitle : t.registerTitle}
        </h2>
        <p className="text-slate-500 font-bold text-xs mb-6">
          {isLogin ? "Sign in to access your dashboard and manage storage." : "Create a new StockBridge account as a business or storage space owner."}
        </p>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-rose-100 border-2 border-rose-950 rounded text-rose-950 text-xs font-black uppercase tracking-wide mb-4 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Demo Account Quick-Fill Tags */}
        <div className="mb-6 p-4 bg-orange-50 rounded-lg border-2 border-slate-900 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
          <span className="text-[10px] font-black tracking-wider text-slate-500 uppercase block mb-3">
            🚀 College Project Quick-Fill (Click to Test)
          </span>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => handleAutofill('company')}
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border-2 border-slate-900 rounded text-[11px] font-black uppercase tracking-wider text-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-indigo-600" />
              As Company
            </button>
            <button
              type="button"
              onClick={() => handleAutofill('provider')}
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border-2 border-slate-900 rounded text-[11px] font-black uppercase tracking-wider text-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              <Warehouse className="w-3.5 h-3.5 text-indigo-600" />
              As Provider
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role selector on Registration OR Login */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">{t.roleSelect}</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('company')}
                className={`flex items-center justify-center gap-2 p-3 rounded border-2 border-slate-900 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  role === 'company'
                    ? 'bg-indigo-600 text-white shadow-[3px_3px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Building2 className="w-4 h-4" />
                Company
              </button>
              <button
                type="button"
                onClick={() => setRole('provider')}
                className={`flex items-center justify-center gap-2 p-3 rounded border-2 border-slate-900 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  role === 'provider'
                    ? 'bg-indigo-600 text-white shadow-[3px_3px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Warehouse className="w-4 h-4" />
                Provider
              </button>
            </div>
          </div>

          {/* Full name (Register only) */}
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">{t.fullName}</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g., Aman Enterprises"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-slate-900 text-xs font-bold rounded pl-9 pr-4 py-3 outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Phone Number (Register only) */}
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">{t.phone}</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="tel"
                  placeholder="e.g., 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-slate-900 text-xs font-bold rounded pl-9 pr-4 py-3 outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">{t.email}</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
              <input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-slate-900 text-xs font-bold rounded pl-9 pr-4 py-3 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">{t.password}</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-900 focus:border-indigo-600 focus:bg-white text-slate-900 text-xs font-bold rounded pl-9 pr-4 py-3 outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            id="btn-auth-submit"
            type="submit"
            className="w-full flex items-center justify-center gap-2 mt-4 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-xs border-2 border-slate-900 shadow-[4px_4px_0px_rgba(15,23,42,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_rgba(15,23,42,1)] transition-all cursor-pointer"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
