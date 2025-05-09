import {HStack, Image, Tag, TagLabel, Text, VStack, Button} from '@chakra-ui/react';
import {changeDateFormat} from '/src/realtors_portal/utils/formatDate';
import HoverForRejectReason from '/src/realtors_portal/components/request/HoverForRejectReason';
import HoverText from '/src/realtors_portal/components/account/HoverText';
// import { Button } from "/src/ui-lib";

export const COMMISSION_REQUEST_COLUMN = [
  {
    Header: 'Client',
    accessor: row => {
      return (
        <HStack mr="48px" spacing="10px">
          <Image alt="" borderRadius="full" boxSize="47.29px" src={row?.customer?.avatar} />
          <Text
            as="span"
            wordBreak="break-all"
            color="#191919"
            w="150px"
            textTransform="capitalize"
            fontSize="16px"
            fontWeight="400"
          >
            {`${row?.customer?.first_name} ${row?.customer?.last_name} `}
          </Text>
        </HStack>
      );
    },
  },
  {
    Header: 'Date Requested',
    accessor: row => (
      <HStack spacing="none" justify="start">
        <Text as="span" textAlign="start" color="#191919" fontSize="16px" w="full" fontWeight="400">
          {changeDateFormat(row.created_at, 'add_time').split('|')[0]}
          {' | '}
          <Text
            as="span"
            textAlign="start"
            color="#606060"
            fontSize="16px"
            w="full"
            fontWeight="400"
          >
            {changeDateFormat(row.created_at, 'add_time').split('|')[1]}
          </Text>
        </Text>
      </HStack>
    ),
  },

  {
    Header: 'Property',
    accessor: row => {
      const split = row.property_info?.split(',');
      return (
        // <VStack align="start">

        //   <Text
        //     textAlign="start"
        //     fontSize="16px"
        //     w="200px"
        //     whiteSpace="break-spaces"
        //     fontWeight="500"
        //   >
        //     {row?.property_info}
        //   </Text>
        // </VStack>
        <HoverText text={`${row?.property_info}`} />
      );
    },
  },
  {
    Header: 'Date sold',
    accessor: row => (
      <HStack spacing="none" justify="start">
        <Text as="span" textAlign="start" color="#191919" fontSize="16px" w="full" fontWeight="400">
          {changeDateFormat(row.date_sold)}
        </Text>
      </HStack>
    ),
  },

  {
    Header: 'Status',
    // hideHeader: true,
    accessor: row => {
      let status = row?.status?.toLowerCase();

      const colorScheme = {
        pending: {
          color: '#0C344D',
          bg: '#0C344D1A',
        },
        paid: {
          color: '#08C38F',
          bg: '#DBFFF5',
        },
        rejected: {
          color: '#FF3636',
          bg: '#FF36361A',
        },
      };
      return row?.status?.toLowerCase() !== 'rejected' ? (
        <Button
          mt="0"
          type="button"
          px="13px"
          py="8px"
          //   notes
          bg={colorScheme[status].bg}
          color={colorScheme[status].color}
          textTransform="capitalize"
          fontSize="16px"
          fontWeight="500"
          borderRadius="48px"
        >
          {' '}
          {status}
        </Button>
      ) : (
        <HoverForRejectReason
          status={status}
          colorScheme={colorScheme}
          reason={row.response_note}
        />
      );
    },
  },
];
