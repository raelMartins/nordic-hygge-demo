import {Box, Divider, Flex, HStack, Stack, Text, VStack} from '@chakra-ui/react';
import {formatToCurrency} from '@/utils';
import {Button, FormInput} from '@/ui-lib';
import {ArrowBackIcon, CloseIcon} from '@chakra-ui/icons';
import {useState} from 'react';
import {PaymentAccess} from '@/components/payment/PaymentAccess';
import {checkIfSFH} from '@/utils/misc';

export const PriceContentMobile = ({
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

  return (
    <>
      <Stack flex={`1`} h="100%" w={{base: `100%`, sm: `410px`, md: `450px`}} gap={`16px`}>
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
        <Text
          mt="16px"
          className="heading-text-medium"
          fontSize={'28px'}
          lineHeight={'140%'}
          textTransform={'uppercase'}
        >
          {unitData?.project?.name}
        </Text>

        <Stack gap={`0px`}>
          <Text
            fontSize={'13px'}
            fontWeight={500}
            color={`var(--Text-Subtext-colour-Dark-2, #A6A6A6)`}
            lineHeight={`150%`} /* 19.5px */
            letterSpacing={`0.26px`}
          >
            Price per fraction
          </Text>
          <Text
            className="heading-text-regular"
            fontSize={'33px'}
            fontWeight={700}
            overflow={`hidden`}
            leadingTrim={`both`}
            textEdge={`cap`}
            textOverflow={`ellipsis`}
            lineHeight={`140%`}
          >
            {formatToCurrency(unitData?.price_per_fraction)}
          </Text>
        </Stack>

        {progress_bar && (
          <Box w="full" bg="#1C1C2A" borderRadius={'4px'} px="10px" pb="9px">
            <Box
              mt="39px"
              // bg={appCurrentTheme === LIGHT ? 'rgba(0,0,0,.2)' : 'rgba(255,255,255,.2)'}
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

        <VStack
          w="full"
          justify={'space-between'}
          mt="20px"
          gap="16px"
          divider={<Divider borderColor={`matador_border_color.100 !important`} />}
        >
          {!is_detached && (
            <>
              {fractionalData?.fraction_data?.unit?.unit_title && (
                <HStack justify="space-between" w="full">
                  <Text fontSize={'13px'} fontWeight={500}>
                    Unit
                  </Text>
                  <Text fontSize={'16px'} fontWeight={500} textTransform="capitalize">
                    {fractionalData?.fraction_data?.unit?.unit_title}
                  </Text>
                </HStack>
              )}
            </>
          )}
          {unitData?.holding_period && (
            <HStack justify="space-between" w="full">
              <Text fontSize={'13px'} fontWeight={500}>
                Holding Period
              </Text>
              <Text fontSize={'16px'} fontWeight={500} textTransform="capitalize">
                {unitData?.holding_period}
              </Text>
            </HStack>
          )}
          <HStack justify="space-between" w="full">
            <Text fontSize={'13px'} fontWeight={500}>
              {`Investor's Packet`}
            </Text>
            <Text
              bg="#1C1C2A"
              p="4px 16px"
              fontSize={'16px'}
              fontWeight={500}
              cursor={'pointer'}
              onClick={() =>
                window.open(
                  `${
                    fractionalData?.packets?.[0]?.packet ? fractionalData?.packets?.[0]?.packet : ''
                  }`,
                  '_blank'
                )
              }
            >
              View
            </Text>
          </HStack>
          {fractionalData?.partners?.map((stakeholder, i) => (
            <HStack justify="space-between" w="full" key={i}>
              <Text fontSize={'13px'} fontWeight={500}>
                {stakeholder?.stakeholder_type ?? ''}
              </Text>
              <Text fontSize={'16px'} fontWeight={500} textTransform="capitalize">
                {stakeholder?.stakeholder_name ?? ''}
              </Text>
            </HStack>
          ))}
          {fractionalData?.extra_info?.dividend_payout && (
            <HStack justify="space-between" w="full">
              <Text fontSize={'13px'} fontWeight={500}>
                Payout Type
              </Text>
              <Text fontSize={'16px'} fontWeight={500} textTransform="capitalize">
                {fractionalData?.extra_info?.dividend_payout}
              </Text>
            </HStack>
          )}
          {Number(fractionalData?.extra_info?.dividend_amount) && (
            <HStack justify="space-between" w="full">
              <Text fontSize={'13px'} fontWeight={500}>
                Dividend
              </Text>
              <Text fontSize={'16px'} fontWeight={500} textTransform="capitalize">
                {formatToCurrency(fractionalData?.extra_info?.dividend_amount)}
              </Text>
            </HStack>
          )}
        </VStack>
        <Stack flexDir={`column`} mt="auto">
          <FormInput
            value={fractions}
            onChange={handleFractionInput}
            borderRadius={0}
            border={`none`}
            bg="#1C1C2A"
            h="48px"
            w={`100%`}
            type="number"
            label="How many fraction would you like to purchase?"
            flex={`1`}
            fontSize={`12px`}
            _placeholder={{color: `#a6a6a6`}}
          />
          {error ? (
            <Text fontSize={`12px`} fontWeight={`400`} lineHeight={`250%`} color="red">
              {error}
            </Text>
          ) : (
            <Flex
              justify={'space-between'}
              w="full"
              color={`#DDD`}
              fontSize={`12px`}
              fontWeight={`400`}
              lineHeight={`250%`}
            >
              <Text>Total Price</Text>
              <Text>{formatToCurrency(fractions * unitData?.price_per_fraction)}</Text>
            </Flex>
          )}
          <PaymentAccess
            checkFractions
            content={
              <Button
                variation={`primary`}
                // p={`13px 20px`}
                isDisabled={error || !Boolean(Number(fractions))}
                onClick={() => setStep('payment')}
                fontSize={`14px`}
                w={`100%`}
                boxStyle={{w: `100%`}}
              >
                Proceed to payment
              </Button>
            }
          />
        </Stack>
      </Stack>
    </>
  );
};
