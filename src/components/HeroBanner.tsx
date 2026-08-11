'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Zap, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onShopNow: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow }) => {
  return (
    <div className="relative overflow-hidden bg-slate-900 text-white border-b border-slate-800">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-500/15 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-500/15 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen E-Commerce Marketplace</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Discover Authentic <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                Tech, Fashion & Ethiopian Crafts
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              Explore curated premium collections with fast delivery, authentic craft guarantees, and instant online checkout options.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopNow}
                className="flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-7 py-3.5 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 text-base"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-400 border border-slate-800 bg-slate-900/60 px-4 py-3 rounded-2xl backdrop-blur-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span>100+ Products Ready for Instant Shipping</span>
              </div>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-emerald-400">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-200">Free Shipping</p>
                  <p className="text-[11px] text-slate-400">Orders over $75</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-200">Buyer Protection</p>
                  <p className="text-[11px] text-slate-400">100% Authentic</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-emerald-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-200">Express Delivery</p>
                  <p className="text-[11px] text-slate-400">Doorstep Arrival</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Image Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-800/50 backdrop-blur-xl group">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
                alt="Hero Highlight Product"
                className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Featured Highlight</span>
                  <h4 className="text-sm font-bold text-white">Smartwatch Ultra Titanium</h4>
                  <p className="text-xs text-slate-300 font-semibold">$329.50 <span className="line-through text-slate-500 font-normal">$380.00</span></p>
                </div>
                <button
                  onClick={onShopNow}
                  className="bg-emerald-500 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs hover:bg-emerald-400 transition-colors"
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
