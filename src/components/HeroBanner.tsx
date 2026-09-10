'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Zap, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onShopNow: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow }) => {
  return (
    <div className="relative overflow-hidden bg-slate-50 text-slate-900 border-b border-slate-200">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen E-Commerce Marketplace</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900">
              Discover Authentic <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
                Tech, Fashion & Ethiopian Crafts
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              Explore curated premium collections with fast delivery, authentic craft guarantees, and instant online checkout options.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopNow}
                className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-2xl shadow-xl shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95 text-base cursor-pointer"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-600 border border-slate-200 bg-white/80 px-4 py-3 rounded-2xl backdrop-blur-sm shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>100+ Products Ready for Instant Shipping</span>
              </div>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Free Shipping</p>
                  <p className="text-[11px] text-slate-500">Orders over $75</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Buyer Protection</p>
                  <p className="text-[11px] text-slate-500">100% Authentic</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Express Delivery</p>
                  <p className="text-[11px] text-slate-500">Doorstep Arrival</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Image Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-white group">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
                alt="Hero Highlight Product"
                className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md flex items-center justify-between shadow-lg">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Featured Highlight</span>
                  <h4 className="text-sm font-bold text-slate-900">Smartwatch Ultra Titanium</h4>
                  <p className="text-xs text-slate-700 font-semibold">$329.50 <span className="line-through text-slate-400 font-normal">$380.00</span></p>
                </div>
                <button
                  onClick={onShopNow}
                  className="bg-emerald-600 text-white font-bold px-3 py-2 rounded-xl text-xs hover:bg-emerald-700 transition-colors shadow-xs"
                >
                  View Item
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
