import {formatWithCommas} from './formatAmount';

export const truncateLongText = (txt, lens) => {
  const length = lens ?? 17;

  return {
    truncatedText: txt.length <= length ? txt : txt?.slice(0, length) + '...',
    originalText: txt,
    isTruncated: txt.length > length,
  };
};

export const formatPropertySize = string => {
  return !isNaN(string * 1) ? `${formatWithCommas(string * 1)} sqm` : string;
};
