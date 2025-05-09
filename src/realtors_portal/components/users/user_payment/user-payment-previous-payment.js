import {Box, Flex, ListItem, OrderedList, Text} from '@chakra-ui/react';
import React from 'react';
import {formatToCurrency} from '@/realtors_portal/utils';
import {monthDayYear} from '@/realtors_portal/utils/formatDate';
import {BsDashLg} from 'react-icons/bs';

export const UserPaymentPreviousPayment = ({payment, equityInfo}) => {
  return (
    <Box display="flex" flexDirection="column" gap="12px">
      <Text color="#3D3D3D" fontSize="12px" fontWeight="300" wordBreak="break-word">
        {equityInfo?.type?.toLowerCase() === `fractional` ? `` : `Previous`} Payments
      </Text>
      <Box
        borderRadius="4px"
        border="1px solid"
        borderColor={`#e4e4e7 !important`}
        bg={`#FAFAFA`}
        p="12px"
      >
        <OrderedList display="flex" flexDirection="column" gap="16px">
          {payment?.map((single, index) => (
            <Flex key={index} width="full" justifyContent="space-between">
              <ListItem color="#3D3D3D" fontSize="14px" fontWeight="400">
                {single?.created_at ? monthDayYear(single?.created_at) : <BsDashLg />}
              </ListItem>
              <Box display="flex" flexDirection="column" gap="4px">
                <Text color="#191919" fontSize="14px" fontWeight="600">
                  {single?.amount ? formatToCurrency(single?.amount) : <BsDashLg />}
                </Text>
              </Box>
            </Flex>
          ))}
        </OrderedList>
      </Box>
    </Box>
  );
};

export default UserPaymentPreviousPayment;
