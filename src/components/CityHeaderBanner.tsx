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
  const heroTitle = siteSettings
    ? (lang === 'am' ? siteSettings.heroTitleAm : siteSettings.heroTitleEn)
    : getTranslation(lang, 'heroTitle');

  const heroSubtitle = 'የሚገኙበትን ከተማ አቅራቢያ በመምረጥ ቀላልና አስተማማኝ ግብይት ይፈጽሙ።';

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
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-white border-b border-slate-800/80 overflow-hidden">
      
      {/* Background Lighting Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10 space-y-8">
        
        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{getTranslation(lang, 'heroTag')}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {heroTitle}
            </h1>

            <p className="text-slate-200 text-sm sm:text-base font-semibold leading-relaxed max-w-xl">
              {heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <button
                onClick={onExplore}
                className="flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm"
              >
                <span>{getTranslation(lang, 'shopNow')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-900/80 px-4 py-3 rounded-2xl border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Telebirr & Chapa Payment Verified</span>
              </div>
            </div>
          </div>

          {/* Contact Us Direct Card */}
          <div className="bg-slate-900/90 p-5 sm:p-6 rounded-3xl border border-emerald-500/30 shadow-2xl backdrop-blur-xl space-y-4 w-full md:w-80 shrink-0">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-3">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>ለበለጠ መረጃ (Contact Us)</span>
            </div>

            <div className="space-y-3">
              <a
                href={`tel:${supportPhone}`}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">ስልክ ቁጥር (Phone)</p>
                  <p className="text-xs sm:text-sm font-black text-white">{supportPhone}</p>
                </div>
              </a>

              <a
                href="https://t.me/natitg2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform shrink-0">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">ቴሌግራም (Telegram)</p>
                  <p className="text-xs sm:text-sm font-black text-sky-400">{telegramHandle}</p>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* City Quick Filter Pills */}
        <div className="space-y-3 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 uppercase tracking-wider">
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
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCity === 'all'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-500 shadow-md shadow-emerald-500/20'
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
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 border-emerald-500 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
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
