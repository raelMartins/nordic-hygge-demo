import {RButton, ResponsivePopup, ResponsivePopupContent} from '@/realtors_portal/ui-lib';
import {formatTimestamp, monthDayYear} from '@/realtors_portal/utils/formatDate';
import {Box, Center, Flex, Link, Stack, Text, Tooltip, useDisclosure} from '@chakra-ui/react';
import Image from 'next/image';

export const Request = ({request_data, tab}) => {
  console.log({request_data});
  const disclosure = useDisclosure();
  return (
    <>
      <Flex px={{base: '8px', lg: '16px'}} gap={'8px'}>
        <Center
          boxSize={`48px`}
          cursor={`pointer`}
          mr={2}
          position={`relative`}
          borderRadius={`50%`}
          overflow={`hidden`}
        >
          <Image
            src={
              request_data?.customer?.avatar || request_data?.users?.avatar || default_avatar.src
            }
            alt="default_avatar"
            fill
            style={{objectFit: `cover`}}
          />
        </Center>
        <Flex
          flex="1"
          fontSize={'14px'}
          color="#475467"
          lineHeight={'20px'}
          fontWeight={'400'}
          spacing={'3px'}
          textAlign={'left'}
          direction={'column'}
        >
          {tab === 'listing_inspection' ? (
            <Text>
              <Link
                href={`/agents/users/customer_profile/${request_data?.users?.user?.id}`}
                color="#4545FE"
                textTransform={'capitalize'}
              >
                {request_data?.users?.first_name} {request_data?.users?.last_name}
                &apos;s
              </Link>{' '}
              scheduled <b style={{textTransform: 'capitalize'}}>
                {request_data?.tour_method}
              </b>{' '}
              inspection for{' '}
              <b style={{textTransform: 'capitalize'}}>
                {request_data?.project?.name} {request_data?.project?.building_type},{' '}
                {request_data?.project?.address}
              </b>{' '}
              on <b style={{textTransform: 'capitalize'}}>{monthDayYear(request_data?.date)}</b> at{' '}
              <b style={{textTransform: 'capitalize'}}>{request_data?.time}</b>
              {request_data?.status?.toLowerCase() === 'pending'
                ? ' is pending'
                : ` has been ${request_data?.status?.toLowerCase()}`}
              .
            </Text>
          ) : tab === 'sales_commission' ? (
            <Text>
              Your commission request for{' '}
              <Link
                href={`/agents/users/customer_profile/${request_data?.customer?.user?.id}`}
                color="#4545FE"
                textTransform={'capitalize'}
              >
                {request_data?.customer?.first_name} {request_data?.customer?.last_name}
                &apos;s
              </Link>{' '}
              <b style={{textTransform: 'capitalize'}}>{request_data?.property_info}</b>
              {request_data?.status?.toLowerCase() === 'pending'
                ? ' is pending'
                : ` has been ${request_data?.status?.toLowerCase()}`}
              .
            </Text>
          ) : (
            'Request Description'
          )}
          {Date.now() >
            Date.parse(
              request_data?.createdAt || request_data?.created_at || request_data?.date || ''
            ) && (
            <Text display={'flex'} alignItems={'center'} gap={'8px'}>
              <Box h="4px" w="4px" borderRadius={'50%'} bg={'#D9D9D9'}></Box>
              {formatTimestamp(
                request_data?.createdAt || request_data?.created_at || request_data?.date || ''
              )}
            </Text>
          )}
        </Flex>
        {request_data?.status === 'rejected' && (
          <Tooltip bg={`#fff`} color={`#000`} label={request_data?.response_note}>
            <RButton
              variation={`primary`}
              fontSize={'12px'}
              lineHeight={'100%'}
              fontWeight={'500'}
              p={`8px 16px`}
              _hover={{backgroundColor: '#161616'}}
              onClick={disclosure?.onOpen}
            >
              View Reason
            </RButton>
          </Tooltip>
        )}
      </Flex>
      <ResponsivePopup
        isOpen={disclosure?.isOpen}
        isCentered
        onClose={disclosure?.onClose}
        placement={`bottom`}
      >
        <ResponsivePopupContent
          p={`16px`}
          maxW={{lg: `360px`}}
          h={{base: `200px`, lg: `max-content`}}
          maxH={{base: `50vh`}}
          overflow={`auto`}
          borderRadius={`12px`}
          bg={`#fff`}
        >
          <Stack gap={`8px`}>
            <Text
              color={{base: `#000`}}
              fontSize={{base: `16px`}}
              fontWeight={{base: `600`}}
              lineHeight={{base: `140%`}}
              letterSpacing={{base: `0.16px`}}
            >
              Rejection reason
            </Text>
            <Text>{request_data?.response_note}</Text>
          </Stack>
        </ResponsivePopupContent>
      </ResponsivePopup>
    </>
  );
};
