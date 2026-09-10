'use client';

import React from 'react';
import { Home, MapPin, ShoppingBag, Store, ShieldCheck } from 'lucide-react';
import { UserRole, Language } from '../types/ecommerce';

interface MobileBottomNavProps {
  activeRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  cartCount: number;
  onOpenCart: () => void;
  lang: Language;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeRole,
  onSelectRole,
  cartCount,
  onOpenCart,
  lang,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 pb-safe">
      <div className="flex items-center justify-around">
        
        {/* Home / Buyer */}
        <button
          onClick={() => {
            onSelectRole('buyer');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeRole === 'buyer'
              ? 'text-orange-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className={`p-1 rounded-xl ${activeRole === 'buyer' ? 'bg-orange-50' : ''}`}>
            <Home className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5">{lang === 'am' ? 'መነሻ' : 'Home'}</span>
        </button>

        {/* Cities */}
        <button
          onClick={() => {
            onSelectRole('buyer');
            const section = document.getElementById('catalog-section');
            section?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-500 hover:text-slate-900 transition-all font-medium cursor-pointer"
        >
          <div className="p-1 rounded-xl">
            <MapPin className="w-5 h-5 text-orange-500" />
          </div>
          <span className="text-[10px] mt-0.5">{lang === 'am' ? 'ከተሞች' : 'Cities'}</span>
        </button>

        {/* Cart Button with Count Badge */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-500 hover:text-slate-900 transition-all font-medium cursor-pointer relative"
        >
          <div className="p-1 rounded-xl relative">
            <ShoppingBag className="w-5 h-5 text-slate-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">{lang === 'am' ? 'ካርት' : 'Cart'}</span>
        </button>

        {/* Seller Studio */}
        <button
          onClick={() => onSelectRole('seller')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeRole === 'seller'
              ? 'text-emerald-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className={`p-1 rounded-xl ${activeRole === 'seller' ? 'bg-emerald-50' : ''}`}>
            <Store className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5">{lang === 'am' ? 'ሻጭ' : 'Seller'}</span>
        </button>

        {/* Admin Dashboard */}
        <button
          onClick={() => onSelectRole('admin')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeRole === 'admin'
              ? 'text-indigo-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className={`p-1 rounded-xl ${activeRole === 'admin' ? 'bg-indigo-50' : ''}`}>
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5">{lang === 'am' ? 'አድሚን' : 'Admin'}</span>
        </button>

      </div>
    </div>
  );
};
