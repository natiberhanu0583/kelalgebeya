'use client';

import React from 'react';
import { ShoppingBag, Heart, Search, Store, Globe, MapPin } from 'lucide-react';
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
}) => {
  const storeTitle = siteSettings
    ? (lang === 'am' ? siteSettings.siteNameAm : siteSettings.siteNameEn)
    : getTranslation(lang, 'storeTitle');

  const announcement = siteSettings
    ? (lang === 'am' ? siteSettings.announcementAm : siteSettings.announcementEn)
    : getTranslation(lang, 'announcement');

  const categories: { id: CategoryType; key: any }[] = [
    { id: 'all', key: 'allCategories' },
    { id: 'electronics', key: 'electronics' },
    { id: 'fashion', key: 'fashion' },
    { id: 'vehicles', key: 'vehicles' },
    { id: 'agriculture', key: 'agriculture' },
    { id: 'home', key: 'home' },
    { id: 'coffee', key: 'coffee' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      
      {/* Top Strip Announcement & Controls */}
      <div className="bg-slate-950 py-1.5 px-4 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          
          <div className="text-emerald-400 font-semibold text-center sm:text-left truncate">
            {announcement}
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold px-3 py-1 rounded-full border border-slate-700 transition-colors shadow-sm"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'am' ? '🇪🇹 አማርኛ' : '🇬🇧 English'}</span>
            </button>

            {/* Role Switcher Pills */}
            <div className="flex items-center bg-slate-900 rounded-full border border-slate-800 p-0.5">
              <button
                onClick={() => onSelectRole('buyer')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                  activeRole === 'buyer'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {getTranslation(lang, 'buyerMode')}
              </button>

              <button
                onClick={() => onSelectRole('seller')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                  activeRole === 'seller'
                    ? 'bg-teal-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {getTranslation(lang, 'sellerMode')}
              </button>

              <button
                onClick={() => onSelectRole('admin')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
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
