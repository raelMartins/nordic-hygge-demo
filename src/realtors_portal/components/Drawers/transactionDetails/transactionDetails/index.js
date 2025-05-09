import React, {useEffect, useState} from 'react';
import {
  Box,
  Center,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import {fetch_user_payment_breakdown_autopay} from '@/realtors_portal/api/agents';
import UserPaymentIncomingPayment from '@/realtors_portal/components/users/user_payment/user-payment-incoming-payment';
import {fetch_user_payment_breakdown_past_payments} from '@/realtors_portal/api/agents';
import {fetch_user_payment_breakdown_upcoming_payments} from '@/realtors_portal/api/agents';
import UserPaymentPreviousPayment from '@/realtors_portal/components/users/user_payment/user-payment-previous-payment';
import UserPaymentHeader from '@/realtors_portal/components/users/user_payment/user-payment-header';
import UserPaymentNumberPart from '@/realtors_portal/components/users/user_payment/user-payment-number-part';
import {OvalLoader} from '@/realtors_portal/components/loaders/AnimatedLoader';
import useGetSession from '@/utils/hooks/getSession';
import {drawer_style} from '@/realtors_portal/components/AgentLayout/drawers/drawer_style';
import {CiPercent} from 'react-icons/ci';
import {CommissionPaymentDrawer} from '../../CommissionPayment';
import {RButton} from '@/realtors_portal/ui-lib';

const TransactionDetailsDrawer = ({modalDisclosure, equityId, userId}) => {
  const handleClose = () => {
    return modalDisclosure.onClose();
  };
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  const commission_disclosure = useDisclosure();

  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

  const EQUITY_PAYMENT_DETAILS = useQuery(
    [
      'outstanding-balance-customers-autopay',
      equityId,
      userId && parseInt(userId),
      agentToken,
      storeName,
    ],
    () =>
      fetch_user_payment_breakdown_autopay(
        equityId,
        userId && parseInt(userId),
        agentToken,
        storeName
      ),
    {enabled: !!equityId}
  );

  const UPCOMING_PAYMENTS = useQuery(
    [
      'outstanding-balance-customers-upcoming-payments',
      equityId,
      userId && parseInt(userId),
      agentToken,
      storeName,
    ],
    () =>
      fetch_user_payment_breakdown_upcoming_payments(
        equityId,
        userId && parseInt(userId),
        agentToken,
        storeName
      ),
    {enabled: !!equityId}
  );
  const PAST_PAYMENTS = useQuery(
    [
      'outstanding-balance-customers-past-payments',
      equityId && parseInt(equityId),
      agentToken,
      storeName,
    ],
    () =>
      fetch_user_payment_breakdown_past_payments(
        equityId && parseInt(equityId),
        agentToken,
        storeName
      ),
    {enabled: !!equityId}
  );

  return (
    <>
      <Drawer
        isOpen={modalDisclosure.isOpen}
        onClose={handleClose}
        borderRadius="16px"
        placement={'right'}
      >
        <DrawerOverlay bg="rgba(0,0,0,0.07)" />
        <DrawerContent {...drawer_style}>
          <HStack
            boxShadow={{
              base: `none`,
              lg: '4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)',
            }}
            mb="10px"
            py="12px"
            px="29px"
            justify="space-between"
            align="center"
            position="relative"
            width="full"
            fontSize="16px"
            fontWeight={600}
            color="#000000"
          >
            <Flex width="full" justifyContent="space-between" alignItems="center">
              <Text>Transaction Details</Text>
            </Flex>
            <HStack gap="13px">
              {!EQUITY_PAYMENT_DETAILS?.isLoading &&
                EQUITY_PAYMENT_DETAILS?.data?.data?.type?.toLowerCase() !== `fractional` && (
                  <Center
                    boxSize={`36px`}
                    borderRadius={`8px`}
                    border={`1px solid`}
                    borderColor={`#52525B !important`}
                    color={`#52525B`}
                    fontSize={`18px`}
                    cursor={`pointer`}
                    onClick={commission_disclosure?.onOpen}
                    display={{base: `none`, lg: `flex`}}
                  >
                    <CiPercent color={`#52525B`} />
                  </Center>
                )}
              <Center position="relative" boxSize="30px">
                <DrawerCloseButton
                  right="0px"
                  left="0px"
                  my="auto"
                  color="#000"
                  top="0"
                  bottom="0"
                />
              </Center>
            </HStack>
          </HStack>

          <Stack gap="16px" p={{base: `20px 15px`}} overflowY="auto">
            {EQUITY_PAYMENT_DETAILS?.isLoading ? (
              <VStack w="full" justify="center" align="center" h="20vh">
                <OvalLoader />
              </VStack>
            ) : EQUITY_PAYMENT_DETAILS?.isError ? (
              <VStack w="full" justify="center" align="center" h="40vh">
                <Text fontSize="14px" fontWeight="400" textAlign="center" w="300px" color="#000">
                  {`${
                    EQUITY_PAYMENT_DETAILS?.error?.response?.status === 500
                      ? "Apologies for the inconvenience. We're working on it. Please try again later."
                      : EQUITY_PAYMENT_DETAILS?.error?.response?.status === 401
                      ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
                      : EQUITY_PAYMENT_DETAILS?.error?.response?.data?.message ??
                        EQUITY_PAYMENT_DETAILS?.error?.response?.message ??
                        EQUITY_PAYMENT_DETAILS?.error?.message ??
                        'Something went wrong'
                  }`}
                </Text>
              </VStack>
            ) : (
              <>
                <UserPaymentHeader data={EQUITY_PAYMENT_DETAILS?.data?.data} />
                <UserPaymentNumberPart data={EQUITY_PAYMENT_DETAILS?.data?.data} />
                {PAST_PAYMENTS?.data?.data?.length ? (
                  <UserPaymentPreviousPayment
                    equityInfo={EQUITY_PAYMENT_DETAILS?.data?.data}
                    payment={PAST_PAYMENTS?.data?.data}
                  />
                ) : null}

                {UPCOMING_PAYMENTS?.data &&
                EQUITY_PAYMENT_DETAILS?.data?.data?.next_due_balance > 0 ? (
                  <UserPaymentIncomingPayment
                    payment={UPCOMING_PAYMENTS?.data?.data?.message}
                    equityInfo={EQUITY_PAYMENT_DETAILS?.data?.data}
                  />
                ) : null}
              </>
            )}
          </Stack>
          {EQUITY_PAYMENT_DETAILS?.isLoading || EQUITY_PAYMENT_DETAILS?.isError ? null : (
            <DrawerFooter display={{base: `flex`, lg: `none`}} mt={`auto`}>
              <RButton variation={`primary`} w={`100%`} onClick={commission_disclosure?.onOpen}>
                Commissions
              </RButton>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
      <CommissionPaymentDrawer equityId={equityId} disclosure={commission_disclosure} />
    </>
  );
};

export default TransactionDetailsDrawer;
