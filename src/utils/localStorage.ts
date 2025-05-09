import {MY_PREFERRED_THEME} from '../constants/names';

export const getItemFromLS = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  const item = window.localStorage.getItem(key);
  if (!item) return null;
  try {
    return JSON.parse(item) as T;
  } catch (error) {
    if (typeof item === 'string') return item as unknown as T;
    return null;
  }
};

export const setItemInLS = (key: string, value: any) => {
  if (typeof window === 'undefined') return;
  if (typeof value === 'string') {
    window.localStorage.setItem(key, value);
  } else {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeItemFromLS = (key: string) => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(key);
};

export const appCurrentTheme = getItemFromLS(MY_PREFERRED_THEME);
// export const appCurrentTheme = `light`;
