import React, {useState} from 'react';

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import backIcon from '/src/realtors_portal/images/icons/leftArrowWallet.svg';
import messageIcon from '/src/realtors_portal/images/icons/feedbackIconAssets.svg';
import historyIcon from '/src/realtors_portal/images/icons/feedback_history_Icon.svg';
import {BiMessageDetail} from 'react-icons/bi';
import {useMutation, useQuery} from 'react-query';
import {feedback, getfeedbackHistory} from '/src/realtors_portal/api/navbarMenu';
import {toastForError} from '/src/realtors_portal/utils/toastForErrors';
import {SetFeedBack} from './SetFeedBack';
import FeedBackHistory from './FeedBackHistory';
import SuccessForFeedBack from './SuccessForFeedBack';
import useLocalStorage from '/src/realtors_portal/utils/Hook/useLocalStorage';

export const Feedback = ({bundleId, fromAssets, equityId}) => {
  const modalDisclosure = useDisclosure();
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState();
  const [feedBackScreen, setFeedScreen] = useState('feedback');
  const [objOfkeyValues] = useLocalStorage(['storeDetails', 'userToken']);
  const toast = useToast();

  const {data, isError, isLoading, error, refetch} = useQuery(['feedbackhistory', equityId], () =>
    getfeedbackHistory(
      equityId,
      objOfkeyValues?.storeDetails?.store_name,
      objOfkeyValues?.userToken
    )
  );

  const feedBackHistoryArray = data?.data?.message;

  const handleClosedModal = () => {
    setRating();
    modalDisclosure.onClose();
    setFeedScreen('feedback');

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

  const feedbackMutation = useMutation(
    formData => feedback(formData, equityId, objOfkeyValues?.userToken),
    {
      onSuccess: async res => {
        await refetch();
        setFeedScreen('success');
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );

  const handleMessage = e => {
    return setMessage(e.target.value);
  };
  const handleSubmit = () => {
    const body = {
      feedback: message,
      ...(equityId ? {equity_id: equityId} : {}),
      rating: rating.toFixed(1),
    };
    return feedbackMutation.mutate(body);
  };
  const isValid = !!message.trim() && rating >= 0;

  const displayScreens = screen => {
    switch (screen) {
      case 'feedback':
        return (
          <SetFeedBack
            setRating={setRating}
            rating={rating}
            fromAssets={fromAssets}
            message={message}
            setFeedScreen={setFeedScreen}
            handleMessage={handleMessage}
            isValid={isValid}
            equityId={equityId}
            handleSubmit={handleSubmit}
            feedbackMutation={feedbackMutation}
          />
        );
        break;

      case 'success':
        return <SuccessForFeedBack handleClose={handleClosedModal} />;
        break;
      case 'history':
        return (
          <FeedBackHistory
            isLoading={isLoading}
            error={error}
            isError={isError}
            feedBackHistoryArray={feedBackHistoryArray}
            bundleId={bundleId}
          />
        );
        break;
      default:
        return (
          <SetFeedBack
            setRating={setRating}
            rating={rating}
            message={message}
            handleMessage={handleMessage}
            isValid={isValid}
            handleSubmit={handleSubmit}
            feedbackMutation={feedbackMutation}
          />
        );
        break;
    }
  };

  return (
    <>
      {fromAssets ? (
        <Button
          variant={'gray'}
          border="1px solid #000 !important"
          fontSize="18px"
          fontWeight="400"
          color="#000"
          onClick={modalDisclosure.onOpen}
          h="52px"
          w="full"
          borderRadius={'5px'}
          _hover={{
            opacity: '1',
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="10px"
        >
          <Image src={messageIcon.src} alt="message icon" />
          Give feedback
        </Button>
      ) : (
        <HStack
          onClick={modalDisclosure.onOpen}
          cursor="pointer"
          w="full"
          spacing="5px"
          align="center"
          px="14px"
          py="10px"
          maxH="50px"
          _hover={{
            bg: '#f5f5f5',
          }}
        >
          <BiMessageDetail size={'26px'} color="#919191" />
          <Text color="#000000" fontSize="12px" fontWeight="400">
            Feedback
          </Text>
        </HStack>
      )}
      <Drawer
        isOpen={modalDisclosure.isOpen}
        onClose={handleClosedModal}
        px="40px"
        pt="37px"
        pb="27px"
        darkMode
        minW="648px"
        minH="592px"
        borderRadius="16px"
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />

        <DrawerContent
          fontFamily="Euclid Circular B "
          minW="400px"
          bg="#0D0D0D"
          py="39"
          pl="22.75px"
          pr="21.34px"
        >
          {feedBackScreen === 'success' ? (
            ''
          ) : (
            <HStack mb="16.28px" justify="space-between" align="center" position="relative">
              <HStack spacing="7.56px">
                {feedBackScreen === 'feedback' ? (
                  ''
                ) : (
                  <Image
                    cursor="pointer"
                    onClick={() => setFeedScreen('feedback')}
                    src={backIcon.src}
                    alt="back icon"
                  />
                )}
                <Heading
                  bg="#0D0D0D"
                  p="0px"
                  // border="1px solid #EAECF0"
                  fontSize="16px"
                  fontWeight="600"
                  borderBottom="none"
                  color="#ffffff"
                >
                  {feedBackScreen === 'feedback' ? 'Feedback' : 'Feedback History'}
                </Heading>
              </HStack>
              <HStack spacing="20.51px">
                {feedBackScreen === 'feedback' && feedBackHistoryArray?.length ? (
                  <Image
                    src={historyIcon.src}
                    onClick={() => setFeedScreen('history')}
                    alt="feedicon history"
                    cursor="pointer"
                  />
                ) : (
                  ''
                )}
                <VStack
                  position="relative"
                  justify="center"
                  align="center"
                  w="30px"
                  h="30px"
                  borderRadius="5px"
                  transition="0.3s ease-in-out"
                  _hover={{
                    background: '#ffffff',
                    width: '30px',
                    height: '30px',
                  }}
                >
                  <DrawerCloseButton
                    right="0px"
                    left="0px"
                    _hover={{
                      color: '#0D0D0D',
                    }}
                    my="auto"
                    color="#fff"
                    top="0"
                    bottom="0"
                  />
                </VStack>
              </HStack>
            </HStack>
          )}
          <DrawerBody sx={customScrollbarStyles} p="0px">
            {displayScreens(feedBackScreen)}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Feedback;
