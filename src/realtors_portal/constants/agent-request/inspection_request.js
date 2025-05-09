import {changeDateFormat} from '/src/realtors_portal/utils/formatDate';
import {HStack, Image, Tag, TagLabel, Text, VStack} from '@chakra-ui/react';

export const INSPECTION_REQUEST_COLUMNS = [
  {
    Header: 'Name',
    accessor: row => {
      return (
        <HStack spacing="10px">
          <Image
            alt=""
            borderRadius="full"
            objectFit="cover"
            boxSize="47.29px"
            src={row?.users?.avatar}
          />
          <Text
            as="span"
            wordBreak="break-all"
            whiteSpace="break-spaces"
            textTransform="capitalize"
            w="150px"
            color="#191919"
            textAlign="start"
            fontSize="16px"
            fontWeight="400"
          >
            {`${row?.users.first_name} ${row?.users.last_name} `}
          </Text>
        </HStack>
      );
    },
  },
  {
    Header: 'Date',

    accessor: row => (
      <HStack spacing="none" justify="start">
        <Text as="span" textAlign="start" color="#191919" fontSize="16px" w="full" fontWeight="400">
          {changeDateFormat(row?.date, 'add_time').split('|')[0]}
          {' | '}
          <Text
            as="span"
            textAlign="start"
            color="#606060"
            fontSize="16px"
            w="full"
            fontWeight="400"
          >
            {changeDateFormat(row?.date, 'add_time').split('|')[1]}
          </Text>
        </Text>
      </HStack>
    ),
  },

  {
    Header: 'Property',
    accessor: row => {
      return (
        <Text textAlign="start" fontSize="16px" fontWeight="500">
          {row.project.name}
        </Text>
      );
    },
  },
  {
    Header: 'Type',
    accessor: row => {
      let status = row?.tour_method?.toLowerCase();

      const mode = {
        'in-person': {
          color: '#12D8A0',
          bg: 'rgba(18, 216, 160, 0.10)',
          text: 'In Person',
        },
        video: {
          color: '#4545FE',
          bg: 'rgba(69, 69, 254, 0.10)',
          text: 'Video',
        },
      };
      return (
        <VStack align="start">
          <Tag
            p="4.578px 9.156px"
            bg={mode[row?.tour_method]?.bg}
            color={mode[row?.tour_method]?.color}
            borderRadius="full"
          >
            <TagLabel mx="auto">{mode[row?.tour_method]?.text}</TagLabel>
          </Tag>
        </VStack>
      );
    },
  },
  {
    Header: 'Assigned to',

    accessor: row => {
      return (
        <HStack justify="start" spacing={4} h="40px">
          <Text
            fontSize="16px"
            w="100px"
            whiteSpace="break-spaces"
            fontWeight="400"
            color="#191919"
          >
            {row?.assigned_to ?? '-'}
          </Text>
        </HStack>
      );
    },
  },
];
