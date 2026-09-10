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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden text-slate-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div className="p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600">Step 2 of 2</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1"> Complete Your Order (ትዕዛዝዎን ያጠናቅቁ)</h2>
              <p className="text-xs text-slate-500">Select delivery Ethiopian city, address, and preferred local payment method.</p>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              
              {/* Customer Shipping Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name (ሙሉ ስም)</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (ስልክ ቁጥር)</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery City (የማድረሻ ከተማ)</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery Address / Neighborhood (የማድረሻ አድራሻ)</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Payment Methods */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Payment Method (የክፍያ መንገድ)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'telebirr' })}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                      formData.paymentMethod === 'telebirr'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Wallet className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs">Telebirr (ቴሌብር)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'chapa' })}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                      formData.paymentMethod === 'chapa'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <span className="text-xs">Chapa (ቻፓ)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cbe_birr' })}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                      formData.paymentMethod === 'cbe_birr'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-amber-600" />
                    <span className="text-xs">CBE Birr (ሲቢኢ ብር)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cash_on_delivery' })}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                      formData.paymentMethod === 'cash_on_delivery'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <PhoneCall className="w-5 h-5 text-teal-600" />
                    <span className="text-xs">Pay on Delivery</span>
                  </button>

                </div>
              </div>

              {/* Order Total Summary */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between mt-4">
                <div>
                  <p className="text-xs text-slate-500">Total Payable Amount</p>
                  <p className="text-2xl font-black text-slate-900">{subtotal.toLocaleString()} ETB (ብር)</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                  <ShieldCheck className="w-4 h-4" /> Telebirr & CBE Verified
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 rounded-2xl shadow-md transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
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
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-200">
              <CheckCircle2 className="w-10 h-10 animate-bounce text-emerald-600" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Order #ET-992810</span>
              <h2 className="text-3xl font-black text-slate-900">Order Confirmed! (ትዕዛዝዎ ተረጋግጧል!)</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you for your purchase! A confirmation receipt has been sent to <span className="text-slate-900 font-semibold">{formData.email}</span>.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs text-slate-700 space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Customer:</span>
                <span className="font-bold text-slate-900">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Location:</span>
                <span className="font-bold text-slate-900">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment via:</span>
                <span className="font-bold text-emerald-600 uppercase">{formData.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-black text-slate-900">
                <span>Paid Total:</span>
                <span>{subtotal.toLocaleString()} ETB (ብር)</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-md transition-all text-sm cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
