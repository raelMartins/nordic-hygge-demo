import React, {useEffect, useRef} from 'react';
import {
  ModalContent,
  Flex,
  Box,
  Text,
  VStack,
  Center,
  Modal,
  ModalOverlay,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import {ArrowBackIcon, ArrowForwardIcon, CloseIcon} from '@chakra-ui/icons';
import {formatToCurrency} from '@/utils';
import Carousel from 'react-elastic-carousel';
import {CustomizableButton, Spinner} from '@/ui-lib';
import isMobile from '@/utils/extras';

const Plan = ({
  PAYMENT_PLAN_DATA,
  planLoading,
  onCloseModal,
  setSelectedPlan,
  selectedPlan,
  setStep,
  buyModal,
}) => {
  const carouselRef = useRef();

  // useEffect(() => {
  //   if (PAYMENT_PLAN_DATA?.length === 1) {
  //     setSelectedPlan(PAYMENT_PLAN_DATA[0]);
  //     setStep('terms');
  //   }
  // }, [PAYMENT_PLAN_DATA]);

  function splitArrayIntoChunks(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array?.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  const chunkedArray = PAYMENT_PLAN_DATA ? splitArrayIntoChunks(PAYMENT_PLAN_DATA, 2) : [];

  const mainContent = (
    <Box w="full">
      <Flex direction="row" justify="space-between" align={'center'} mb="15px">
        <Text
          fontSize={{base: '23px', md: '25px'}}
          fontWeight={400}
          color="text"
          className="heading-text-regular"
        >
          Payment Plans
        </Text>
        <CloseIcon
          fontWeight={600}
          alignSelf={'flex-start'}
          fontSize={'13px'}
          style={{color: '#667085', cursor: 'pointer'}}
          onClick={buyModal?.onClose}
        />
      </Flex>
      {planLoading ? (
        <Spinner />
      ) : (
        <Carousel
          ref={carouselRef}
          // breakPoints={breakPoint}
          pagination={false}
          // verticalMode
          // isRTL
          showArrows={false}
        >
          {chunkedArray?.map((itemChunkArray, i) => (
            <VStack align={'stretch'} px="0" w="96%" key={i}>
              {itemChunkArray.map((item, i) => (
                <Box
                  key={i}
                  w="full"
                  h={{base: '170px', md: '180px'}}
                  my={{base: '4px', md: '8px'}}
                >
                  <VStack
                    bg="matador_background.100"
                    px="12px"
                    align={'stretch'}
                    gap={'12px'}
                    border={'2px solid'}
                    cursor="pointer"
                    borderColor={'matador_border_color.100'}
                    key={i}
                    w="full"
                    h="full"
                    onClick={() => {
                      setSelectedPlan(item);
                      setStep('terms');
                    }}
                    py="24px"
                  >
                    <Text
                      className="heading-text-regular"
                      textAlign={'center'}
                      color="text"
                      fontWeight={400}
                      fontSize={{base: '28px', md: '28px'}}
                    >
                      {item?.payment_period_in_months} Months
                    </Text>
                    <Box
                      borderBottom={'1px solid'}
                      borderColor={`matador_border_color.100 !important`}
                    />
                    <HStack justify={'space-between'} align={'center'}>
                      <Flex direction={'column'} w="32%" align={'flex-start'}>
                        <Text color="matador_form.label" fontWeight={500} fontSize={'13px'}>
                          Purchase Price
                        </Text>
                        <Text color="text" fontWeight={600} fontSize={'11px'}>
                          {formatToCurrency(item?.purchase_price)}
                        </Text>
                      </Flex>
                      <Flex direction={'column'} w="32%" align={'flex-start'}>
                        <Text color="matador_form.label" fontWeight={500} fontSize={'13px'}>
                          Initial Deposit
                        </Text>
                        <Text color="text" fontWeight={600} fontSize={'11px'}>
                          {formatToCurrency(item?.initial_deposit_in_value)}
                        </Text>
                      </Flex>
                      {item?.plan_type === 'manual' && item?.payment_frequency !== 'flexible' ? (
                        <Flex direction={'column'} w="32%" align={'flex-start'}>
                          <Text color="matador_form.label" fontWeight={500} fontSize={'13px'}>
                            {item?.payment_frequency
                              ? item?.payment_frequency?.charAt(0).toUpperCase() +
                                item?.payment_frequency?.slice(1) +
                                ' Payment'
                              : 'Periodic Payment'}
                          </Text>
                          <Text color="text" fontWeight={600} fontSize={'11px'}>
                            {formatToCurrency(item?.periodic_payment)}
                          </Text>
                        </Flex>
                      ) : (
                        <Box w="30%" />
                      )}
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </VStack>
          ))}
        </Carousel>
      )}

      {PAYMENT_PLAN_DATA?.length > 2 && (
        <HStack spacing={'15px'} justify={'flex-end'} mt="12px">
          <Center
            cursor={'pointer'}
            onClick={() => carouselRef.current?.slidePrev()}
            h="36px"
            w="36px"
            borderRadius={'full'}
            border="1px solid"
            borderColor={'matador_border_color.100'}
            bg="transparent"
          >
            <ArrowBackIcon color="text" fontWeight={700} />
          </Center>

          <Center
            cursor={'pointer'}
            onClick={() => carouselRef.current?.slideNext()}
            h="36px"
            w="36px"
            borderRadius={'full'}
            border="1px solid"
            borderColor={'matador_border_color.100'}
            bg="transparent"
          >
            <ArrowForwardIcon color="text" fontWeight={700} />
          </Center>
        </HStack>
      )}
    </Box>
  );

  return mainContent;

};

export default Plan;
