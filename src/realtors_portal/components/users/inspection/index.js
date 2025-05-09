import {
  HStack,
  Stack,
  Button,
  Tag,
  TagLabel,
  Text,
  VStack,
  useDisclosure,
  useToast,
  useMediaQuery,
  Show,
  Box,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React, {useState} from 'react';

import {useQuery} from 'react-query';
import {fetchInspectionHistoryForAgents} from '@/realtors_portal/api/agents';
import InspectionHistoryDrawer from './inspectionHistoryDrawer';
import {EmptyState} from '@/realtors_portal/components/common/Table';
import {IoChevronForward} from 'react-icons/io5';
import useGetSession from '@/utils/hooks/getSession';
import {EmptyInspectionsIcon} from '../../assets/UsefulSVGs';

export const Inspection = ({id: inspectionId, data, isClosed}) => {
  const router = useRouter();
  const {id} = router.query;
  const [addedParam, setAddedParam] = useState('');
  const inspectionHistoryDisclosure = useDisclosure();
  const toast = useToast();
  const param = {addedParam, id};

  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

  const {
    data: inspectionData,
    isLoading,
    isError,
    error,
  } = useQuery(['inspectionHistoryagent', param], () =>
    fetchInspectionHistoryForAgents(param, agentToken, storeName)
  );

  const inspectionHistory = inspectionData?.data;

  const timeArray = item => item.month.split(' ');

  const mode = {
    'in-person': {
      color: '#4545FE',
      bg: '#EBEBFF',
      text: 'In Person',
    },
    'in person': {
      color: '#4545FE',
      bg: '#EBEBFF',
      text: 'In Person',
    },
    video: {
      color: '#116932',
      bg: '#E7FBF5',
      text: 'Virtual',
    },
    virtual: {
      color: '#116932',
      bg: '#E7FBF5',
      text: 'Virtual',
    },
    default: {
      color: '#4545FE',
      bg: '#EBEBFF',
      text: 'In Person',
    },
  };

  if (isError) {
    toast({
      title: 'Oops ...',
      description: `${
        error?.response?.data?.message ??
        error?.response?.message ??
        error?.message ??
        'Something went wrong,kindly check your network connection'
      }`,
      status: 'error',
      duration: 8000,
      isClosable: true,
      position: 'top-right',
    });
  }

  const [isNotMobile] = useMediaQuery('(min-width: 768px)');

  return (
    <Box>
      <HStack justifyContent={'space-between'} mb={'16px'} w="100%">
        <Text fontSize="16px" color="#191919" fontWeight="500">
          Inspection
        </Text>
        {isClosed && (
          <Button
            onClick={inspectionHistoryDisclosure.onOpen}
            h="fit-content"
            w="fit-content"
            p="0px"
            _hover={{bg: 'transparent'}}
            _active={{bg: 'transparent'}}
            _focus={{bg: 'transparent'}}
            fontSize={{base: '16px', lg: '14px'}}
            color={{base: '#4545FE', lg: '#191919'}}
            fontWeight={{base: '400', lg: '600'}}
            variant="ghost"
            iconSpacing="none"
          >
            <HStack gap={'6px'}>
              <Text>{isNotMobile ? 'View Inspection History' : 'Inspection History'}</Text>
              <Show above="lg">
                <IoChevronForward fontSize={'18px'} />
              </Show>
            </HStack>
          </Button>
        )}
      </HStack>
      <Box
        border={{base: '.5px solid'}}
        borderColor={`#E4E4E7 !important`}
        borderRadius={{base: `8px`, md: `16px`}}
        overflow={`hidden`}
      >
        {!data?.length ? (
          <EmptyState
            emptyIcon={<EmptyInspectionsIcon />}
            description="No Inspection has been scheduled yet"
            p={{base: '24px', md: '52px'}}
            bg="#fff"
            borderRadius="9px"
          />
        ) : (
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
            <HStack
              justify="start"
              align={`stretch`}
              w="full"
              bg="#fff"
              p="26px 31px"
              spacing="24px"
            >
              {data.map((item, index) => (
                <VStack
                  key={index}
                  p={{base: `38px 27px`, md: `34px 35px`}}
                  border="1px solid"
                  borderColor={`#E4E4E7`}
                  minW="165px"
                  maxW={`300px`}
                  borderRadius={{base: `4px`, md: '12px'}}
                  gap="9px"
                >
                  <Text
                    color={{base: `#000`}}
                    textAlign={{base: `center`}}
                    fontSize={{base: `14px`, md: `16px`}}
                    fontWeight={{base: `500`}}
                    noOfLines={2}
                  >
                    {item?.project?.name}
                  </Text>
                  <Stack flex={`1`} align={`center`} gap={{base: `6px`}} color={`#27272A`}>
                    <Text fontSize={{base: `12.4px`, md: `14px`}} fontWeight="300">
                      {timeArray(item)[2]}
                    </Text>
                    <Text fontSize={{base: `20px`, md: `22px`}} fontWeight="400">
                      {timeArray(item)[1]}
                    </Text>
                    <Text fontSize={{base: `11px`, md: `12px`}} fontWeight="300">{`${
                      timeArray(item)[0]
                    }`}</Text>
                  </Stack>
                  <Tag
                    p="8px 13px"
                    minW="97px"
                    minH="36px"
                    bg={mode[item.tour_method?.toLowerCase()]?.bg || mode?.default?.bg}
                    color={mode[item.tour_method?.toLowerCase()]?.color || mode?.default?.color}
                    borderRadius="full"
                  >
                    <TagLabel mx="auto" fontSize="16px" fontWeight="400">
                      {mode[item.tour_method?.toLowerCase()]?.text || mode?.default?.text}
                    </TagLabel>
                  </Tag>
                </VStack>
              ))}
            </HStack>
          </Box>
        )}
      </Box>
      <InspectionHistoryDrawer
        isLoading={isLoading}
        isError={isError}
        drawerDisclosure={inspectionHistoryDisclosure}
        data={inspectionHistory}
        setAddedParam={setAddedParam}
      />
    </Box>
  );
};
