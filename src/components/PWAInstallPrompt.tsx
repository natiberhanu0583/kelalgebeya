'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registered:', registration.scope);
        })
        .catch((error) => {
          console.log('❌ SW registration failed:', error);
        });
    }

    // Detect iOS
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    setIsIOS(isApple);

    // If already installed as PWA, don't show
    if (isInStandaloneMode) return;

    // Listen for install prompt (Android/Chrome/Edge)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // For iOS, show custom guide after 3 seconds
    if (isApple && !isInStandaloneMode) {
      const timer = setTimeout(() => setShowBanner(true), 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('✅ PWA installed!');
      }
      setDeferredPrompt(null);
      setShowBanner(false);
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Install Banner - Bottom of Screen */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slideUp">
        <div className="max-w-lg mx-auto px-4 pb-4">
          <div className="bg-slate-900/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-4 shadow-2xl shadow-emerald-500/10">
            
            <div className="flex items-start gap-3">
              {/* App Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 flex-shrink-0">
                <Smartphone className="w-7 h-7 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-black text-white">
                  📲 ቀላል ገበያ App ጫን!
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  ስልክዎ ላይ እንደ App ይጫኑት — ፈጣን ግብይት ያድርጉ!
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={handleInstallClick}
                    className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isIOS ? 'እንዴት እንደሚጫን ይመልከቱ' : 'አሁን ጫን (Install)'}</span>
                  </button>

                  <button
                    onClick={() => setShowBanner(false)}
                    className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* iOS Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-end justify-center animate-fadeIn" onClick={() => setShowIOSGuide(false)}>
          <div 
            className="bg-slate-900 rounded-t-3xl border-t border-slate-700 p-6 w-full max-w-lg space-y-4 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto" />

            <h3 className="text-lg font-black text-white text-center">
              📲 iPhone / iPad ላይ App ጫን
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-slate-800/60 p-3 rounded-xl">
                <span className="text-lg">1️⃣</span>
                <div>
                  <p className="text-xs font-bold text-white">Safari ብራውዘር ይጠቀሙ</p>
                  <p className="text-[11px] text-slate-400">ይህንን ዌብሳይት Safari ላይ ይክፈቱ</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/60 p-3 rounded-xl">
                <span className="text-lg">2️⃣</span>
                <div>
                  <p className="text-xs font-bold text-white">Share ቁልፍ ይጫኑ ⬆️</p>
                  <p className="text-[11px] text-slate-400">ከታች ያለውን Share (⬆️) ምልክት ይጫኑ</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/60 p-3 rounded-xl">
                <span className="text-lg">3️⃣</span>
                <div>
                  <p className="text-xs font-bold text-white">&quot;Add to Home Screen&quot; ይምረጡ</p>
                  <p className="text-[11px] text-slate-400">ወደ ታች ይሸብልሉ &quot;Add to Home Screen&quot; ይጫኑ</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl">
                <span className="text-lg">✅</span>
                <div>
                  <p className="text-xs font-bold text-emerald-400">ቀላል ገበያ App ተጭኗል!</p>
                  <p className="text-[11px] text-slate-400">ከHome Screen ላይ ሆነው ልክ እንደ App ይጠቀሙ!</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-xs transition-colors"
            >
              ገባኝ (Close)
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
  );
};
