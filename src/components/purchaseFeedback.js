import React, {useState} from 'react';
import {
  Flex,
  Text,
  Box,
  Image,
  Center,
  Textarea,
  HStack,
  useToast,
  Icon,
  useMediaQuery,
  Stack,
} from '@chakra-ui/react';
import processingLoader from '../images/processing-transaction.gif';
import successfulLoader from '../images/successful-transaction.gif';
import {CloseIcon} from '@chakra-ui/icons';
import {feedbackPurchase, getfeedbackHistory} from '../api/navbarMenu';
import {Button, ResponsivePopup, ResponsivePopupContent} from '@/ui-lib';
import {useMutation, useQuery} from 'react-query';
import {RiStarFill} from 'react-icons/ri';
import {MdHistory} from 'react-icons/md';
import FeedbackHistory from './feedback/feedbackHistory';
import {BsArrowLeft} from 'react-icons/bs';
import {scrollBarStyles} from './common/ScrollBarStyles';
import {reactions} from './feedback/feedback';
import {drawer_styles, drawer_title_styles} from './navbar/Navbar';
import {Stars} from './assets/Stars';
import {useCustomToast} from './CustomToast';

const PurchaseFeedback = ({modal, equity}) => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [screen, setScreen] = useState('');

  const toast = useCustomToast();
  const feedbackQuery = useQuery(['feedbackhistory', equity?.id], () =>
    getfeedbackHistory(equity?.id)
  );
  const feedbackData = feedbackQuery?.data?.data?.message;

  const [isMobile] = useMediaQuery('(max-width:700px)');

  const submitFeedback = useMutation(formData => feedbackPurchase(formData, equity?.id), {
    onSuccess: async res => {
      await feedbackQuery.refetch();
    },
    onError: err => {
      toast({
        title: 'Oops...',
        description: `${
          err?.response?.data?.message ??
          err?.response?.message ??
          err?.response?.data[0] ??
          'Something went wrong'
        }`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleSubmit = () => {
    if (!isValid)
      return toast({
        description: `Please leave a comment`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    const body = {
      feedback: message,
      rating: rating.toFixed(1),
    };
    return submitFeedback.mutate(body);
  };

  const handleResetModal = () => {
    setMessage('');
    setRating(0);
    submitFeedback.reset();
    modal.onClose();
  };

  const isValid = !!message.trim();

  return (
    <ResponsivePopup
      autoFocus={false}
      isCentered
      onCloseComplete={handleResetModal}
      blockScrollOnMount={true}
      onClose={modal?.onClose}
      isOpen={modal?.isOpen}
      placement={isMobile ? 'bottom' : 'right'}
    >
      <ResponsivePopupContent
        {...drawer_styles}
        top={{base: 'auto !important', lg: '24px !important'}}
        bottom={{base: '0', md: 'unset !important'}}
        maxH={{base: '448px', lg: `100%`}}
        borderRadius={{base: `16px 16px 0px 0px`, lg: `5px`}}
      >
        <Flex {...drawer_title_styles}>
          <Text>Feedback</Text>
          <HStack gap="5px">
            <CloseIcon
              color="text"
              cursor="pointer"
              fontSize="17px"
              onClick={modal?.onClose}
              mt={2}
            />
          </HStack>
        </Flex>
        <Box overflowY="auto" css={scrollBarStyles}>
          {submitFeedback.isSuccess ? (
            <Center
              p="24px"
              gap={`24px`}
              w="full"
              h="400px"
              flexDirection={'column'}
              textAlign={'center'}
            >
              <Image alt="success" w="150px" h="150px" src={successfulLoader.src} mx="auto" />
              <Text
                color="text"
                fontWeight={700}
                fontSize={'23px'}
                className="heading-text-regular"
                lineHeight={`140%`}
              >
                Thank you for your feedback
              </Text>
              <Button
                disabled={submitFeedback.isLoading}
                loading={submitFeedback.isLoading}
                onClick={handleResetModal}
                variation={`primary`}
                p={`9px`}
                fontSize={`16px`}
                fontStyle={`normal`}
                fontWeight={`600`}
                lineHeight={`140%`}
                letterSpacing={`0.48px`}
                boxStyle={{width: `100%`}}
              >
                Finish
              </Button>
            </Center>
          ) : (
            <Stack gap={`16px`} p={{base: `24px`}}>
              <Text
                color="text"
                fontSize={{base: '13px'}}
                fontWeight={500}
                letterSpacing="0.26px"
                lineHeight={`150%`}
              >
                Kindly give feedback on this listing.{' '}
              </Text>
              <Stars rating={rating} selectRating={setRating} />
              <Stack gap={`6px`}>
                <Text
                  color="text"
                  fontSize={{base: '13px'}}
                  fontWeight={500}
                  letterSpacing="0.26px"
                  lineHeight={`150%`}
                >
                  Comments
                </Text>
                <Textarea
                  color="text"
                  onChange={e => setMessage(e.target.value)}
                  value={message}
                  resize="none"
                  border="1px solid !important"
                  bg="matador_background.100"
                  borderColor="matador_border_color.100 !important"
                  borderRadius={'8px'}
                  w="full"
                  h="113px"
                  boxShadow={`0px 1px 2px 0px rgba(16, 24, 40, 0.05)`}
                />
              </Stack>

              <Flex justify={'flex-end'} align={'center'} w="full">
                <Button
                  variation={`primary`}
                  p={`9px`}
                  fontSize={`16px`}
                  fontStyle={`normal`}
                  fontWeight={`600`}
                  lineHeight={`140%`}
                  letterSpacing={`0.48px`}
                  boxStyle={{width: `100%`}}
                  isDisabled={!message || !rating}
                  isLoading={submitFeedback.isLoading}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Flex>
            </Stack>
          )}
        </Box>
      </ResponsivePopupContent>
    </ResponsivePopup>
  );
};

export default PurchaseFeedback;
