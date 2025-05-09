import {
  Box,
  Flex,
  Image as ChakraImage,
  Button,
  HStack,
  Tag,
  TagLabel,
  Text,
  VStack,
  Show,
  Hide,
  Stack,
  useBreakpointValue,
  Center,
} from '@chakra-ui/react';
import Link from 'next/link';
import {changeDateFormat} from '@/realtors_portal/utils/formatDate';
import defaultImage from '@/realtors_portal/images/image-fallback.png';
import {formatToCurrency, priceString} from '@/realtors_portal/utils/formatAmount';
import {ChevronRightIcon} from '@chakra-ui/icons';
import {Fragment} from 'react';
import {truncateLongText} from '@/realtors_portal/utils/truncateLongText';
import Image from 'next/image';

export const FRACTIONAL_TXNS_COLUMNS = data => [
  {
    Header: 'Name',
    accessor: row => {
      return (
        <>
          <HStack textAlign={'left'} align="center" spacing="11px">
            <ChakraImage
              borderRadius="full"
              height="48px"
              alt="avatar"
              width="47.29px"
              src={row?.owner?.avatar ?? avatarFallback.src}
            />
            <Text
              pr="7px"
              fontSize="14px"
              maxW="156px"
              whiteSpace="break-spaces"
              wordWrap={'break-word'}
            >
              {`${row?.owner.first_name} ${row?.owner.last_name}`}
            </Text>
          </HStack>
        </>
      );
    },
  },
  {
    Header: 'No. of Fraction',
    accessor: row => {
      return (
        <Text fontSize={'14px'} textAlign={'left'} pl="7px" wordWrap="break-word">
          {row?.amount}
        </Text>
      );
    },
  },
  {
    Header: 'Purchase price',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text
          textAlign={'left'}
          pl={2}
          fontWeight="600"
          fontSize="14px"
          lineHeight="18px"
          color="#191919"
        >
          {formatToCurrency(row?.purchase_price)}
        </Text>
      );
    },
  },
  {
    Header: 'Fractional value',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text
          textAlign={'left'}
          pl={2}
          fontWeight="600"
          fontSize="14px"
          lineHeight="18px"
          color="#191919"
        >
          {formatToCurrency(row?.equity_value)}
        </Text>
      );
    },
  },
  {
    Header: 'Date',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text textAlign={'left'} fontWeight="400" fontSize="12px" lineHeight="18px" color="#191919">
          {changeDateFormat(row?.created_at)}
        </Text>
      );
    },
  },
];

export const LISTINGS_TRANSACTIONS = [
  {
    Header: 'Subscribers',
    accessor: row => {
      return (
        <>
          {row?.co_owners?.length ? (
            <HStack textAlign={'left'} spacing="11px">
              <Box position="relative">
                <Box
                  px="5px"
                  fontSize={'10px'}
                  borderRadius={'full'}
                  bg="#4545FE"
                  color="#FFFFFF"
                  position={'absolute'}
                  right={'-1.7%'}
                >
                  {'+' + row?.co_owners?.length}
                </Box>
                <ChakraImage
                  borderRadius="full"
                  height="48px"
                  alt="avatar"
                  width="47.29px"
                  src={row?.avatar}
                />
              </Box>
              <Flex pr="7px">
                <Text fontSize="14px" wordWrap={'break-word'}>
                  {row?.name?.split(' ')[0] + ' & '}
                </Text>
                <Text color={'#4545FE'} fontSize="14px">
                  {` ${row?.co_owners?.length} others`}
                </Text>
              </Flex>
            </HStack>
          ) : (
            <TableUserContent name={row?.host_name} avatar={row?.avatar} unit={row?.unit?.title} />
          )}
        </>
      );
    },
  },

  {
    Header: 'Unit',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text textAlign="start" fontWeight="600" fontSize="14px" lineHeight="18px" color="#191919">
          {row?.unit?.title}
        </Text>
      );
    },
  },

  {
    Header: 'Purchase Price',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text textAlign="start" fontWeight="600" fontSize="14px" lineHeight="18px" color="#191919">
          {formatToCurrency(row?.purchase_price)}
        </Text>
      );
    },
  },
  {
    Header: 'Total Paid',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text textAlign="start" fontWeight="600" fontSize="14px" lineHeight="18px" color="#191919">
          {formatToCurrency(row?.total_paid)}
        </Text>
      );
    },
  },
  {
    Header: 'Outstanding balance',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text fontWeight="600" fontSize="14px" textAlign="start" lineHeight="18px" color="#191919">
          {formatToCurrency(row?.outstanding_balance)}
        </Text>
      );
    },
  },
  {
    Header: 'Date',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text textAlign={'left'} fontWeight="400" fontSize="12px" lineHeight="18px" color="#191919">
          {/* {a + year} */}
          {changeDateFormat(row?.created_at)}
        </Text>
      );
    },
  },
  {
    Header: 'Status',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return <StatusTag status={row?.status} />;
    },
  },
];

