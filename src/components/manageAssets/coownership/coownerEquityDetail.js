import React from 'react';
import {Box, Center, HStack, Image, Skeleton, Stack, Text} from '@chakra-ui/react';
import {formatToCurrency} from 'utils';
import HomeOwnersPacket from 'page.components/property/homeownersPacket.js';
import home from '/src/images/home.png';
import MakeDepositModal from 'page.components/payment/MakeDeposit';
import {changeDateFormat} from 'utils/formatDate';
import {formatPropertySize} from '@/utils/misc';

const CoownerEquityDetail = ({equityInfo, refetch}) => {
  const depositDetailObj = {
    equity_id: equityInfo && equityInfo?.id,
    amount_to_pay: parseInt(0),
    payment_option: 'card',
    payment_data: {payment_type: 'equity'},
    transaction_type: 'installment',
  };

  const customScrollbarStyles = (trackColor = '#fff', thumbColor = '#f5f5f5') => ({
    '&::-webkit-scrollbar': {
      width: '2px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: `inset 0 0 6px ${trackColor}`,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: thumbColor,
    },
  });

  const transactionInfo = [
    {name: 'Unit Size', value: formatPropertySize(equityInfo?.unit?.unit_size)},
    {name: 'Offer Date', value: changeDateFormat(equityInfo?.created_at)},
  ];
  return (
    <Stack
      h="calc(100vh - 200px)"
      position="sticky"
      overflowY="auto"
      overflowX="hidden"
      sx={customScrollbarStyles()}
      w={{base: '100%', lg: '390px'}}
    >
      <Stack spacing="18px" pr="10px">
        <Text w="full" fontSize={'24px'} fontWeight="600" color="#191919">
          {equityInfo?.project?.name || '-'}
        </Text>
        <Skeleton isLoaded={equityInfo?.project?.photo_urls?.[0]}>
          <Image
            alt="asset image"
            w="full"
            h="320px"
            objectFit="cover"
            bg="#e4e4e4"
            alignSelf={'stretch'}
            src={equityInfo?.project?.photo_urls?.[0] ?? home.src}
          />
        </Skeleton>

        <Box
          border="1px solid #191919"
          borderRadius={'5px'}
          bg="matador_text.100"
          w="380px"
          minH="87px"
          h="87px"
        >
          <Center h="full" flexDirection={'column'}>
            <Text fontSize={'14px'} fontWeight="400" color="#FFFFFC">
              {'Offer price'}
            </Text>
            <Text lineHeight="25px" fontSize={'20px'} fontWeight="600" color="#FFFFFF">
              {formatToCurrency(equityInfo?.total_unit_price)}
            </Text>
          </Center>
        </Box>

        <Stack borderBottom="1px solid #DADBDC" spacing="20px" w="full" mt="20px">
          {transactionInfo.map((item, idx) => (
            <HStack pb="12px" w="full" key={idx} justify="space-between">
              <Text fontSize="16px" fontWeight="400" color="#606060">
                {item.name}
              </Text>
              <Text fontSize="16px" fontWeight="400" color="#191919">
                {item.value}
              </Text>
            </HStack>
          ))}{' '}
        </Stack>

        {equityInfo?.payment_complete ? null : (
          <MakeDepositModal
            forCoownerShip={true}
            paymentDetails={depositDetailObj}
            info={equityInfo}
            refetch={refetch}
          />
        )}

        <HomeOwnersPacket equityId={equityInfo?.id} />
      </Stack>
    </Stack>
  );
};

export default CoownerEquityDetail;
