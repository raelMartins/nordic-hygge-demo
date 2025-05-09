import {
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import backArrow from '@/realtors_portal/images/icons/back-arrow.png';

import AgentsLayoutView from '@/realtors_portal/components/AgentLayout/View';
import {handleLastTwoDigits, removeLasttTwoDigits} from '@/realtors_portal/utils/';
import {
  fetch_user_payment_breakdown_autopay,
  fetch_user_payment_breakdown_past_payments,
  fetch_user_payment_breakdown_upcoming_payments,
} from '@/realtors_portal/api/agents';
import {useQuery} from 'react-query';
import {UserPaymentHeader} from '@/realtors_portal/components/users/user_payment/user-payment-header';
import {UserPaymentListingInfo} from '@/realtors_portal/components/users/user_payment/user-payment-listing-info';
import {UserPaymentPreviousPayment} from '@/realtors_portal/components/users/user_payment/user-payment-previous-payment';
import {UserPaymentIncomingPayment} from '@/realtors_portal/components/users/user_payment/user-payment-incoming-payment';
import {changeDateFormat} from '@/realtors_portal/utils/formatDate';
import {toastForError} from '@/realtors_portal/utils/toastForErrors';
import {OvalLoader} from '@/realtors_portal/components/loaders/AnimatedLoader';
import useGetSession from '@/utils/hooks/getSession';

export const UserPaymentBreakdownAutoPay = ({id: equity_id}) => {
  const router = useRouter();
  const {user, type} = router.query;
  const toast = useToast();
  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;
  // const columns = useMemo(() => BREAKDOWN_AUTOPAY);

  const EQUITY_PAYMENT_DETAILS = useQuery(
    [
      'outstanding-balance-customers-autopay',
      equity_id && parseInt(equity_id),
      user && parseInt(user),
      agentToken,
      storeName,
    ],
    () =>
      fetch_user_payment_breakdown_autopay(
        equity_id && parseInt(equity_id),
        user && parseInt(user),
        agentToken,
        storeName
      )
  );

  const UPCOMING_PAYMENTS = useQuery(
    [
      'outstanding-balance-customers-upcoming-payments',
      equity_id && parseInt(equity_id),
      user && parseInt(user),
      agentToken,
      storeName,
    ],
    () =>
      fetch_user_payment_breakdown_upcoming_payments(
        equity_id && parseInt(equity_id),
        user && parseInt(user),
        agentToken,
        storeName
      )
  );
  const PAST_PAYMENTS = useQuery(
    [
      'outstanding-balance-customers-past-payments',
      equity_id && parseInt(equity_id),
      agentToken,
      storeName,
    ],
    () =>
      fetch_user_payment_breakdown_past_payments(
        equity_id && parseInt(equity_id),
        agentToken,
        storeName
      )
  );

  if (EQUITY_PAYMENT_DETAILS?.isError) {
    // toast({
    //   title: "Oops ...",
    //   description: `${
    //     EQUITY_PAYMENT_DETAILS?.error?.response?.data?.message ??
    //     EQUITY_PAYMENT_DETAILS?.error?.response?.message ??
    //     EQUITY_PAYMENT_DETAILS?.error?.message ??
    //     "Something went wrong,kindly check your network connection"
    //   }`,
    //   status: "error",
    //   duration: 8000,
    //   isClosable: true,
    //   position: "top-right",
    // });

    toastForError(EQUITY_PAYMENT_DETAILS?.error, EQUITY_PAYMENT_DETAILS?.isError, toast);
    return (
      <AgentsLayoutView>
        <Box mt="20px">{/* <BackArrowWithText text="Back" /> */}</Box>
        <Text mt="50px">Oops something went wrong</Text>
      </AgentsLayoutView>
    );
  }

  const handleBack = () => {
    return router.back();
  };
  return (
    <AgentsLayoutView>
      {EQUITY_PAYMENT_DETAILS.isLoading ? (
        <Center h="70vh" w="100%">
          <OvalLoader />
        </Center>
      ) : (
        <>
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
              <UserPaymentHeader autopay owner={EQUITY_PAYMENT_DETAILS?.data?.data?.customer} />

              <UserPaymentListingInfo
                autopay
                for_allocation={EQUITY_PAYMENT_DETAILS?.data?.data}
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
                    <Text as="span" textAlign="center" color="#4545fe">
                      {removeLasttTwoDigits(EQUITY_PAYMENT_DETAILS?.data?.data?.total_unit_price)}
                    </Text>{' '}
                    {handleLastTwoDigits(EQUITY_PAYMENT_DETAILS?.data?.data?.total_unit_price)}
                  </Text>

                  <Text fontSize="14px" fontWeight="400" color="#606060">
                    Purchase Price
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
                      {removeLasttTwoDigits(EQUITY_PAYMENT_DETAILS?.data?.data?.amount_paid)}
                    </Text>{' '}
                    {handleLastTwoDigits(EQUITY_PAYMENT_DETAILS?.data?.data?.amount_paid)}
                  </Text>

                  <Text fontSize="14px" fontWeight="400" color="#606060">
                    Total Amount Paid
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
                    color="#191919"
                  >
                    <Text as="span" textAlign="center" color="#FF6A6A">
                      {removeLasttTwoDigits(
                        EQUITY_PAYMENT_DETAILS?.data?.data?.current_outstanding_balance
                      )}
                    </Text>{' '}
                    {handleLastTwoDigits(
                      EQUITY_PAYMENT_DETAILS?.data?.data?.current_outstanding_balance
                    )}
                  </Text>

                  <Text fontSize="14px" fontWeight="400" color="#606060">
                    Outstanding Balance
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
                    color="#191919"
                  >
                    <Text as="span" textAlign="center" color="#FF6A6A">
                      {removeLasttTwoDigits(EQUITY_PAYMENT_DETAILS?.data?.data?.next_due_balance)}
                    </Text>{' '}
                    {handleLastTwoDigits(EQUITY_PAYMENT_DETAILS?.data?.data?.next_due_balance)}
                  </Text>

                  <Text fontSize="14px" fontWeight="400" color="#606060">
                    Due Balance
                  </Text>
                  <Text fontSize="14px" fontWeight="400" color="#606060">
                    {EQUITY_PAYMENT_DETAILS?.data?.data?.next_due_date
                      ? changeDateFormat(EQUITY_PAYMENT_DETAILS?.data?.data?.next_due_date)
                      : null}
                  </Text>
                </Stack>
              </HStack>
              {PAST_PAYMENTS.isLoading ? (
                <HStack justify="center" align="center" mt="30px" w="full">
                  <Spinner />
                </HStack>
              ) : (
                <UserPaymentPreviousPayment past_payment_info={PAST_PAYMENTS?.data?.data} />
              )}
              {UPCOMING_PAYMENTS.isLoading ? (
                <HStack justify="center" align="center" mt="30px" w="full">
                  <Spinner />
                </HStack>
              ) : type === 'completed' ? null : (
                <UserPaymentIncomingPayment
                  equityInfo={EQUITY_PAYMENT_DETAILS?.data?.data}
                  incoming_payment_info={UPCOMING_PAYMENTS?.data?.data?.message}
                />
              )}
            </VStack>
          </Box>
        </>
      )}
    </AgentsLayoutView>
  );
};

export async function getServerSideProps(context) {
  const {query} = context;
  const id = query.id;

  return {
    props: {
      id,
    },
  };
}

export default UserPaymentBreakdownAutoPay;