export const UNIT_TRANSACTIONS = [
  {
    Header: 'Subscriber',
    accessor: row => {
      return (
        <>
          {row?.co_owners?.length ? (
            <HStack textAlign={'left'} spacing="11px">
              <Box position="relative">
                <Box
                  px="5px"
                  fontSize={'10px'}
                  borderRadius={'full'}
                  bg="#4545FE"
                  color="#FFFFFF"
                  position={'absolute'}
                  right={'-1.7%'}
                >
                  {'+' + row?.co_owners?.length}
                </Box>
                <ChakraImage
                  borderRadius="full"
                  height="48px"
                  alt="avatar"
                  width="47.29px"
                  src={row?.avatar}
                />
              </Box>
              <Flex pr="7px">
                <Text fontSize="14px" wordWrap={'break-word'}>
                  {row?.name?.split(' ')[0] + ' & '}
                </Text>
                <Text color={'#4545FE'} fontSize="14px">
                  {` ${row?.co_owners?.length} others`}
                </Text>
              </Flex>
            </HStack>
          ) : (
            <TableUserContent
              name={`${row?.customer?.first_name} ${row?.customer?.last_name}`}
              avatar={row?.customer?.avatar}
              status={row?.status}
            />
          )}
        </>
      );
    },
  },

  {
    Header: 'Purchase Price',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text textAlign="start" fontWeight="600" fontSize="14px" lineHeight="18px" color="#191919">
          {formatToCurrency(row?.purchase_price)}
        </Text>
      );
    },
  },
  {
    Header: 'Total Paid',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text textAlign="start" fontWeight="600" fontSize="14px" lineHeight="18px" color="#191919">
          {formatToCurrency(row?.total_paid)}
        </Text>
      );
    },
  },
  {
    Header: 'Outstanding balance',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text fontWeight="600" fontSize="14px" textAlign="start" lineHeight="18px" color="#191919">
          {formatToCurrency(row?.outstanding_balance)}
        </Text>
      );
    },
  },
  {
    Header: 'Date',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text textAlign={'left'} fontWeight="400" fontSize="12px" lineHeight="18px" color="#191919">
          {/* {a + year} */}
          {changeDateFormat(row?.date)}
        </Text>
      );
    },
  },
  {
    Header: 'Status',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return <StatusTag status={row?.status} />;
    },
  },
];

export const LISTINGSVIEWCOLUMN = data => [
  {
    Header: 'Listings',
    accessor: row => {
      return <TableCellContent row={row} />;
    },
  },
  {
    Header: 'Location',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return (
        <Text
          textAlign={'left'}
          pr={3}
          wordBreak="break-word"
          textOverflow={`ellipsis`}
          maxW={`157px`}
          whiteSpace={`nowrap`}
          overflow={`hidden`}
        >
          {row?.landmark ?? row?.address}
        </Text>
      );
    },
  },
  {
    Header: 'Sold Units',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      const sold = row?.units_sold;
      const noSoldOutUnits = sold == 0;
      const total_available_units = row?.units_available;
      const noAvailableUnits = total_available_units == sold;
      const soldPercentage = row ? (sold / total_available_units) * 100 : 0;
      const totalPercentage = 100 - soldPercentage;

      return (
        <Flex direction="column" gap="11px" align="center">
          <Text
            fontWeight="400"
            fontSize="14px"
            lineHeight="20px"
            color="#191919"
          >{`${sold}/${total_available_units}`}</Text>
          <HStack mx="auto" w="157px" gap={'0.8px'} spacing={0} borderRadius={'30px'}>
            <Box
              w={`${soldPercentage}%`}
              borderRadius={noAvailableUnits ? '30px' : '30px 0 0 30px'}
              h="10px"
              bg={`red`}
            />
            <Box
              w={`${totalPercentage}%`}
              borderRadius={noSoldOutUnits ? '30px' : '0 30px 30px 0'}
              h="10px"
              bg={'teal.400'}
            />
          </HStack>
        </Flex>
      );
    },
  },
  {
    Header: 'Created Date',
    display: {base: 'none', lg: 'table-cell'},
    textAlign: 'center',
    accessor: row => {
      return (
        <Text fontWeight="400" fontSize="14px" lineHeight="20px" color="#191919">
          {row && changeDateFormat(row?.created_at)}
        </Text>
      );
    },
  },
  {
    Header: 'Commission',
    // hideHeader: true,
    accessor: row => {
      return (
        <Text
          textAlign={{lg: 'start'}}
          fontSize={{base: '12px', lg: '16px'}}
          fontWeight={{base: '600', lg: '400'}}
          color={{base: '#191919'}}
        >
          {row?.external_commission_rate}%
        </Text>
      );
    },
  },
  {
    Header: 'Action',
    paddingInlineEnd: 0,
    hideHeader: true,
    accessor: row => {
      return <TableLink row={row} />;
    },
  },
];
export default LISTINGSVIEWCOLUMN;

