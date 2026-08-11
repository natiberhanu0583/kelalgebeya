'use client';

import React, { useState } from 'react';
import { X, Star, ShoppingCart, ShieldCheck, Truck, Check, Heart, MapPin, PhoneCall } from 'lucide-react';
import { Product, ETHIOPIAN_CITIES } from '../types/ecommerce';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  isWishlisted: boolean;
  isInCart: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  isWishlisted,
  isInCart,
  onClose,
  onAddToCart,
  onToggleWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const cityInfo = ETHIOPIAN_CITIES.find((c) => c.code === product.city);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden text-white flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 relative bg-slate-950 min-h-[300px] flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover max-h-[400px]"
          />
          {cityInfo && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/90 border border-slate-700 text-emerald-400 backdrop-blur-md flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>📍 {cityInfo.nameAm} ({cityInfo.nameEn})</span>
            </span>
          )}
        </div>

        {/* Details Side */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">
              {product.category}
            </span>

            <h2 className="text-2xl font-bold text-white leading-tight">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="ml-1 text-sm font-bold">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-slate-400">({product.reviewsCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl font-black text-white">
                {product.price.toLocaleString()} <span className="text-lg font-bold text-emerald-400">ብር (ETB)</span>
              </span>
              {product.originalPrice && (
                <span className="text-base text-slate-400 line-through font-normal">
                  {product.originalPrice.toLocaleString()} ብር
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
              {product.description}
            </p>

            {/* Seller Contact Info */}
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1 text-xs text-slate-300">
              <p className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> {product.sellerName}
              </p>
              <p className="text-emerald-400 font-semibold flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5" /> {product.sellerPhone}
              </p>
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-400 uppercase">Quantity</span>
              <div className="flex items-center bg-slate-800 rounded-xl border border-slate-700">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-300 hover:text-white font-bold text-sm"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-slate-300 hover:text-white font-bold text-sm"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all text-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{isInCart ? 'Update Cart' : 'Add to Cart'}</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isWishlisted
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
