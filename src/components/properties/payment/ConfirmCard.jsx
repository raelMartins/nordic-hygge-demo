import React, {useEffect} from 'react';
import {
  ModalContent,
  Flex,
  Text,
  Center,
  ModalCloseButton,
  Image,
  DrawerContent,
  DrawerCloseButton,
  Box,
} from '@chakra-ui/react';
import {Button, CustomizableButton, Spinner} from '@/ui-lib';
import processingLoader from '@/images/processing-transaction.gif';
import successfulLoader from '@/images/successful-transaction.gif';
import success_gif from '@/images/success_gif.gif';
import isMobile from '@/utils/extras';
import {formatToCurrency} from '@/utils';
import ExistingCard from './ExistingCard';
import {useQuery} from 'react-query';
import {fetchSavedCards} from '@/api/payment';
import ThreeDots from '@/components/loaders/ThreeDots';

const ConfirmCard = ({
  loading,
  success,
  proceed,
  amountToPay,
  setPaymentStep,
  selectedCard,
  setSelectedCard,
}) => {
  const {data: savedCards, isLoading} = useQuery(['cardSaved'], fetchSavedCards, {
    onSuccess: res => {
      const results = res?.data?.results;
      if (!results?.length) {
        // return proceed();
      }
    },
  });
  useEffect(() => {
    if (!isLoading && (!savedCards?.length || savedCards?.length == 0)) {
      proceed();
    }
  }, [savedCards, isLoading]);

  return (
    <>
      {isLoading || !savedCards?.length || savedCards?.length == 0 ? (
        <Center w="full" h="400px">
          <ThreeDots darkBg boxSize={{base: '10px', md: '14px'}} />
        </Center>
      ) : success ? (
        <Center w="full" h="full" flexDirection={'column'} textAlign={'center'} gap={`20px`}>
          {/* <ChakraImage alt="loader" w="150px" h="150px" src={successfulLoader.src} /> */}
          <Center
            boxSize={`150px`}
            borderRadius={`50%`}
            bg={`#FAB702`}
            overflow={`hidden`}
            position={`relative`}
          >
            <Image alt="loader" src={success_gif.src} fill style={{objectFit: `contain`}} />
          </Center>
          <Text
            textAlign={'center'}
            fontWeight={{base: 700}}
            className="heading-text-regular"
            fontSize={'23px'}
          >
            Transaction Successful
          </Text>
          <Button
            variation={`primary`}
            boxStyle={{width: '100%'}}
            // onClick={onCloseModal}
            fontSize={`16px`}
            fontWeight={`600`}
            lineHeight={`140%`}
            letterSpacing={`0.48px`}
          >
            Finish
          </Button>
        </Center>
      ) : loading ? (
        <Center mt="20px" w="full" h="fit-content" flexDirection={'column'}>
          <Image alt="loader" w="150px" h="150px" src={processingLoader.src} />
          <Text
            textAlign={'center'}
            fontWeight={{base: 600, md: 400}}
            className="heading-text-regular"
            fontSize={'28px'}
            my={{base: '12px', md: '25px'}}
          >
            Processing payment
          </Text>
          <Text opacity={0.8} fontSize={{base: '14px', md: '16px'}} fontWeight="400">
            Wait a moment
          </Text>
        </Center>
      ) : (
        <Flex
          w="full"
          h="fit-content"
          direction="column"
          justify={'center'}
          align={'center'}
          gap="20px"
        >
          <ExistingCard
            proceed={proceed}
            amountToPay={amountToPay}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
            savedCards={savedCards}
          />
          <Flex gap="16px" justify="space-between" align="center" w="full">
            <Button
              variation={`primary`}
              disabled={!selectedCard}
              isDisabled={!selectedCard}
              onClick={proceed}
              boxStyle={{width: `100%`}}
            >
              Proceed
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default ConfirmCard;
