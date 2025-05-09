import {monthDayYear} from '@/realtors_portal/utils/formatDate';
import {HStack, Link, Stack, Text, useDisclosure} from '@chakra-ui/react';
import {IoChevronForward} from 'react-icons/io5';
import {ViewReceiptPopup} from './ViewReceiptPopup';
import {formatToCurrency} from '@/realtors_portal/utils';

export const Commission = ({data}) => {
  const disclosure = useDisclosure();
  return (
    <>
      <HStack
        borderRadius="4px"
        border="1px solid"
        borderColor={`#e4e4e7 !important`}
        bg={`#FAFAFA`}
        p="16px 12px"
        justify={`space-between`}
      >
        <Text color={`#000)`} fontSize={`14px`} fontWeight={`500`} lineHeight={`normal`}>
          {formatToCurrency(data?.amount_paid || data?.amount || data?.value || 0)}
        </Text>
        <Stack gap={`4px`} align={`flex-end`} textAlign={`right`}>
          {data?.payment_receipt && (
            <HStack
              minW={`max-content`}
              gap={`4px`}
              cursor={`pointer`}
              onClick={disclosure?.onOpen}
            >
              <Text
                color="#4545FE"
                fontSize={`13px`}
                fontWeight={`500`}
                lineHeight={`150%`}
                letterSpacing={`0.26px`}
              >
                View
              </Text>
              <IoChevronForward fontSize={`16px`} />
            </HStack>
          )}
          <Text
            color={`#52525B`}
            fontSize={`10px`}
            fontWeight={`400`}
            lineHeight={`150%`}
            letterSpacing={`0.3px`}
          >
            {monthDayYear(data?.date_sold || data?.created_at || Date.now())}
          </Text>
        </Stack>
      </HStack>
      <ViewReceiptPopup data={data} disclosure={disclosure} />
    </>
  );
};
