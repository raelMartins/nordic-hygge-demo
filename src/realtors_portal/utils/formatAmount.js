import countries from '@/constants/country';

export const formatAmount = str => {
  // convert input string to number
  // handle result as a money value in US format
  // since the above returns a string with commas, remove commas from returning string values
  const numToUse =
    str && typeof str == 'string'
      ? Number(str?.replace(/\,/g, '')).toLocaleString('en-US')
      : Number(str?.toString()?.replace(/\,/g, '')).toLocaleString('en-US');
  return `${numToUse}.00`;
};

// export const formatToCurrency = (amount, curr = 'naira', condition, excludeCurrency) => {
//   const currency = {
//     naira: ['en-NG', 'NGN'],
//     dollar: ['en-US', 'USD'],
//     pound: ['en-GB', 'GBP'],
//     yen: ['ja-JP', 'JPY'],
//     canadianDollar: ['en-CA', 'CAD'],
//   };

//   try {
//     const formattedAmount =
//       amount && typeof amount === 'string'
//         ? Number(amount.replace(/\,/g, ''))
//         : Number(amount?.toString()?.replace(/\,/g, ''));
//     let formattedString = formattedAmount.toLocaleString(currency[curr][0], {
//       style: 'currency',
//       currency: currency[curr][1],
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });

//     // Add space if condition is not 'no space'
//     if (condition !== 'no space') {
//       formattedString = formattedString.replace(/(.)(.*)/, '$1 $2');
//     }
//     if (excludeCurrency) {
//       // If excludeCurrency is true, remove currency symbol using regex
//       formattedString = formattedString.substring(1).trim();
//     }
//     if (formattedString.includes('NaN')) {
//       throw new Error('-');
//     }
//     return formattedString;
//   } catch (error) {
//     return '-';
//   }
// };

export const formatToCurrency = (amount, curr = 'naira', condition, excludeCurrency) => {
  if (typeof window === 'undefined') return;
  const defaultCurrency =
    localStorage.getItem('baseCurrency') !== 'undefined' && localStorage.getItem('baseCurrency')
      ? localStorage.getItem('baseCurrency')
      : 'USD';

  const defaultCountry =
    localStorage.getItem('baseCountry') !== 'undefined' && localStorage.getItem('baseCurrency')
      ? localStorage.getItem('baseCountry')
      : 'United States Of America';
  const locale = countries.find(item => item.name === defaultCountry)?.locale || 'en-US';

  try {
    const formattedAmount =
      amount && typeof amount === 'string'
        ? Number(amount.replace(/\,/g, ''))
        : Number(amount?.toString()?.replace(/\,/g, ''));

    let formattedString = formattedAmount.toLocaleString(locale, {
      style: 'currency',
      currency: defaultCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Add space if condition is not 'no space'
    if (condition !== 'no space') {
      formattedString = formattedString.replace(/(.)(.*)/, '$1 $2');
    }
    if (excludeCurrency) {
      // If excludeCurrency is true, remove currency symbol using regex
      formattedString = formattedString.substring(1).trim();
    }
    if (formattedString.includes('NaN')) {
      throw new Error('-');
    }
    return formattedString;
  } catch (error) {
    console.error(error);
    return '-';
  }
};

export const formatWithCommas = value => {
  try {
    if (typeof value !== 'number' && typeof value !== 'string') {
      throw new Error('Input must be a number or a string');
    }

    let strValue = value.toString();

    return strValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } catch (error) {
    return '-';
  }
};

export const priceString = (price, option) =>
  price &&
  parseInt(price)?.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    ...option,
  });
