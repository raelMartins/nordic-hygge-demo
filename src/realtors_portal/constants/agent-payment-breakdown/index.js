import {Text} from '@chakra-ui/react';
import {priceString} from '/src/realtors_portal/utils/formatAmount';
import {handleLastTwoDigits, removeLasttTwoDigits} from '/src/realtors_portal/utils';
import {changeDateFormat} from '/src/realtors_portal/utils/formatDate';

export const BREAKDOWN_AUTOPAY_INCOMING_PAYMENT = [
  {
    Header: 'index',
    hideHeader: true,
    accessor: (row, idx) => {
      return (
        <Text
          textAlign="start"
          whiteSpace="break-spaces"
          fontSize="24px"
          w="80px"
          color="#191919"
          fontWeight="600"
        >
          {idx + 1}.
        </Text>
      );
    },
  },

  {
    Header: 'Next Due Payment',
    accessor: row => {
      return (
        <Text
          textAlign="start"
          whiteSpace="break-spaces"
          fontSize="24px"
          color="#191919"
          fontWeight="600"
        >
          <Text as="span" textAlign="center" color="#191919">
            {removeLasttTwoDigits(row?.amount ?? 10000)}
          </Text>{' '}
          {handleLastTwoDigits(row?.amount ?? 10000)}
        </Text>
      );
    },
  },
  {
    Header: 'Next Due Date',
    accessor: row => {
      return (
        <Text
          textAlign="start"
          whiteSpace="break-spaces"
          fontSize="24px"
          color="#191919"
          fontWeight="600"
        >
          {row && changeDateFormat(row?.due_date ?? '11/04/2012')}
          {/* 5th August 9:00am */}
        </Text>
      );
    },
  },

  {
    Header: 'Remaining Balance',
    accessor: row => {
      return (
        <Text
          textAlign="start"
          whiteSpace="break-spaces"
          fontSize="24px"
          color="#191919"
          fontWeight="600"
        >
          <Text as="span" textAlign="center" color="#191919">
            {removeLasttTwoDigits(row?.amount_to_clear ?? 10000)}
          </Text>{' '}
          {handleLastTwoDigits(row?.amount_to_clear ?? 10000)}
        </Text>
      );
    },
  },
];

export const BREAKDOWN_AUTOPAY_PREVIOUS_PAYMENT = [
  {
    Header: 'index',
    hideHeader: true,
    accessor: (row, idx) => {
      return (
        <Text
          textAlign="start"
          whiteSpace="break-spaces"
          fontSize="24px"
          w="80px"
          color="#191919"
          fontWeight="600"
        >
          {idx + 1}.
        </Text>
      );
    },
  },

  {
    Header: 'Payment amount',
    accessor: row => {
      return (
        <Text
          textAlign="start"
          whiteSpace="break-spaces"
          fontSize="24px"
          color="#191919"
          fontWeight="600"
        >
          <Text as="span" textAlign="center" color="#191919">
            {removeLasttTwoDigits(row?.amount ?? 10000)}
          </Text>{' '}
          {handleLastTwoDigits(row?.amount ?? 10000)}
        </Text>
      );
    },
  },
  {
    Header: 'Payment type',
    accessor: row => {
      const text =
        row?.transaction_action_type == 'equity_outright'
          ? 'Outright'
          : row?.transaction_action_type == 'equity_plan_initial'
          ? 'Initial deposit'
          : row?.transaction_action_type == 'equity_plan_deposit'
          ? 'Top up'
          : row?.transaction_action_type == 'equity_fractions'
          ? 'Fractional'
          : null;
      return (
        <Text
          textAlign="start"
          whiteSpace="break-spaces"
          fontSize="24px"
          color="#191919"
          fontWeight="600"
        >
          {text}
        </Text>
      );
    },
  },

  {
    Header: 'Payment date',
    accessor: row => {
      return (
        <Text
          textAlign="start"
          whiteSpace="break-spaces"
          fontSize="24px"
          color="#191919"
          fontWeight="600"
        >
          {changeDateFormat(row?.created_at ?? '10/02/2000')}
        </Text>
      );
    },
  },
];
