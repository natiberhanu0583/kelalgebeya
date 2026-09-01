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
    <div className="group relative bg-slate-900/80 rounded-2xl border border-slate-800/80 overflow-hidden shadow-lg hover:shadow-2xl hover:border-orange-500/50 transition-all duration-300 flex flex-col">
      
      {/* Top Image Box */}
      <div className="relative aspect-square overflow-hidden bg-[#09111e]">
        <img
          src={product.image}
          alt={displayTitle}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors" />

        {/* Badges & Ethiopian City Location */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-slate-950/90 text-orange-400 border border-slate-800/80 backdrop-blur-md shadow-md flex items-center gap-1">
            <MapPin className="w-3 h-3 text-orange-400" />
            <span>{cityName}</span>
          </span>
          {displayBadge && (
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-orange-500 text-slate-950 shadow-md">
              {displayBadge}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-rose-500 text-white shadow-md">
              -{discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product)}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md z-10 transition-all ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-lg'
              : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-700/60'
          }`}
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Button */}
        <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onQuickView(product)}
            className="w-full py-2.5 px-4 bg-slate-900/90 hover:bg-slate-900 text-slate-200 hover:text-white text-xs font-bold rounded-xl backdrop-blur-md border border-slate-700/80 flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>{getTranslation(lang, 'quickView')}</span>
          </button>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
            <span className="uppercase text-orange-400 font-bold">{product.category}</span>
            <span className="truncate max-w-[130px] text-[10px] text-slate-400">
              {product.sellerName}
            </span>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="text-base font-bold text-white mt-1 hover:text-orange-400 transition-colors line-clamp-1 cursor-pointer"
          >
            {displayTitle}
          </h3>

          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="ml-1 text-xs font-bold font-mono">
                {(typeof product.rating === 'number' ? product.rating : 5.0).toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">({typeof product.reviewsCount === 'number' ? product.reviewsCount : 1})</span>
          </div>
        </div>

        {/* Price & Contact Seller Button */}
        <div className="space-y-2.5 pt-3 border-t border-slate-700/60">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-lg font-extrabold text-white">
                {(typeof product.price === 'number' ? product.price : 0).toLocaleString()} <span className="text-xs font-bold text-orange-400">{getTranslation(lang, 'currencySymbol')}</span>
              </div>
              {product.originalPrice && (
                <div className="text-xs text-slate-400 line-through">
                  {(typeof product.originalPrice === 'number' ? product.originalPrice : 0).toLocaleString()} {getTranslation(lang, 'currencySymbol')}
                </div>
              )}
            </div>

            <button
              onClick={() => onAddToCart(product)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs transition-all ${
                isInCart
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'bg-orange-500 hover:bg-orange-400 text-slate-950 shadow-md'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-3.5 h-3.5 text-sky-300" />
                  <span>{getTranslation(lang, 'inCart')}</span>
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
            className="w-full py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-orange-400 hover:text-orange-300 border border-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
            <span>{getTranslation(lang, 'contactSeller')}</span>
          </button>

        </div>

      </div>
    </div>
  );
};
