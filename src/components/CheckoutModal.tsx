'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, PhoneCall, Wallet, PackageCheck, MapPin } from 'lucide-react';
import { CartItem, CheckoutDetails, ETHIOPIAN_CITIES } from '../types/ecommerce';

interface CheckoutModalProps {
  isOpen: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  cartItems,
  onClose,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState<CheckoutDetails>({
    fullName: 'አበበ በቀለ (Abebe Bekele)',
    email: 'abebe@example.com',
    address: 'ቦሌ መድኃኔዓለም / Bole Medhanealem',
    city: 'አዲስ አበባ (Addis Ababa)',
    phone: '+251 911 234 567',
    paymentMethod: 'telebirr',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 1200);
  };

  const handleFinish = () => {
    onOrderSuccess();
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div className="p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400">Step 2 of 2</span>
              <h2 className="text-2xl font-bold text-white mt-1"> Complete Your Order (ትዕዛዝዎን ያጠናቅቁ)</h2>
              <p className="text-xs text-slate-400">Select delivery Ethiopian city, address, and preferred local payment method.</p>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              
              {/* Customer Shipping Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name (ሙሉ ስም)</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-800 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (ስልክ ቁጥር)</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-800 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-800 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Delivery City (የማድረሻ ከተማ)</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-800 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {ETHIOPIAN_CITIES.map((c) => (
                      <option key={c.code} value={c.nameAm}>
                        📍 {c.nameAm} ({c.nameEn})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Delivery Address / Neighborhood (የማድረሻ አድራሻ)</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-slate-800 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Payment Methods */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Select Payment Method (የክፍያ መንገድ)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'telebirr' })}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      formData.paymentMethod === 'telebirr'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <Wallet className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs">Telebirr (ቴሌብር)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'chapa' })}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      formData.paymentMethod === 'chapa'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-indigo-400" />
                    <span className="text-xs">Chapa (ቻፓ)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cbe_birr' })}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      formData.paymentMethod === 'cbe_birr'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-amber-400" />
                    <span className="text-xs">CBE Birr (ሲቢኢ ብር)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cash_on_delivery' })}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      formData.paymentMethod === 'cash_on_delivery'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <PhoneCall className="w-5 h-5 text-teal-400" />
                    <span className="text-xs">Pay on Delivery</span>
                  </button>

                </div>
              </div>

              {/* Order Total Summary */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between mt-4">
                <div>
                  <p className="text-xs text-slate-400">Total Payable Amount</p>
                  <p className="text-2xl font-black text-white">{subtotal.toLocaleString()} ETB (ብር)</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" /> Telebirr & CBE Verified
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-4 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all text-sm flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="animate-spin">⏳ Processing Order...</span>
                ) : (
                  <>
                    <PackageCheck className="w-5 h-5" />
                    <span>Confirm Order ({subtotal.toLocaleString()} ETB)</span>
                  </>
                )}
              </button>

            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Order #ET-992810</span>
              <h2 className="text-3xl font-black text-white">Order Confirmed! (ትዕዛዝዎ ተረጋግጧል!)</h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you for your purchase! A confirmation receipt has been sent to <span className="text-white font-semibold">{formData.email}</span>.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left text-xs text-slate-300 space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">Customer:</span>
                <span className="font-bold text-white">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Delivery Location:</span>
                <span className="font-bold text-white">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment via:</span>
                <span className="font-bold text-emerald-400 uppercase">{formData.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-black text-white">
                <span>Paid Total:</span>
                <span>{subtotal.toLocaleString()} ETB (ብር)</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all text-sm"
            >
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
