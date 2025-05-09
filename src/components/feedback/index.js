import {Box, Flex, HStack, Stack, Text, Textarea, useDisclosure, useToast} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import {feedbackEquity, fetchpendingInspectionFeedbaack} from '@/api/navbarMenu';
import {Button, ResponsivePopup, ResponsivePopupContent} from '@/ui-lib';
import {CloseIcon} from '@chakra-ui/icons';

import useGetSession from '@/utils/hooks/getSession';
import {useRouter} from 'next/router';
import {scrollBarStyles} from '../common/ScrollBarStyles';
import {drawer_styles, drawer_title_styles} from '../navbar/Navbar';
import {Stars} from '../assets/Stars';
import isMobile from '@/utils/extras';
import {useCustomToast} from '../CustomToast';

export const InspectionFeedBack = () => {
  const router = useRouter();
  const toast = useCustomToast();

  const [willDisplay, setWillDisplay] = useState(true);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const {sessionData: LoggedinUser} = useGetSession('loggedIn');

  const drawerDisclosure = useDisclosure();

  const {data, refetch} = useQuery(
    ['fetchpendingInspectionFeedbaack'],
    fetchpendingInspectionFeedbaack
  );

  const equity = data?.data?.data?.[0] || null;

  const feedbackQuery = useQuery(['feedbackhistory', equity?.id], () =>
    getfeedbackHistory(equity?.id)
  );

  const feedbackData = feedbackQuery?.data?.data?.message;

  const submitFeedback = useMutation(formData => feedbackEquity(formData, equity?.id), {
    onSuccess: async res => {
      toast({
        title: `Thank you for the feedback`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      drawerDisclosure?.onClose();
      await feedbackQuery.refetch();
      await refetch();
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
      type: 'inspection',
      rating: rating.toFixed(1),
    };
    return submitFeedback.mutate(body);
  };

  const handleResetModal = () => {
    setMessage('');
    setRating(0);
    submitFeedback.reset();
    drawerDisclosure.onClose();
  };

  const isValid = !!message.trim();

  useEffect(() => {
    if (equity && willDisplay && router?.pathname?.includes(`properties`) && equity) {
      drawerDisclosure?.onOpen();
      setWillDisplay(false);
    }
  }, [router?.pathname, equity]);

  return (
    equity && (
      <ResponsivePopup
        autoFocus={false}
        isCentered
        onCloseComplete={handleResetModal}
        blockScrollOnMount={true}
        onClose={drawerDisclosure?.onClose}
        isOpen={drawerDisclosure?.isOpen}
        placement={isMobile ? 'bottom' : 'right'}
      >
        <ResponsivePopupContent
          {...drawer_styles}
          // top={{base: 'auto !important', lg: 'auto !important'}}
          // bottom={{base: '0', md: '24px !important'}}
          maxH={{base: '448px', lg: `500px`}}
          borderRadius={{base: `16px 16px 0px 0px`, lg: `5px`}}
        >
          <Flex {...drawer_title_styles}>
            <Text>How did your inspection go?</Text>
            <HStack gap="5px">
              <CloseIcon
                color="text"
                cursor="pointer"
                fontSize="14px"
                onClick={drawerDisclosure?.onClose}
                mt={{md: 2}}
              />
            </HStack>
          </Flex>

          <Box overflowY="auto" css={scrollBarStyles}>
            <Stack gap={`16px`} p={{base: `24px`}}>
              <Stack
                color="text"
                fontSize={{base: '13px'}}
                fontWeight={500}
                letterSpacing="0.26px"
                lineHeight={`150%`}
              >
                <Box as={`span`} fontWeight={`700`}>
                  Welcome back {LoggedinUser?.first_name}!
                </Box>
                <Text>
                  We’re eager to know about your inspection experience at{' '}
                  <Box as={`span`} fontWeight={`700`}>
                    {equity?.project?.name}.
                  </Box>{' '}
                  Could you take a moment to rate it for us?
                </Text>
              </Stack>
              <Stars rating={rating} selectRating={setRating} />
              <Stack gap={`6px`}>
                <Text
                  color="text"
                  fontSize={{base: '13px'}}
                  fontWeight={500}
                  letterSpacing="0.26px"
                  lineHeight={`150%`}
                >
                  Would you mind telling us more about it?
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
                  isDisabled={!isValid || submitFeedback.isLoading}
                  isLoading={submitFeedback.isLoading}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Flex>
            </Stack>
          </Box>
        </ResponsivePopupContent>
      </ResponsivePopup>
    )
  );
};

export default InspectionFeedBack;
