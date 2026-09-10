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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden text-slate-900 p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {getTranslation(lang, 'contactSellerTitle')}
            </h3>
            <p className="text-xs text-slate-500">
              {getTranslation(lang, 'contactSellerDesc')}
            </p>
          </div>
        </div>

        {/* Product & Seller Details Card */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-xl bg-slate-200 flex-shrink-0"
          />
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{product.name}</h4>
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold">
              <span>{product.price.toLocaleString()} {getTranslation(lang, 'currencySymbol')}</span>
              <span className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1 shadow-xs">
                <MapPin className="w-3 h-3 text-emerald-600" />
                <span>📍 {cityName}</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" /> {product.sellerName}
            </p>
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Phone Call */}
          <a
            href={`tel:${product.sellerPhone}`}
            className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-md transition-all text-sm cursor-pointer"
          >
            <Phone className="w-5 h-5" />
            <span>{getTranslation(lang, 'callSeller')} ({product.sellerPhone})</span>
          </a>

          {/* WhatsApp Direct Chat */}
          <a
            href={`https://wa.me/${product.sellerPhone.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-2xl shadow-md transition-all text-sm cursor-pointer"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{getTranslation(lang, 'whatsappSeller')}</span>
          </a>
        </div>

        <div className="text-center text-[11px] text-slate-500 pt-2 border-t border-slate-200">
          🔒 Telebirr & Phone Verified Local Ethiopian Seller
        </div>

      </div>
    </div>
  );
};
