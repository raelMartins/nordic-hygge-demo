import React, {useState} from 'react';

import {
  AbsoluteCenter,
  Center,
  HStack,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import checkIcon from '@/images/successful-transaction.gif';

import {useMutation, useQuery} from 'react-query';
import {useRouter} from 'next/router';
import {fetchInspectionFeedbaackDetails, giveInspectionFeedbackForEmail} from '@/api/navbarMenu';
import {Ratings} from '@/utils/ratings';
import {LayoutView} from '@/components/page_layout';
import {Button} from '@/ui-lib';
import {useCustomToast} from '@/components/CustomToast';

const FeedBackInspection = props => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState();
  const defaultScreen = props.isSuccess == 'true' ? 'success' : 'feedback';
  const [feedBackScreen, setFeedScreen] = useState(`defaultScreen`);

  const router = useRouter();
  const toast = useCustomToast();

  const {data, isLoading, isError, error, refetch} = useQuery(
    [' inspection feeedback detail from email', props.slug],
    () => fetchInspectionFeedbaackDetails(props.slug)
  );

  const Inspectioninfo = data?.data?.data?.[0];

  const feedbackMutation = useMutation(
    formData => giveInspectionFeedbackForEmail(formData, props.slug),
    {
      onSuccess: res => {
        refetch();
        const mergedQuery = {
          ...router.query,
          isSuccess: true,
        };
        setFeedScreen('success');
        router.push({
          pathname: router.pathname,
          query: {
            ...mergedQuery,
          },
        });
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
      rating: rating.toFixed(1),
    };

    return feedbackMutation.mutate(body);
  };
  const isValid = !!message.trim() && rating >= 0;

  return (
    <LayoutView
      noFooter={isLoading}
      isLoading={isLoading}
      isError={isError}
      error={error}
      noNavbar={true}
      noPadding
      fullFooter
    >
      {/* <HStack
        zIndex="222"
        cursor="pointer"
        position="fixed"
        top="2vh"
        right="2vw"
        align="center"
        onClick={modalDisclosure.onOpen}
        justify="center"
      >
        <Icon as={RxHamburgerMenu} h="33px" w="33px" />
      </HStack> */}
      {/* <Image
        src={bgForAuth.src}
        loading="eager"
        top={{base: '-63px', md: '-70px'}}
        w={'100vw'}
        minH={'100vh'}
        opacity={'0.8'}
        alt="background"
        position="absolute"
      /> */}
      {isLoading ? (
        <AbsoluteCenter>
          <Spinner boxSize="72px" />
        </AbsoluteCenter>
      ) : isError && error?.response?.status !== 409 ? (
        <></>
      ) : // feedBackScreen === 'feedback'
      (router.query.isSuccess !== 'true' || feedBackScreen === 'feedback') &&
        error?.response?.status !== 409 ? (
        <Center h={`80vh`} position="relative" zIndex="2">
          <Stack
            padding={{base: '24px', md: '22px 34px'}}
            border="1px solid rgba(145, 145, 145, 0.30)"
            borderRadius={{base: `0px`}}
            bg="matador_background.200"
            transition={'.3s'}
            gap={`18px`}
            maxW={`500px`}
            w={`95%`}
            mx={`auto`}
          >
            <Heading
              textAlign={{base: 'center'}}
              w="full"
              fontSize="23px"
              color="text"
              fontWeight="700"
              lineHeight={`140%`}
              className="heading-text-regular"
            >
              Inspection Feedback{' '}
              {Inspectioninfo?.project?.name && `- ${Inspectioninfo?.project?.name}`}
            </Heading>
            <Stack
              spacing="none"
              // pb="10px"
              // pt="7px"
              bg="transparent"
            >
              <Stack w="full" gap="16px">
                <Text
                  textAlign="start"
                  w="full"
                  fontSize="13px"
                  color="text"
                  fontWeight="500"
                  lineHeight={`150%`}
                  letterSpacing=".26px"
                >
                  Kindly give feedback on this listing.{' '}
                </Text>
                <Ratings mb={`0px`} setRating={setRating} rating={rating} />
                <Stack gap={`6px`} w={`100%`}>
                  <Text
                    textAlign="start"
                    w="full"
                    fontSize="13px"
                    color="text"
                    fontWeight="500"
                    lineHeight={`150%`}
                    letterSpacing=".26px"
                  >
                    Comment
                  </Text>
                  <Textarea
                    // w="291px"
                    p="14px"
                    color="text"
                    id="message"
                    value={message}
                    w="100%"
                    h="115px"
                    fontSize={'14px'}
                    resize="none"
                    name="message"
                    border="0.5px solid"
                    borderColor={`matador_border_color.100 !important`}
                    bg={`matador_background.100`}
                    _focus={{
                      borderColor: `matador_border_color.100 !important`,
                    }}
                    _focusVisible={{
                      borderColor: `matador_border_color.100 !important`,
                    }}
                    _hover={{
                      borderColor: `matador_border_color.100 !important`,
                    }}
                    onChange={handleMessage}
                    borderRadius={`8px`}
                  />
                </Stack>
              </Stack>
            </Stack>
            <Button
              variation={`primary`}
              isDisabled={!isValid}
              onClick={handleSubmit}
              p={{base: `8px`}}
              fontSize="12px"
              fontWeight="400"
              lineHeight={`150%`}
              isLoading={feedbackMutation.isLoading}
              textTransform="capitalize"
            >
              Proceed
            </Button>
          </Stack>
        </Center>
      ) : (
        <AbsoluteCenter>
          <Center
            flexDirection={`column`}
            gap="20px"
            bg="matador_background.200"
            borderRadius="16px"
            zIndex="22222"
            position="relative"
            w="478px"
            h={`350px`}
            justify="center"
            p={`10px`}
          >
            <Image
              // mb="20px"
              src={checkIcon?.src}
              boxSize="100px"
              alt={'success'}
            />

            <Text fontSize="28px" fontWeight="700" textAlign={'center'}>
              Thank you!
            </Text>
            <Text fontSize="16px" fontWeight="400" textAlign={'center'}>
              We appreciate your feedback
            </Text>
          </Center>
        </AbsoluteCenter>
      )}
    </LayoutView>
  );
};

export default FeedBackInspection;

export async function getServerSideProps({params, query}) {
  return {props: {slug: query.id, isSuccess: query.isSuccess ?? null}};
}
