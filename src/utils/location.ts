import { EthiopianCityCode, ETHIOPIAN_CITIES } from '../types/ecommerce';

// Coordinates for major Ethiopian cities
const CITY_COORDINATES: Record<EthiopianCityCode, { lat: number; lng: number }> = {
  ADDIS_ABABA: { lat: 9.0222, lng: 38.7468 },
  ADAMA: { lat: 8.5414, lng: 39.2689 },
  DEBRE_BERHAN: { lat: 9.6789, lng: 39.5312 },
  HAWASSA: { lat: 7.0504, lng: 38.4744 },
  SHASHEMENE: { lat: 7.2000, lng: 38.6000 },
  BALE_GINIR: { lat: 7.1333, lng: 40.7000 },
  BALE_ROBE: { lat: 7.1167, lng: 40.0000 },
  BALE_GOBA: { lat: 7.0167, lng: 39.9833 },
  ASELLA: { lat: 7.9500, lng: 39.1333 },
  DIRE_DAWA: { lat: 9.5931, lng: 41.8661 },
  BAHIR_DAR: { lat: 11.5944, lng: 37.3883 },
  JIMMA: { lat: 7.6736, lng: 36.8344 },
  GONDAR: { lat: 12.6000, lng: 37.4667 },
  MEKELLE: { lat: 13.4967, lng: 39.4753 },
  HARAR: { lat: 9.3139, lng: 42.1181 },
  ARBA_MINCH: { lat: 6.0333, lng: 37.5500 },
};

// Haversine distance formula to find closest city from coordinates
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function findClosestCity(lat: number, lng: number): EthiopianCityCode {
  let closestCity: EthiopianCityCode = 'ADDIS_ABABA';
  let minDistance = Infinity;

  (Object.keys(CITY_COORDINATES) as EthiopianCityCode[]).forEach((cityCode) => {
    const coords = CITY_COORDINATES[cityCode];
    const distance = getDistanceFromLatLonInKm(lat, lng, coords.lat, coords.lng);
    if (distance < minDistance) {
      minDistance = distance;
      closestCity = cityCode;
    }
  });

  return closestCity;
}

// Auto-detect user city using HTML5 Geolocation API with IP-location fallback
export async function detectUserCity(): Promise<{ city: EthiopianCityCode; source: 'gps' | 'ip' | 'default' }> {
  // Check localStorage for saved city preference
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('user_selected_city') as EthiopianCityCode;
    if (saved && ETHIOPIAN_CITIES.some((c) => c.code === saved)) {
      return { city: saved, source: 'default' };
    }
  }

  // 1. Try Browser Geolocation API
  if (typeof navigator !== 'undefined' && navigator.geolocation) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 5000,
          maximumAge: 60000,
        });
      });
      const city = findClosestCity(position.coords.latitude, position.coords.longitude);
      return { city, source: 'gps' };
    } catch (err) {
      console.log('GPS Geolocation skipped or denied, trying IP detection...');
    }
  }

  // 2. Try Free IP Location API fallback safely
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal }).catch(() => null);
    clearTimeout(timeoutId);

    if (res && res.ok) {
      const data = await res.json().catch(() => null);
      if (data) {
        const detectedCityName = (data.city || '').toLowerCase();
        
        // Match against known Ethiopian cities
        for (const cityObj of ETHIOPIAN_CITIES) {
          if (
            detectedCityName.includes(cityObj.nameEn.toLowerCase()) ||
            cityObj.nameEn.toLowerCase().includes(detectedCityName)
          ) {
            return { city: cityObj.code, source: 'ip' };
          }
        }

        // If latitude and longitude are returned by IP API
        if (data.latitude && data.longitude) {
          const city = findClosestCity(data.latitude, data.longitude);
          return { city, source: 'ip' };
        }
      }
    }
  } catch (err) {
    // Silent fallback to default city
  }

  // Default to Addis Ababa
  return { city: 'ADDIS_ABABA', source: 'default' };
}
