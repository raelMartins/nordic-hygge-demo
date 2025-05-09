import React from 'react';
import {
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Spinner,
  Stack,
  StackDivider,
  Text,
  VStack,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import {BsArrowLeft} from 'react-icons/bs';

const CompletedPaymentPlanIcon = () => {};

import {
  fetchAllPurchaseHistory,
  fetchCustomPlanSummary,
  fetchCustomPlanSummaryForAssets,
} from '../../../../api/payment';
import {useQuery} from 'react-query';
import {toastForError} from '../../../../utils/toastForErrors';
import {formatToCurrency} from '../../../../utils';
import {changeDateFormat} from '../../../../utils/formatDate';
import {fetchEquityPaymentBreakdown, getAllUpcomingPayment} from '@/api/listing';
import TransactionHistory from '../../components/assetsTransactionHistory';
import {ResponsivePopup, ResponsivePopupCloseButton, ResponsivePopupContent} from '@/ui-lib';
import {drawer_styles, drawer_title_styles} from '@/components/navbar/Navbar';
import {useCustomToast} from '@/components/CustomToast';
import ThreeDots from '@/components/loaders/ThreeDots';

const CustomPaymentBreakdownForAssets = ({equityInfo, modalDisclosure}) => {
  const plan_type = equityInfo?.payment_plan?.plan_type;
  const periodic_payment = equityInfo?.payment_plan?.periodic_payment;
  const payment_frequency = equityInfo?.payment_plan?.payment_frequency;
  const payment_period_in_months = equityInfo?.payment_plan?.payment_period_in_months;
  const FEES = equityInfo?.payment_plan?.bundle?.fees;

  const customPlanBreakDown = useQuery(
    ['customPLansummary', equityInfo?.payment_plan?.id],
    () => fetchCustomPlanSummary(equityInfo?.id),
    {isenabled: !!equityInfo?.payment_plan?.id && plan_type === 'custom', retry: 0}
  );

  const TRANSACTIONS_HISTORY = useQuery(['purchase_history', equityInfo?.id], () =>
    fetchAllPurchaseHistory(equityInfo?.id)
  );

  const upcomingPayments = useQuery(
    ['upcoming_payments', equityInfo?.id],
    () => fetchEquityPaymentBreakdown(equityInfo?.id),
    {isenabled: !!equityInfo?.id && plan_type === 'custom', retry: 0}
  );

  const upcomingPaymentsNew = useQuery(
    ['upcoming_payments_new', equityInfo?.id],
    () => getAllUpcomingPayment(equityInfo?.id),
    {isenabled: !!equityInfo?.id && plan_type === 'custom', retry: 0}
  );

  const [isMobile] = useMediaQuery('(max-width: 540px)');

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#ffffff',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const toast = useCustomToast();

  // toastForError(customPlanBreakDown.error, customPlanBreakDown.isError, toast);
  toastForError(upcomingPayments.error, upcomingPayments.isError, toast);

  function getOrdinal(number) {
    if (typeof number !== 'number') {
      return ''; // Return an empty string for invalid inputs
    }

    const suffixes = ['th', 'st', 'nd', 'rd'];
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    // Special cases for 11, 12, and 13, as they don't follow the usual pattern
    if (lastTwoDigits === 11 || lastTwoDigits === 12 || lastTwoDigits === 13) {
      return number + 'th';
    }

    // Use the appropriate suffix based on the last digit
    const suffix = suffixes[lastDigit] || 'th';

    return number + suffix;
  }

  const FEES_ARRAY = equityInfo?.equity_fees || FEES || [];
  // const FEES_ARRAY = FEES;

  const HISTORY = TRANSACTIONS_HISTORY.data?.data.filter(el => !el.is_fees)?.toReversed();
  // const UPCOMING = upcomingPayments.data?.data?.data.filter(el => !el.is_fees);
  const UPCOMING = upcomingPaymentsNew.data?.data?.results?.filter(el => !el.is_fees);

  const still_loading =
    upcomingPaymentsNew?.isLoading ||
    TRANSACTIONS_HISTORY?.isLoading ||
    customPlanBreakDown?.isLoading;

  const base_breakdown = [
    {
      label: `Offer Price`,
      value: formatToCurrency(equityInfo?.offer_price),
    },
    {
      label: `Initial Deposit`,
      value: formatToCurrency(equityInfo?.payment_plan?.initial_deposit_in_value),
    },

    {
      label: payment_frequency
        ? payment_frequency?.charAt(0).toUpperCase() + payment_frequency?.slice(1) + ' Payment'
        : 'Periodic Payment',
      value: payment_frequency !== 'flexible' ? formatToCurrency(periodic_payment) : '-',
      hide: plan_type === 'custom' || (plan_type === 'manual' && payment_frequency !== 'flexible'),
    },
    {
      label: `Total`,
      value: formatToCurrency(equityInfo?.total_unit_price),
    },
  ];

  const custom_breakdown =
    customPlanBreakDown.data?.data?.data?.map((item, idx) => {
      return {
        label: `${getOrdinal(idx + 1)} payment`,
        value: item?.amount ? formatToCurrency(item?.amount) : '-',
      };
    }) || [];

  const upcoming_breakdown = UPCOMING?.map((item, idx) => {
    return {
      label: item?.due_date ? changeDateFormat(item.due_date) : '-',
      value: item?.amount ? formatToCurrency(item?.amount) : '-',
    };
  });

  const fees_breakdown = FEES_ARRAY?.map((item, idx) => {
    return {
      label: item?.name,
      value: item?.amount ? formatToCurrency(item?.amount) : '-',
    };
  });

  const custom_empty_state = {
    textSize: `12px`,
    headerStyle: {textTransform: 'uppercase', fontWeight: 700, fontSize: '14px'},
    height: {base: '100px'},
    minH: {base: '100px'},
    noHeader: true,
    text: `You’ve completed your payment.`,
    textStyle: {fontSize: `12px`, fontWeight: `400`},
  };

  return (
    <ResponsivePopup
      autoFocus={false}
      placement="right"
      scrollBehavior="inside"
      onClose={modalDisclosure.onClose}
      isOpen={modalDisclosure.isOpen}
    >
      <ResponsivePopupContent {...drawer_styles}>
        <ResponsivePopupCloseButton color="text" />

        <Flex {...drawer_title_styles}>
          <Text>Payment Breakdown</Text>
        </Flex>
        <Box p="24px" h={'fit-content'} overflowY={`auto`}>
          <Stack gap={`12px`}>
            <TransactionHistory
              arrayData={
                plan_type === 'custom' && custom_breakdown?.length
                  ? [...base_breakdown, ...custom_breakdown]
                  : base_breakdown
              }
              isLoading={customPlanBreakDown?.isLoading}
              isError={customPlanBreakDown?.isError}
              error={customPlanBreakDown?.error}
              showTitle={false}
              customEmptyState={custom_empty_state}
            />
            <TransactionHistory
              title={`previous payments`}
              arrayData={HISTORY}
              isLoading={TRANSACTIONS_HISTORY?.isLoading}
              isError={TRANSACTIONS_HISTORY?.isError}
              error={TRANSACTIONS_HISTORY?.error}
              customEmptyState={custom_empty_state}
            />
            <TransactionHistory
              arrayData={upcoming_breakdown}
              isLoading={upcomingPayments?.isLoading}
              isError={upcomingPayments?.isError}
              error={upcomingPayments?.error}
              title={`upcoming payments`}
              customEmptyState={custom_empty_state}
            />
            {fees_breakdown?.length > 0 && (
              <TransactionHistory
                arrayData={fees_breakdown}
                title={`closing costs`}
                customEmptyState={custom_empty_state}
              />
            )}
          </Stack>
        </Box>
      </ResponsivePopupContent>
    </ResponsivePopup>
  );
};

export default CustomPaymentBreakdownForAssets;
