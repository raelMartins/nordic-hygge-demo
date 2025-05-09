import React, {useContext, useState} from 'react';
import {
  Box,
  Text,
  HStack,
  useToast,
  Stack,
  Avatar,
  Spinner,
  Center,
  Popover,
  PopoverContent,
  PopoverArrow,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  Show,
  Hide,
  useDisclosure,
  PopoverAnchor,
  DrawerOverlay,
  Flex,
} from '@chakra-ui/react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {UpdateAgentStatus, fetchAgentsNotif} from '@/realtors_portal/api/agents';
import styled from '@emotion/styled';
import {generateID} from '@/realtors_portal/utils/generateId';
import {pastContinuous} from '@/realtors_portal/utils/formatDate';
import useGetSession from '@/utils/hooks/getSession';
import {NavNotifIcon} from './assets/NavbarSvgs';
import {drawer_style} from './drawers/drawer_style';
import Image from 'next/image';
import {useErrorHandler} from '@/realtors_portal/utils/toastForErrors';
import {useRealtorToast} from '@/realtors_portal/utils/Hook/useRealtorsToast';

const Notification = ({data}) => {
  return (
    <HStack gap={`16px`} alignItems="flex-start" position={'relative'} p={`4px`}>
      {!data.status && (
        <Center
          height="10px"
          width="10px"
          borderRadius={'50%'}
          bg="lightgray"
          position={'absolute'}
          top="5px"
          right="5px"
        ></Center>
      )}
      <Center
        boxSize={`40px`}
        minW={`40px`}
        position={`relative`}
        borderRadius={`50%`}
        overflow={`hidden`}
      >
        <Image src={data?.img} alt={`notif image`} fill style={{objectFit: `cover`}} />
      </Center>
      <Stack>
        {/* <Stack> */}
        <Text
          fontSize="13px"
          fontWeight="400"
          color={`#52525B`}
          lineHeight={`150%`}
          letterSpacing={`0.26px`}
        >
          {data?.message}
        </Text>
        <Text fontSize="13px" fontWeight="400" color="#71717A">
          {pastContinuous(data?.created_at)}
        </Text>
      </Stack>
    </HStack>
  );
};

const NotificationContent = () => {
  return;
};

