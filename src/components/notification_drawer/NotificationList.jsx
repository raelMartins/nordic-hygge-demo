import React from 'react';
import {Divider, Flex, Image, Stack, Text} from '@chakra-ui/react';
import {Center, Box} from '@chakra-ui/react';
import EmptyState from '../appState/empty-state';
import {NOTIFICATION} from '../../constants/icon_images';

export const NotificationList = ({data, dateOrTimeAgo}) => {
  return (
    <>
      {data?.data?.data?.length ? (
        <>
          {data?.data?.data?.map(notif => (
            <Flex
              direction={`column`}
              bg="matador_background.200"
              cursor="pointer"
              w="100%"
              p="16px"
              gap="4px"
              key={notif.title}
              opacity={0.7}
              borderBottom={`1px solid`}
              borderColor={`matador_border_color.100`}
              pr={'26px'}
              color={'text'}
            >
              <Flex align="center" color={'text'} gap={'8px'}>
                <Text fontSize="13px" fontWeight={`700`} as="h2" noOfLines={1} lineHeight={`150%`}>
                  {notif.topic}
                </Text>
                <Text
                  fontSize={'13px'}
                  lineHeight={`150%`}
                  noOfLines={1}
                  letterSpacing={`0.26px`}
                  fontWeight={`500`}
                  color={`matador_form.label`}
                >
                  {dateOrTimeAgo(notif.time_ago)}
                </Text>
              </Flex>
              <Flex justify="space-between" align="flex-end" mb="10px">
                <Text
                  fontSize={'13px'}
                  lineHeight={`150%`}
                  letterSpacing={`0.26px`}
                  fontWeight={`500`}
                >
                  {notif.message}
                </Text>
              </Flex>
            </Flex>
          ))}
        </>
      ) : (
        <EmptyState
          icon
          text="No notification yet"
          textSize={16}
          headerStyle={{fontWeight: 500, textTransform: 'uppercase'}}
          height="750px"
          centered
        />
      )}
    </>
  );
};

export default NotificationList;
