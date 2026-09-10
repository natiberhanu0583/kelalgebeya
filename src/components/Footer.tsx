'use client';

import React, { useState } from 'react';
import { Store, Send, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-white text-slate-600 text-xs border-t border-slate-200">
      
      {/* Top Newsletter Strip */}
      <div className="border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Join the MarketX VIP Club
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm max-w-md">
                Subscribe to get exclusive discount codes, new product drops, and flash sale notifications.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full md:w-auto flex items-center gap-2 max-w-md">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-72 bg-white text-slate-900 placeholder-slate-400 px-4 py-3 rounded-2xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-2xl shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {subscribed && (
            <p className="text-emerald-600 text-center text-xs mt-3 font-semibold">
              ✨ Thank you for subscribing! Check your inbox for your 15% discount code.
            </p>
          )}
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="inline-block p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-white shadow-[0_0_20px_rgba(255,255,255,0.9)] shadow-slate-200/60">
                <img src="/logo-full.png" alt="ቀላል ገበያ Kelal Gebeya" className="h-12 w-auto object-contain" />
              </div>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
              Ethiopia&apos;s premiere modern e-commerce marketplace delivering top-tier technology, fashion, home essentials, and authentic local craftsmanship directly to your doorstep.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-bold text-emerald-700">
                🔒 256-Bit SSL Secured
              </span>
              <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-bold text-teal-700">
                🚀 Instant Delivery
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Featured Catalog</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Ethiopian Special Coffee</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Habesha Crafts</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Smart Electronics</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Flash Sales</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Customer Support</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Help Center / FAQ</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Buyer Protection</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Supported Payments</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700">
                Telebirr
              </span>
              <span className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700">
                Chapa
              </span>
              <span className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700">
                Visa / Master
              </span>
              <span className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700">
                Cash on Delivery
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 mt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-4 text-xs">
          <p>© 2026 ቀላል ገበያ (Kelal Gebeya). All rights reserved.</p>
          <a
            href="/admin/"
            className="hover:text-emerald-600 text-slate-700 hover:underline transition-colors flex items-center gap-1 font-bold text-[11px]"
          >
            🔐 የአድሚን መግቢያ (Admin Portal)
          </a>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for top speed & aesthetics
          </p>
        </div>
      </div>

    </footer>
  );
};