export const LayoutNotifications = ({
  notif_mobile_disclosure,
  menu_disclosure,
  closeOnOpen = () => {},
}) => {
  const toast = useRealtorToast();
  const queryClient = useQueryClient();
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [olderNotifications, setOldNotifications] = useState([]);
  const [isRead, setIsRead] = useState(false);
  const notif_disclosure = useDisclosure();

  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

  // const {isLoading} = useQuery(['notif'], fetchAgentsNotif, {
  const {isLoading} = useQuery(['notif'], () => fetchAgentsNotif(agentToken, storeName), {
    refetchOnWindowFocus: true,
    onSuccess: data => {
      setRecentNotifications(data?.data?.recent);
      setOldNotifications(data?.data?.older);
      setIsRead(data?.data?.status);
    },
  });

  const mutation = useMutation(data => UpdateAgentStatus(data, agentToken, storeName), {
    onSuccess: () => {
      queryClient.invalidateQueries(['notif']);
    },
    onError: error => {
      toast(
        {
          fallBackDescription: 'Something went wrong, kindly check your network connection',
          status: 'error',
        },
        error
      );
    },
  });

  const handleStatus = () =>
    mutation.mutate({
      status: false,
    });

  const check_notif_status = () => {
    if (!recentNotifications && !olderNotifications) {
      return false;
    }
    const notif = [...recentNotifications, ...olderNotifications];
    const unread_messages = notif.filter(el => el.status === false);
    // return notif.some(item => item.status === false);
    return {hasUnread: notif.some(item => item.status === false), count: unread_messages.length};
  };

  const isNotifAvailable = () => !!recentNotifications.length || !!olderNotifications.length;

  const open_notifs = () => {
    notif_disclosure.onOpen();
  };

  const open_mobile_notifs = () => {
    if (notif_mobile_disclosure?.isOpen) {
      notif_mobile_disclosure?.onClose();
    } else {
      menu_disclosure?.onClose();
      closeOnOpen();
      notif_mobile_disclosure?.onOpen();
    }
  };

  return (
    <Box pos={`relative`}>
      <Hide breakpoint="(min-width: 768px)">
        <Center
          position="relative"
          h={{base: '24px', md: '35px'}}
          w={{base: '24px', md: '35px'}}
          minH={{base: '24px', md: '35px'}}
          minW={{base: '24px', md: '35px'}}
        >
          {check_notif_status().hasUnread ? (
            <Center
              position="absolute"
              top="-3.5px"
              right="-3.5px"
              color="#fff"
              minW="18px"
              h="18px"
              bg="#FE2822"
              padding={'.1rem'}
              borderRadius={'16px'}
            >
              <Text fontSize="10px" color="#fff" fontWeight="600">
                {check_notif_status().count > 99 ? '99+' : check_notif_status().count}
              </Text>
            </Center>
          ) : null}
          <NavNotifIcon
            cursor="pointer"
            onClick={open_mobile_notifs}
            color={notif_mobile_disclosure?.isOpen ? `#c2c2c2` : `#ffffff`}
          />
        </Center>
        <Drawer
          isOpen={notif_mobile_disclosure?.isOpen}
          onClose={notif_mobile_disclosure?.onClose}
          size={`sm`}
        >
          <DrawerOverlay />
          <DrawerContent {...drawer_style}>
            <HStack
              p={`14px 20px`}
              justify={`space-between`}
              borderBottom={`0.5px solid`}
              borderColor={`#E4E4E7 !important`}
              background={`#FAFAFA`}
              boxShadow={`0px 2px 4px 0px rgba(0, 0, 0, 0.05)`}
            >
              <Text
                color={`#000`}
                fontSize={`28px`}
                fontWeight={`600`}
                lineHeight={`130%`}
                letterSpacing={`0.16px`}
              >
                Notification
              </Text>

              <Flex gap={`10px`} align={`center`}>
                {check_notif_status().hasUnread && (
                  <Text
                    color={`#4545FE`}
                    fontSize={`13px`}
                    fontWeight={`400`}
                    lineHeight={`150%`}
                    letterSpacing={`0.26px`}
                    onClick={handleStatus}
                    cursor={`pointer`}
                  >
                    Mark all as read
                  </Text>
                )}
                <DrawerCloseButton position={`relative`} top={`0px`} left={`0px`} />
              </Flex>
            </HStack>
            <DrawerBody>
              {isLoading ? (
                <HStack justify="center" align="center" width="100%">
                  <Spinner size="sm" colorScheme="black" />
                </HStack>
              ) : !isNotifAvailable() && !isLoading ? (
                <Center width="100%" marginTop="2rem" minHeight="50vh">
                  <Text fontWeight="semibold">You don&apos;t have any notifications</Text>
                </Center>
              ) : (
                <Stack
                  gap={`0px`}
                  overflow={`auto`}
                  css={{
                    '-ms-overflow-style': 'none',
                    'scrollbar-width': 'none',
                    '::-webkit-scrollbar': {
                      display: 'none',
                    },
                  }}
                  maxH={{base: `100%`, lg: `490px`}}
                >
                  {recentNotifications?.map(data => (
                    <Notification data={data} key={generateID()} />
                  ))}
                  {olderNotifications?.map(data => (
                    <Notification data={data} key={generateID()} />
                  ))}
                </Stack>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Hide>

      <Show breakpoint="(min-width: 768px)">
        <Popover isOpen={notif_disclosure.isOpen} onClose={notif_disclosure.onClose}>
          <PopoverAnchor>
            <Center
              position="relative"
              h={{base: '24px', md: '35px'}}
              w={{base: '24px', md: '35px'}}
              minH={{base: '24px', md: '35px'}}
              minW={{base: '24px', md: '35px'}}
            >
              {check_notif_status().hasUnread ? (
                <Center
                  position="absolute"
                  top="-3.5px"
                  right="-3.5px"
                  color="#fff"
                  minW="18px"
                  h="18px"
                  bg="#FE2822"
                  padding={'.1rem'}
                  borderRadius={'16px'}
                >
                  <Text fontSize="10px" color="#fff" fontWeight="600">
                    {check_notif_status().count > 99 ? '99+' : check_notif_status().count}
                  </Text>
                </Center>
              ) : null}
              <NavNotifIcon
                cursor="pointer"
                onClick={open_notifs}
                color={notif_disclosure.isOpen ? `#c2c2c2` : `#ffffff`}
              />
            </Center>
          </PopoverAnchor>
          <PopoverContent
            mt="10px"
            minH="570px"
            h="fit-content"
            w={{base: '90%', md: `400px`}}
            borderColor={'#e4e4e7'}
            boxShadow={
              '-4px -4px 8px 0px rgba(123, 157, 157, 0.15), 4px 4px 8px 0px rgba(123, 157, 157, 0.15) !important'
            }
          >
            <PopoverArrow />

            {/* <Box
            position={'absolute'}
            zIndex={-100}
            top={'-.8rem'}
            right={'15.7rem'}
            width="0"
            height="0"
            borderLeft="70px solid transparent"
            borderRight="70px solid transparent"
            borderBottom="80px solid #FFFFFF"
          /> */}
            <HStack
              p={`14px 20px`}
              justify={`space-between`}
              borderBottom={`0.5px solid`}
              borderColor={`#E4E4E7 !important`}
              background={`#FAFAFA`}
              boxShadow={`0px 2px 4px 0px rgba(0, 0, 0, 0.05)`}
            >
              <Text
                color={`#18181B`}
                fontSize={`16px`}
                fontWeight={`600`}
                lineHeight={`140%`}
                letterSpacing={`0.16px`}
              >
                Notification
              </Text>
              {check_notif_status().hasUnread && (
                <Text
                  color={`#4545FE`}
                  fontSize={`13px`}
                  fontWeight={`400`}
                  lineHeight={`150%`}
                  letterSpacing={`0.26px`}
                  onClick={handleStatus}
                  cursor={`pointer`}
                >
                  Mark all as read
                </Text>
              )}
            </HStack>
            {isLoading ? (
              <HStack justify="center" align="center" width="100%">
                <Spinner size="sm" colorScheme="black" />
              </HStack>
            ) : !isNotifAvailable() && !isLoading ? (
              <HStack justify="center" align="center" width="100%" marginTop="2rem">
                <Text fontWeight="semibold">You don&apos;t have any notifications</Text>
              </HStack>
            ) : (
              <Box px="5px">
                <Stack
                  gap={`0px`}
                  overflow={`auto`}
                  css={{
                    '-ms-overflow-style': 'none',
                    'scrollbar-width': 'none',
                    '::-webkit-scrollbar': {
                      display: 'none',
                    },
                  }}
                  maxH={{base: `100%`, lg: `490px`}}
                >
                  {' '}
                  {recentNotifications?.map(data => (
                    <DropdownMenuItem key={generateID()}>
                      <Notification data={data} />
                    </DropdownMenuItem>
                  ))}
                  {olderNotifications?.map(data => (
                    <DropdownMenuItem key={generateID()}>
                      <Notification data={data} />
                    </DropdownMenuItem>
                  ))}
                </Stack>
              </Box>
            )}
          </PopoverContent>
        </Popover>
      </Show>
    </Box>
  );
};

const Heading = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  justify-content: space-between;
  align-items: flex-end;
  padding: 12px 24px 17px;

  h1 {
    font-size: 20px;
    font-size: clamp(18px, calc(8px + 2vw), 20px);
    font-weight: 600;
  }
  span {
    cursor: pointer;
    font-size: 14px;
    font-size: clamp(12px, calc(5px + 1vw), 14px);
    font-weight: 400;
  }
`;

const NotifList = styled.div`
  height: 490px;
  overflow: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const DropdownMenuItem = styled(Box)({
  all: 'unset',
  fontSize: 13,
  lineHeight: 1,
  color: 'black',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
  position: 'relative',
  userSelect: 'none',
  borderRadius: '6px',
  // width: '100%',

  '[data-disabled]': {
    color: 'black',
    pointerEvents: 'none',
  },
  '[data-highlighted]': {
    backgroundColor: 'black',
    color: 'black',
  },

  '&:hover': {
    background: 'transparent',
  },
});
