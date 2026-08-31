'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, KeyRound, Eye, EyeOff, ShieldCheck, Store, LogIn, UserPlus, MapPin, Phone, Building } from 'lucide-react';
import { Language, UserRole, Seller, ETHIOPIAN_CITIES, EthiopianCityCode } from '../types/ecommerce';

interface AuthModalProps {
  isOpen: boolean;
  targetRole: 'seller' | 'admin';
  lang: Language;
  onClose: () => void;
  onSuccess: (userData: { name: string; email: string; avatar?: string; role: 'seller' | 'admin' }) => void;
  sellers?: Seller[];
  onRegisterSeller?: (newSeller: Seller) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  targetRole,
  lang,
  onClose,
  onSuccess,
  sellers = [],
  onRegisterSeller,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [authMethod, setAuthMethod] = useState<'password' | 'google'>('password');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // New Seller Registration states
  const [businessName, setBusinessName] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState<EthiopianCityCode>('ADDIS_ABABA');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const isSeller = targetRole === 'seller';
  const roleTitleAm = isSeller 
    ? (mode === 'login' ? 'የሻጭ ፖርታል መግቢያ' : 'አዲስ ሻጭ መመዝገቢያ') 
    : 'የአድሚን መቆጣጠሪያ መግቢያ';
  const roleTitleEn = isSeller 
    ? (mode === 'login' ? 'Seller Portal Login' : 'Seller Registration') 
    : 'Admin Control Login';

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (targetRole === 'admin') {
        // Admin Authentication
        const isAdminEmail = 
          email.toLowerCase() === 'admin@kelalgebeya.com' ||
          email.toLowerCase() === 'admin@ethiopiacitiesmarket.et' ||
          email.toLowerCase().endsWith('@kelalgebeya.com') ||
          email.toLowerCase() === 'natiberhanu0583@gmail.com';

        const isValidAdminPass = 
          password === 'admin123password' || 
          password === 'admin123' || 
          password === 'Nati@2127' ||
          password === 'admin';

        if (isAdminEmail && isValidAdminPass) {
          onSuccess({
            name: 'የስርዓቱ ዋና አድሚን (Super Admin)',
            email: email,
            role: 'admin',
          });
          onClose();
        } else {
          setErrorMsg(
            lang === 'am'
              ? '❌ የተሳሳተ የአድሚን ኢሜይል ወይም የይለፍ ቃል! (ያልተፈቀደ መግባት አይቻልም)'
              : '❌ Invalid Admin credentials! Access Denied.'
          );
        }
      } else {
        // Seller Mode
        if (mode === 'register') {
          // Seller Registration Flow
          if (!businessName.trim() || !fullName.trim() || !phone.trim()) {
            setErrorMsg(lang === 'am' ? '❌ እባክዎን ሁሉንም መስኮች በደንብ ይሙሉ' : '❌ Please fill in all fields');
            return;
          }

          const newSellerObj: Seller = {
            id: `seller-${Date.now()}`,
            name: fullName.trim(),
            businessName: businessName.trim(),
            city: city,
            phone: phone.trim(),
            email: email.trim(),
            joinedDate: new Date().toISOString().split('T')[0],
            subscriptionStatus: 'active',
            rentAmount: 1500,
            dueDate: '2026-09-30',
          };

          if (onRegisterSeller) {
            onRegisterSeller(newSellerObj);
          }

          onSuccess({
            name: newSellerObj.businessName,
            email: newSellerObj.email,
            role: 'seller',
          });
          onClose();
        } else {
          // Seller Login Flow
          const matchingSeller = sellers.find(
            (s) => s.email.toLowerCase() === email.toLowerCase()
          );

          if (matchingSeller || password.length >= 6) {
            onSuccess({
              name: matchingSeller ? matchingSeller.businessName : (email.split('@')[0]),
              email: email,
              role: 'seller',
            });
            onClose();
          } else {
            setErrorMsg(
              lang === 'am'
                ? '❌ የገባው ኢሜይል ወይም የይለፍ ቃል አልተዛመደም! (ቢያንስ 6 ፊደል ይኑረው)'
                : '❌ Invalid Email or Password! (Must be at least 6 characters)'
            );
          }
        }
      }
    }, 800);
  };

  const handleGoogleSignIn = (accName: string, accEmail: string, avatar: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        name: accName,
        email: accEmail,
        avatar: avatar,
        role: targetRole,
      });
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg">
            {isSeller ? (
              <Store className="w-7 h-7 text-emerald-400" />
            ) : (
              <ShieldCheck className="w-7 h-7 text-indigo-400" />
            )}
          </div>
          <h2 className="text-xl font-black text-white">
            {lang === 'am' ? roleTitleAm : roleTitleEn}
          </h2>
          <p className="text-xs text-slate-400">
            {isSeller
              ? (lang === 'am' ? 'ምርቶችዎን ለማስተዋወቅ እና ለመሸጥ ይግቡ' : 'Access your seller studio to manage & post products')
              : (lang === 'am' ? 'የስርዓቱን ደህንነት ለመጠበቅ በአድሚን ኮድ ይግቡ' : 'Strict Security Protected Master Admin System')}
          </p>
        </div>

        {/* Seller Switcher (Login vs Register) */}
        {isSeller && (
          <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(null); }}
              className={`flex-1 py-2 rounded-xl transition-all ${
                mode === 'login'
                  ? 'bg-teal-500 text-slate-950 font-extrabold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'am' ? '🔑 ይግቡ (Log In)' : 'Log In'}
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMsg(null); }}
              className={`flex-1 py-2 rounded-xl transition-all ${
                mode === 'register'
                  ? 'bg-teal-500 text-slate-950 font-extrabold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'am' ? '✨ አዲስ ሻጭ ሁን (Register)' : 'Register Store'}
            </button>
          </div>
        )}

        {/* Auth Method Switcher Tabs */}
        {mode === 'login' && (
          <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => setAuthMethod('password')}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                authMethod === 'password'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{lang === 'am' ? 'በኢሜይል እና ፓስዎርድ' : 'Email & Password'}</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthMethod('google')}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                authMethod === 'google'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google Login</span>
            </button>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-rose-500/10 border border-rose-500/40 p-3 rounded-2xl text-xs text-rose-400 font-semibold flex items-center gap-2">
            <span>{errorMsg}</span>
          </div>
        )}

        {/* FORM SECTION */}
        {authMethod === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
            
            {/* Registration specific fields */}
            {mode === 'register' && isSeller && (
              <>
                {/* Business Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {lang === 'am' ? 'የንግድ ስም (Business / Shop Name)' : 'Shop Name'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="ለምሳሌ፡ ባሌ ሮቤ የኤሌክትሮኒክስ ሱቅ"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      required
                    />
                    <Building className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  </div>
                </div>

                {/* Owner Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {lang === 'am' ? 'የባለቤቱ ሙሉ ስም' : 'Owner Full Name'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="ለምሳሌ፡ አበበ ከበደ"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      required
                    />
                    <Store className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  </div>
                </div>

                {/* City Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {lang === 'am' ? 'ሱቁ የሚገኝበት ከተማ' : 'City Location'}
                  </label>
                  <div className="relative">
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value as EthiopianCityCode)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      {ETHIOPIAN_CITIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          📍 {lang === 'am' ? c.nameAm : c.nameEn}
                        </option>
                      ))}
                    </select>
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-emerald-400" />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {lang === 'am' ? 'ስልክ ቁጥር (+251...)' : 'Phone Number'}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+251911223344"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      required
                    />
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {lang === 'am' ? 'ኢሜይል አድራሻ (Email)' : 'Email Address'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isSeller ? 'seller@domain.com' : 'admin@kelalgebeya.com'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  required
                />
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {lang === 'am' ? 'የይለፍ ቃል (Password)' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-9 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  required
                />
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl transition-colors text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {mode === 'register' ? (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>{lang === 'am' ? 'ተመዝገብና ወደ ፖርታል ግባ' : 'Register & Access Portal'}</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>{lang === 'am' ? 'በይለፍ ቃል ይግቡ' : 'Log In Securely'}</span>
                    </>
                  )}
                </>
              )}
            </button>
          </form>
        )}

        {/* TAB 2: Google Login Options */}
        {authMethod === 'google' && mode === 'login' && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleGoogleSignIn('Natnael Berhanu', 'natiberhanu0583@gmail.com', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80')}
              disabled={isLoading}
              className="w-full flex items-center justify-between p-3.5 bg-slate-950 hover:bg-slate-800 rounded-2xl border border-slate-800 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Natnael"
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Natnael Berhanu</p>
                  <p className="text-[11px] text-slate-400">natiberhanu0583@gmail.com</p>
                </div>
              </div>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
