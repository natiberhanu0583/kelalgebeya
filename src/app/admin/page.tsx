'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Mail, KeyRound, LogOut, ArrowLeft, Globe, Eye, EyeOff, AlertOctagon } from 'lucide-react';
import { AdminDashboard } from '../../components/AdminDashboard';
import { Seller, SiteSettings, AdminProfile, Language } from '../../types/ecommerce';
import { mockProducts, initialSellers } from '../../data/mockProducts';
import { fetchCloudData, pushCloudSellers, pushCloudProducts } from '../../utils/cloudDb';
import Link from 'next/link';

export default function AdminPage() {
  const [lang, setLang] = useState<Language>('am');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Admin Data State
  const [sellers, setSellers] = useState<Seller[]>(initialSellers);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteNameAm: 'ቀላል ገበያ',
    siteNameEn: 'Kelal Gebeya',
    siteSubtitleAm: 'የገዢዎች እና ሻጮች ቀጥታ ገበያ',
    siteSubtitleEn: 'Direct Buyer-Seller Local Platform',
    announcementAm: '🎉 ከሚፈልጉት ከተማ ፈጣን ግብይትን ይፈጽሙ',
    announcementEn: '🎉 Fast trading from any city of your choice!',
    heroTitleAm: 'በማንኛውም የኢትዮጵያ ከተሞች ፈጣን እና አስተማማኝ ግብይት',
    heroTitleEn: 'Fast and reliable trading in any Ethiopian city',
    heroSubtitleAm: 'በአዲስ አበባ፣ አዳማ፣ ደብረ ብርሃን፣ ሐዋሳ፣ ሻሸመኔ፣ ባሌ ጊኒር፣ ባሌ ሮቤ፣ ባሌ ጎባ፣ አሰላ፣ ድሬዳዋ፣ ባህር ዳር፣ ጅማ፣ ጎንደር፣ መቀሌ፣ ሐረር፣ አርባ ምንጭ እና በማንኛውም የኢትዮጵያ ከተሞች ፈጣን እና አስተማማኝ ግብይትን ይፈጽሙ።',
    heroSubtitleEn: 'Buy and sell directly in Addis Ababa, Adama, Debre Berhan, Hawassa, Shashemene, Bale Ginir, Bale Robe, Bale Goba, Asella, Dire Dawa, Bahir Dar, Jimma, Gondar, Mekelle, Harar, Arba Minch, and all Ethiopian cities.',
    supportPhone: '+251911223344',
    supportEmail: 'support@ethiopiacitiesmarket.et',
    telegramHandle: '@ethiopia_cities_admin',
    monthlyRentAmount: 1500,
    telebirrAccount: '+251911223344',
    cbeAccount: '1000123456789',
    enabledCities: [
      'ADDIS_ABABA', 'ADAMA', 'DEBRE_BERHAN', 'HAWASSA', 'SHASHEMENE',
      'BALE_GINIR', 'BALE_ROBE', 'BALE_GOBA', 'ASELLA', 'DIRE_DAWA',
      'BAHIR_DAR', 'JIMMA', 'GONDAR', 'MEKELLE', 'HARAR', 'ARBA_MINCH'
    ],
    categories: [
      { id: 'electronics', nameAm: 'ኤሌክትሮኒክስ እና ስልኮች', nameEn: 'Electronics & Phones', isActive: true },
      { id: 'fashion', nameAm: 'ልብሶች እና ፋሽን', nameEn: 'Fashion & Apparel', isActive: true },
      { id: 'vehicles', nameAm: 'ተሽከርካሪዎች', nameEn: 'Vehicles & Motors', isActive: true },
      { id: 'agriculture', nameAm: 'የግብርና እና የሀገር ምርቶች', nameEn: 'Agriculture & Crops', isActive: true },
      { id: 'home', nameAm: 'የቤት እቃዎች', nameEn: 'Home & Furniture', isActive: true },
      { id: 'coffee', nameAm: 'ቡና እና ቅመማ ቅመም', nameEn: 'Coffee & Spices', isActive: true },
    ]
  });

  const [adminProfile, setAdminProfile] = useState<AdminProfile>({
    name: 'የስርዓቱ ዋና አድሚን (Super Admin)',
    email: 'admin@ethiopiacitiesmarket.et',
    phone: '+251911000000',
    role: 'Super Administrator',
    lastLogin: '2026-08-31 16:30'
  });

  // Restore authenticated admin session & sync data
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAuth = localStorage.getItem('kelal_gebeya_admin_authenticated');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }

      const savedSettings = localStorage.getItem('kelal_gebeya_site_settings');
      if (savedSettings) {
        try { setSiteSettings(JSON.parse(savedSettings)); } catch (e) {}
      }
    }

    async function loadCloudData() {
      const cloudData = await fetchCloudData();
      if (cloudData) {
        if (cloudData.sellers && cloudData.sellers.length > 0) {
          setSellers(cloudData.sellers);
        }
        if (cloudData.siteSettings) {
          setSiteSettings(cloudData.siteSettings);
        }
      }
    }

    loadCloudData();
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const isValidEmail = 
        email.toLowerCase().trim() === 'admin@kelalgebeya.com' ||
        email.toLowerCase().trim() === 'natiberhanu0583@gmail.com';

      const isValidPass = 
        password === 'admin123password' || 
        password === 'Nati@2127';

      if (isValidEmail && isValidPass) {
        setIsAuthenticated(true);
        if (typeof window !== 'undefined') {
          localStorage.setItem('kelal_gebeya_admin_authenticated', 'true');
        }
      } else {
        setErrorMsg('❌ ያልተፈቀደ የመግባት ሙከራ! ትክክለኛውን የአድሚን ኢሜይል እና የይለፍ ቃል ያስገቡ።');
      }
    }, 800);
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kelal_gebeya_admin_authenticated');
    }
  };

  const handleUpdateSiteSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kelal_gebeya_site_settings', JSON.stringify(newSettings));
    }
  };

  const handleUpdateAdminProfile = (newProfile: AdminProfile) => {
    setAdminProfile(newProfile);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kelal_gebeya_admin_profile', JSON.stringify(newProfile));
    }
  };

  const handleToggleBlockSeller = (sellerId: string) => {
    setSellers((prev) => {
      const updated = prev.map((s) => {
        if (s.id === sellerId) {
          const newStatus = s.subscriptionStatus === 'blocked' ? 'active' : 'blocked';
          return { ...s, subscriptionStatus: newStatus };
        }
        return s;
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('kelal_gebeya_sellers', JSON.stringify(updated));
      }
      pushCloudSellers(updated);
      return updated;
    });
  };

  const handleRecordRentPayment = (sellerId: string) => {
    setSellers((prev) => {
      const updated = prev.map((s) => {
        if (s.id === sellerId) {
          return {
            ...s,
            subscriptionStatus: 'active',
            rentAmount: siteSettings.monthlyRentAmount,
            dueDate: '2026-09-30'
          };
        }
        return s;
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('kelal_gebeya_sellers', JSON.stringify(updated));
      }
      pushCloudSellers(updated);
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Header Navigation */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>ወደ ዋና ገበያ ተመለስ (Back to Market)</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'am' ? 'en' : 'am')}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3 py-1.5 rounded-full border border-slate-700 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'am' ? '🇪🇹 አማርኛ' : '🇬🇧 English'}</span>
            </button>

            {isAuthenticated && (
              <button
                onClick={handleAdminLogout}
                className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer shadow-md"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>ከሴኪዩሪቲ ውጣ (Lock Admin)</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* RENDER VIEW: LOGIN vs DASHBOARD */}
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-6">
          
          <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 animate-fadeIn">
            
            {/* Header Icon */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-emerald-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/10">
                <ShieldCheck className="w-8 h-8 text-indigo-400" />
              </div>
              <h2 className="text-xl font-black text-white">
                🔐 ምስጢራዊ የአድሚን መግቢያ
              </h2>
              <p className="text-xs text-slate-400">
                የቀላል ገበያ ማዕከላዊ መቆጣጠሪያ (Restricted Master Admin System)
              </p>
            </div>

            {errorMsg && (
              <div className="bg-rose-500/10 border border-rose-500/40 p-3.5 rounded-2xl text-xs text-rose-400 font-semibold flex items-center gap-2 animate-fadeIn">
                <AlertOctagon className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  የአድሚን ኢሜይል (Admin Email)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@kelalgebeya.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    required
                  />
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  የአድሚን የይለፍ ቃል (Master Password)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-3 rounded-xl transition-all text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>ወደ አድሚን ዳሽቦርድ ግባ (Unlock Dashboard)</span>
                  </>
                )}
              </button>
            </form>

          </div>

        </div>
      ) : (
        <div className="py-6">
          <AdminDashboard
            sellers={sellers}
            lang={lang}
            siteSettings={siteSettings}
            onUpdateSiteSettings={handleUpdateSiteSettings}
            adminProfile={adminProfile}
            onUpdateAdminProfile={handleUpdateAdminProfile}
            onToggleBlockSeller={handleToggleBlockSeller}
            onRecordPayment={handleRecordRentPayment}
          />
        </div>
      )}

    </div>
  );
}
