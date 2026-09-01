'use client';

import React from 'react';
import { ShoppingBag, Heart, Search, Store, Globe, MapPin, LogOut } from 'lucide-react';
import { CategoryType, EthiopianCityCode, Language, UserRole, ETHIOPIAN_CITIES, SiteSettings } from '../types/ecommerce';
import { getTranslation } from '../data/translations';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  selectedCity: EthiopianCityCode | 'all';
  onSelectCity: (city: EthiopianCityCode | 'all') => void;
  lang: Language;
  onToggleLanguage: () => void;
  activeRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onOpenCart: () => void;
  siteSettings?: SiteSettings;
  authUser?: { name: string; email: string; avatar: string; role: 'seller' | 'admin' } | null;
  onSignOut?: () => void;
  onRequestGoogleAuth?: (role: 'seller' | 'admin') => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedCity,
  onSelectCity,
  lang,
  onToggleLanguage,
  activeRole,
  onSelectRole,
  onOpenCart,
  siteSettings,
  authUser,
  onSignOut,
  onRequestGoogleAuth,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#09111e]/95 backdrop-blur-md border-b border-slate-800/80">
      
      {/* Top Banner Bar */}
      <div className="bg-[#0b192c] border-b border-slate-800/80 px-3 sm:px-4 py-1 text-xs font-semibold text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Announcement text */}
          <div className="flex items-center gap-1.5 truncate text-[11px] sm:text-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-orange-400 animate-pulse shrink-0"></span>
            <span className="truncate">
              {lang === 'am' 
                ? (siteSettings?.announcementAm || '🎉 ከሚፈልጉት ከተማ ፈጣን ግብይትን ይፈጽሙ') 
                : (siteSettings?.announcementEn || '🎉 Fast trading from any city of your choice!')}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Google Logged-In User Badge */}
            {authUser ? (
              <div className="flex items-center gap-1.5 bg-slate-950 px-2 py-0.5 rounded-full border border-orange-500/40 text-orange-300 text-[10px] sm:text-[11px]">
                <img src={authUser.avatar} alt={authUser.name} className="w-3.5 h-3.5 rounded-full object-cover" />
                <span className="font-bold truncate max-w-[80px] sm:max-w-[120px]">{authUser.name}</span>
                <button
                  onClick={onSignOut}
                  className="hover:text-rose-400 transition-colors ml-0.5"
                  title="Sign Out"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onRequestGoogleAuth && onRequestGoogleAuth(activeRole === 'admin' ? 'admin' : 'seller')}
                className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-0.5 rounded-full border border-slate-700 transition-all cursor-pointer"
              >
                <span>{lang === 'am' ? 'በ Google ይግቡ' : 'Google Login'}</span>
              </button>
            )}

            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white font-bold px-2.5 py-0.5 rounded-full border border-slate-700 text-[10px] sm:text-xs transition-colors shadow-sm cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3 h-3 text-orange-400" />
              <span>{lang === 'am' ? 'አማርኛ' : 'EN'}</span>
            </button>

            {/* Role Switcher Pills */}
            <div className="flex items-center bg-slate-950 rounded-full border border-slate-800 p-0.5">
              <button
                onClick={() => onSelectRole('buyer')}
                className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                  activeRole === 'buyer'
                    ? 'bg-orange-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'am' ? 'ገዢ' : 'Buyer'}
              </button>

              <button
                onClick={() => {
                  if (!authUser && onRequestGoogleAuth) {
                    onRequestGoogleAuth('seller');
                  } else {
                    onSelectRole('seller');
                  }
                }}
                className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                  activeRole === 'seller'
                    ? 'bg-sky-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'am' ? 'ሻጭ' : 'Seller'}
              </button>
            </div>

          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20 gap-3">
          
          {/* Logo (Compact Icon on Mobile, Full Logo on Desktop) */}
          <div className="flex items-center cursor-pointer group shrink-0" onClick={() => onSelectRole('buyer')}>
            {/* Desktop Full Logo */}
            <img
              src="/logo-full.png"
              alt="ቀላል ገበያ Kelal Gebeya"
              className="hidden sm:block h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
            {/* Mobile Icon-only Logo (Super Sharp & Compact) */}
            <img
              src="/logo-icon.png"
              alt="ቀላል ገበያ Kelal Gebeya"
              className="block sm:hidden h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </div>

          {/* Search Bar & City Selector (Desktop) */}
          <div className="flex-1 max-w-xl hidden md:flex items-center gap-2">
            
            {/* City Dropdown */}
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => onSelectCity(e.target.value as EthiopianCityCode | 'all')}
                className="bg-slate-800/90 text-slate-200 text-xs font-bold pl-8 pr-3 py-2.5 rounded-full border border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
              >
                <option value="all">📍 {getTranslation(lang, 'allCities')}</option>
                {ETHIOPIAN_CITIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    📍 {lang === 'am' ? c.nameAm : c.nameEn}
                  </option>
                ))}
              </select>
              <MapPin className="absolute left-2.5 top-3 w-4 h-4 text-orange-400 pointer-events-none" />
            </div>

            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={getTranslation(lang, 'searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-800/90 text-slate-100 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-full border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-sm shadow-inner"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            </div>

          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Wishlist */}
            <button className="relative p-2 sm:p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors" title="Wishlist">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 sm:gap-2 bg-orange-500 hover:bg-orange-400 text-slate-950 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/25 transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline font-semibold">{getTranslation(lang, 'cart')}</span>
              <span className="bg-slate-950 text-orange-400 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-extrabold">
                {cartCount}
              </span>
            </button>

          </div>
        </div>

        {/* Mobile Search & City Selector */}
        <div className="pb-2.5 md:hidden space-y-1.5">
          <div className="flex items-center gap-2">
            <select
              value={selectedCity}
              onChange={(e) => onSelectCity(e.target.value as EthiopianCityCode | 'all')}
              className="bg-slate-900 text-slate-200 text-[11px] font-bold px-2.5 py-1.5 rounded-xl border border-slate-800 shrink-0"
            >
              <option value="all">📍 {getTranslation(lang, 'allCities')}</option>
              {ETHIOPIAN_CITIES.map((c) => (
                <option key={c.code} value={c.code}>
                  📍 {lang === 'am' ? c.nameAm : c.nameEn}
                </option>
              ))}
            </select>

            <div className="relative flex-1">
              <input
                type="text"
                placeholder={getTranslation(lang, 'searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 placeholder-slate-400 pl-8 pr-3 py-1.5 rounded-xl border border-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-1.5 scrollbar-none border-t border-slate-800/80">
          {/* Always show "All Categories" pill first */}
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20 font-bold'
                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            {getTranslation(lang, 'allCategories')}
          </button>

          {/* Render Active Categories Dynamically */}
          {(siteSettings?.categories || [])
            .filter((cat) => cat.isActive)
            .map((cat) => {
              const isActive = selectedCategory === cat.id;
              const label = lang === 'am' ? cat.nameAm : cat.nameEn;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id as CategoryType)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20 font-bold'
                      : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  {label}
                </button>
              );
            })}
        </nav>
      </div>
    </header>
  );
};
