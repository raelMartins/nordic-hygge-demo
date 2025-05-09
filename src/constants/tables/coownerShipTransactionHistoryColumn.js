import {Button, HStack, Image, Text} from '@chakra-ui/react';
import React from 'react';

import {changeDateFormat} from '../../utils/formatDate';
import {formatToCurrency} from '../../utils';
import PaymentTypeTag from '../../ui-lib/ui-lib.components/Tag/paymentTypeTag';
import HoverText from '../../ui-lib/ui-lib.components/hover/hoverOnText';

export const COOWNERSHIPTRANSACTIONHISTORYCOLUMN = [
  {
    Header: 'Amount',
    accessor: row => {
      return (
        <HStack justify="start" py={{base: '5.34px', md: '7.83px'}}>
          <HoverText
            color="text"
            lens={[12, 24]}
            fontSize={{base: '10px', xl: '12.968px'}}
            fontWeight="500"
            text={formatToCurrency(row?.amount ?? '-')}
          />
        </HStack>
      );
    },
  },

  {
    Header: 'payment Type',
    accessor: row => {
      return (
        <HStack
          justify="center"
          w="fit-content"
          mx="auto"
          px={{base: '10px', xl: '24px'}}
          py={{base: '5.34px', md: '7.83px'}}
        >
          {' '}
          <PaymentTypeTag type={row?.transaction_action_type} />
        </HStack>
      );
    },
  },

  {
    Header: 'Date',
    accessor: row => {
      return (
        <HStack justify="end" py={{base: '5.34px', md: '7.83px'}}>
          <Text color="text" fontSize={{base: '10px', lg: '12.968px'}} fontWeight="400">
            {changeDateFormat(row?.created_at ?? '')}
          </Text>
        </HStack>
      );
    },
  },
];