const TableLink = ({row}) => {
  return (
    <Fragment>
      <Show breakpoint="(min-width: 768px)">
        <Link prefetch={false} href={`/agents/listings/manage/${row?.id}`}>
          <Button
            borderRadius="12px"
            w="115px"
            h="40px"
            color={'#4545FE'}
            borderColor={'#4545FE'}
            variant="outline"
            fontWeight={400}
          >
            View
          </Button>
        </Link>
      </Show>
      <Hide breakpoint="(min-width: 768px)">
        <Flex justifyContent={`flex-end`}>
          <Link display={'contents'} prefetch={false} href={`/agents/listings/manage/${row?.id}`}>
            <ChevronRightIcon fontSize={20} color={'#4545FE'} marginLeft={-10} />
          </Link>
        </Flex>
      </Hide>
    </Fragment>
  );
};

const TableCellContent = ({row, cell}) => {
  const listingName = useBreakpointValue({
    base: truncateLongText(row?.name, 14).truncatedText,
    lg: truncateLongText(row?.name, 20).truncatedText,
  });
  return (
    <HStack mx="auto" spacing="21px" flex="1">
      <Stack gap={0} w={'max-content'}>
        <Center
          position={'relative'}
          height={{base: '40px', lg: '48px'}}
          width={{base: '40px', lg: '48px'}}
          minW={{base: '40px', lg: '48px'}}
          borderRadius="12px"
          overflow={'hidden'}
        >
          <Image
            alt=""
            src={row?.photos[0]?.photo ?? defaultImage?.src}
            style={{objectFit: 'cover'}}
            fill
          />
        </Center>
      </Stack>
      <VStack align={'flex-start'} spacing={1} width={{base: '50%', lg: 'unset'}}>
        <Text
          fontWeight={{base: 500, lg: 400}}
          fontSize={{base: '14px', lg: 'md'}}
          textTransform={'capitalize'}
          color={'#191919'}
          textAlign={'left'}
          w={`max-content`}
        >
          {listingName}
          {/* {row?.name} */}
        </Text>
        <Text
          color={'#475467'}
          textAlign={'left'}
          fontSize={{base: '14px', lg: 'md'}}
          display={{base: 'flex', lg: 'none'}}
          w={`max-content`}
        >
          {truncateLongText(row?.landmark ?? row?.address, 14).truncatedText}
          {/* {row?.address} */}
        </Text>
      </VStack>
    </HStack>
  );
};

const TableUserContent = ({name, avatar, status, unit}) => {
  const userName = useBreakpointValue({
    base: truncateLongText(name || ``, 10).truncatedText,
    md: name,
  });
  return (
    <HStack gap={{base: `12px`, lg: '21px'}}>
      <Center
        boxSize={{base: '40px', lg: '48px'}}
        minW={{base: '40px', lg: '48px'}}
        position={`relative`}
        borderRadius={`50%`}
        overflow={`hidden`}
      >
        <Image alt="" fill style={{objectFit: `cover`}} src={avatar} />
      </Center>
      <Stack>
        <Text
          fontWeight={{base: 500, lg: 400}}
          fontSize={{base: '14px', lg: '16px'}}
          textTransform={'capitalize'}
          color={'#191919'}
          textAlign={'left'}
          noOfLines={`1`}
        >
          {name}
        </Text>
        {status && (
          <Box display={{base: `block`, lg: `none`}}>
            <StatusTag status={status} />
          </Box>
        )}
        {unit && (
          <Text
            display={{base: `block`, lg: `none`}}
            textAlign="start"
            fontWeight="400"
            fontSize="14px"
            lineHeight="150%"
            color="#52525B"
          >
            {unit}
          </Text>
        )}
      </Stack>
    </HStack>
  );
};

const StatusTag = ({status}) => {
  let statusValue = status?.toLowerCase();
  let color =
    statusValue == 'completed'
      ? '#381E87'
      : statusValue == 'defaulting'
      ? '#FF9103'
      : statusValue == 'suspended'
      ? '#FF3636'
      : statusValue == 'not defaulting'
      ? '#08C48F'
      : statusValue == 'transfered'
      ? '#606060'
      : 'lightgray';
  let bg =
    statusValue == 'completed'
      ? 'rgba(103, 169, 210, 0.2)'
      : statusValue == 'defaulting'
      ? 'rgba(255, 145, 3, 0.1)'
      : statusValue == 'suspended'
      ? 'rgba(255, 54, 54, 0.1)'
      : statusValue == 'not defaulting'
      ? '#DBFFF5'
      : statusValue == 'transfered'
      ? '#F5F5F5'
      : 'lightgray';
  return (
    <HStack alignItems="flex-start">
      <Tag
        p={'4px 12px'}
        w="fit-content"
        color={`#3F3F46`}
        bg={`#F4F4F5`}
        borderRadius="full"
        fontSize={`14px`}
      >
        <TagLabel mx="auto">{status}</TagLabel>
      </Tag>
    </HStack>
  );
};
