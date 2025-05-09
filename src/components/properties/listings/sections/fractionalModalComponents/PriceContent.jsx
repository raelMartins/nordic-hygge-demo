import {
  Box,
  Center,
  Flex,
  HStack,
  Input,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import {formatToCurrency} from '@/utils';
import {Button} from '@/ui-lib';
import {ArrowBackIcon, CloseIcon} from '@chakra-ui/icons';
import {useState} from 'react';
import Image from 'next/image';
import {PaymentAccess} from '@/components/payment/PaymentAccess';
import {checkIfSFH} from '@/utils/misc';

export const PriceContent = ({
  progress_bar,
  unitData,
  fractionalData,
  go_back,
  close,
  fractions,
  setFractions,
  setStep,
  info,
}) => {
  const [error, setError] = useState('');

  const leftFractions = Number(unitData?.total_fractions);

  const fractionalPercent = Math.ceil(
    (Number(unitData?.total_purchased_fractions) /
      (Number(unitData?.total_fractions) + Number(unitData?.total_purchased_fractions))) *
      100
  ).toFixed(2);

  const handleFractionInput = e => {
    setError('');
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, '');

    if (numericValue > leftFractions)
      setError('Apologies, but you cannot purchase more fractions than are currently available.');
    setFractions(numericValue);
  };

  const is_detached = checkIfSFH(info);

  const top_row = [
    {
      title: `Price Per Fraction`,
      value: formatToCurrency(unitData?.price_per_fraction),
      show: true,
    },
    {
      title: `Unit Type`,
      value: unitData?.unit_title,
      show: !is_detached && unitData?.unit_title,
    },
    {
      title: `Dividend`,
      value: fractionalData?.extra_info?.dividend_amount
        ? formatToCurrency(fractionalData?.extra_info?.dividend_amount)
        : '-',
      show:
        fractionalData?.extra_info?.dividend_amount &&
        parseInt(fractionalData?.extra_info?.dividend_amount) !== 0,
    },
    {
      title: `Dividend Payout`,
      value: fractionalData?.extra_info?.dividend_payout,
      show: fractionalData?.extra_info?.dividend_payout ? true : false,
    },
    {
      title: `Holding Period`,
      value: unitData?.holding_period,
      show: unitData?.holding_period ? true : false,
    },
  ];
  return (
    <Stack className="sub-text-regular" w={{base: `100%`, lg: `740px`}}>
      <Flex direction="row" justify="space-between" gap={`12px`} align={'center'} mb="10px">
        <HStack gap={`12px`}>
          <ArrowBackIcon onClick={go_back} fontSize={`20px`} cursor={`pointer`} />
          <Text
            fontSize={{base: '23px', md: '28px'}}
            fontWeight={400}
            className="heading-text-regular"
          >
            Fractional Purchase
          </Text>
        </HStack>
        <CloseIcon onClick={close} cursor={`pointer`} />
      </Flex>
      <Flex gap={`16px`} align={`flex-start`} direction={{base: 'column', lg: `row`}}>
        {unitData?.photos?.[0]?.photo && (
          <Center
            pos={`relative`}
            boxSize={{base: `300px`, lg: `135px`}}
            minW={{base: `300px`, lg: `135px`}}
            bg={`#1C1C2A`}
            display={{base: `none`, lg: `flex`}}
          >
            <Image
              src={unitData?.photos?.[0]?.photo}
              alt={`fractional Image`}
              fill
              style={{objectFit: `cover`}}
            />
          </Center>
        )}
        <Stack w={`100%`}>
          <Flex justify={'space-between'} w="full" align={'center'}>
            <Text
              className="heading-text-regular"
              fontSize={'24px'}
              lineHeight={`120%`}
              textTransform="capitalize"
              fontWeight={`400`}
              letterSpacing={`-0.24px`}
            >
              {unitData?.project?.name}
            </Text>
          </Flex>
          {progress_bar && (
            <Box w="full" bg="#1C1C2A" borderRadius={'4px'} px="10px" pb="9px">
              <Box
                mt="39px"
                bg={'rgba(255,255,255,.2)'}
                w="full"
                h="10px"
                borderRadius={'full'}
                position={'relative'}
              >
                <Box
                  position={'absolute'}
                  h="20px"
                  w="2px"
                  bg="custom_color.dark_background_pop"
                  left={`${fractionalPercent}%`}
                  top="-5px"
                />

                <Text
                  position={'absolute'}
                  color="custom_color.dark_background_pop"
                  left={`${fractionalPercent}%`}
                  transform={`translateX(-${
                    fractionalPercent < 3 ? '0' : fractionalPercent > 95 ? '100' : '50'
                  }%)`}
                  top="-20px"
                  fontSize={`8px`}
                >
                  {`${fractionalPercent}%`}
                </Text>
                <Box
                  w={`${fractionalPercent}%`}
                  h="full"
                  bg="custom_color.dark_background_pop"
                  borderRadius={'20px 0px 0px 20px'}
                />
              </Box>
              <HStack w="full" align="center" justify={'space-between'} mt="10px" px="4px">
                <Text fontSize={'11px'} fontWeight={400}>
                  {unitData?.total_purchased_fractions} fraction
                  {unitData?.total_purchased_fractions != 1 && `s`} sold
                </Text>
                <Text fontSize={'11px'} fontWeight={400}>
                  {leftFractions} fraction{leftFractions != 1 && `s`} left
                </Text>
              </HStack>
            </Box>
          )}
        </Stack>
      </Flex>
      <Stack
        w="full"
        divider={<StackDivider border={`1px solid`} borderColor={`#fff`} m={`0px !important`} />}
      >
        <HStack gap={`35px`} py={`20px`} flexWrap={`wrap`}>
          {top_row?.map((el, i) => {
            return el.show ? (
              <Stack key={i}>
                <Text
                  fontSize={`11px`}
                  fontWeight={`400`}
                  lineHeight={`150%`}
                  letterSpacing={`0.33px`}
                >
                  {el.title}
                </Text>
                <Text
                  fontSize={'16px'}
                  fontWeight={`600`}
                  textTransform="capitalize"
                  lineHeight={`140%`}
                  letterSpacing={`0.16px`}
                  textAlign={`left`}
                >
                  {el.value}
                </Text>
              </Stack>
            ) : (
              <></>
            );
          })}
        </HStack>
        {fractionalData?.partners?.length > 0 && (
          <HStack gap={`35px`} py={`20px`} flexWrap={`wrap`}>
            {fractionalData?.partners?.map((el, i) => (
              <Stack key={i}>
                <Text
                  fontSize={'12px'}
                  fontWeight={`600`}
                  textTransform="capitalize"
                  lineHeight={`16px`}
                  letterSpacing={`-0.02em`}
                  textAlign={`left`}
                >
                  {el.stakeholder_name}
                </Text>
                <Text
                  fontSize={`12px`}
                  fontWeight={`500`}
                  lineHeight={`17px`}
                  letterSpacing={`0.01em`}
                  textTransform={`capitalize`}
                >
                  {el.stakeholder_type}
                </Text>
              </Stack>
            ))}
          </HStack>
        )}
      </Stack>

      <VStack align={'stretch'} w="full" spacing={'15px'} py={`20px`}>
        <Flex gap="20px" w="full">
          <Box flex={`1`} w={`100%`}>
            <Input
              value={fractions}
              onChange={handleFractionInput}
              borderRadius={0}
              border={`none`}
              bg="#1C1C2A"
              h="48px"
              w={`100%`}
              type="number"
              placeholder="How many fraction would you like to purchase?"
              flex={`1`}
              fontSize={`12px`}
              _placeholder={{color: `#a6a6a6`}}
            />
          </Box>
          <PaymentAccess
            checkFractions
            content={
              <Button
                variation={`primary`}
                isDisabled={error || !Boolean(Number(fractions))}
                onClick={() => setStep('payment')}
                fontSize={`14px`}
                w={`max-content`}
                boxStyle={{w: `max-content`}}
              >
                Proceed to payment
              </Button>
            }
          />
        </Flex>
        {error ? (
          <Text fontSize={'16px'} fontWeight={400} color="red">
            {error}
          </Text>
        ) : (
          <Flex justify={'space-between'} w="full">
            <Text fontSize={'16px'} fontWeight={400}>
              Total Price
            </Text>
            <Text fontSize={'16px'} fontWeight={400}>
              {formatToCurrency(fractions * unitData?.price_per_fraction)}
            </Text>
          </Flex>
        )}
      </VStack>
    </Stack>
  );
};

export default PriceContent;
