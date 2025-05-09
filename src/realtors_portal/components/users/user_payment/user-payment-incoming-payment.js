import {Box, Flex, Heading, HStack, ListItem, OrderedList, Stack, Text} from '@chakra-ui/react';
import {BREAKDOWN_AUTOPAY_INCOMING_PAYMENT} from '@/realtors_portal/constants/agent-payment-breakdown';

import React from 'react';
import PaymentBreakdownTable from '../../Table/PaymentBreakdownTable';
import {BsDashLg} from 'react-icons/bs';
import {formatToCurrency} from '@/realtors_portal/utils';
import {monthDayYear} from '@/realtors_portal/utils/formatDate';

export const UserPaymentIncomingPayment = ({payment, equityInfo}) => {
  return (
    <Box display="flex" flexDirection="column" gap="12px">
      <Text color="#3D3D3D" fontSize="12px" fontWeight="300" wordBreak="break-word">
        Upcoming Payment
      </Text>
      {/* <Box
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
      </Box> */}
      <Box
        borderRadius="4px"
        border="1px solid"
        borderColor={`#e4e4e7 !important`}
        bg={`#FAFAFA`}
        p="12px"
      >
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
                {/* <Text color="#606060" fontSize="10px" fontWeight="400" textAlign="end">
                  {single?.amount_to_clear ? (
                    formatToCurrency(single?.amount_to_clear)
                  ) : (
                    <BsDashLg />
                  )}
                </Text> */}
              </Box>
            </Flex>
          ))}
        </OrderedList>
      </Box>
    </Box>
  );
};

export default UserPaymentIncomingPayment;
