import {useFetchListingBundles} from '@/realtors_portal/ui-lib';
import {handleLastTwoDigits, removeLasttTwoDigits} from '@/realtors_portal/utils';
import {Box, HStack, Stack, Text} from '@chakra-ui/react';
import PaymentPlan from '../unit_info/PaymentPlan';
import {fetchAllBundlePaymentPlanForAgents} from '@/realtors_portal/api/agents';
import {useQuery} from 'react-query';

export const PaymentPlanAndClosingCosts = ({listingDetail, unit_id}) => {
  const {listingBundles} = useFetchListingBundles(listingDetail?.id);
  const unit = listingBundles?.[0];

  const UNIT_ID = unit_id || unit?.id;

  const {data, isError, isLoading, error} = useQuery(['Unit_Plan_and_Cost_Data', UNIT_ID], () =>
    fetchAllBundlePaymentPlanForAgents(UNIT_ID)
  );
  const PAYMENT_PLAN_DATA = data && data?.data?.results;
  const UNIT_INFO = data && data?.data?.results[0].bundle;

  const hasContract = PAYMENT_PLAN_DATA?.some(item => item.hasOwnProperty('contract'));

  return (
    <>
      {hasContract ? (
        <PaymentPlan PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA} unitDetail={UNIT_INFO} />
      ) : null}
      {UNIT_INFO?.fees?.length > 0 && (
        <Stack gap={{base: `8px`, lg: `25px`}}>
          <Text
            fontSize={{base: '19px', lg: '33px'}}
            fontWeight={{base: `600`, lg: '500'}}
            color={{base: `#191919`, lg: '#27272A'}}
            lineHeight={{base: `140%`, lg: '130%'}}
            letterSpacing={{base: `.16px`}}
          >
            Closing Cost
          </Text>
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
          >
            <HStack gap={{base: `13px`, lg: `38px`}}>
              {UNIT_INFO?.fees?.map((data, idx) => (
                <Stack
                  key={idx}
                  w={{base: `246px`, lg: '411px'}}
                  minW={{base: `246px`, lg: '411px'}}
                  background="#fff"
                  borderRadius={{base: `6px`, lg: '12px'}}
                  border="1px solid"
                  borderColor={`#E4E4E7`}
                  textAlign="start"
                  padding={{base: `16px 12px`, lg: '24px'}}
                  gap={{base: `4px`, lg: `16px`}}
                >
                  <Text
                    fontWeight="400"
                    fontSize={{base: `13px`, lg: '14px'}}
                    color={{base: '#475467', lg: `#52525B`}}
                    lineHeight={`150%`}
                    textTransform={`capitalize`}
                  >
                    {data?.name}
                  </Text>
                  <Text fontWeight="600" fontSize={{base: `19px`, lg: '24px'}} color="black">
                    {removeLasttTwoDigits(Number(parseInt(data?.amount)))}
                    {handleLastTwoDigits(Number(parseInt(data?.amount)))}
                  </Text>
                </Stack>
              ))}
            </HStack>
          </Box>
        </Stack>
      )}
    </>
  );
};
