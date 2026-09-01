import { Product, Seller, SiteSettings } from '../types/ecommerce';
import { mockProducts, initialSellers } from '../data/mockProducts';

// Global Cloud Sync Endpoint (Restful-API Cloud DB object)
const CLOUD_DB_ID = 'ff808181a057a55b01a057bf0c27004f';
const CLOUD_ENDPOINT = `https://api.restful-api.dev/objects/${CLOUD_DB_ID}`;

export interface CloudData {
  products: Product[];
  sellers: Seller[];
  siteSettings?: SiteSettings;
}

// Fetch central cloud data shared across all devices safely
export async function fetchCloudData(): Promise<CloudData | null> {
  try {
    const res = await fetch(CLOUD_ENDPOINT, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();

    if (json && json.data) {
      const rawProducts: any[] = Array.isArray(json.data.products) ? json.data.products : [];
      const rawSellers: any[] = Array.isArray(json.data.sellers) ? json.data.sellers : [];

      // Filter and validate cloud products to avoid malformed objects
      const validCloudProducts: Product[] = rawProducts.filter(
        (p) => p && typeof p === 'object' && p.id && p.name && typeof p.price === 'number' && p.image
      );

      // Filter and validate cloud sellers
      const validCloudSellers: Seller[] = rawSellers.filter(
        (s) => s && typeof s === 'object' && s.id && s.name && s.email
      );

      // Merge mock products with custom cloud products (ensuring no duplicate IDs)
      const existingProductIds = new Set(validCloudProducts.map((p) => p.id));
      const missingMockProducts = mockProducts.filter((mp) => !existingProductIds.has(mp.id));
      const combinedProducts = [...validCloudProducts, ...missingMockProducts];

      // Merge initial sellers with custom cloud sellers
      const existingSellerIds = new Set(validCloudSellers.map((s) => s.id));
      const missingInitialSellers = initialSellers.filter((is) => !existingSellerIds.has(is.id));
      const combinedSellers = [...validCloudSellers, ...missingInitialSellers];

      return {
        products: combinedProducts,
        sellers: combinedSellers,
        siteSettings: json.data.siteSettings,
      };
    }
  } catch (err) {
    console.error('Failed to fetch from central cloud database:', err);
  }
  return null;
}

// Sync updated products list to central cloud database
export async function pushCloudProducts(products: Product[]): Promise<boolean> {
  try {
    const currentCloud = await fetchCloudData();
    const sellersToSave = currentCloud?.sellers || initialSellers;
    const settingsToSave = currentCloud?.siteSettings;

    // Filter valid products before sending
    const validProducts = products.filter(
      (p) => p && typeof p === 'object' && p.id && p.name && typeof p.price === 'number' && p.image
    );

    const bodyData = {
      name: 'kelal_gebeya_database',
      data: {
        products: validProducts,
        sellers: sellersToSave,
        siteSettings: settingsToSave,
      },
    };

    const res = await fetch(CLOUD_ENDPOINT, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
    });

    return res.ok;
  } catch (err) {
    console.error('Failed to push products to central cloud database:', err);
    return false;
  }
}

// Sync updated sellers list to central cloud database
export async function pushCloudSellers(sellers: Seller[]): Promise<boolean> {
  try {
    const currentCloud = await fetchCloudData();
    const productsToSave = currentCloud?.products || mockProducts;
    const settingsToSave = currentCloud?.siteSettings;

    const validSellers = sellers.filter(
      (s) => s && typeof s === 'object' && s.id && s.name && s.email
    );

    const bodyData = {
      name: 'kelal_gebeya_database',
      data: {
        products: productsToSave,
        sellers: validSellers,
        siteSettings: settingsToSave,
      },
    };

    const res = await fetch(CLOUD_ENDPOINT, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
    });

    return res.ok;
  } catch (err) {
    console.error('Failed to push sellers to central cloud database:', err);
    return false;
  }
}

// Sync updated siteSettings to central cloud database
export async function pushCloudSiteSettings(siteSettings: SiteSettings): Promise<boolean> {
  try {
    const currentCloud = await fetchCloudData();
    const productsToSave = currentCloud?.products || mockProducts;
    const sellersToSave = currentCloud?.sellers || initialSellers;

    const bodyData = {
      name: 'kelal_gebeya_database',
      data: {
        products: productsToSave,
        sellers: sellersToSave,
        siteSettings: siteSettings,
      },
    };

    const res = await fetch(CLOUD_ENDPOINT, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
    });

    return res.ok;
  } catch (err) {
    console.error('Failed to push site settings to central cloud database:', err);
    return false;
  }
}
