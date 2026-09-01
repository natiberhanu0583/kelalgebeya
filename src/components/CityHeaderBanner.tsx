'use client';

import React from 'react';
import { MapPin, PhoneCall, Send, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { EthiopianCityCode, Language, ETHIOPIAN_CITIES, SiteSettings } from '../types/ecommerce';
import { getTranslation } from '../data/translations';

interface CityHeaderBannerProps {
  selectedCity: EthiopianCityCode | 'all';
  onSelectCity: (city: EthiopianCityCode | 'all') => void;
  lang: Language;
  onExplore: () => void;
  siteSettings?: SiteSettings;
}

export const CityHeaderBanner: React.FC<CityHeaderBannerProps> = ({
  selectedCity,
  onSelectCity,
  lang,
  onExplore,
  siteSettings,
}) => {
  const displayTitle = lang === 'am'
    ? (siteSettings?.heroTitleAm && siteSettings.heroTitleAm !== 'በማንኛውም የኢትዮጵያ ከተሞች ፈጣን እና አስተማማኝ ግብይት'
        ? siteSettings.heroTitleAm
        : 'የሚገኙበትን ከተማ አቅራቢያ በመምረጥ ቀላልና አስተማማኝ ግብይት ይፈጽሙ።')
    : (siteSettings?.heroTitleEn || getTranslation(lang, 'heroTitle'));

  const supportPhone = siteSettings?.supportPhone || '0940219376';
  const telegramHandle = 't.me/natitg2';

  const topFeaturedCities: { code: EthiopianCityCode; nameAm: string; nameEn: string }[] = [
    { code: 'ADDIS_ABABA', nameAm: 'አዲስ አበባ', nameEn: 'Addis Ababa' },
    { code: 'ADAMA', nameAm: 'አዳማ', nameEn: 'Adama' },
    { code: 'HAWASSA', nameAm: 'ሐዋሳ', nameEn: 'Hawassa' },
    { code: 'BALE_ROBE', nameAm: 'ባሌ ሮቤ', nameEn: 'Bale Robe' },
    { code: 'BALE_GINIR', nameAm: 'ባሌ ጊኒር', nameEn: 'Bale Ginir' },
    { code: 'BALE_GOBA', nameAm: 'ባሌ ጎባ', nameEn: 'Bale Goba' },
    { code: 'ASELLA', nameAm: 'አሰላ', nameEn: 'Asella' },
    { code: 'SHASHEMENE', nameAm: 'ሻሸመኔ', nameEn: 'Shashemene' },
    { code: 'DEBRE_BERHAN', nameAm: 'ደብረ ብርሃን', nameEn: 'Debre Berhan' },
    { code: 'DIRE_DAWA', nameAm: 'ድሬዳዋ', nameEn: 'Dire Dawa' },
  ];

  return (
    <div className="relative bg-gradient-to-b from-[#0b192c] via-[#0f172a] to-[#09111e] text-white border-b border-slate-800/80 overflow-hidden">
      
      {/* Soft Ambient Background Glow */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-orange-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-sky-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative z-10 space-y-6">
        
        {/* Main Banner Grid */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Text Block - Clean, Eye-friendly, Lightweight */}
          <div className="space-y-3.5 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ቀላል ገበያ — የኢትዮጵያ ከተሞች ማርኬትፕሌስ</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug text-white">
              {displayTitle}
            </h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
              <button
                onClick={onExplore}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm"
              >
                <span>{getTranslation(lang, 'shopNow')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-900/90 px-3.5 py-2.5 rounded-xl border border-slate-800 backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Telebirr & Chapa Verified</span>
              </div>
            </div>
          </div>

          {/* Right Contact Card - Compact & Elegant */}
          <div className="bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-orange-500/20 shadow-xl backdrop-blur-md space-y-3 w-full md:w-72 shrink-0">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 border-b border-slate-800/80 pb-2.5">
              <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
              <span>ለበለጠ መረጃ (Contact Us)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
              <a
                href={`tel:${supportPhone}`}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform shrink-0">
                  <PhoneCall className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">ስልክ (Phone)</p>
                  <p className="text-xs font-bold text-white">{supportPhone}</p>
                </div>
              </a>

              <a
                href="https://t.me/natitg2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform shrink-0">
                  <Send className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">ቴሌግራም (Telegram)</p>
                  <p className="text-xs font-bold text-sky-400">{telegramHandle}</p>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* City Filter Pills - Clean & Compact */}
        <div className="space-y-2.5 pt-3 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span className="flex items-center gap-1.5 text-orange-400 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>{getTranslation(lang, 'filterByCity')}:</span>
            </span>
            <button
              onClick={() => onSelectCity('all')}
              className="text-slate-400 hover:text-white underline text-[11px]"
            >
              {getTranslation(lang, 'allCities')}
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => onSelectCity('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCity === 'all'
                  ? 'bg-orange-500 text-slate-950 border-orange-500 shadow-md shadow-orange-500/20'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              📍 {getTranslation(lang, 'allCities')}
            </button>

            {topFeaturedCities.map((city) => {
              const isActive = selectedCity === city.code;
              const cityName = lang === 'am' ? city.nameAm : city.nameEn;
              return (
                <button
                  key={city.code}
                  onClick={() => onSelectCity(city.code)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-orange-500 text-slate-950 border-orange-500 shadow-md shadow-orange-500/20'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                  }`}
                >
                  <MapPin className="w-3 h-3 text-orange-400" />
                  <span>{cityName}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
