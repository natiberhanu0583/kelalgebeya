'use client';

import React, { useState } from 'react';
import { PackagePlus, CheckCircle2, AlertTriangle, AlertCircle, PlusCircle, MapPin } from 'lucide-react';
import { Product, Seller, EthiopianCityCode, CategoryType, Language, ETHIOPIAN_CITIES, CategoryItem } from '../types/ecommerce';
import { getTranslation } from '../data/translations';

interface SellerPortalProps {
  currentSeller: Seller;
  sellerProducts: Product[];
  lang: Language;
  onAddProduct: (newProd: Product) => void;
  onPayRent: (sellerId: string) => void;
  categories?: CategoryItem[];
}

export const SellerPortal: React.FC<SellerPortalProps> = ({
  currentSeller,
  sellerProducts,
  lang,
  onAddProduct,
  onPayRent,
  categories = [],
}) => {
  const [name, setName] = useState('');
  const [nameAm, setNameAm] = useState('');
  const [category, setCategory] = useState<string>('electronics');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [city, setCity] = useState<EthiopianCityCode>(currentSeller.city);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionAm, setDescriptionAm] = useState('');

  const [publishSuccess, setPublishSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !image) return;

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name,
      nameAm: nameAm || name,
      category: category as CategoryType,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      rating: 4.8,
      reviewsCount: 1,
      image,
      description: description || 'High quality item listed directly by local Ethiopian verified seller.',
      descriptionAm: descriptionAm || 'በተረጋገጠ የሀገር ውስጥ ሻጭ የቀረበ ጥራት ያለው ምርት።',
      features: ['100% Authentic', 'Direct Phone Seller Contact'],
      inStock: true,
      city,
      sellerId: currentSeller.id,
      sellerName: currentSeller.businessName,
      sellerPhone: currentSeller.phone,
    };

    onAddProduct(newProduct);
    setPublishSuccess(true);
    setName('');
    setNameAm('');
    setPrice('');
    setOriginalPrice('');
    setImage('');
    setDescription('');
    setDescriptionAm('');

    setTimeout(() => setPublishSuccess(false), 4000);
  };

  const statusConfig = {
    active: { color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40', icon: CheckCircle2, label: getTranslation(lang, 'statusActive') },
    due_soon: { color: 'bg-amber-500/20 text-amber-400 border-amber-500/40', icon: AlertTriangle, label: getTranslation(lang, 'statusDueSoon') },
    expired: { color: 'bg-rose-500/20 text-rose-400 border-rose-500/40', icon: AlertCircle, label: getTranslation(lang, 'statusExpired') },
    blocked: { color: 'bg-red-900/40 text-red-400 border-red-500', icon: AlertCircle, label: getTranslation(lang, 'statusBlocked') },
  };

  const currentStatus = statusConfig[currentSeller.subscriptionStatus];
  const StatusIcon = currentStatus.icon;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn text-white">
      
      {/* Header Bar */}
      <div className="bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-800 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400">
            {currentSeller.businessName}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            {getTranslation(lang, 'sellerStudioTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {getTranslation(lang, 'sellerStudioSubtitle')}
          </p>
        </div>

        {/* Subscription Status Card */}
        <div className={`p-4 rounded-2xl border flex items-center gap-3 ${currentStatus.color}`}>
          <StatusIcon className="w-6 h-6 flex-shrink-0" />
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider opacity-80">
              {getTranslation(lang, 'subscriptionStatus')}
            </p>
            <p className="text-xs font-black">{currentStatus.label}</p>
            <p className="text-[11px] opacity-90 mt-0.5">
              {getTranslation(lang, 'nextDueDate')}: {currentSeller.dueDate}
            </p>
          </div>
          {currentSeller.subscriptionStatus !== 'active' && (
            <button
              onClick={() => onPayRent(currentSeller.id)}
              className="ml-2 px-3 py-1.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-emerald-400 transition-colors shadow-md"
            >
              {getTranslation(lang, 'payRentNow')}
            </button>
          )}
        </div>
      </div>

      {currentSeller.subscriptionStatus === 'blocked' && (
        <div className="bg-rose-950/80 border border-rose-800 p-4 rounded-2xl text-xs text-rose-300 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
          <span>
            {getTranslation(lang, 'blockedNotice')} Please settle your 1,500 ETB monthly rent payment to reactivate your listings across all cities.
          </span>
        </div>
      )}

      {/* Main Grid: Upload Form + Active Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Upload Form */}
        <div className="lg:col-span-7 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <PackagePlus className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">
              {getTranslation(lang, 'uploadNewProduct')}
            </h3>
          </div>

          {publishSuccess && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-2xl text-xs text-emerald-400 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Product published successfully to the marketplace!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {getTranslation(lang, 'productTitleEn')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Honey / Samsung Galaxy"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {getTranslation(lang, 'productTitleAm')}
                </label>
                <input
                  type="text"
                  placeholder="ምሳሌ፡ ንጹህ ማር / ሳምሰንግ ስልክ"
                  value={nameAm}
                  onChange={(e) => setNameAm(e.target.value)}
                  className="w-full bg-slate-800 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {getTranslation(lang, 'category')}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-800 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  {(categories && categories.length > 0
                    ? categories.filter((c) => c.isActive)
                    : [
                        { id: 'electronics', nameAm: 'ኤሌክትሮኒክስ እና ስልኮች', nameEn: 'Electronics & Phones' },
                        { id: 'fashion', nameAm: 'ልብሶች እና ፋሽን', nameEn: 'Fashion & Apparel' },
                        { id: 'vehicles', nameAm: 'ተሽከርካሪዎች', nameEn: 'Vehicles & Motors' },
                        { id: 'agriculture', nameAm: 'የግብርና እና የሀገር ምርቶች', nameEn: 'Agriculture & Crops' },
                        { id: 'home', nameAm: 'የቤት እቃዎች', nameEn: 'Home & Furniture' },
                        { id: 'coffee', nameAm: 'ቡና እና ቅመማ ቅመም', nameEn: 'Coffee & Spices' },
                      ]
                  ).map((c) => (
                    <option key={c.id} value={c.id}>
                      {lang === 'am' ? c.nameAm : c.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {getTranslation(lang, 'price')} *
                </label>
                <input
                  type="number"
                  step="1"
                  required
                  placeholder="e.g. 6500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-slate-800 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {getTranslation(lang, 'cityLocation')}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value as EthiopianCityCode)}
                  className="w-full bg-slate-800 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  {ETHIOPIAN_CITIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      📍 {lang === 'am' ? c.nameAm : c.nameEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {getTranslation(lang, 'imageLink')} *
              </label>
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/photo-..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-slate-800 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {getTranslation(lang, 'productDescEn')}
                </label>
                <textarea
                  rows={3}
                  placeholder="Detailed description in English..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-800 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {getTranslation(lang, 'productDescAm')}
                </label>
                <textarea
                  rows={3}
                  placeholder="ዝርዝር ማብራሪያ በአማርኛ ያስገቡ..."
                  value={descriptionAm}
                  onChange={(e) => setDescriptionAm(e.target.value)}
                  className="w-full bg-slate-800 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={currentSeller.subscriptionStatus === 'blocked'}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold py-3.5 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all text-xs flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{getTranslation(lang, 'publishProduct')}</span>
            </button>

          </form>
        </div>

        {/* Existing Listings */}
        <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white">
              {getTranslation(lang, 'yourListings')}
            </h3>
            <span className="text-xs font-bold text-emerald-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
              {sellerProducts.length} items
            </span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {sellerProducts.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-10">No products posted yet.</p>
            ) : (
              sellerProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 p-3 bg-slate-800/60 rounded-2xl border border-slate-700/50"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-14 h-14 object-cover rounded-xl bg-slate-950 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {lang === 'am' && p.nameAm ? p.nameAm : p.name}
                    </h4>
                    <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                      {p.price.toLocaleString()} ETB
                    </p>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      {p.category} • 📍 {p.city}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
