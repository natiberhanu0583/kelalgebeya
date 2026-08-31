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
  const storeTitle = lang === 'am' 
    ? (siteSettings?.siteNameAm || 'ቀላል ገበያ') 
    : (siteSettings?.siteNameEn || 'Kelal Gebeya');

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      
      {/* Top Banner Bar */}
      <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-1.5 text-xs font-semibold text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Announcement text */}
          <div className="flex items-center gap-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="truncate">
              {lang === 'am' 
                ? (siteSettings?.announcementAm || '🎉 ከሚፈልጉት ከተማ ፈጣን ግብይትን ይፈጽሙ') 
                : (siteSettings?.announcementEn || '🎉 Fast trading from any city of your choice!')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Google Logged-In User Badge */}
            {authUser ? (
              <div className="flex items-center gap-2 bg-slate-950 px-2.5 py-1 rounded-full border border-emerald-500/40 text-emerald-300 text-[11px]">
                <img src={authUser.avatar} alt={authUser.name} className="w-4 h-4 rounded-full object-cover" />
                <span className="font-bold truncate max-w-[120px]">{authUser.name}</span>
                <span className="uppercase text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400">
                  {authUser.role}
                </span>
                <button
                  onClick={onSignOut}
                  className="hover:text-rose-400 transition-colors ml-1"
                  title="Sign Out"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onRequestGoogleAuth && onRequestGoogleAuth(activeRole === 'admin' ? 'admin' : 'seller')}
                className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-full border border-slate-700 transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>{lang === 'am' ? 'በ Google ይግቡ' : 'Google Login'}</span>
              </button>
            )}

            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold px-3 py-1 rounded-full border border-slate-700 transition-colors shadow-sm cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'am' ? '🇪🇹 አማርኛ' : '🇬🇧 English'}</span>
            </button>

            {/* Role Switcher Pills */}
            <div className="flex items-center bg-slate-900 rounded-full border border-slate-800 p-0.5">
              <button
                onClick={() => onSelectRole('buyer')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  activeRole === 'buyer'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {getTranslation(lang, 'buyerMode')}
              </button>

              <button
                onClick={() => {
                  if (!authUser && onRequestGoogleAuth) {
                    onRequestGoogleAuth('seller');
                  } else {
                    onSelectRole('seller');
                  }
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  activeRole === 'seller'
                    ? 'bg-teal-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {getTranslation(lang, 'sellerMode')}
              </button>

              <button
                onClick={() => {
                  if (!authUser && onRequestGoogleAuth) {
                    onRequestGoogleAuth('admin');
                  } else {
                    onSelectRole('admin');
                  }
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  activeRole === 'admin'
                    ? 'bg-indigo-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {getTranslation(lang, 'adminMode')}
              </button>
            </div>

          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onSelectRole('buyer')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Store className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                {storeTitle}
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                {getTranslation(lang, 'storeSubtitle')}
              </span>
            </div>
          </div>

          {/* Search Bar & City Selector */}
          <div className="flex-1 max-w-xl hidden md:flex items-center gap-2">
            
            {/* City Dropdown */}
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => onSelectCity(e.target.value as EthiopianCityCode | 'all')}
                className="bg-slate-800 text-slate-200 text-xs font-bold pl-8 pr-3 py-2.5 rounded-full border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="all">📍 {getTranslation(lang, 'allCities')}</option>
                {ETHIOPIAN_CITIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    📍 {lang === 'am' ? c.nameAm : c.nameEn}
                  </option>
                ))}
              </select>
              <MapPin className="absolute left-2.5 top-3 w-4 h-4 text-emerald-400 pointer-events-none" />
            </div>

            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={getTranslation(lang, 'searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-800/90 text-slate-100 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-full border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm shadow-inner"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            </div>

          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            
            {/* Wishlist */}
            <button className="relative p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors" title="Wishlist">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline font-semibold">{getTranslation(lang, 'cart')}</span>
              <span className="bg-slate-950 text-emerald-400 px-2 py-0.5 rounded-full text-xs font-extrabold">
                {cartCount}
              </span>
            </button>

          </div>
        </div>

        {/* Mobile Search & City Selector */}
        <div className="pb-3 md:hidden space-y-2">
          <div className="flex items-center gap-2">
            <select
              value={selectedCity}
              onChange={(e) => onSelectCity(e.target.value as EthiopianCityCode | 'all')}
              className="bg-slate-800 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl border border-slate-700"
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
                className="w-full bg-slate-800 text-slate-100 placeholder-slate-400 pl-9 pr-3 py-2 rounded-xl border border-slate-700 text-xs"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <nav className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/80">
          {/* Always show "All Categories" pill first */}
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
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
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                      : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
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
