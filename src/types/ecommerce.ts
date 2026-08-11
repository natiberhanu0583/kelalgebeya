export type EthiopianCityCode = 
  | 'ADDIS_ABABA'
  | 'ADAMA'
  | 'DEBRE_BERHAN'
  | 'HAWASSA'
  | 'SHASHEMENE'
  | 'BALE_GINIR'
  | 'BALE_ROBE'
  | 'BALE_GOBA'
  | 'ASELLA'
  | 'DIRE_DAWA'
  | 'BAHIR_DAR'
  | 'JIMMA'
  | 'GONDAR'
  | 'MEKELLE'
  | 'HARAR'
  | 'ARBA_MINCH';

export interface EthiopianCityInfo {
  code: EthiopianCityCode;
  nameAm: string;
  nameEn: string;
  regionAm: string;
  regionEn: string;
}

export const ETHIOPIAN_CITIES: EthiopianCityInfo[] = [
  { code: 'ADDIS_ABABA', nameAm: 'አዲስ አበባ', nameEn: 'Addis Ababa', regionAm: 'አዲስ አበባ', regionEn: 'Addis Ababa' },
  { code: 'ADAMA', nameAm: 'አዳማ', nameEn: 'Adama', regionAm: 'ኦሮሚያ', regionEn: 'Oromia' },
  { code: 'DEBRE_BERHAN', nameAm: 'ደብረ ብርሃን', nameEn: 'Debre Berhan', regionAm: 'አማራ', regionEn: 'Amhara' },
  { code: 'HAWASSA', nameAm: 'ሐዋሳ', nameEn: 'Hawassa', regionAm: 'ሲዳማ', regionEn: 'Sidama' },
  { code: 'SHASHEMENE', nameAm: 'ሻሸመኔ', nameEn: 'Shashemene', regionAm: 'ኦሮሚያ', regionEn: 'Oromia' },
  { code: 'BALE_GINIR', nameAm: 'ባሌ ጊኒር', nameEn: 'Bale Ginir', regionAm: 'ባሌ / ኦሮሚያ', regionEn: 'Bale / Oromia' },
  { code: 'BALE_ROBE', nameAm: 'ባሌ ሮቤ', nameEn: 'Bale Robe', regionAm: 'ባሌ / ኦሮሚያ', regionEn: 'Bale / Oromia' },
  { code: 'BALE_GOBA', nameAm: 'ባሌ ጎባ', nameEn: 'Bale Goba', regionAm: 'ባሌ / ኦሮሚያ', regionEn: 'Bale / Oromia' },
  { code: 'ASELLA', nameAm: 'አሰላ', nameEn: 'Asella', regionAm: 'አርሲ / ኦሮሚያ', regionEn: 'Arsi / Oromia' },
  { code: 'DIRE_DAWA', nameAm: 'ድሬዳዋ', nameEn: 'Dire Dawa', regionAm: 'ድሬዳዋ', regionEn: 'Dire Dawa' },
  { code: 'BAHIR_DAR', nameAm: 'ባህር ዳር', nameEn: 'Bahir Dar', regionAm: 'አማራ', regionEn: 'Amhara' },
  { code: 'JIMMA', nameAm: 'ጅማ', nameEn: 'Jimma', regionAm: 'ኦሮሚያ', regionEn: 'Oromia' },
  { code: 'GONDAR', nameAm: 'ጎንደር', nameEn: 'Gondar', regionAm: 'አማራ', regionEn: 'Amhara' },
  { code: 'MEKELLE', nameAm: 'መቀሌ', nameEn: 'Mekelle', regionAm: 'ትግራይ', regionEn: 'Tigray' },
  { code: 'HARAR', nameAm: 'ሐረር', nameEn: 'Harar', regionAm: 'ሐረሪ', regionEn: 'Harari' },
  { code: 'ARBA_MINCH', nameAm: 'አርባ ምንጭ', nameEn: 'Arba Minch', regionAm: 'ደቡብ', regionEn: 'South' },
];

export interface Seller {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  city: EthiopianCityCode;
  rentAmount: number; // e.g. 1,500 ETB
  dueDate: string; // ISO date
  subscriptionStatus: 'active' | 'due_soon' | 'expired' | 'blocked';
  joinedDate: string;
}

export interface Product {
  id: string;
  name: string;
  nameAm?: string;
  category: string;
  price: number; // Price in ETB (ብር)
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  descriptionAm?: string;
  features: string[];
  inStock: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  badge?: string;
  badgeAm?: string;
  city: EthiopianCityCode;
  sellerId: string;
  sellerName: string;
  sellerPhone: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type CategoryType = 'all' | 'electronics' | 'fashion' | 'vehicles' | 'agriculture' | 'home' | 'coffee';

export type Language = 'am' | 'en';

export type UserRole = 'buyer' | 'seller' | 'admin';

export interface FilterState {
  category: CategoryType;
  city: EthiopianCityCode | 'all';
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
}

export interface CategoryItem {
  id: string;
  nameAm: string;
  nameEn: string;
  isActive: boolean;
}

export interface SiteSettings {
  siteNameAm: string;
  siteNameEn: string;
  siteSubtitleAm: string;
  siteSubtitleEn: string;
  announcementAm: string;
  announcementEn: string;
  heroTitleAm: string;
  heroTitleEn: string;
  heroSubtitleAm: string;
  heroSubtitleEn: string;
  supportPhone: string;
  supportEmail: string;
  telegramHandle: string;
  monthlyRentAmount: number; // e.g. 1500 ETB
  telebirrAccount: string;
  cbeAccount: string;
  enabledCities: EthiopianCityCode[];
  categories: CategoryItem[];
}

export interface AdminProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  lastLogin: string;
}


export interface CheckoutDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  phone: string;
  paymentMethod: 'telebirr' | 'chapa' | 'cbe_birr' | 'cash_on_delivery';
}
