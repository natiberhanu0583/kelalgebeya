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
    <div className="relative bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 border-b border-slate-200 overflow-hidden">
      
      {/* Soft Ambient Background Glow */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-orange-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-sky-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 relative z-10 space-y-4 sm:space-y-6">
        
        {/* Main Banner Grid */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          
          {/* Left Text Block - Clean, Eye-friendly, Lightweight */}
          <div className="space-y-2.5 sm:space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-orange-600" />
              <span>ቀላል ገበያ — የኢትዮጵያ ከተሞች ማርኬትፕሌስ</span>
            </div>

            <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug text-slate-900">
              {displayTitle}
            </h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-1">
              <button
                onClick={onExplore}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-xl shadow-md shadow-orange-500/20 transition-all hover:scale-105 active:scale-95 text-xs cursor-pointer"
              >
                <span>{getTranslation(lang, 'shopNow')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-slate-700 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span>Telebirr & Chapa Verified</span>
              </div>
            </div>
          </div>

          {/* Right Contact Card - Compact & Space-Efficient on Mobile */}
          <div className="bg-white p-3 sm:p-4 rounded-2xl border border-orange-200 shadow-md space-y-2.5 w-full md:w-72 shrink-0">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-orange-600 border-b border-slate-200 pb-2">
              <PhoneCall className="w-3.5 h-3.5 text-orange-500" />
              <span>ለበለጠ መረጃ (Contact Us)</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              <a
                href={`tel:${supportPhone}`}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all group"
              >
                <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform shrink-0">
                  <PhoneCall className="w-3 h-3" />
                </div>
                <div className="truncate">
                  <p className="text-[9px] uppercase font-bold text-slate-500">ስልክ (Phone)</p>
                  <p className="text-[11px] sm:text-xs font-bold text-slate-900 truncate">{supportPhone}</p>
                </div>
              </a>

              <a
                href="https://t.me/natitg2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all group"
              >
                <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center font-bold group-hover:scale-110 transition-transform shrink-0">
                  <Send className="w-3 h-3" />
                </div>
                <div className="truncate">
                  <p className="text-[9px] uppercase font-bold text-slate-500">ቴሌግራም</p>
                  <p className="text-[11px] sm:text-xs font-bold text-sky-600 truncate">{telegramHandle}</p>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* City Filter Pills - Clean & Compact */}
        <div className="space-y-2 pt-2.5 border-t border-slate-200">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
            <span className="flex items-center gap-1.5 text-orange-600 uppercase tracking-wider">
              <MapPin className="w-3 h-3" />
              <span>{getTranslation(lang, 'filterByCity')}:</span>
            </span>
            <button
              onClick={() => onSelectCity('all')}
              className="text-slate-500 hover:text-slate-900 underline text-[10px]"
            >
              {getTranslation(lang, 'allCities')}
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => onSelectCity('all')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all border ${
                selectedCity === 'all'
                  ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
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
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all border flex items-center gap-1 ${
                    isActive
                      ? 'bg-orange-500 text-white border-orange-500 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <MapPin className="w-3 h-3 text-orange-500" />
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
