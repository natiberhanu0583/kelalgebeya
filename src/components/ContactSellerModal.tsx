'use client';

import React from 'react';
import { X, Phone, MessageSquare, ShieldCheck, Store, MapPin } from 'lucide-react';
import { Product, Language, ETHIOPIAN_CITIES } from '../types/ecommerce';
import { getTranslation } from '../data/translations';

interface ContactSellerModalProps {
  product: Product | null;
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export const ContactSellerModal: React.FC<ContactSellerModalProps> = ({
  product,
  isOpen,
  lang,
  onClose,
}) => {
  if (!isOpen || !product) return null;

  const cityInfo = ETHIOPIAN_CITIES.find((c) => c.code === product.city);
  const cityName = cityInfo ? (lang === 'am' ? cityInfo.nameAm : cityInfo.nameEn) : product.city;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden text-white p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">
              {getTranslation(lang, 'contactSellerTitle')}
            </h3>
            <p className="text-xs text-slate-400">
              {getTranslation(lang, 'contactSellerDesc')}
            </p>
          </div>
        </div>

        {/* Product & Seller Details Card */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-xl bg-slate-900 flex-shrink-0"
          />
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-bold text-white line-clamp-1">{product.name}</h4>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <span>{product.price.toLocaleString()} {getTranslation(lang, 'currencySymbol')}</span>
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>📍 {cityName}</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" /> {product.sellerName}
            </p>
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Phone Call */}
          <a
            href={`tel:${product.sellerPhone}`}
            className="w-full flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all text-sm"
          >
            <Phone className="w-5 h-5" />
            <span>{getTranslation(lang, 'callSeller')} ({product.sellerPhone})</span>
          </a>

          {/* WhatsApp Direct Chat */}
          <a
            href={`https://wa.me/${product.sellerPhone.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-teal-600 hover:bg-teal-500 text-white font-bold py-3.5 rounded-2xl shadow-lg transition-all text-sm"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{getTranslation(lang, 'whatsappSeller')}</span>
          </a>
        </div>

        <div className="text-center text-[11px] text-slate-400 pt-2 border-t border-slate-800">
          🔒 Telebirr & Phone Verified Local Ethiopian Seller
        </div>

      </div>
    </div>
  );
};
