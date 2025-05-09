import {HStack, Image, Text} from '@chakra-ui/react';
import React from 'react';
import {formatToCurrency} from '../../utils';
import {changeDateFormat} from '../../utils/formatDate';
// import {formatToCurrency} from 'utils';
// import {changeDateFormat} from 'utils/formatDate';

const FRACTIONTRANSACTIONHISTORYCOLUMN = [
  {
    Header: 'Amount',
    accessor: row => {
      return (
        <HStack w="full" justify="start" py={{base: '5.34px', md: '7.83px'}}>
          <Text
            color="text"
            fontSize={{base: '10px', md: '15.429px'}}
            fontWeight={{base: '400', md: '500'}}
          >
            {formatToCurrency(row?.equity_value)}
          </Text>
        </HStack>
      );
    },
  },
  {
    Header: 'no of fraction',
    accessor: row => {
      return (
        <HStack w="full" justify="center" px="24px" py={{base: '5.34px', md: '7.83px'}}>
          <HStack
            p={{base: '6.013px 12.026px', md: '9px 17.633px'}}
            bg="matador_background.100"
            border={`1px solid`}
            borderColor={`matador_border_color.100`}
          >
            <Text fontSize={{base: '12px', md: '14.5px'}} fontWeight="400" color="matador_text.100">
              {row?.amount}
            </Text>
          </HStack>
        </HStack>
      );
    },
  },

  {
    Header: 'Date',
    accessor: row => {
      return (
        <HStack w="full" justify="end" py={{base: '5.34px', md: '7.83px'}}>
          <Text color="text" fontSize={{base: '10px', md: '13.429px'}} fontWeight="400">
            {changeDateFormat(row?.created_at)}
          </Text>
        </HStack>
      );
    },
  },
];

export default FRACTIONTRANSACTIONHISTORYCOLUMN;
