import React, {useState} from 'react';
import {Flex, HStack, Image, Text, VStack, Box, Center, useToast} from '@chakra-ui/react';
import {Button, Spinner} from '@/ui-lib/ui-lib.components';
import cardImg from '@/images/icons/card.svg';
import {CheckIcon} from '@chakra-ui/icons';
import {BiPlus} from 'react-icons/bi';
import {useMutation, useQuery} from 'react-query';
import {fetchSavedCards} from '@/api/payment';
import {makeeDepositToWallet} from '@/api/Wallet';
import openExternalUrl from '@/utils/openExternalLink.js';
import {storeName} from '@/constants/routes';
import EmptyState from '@/components/appState/empty-state';
import {useCustomToast} from '@/components/CustomToast';

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
const ExistingCard = ({amountToPay, selectedCard, setSelectedCard, proceed}) => {
  const toast = useCustomToast();
  const {data: savedCards, isLoading} = useQuery(['cardSaved'], fetchSavedCards, {
    onSuccess: res => {
      const results = res?.data?.results;
      if (!results?.length) {
        // return proceed();
      }
    },
  });

  const MAKE_DEPOSITS_MUTATION = useMutation(formData => makeeDepositToWallet(formData), {
    onSuccess: res => {
      const link = res?.data?.data?.data?.link;
      if (link) openExternalUrl(link);
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

  return (
    <Box w="full" h="fit-content">
      {isLoading ? (
        <Center w="full" h="200px">
          <Spinner disableAbsoluteCenteredSpinner />
        </Center>
      ) : (
        <>
          <Text mt={{base: '12px', md: '16px'}}>Select Card</Text>
          <VStack w="full" gap="16px" mt="6px" align={'stretch'}>
            <Box>
              {savedCards?.data?.results?.length ? (
                <VStack
                  spacing={{base: '6px', md: '10px'}}
                  align={'stretch'}
                  overflowY="auto"
                  maxH={'35vh'}
                  __css={customScrollbarStyles}
                >
                  {savedCards?.data?.results?.map(card => (
                    <Flex
                      key={card.id}
                      onClick={() => setSelectedCard(card)}
                      cursor="pointer"
                      border={'1px solid'}
                      borderColor={
                        selectedCard?.id === card.id
                          ? 'custom_color.color'
                          : 'matador_border_color.100'
                      }
                      bg={'custom_color.background'}
                      align={'flex-start'}
                      _hover={{border: '1px solid', borderColor: 'custom_color.color'}}
                      direction={'row'}
                      px="14px"
                      py="16px"
                      borderRadius={'2px'}
                      justify="space-between"
                    >
                      <HStack spacing={'14px'} align={'flex-start'}>
                        <Image alt="next_image" src={cardImg.src} />
                        <VStack align={'stretch'} spacing={0}>
                          <Text
                            fontSize={{base: '14px', md: '18px'}}
                            fontWeight={{base: '400', md: '500'}}
                          >
                            {card?.bank}
                          </Text>
                          <Text
                            fontSize={{base: '14px', md: '18px'}}
                            fontWeight={{base: '400', md: '500'}}
                          >
                            **** ****{card?.last4}
                          </Text>
                        </VStack>
                      </HStack>
                      <Center
                        w="16px"
                        h="16px"
                        borderRadius={'full'}
                        border="1px solid"
                        borderColor={'custom_color.color'}
                        bg={selectedCard?.id === card.id ? 'custom_color.color' : 'white'}
                      >
                        <CheckIcon color={'white'} fontSize={'10px'} />
                      </Center>
                    </Flex>
                  ))}
                </VStack>
              ) : (
                <EmptyState
                  icon={<Image w="auto" h="50px" opacity={0.5} src={cardImg.src} />}
                  noHeader
                  text={'No card has been added yet'}
                  height={{base: '90px', md: '150px'}}
                />
              )}
            </Box>
            <Button
              variation={`secondary`}
              disabled={MAKE_DEPOSITS_MUTATION?.isLoading}
              isLoading={MAKE_DEPOSITS_MUTATION?.isLoading}
              alignSelf="flex-end"
              leftIcon={<BiPlus size={20} />}
              onClick={proceed}
            >
              Add Card
            </Button>
          </VStack>
        </>
      )}
    </Box>
  );
};

export default ExistingCard;
