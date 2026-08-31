'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from '../components/Header';
import { CityHeaderBanner } from '../components/CityHeaderBanner';
import { ProductCard } from '../components/ProductCard';
import { ProductQuickViewModal } from '../components/ProductQuickViewModal';
import { ContactSellerModal } from '../components/ContactSellerModal';
import { SellerPortal } from '../components/SellerPortal';
import { AdminDashboard } from '../components/AdminDashboard';
import { CartDrawer } from '../components/CartDrawer';
import { CheckoutModal } from '../components/CheckoutModal';
import { Footer } from '../components/Footer';
import { PWAInstallPrompt } from '../components/PWAInstallPrompt';
import { AuthModal } from '../components/AuthModal';

import { mockProducts, initialSellers } from '../data/mockProducts';
import { Product, CartItem, CategoryType, EthiopianCityCode, Language, UserRole, Seller, SiteSettings, AdminProfile, ETHIOPIAN_CITIES } from '../types/ecommerce';
import { getTranslation } from '../data/translations';
import { ArrowUpDown, ShoppingBag, MapPin, CheckCircle2, Sparkles, X } from 'lucide-react';
import { detectUserCity } from '../utils/location';

export default function Home() {
  // Global State
  const [lang, setLang] = useState<Language>('am'); // Default to Amharic
  const [activeRole, setActiveRole] = useState<UserRole>('buyer');
  const [selectedCity, setSelectedCity] = useState<EthiopianCityCode | 'all'>('all');
  const [detectedToast, setDetectedToast] = useState<{ cityNameAm: string; cityNameEn: string; source: string } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Authentication Protection State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authTargetRole, setAuthTargetRole] = useState<'seller' | 'admin'>('seller');
  const [authUser, setAuthUser] = useState<{ name: string; email: string; avatar?: string; role: 'seller' | 'admin' } | null>(null);

  // Restore authenticated user session from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('kelal_gebeya_auth_user');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setAuthUser(parsed);
          // Automatically restore role view if logged in
          if (parsed.role) {
            setActiveRole(parsed.role);
          }
        } catch (e) {
          console.error('Failed to parse saved auth user:', e);
        }
      }
    }
  }, []);

  const handleSelectRole = (role: UserRole) => {
    if (role === 'buyer') {
      setActiveRole('buyer');
      return;
    }

    if (authUser && authUser.role === role) {
      setActiveRole(role);
    } else {
      setAuthTargetRole(role);
      setIsAuthModalOpen(true);
    }
  };

  const handleRequestAuth = (role: 'seller' | 'admin') => {
    setAuthTargetRole(role);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (userData: { name: string; email: string; avatar?: string; role: 'seller' | 'admin' }) => {
    setAuthUser(userData);
    setActiveRole(userData.role);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kelal_gebeya_auth_user', JSON.stringify(userData));
    }
  };

  const handleSignOut = () => {
    setAuthUser(null);
    setActiveRole('buyer');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kelal_gebeya_auth_user');
    }
  };

  // Auto-detect user's city on page load
  useEffect(() => {
    async function runCityDetection() {
      const result = await detectUserCity();
      setSelectedCity(result.city);
      
      const cityObj = ETHIOPIAN_CITIES.find((c) => c.code === result.city);
      if (cityObj) {
        setDetectedToast({
          cityNameAm: cityObj.nameAm,
          cityNameEn: cityObj.nameEn,
          source: result.source === 'gps' ? 'GPS' : 'IP Location',
        });
      }
    }
    runCityDetection();
  }, []);

  const handleCitySelect = (city: EthiopianCityCode | 'all') => {
    setSelectedCity(city);
    if (typeof window !== 'undefined' && city !== 'all') {
      localStorage.setItem('user_selected_city', city);
    }
  };

  // Application Data State
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [sellers, setSellers] = useState<Seller[]>(initialSellers);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: mockProducts[0], quantity: 1 },
    { product: mockProducts[2], quantity: 1 }
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-2', 'prod-3']);

  // Load saved site settings & admin profile from localStorage on initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('kelal_gebeya_site_settings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setSiteSettings(parsed);
        } catch (e) {
          console.error('Failed to parse saved site settings:', e);
        }
      }

      const savedProfile = localStorage.getItem('kelal_gebeya_admin_profile');
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile);
          setAdminProfile(parsed);
        } catch (e) {
          console.error('Failed to parse saved admin profile:', e);
        }
      }
    }
  }, []);

  const handleUpdateSiteSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kelal_gebeya_site_settings', JSON.stringify(newSettings));
    }
  };

  const handleUpdateAdminProfile = (newProfile: AdminProfile) => {
    setAdminProfile(newProfile);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kelal_gebeya_admin_profile', JSON.stringify(newProfile));
    }
  };

  // Dynamic Admin & Website Management Settings
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteNameAm: 'ቀላል ገበያ',
    siteNameEn: 'Kelal Gebeya',
    siteSubtitleAm: 'የገዢዎች እና ሻጮች ቀጥታ ገበያ',
    siteSubtitleEn: 'Direct Buyer-Seller Local Platform',
    announcementAm: '🎉 ከሚፈልጉት ከተማ ፈጣን ግብይትን ይፈጽሙ',
    announcementEn: '🎉 Fast trading from any city of your choice!',
    heroTitleAm: 'በማንኛውም የኢትዮጵያ ከተሞች ፈጣን እና አስተማማኝ ግብይት',
    heroTitleEn: 'Fast and reliable trading in any Ethiopian city',
    heroSubtitleAm: 'በአዲስ አበባ፣ አዳማ፣ ደብረ ብርሃን፣ ሐዋሳ፣ ሻሸመኔ፣ ባሌ ጊኒር፣ ባሌ ሮቤ፣ ባሌ ጎባ፣ አሰላ፣ ድሬዳዋ፣ ባህር ዳር፣ ጅማ፣ ጎንደር፣ መቀሌ፣ ሐረር፣ አርባ ምንጭ እና በማንኛውም የኢትዮጵያ ከተሞች ፈጣን እና አስተማማኝ ግብይትን ይፈጽሙ።',
    heroSubtitleEn: 'Buy and sell directly in Addis Ababa, Adama, Debre Berhan, Hawassa, Shashemene, Bale Ginir, Bale Robe, Bale Goba, Asella, Dire Dawa, Bahir Dar, Jimma, Gondar, Mekelle, Harar, Arba Minch, and all Ethiopian cities.',
    supportPhone: '+251911223344',
    supportEmail: 'support@ethiopiacitiesmarket.et',
    telegramHandle: '@ethiopia_cities_admin',
    monthlyRentAmount: 1500,
    telebirrAccount: '+251911223344',
    cbeAccount: '1000123456789',
    enabledCities: [
      'ADDIS_ABABA', 'ADAMA', 'DEBRE_BERHAN', 'HAWASSA', 'SHASHEMENE',
      'BALE_GINIR', 'BALE_ROBE', 'BALE_GOBA', 'ASELLA', 'DIRE_DAWA',
      'BAHIR_DAR', 'JIMMA', 'GONDAR', 'MEKELLE', 'HARAR', 'ARBA_MINCH'
    ],
    categories: [
      { id: 'electronics', nameAm: 'ኤሌክትሮኒክስ እና ስልኮች', nameEn: 'Electronics & Phones', isActive: true },
      { id: 'fashion', nameAm: 'ልብሶች እና ፋሽን', nameEn: 'Fashion & Apparel', isActive: true },
      { id: 'vehicles', nameAm: 'ተሽከርካሪዎች', nameEn: 'Vehicles & Motors', isActive: true },
      { id: 'agriculture', nameAm: 'የግብርና እና የሀገር ምርቶች', nameEn: 'Agriculture & Crops', isActive: true },
      { id: 'home', nameAm: 'የቤት እቃዎች', nameEn: 'Home & Furniture', isActive: true },
      { id: 'coffee', nameAm: 'ቡና እና ቅመማ ቅመም', nameEn: 'Coffee & Spices', isActive: true },
    ]
  });

  const [adminProfile, setAdminProfile] = useState<AdminProfile>({
    name: 'የስርዓቱ ዋና አድሚን (Super Admin)',
    email: 'admin@ethiopiacitiesmarket.et',
    phone: '+251911000000',
    role: 'Super Administrator',
    lastLogin: '2026-08-11 12:00'
  });

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [contactSellerProduct, setContactSellerProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Active Seller Persona for Seller Studio (default to Seller 1 - Tadesse Alemu)
  const currentSeller = sellers[0];

  // Get list of blocked seller IDs
  const blockedSellerIds = useMemo(() => {
    return sellers
      .filter((s) => s.subscriptionStatus === 'blocked')
      .map((s) => s.id);
  }, [sellers]);

  // Filter Products (Hide products from BLOCKED sellers & filter by City and Category)
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Automatic rent enforcement: hide blocked seller items from buyers!
        if (blockedSellerIds.includes(p.sellerId)) {
          return false;
        }

        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesCity = selectedCity === 'all' || p.city === selectedCity;
        
        const titleMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.nameAm && p.nameAm.toLowerCase().includes(searchQuery.toLowerCase()));
        const descMatch = p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.descriptionAm && p.descriptionAm.toLowerCase().includes(searchQuery.toLowerCase()));
        const sellerMatch = p.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesSearch = searchQuery.trim() === '' || titleMatch || descMatch || sellerMatch;

        return matchesCategory && matchesCity && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, blockedSellerIds, selectedCategory, selectedCity, searchQuery, sortBy]);

  // Cart & Wishlist Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  // Seller Handlers
  const handleAddProductBySeller = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // Admin Handlers (Block/Unblock & Record Rent Payment)
  const handleToggleBlockSeller = (sellerId: string) => {
    setSellers((prev) =>
      prev.map((s) => {
        if (s.id === sellerId) {
          const newStatus = s.subscriptionStatus === 'blocked' ? 'active' : 'blocked';
          return { ...s, subscriptionStatus: newStatus };
        }
        return s;
      })
    );
  };

  const handleRecordRentPayment = (sellerId: string) => {
    setSellers((prev) =>
      prev.map((s) => {
        if (s.id === sellerId) {
          return {
            ...s,
            subscriptionStatus: 'active',
            rentAmount: siteSettings.monthlyRentAmount,
            dueDate: '2026-09-30' // Next month's due date
          };
        }
        return s;
      })
    );
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950 font-sans">
      
      {/* Header with City Selector, Language & Role Navigation */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedCity={selectedCity}
        onSelectCity={handleCitySelect}
        lang={lang}
        onToggleLanguage={() => setLang(lang === 'am' ? 'en' : 'am')}
        activeRole={activeRole}
        onSelectRole={handleSelectRole}
        onOpenCart={() => setIsCartOpen(true)}
        siteSettings={siteSettings}
        authUser={authUser}
        onSignOut={handleSignOut}
        onRequestGoogleAuth={handleRequestAuth}
      />

      {/* RENDER BASED ON ACTIVE ROLE VIEW */}
      {activeRole === 'buyer' && (
        <>
          {/* Location Detection Toast Notification */}
          {detectedToast && (
            <div className="bg-emerald-950/80 border-b border-emerald-800/60 px-4 py-2.5 text-xs font-semibold text-emerald-200 backdrop-blur-md flex items-center justify-between shadow-lg transition-all">
              <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
                <span className="flex h-2 w-2 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {lang === 'am' ? (
                    <>ቦታዎ በራስ-ሰር ተለይቷል፡ <strong className="text-white underline">{detectedToast.cityNameAm}</strong> ({detectedToast.cityNameEn}) — የከተማ ማጣሪያው ባለበት ከተማ ዲፎልት ተደርጓል!</>
                  ) : (
                    <>Location detected: <strong className="text-white underline">{detectedToast.cityNameEn}</strong> ({detectedToast.cityNameAm}) — City filter updated automatically!</>
                  )}
                </span>
              </div>
              <button
                onClick={() => setDetectedToast(null)}
                className="p-1 hover:bg-emerald-900/50 rounded-lg text-emerald-400 hover:text-white transition-colors ml-2"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* New Ethiopian City Header Banner */}
          <CityHeaderBanner
            selectedCity={selectedCity}
            onSelectCity={handleCitySelect}
            lang={lang}
            onExplore={() => {
              const section = document.getElementById('catalog-section');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
            siteSettings={siteSettings}
          />

          {/* Catalog Main Content */}
          <main id="catalog-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            
            {/* Filter & Controls Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-4 sm:px-6 sm:py-4 rounded-2xl border border-slate-800 backdrop-blur-md">
              
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <span>{getTranslation(lang, 'catalogTitle')}</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                    {filteredProducts.length} {getTranslation(lang, 'itemsCount')}
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  {selectedCity !== 'all' && `📍 City Filter Active (${selectedCity}) | `}
                  {selectedCategory === 'all'
                    ? getTranslation(lang, 'allCategories')
                    : `Category: ${selectedCategory.toUpperCase()}`}
                </p>
              </div>

              {/* Sort Selection */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold whitespace-nowrap">
                  <ArrowUpDown className="w-4 h-4 text-emerald-400" />
                  <span>{getTranslation(lang, 'sortBy')}:</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-low' | 'price-high' | 'rating')}
                  className="bg-slate-800 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer w-full sm:w-auto"
                >
                  <option value="featured">{getTranslation(lang, 'featured')}</option>
                  <option value="price-low">{getTranslation(lang, 'priceLowHigh')}</option>
                  <option value="price-high">{getTranslation(lang, 'priceHighLow')}</option>
                  <option value="rating">{getTranslation(lang, 'topRated')}</option>
                </select>
              </div>

            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800/80 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-200">{getTranslation(lang, 'noProducts')}</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {getTranslation(lang, 'noProductsDesc')}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedCity('all');
                  }}
                  className="px-5 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-emerald-400 transition-colors"
                >
                  {getTranslation(lang, 'resetFilters')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlistIds.includes(product.id)}
                    isInCart={cartItems.some((item) => item.product.id === product.id)}
                    lang={lang}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onContactSeller={(p) => setContactSellerProduct(p)}
                  />
                ))}
              </div>
            )}

          </main>
        </>
      )}

      {/* SELLER STUDIO ROLE VIEW */}
      {activeRole === 'seller' && (
        <SellerPortal
          currentSeller={currentSeller}
          sellerProducts={products.filter((p) => p.sellerId === currentSeller.id)}
          lang={lang}
          categories={siteSettings.categories}
          onAddProduct={handleAddProductBySeller}
          onPayRent={handleRecordRentPayment}
        />
      )}

      {/* ADMIN CONTROL ROLE VIEW */}
      {activeRole === 'admin' && (
        <AdminDashboard
          sellers={sellers}
          lang={lang}
          siteSettings={siteSettings}
          onUpdateSiteSettings={handleUpdateSiteSettings}
          adminProfile={adminProfile}
          onUpdateAdminProfile={handleUpdateAdminProfile}
          onToggleBlockSeller={handleToggleBlockSeller}
          onRecordPayment={handleRecordRentPayment}
        />
      )}

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        isInCart={quickViewProduct ? cartItems.some((item) => item.product.id === quickViewProduct.id) : false}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(product, qty) => handleAddToCart(product, qty)}
        onToggleWishlist={handleToggleWishlist}
      />

      <ContactSellerModal
        product={contactSellerProduct}
        isOpen={!!contactSellerProduct}
        lang={lang}
        onClose={() => setContactSellerProduct(null)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        cartItems={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        cartItems={cartItems}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={() => setCartItems([])}
      />

      {/* PWA Mobile App Install Prompt */}
      <PWAInstallPrompt />

      {/* Role Protection Login Modal (Email & Password + Google) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        targetRole={authTargetRole}
        lang={lang}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        sellers={sellers}
      />

    </div>
  );
}
