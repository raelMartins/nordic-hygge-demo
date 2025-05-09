import React from 'react';
import {BsDashLg} from 'react-icons/bs';
import {Box, Text, Flex, OrderedList, ListItem} from '@chakra-ui/react';

import {monthDayYear} from '@/realtors_portal/utils/formatDate';
import {formatToCurrency} from '@/realtors_portal/utils';

const UpcomingPayment = ({payment, equityInfo}) => {
  return (
    <Box display="flex" flexDirection="column" gap="12px">
      <Text color="#3D3D3D" fontSize="12px" fontWeight="300" wordBreak="break-word">
        Upcoming Payment
      </Text>
      <Box
        borderRadius="12px"
        bg="rgba(69, 69, 254, 0.05)"
        py="10.16px"
        px="8.71px"
        width="fit-content"
        display="flex"
        gap="5.13px"
      >
        <Text
          borderRight="1px solid #7255CB"
          pr="5.13px"
          color="#191919"
          fontSize="8px"
          fontWeight="400"
        >
          Recurring{' '}
          <span style={{fontWeight: '600', color: '#4545FE'}}>
            {equityInfo?.auto_pay ? 'YES' : 'NO'}
          </span>
        </Text>
        <Text color="#191919" fontSize="8px" fontWeight="400">
          Fund Source{' '}
          <span style={{fontWeight: '600', color: '#4545FE', textTransform: 'uppercase'}}>
            {equityInfo?.auto_debit_source ?? <BsDashLg />}
          </span>
        </Text>
      </Box>
      <Box bg="#F5F5F5" p="12px" width="full" borderRadius="12px">
        <OrderedList display="flex" flexDirection="column" gap="16px">
          {payment.map((single, index) => (
            <Flex key={index} width="full" justifyContent="space-between" alignItems="center">
              <ListItem color="#3D3D3D" fontSize="14px" fontWeight="400">
                {single?.due_date ? monthDayYear(single?.due_date) : <BsDashLg />}
              </ListItem>
              <Box display="flex" flexDirection="column" gap="4px">
                <Text color="#191919" fontSize="14px" fontWeight="400">
                  {single?.amount ? formatToCurrency(single?.amount) : <BsDashLg />}
                </Text>
                <Text color="#606060" fontSize="10px" fontWeight="400" textAlign="end">
                  {single?.amount_to_clear ? (
                    formatToCurrency(single?.amount_to_clear)
                  ) : (
                    <BsDashLg />
                  )}
                </Text>
              </Box>
            </Flex>
          ))}
        </OrderedList>
      </Box>
    </Box>
  );
};

export default UpcomingPayment;
