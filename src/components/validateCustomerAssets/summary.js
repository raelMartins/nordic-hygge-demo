import {formatToCurrency} from '../../utils';
import {Button, CustomizableButton} from '../../ui-lib';
import orangeAlertIcon from '../../images/icons/orange-alert-icon.svg';
import {
  Flex,
  Box,
  Text,
  VStack,
  Divider,
  HStack,
  Image,
  Spinner,
  Center,
  Stack,
  Heading,
  Link,
} from '@chakra-ui/react';
import {
  fetchAllPurchaseHistory,
  fetchInvestorPackets,
  fetchUpcomingPayments,
} from '../../api/payment';
import {useQuery} from 'react-query';
import {
  changeDateFormat,
  formatPaymentPlanInMonthsString,
  monthDayYear,
} from '../../utils/formatDate';
import ThreeDots from '../loaders/ThreeDots';
import {IoChevronForward, IoWarningOutline} from 'react-icons/io5';
import {EquityCard} from '../cards/EquityCard';
import {BiCaretRight} from 'react-icons/bi';
import {formatPropertySize} from '@/utils/misc';

const Summary = ({equityData, setType, customScrollbarStyles}) => {
  const HOME__OWNERS__PACKETS = useQuery(['fetchInvestorPackets', equityData?.id], () =>
    fetchInvestorPackets(equityData?.id)
  );
  const packet =
    HOME__OWNERS__PACKETS?.data?.data?.received?.length &&
    HOME__OWNERS__PACKETS?.data?.data?.received[0];

  const TRANSACTIONS_HISTORY = useQuery(['fetchAllPurchaseHistory', equityData?.id], () =>
    fetchAllPurchaseHistory(equityData?.id)
  );
  const UpcomingPayment = useQuery(['fetchUpcomingPayments', equityData?.id], () =>
    fetchUpcomingPayments(equityData?.id)
  );

  function getOrdinal(number) {
    if (typeof number !== 'number') {
      return ''; // Return an empty string for invalid inputs
    }

    const suffixes = ['th', 'st', 'nd', 'rd'];
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    // Special cases for 11, 12, and 13, as they don't follow the usual pattern
    if (lastTwoDigits === 11 || lastTwoDigits === 12 || lastTwoDigits === 13) {
      return number + 'th';
    }

    // Use the appropriate suffix based on the last digit
    const suffix = suffixes[lastDigit] || 'th';

    return number + suffix;
  }

  // const TRANSACTIONS_HISTORY_DATA = TRANSACTIONS_HISTORY?.data?.data?.reverse();

  const TRANSACTIONS_HISTORY_DATA = TRANSACTIONS_HISTORY.data?.data
    .filter(el => !el.is_fees)
    ?.toReversed();
  const future_payments = UpcomingPayment.data?.data?.data?.filter(el => !el.is_fees);
  const FEES_ARRAY = equityData?.equity_fees || [];

  return (
    equityData && (
      <>
        {/* <Box pb="20px" flex={`1`} display={`flex`} flexDir={`column`} px={{base: '18px', md: '24px'}}> */}

        <Flex
          direction={`column`}
          w="full"
          h={`100%`}
          overflowY={`auto`}
          flex={`1`}
          gap={`10px`}
          px={`4px`}
          pb={`20px`}
        >
          <HStack
            align="start"
            spacing="7.42px"
            p="10px"
            w="full"
            borderRadius="7px"
            border="0.5px solid"
            // bg="rgba(221, 68, 73, 0.1)"
            bg={`#F6E9DD`}
            color={`#F57404`}
          >
            {/* <Image src={orangeAlertIcon.src} alt="orange alert icon" /> */}
            <Center minW={`12px`}>
              <IoWarningOutline fontSize={`12px`} />
            </Center>

            <Text mt="-2px" fontSize="11.448px" fontWeight="300" color="#000">
              We kindly request your confirmation regarding the property, amount paid,{' '}
              {packet?.packet &&
                `ownership of
              the uploaded documents,`}{' '}
              and the transaction date. If any information is inaccurate, please initiate a dispute.
              However, if all details are accurate, we kindly ask you to proceed with validation.
            </Text>
          </HStack>
          <EquityCard
            equity={equityData}
            sub_text={equityData?.unit?.unit_title}
            handleClick={() => {}}
          />

          <Stack
            gap={`18px`}
            borderRadius={`8px`}
            border={`0.5px solid`}
            borderColor={`matador_border_color.100`}
            background={`matador_background.100`}
            p={{base: `17px 12px`}}
            color="matador_text.500"
            textTransform={`uppercase`}
            fontSize={`12px`}
            fontWeight={`400`}
            lineHeight={`140%`}
            letterSpacing={`0.24px`}
          >
            <Heading
              textAlign="center"
              textTransform={`uppercase`}
              className="heading-text-regular"
              color={`text`}
              fontSize={`16px`}
              fontStyle={`normal`}
              fontWeight={`700`}
              lineHeight={`167%`}
              letterSpacing={`1.731px`}
            >
              {equityData?.payment_plan
                ? formatPaymentPlanInMonthsString(
                    equityData?.payment_plan?.payment_period_in_months
                  )
                : 'Outright'}
            </Heading>
            {equityData?.offer_price ? (
              <HStack justify={'space-between'}>
                <Text>Offer Price</Text>
                <Text fontSize={'14px'}>{formatToCurrency(equityData?.offer_price)}</Text>
              </HStack>
            ) : (
              <Flex justify={'space-between'} align={'center'}>
                <Text>Price</Text>
                <Text fontSize={'14px'}>{formatToCurrency(equityData?.total_unit_price)}</Text>
              </Flex>
            )}

            {console.log({equityData})}
            {equityData?.purchase_date && (
              <HStack justify={'space-between'}>
                <Text>Purchase Date</Text>
                <Text textTransform={`capitalize`} fontSize={'14px'}>
                  {monthDayYear(equityData?.purchase_date)}
                </Text>
              </HStack>
            )}
            {equityData?.unit?.unit_size && (
              <HStack justify={'space-between'}>
                <Text>Unit Size</Text>
                <Text textTransform={`capitalize`} fontSize={'14px'}>
                  {formatPropertySize(equityData?.unit?.unit_size)}
                </Text>
              </HStack>
            )}

            {!packet?.packet && !HOME__OWNERS__PACKETS?.isLoading ? null : (
              <HStack justify={'space-between'}>
                <Text>Document</Text>
                {HOME__OWNERS__PACKETS?.isLoading ? (
                  <ThreeDots />
                ) : (
                  <Link
                    rel="noreferrer"
                    target="_blank"
                    href={packet?.packet}
                    color={`custom_color.color_pop`}
                    textTransform={`capitalize`}
                    fontWeight={`600`}
                  >
                    <HStack gap={`10px`}>
                      <Text>View</Text>
                      <BiCaretRight />
                    </HStack>
                  </Link>
                )}
              </HStack>
            )}
          </Stack>

          {equityData?.payment_plan && (
            <>
              {!TRANSACTIONS_HISTORY?.isLoading && !TRANSACTIONS_HISTORY_DATA?.length ? (
                <></>
              ) : (
                <Stack
                  gap={`18px`}
                  borderRadius={`8px`}
                  border={`0.5px solid`}
                  borderColor={`matador_border_color.100`}
                  background={`matador_background.100`}
                  p={{base: `17px 12px`}}
                  color="matador_text.500"
                  textTransform={`uppercase`}
                  fontSize={`12px`}
                  fontWeight={`400`}
                  lineHeight={`140%`}
                  letterSpacing={`0.24px`}
                >
                  <Heading
                    textAlign="center"
                    textTransform={`uppercase`}
                    className="heading-text-regular"
                    color={`text`}
                    fontSize={`16px`}
                    fontStyle={`normal`}
                    fontWeight={`700`}
                    lineHeight={`167%`}
                    letterSpacing={`1.731px`}
                  >
                    Past Payments
                  </Heading>
                  {TRANSACTIONS_HISTORY?.isLoading ? (
                    <ThreeDots />
                  ) : (
                    <>
                      {TRANSACTIONS_HISTORY_DATA?.length &&
                        TRANSACTIONS_HISTORY_DATA?.map((item, idx) => (
                          <>
                            <HStack key={idx} justify={'space-between'}>
                              <Text
                                fontSize={'14px'}
                                color={`matador_text.400`}
                                letterSpacing={`0.84px`}
                              >
                                {item?.created_at ? changeDateFormat(item.created_at) : '-'}
                              </Text>
                              {/* <Text>{getOrdinal(idx + 1)} payment</Text> */}
                              <Stack align={`flex-end`} gap={`8px`}>
                                <Text
                                  fontSize={'16px'}
                                  color={`text`}
                                  letterSpacing={`0.48px`}
                                  fontWeight={`600`}
                                  lineHeight={`100%`}
                                >
                                  {item?.amount ? formatToCurrency(item?.amount) : '-'}
                                </Text>
                                {/* <Text fontSize={'14px'}>
                                {item?.amount ? formatToCurrency(item?.amount) : '-'}
                              </Text> */}
                                {/* <Text fontSize={'10px'}>
                                {item?.created_at ? changeDateFormat(item.created_at) : '-'}
                              </Text> */}
                              </Stack>
                            </HStack>
                          </>
                        ))}
                    </>
                  )}
                </Stack>
              )}

              {!future_payments?.length ? (
                <></>
              ) : (
                <Stack
                  gap={`18px`}
                  borderRadius={`8px`}
                  border={`0.5px solid`}
                  borderColor={`matador_border_color.100`}
                  background={`matador_background.100`}
                  p={{base: `17px 12px`}}
                  color="matador_text.500"
                  textTransform={`uppercase`}
                  fontSize={`12px`}
                  fontWeight={`400`}
                  lineHeight={`140%`}
                  letterSpacing={`0.24px`}
                >
                  <Heading
                    textAlign="center"
                    textTransform={`uppercase`}
                    className="heading-text-regular"
                    color={`text`}
                    fontSize={`16px`}
                    fontStyle={`normal`}
                    fontWeight={`700`}
                    lineHeight={`167%`}
                    letterSpacing={`1.731px`}
                  >
                    Upcoming Payments
                  </Heading>
                  {UpcomingPayment?.isLoading ? (
                    <ThreeDots />
                  ) : (
                    <>
                      {future_payments?.length &&
                        future_payments?.map((item, idx) => (
                          <>
                            <HStack key={idx} justify={'space-between'}>
                              <Text
                                fontSize={'14px'}
                                color={`matador_text.400`}
                                letterSpacing={`0.84px`}
                              >
                                {item?.due_date
                                  ? changeDateFormat(item.due_date)
                                  : item?.created_at
                                  ? changeDateFormat(item.created_at)
                                  : '-'}
                              </Text>
                              <Stack align={`flex-end`} gap={`8px`}>
                                <Text
                                  fontSize={'16px'}
                                  color={`text`}
                                  letterSpacing={`0.48px`}
                                  fontWeight={`600`}
                                  lineHeight={`100%`}
                                >
                                  {item?.amount ? formatToCurrency(item?.amount) : '-'}
                                </Text>
                                {/* <Text fontSize={'14px'}>
                                {item?.amount ? formatToCurrency(item?.amount) : '-'}
                              </Text> */}
                                {/* <Text fontSize={'10px'}>
                                {item?.due_date ? changeDateFormat(item.due_date) : '-'}
                              </Text> */}
                              </Stack>
                            </HStack>
                          </>
                        ))}
                    </>
                  )}
                </Stack>
              )}

              {UpcomingPayment?.isLoading ||
              TRANSACTIONS_HISTORY?.isLoading ||
              !FEES_ARRAY?.length ? (
                <></>
              ) : (
                <Stack
                  gap={`18px`}
                  borderRadius={`8px`}
                  border={`0.5px solid`}
                  borderColor={`matador_border_color.100`}
                  background={`matador_background.100`}
                  p={{base: `17px 12px`}}
                  color="matador_text.500"
                  textTransform={`uppercase`}
                  fontSize={`12px`}
                  fontWeight={`400`}
                  lineHeight={`140%`}
                  letterSpacing={`0.24px`}
                >
                  <Heading
                    textAlign="center"
                    textTransform={`uppercase`}
                    className="heading-text-regular"
                    color={`text`}
                    fontSize={`16px`}
                    fontStyle={`normal`}
                    fontWeight={`700`}
                    lineHeight={`167%`}
                    letterSpacing={`1.731px`}
                  >
                    Closing Costs
                  </Heading>
                  {UpcomingPayment?.isLoading ? (
                    <ThreeDots />
                  ) : (
                    <>
                      {FEES_ARRAY?.length &&
                        FEES_ARRAY?.map((item, idx) => (
                          <>
                            <HStack key={idx} justify={'space-between'}>
                              <Text
                                fontSize={'14px'}
                                color={`matador_text.400`}
                                letterSpacing={`0.84px`}
                              >
                                {item?.name}
                              </Text>
                              <Stack align={`flex-end`} gap={`8px`}>
                                <Text
                                  fontSize={'16px'}
                                  color={`text`}
                                  letterSpacing={`0.48px`}
                                  fontWeight={`600`}
                                  lineHeight={`100%`}
                                >
                                  {item?.amount ? formatToCurrency(item?.amount) : '-'}
                                </Text>
                              </Stack>
                            </HStack>
                          </>
                        ))}
                    </>
                  )}
                </Stack>
              )}
            </>
          )}
        </Flex>
        <Flex w="full" gap="12px" mx={'auto'} py={`8px`}>
          <Button
            variation={`secondary`}
            fontSize="16px"
            fontWeight="500"
            onClick={() => setType('dispute')}
            h={`100%`}
          >
            Dispute
          </Button>
          <Button
            variation={`primary`}
            fontSize="16px"
            fontWeight="500"
            onClick={() => setType('validate')}
            boxStyle={{width: '100%'}}
          >
            Validate
          </Button>
        </Flex>
      </>
    )
  );
};

export default Summary;
