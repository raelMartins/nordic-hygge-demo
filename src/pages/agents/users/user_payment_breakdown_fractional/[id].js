import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';

import {useRouter} from 'next/router';
import backArrow from '/src/realtors_portal/images/icons/back-arrow.png';
import AgentsLayoutView from '/src/realtors_portal/components/AgentLayout/View';

import React from 'react';
import {
  fetch_user_payment_breakdown_fractional,
  fetch_user_payment_breakdown_fractional_payments,
} from '/src/realtors_portal/api/agents';
import {useQuery} from 'react-query';
import {UserPaymentHeader} from '/src/realtors_portal/components/users/user_payment/user-payment-header';
import {UserPaymentListingInfo} from '/src/realtors_portal/components/users/user_payment/user-payment-listing-info';
import {UserPaymentPaymentsFractional} from '/src/realtors_portal/components/users/user_payment/user-payment-payments-fractional';
import {handleLastTwoDigits, removeLasttTwoDigits} from '/src/realtors_portal/utils/';
import {OvalLoader} from '/src/realtors_portal/components/loaders/AnimatedLoader';

export const FractionalBreakdown = () => {
  const router = useRouter();
  const {id: equity_id, user_id} = router.query;
  const toast = useToast();

  const handleBack = () => {
    return router.back();
  };

  const EQUITY_PAYMENT_DETAILS = useQuery(
    [
      'user_payment_breakdown_fractional',
      equity_id && parseInt(equity_id),
      user_id && parseInt(user_id),
    ],
    () =>
      fetch_user_payment_breakdown_fractional(
        equity_id && parseInt(equity_id),
        user_id && parseInt(user_id)
      )
  );

  const PAYMENT_DETAILS = useQuery(
    ['user_payment_breakdown_fractional', user_id && parseInt(user_id)],
    () => fetch_user_payment_breakdown_fractional_payments(user_id && parseInt(user_id))
  );

  if (EQUITY_PAYMENT_DETAILS?.isError) {
    toast({
      title: 'Oops ...',
      description: `${
        EQUITY_PAYMENT_DETAILS?.error?.response?.data?.message ??
        EQUITY_PAYMENT_DETAILS?.error?.response?.message ??
        EQUITY_PAYMENT_DETAILS?.error?.message ??
        'Something went wrong,we are working on resolving it'
      }`,
      status: 'error',
      duration: 8000,
      isClosable: true,
      position: 'top-right',
    });
    return (
      <AgentsLayoutView activePage={'Listings'}>
        <Box mt="20px">{/* <BackArrowWithText text="Back" /> */}</Box>
        <Text mt="50px">Oops something went wrong</Text>
      </AgentsLayoutView>
    );
  }

  return (
    <AgentsLayoutView activePage={'Users'}>
      {EQUITY_PAYMENT_DETAILS.isLoading ? (
        <Center h="70vh" w="100%">
          <OvalLoader />
        </Center>
      ) : (
        <Box h="full" w="full">
          <HStack mb="10px" zIndex={10}>
            <Image
              onClick={handleBack}
              style={{cursor: 'pointer'}}
              mr={2}
              boxSize="50px"
              src={backArrow.src}
              alt="back_arrow"
            />
            <Heading fontSize="20px" fontWeight="600">
              Back
            </Heading>
          </HStack>
          <VStack
            mt="10px"
            bg="#ffffff"
            spacing="none"
            borderTopLeftRadius="16px"
            borderTopRightRadius="16px"
            pb="20px"
            px="42px"
            w="full"
          >
            <UserPaymentHeader owner={EQUITY_PAYMENT_DETAILS?.data?.data?.owner} />

            <UserPaymentListingInfo
              listings_info={EQUITY_PAYMENT_DETAILS?.data?.data?.project}
              unit_info={EQUITY_PAYMENT_DETAILS?.data?.data?.unit}
            />

            <HStack w="full" mt="35px" justify="space-between">
              <Stack
                border="1px solid #E4E4E4"
                borderRadius="12px"
                justify="center"
                align="center"
                w="full"
                h="111px"
              >
                <Text
                  fontSize="24px"
                  fontWeight="600"
                  // minW="1px"
                  w="full"
                  color="#191919"
                >
                  <Text as="span" textAlign="center" color="#4545FE">
                    {removeLasttTwoDigits('32000000')}
                  </Text>{' '}
                  {handleLastTwoDigits('32000000')}
                </Text>

                <Text fontSize="14px" fontWeight="400" color="#606060">
                  Total Value of Fractions
                </Text>
              </Stack>
              <Stack
                border="1px solid #E4E4E4"
                borderRadius="12px"
                justify="center"
                align="center"
                w="full"
                h="111px"
              >
                <Text
                  fontSize="24px"
                  fontWeight="600"
                  // minW="1px"
                  w="full"
                  color="#191919"
                >
                  <Text as="span" textAlign="center" color="#12D8A0">
                    {removeLasttTwoDigits('32000000')}
                  </Text>{' '}
                  {handleLastTwoDigits('32000000')}
                </Text>

                <Text fontSize="14px" fontWeight="400" color="#606060">
                  Purchase Price
                </Text>
              </Stack>{' '}
              <Stack
                border="1px solid #E4E4E4"
                borderRadius="12px"
                justify="center"
                align="center"
                w="full"
                h="111px"
              >
                <Text
                  fontSize="24px"
                  fontWeight="600"
                  // minW="1px"
                  w="full"
                  color="#12D8A0"
                >
                  20
                </Text>

                <Text fontSize="14px" fontWeight="400" color="#606060">
                  Total Fractions
                </Text>
              </Stack>{' '}
            </HStack>
            <UserPaymentPaymentsFractional />
          </VStack>
        </Box>
      )}
    </AgentsLayoutView>
  );
};

export default FractionalBreakdown;
