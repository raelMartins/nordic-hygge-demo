import {Text} from '@chakra-ui/react';
import React from 'react';
import {formatAmount} from './formatAmount';
import {priceString} from './priceString';

export const handleLastTwoDigits = (amount, color) => {
  const getLastTwoDigits = Number(amount).toFixed(2)?.split('.')?.pop();
  // amount.toString().search(".") > -1
  //   ? amount.toString().slice(-3)
  //   : amount?.toFixed(2)?.toString().slice(-3);

  //   function addZeroIfNeeded(str) {
  //     if (/^[0-9]$/.test(str)) {
  //       return str + "0";
  //     } else {
  //       return "00";
  //     }
  //   }
  function addZero(num) {
    const n = Number(num);
    if (n >= 0 && n < 10) {
      return n + '0';
    } else if (n >= 10 && n <= 99) {
      return n.toString();
    } else {
      return '00';
    }
  }

  return (
    <Text as="span" color={color ?? 'lightgrey'}>
      .{addZero(getLastTwoDigits)}
    </Text>
  );
};
export const removeLasttTwoDigits = amount => {
  // return amount.toString().search('.') > -1 ? formatAmount(amount?.toString()?.slice(0, -3)) : formatAmount(amount?.toFixed(2)?.toString()?.slice(0, -3));
  return priceString(amount?.toString()?.split('.')?.[0]);
};
