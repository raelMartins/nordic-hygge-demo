import ThreeDots from '@/components/loaders/ThreeDots';
import {Button} from '@/ui-lib';
import {formatToCurrency} from '@/utils';
import {formatPaymentPlanInMonthsString, monthDayYear} from '@/utils/formatDate';
import {Center, Flex, HStack, Stack, Text, VStack} from '@chakra-ui/react';

export const ValidateSummaryView = ({
  asset,
  packet,
  closingCosts,
  loadingPacket,
  changeScreen,
  handleValidate,
}) => {
  return (
    <Stack
      w={{base: `100%`, lg: `412px`}}
      bg={`matador_background.200`}
      maxH={`600px`}
      p={{base: `24px`}}
      position={`relative`}
      boxShadow={`0px 7.92px 7.92px -3.96px rgba(16, 24, 40, 0.03), 0px 19.8px 23.76px -3.96px rgba(16, 24, 40, 0.08)`}
    >
      <Flex direction={`column`} h={`100%`} overflowY={`auto`} flex={`1`} gap={`10px`} px={`4px`}>
        <Text
          className="heading-text-regular"
          fontWeight={`600`}
          fontSize={'20px'}
          color={'text'}
          lineHeight={`140%`}
          letterSpacing={`0%`}
          textTransform={`uppercase`}
        >
          {asset?.unit?.unit_title}
        </Text>

        <Center
          h="112px"
          p={`16px`}
          w="full"
          color="text"
          border="1px solid"
          borderColor={'matador_border_color.100'}
          bg="matador_background.100"
          flexDir="column"
          gap={`4px `}
        >
          <Text
            color="matador_form.label"
            fontSize={{base: '13px'}}
            fontWeight={{base: `500`}}
            lineHeight={`135%`}
            letterSpacing={`4%`}
          >
            {asset?.payment_plan ? 'Offer Price' : 'Purchase price'}
          </Text>
          <Text
            color="text"
            fontSize={{base: '28px'}}
            fontWeight={`400`}
            line-height={`140%`}
            letter-spacing={`0%`}
          >
            {asset?.payment_plan
              ? formatToCurrency(asset?.payment_plan?.purchase_price)
              : formatToCurrency(asset?.total_unit_price)}
          </Text>
        </Center>

        <VStack
          spacing={'24px'}
          align={'stretch'}
          fontWeight={`500`}
          fontSize={`13.4px`}
          lineHeight={`135%`}
          letterSpacing={`4%`}
        >
          <HStack justify={'space-between'}>
            <Text color="matador_form.label">Payment Type</Text>
            <Text color="text">
              {asset?.payment_plan
                ? formatPaymentPlanInMonthsString(asset?.payment_plan?.payment_period_in_months)
                : 'Outright'}
            </Text>
          </HStack>

          {!asset?.payment_plan && (
            <HStack justify={'space-between'}>
              <Text color="matador_form.label">Offer Price</Text>
              <Text color="text">{formatToCurrency(asset?.offer_price)}</Text>
            </HStack>
          )}
          {!asset?.payment_plan && asset?.purchase_date ? (
            <HStack justify={'space-between'}>
              <Text color="matador_form.label">Purchase Date</Text>
              <Text color="text">{monthDayYear(asset?.purchase_date)}</Text>
            </HStack>
          ) : null}
          {/* {asset?.payment_plan ? (
            <HStack justify={'space-between'}>
              <Text color="matador_form.label">Payment Breakdown</Text>
              <Text
                cursor={`pointer`}
                color={'custom_color.color_pop'}
                onClick={() => changeScreen('breakdown')}
              >
                View
              </Text>
            </HStack>
          ) : null} */}
          {closingCosts?.map((el, i) => (
            <HStack key={i} justify={'space-between'}>
              <Text color="matador_form.label" textTransform={`capitalize`}>
                {el?.name}
              </Text>
              <Text color="text">{formatToCurrency(el?.amount)}</Text>
            </HStack>
          ))}

          {!packet?.packet && !loadingPacket ? null : (
            <HStack justify={'space-between'}>
              <Text color="matador_form.label">Terms of Agreement</Text>
              {loadingPacket ? (
                <ThreeDots />
              ) : (
                <Text
                  as={`a`}
                  color={'custom_color.color_pop'}
                  rel="noreferrer"
                  target="_blank"
                  href={packet?.packet}
                >
                  View
                </Text>
              )}
            </HStack>
          )}
        </VStack>
      </Flex>
      <Flex direction={`column`} gap={`8px`} pt={`20px`} position={`sticky`} bottom={`0px`}>
        <Button
          color="#DD4449"
          fontSize="16px"
          fontWeight="500"
          bg="matador_background.100"
          className={`tertiary-text`}
          lineHeight={`140%`}
          letterSpacing={`1%`}
          p={`12.5px`}
          border={`1px solid`}
          borderColor={`matador_border_color.100`}
          onClick={() => changeScreen('dispute')}
        >
          Something doesn’t look right
        </Button>
        <Button
          fontSize="16px"
          fontWeight="500"
          bg="custom_color.color"
          color="custom_color.contrast"
          // onClick={handleValidate}
          onClick={asset?.payment_plan ? () => changeScreen('breakdown') : handleValidate}
          className={`tertiary-text`}
          lineHeight={`140%`}
          letterSpacing={`1%`}
          p={`12.5px`}
        >
          This looks correct
        </Button>
      </Flex>
    </Stack>
  );
};
