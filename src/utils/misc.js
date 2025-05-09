import {formatWithCommas} from './formatAmount';

export const randomBackgroundColor = () => {
  const colors = [
    '#2A2F36',
    '#183D3D',
    '#3B2338',
    `#000035`,
    `#4f276e`,
    `#225559`,
    `#c0eaed`,
    `#9e9e28`,
    `#5c5c47`,
    `#7d5f72`,
  ];

  return colors?.[Math.floor(Math.random() * colors?.length)];
};

export const capitalizeString = string => {
  const capitalized_string = string
    ?.split(' ')
    ?.map(el => el?.charAt(0).toUpperCase() + el?.slice(1))
    ?.join(' ');

  return capitalized_string;
};

export const formatPropertySize = string => {
  return !isNaN(string * 1) ? `${formatWithCommas(string * 1)} sqm` : string;
};

export const checkIfSFH = info => {
  const isSFH =
    info?.building_type === 'Detached' ||
    info?.building_type === 'Semi Detached' ||
    info?.building_type === 'Land' ||
    info?.unit?.project?.building_type === 'Detached' ||
    info?.unit?.project?.building_type === 'Semi Detached' ||
    info?.unit?.project?.building_type === 'Land';
  return isSFH;
};
