'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CheckCircle2, Store, Sparkles, LogOut } from 'lucide-react';
import { Language, UserRole } from '../types/ecommerce';

interface GoogleAuthModalProps {
  isOpen: boolean;
  targetRole: 'seller' | 'admin';
  lang: Language;
  onClose: () => void;
  onSuccess: (userData: { name: string; email: string; avatar: string; role: 'seller' | 'admin' }) => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  targetRole,
  lang,
  onClose,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGoogleAccount, setSelectedGoogleAccount] = useState<string | null>(null);

  if (!isOpen) return null;

  const mockGoogleAccounts = [
    {
      name: 'Natnael Berhanu',
      email: 'natiberhanu0583@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Kelal Gebeya Official',
      email: 'admin@kelalgebeya.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
  ];

  const handleGoogleSignIn = (acc: { name: string; email: string; avatar: string }) => {
    setIsLoading(true);
    setSelectedGoogleAccount(acc.email);

    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        name: acc.name,
        email: acc.email,
        avatar: acc.avatar,
        role: targetRole,
      });
      onClose();
    }, 1200);
  };

  const isSeller = targetRole === 'seller';
  const roleTitleAm = isSeller ? 'የሻጭ ፖርታል (Seller Studio)' : 'የአድሚን መቆጣጠሪያ (Admin Control)';
  const roleTitleEn = isSeller ? 'Seller Studio Portal' : 'Central Admin Dashboard';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
            {isSeller ? (
              <Store className="w-8 h-8 text-emerald-400" />
            ) : (
              <ShieldCheck className="w-8 h-8 text-indigo-400" />
            )}
          </div>
          <h2 className="text-xl font-black text-white">
            {lang === 'am' ? 'በ Google አካውንት ይግቡ' : 'Sign in with Google'}
          </h2>
          <p className="text-xs font-semibold text-emerald-400">
            {lang === 'am' ? roleTitleAm : roleTitleEn}
          </p>
        </div>

        {/* Official Google Brand Button */}
        <div className="space-y-3">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
            {lang === 'am' ? 'የጎግል አካውንትዎን ይምረጡ' : 'Choose a Google Account'}
          </p>

          <div className="space-y-2.5">
            {mockGoogleAccounts.map((acc) => {
              const isSelected = selectedGoogleAccount === acc.email && isLoading;
              return (
                <button
                  key={acc.email}
                  onClick={() => handleGoogleSignIn(acc)}
                  disabled={isLoading}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950/60 border-emerald-500/80 shadow-md shadow-emerald-500/10'
                      : 'bg-slate-950/80 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={acc.avatar}
                      alt={acc.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                    <div className="text-left">
                      <p className="text-xs font-extrabold text-white flex items-center gap-1">
                        <span>{acc.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
                      </p>
                      <p className="text-[11px] text-slate-400">{acc.email}</p>
                    </div>
                  </div>

                  {isSelected ? (
                    <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Google Account Login Option */}
        <div className="pt-2 text-center border-t border-slate-800">
          <button
            onClick={() => handleGoogleSignIn(mockGoogleAccounts[0])}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-white text-slate-900 font-bold px-4 py-3 rounded-2xl hover:bg-slate-100 transition-colors text-xs cursor-pointer shadow-md"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{lang === 'am' ? 'በሌላ ጎግል አካውንት ይግቡ' : 'Sign in with another Google Account'}</span>
          </button>
        </div>

        {/* Security Badge Footer */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-semibold pt-1">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>{lang === 'am' ? 'በ Google OAuth 2.0 የተጠበቀ አውተንቲኬሽን' : 'Protected by Google OAuth 2.0 Security'}</span>
        </div>

      </div>
    </div>
  );
};
