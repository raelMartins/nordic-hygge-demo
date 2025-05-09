import {Flex, Text, Stack, StackDivider, Center, Box, HStack} from '@chakra-ui/react';
import {formatToCurrency} from '@/utils';
import {IoArrowBack, IoArrowForward} from 'react-icons/io5';
import {Spinner} from '@/ui-lib';
import {ArrowBackIcon} from '@chakra-ui/icons';
import {action_box_header_style} from '../UnitActionBox';
import {useEffect} from 'react';
import ThreeDots from '@/components/loaders/ThreeDots';

const Type = ({
  setFullPayment,
  setStep,
  planLoading,
  PAYMENT_PLAN_DATA,
  setSelectedPlan,
  change_screen,
}) => {
  // useEffect(() => {
  //   if (fullPayment) {
  //     setStep('terms');
  //   }
  // }, [fullPayment]);

  const goBack = () => {
    const slider = document.getElementById(`plan_options_slider`);
    slider?.scrollBy(-slider.clientWidth || -300, 0);
  };

  const goForward = () => {
    const slider = document.getElementById(`plan_options_slider`);
    slider?.scrollBy(slider.clientWidth || 300, 0);
  };

  useEffect(() => {
    if (PAYMENT_PLAN_DATA && !PAYMENT_PLAN_DATA[0]?.id) {
      setStep('summary');
      setFullPayment(true);
      setSelectedPlan(null);
    }
  }, []);
  return (
    <>
      {planLoading || (PAYMENT_PLAN_DATA && !PAYMENT_PLAN_DATA[0]?.id) ? (
        <Center h={`300px`}>
          <ThreeDots darkBg boxSize={{base: '10px', md: '14px'}} />
        </Center>
      ) : (
        <Stack w="full" gap={{base: `20px`}} position={`relative`}>
          <Flex justify={'space-between'} align={'center'}>
            <HStack {...action_box_header_style}>
              <ArrowBackIcon
                fontSize={'25px'}
                cursor="pointer"
                color="#fff"
                onClick={() => change_screen('options')}
              />
              <Text>Payment Plans</Text>
            </HStack>
          </Flex>
          <Flex
            id={`plan_options_slider`}
            gap={{base: '16px'}}
            justify="space-between"
            align="stretch"
            direction={{base: 'row'}}
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
            overflowX="auto"
            scrollBehavior={`smooth`}
          >
            <Stack
              onClick={() => {
                setStep('summary');
                setFullPayment(true);
                setSelectedPlan(null);
              }}
              cursor="pointer"
              align={'center'}
              borderRadius="8px"
              bg={`#1C1C2A`}
              borderColor={`#24242B`}
              flex={`1`}
              // width={`158px`}
              // height={`304px`}
              padding={`38px 8px`}
              alignItems={`center`}
              gap={`48px`}
              justify={`space-between`}
              divider={<StackDivider />}
              minW={`158px`}
              maxW={`300px`}
            >
              <Text
                lineHeight={`120%`}
                fontSize={'24px'}
                fontWeight="400"
                textAlign={`center`}
                className="heading-text-regular"
                letterSpacing={`-0.24px`}
              >
                Outright Payment
              </Text>
              <Stack justify={'space-between'} align={'center'}>
                <Flex direction={'column'} align={`center`} justify={`center`} gap={`4px`}>
                  <Text
                    fontWeight={400}
                    fontSize={'13px'}
                    lineHeight={`150%`}
                    letterSpacing={`0.26px`}
                    color={`#A1A1AA`}
                  >
                    Purchase Price
                  </Text>
                  <Text
                    fontWeight={400}
                    fontSize={'16px'}
                    lineHeight={`160%`}
                    letterSpacing={`.32px`}
                  >
                    {formatToCurrency(PAYMENT_PLAN_DATA?.[0]?.bundle?.price)}
                  </Text>
                </Flex>
              </Stack>
            </Stack>
            {PAYMENT_PLAN_DATA?.map((item, i) => (
              <Stack
                minW={`158px`}
                maxW={`300px`}
                key={i}
                cursor="pointer"
                align={'center'}
                borderRadius="8px"
                bg={`#1C1C2A`}
                borderColor={`#24242B`}
                flex={`1`}
                padding={`38px 8px`}
                alignItems={`center`}
                gap={`20px`}
                onClick={() => {
                  setStep('summary');
                  setFullPayment(false);
                  setSelectedPlan(item);
                }}
                justify={`space-between`}
                divider={<StackDivider />}
                scrollSnapAlign={i % 2 == 1 && `start`}
                display={!item?.payment_period_in_months && `none`}
              >
                <Text
                  lineHeight={`120%`}
                  fontSize={'24px'}
                  fontWeight="400"
                  textAlign={`center`}
                  className="heading-text-regular"
                  letterSpacing={`-0.24px`}
                >
                  {item?.payment_period_in_months} Months
                </Text>
                <Stack justify={'space-between'} align={'center'} gap={`20px`}>
                  <Flex direction={'column'} align={`center`} justify={`center`} gap={`4px`}>
                    <Text
                      fontWeight={400}
                      fontSize={'13px'}
                      lineHeight={`150%`}
                      letterSpacing={`0.26px`}
                      color={`#A1A1AA`}
                    >
                      Purchase Price
                    </Text>
                    <Text
                      fontWeight={400}
                      fontSize={'16px'}
                      lineHeight={`160%`}
                      letterSpacing={`.32px`}
                    >
                      {formatToCurrency(item?.purchase_price)}
                    </Text>
                  </Flex>
                  <Flex direction={'column'} align={`center`} justify={`center`}>
                    <Text
                      fontWeight={400}
                      fontSize={'13px'}
                      lineHeight={`150%`}
                      letterSpacing={`0.26px`}
                      color={`#A1A1AA`}
                    >
                      Initial Deposit
                    </Text>
                    <Text
                      fontWeight={400}
                      fontSize={'16px'}
                      lineHeight={`160%`}
                      letterSpacing={`.32px`}
                    >
                      {formatToCurrency(item?.initial_deposit_in_value)}
                    </Text>
                  </Flex>
                  {item?.plan_type === 'manual' && item?.payment_frequency !== 'flexible' ? (
                    <Flex direction={'column'} align={`center`} justify={`center`}>
                      <Text
                        fontWeight={400}
                        fontSize={'13px'}
                        lineHeight={`150%`}
                        letterSpacing={`0.26px`}
                        color={`#A1A1AA`}
                      >
                        {item?.payment_frequency
                          ? item?.payment_frequency?.charAt(0).toUpperCase() +
                            item?.payment_frequency?.slice(1) +
                            ' Payment'
                          : 'Periodic Payment'}
                      </Text>
                      <Text
                        fontWeight={400}
                        fontSize={'16px'}
                        lineHeight={`160%`}
                        letterSpacing={`.32px`}
                      >
                        {formatToCurrency(item?.periodic_payment)}
                      </Text>
                    </Flex>
                  ) : (
                    <Box w="30%" />
                  )}
                </Stack>
              </Stack>
            ))}
          </Flex>
          {PAYMENT_PLAN_DATA?.length > 1 && (
            <HStack gap={`10px`} justify={`flex-end`} mt={`20px`}>
              <Center
                cursor={`pointer`}
                bg={`#1C1C2A`}
                boxSize={`32px`}
                borderRadius={`50%`}
                fontSize={`18px`}
                onClick={goBack}
              >
                <IoArrowBack />
              </Center>
              <Center
                cursor={`pointer`}
                bg={`#1C1C2A`}
                boxSize={`32px`}
                borderRadius={`50%`}
                fontSize={`18px`}
                onClick={goForward}
              >
                <IoArrowForward />
              </Center>
            </HStack>
          )}
        </Stack>
      )}
    </>
  );
};

export default Type;
