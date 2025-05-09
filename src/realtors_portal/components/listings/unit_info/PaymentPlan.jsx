import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import twoCards from '@/realtors_portal/images/icons/twocards.svg';
import {formatAmount, formatToCurrency} from '@/realtors_portal/utils/';
import {RButton} from '@/realtors_portal/ui-lib';
import {PaymentPlanIcon} from '../../assets/UsefulSVGs';
import {ChevronRightIcon} from '@chakra-ui/icons';

export const PaymentPlan = ({PAYMENT_PLAN_DATA}) => {
  const capitalizeFirstLetter = string => {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  };

  const PlanCard = ({unit, index}) => {
    return (
      <>
        {/* Desktop */}
        <Stack
          key={index}
          bg="#fff"
          p={{base: '16px 15px', md: '28px 26px'}}
          minH="fit-content"
          // h={`100%`}
          spacing="35.2px"
          borderRadius={{base: `6px`, lg: '12px'}}
          border="1px solid #EAECF0"
          minW={'max-content`'}
          maxW={{base: `250px`, md: '411px'}}
          gap={{base: `16px`, lg: `35.2px`}}
          display={{base: `none`, md: `flex`}}
        >
          <HStack justify="space-between" w="full" align="center">
            <Stack spacing="1.7px" align={'start'}>
              <Text
                textTransform="capitalize"
                fontSize={{base: `19px`, md: '30.8px'}}
                fontWeight="600"
                lineHeight={{base: `140%`}}
                letterSpacing={{base: `0.16px`}}
              >
                {unit?.payment_period_in_months} Months
              </Text>
              <Text
                fontSize={{base: `11px`, md: '15.4px'}}
                fontWeight="400"
                color="#52525B"
                lineHeight={{base: `150%`}}
                letterSpacing={{base: `0.33px`}}
              >
                Duration
              </Text>
            </Stack>
            <PaymentPlanIcon />{' '}
          </HStack>
          <SimpleGrid columns={2} w="full" gap={{base: `16px`, md: '35.2px'}} flex={`1`}>
            <Stack
              gap={{base: '2px', lg: `4px`}}
              align={'start'}
              lineHeight={{base: `150%`}}
              letterSpacing={{base: `.3px`}}
            >
              <Text
                fontSize={{base: '10px', md: '15.4px'}}
                fontWeight="400"
                color={{base: '#52525B', lg: `#606060`}}
              >
                Purchase Price
              </Text>
              <Text fontSize={{base: '13px', md: '19.8px'}} fontWeight="500">
                {formatToCurrency(unit?.purchase_price)}
              </Text>
            </Stack>
            <Stack
              gap={{base: '2px', lg: `4px`}}
              align={'start'}
              lineHeight={{base: `150%`}}
              letterSpacing={{base: `.3px`}}
            >
              <Text
                fontSize={{base: '10px', md: '15.4px'}}
                fontWeight="400"
                color={{base: '#52525B', lg: `#606060`}}
              >
                Initial Deposit
              </Text>
              <Text fontSize={{base: '12px', md: '19.8px'}} fontWeight="500">
                {formatToCurrency(unit?.initial_deposit_in_value)}
              </Text>
            </Stack>
            {unit.plan_type == 'custom' ||
            unit?.payment_frequency?.toLowerCase() == 'flexible' ? null : (
              <Stack
                gap={{base: '2px', lg: `4px`}}
                align={'start'}
                lineHeight={{base: `150%`}}
                letterSpacing={{base: `.3px`}}
              >
                <Text
                  fontSize={{base: '10px', md: '15.4px'}}
                  w={'full'}
                  whiteSpace={'nowrap'}
                  fontWeight="400"
                  color={{base: '#52525B', lg: `#606060`}}
                >
                  Installment payment
                </Text>
                <Text fontSize={{base: '12px', md: '19.8px'}} fontWeight="500">
                  {formatToCurrency(unit?.periodic_payment)}
                </Text>
              </Stack>
            )}
            {unit.plan_type !== 'custom' && unit?.payment_frequency !== null ? (
              <Stack
                gap={{base: '2px', lg: `4px`}}
                align={'start'}
                lineHeight={{base: `150%`}}
                letterSpacing={{base: `.3px`}}
              >
                <Text
                  fontSize={{base: '10px', md: '15.4px'}}
                  w={'full'}
                  whiteSpace={'nowrap'}
                  fontWeight="400"
                  color={{base: '#52525B', lg: `#606060`}}
                >
                  Payment Frequency
                </Text>
                <Text fontSize={{base: '12px', md: '19.8px'}} fontWeight="500">
                  {capitalizeFirstLetter(unit?.payment_frequency)}
                </Text>
              </Stack>
            ) : null}
          </SimpleGrid>
          <RButton
            variation={`secondary`}
            fontSize={{base: '13px', lg: `16px`}}
            fontWeight={{base: '500'}}
            onClick={() =>
              window.open(`${unit?.contract?.length ? unit?.contract?.[0] : ''}`, '_blank')
            }
            p={{base: `8px 12px`}}
            lineHeight={{base: `150%`}}
            letterSpacing={{base: `.3px`, lg: `.16px`}}
          >
            View contract
          </RButton>
        </Stack>
        {/* Mobile */}
        <Stack
          key={index}
          bg="#fff"
          h="fit-content"
          spacing="35.2px"
          borderRadius={{base: `6px`, lg: '12px'}}
          border="1px solid"
          borderColor={`#F4F4F5`}
          minW={'max-content`'}
          maxW={{base: '385px'}}
          gap={{base: `0px`}}
          display={{base: `flex`, md: `none`}}
        >
          <HStack justify="space-between" p={`12px`} borderBottom={`1px solid #F4F4F5`}>
            <Text
              textTransform="capitalize"
              fontSize={{base: `16px`}}
              fontWeight="500"
              lineHeight={{base: `100%`}}
              letterSpacing={{base: `0%`}}
            >
              {unit?.payment_period_in_months} Months Plan
            </Text>
            <Center
              fontSize={`20px`}
              onClick={() =>
                window.open(`${unit?.contract?.length ? unit?.contract?.[0] : ''}`, '_blank')
              }
            >
              <ChevronRightIcon />
            </Center>
          </HStack>
          <HStack
            w="full"
            divider={<StackDivider borderColor={`#F4F4F5 !important`} m={`0px !important`} />}
            textAlign={'center'}
            lineHeight={{base: `100%`}}
          >
            <VStack flex={`1`} gap={`4px`} p={`16px`}>
              <Text fontWeight={`500`} fontSize={`14px`} letterSpacing={`-2%`}>
                {formatToCurrency(unit?.initial_deposit_in_value)}
              </Text>
              <Text minW={'max-content`'} fontWeight={`400`} fontSize={`10px`} letterSpacing={`0%`}>
                Initial Deposit
              </Text>
            </VStack>
            <VStack flex={`1`} gap={`4px`} p={`16px`}>
              <Text fontWeight={`500`} fontSize={`14px`} letterSpacing={`-2%`}>
                {formatToCurrency(unit?.periodic_payment)}
              </Text>
              <Text minW={'max-content`'} fontWeight={`400`} fontSize={`10px`} letterSpacing={`0%`}>
                Installment payment
              </Text>
            </VStack>
          </HStack>
        </Stack>
      </>
    );
  };

  return (
    <Stack gap={{base: `8px`, lg: `25px`}}>
      <Text
        fontSize={{base: '16px', lg: '33px'}}
        fontWeight={{base: `600`, lg: '500'}}
        color={{base: `#191919`, lg: '#27272A'}}
        lineHeight={{base: `140%`, lg: '130%'}}
        letterSpacing={{base: `.16px`}}
      >
        Payment Plan
      </Text>

      <Box
        w={'100%'}
        maxW={'100%'}
        overflowX={'auto'}
        css={{
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Flex
          align={{base: `stretch`}}
          direction={{base: `column`, md: `row`}}
          gap={{base: `13px`, lg: '22px'}}
          minWidth="max-content"
        >
          {PAYMENT_PLAN_DATA?.length > 0 &&
            PAYMENT_PLAN_DATA?.map((unit, index) => (
              <PlanCard unit={unit} index={index} key={index} />
            ))}
        </Flex>
      </Box>
    </Stack>
  );
};

export default PaymentPlan;
