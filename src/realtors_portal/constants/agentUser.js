import {
  HStack,
  Text,
  Tag,
  TagLabel,
  Show,
  Hide,
  VStack,
  Box,
  useBreakpointValue,
  Center,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';
import {changeDateFormat} from '/src/realtors_portal/utils/formatDate';
import {Fragment} from 'react';
import {ChevronRightIcon} from '@chakra-ui/icons';
import {truncateLongText} from '/src/realtors_portal/utils/truncateLongText';
import {RButton} from '../ui-lib';
import Image from 'next/image';
import {BsChevronRight} from 'react-icons/bs';

export const AGENT_USERS_COLUMN = [
  {
    Header: 'Referral',
    accessor: row => {
      return <TableCellContent row={row} />;
    },
  },

  {
    Header: 'Email',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => {
      return <TableEmailDisplay row={row} />;
    },
  },
  {
    Header: 'Phone',
    display: {base: 'none', lg: 'table-cell'},
    accessor: row => (
      <HStack justify="start" w="full">
        <Text
          as="span"
          wordBreak="break-all"
          textAlign="start"
          color="#191919"
          fontSize="16px"
          fontWeight="400"
          textTransform="capitalize"
        >
          {row?.phone}
        </Text>
      </HStack>
    ),
  },
  // {
  //   Header: 'Joined Date',
  //   display: {base: 'none', lg: 'table-cell'},
  //   accessor: row => (
  //     <HStack justify="start" w="full">
  //       <Text
  //         w="full"
  //         as="span"
  //         wordBreak="break-all"
  //         textAlign="start"
  //         color="#191919"
  //         fontSize="16px"
  //         fontWeight="400"
  //         textTransform="capitalize"
  //       >
  //         {changeDateFormat(row?.date_joined)}
  //       </Text>
  //     </HStack>
  //   ),
  // },
  // {
  //   Header: 'Status',
  //   accessor: row => {
  //     const bgScheme = row?.status ? '#DBFFF5' : '#F5F5F5';
  //     const colorScheme = row?.status ? '#08C38F' : '#606060';

  //     return (
  //       <Tag
  //         px="13px"
  //         py="8px"
  //         size="lg"
  //         color={colorScheme}
  //         bg={bgScheme}
  //         borderRadius="48px"
  //         fontSize="16px"
  //         fontWeight="500"
  //       >
  //         <TagLabel mx="auto">{row?.status ? 'Active' : 'Inactive'}</TagLabel>
  //       </Tag>
  //     );
  //   },
  // },
  {
    Header: 'Action',
    hideHeader: true,
    accessor: row => <TableLink row={row} />,
  },
];

const TableLink = ({row}) => {
  return (
    <Fragment>
      <Show above="lg">
        <RButton
          as={Link}
          href={`/agents/users/customer_profile/${row?.id}`}
          variation={`tertiary`}
          fontWeight={400}
          p={`12px 40px`}
          color={`#4545FE`}
        >
          View
        </RButton>
      </Show>
      <Hide above="lg">
        <Center
          fontSize={`18px`}
          as={Link}
          href={`/agents/users/customer_profile/${row?.id}`}
          minW={`25px`}
        >
          <BsChevronRight />
        </Center>
      </Hide>
    </Fragment>
  );
};

const TableCellContent = ({row}) => {
  const userName = useBreakpointValue({
    base: truncateLongText(row?.name, 10).truncatedText,
    md: row?.name,
  });
  return (
    <HStack mx="auto" gap={{base: `12px`, lg: '21px'}}>
      <Center
        boxSize={{base: '40px', lg: '48px'}}
        position={`relative`}
        borderRadius={`50%`}
        overflow={`hidden`}
      >
        <Image alt="" fill style={{objectFit: `cover`}} src={row?.img ?? row?.img[0]} />
      </Center>

      <Stack>
        <Text
          fontWeight={{base: 500, lg: 400}}
          fontSize={{base: '14px', lg: 'md'}}
          textTransform={'capitalize'}
          color={'#191919'}
          textAlign={'left'}
          noOfLines={1}
          maxW={{base: `50vw`, lg: `max-content`}}
          textOverflow={`ellipsis`}
        >
          {row?.name}
        </Text>
        <Text
          as="span"
          fontSize="14px"
          wordWrap="break-word"
          whiteSpace="break-spaces"
          textAlign="left"
          fontWeight="400"
          color="#4545FE"
          display={{base: `block`, lg: `none`}}
        >
          {row?.email}
        </Text>
      </Stack>
    </HStack>
  );
};

const TableEmailDisplay = ({row}) => {
  const email = useBreakpointValue({
    base: truncateLongText(row?.email, 10).truncatedText,
    md: row?.email,
  });
  return (
    <HStack justify="flex-start">
      <Text
        as="span"
        fontSize="14px"
        wordWrap="break-word"
        whiteSpace="break-spaces"
        textAlign="left"
        fontWeight="400"
        color="#4545FE"
      >
        <a style={{background: '', width: '150px'}} href={`mailto:${row.email}`}>
          {email}
        </a>
      </Text>
    </HStack>
  );
};
