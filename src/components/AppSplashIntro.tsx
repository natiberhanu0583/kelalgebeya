'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface AppSplashIntroProps {
  onComplete?: () => void;
}

export const AppSplashIntro: React.FC<AppSplashIntroProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Show splash screen intro for 1.8 seconds then fade out smoothly
    const timer1 = setTimeout(() => {
      setIsFading(true);
    }, 1800);

    const timer2 = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 2300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#0b192c] via-[#0f172a] to-[#09111e] text-white transition-opacity duration-500 selection:bg-orange-500 selection:text-white ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/15 rounded-full filter blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-600/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 space-y-6 max-w-sm">
        
        {/* Animated Brand Logo Container */}
        <div className="relative group">
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-orange-500 via-amber-400 to-sky-500 opacity-60 blur-xl animate-tilt" />
          
          <div className="relative p-6 bg-slate-900/90 rounded-3xl border border-orange-500/40 shadow-2xl backdrop-blur-2xl transform transition-transform duration-700 hover:scale-105">
            <img
              src="/logo-full.png"
              alt="ቀላል ገበያ Kelal Gebeya"
              className="h-32 sm:h-40 w-auto object-contain drop-shadow-2xl animate-pulse"
            />
          </div>
        </div>

        {/* Tagline & City Market Badge */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>የኢትዮጵያ ከተሞች ቀጥታ ገበያ</span>
          </div>

          <p className="text-xs text-slate-300 font-semibold tracking-wide">
            www.kelalgebeya.com
          </p>
        </div>

        {/* Animated Loading Bar */}
        <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60 shadow-inner mt-4">
          <div className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-sky-400 animate-pulse rounded-full w-full" />
        </div>

      </div>
    </div>
  );
};

interface AppOutroModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleAm?: string;
  messageAm?: string;
}

export const AppOutroModal: React.FC<AppOutroModalProps> = ({
  isOpen,
  onClose,
  titleAm = 'እናመሰግናለን! (Thank You)',
  messageAm = 'በቀላል ገበያ ስለገበዩ እናመሰግናለን። ፈጣንና አስተማማኝ ግብይትን ከእኛ ጋር ይፈጽሙ።',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-orange-500/40 rounded-3xl p-6 shadow-2xl space-y-5 text-center text-white overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full filter blur-2xl pointer-events-none" />

        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
        </div>

        <img
          src="/logo-full.png"
          alt="Kelal Gebeya Logo"
          className="h-20 w-auto object-contain mx-auto"
        />

        <div className="space-y-2">
          <h3 className="text-xl font-black text-white">{titleAm}</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {messageAm}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-orange-500 hover:bg-orange-400 text-slate-950 font-black py-3 rounded-2xl shadow-lg transition-all text-sm"
        >
          እሺ (Close)
        </button>
      </div>
    </div>
  );
};
