import React from 'react';
import {Flex, Image, Text} from '@chakra-ui/react';
import {Box} from '@chakra-ui/react';
import EmptyState from '../appState/empty-state';
import {NOTIFICATION} from '../../constants/icon_images';

export const Space = ({spaceData, dateOrTimeAgo, setRequestInfo, setType}) => {
  return (
    <>
      {spaceData?.data?.data?.length ? (
        <>
          {spaceData?.data?.data?.map(notif => (
            <Flex
              cursor="pointer"
              w="100%"
              mb="4"
              px="15px"
              gap="20px"
              key={notif.title}
              opacity={0.7}
            >
              <Image
                justifySelf="flex-end"
                src={
                  NOTIFICATION[notif.topic?.toLowerCase().replace(' ', '_')]?.src ??
                  NOTIFICATION.wallet_transaction.src
                }
                h={'16px'}
                w={'16px'}
                alt={`${notif.topic} icon`}
              />
              <Box w="100%" pr={'26px'}>
                <Flex align="center" gap="10px">
                  <Text fontSize="14px" fontWeight={600} as="h2" noOfLines={1}>
                    {notif.topic}
                  </Text>
                  <Text fontSize={'11px'} ml="8px" lineHeight="16px" noOfLines={1}>
                    {dateOrTimeAgo(notif.time_ago)}
                  </Text>
                </Flex>
                <Flex justify="space-between" align="flex-end" mb="10px">
                  <Text fontSize={'12px'} fontWeight={400}>
                    {notif.message}
                  </Text>
                </Flex>
                <Text
                  onClick={() => {
                    setRequestInfo(notif);
                    setType('summary');
                  }}
                  cursor={'pointer'}
                  color="text"
                  fontSize={'16px'}
                  fontWeight={500}
                >
                  View
                </Text>
              </Box>
            </Flex>
          ))}
        </>
      ) : (
        <EmptyState
          icon
          text="Looks like there is nothing on space"
          textSize={14}
          headerStyle={{fontWeight: 500, textTransform: 'uppercase'}}
          height="750px"
        />
      )}
    </>
  );
};

export default Space;
