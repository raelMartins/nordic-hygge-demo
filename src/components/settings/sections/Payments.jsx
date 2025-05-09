import React, {useState} from 'react';
import {
  Box,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  useToast,
  Spinner as ChakraSpinner,
  Center,
  useMediaQuery,
  Stack,
} from '@chakra-ui/react';
import {themeStyles} from '@/theme';
import {Button, Spinner} from '@/ui-lib';
import {RemoveBankAccount} from '@/api/Settings';
import {useMutation, useQuery} from 'react-query';
import {makeeDepositToWallet} from '@/api/Wallet';
import EmptyState from '@/components/appState/empty-state';
import {storeName} from '@/constants/routes';
import {fetchSavedCards} from '@/api/payment';
import cardEmptyState from '@/images/icons/card-empty-state.svg';
import openExternalUrl from '@/utils/openExternalLink';
import {DebitCardSVG} from '@/components/assets/svgs';
import {IoMdAdd} from 'react-icons/io';
import {IoAdd} from 'react-icons/io5';
import {settings_input_field_style} from '..';
import {useCustomToast} from '@/components/CustomToast';

const Payments = () => {
  const toast = useCustomToast();
  const {data, isLoading: fetchingCard, refetch} = useQuery(['cardSaved'], fetchSavedCards);

  const {mutate: removeCardMutate, isLoading: removingCard} = useMutation(
    values => RemoveBankAccount(values),
    {
      onSuccess: async res => {
        toast({
          description: `Account removed successfully`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });

        await refetch();
      },
      onError: err => {
        toast({
          title: err?.message === 'Network Error' ? 'Network Error' : 'Oops something went wrong',
          description: `${err?.response?.data?.message ?? 'please check your network connection'}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );
  const MAKE_DEPOSITS_MUTATION = useMutation(formData => makeeDepositToWallet(formData), {
    onSuccess: res => {
      const link = res?.data?.data?.data?.link;
      if (link) {
        openExternalUrl(link, '_blank');
      }
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

  const handleRemove = id => {
    removeCardMutate(id);
  };

  const handleMakeDeposits = () => {
    const body = {
      amount: 50,
      channel: 'card',
      store: storeName,
    };
    MAKE_DEPOSITS_MUTATION.mutate(body);
  };

  return (
    <Stack padding={{base: '0', lg: '14px 34px'}} w="full">
      <Text
        className="heading-text-regular"
        fontSize={{base: 16, md: 23}}
        fontWeight={700}
        textTransform={'uppercase'}
      >
        Payment Methods
      </Text>

      {fetchingCard ? (
        <Center w="full" h="30vh">
          <Spinner disableAbsoluteCenteredSpinner h={{base: `50px`}} w={{base: `50px`}} />
        </Center>
      ) : (
        <VStack spacing="6px" align={'stretch'} mt="24px">
          {data?.data?.results?.length ? (
            <>
              {data?.data?.results.map((card, index) => (
                <Flex
                  key={card?.id}
                  {...settings_input_field_style}
                  direction={'row'}
                  p={{base: '16px 14px'}}
                  cursor="pointer"
                  justify="space-between"
                  align="center"
                >
                  <HStack spacing={'14px'}>
                    {/* <Image alt="next_image" src={debitCard.src} /> */}
                    <DebitCardSVG boxSize={`56px`} />
                    <VStack align={'stretch'} gap={0} color="text">
                      <Text
                        fontWeight={700}
                        fontSize={{base: `23px`}}
                        lineHeight={`140%`}
                        className="heading-text-regular"
                      >
                        {card?.bank}
                      </Text>
                      <Text
                        fontSize={`13px`}
                        fontWeight={`500`}
                        lineHeight={`150%`} /* 19.5px */
                        letterSpacing={`0.26px`}
                      >
                        **** ****{card?.last4}
                      </Text>
                    </VStack>
                  </HStack>
                  <Text
                    cursor={'pointer'}
                    onClick={() => handleRemove(card.id)}
                    color={'#F00'}
                    textDecoration={'underline'}
                    _disabled={removingCard}
                    h="max-content"
                    pr={3}
                    fontWeight={`500`}
                  >
                    {removingCard ? <ChakraSpinner /> : 'Remove'}
                  </Text>
                </Flex>
              ))}
              <Flex justify={`flex-end`} mt={`24px`}>
                <Button
                  variation={`primary`}
                  type="submit"
                  fontSize={13}
                  p={`8px 14px`}
                  leftIcon={<IoAdd fontSize={`20px`} />}
                  onClick={handleMakeDeposits}
                  fontWeight={`700`}
                  lineHeight={` 176%`} /* */
                  letterSpacing={`3.9px`}
                  isLoading={MAKE_DEPOSITS_MUTATION?.isLoading}
                >
                  Add A Payment Method
                </Button>
              </Flex>
            </>
          ) : (
            <Center w="full" flexDirection={'column'} mt="24px">
              <EmptyState
                icon={<Image src={cardEmptyState.src} width={`120px`} height={`100px`} />}
                text={'No payment method added yet'}
                heading={'  '}
                height="max-content"
                textStyle={{fontWeight: `700`, fontSize: `14px`}}
                minHeight="max-content"
              />
              <Button
                variation={`primary`}
                onClick={handleMakeDeposits}
                fontWeight="500"
                leftIcon={<IoMdAdd fontSize={`20px`} />}
                mx="auto"
                fontSize={16}
                isLoading={MAKE_DEPOSITS_MUTATION?.isLoading}
              >
                Add A Payment Method
              </Button>
            </Center>
          )}
        </VStack>
      )}
    </Stack>
  );
};

export default Payments;
