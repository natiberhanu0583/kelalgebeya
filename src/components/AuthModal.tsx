'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, KeyRound, Eye, EyeOff, ShieldCheck, Store, LogIn, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language, UserRole, Seller } from '../types/ecommerce';

interface AuthModalProps {
  isOpen: boolean;
  targetRole: 'seller' | 'admin';
  lang: Language;
  onClose: () => void;
  onSuccess: (userData: { name: string; email: string; avatar?: string; role: 'seller' | 'admin' }) => void;
  sellers?: Seller[];
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  targetRole,
  lang,
  onClose,
  onSuccess,
  sellers = [],
}) => {
  const [authMethod, setAuthMethod] = useState<'password' | 'google'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const isSeller = targetRole === 'seller';
  const roleTitleAm = isSeller ? 'የሻጭ ፖርታል መግቢያ' : 'የአድሚን መቆጣጠሪያ መግቢያ';
  const roleTitleEn = isSeller ? 'Seller Portal Login' : 'Admin Control Login';

  // Demo Credentials for quick testing
  const defaultAdminEmail = 'admin@kelalgebeya.com';
  const defaultAdminPass = 'admin123';

  const defaultSellerEmail = sellers[0]?.email || 'tadesse@bale.et';
  const defaultSellerPass = 'seller123';

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (targetRole === 'admin') {
        // Admin Authentication
        if (
          (email.toLowerCase() === defaultAdminEmail.toLowerCase() || email.toLowerCase() === 'admin@ethiopiacitiesmarket.et') &&
          (password === defaultAdminPass || password === 'admin123password' || password === 'admin123')
        ) {
          onSuccess({
            name: 'የስርዓቱ ዋና አድሚን (Super Admin)',
            email: email,
            role: 'admin',
          });
          onClose();
        } else {
          setErrorMsg(
            lang === 'am'
              ? '❌ የገባው ኢሜይል ወይም የይለፍ ቃል (Password) አልተዛመደም!'
              : '❌ Invalid Email or Password for Admin Login!'
          );
        }
      } else {
        // Seller Authentication
        const matchingSeller = sellers.find(
          (s) => s.email.toLowerCase() === email.toLowerCase()
        );

        if (
          (matchingSeller || email.toLowerCase() === defaultSellerEmail.toLowerCase()) &&
          (password === defaultSellerPass || password === 'seller123password' || password === '123456' || password === 'seller123')
        ) {
          onSuccess({
            name: matchingSeller ? matchingSeller.businessName : 'ታደሰ አለሙ (Bale Robe)',
            email: email,
            role: 'seller',
          });
          onClose();
        } else if (password.length >= 6) {
          // Allow any valid 6+ char password for demo sellers
          onSuccess({
            name: email.split('@')[0],
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
      <div className="relative w-full max-w-md bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title Banner */}
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
            {lang === 'am'
              ? 'ለመቀጠል እባክዎን በይለፍ ቃል ወይም በ Google ይግቡ'
              : 'Please authenticate to access protected features'}
          </p>
        </div>

        {/* Auth Method Switcher Tabs */}
        <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setAuthMethod('password')}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              authMethod === 'password'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>{lang === 'am' ? 'ኢሜይል እና ፓስዎርድ' : 'Email & Password'}</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthMethod('google')}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              authMethod === 'google'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Google Login</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-rose-500/10 border border-rose-500/40 p-3 rounded-2xl text-xs text-rose-400 font-semibold flex items-center gap-2">
            <span>{errorMsg}</span>
          </div>
        )}

        {/* TAB 1: Email & Password Form */}
        {authMethod === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {lang === 'am' ? 'ኢሜይል አድራሻ (Email Address)' : 'Email Address'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isSeller ? defaultSellerEmail : defaultAdminEmail}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  required
                />
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {lang === 'am' ? 'የይለፍ ቃል (Password)' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  required
                />
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Hint Box for Easy Testing */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p className="font-bold text-emerald-400">💡 Demo Credentials:</p>
              {isSeller ? (
                <p>Email: <code className="text-white">{defaultSellerEmail}</code> | Pass: <code className="text-white">{defaultSellerPass}</code></p>
              ) : (
                <p>Email: <code className="text-white">{defaultAdminEmail}</code> | Pass: <code className="text-white">{defaultAdminPass}</code></p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl transition-colors text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>{lang === 'am' ? 'በይለፍ ቃል ይግቡ (Log In)' : 'Log In'}</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* TAB 2: Google Login Options */}
        {authMethod === 'google' && (
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
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </button>

            <button
              type="button"
              onClick={() => handleGoogleSignIn('Kelal Gebeya Admin', 'admin@kelalgebeya.com', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80')}
              disabled={isLoading}
              className="w-full flex items-center justify-between p-3.5 bg-slate-950 hover:bg-slate-800 rounded-2xl border border-slate-800 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                  alt="Admin"
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Kelal Gebeya Admin</p>
                  <p className="text-[11px] text-slate-400">admin@kelalgebeya.com</p>
                </div>
              </div>
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
