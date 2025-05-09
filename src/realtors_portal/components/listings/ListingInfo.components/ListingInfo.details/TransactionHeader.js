import {Flex, Text, Grid, Stack, Box, HStack} from '@chakra-ui/react';
import {handleLastTwoDigits, removeLasttTwoDigits} from '@/realtors_portal/utils/';
export const TransactionHeader = ({customersMetaData, value, setValue}) => {
  const filters = [
    {
      label: `Total referrals`,
      value: customersMetaData?.total_customers || 0,
    },
    {
      label: `With outstanding balance`,
      value: customersMetaData?.customer_with_outstanding || 0,
    },
    {
      label: `Completed Payment`,
      value: customersMetaData?.customer_without_outstanding || 0,
    },
    {
      label: `Defaulting subscribers`,
      value: customersMetaData?.defaulting_customers || 0,
    },
  ];
  return (
    <Flex flexDirection={{base: 'column', lg: 'row'}} gap={`13px`}>
      <Box
        w={'100%'}
        maxW={'100%'}
        overflowX={'auto'}
        css={{
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        p={{base: `0px `, lg: '48px 24px'}}
        bg={{base: `transparent`, lg: '#fff'}}
        border={{base: `none`, lg: `1px solid`}}
        borderColor={`#e4e4e7 !important`}
        borderRadius={{base: `4px`, lg: '12px'}}
      >
        <HStack
          gap={{base: `12px`, lg: '20px'}}
          flex={`1`}
          color={`#52525B`}
          fontSize={{base: `13px`, lg: `16px`}}
          fontWeight={`500`}
          lineHeight={`150%`}
          letterSpacing={`0.26px`}
        >
          <Stack
            p={{base: `16px 12px`}}
            borderRadius={`6px`}
            borderColor={`#E4E4E7 !important`}
            bg={{base: `#fff`, lg: `transparent`}}
            border={{base: `1px solid`, lg: `none`}}
            gap={{base: `4px`, lg: `12px`}}
            minW={`246px`}
          >
            <Text>Total Purchase Price</Text>
            <Text color={'#4545FE'} fontWeight="600" fontSize={{base: `23px`, lg: `28px`}}>
              {` ${
                customersMetaData?.total_purchases
                  ? removeLasttTwoDigits(customersMetaData?.total_purchases)
                  : '0.0'
              }`}
              {customersMetaData?.total_purchases &&
                handleLastTwoDigits(customersMetaData?.total_purchases)}
            </Text>
          </Stack>
          <Stack
            p={{base: `16px 12px`}}
            borderRadius={`6px`}
            borderColor={`#E4E4E7 !important`}
            bg={{base: `#fff`, lg: `transparent`}}
            border={{base: `1px solid`, lg: `none`}}
            gap={{base: `4px`, lg: `12px`}}
            minW={`246px`}
          >
            <Text>Total Paid</Text>
            <Text color={'#12D8A0'} fontWeight="600" fontSize={{base: `23px`, lg: `28px`}}>
              {` ${
                customersMetaData?.total_paid
                  ? removeLasttTwoDigits(customersMetaData?.total_paid)
                  : '0.0'
              }`}
              {customersMetaData?.total_paid && handleLastTwoDigits(customersMetaData?.total_paid)}
            </Text>
          </Stack>
          <Stack
            p={{base: `16px 12px`}}
            borderRadius={`6px`}
            borderColor={`#E4E4E7 !important`}
            bg={{base: `#fff`, lg: `transparent`}}
            border={{base: `1px solid`, lg: `none`}}
            gap={{base: `4px`, lg: `12px`}}
            minW={`246px`}
          >
            <Text>Total Outstanding Balance</Text>
            <Text color={'#FF6A6A'} fontWeight="600" fontSize={{base: `23px`, lg: `28px`}}>
              {` ${
                customersMetaData?.total_outstanding
                  ? removeLasttTwoDigits(customersMetaData?.total_outstanding)
                  : '0.0'
              }`}
              {customersMetaData?.total_outstanding &&
                handleLastTwoDigits(customersMetaData?.total_outstanding)}
            </Text>
          </Stack>
        </HStack>
      </Box>
      <Box
        overflowX={'auto'}
        css={{
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        bg={{base: `transparent`, lg: '#fff'}}
        border={{base: `none`, lg: `1px solid`}}
        borderColor={`#e4e4e7 !important`}
        borderRadius={{base: `6px`, lg: `12px`}}
        p={{base: `0px`, lg: ` 12px 37px`}}
        w={{lg: `650px`}}
      >
        <Grid
          templateColumns={{base: `1fr 1fr 1fr 1fr`, md: `1fr 1fr`}}
          gap={{base: `13px`, lg: `14px 52px`}}
        >
          {filters?.map((el, i) => (
            <Stack
              key={i}
              onClick={() => setValue(i + 1)}
              gap={`0px`}
              cursor={`pointer`}
              p={{base: `16px 12px`, lg: `12px 0px`}}
              borderRadius={`6px`}
              borderColor={`#E4E4E7 !important`}
              bg={{base: `#fff`, lg: `transparent`}}
              border={{base: `1px solid`, lg: `none`}}
              minW={{base: `246px`, lg: `max-content`}}
            >
              <Text
                color={{base: ` #52525B`}}
                fontSize={{base: `13px`, lg: `14px`}}
                fontWeight={{base: `500`}}
                lineHeight={{base: `150%`}}
                letter-spacing={{base: `0.26px`}}
              >
                {el.label}
              </Text>
              <Text
                color={{base: ` #141414`}}
                fontSize={{base: `23px`, lg: `24px`}}
                fontWeight={{base: `600`}}
                lineHeight={{base: `130%`}}
              >
                {el.value}
              </Text>
            </Stack>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default TransactionHeader;
