'use client';

import React from 'react';
import { Star, Heart, Eye, ShoppingCart, Check, PhoneCall, MapPin } from 'lucide-react';
import { Product, Language, ETHIOPIAN_CITIES } from '../types/ecommerce';
import { getTranslation } from '../data/translations';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  isInCart: boolean;
  lang: Language;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onContactSeller: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  isInCart,
  lang,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onContactSeller,
}) => {
  const cityInfo = ETHIOPIAN_CITIES.find((c) => c.code === product.city);
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const displayTitle = lang === 'am' && product.nameAm ? product.nameAm : product.name;
  const displayBadge = lang === 'am' && product.badgeAm ? product.badgeAm : product.badge;
  const cityName = cityInfo ? (lang === 'am' ? cityInfo.nameAm : cityInfo.nameEn) : product.city;

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-400/80 transition-all duration-300 flex flex-col">
      
      {/* Top Image Box */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={displayTitle}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-colors" />

        {/* Badges & Ethiopian City Location */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-white/95 text-orange-600 border border-slate-200 backdrop-blur-md shadow-xs flex items-center gap-1">
            <MapPin className="w-3 h-3 text-orange-500" />
            <span>{cityName}</span>
          </span>
          {displayBadge && (
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-orange-500 text-white shadow-xs">
              {displayBadge}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-rose-500 text-white shadow-xs">
              -{discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product)}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md z-10 transition-all ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/80 text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200'
          }`}
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Button */}
        <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onQuickView(product)}
            className="w-full py-2.5 px-4 bg-white/95 hover:bg-white text-slate-800 hover:text-slate-900 text-xs font-bold rounded-xl backdrop-blur-md border border-slate-200 flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4 text-orange-500" />
            <span>{getTranslation(lang, 'quickView')}</span>
          </button>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
        <div>
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-slate-500">
            <span className="uppercase text-orange-600 font-bold truncate max-w-[80px] sm:max-w-none">{product.category}</span>
            <span className="truncate max-w-[80px] sm:max-w-[130px] text-[10px] text-slate-500">
              {product.sellerName}
            </span>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="text-xs sm:text-base font-bold text-slate-900 mt-1 hover:text-orange-600 transition-colors line-clamp-1 cursor-pointer"
          >
            {displayTitle}
          </h3>

          <div className="flex items-center gap-1 mt-1.5 sm:mt-2">
            <div className="flex items-center text-amber-500">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
              <span className="ml-1 text-[11px] sm:text-xs font-bold font-mono text-slate-700">
                {(typeof product.rating === 'number' ? product.rating : 5.0).toFixed(1)}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-slate-500 font-medium">({typeof product.reviewsCount === 'number' ? product.reviewsCount : 1})</span>
          </div>
        </div>

        {/* Price & Contact Seller Button */}
        <div className="space-y-2 pt-2.5 sm:pt-3 border-t border-slate-200">
          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
            <div>
              <div className="text-sm sm:text-lg font-extrabold text-slate-900">
                {(typeof product.price === 'number' ? product.price : 0).toLocaleString()} <span className="text-[10px] sm:text-xs font-bold text-orange-600">{getTranslation(lang, 'currencySymbol')}</span>
              </div>
              {product.originalPrice && (
                <div className="text-[10px] sm:text-xs text-slate-400 line-through">
                  {(typeof product.originalPrice === 'number' ? product.originalPrice : 0).toLocaleString()} {getTranslation(lang, 'currencySymbol')}
                </div>
              )}
            </div>

            <button
              onClick={() => onAddToCart(product)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl font-bold text-[11px] sm:text-xs transition-all cursor-pointer ${
                isInCart
                  ? 'bg-sky-100 text-sky-700 border border-sky-200'
                  : 'bg-orange-500 hover:bg-orange-600 text-white shadow-xs'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-3.5 h-3.5 text-sky-600" />
                  <span className="hidden xs:inline">{getTranslation(lang, 'inCart')}</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{getTranslation(lang, 'addToCart')}</span>
                </>
              )}
            </button>
          </div>

          {/* Contact Seller Button */}
          <button
            onClick={() => onContactSeller(product)}
            className="w-full py-1.5 sm:py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-orange-600 border border-slate-200 font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 text-orange-500" />
            <span>{getTranslation(lang, 'contactSeller')}</span>
          </button>

        </div>

      </div>
    </div>
  );
};
