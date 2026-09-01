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
import { AppSplashIntro, AppOutroModal } from '../components/AppSplashIntro';

import { mockProducts, initialSellers } from '../data/mockProducts';
import { Product, CartItem, CategoryType, EthiopianCityCode, Language, UserRole, Seller, SiteSettings, AdminProfile, ETHIOPIAN_CITIES } from '../types/ecommerce';
import { getTranslation } from '../data/translations';
import { ArrowUpDown, ShoppingBag, MapPin, CheckCircle2, Sparkles, X } from 'lucide-react';
import { detectUserCity } from '../utils/location';
import { fetchCloudData, pushCloudProducts, pushCloudSellers, pushCloudSiteSettings } from '../utils/cloudDb';

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

  // Restore authenticated user session from localStorage (keep initial activeRole as 'buyer' for app launch)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('kelal_gebeya_auth_user');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setAuthUser(parsed);
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

  // Load saved data & sync with Central Cloud DB across all devices
  useEffect(() => {
    async function syncGlobalCloudData() {
      const cloudData = await fetchCloudData();
      if (cloudData) {
        if (cloudData.products && cloudData.products.length > 0) {
          setProducts(cloudData.products);
          if (typeof window !== 'undefined') {
            localStorage.setItem('kelal_gebeya_products', JSON.stringify(cloudData.products));
          }
        }
        if (cloudData.sellers && cloudData.sellers.length > 0) {
          setSellers(cloudData.sellers);
          if (typeof window !== 'undefined') {
            localStorage.setItem('kelal_gebeya_sellers', JSON.stringify(cloudData.sellers));
          }
        }
        if (
          cloudData.siteSettings &&
          typeof cloudData.siteSettings === 'object' &&
          Array.isArray(cloudData.siteSettings.categories) &&
          cloudData.siteSettings.categories.length > 0
        ) {
          setSiteSettings(cloudData.siteSettings);
        }
      }
    }

    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('kelal_gebeya_site_settings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          if (parsed && Array.isArray(parsed.categories) && parsed.categories.length > 0) {
            setSiteSettings(parsed);
          }
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

      const savedProducts = localStorage.getItem('kelal_gebeya_products');
      if (savedProducts) {
        try {
          const parsed = JSON.parse(savedProducts);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProducts(parsed);
          }
        } catch (e) {
          console.error('Failed to parse saved products:', e);
        }
      }

      const savedSellers = localStorage.getItem('kelal_gebeya_sellers');
      if (savedSellers) {
        try {
          const parsed = JSON.parse(savedSellers);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSellers(parsed);
          }
        } catch (e) {
          console.error('Failed to parse saved sellers:', e);
        }
      }
    }

    // Fetch live central cloud data on mount
    syncGlobalCloudData();

    // Auto-poll central cloud every 15s to fetch new posts from other devices live
    const intervalId = setInterval(() => {
      syncGlobalCloudData();
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  const handleUpdateSiteSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kelal_gebeya_site_settings', JSON.stringify(newSettings));
    }
    pushCloudSiteSettings(newSettings);
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
    heroTitleAm: 'የሚገኙበትን ከተማ አቅራቢያ በመምረጥ ቀላልና አስተማማኝ ግብይት ይፈጽሙ።',
    heroTitleEn: 'Perform fast and reliable trading by selecting your nearby city.',
    heroSubtitleAm: 'የሚገኙበትን ከተማ አቅራቢያ በመምረጥ ቀላልና አስተማማኝ ግብይት ይፈጽሙ።',
    heroSubtitleEn: 'Perform fast and reliable trading by selecting your nearby city.',
    supportPhone: '0940219376',
    supportEmail: 'support@kelalgebeya.com',
    telegramHandle: 't.me/natitg2',
    monthlyRentAmount: 1500,
    telebirrAccount: '0940219376',
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

  // Active Seller Persona for Seller Studio (matches logged in seller or default)
  const currentSeller = useMemo(() => {
    if (authUser && authUser.role === 'seller') {
      const match = sellers.find((s) => s.email.toLowerCase() === authUser.email.toLowerCase());
      if (match) return match;
      return {
        id: `seller-${authUser.email}`,
        name: authUser.name,
        businessName: authUser.name,
        city: 'ADDIS_ABABA' as EthiopianCityCode,
        phone: '+251911223344',
        email: authUser.email,
        joinedDate: '2026-08-31',
        subscriptionStatus: 'active' as const,
        rentAmount: 1500,
        dueDate: '2026-09-30',
      };
    }
    return sellers[0] || initialSellers[0];
  }, [authUser, sellers]);

  // Get list of blocked seller IDs
  const blockedSellerIds = useMemo(() => {
    return sellers
      .filter((s) => s.subscriptionStatus === 'blocked')
      .map((s) => s.id);
  }, [sellers]);

  // Filter Products (Hide products from BLOCKED sellers & filter by City and Category safely)
  const filteredProducts = useMemo(() => {
    const safeProducts = Array.isArray(products) ? products : [];
    return safeProducts
      .filter((p) => {
        if (!p || typeof p !== 'object' || !p.id) return false;

        // Automatic rent enforcement: hide blocked seller items from buyers!
        if (p.sellerId && blockedSellerIds.includes(p.sellerId)) {
          return false;
        }

        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesCity = selectedCity === 'all' || p.city === selectedCity;
        
        const nameStr = p.name || '';
        const nameAmStr = p.nameAm || '';
        const descStr = p.description || '';
        const descAmStr = p.descriptionAm || '';
        const sellerStr = p.sellerName || '';

        const titleMatch = nameStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
          nameAmStr.toLowerCase().includes(searchQuery.toLowerCase());
        const descMatch = descStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
          descAmStr.toLowerCase().includes(searchQuery.toLowerCase());
        const sellerMatch = sellerStr.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesSearch = searchQuery.trim() === '' || titleMatch || descMatch || sellerMatch;

        return matchesCategory && matchesCity && matchesSearch;
      })
      .sort((a, b) => {
        const priceA = typeof a.price === 'number' ? a.price : 0;
        const priceB = typeof b.price === 'number' ? b.price : 0;
        const ratingA = typeof a.rating === 'number' ? a.rating : 5;
        const ratingB = typeof b.rating === 'number' ? b.rating : 5;

        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'rating') return ratingB - ratingA;
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
    setProducts((prev) => {
      const updated = [newProduct, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem('kelal_gebeya_products', JSON.stringify(updated));
      }
      pushCloudProducts(updated);
      return updated;
    });
  };

  const handleRegisterSeller = (newSeller: Seller) => {
    setSellers((prev) => {
      const updated = [newSeller, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem('kelal_gebeya_sellers', JSON.stringify(updated));
      }
      pushCloudSellers(updated);
      return updated;
    });
    setCurrentSeller(newSeller);
  };

  // Admin Handlers (Block/Unblock & Record Rent Payment)
  const handleToggleBlockSeller = (sellerId: string) => {
    setSellers((prev) => {
      const updated = prev.map((s) => {
        if (s.id === sellerId) {
          const newStatus = s.subscriptionStatus === 'blocked' ? 'active' : 'blocked';
          return { ...s, subscriptionStatus: newStatus };
        }
        return s;
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('kelal_gebeya_sellers', JSON.stringify(updated));
      }
      pushCloudSellers(updated);
      return updated;
    });
  };

  const handleRecordRentPayment = (sellerId: string) => {
    setSellers((prev) => {
      const updated = prev.map((s) => {
        if (s.id === sellerId) {
          return {
            ...s,
            subscriptionStatus: 'active',
            rentAmount: siteSettings.monthlyRentAmount,
            dueDate: '2026-09-30' // Next month's due date
          };
        }
        return s;
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('kelal_gebeya_sellers', JSON.stringify(updated));
      }
      pushCloudSellers(updated);
      return updated;
    });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-orange-500 selection:text-white font-sans">
      
      {/* Animated Brand Splash Intro */}
      <AppSplashIntro />

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
            <div className="bg-orange-950/80 border-b border-orange-800/60 px-4 py-2.5 text-xs font-semibold text-orange-200 backdrop-blur-md flex items-center justify-between shadow-lg transition-all">
              <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
                <span className="flex h-2 w-2 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
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
                className="p-1 hover:bg-orange-900/50 rounded-lg text-orange-400 hover:text-white transition-colors ml-2"
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
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-orange-400 border border-slate-700">
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
                  <ArrowUpDown className="w-4 h-4 text-orange-400" />
                  <span>{getTranslation(lang, 'sortBy')}:</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-low' | 'price-high' | 'rating')}
                  className="bg-slate-800 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer w-full sm:w-auto"
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
                  className="px-5 py-2.5 bg-orange-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-orange-400 transition-colors"
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
        onRegisterSeller={handleRegisterSeller}
      />

    </div>
  );
}
