import {MY_COUNTRY} from '@/constants/country';
import {formatToCurrency} from './formatAmount';

export const calculateFee = amount => {
  let cleanedAmount = amount
    ? amount?.toString()?.replaceAll(MY_COUNTRY?.symbol, '').replaceAll(',', '')
    : '';
  const charge = (2.2 / 100) * Number(cleanedAmount);

  let fee;
  fee = Number(cleanedAmount);
  fee = `${Math.ceil(fee)}.00`;
  return formatToCurrency(fee);
};

export const calculateSharedValue = (totalValue, equityValue) => {
  return Number(totalValue) * (Number(equityValue) / 100);
};

export const percentagePaid = (totalAmount, amountPaid) => {
  let percentPaid;
  try {
    percentPaid = ((Number(amountPaid) / Number(totalAmount)) * 100).toFixed(2);
    return `${percentPaid}%`;
  } catch (error) {
    return '-';
  }
};
