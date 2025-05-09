export const appWindow = typeof window !== 'undefined' ? window : null;

export const BUSINESS_ID = () => {
  if (appWindow && localStorage) {
    const businessId = localStorage.getItem('businessId');
    try {
      return businessId ? JSON.parse(businessId) : null;
    } catch (error) {
      console.error('Failed to parse businessId from localStorage', error);
      return null;
    }
  }
  return null;
};

export const getLocalStorageData = key => {
  if (appWindow && localStorage) {
    const storedDAta = localStorage.getItem(key);
    try {
      return storedDAta ? JSON.parse(storedDAta) : null;
    } catch (error) {
      console.error(`Failed to parse ${storedDAta} from localStorage`, error);
      return null;
    }
  }
  return null;
};
// : global?.location?.reload();

const ENV_PREFIX =
  process.env.NEXT_PUBLIC_SERVER_ENV === 'development'
    ? 'dev'
    : process.env.NEXT_PUBLIC_SERVER_ENV === 'staging'
    ? 'staging'
    : process.env.NEXT_PUBLIC_SERVER_ENV === 'production'
    ? 'api'
    : 'dev';

export const BaseURL_ONE = `https://${ENV_PREFIX}.matadortrust.com/v1`;
export const BaseURL_TWO = `https://${ENV_PREFIX}.matadortrust.com/v2`;
export const ROUTES = {};

export const EXTERNAL_ROUTES = {};

export const BASE_ROUTE = 'https://matadortrust.com';

const isEnvDev = process && process.env.NODE_ENV === 'development';

let storeDomain;

storeDomain = 'malikproperties-dev.6787878.com';

export const STORE__DOMAIN = storeDomain;

export const store_name = () =>
  appWindow && localStorage && JSON?.parse(localStorage.getItem('storeName'));

export const STORENAMEFROMDOMAIN = store_name();
// STORE__DOMAIN?.split('.')[0];

export const storeName = store_name();
// STORENAMEFROMDOMAIN;

// typeof window !== 'undefined' &&
// localStorage.getItem('storeDetails') &&
// JSON?.parse(localStorage?.getItem('storeDetails'))['store_name'];

export const LoggedinUser =
  typeof window !== 'undefined' &&
  localStorage.getItem('storeDetails') &&
  JSON?.parse(localStorage?.getItem('LoggedinUser'));

export const STORE =
  typeof window !== 'undefined' &&
  localStorage.getItem('storeDetails') &&
  JSON?.parse(localStorage?.getItem('storeDetails'));
