'use client';

import React, { useState } from 'react';
import { PackagePlus, CheckCircle2, AlertTriangle, AlertCircle, PlusCircle, MapPin, Upload, Image as ImageIcon } from 'lucide-react';
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
  const [city, setCity] = useState<EthiopianCityCode>(currentSeller?.city || 'ADDIS_ABABA');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionAm, setDescriptionAm] = useState('');

  const [publishSuccess, setPublishSuccess] = useState(false);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    // Preset fallback images by category
    const defaultImages: Record<string, string> = {
      electronics: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
      fashion: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80',
      vehicles: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80',
      agriculture: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
      home: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80',
      coffee: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    };

    const finalImage = image.trim() || defaultImages[category] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80';

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      nameAm: nameAm.trim() || name.trim(),
      category: category as CategoryType,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      rating: 5.0,
      reviewsCount: 1,
      image: finalImage,
      description: description.trim() || 'በተረጋገጠ የሀገር ውስጥ ሻጭ የቀረበ ጥራት ያለው ምርት።',
      descriptionAm: descriptionAm.trim() || 'በተረጋገጠ የሀገር ውስጥ ሻጭ የቀረበ ጥራት ያለው ምርት።',
      features: ['100% Authentic Product', 'Direct Seller Contact'],
      inStock: true,
      city: city,
      sellerId: currentSeller?.id || 'seller-default',
      sellerName: currentSeller?.businessName || currentSeller?.name || 'የሀገር ውስጥ ሻጭ',
      sellerPhone: currentSeller?.phone || '+251911223344',
    };

    onAddProduct(newProduct);
    setPublishSuccess(true);

    // Reset Form
    setName('');
    setNameAm('');
    setPrice('');
    setOriginalPrice('');
    setImage('');
    setDescription('');
    setDescriptionAm('');

    setTimeout(() => setPublishSuccess(false), 5000);
  };

  const sellerStatus = currentSeller?.subscriptionStatus || 'active';
  const statusConfig = {
    active: { color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40', icon: CheckCircle2, label: getTranslation(lang, 'statusActive') },
    due_soon: { color: 'bg-amber-500/20 text-amber-400 border-amber-500/40', icon: AlertTriangle, label: getTranslation(lang, 'statusDueSoon') },
    expired: { color: 'bg-rose-500/20 text-rose-400 border-rose-500/40', icon: AlertCircle, label: getTranslation(lang, 'statusExpired') },
    blocked: { color: 'bg-red-900/40 text-red-400 border-red-500', icon: AlertCircle, label: getTranslation(lang, 'statusBlocked') },
  };

  const currentStatus = statusConfig[sellerStatus];
  const StatusIcon = currentStatus.icon;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn text-white">
      
      {/* Header Bar */}
      <div className="bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-800 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400">
            {currentSeller?.businessName || currentSeller?.name || 'የሻጭ ገጽ'}
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
              {getTranslation(lang, 'nextDueDate')}: {currentSeller?.dueDate || '2026-09-30'}
            </p>
          </div>
          {sellerStatus !== 'active' && (
            <button
              onClick={() => onPayRent(currentSeller.id)}
              className="ml-2 px-3 py-1.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-emerald-400 transition-colors shadow-md cursor-pointer"
            >
              {getTranslation(lang, 'payRentNow')}
            </button>
          )}
        </div>
      </div>

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
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-xs text-emerald-400 font-semibold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>🎉 ምርቱ በስኬት ተለጥፏል! አሁን በሁሉም የኢትዮጵያ ከተሞች ገበያ ላይ ይገኛል።</span>
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
                  placeholder="e.g. Samsung Galaxy S24 Ultra"
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
                  placeholder="ምሳሌ፡ ሳምሰንግ ስልክ"
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
                  {getTranslation(lang, 'price')} (ብር ETB) *
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

            {/* Flexible Product Photo Upload & URL options */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                የምርቱ ፎቶ (Product Image)
              </label>

              <div className="flex flex-col sm:flex-row gap-3 items-center">
                {/* Device Photo Upload Button */}
                <label className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-bold cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 text-emerald-400" />
                  <span>ከስልክ/ኮምፒውተር ፎቶ ይምረጡ</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                </label>

                <span className="text-slate-500 text-xs font-bold">ወይም</span>

                {/* Optional URL Input */}
                <input
                  type="text"
                  placeholder="የፎቶ ሊንክ (Image URL - Optional)"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="flex-1 w-full bg-slate-800 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Image Preview if provided */}
              {image && (
                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={image}
                    alt="Preview"
                    className="w-14 h-14 object-cover rounded-xl border border-slate-700 shadow-md"
                  />
                  <span className="text-[11px] text-emerald-400 font-semibold">✓ ፎቶ ተመርጧል (Ready to publish)</span>
                </div>
              )}
            </div>

            {/* Product Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                ስለ ምርቱ ማብራሪያ (Product Description)
              </label>
              <textarea
                rows={3}
                placeholder="ስለ ምርቱ ሁኔታ፣ ጥራት እና ዝርዝር መረጃ እዚህ ይጻፉ..."
                value={descriptionAm}
                onChange={(e) => { setDescriptionAm(e.target.value); setDescription(e.target.value); }}
                className="w-full bg-slate-800 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl transition-all text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer mt-4"
            >
              <PlusCircle className="w-4 h-4" />
              <span>ምርቱን በገበያ ላይ ልቀቅ (Publish Product)</span>
            </button>
          </form>
        </div>

        {/* Seller's Active Listings Table */}
        <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white">
              የእርስዎ የተለቀቁ ምርቶች ({sellerProducts.length})
            </h3>
            <span className="text-xs text-emerald-400 font-bold">ለገዢዎች የሚታዩ</span>
          </div>

          {sellerProducts.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ImageIcon className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400">እስካሁን የለቀቁት ምርት የለም። ከግራ በኩል የመጀመሪያ ምርትዎን ይልቀቁ!</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {sellerProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-14 h-14 object-cover rounded-xl border border-slate-800"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">{lang === 'am' ? (p.nameAm || p.name) : p.name}</p>
                    <p className="text-xs text-emerald-400 font-black">{p.price.toLocaleString()} ETB</p>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{p.city}</span>
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    LIVE
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
