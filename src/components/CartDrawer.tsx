'use client';

import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Truck, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types/ecommerce';

interface CartDrawerProps {
  isOpen: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoSuccess, setPromoSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 2500; // 2,500 ETB
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'ETHIO2026') {
      setDiscountAmount(500); // 500 ETB discount
      setPromoSuccess(true);
    } else {
      alert('Invalid Promo Code. Try "ETHIO2026" for 500 ETB OFF!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 text-white border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Your Shopping Cart</h2>
                <p className="text-xs text-slate-400">{cartItems.length} unique items</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Tracker */}
          <div className="bg-slate-950 p-4 border-b border-slate-800/80">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1 text-slate-300">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                {remainingForFreeShipping === 0
                  ? '🎉 Free Local Delivery Unlocked!'
                  : `Add ${remainingForFreeShipping.toLocaleString()} ETB for Free Delivery`}
              </span>
              <span className="text-emerald-400 font-extrabold">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-300">Your cart is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Browse local listings in your city and add items to your order.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-emerald-400 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-slate-800/60 rounded-2xl border border-slate-700/50"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl bg-slate-900 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-bold text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                          title="Remove Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                        {item.product.price.toLocaleString()} ETB
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-slate-900 rounded-lg border border-slate-700/80">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-slate-300 hover:text-white font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-slate-300 hover:text-white font-bold text-xs"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-black text-white">
                        {(item.product.price * item.quantity).toLocaleString()} ETB
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Subtotal & Checkout Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950 space-y-4">
              
              {/* Coupon Code Input */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. ETHIO2026)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-slate-900 text-slate-100 placeholder-slate-400 pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 uppercase"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
                >
                  Apply
                </button>
              </div>

              {promoSuccess && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 500 ETB discount code applied!
                </div>
              )}

              {/* Subtotal Summary */}
              <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">{subtotal.toLocaleString()} ETB</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount</span>
                    <span>-{discountAmount.toLocaleString()} ETB</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Local Delivery Fee</span>
                  <span>{remainingForFreeShipping === 0 ? 'FREE' : '150 ETB'}</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                  <span>Total</span>
                  <span className="text-emerald-400">{finalTotal.toLocaleString()} ETB</span>
                </div>
              </div>

              {/* Checkout Trigger Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all text-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
