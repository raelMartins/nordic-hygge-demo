import React from 'react';
import {formatToCurrency} from './formatAmount';
import {useToast} from '@chakra-ui/react';

export const MinimumPaymentValueToast = () => {
  const toast = useToast();

  return () =>
    toast({
      title: `Transactions must meet a minimum threshold of ${formatToCurrency(100)}.`,
      status: 'warning',
      isClosable: true,
    });
};
