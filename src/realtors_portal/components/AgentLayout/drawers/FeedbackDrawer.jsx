import React, {useState} from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import {useMutation} from 'react-query';
import {feedback} from '@/realtors_portal/api/navbarMenu';
import {toastForError} from '@/realtors_portal/utils/toastForErrors';
import {SetFeedBackForAgent} from './SetFeedBackAgent';
import {drawer_style} from './drawer_style';
import useGetSession from '@/utils/hooks/getSession';

export const FeedbackDrawer = ({children}) => {
  const modalDisclosure = useDisclosure();
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState();

  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

  const toast = useToast();

  const handleClosedModal = () => {
    setRating();
    modalDisclosure.onClose();

    return setMessage('');
  };

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#ffffff',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const feedbackMutation = useMutation(formData => feedback(formData, null, agentToken), {
    onSuccess: async res => {
      handleClosedModal();
      return toast({
        title: 'Feedback Received',
        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const handleMessage = e => {
    return setMessage(e.target.value);
  };
  const handleSubmit = () => {
    const body = {
      feedback: message,
      rating: rating.toFixed(1),
    };
    return feedbackMutation.mutate(body);
  };
  const isValid = !!message.trim() && rating >= 0;

  return (
    <>
      <HStack
        onClick={modalDisclosure.onOpen}
        cursor="pointer"
        w="full"
        spacing="5px"
        align="center"
      >
        {children}
      </HStack>

      <Drawer
        isOpen={modalDisclosure.isOpen}
        onClose={handleClosedModal}
        px="40px"
        pt="37px"
        pb="27px"
        minW="648px"
        minH="592px"
        borderRadius="16px"
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />

        <DrawerContent {...drawer_style}>
          <HStack
            boxShadow="0px 3.20641px 6.41283px 0px rgba(0, 0, 0, 0.02)"
            py="12px"
            bg="#F5F5F5"
            pl="27.3px"
            pr="19.9px"
            justify="space-between"
            align="center"
            position="relative"
          >
            <HStack spacing="8px">
              <Text fontSize="20px" fontWeight={600} color="#191919">
                Feedback
              </Text>
            </HStack>

            <VStack
              position="relative"
              justify="center"
              align="center"
              w="30px"
              h="30px"
              borderRadius="5px"
              transition="0.3s ease-in-out"
              _hover={{
                width: '30px',
                height: '30px',
              }}
            >
              <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
            </VStack>
          </HStack>
          <DrawerBody sx={customScrollbarStyles} pt="10px" pb="39" pl="22.75px" pr="21.34px">
            <SetFeedBackForAgent
              setRating={setRating}
              rating={rating}
              message={message}
              handleMessage={handleMessage}
              isValid={isValid}
              handleSubmit={handleSubmit}
              feedbackMutation={feedbackMutation}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
