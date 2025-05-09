import {MY_COUNTRY} from '@/constants/country';

export const priceString = (price, option) =>
  price &&
  `${MY_COUNTRY?.symbol} ` +
    parseInt(price)?.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      ...option,
    });
