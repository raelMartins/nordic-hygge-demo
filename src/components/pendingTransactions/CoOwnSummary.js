import React from 'react';
import {
  Flex,
  Box,
  Text,
  VStack,
  Image,
  HStack,
  Icon,
  Center,
  Stack,
  StackDivider,
  Link,
} from '@chakra-ui/react';
import {Button, Spinner} from '@/ui-lib';
import {formatToCurrency} from '@/utils';
import {BiCaretRight} from 'react-icons/bi';
import {useQuery} from 'react-query';
import {fetchInvestorPackets} from '@/api/payment';
import {formatDateToString} from '@/utils/formatDate';
import {calculateSharedValue} from '@/utils/calculateFee';
import orangeAlertIcon from '@/images/icons/orange-alert-icon.svg';
import {fetchIndividualCoOwnershipData} from '@/api/co_owners';
import ThreeDots from '../loaders/ThreeDots';
import {IoChevronForward} from 'react-icons/io5';
import useGetSession from '@/utils/hooks/getSession';
import {useCustomToast} from '../CustomToast';
import {PaymentAccess} from '../payment/PaymentAccess';
import {formatPropertySize} from '@/utils/misc';

const CoOwnSummary = ({
  asset,
  setType,
  coowners,
  coOwnerLoading,
  customScrollbarStyles,
  isTheHost,
  setAmountToPay,
}) => {
  const {sessionData: LoggedinUser} = useGetSession('loggedIn');

  const toast = useCustomToast();
  const HOME__OWNERS__PACKETS = useQuery(['fetchInvestorPackets', asset?.id], () =>
    fetchInvestorPackets(asset?.id)
  );
  const packet =
    HOME__OWNERS__PACKETS?.data?.data?.received?.length &&
    HOME__OWNERS__PACKETS?.data?.data?.received[0];
  const coownerInfo = coowners?.length
    ? coowners.find(item => item?.invitee?.id == LoggedinUser?.user?.id)
    : null;
  const sharedUnitPrice = calculateSharedValue(asset?.total_unit_price, coownerInfo?.equity_value);
  const sharedInitialDeposit = calculateSharedValue(
    asset?.payment_plan?.initial_deposit_in_value,
    coownerInfo?.equity_value
  );

  const loggedInCoownerInfo = useQuery(['coownerInfo', LoggedinUser?.user?.id, asset?.id], () =>
    fetchIndividualCoOwnershipData(asset?.id, LoggedinUser?.user?.id)
  );
  const loggedInCoownerData = loggedInCoownerInfo?.data?.data;

  const paymentPlanIndividualPercentage =
    (Number(loggedInCoownerData?.user_amount_paid) / Number(sharedInitialDeposit)) * 100;
  const paymentPlanGroupPercentage =
    (Number(asset?.amount_paid) / Number(asset?.payment_plan?.initial_deposit_in_value)) * 100;
  const outrightIndividualPercentage =
    (Number(loggedInCoownerData?.user_amount_paid) / Number(sharedUnitPrice)) * 100;
  const outrightGroupPercentage =
    (Number(asset?.amount_paid) / Number(asset?.total_unit_price)) * 100;

  const toaster = msg =>
    toast({
      description: msg,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });

  const handleProceed = () => {
    if (!asset?.offer_started && asset?.owner?.id !== LoggedinUser?.user?.id) {
      toaster(`Before you can proceed, the Host needs to initialize a payment.`);
    } else if (!asset?.all_invitees_accepted) {
      toaster(
        'Before starting the payment process, all invitees are expected to respond to the invite'
      );
    } else {
      setAmountToPay(asset?.payment_plan ? sharedInitialDeposit : sharedUnitPrice);
      setType('payment');
    }
  };

  return (
    <Box h={'fit-content'} overflowY="auto" __css={customScrollbarStyles}>
      {coOwnerLoading ? (
        <Center w="full" h="full">
          <Spinner disableAbsoluteCenteredSpinner h={{base: `50px`}} w={{base: `50px`}} />
        </Center>
      ) : asset?.payment_plan ? (
        <Box w="full">
          {asset?.offer_started ? (
            <HStack
              mb="10px"
              align="start"
              spacing="7.42px"
              p="10px"
              w="full"
              borderRadius="7.42px"
              border="0.5px solid #F57403"
              bg="rgba(245, 116, 3, 0.10)"
            >
              <Image src={orangeAlertIcon.src} alt="orange alert icon" />
              <Text color="text" mt="-2px" fontSize="11.448px" fontWeight="300">
                The payment made is still below the required initial deposit If the payment is not
                made by other co-owners before the exp. date or in the event of a price change, the
                amount already paid will be refunded.
              </Text>
            </HStack>
          ) : null}

          <Text
            fontWeight={500}
            fontSize={'22px'}
            color={'text'}
            mb="15px"
            className="heading-text-regular"
          >
            {asset?.project?.name}
          </Text>
          {asset?.offer_started ? (
            <>
              <Flex
                mt="20px"
                h="130px"
                w="full"
                border="1px solid"
                borderColor={'matador_border_color.100'}
                bg="matador_background.100"
                color={`text`}
                align={'center'}
                justify={'center'}
                direction="column"
                px="10px"
              >
                <Text
                  color="text"
                  fontSize={{base: '14px', md: '18px'}}
                  fontWeight={400}
                  className="sub-text-regular"
                >
                  {`Total${asset?.payment_plan ? ' Initial Deposit' : ''} Paid`}
                </Text>
                <Text
                  color="text"
                  fontSize={{base: '28px', md: '34px'}}
                  fontWeight={500}
                  className="heading-text-regular"
                >
                  {formatToCurrency(asset?.amount_paid)}
                </Text>

                <Flex
                  px="10px"
                  alignSelf={'flex-end'}
                  w="full"
                  justify={'space-between'}
                  align={'flex-end'}
                >
                  <Text fontSize={'11px'} fontWeight={400}>
                    Group Payment Progress
                  </Text>
                  <Text fontSize={'11px'} fontWeight={400}>
                    {paymentPlanGroupPercentage}%
                  </Text>
                </Flex>
                <Box bg="fill" w="full" h="5.4px" borderRadius={'full'} mt="4px" p="0">
                  <Box
                    h="5.4px"
                    w={`${paymentPlanGroupPercentage}%`}
                    borderRadius={'full'}
                    bg="text"
                  />
                </Box>
              </Flex>

              <Flex
                mt="20px"
                h="130px"
                w="full"
                border="1px solid"
                borderColor={'matador_border_color.100'}
                bg="matador_background.100"
                color={`text`}
                align={'center'}
                justify={'center'}
                direction="column"
                px="10px"
              >
                <Text
                  color="text"
                  fontSize={{base: '14px', md: '18px'}}
                  fontWeight={400}
                  className="sub-text-regular"
                >
                  {`Total${asset?.payment_plan ? ' Initial Deposit' : ''} Paid`}
                </Text>
                <Text
                  color="text"
                  fontSize={{base: '28px', md: '34px'}}
                  fontWeight={500}
                  className="heading-text-regular"
                >
                  {formatToCurrency(loggedInCoownerData?.user_amount_paid)}
                </Text>

                <Flex alignSelf={'flex-end'} w="full" justify={'space-between'} align={'flex-end'}>
                  <Text fontSize={'11px'} fontWeight={400}>
                    Individual Payment Progress
                  </Text>
                  <Text fontSize={'11px'} fontWeight={400}>
                    {paymentPlanIndividualPercentage}%
                  </Text>
                </Flex>
                <Box bg="fill" w="full" h="5.4px" borderRadius={'full'} mt="4px" p="0">
                  <Box
                    h="5.4px"
                    w={`${paymentPlanIndividualPercentage}%`}
                    borderRadius={'full'}
                    bg="text"
                  />
                </Box>
              </Flex>
            </>
          ) : (
            <>
              <Flex
                mt="20px"
                h="130px"
                w="full"
                border="1px solid"
                borderColor={'matador_border_color.100'}
                bg="matador_background.100"
                color={`text`}
                align={'center'}
                justify={'center'}
                direction="column"
              >
                <Text
                  color="text"
                  fontSize={{base: '14px', md: '18px'}}
                  fontWeight={400}
                  className="sub-text-regular"
                >
                  Initial deposit
                </Text>
                <Text
                  color="text"
                  fontSize={{base: '28px', md: '34px'}}
                  fontWeight={500}
                  className="heading-text-regular"
                >
                  {formatToCurrency(asset?.payment_plan?.initial_deposit_in_value)}
                </Text>
              </Flex>

              <Flex
                mt="20px"
                h="130px"
                w="full"
                border="1px solid"
                borderColor={'matador_border_color.100'}
                bg="matador_background.100"
                color={`text`}
                align={'center'}
                justify={'center'}
                direction="column"
              >
                <Text
                  color="text"
                  fontSize={{base: '14px', md: '18px'}}
                  fontWeight={400}
                  className="sub-text-regular"
                >
                  Shared Initial Deposit
                </Text>
                <Text
                  color="text"
                  fontSize={{base: '28px', md: '34px'}}
                  fontWeight={500}
                  className="heading-text-regular"
                >
                  {formatToCurrency(sharedInitialDeposit)}
                </Text>
              </Flex>
            </>
          )}

          <VStack
            align={'stretch'}
            mt="20px"
            spacing={'24px'}
            fontWeight={500}
            className="sub-text-regular"
          >
            <Flex justify={'space-between'} align={'center'}>
              <Text color="matador_form.label" fontSize={'12px'}>
                Split Ownership
              </Text>
              <Text color="text" fontSize={'13px'}>{`${coownerInfo?.equity_value ?? '-'}%`}</Text>
            </Flex>
            <Flex justify={'space-between'} align={'center'}>
              <Text color="matador_form.label" fontSize={'12px'}>
                Unit Size
              </Text>
              <Text color="text" fontSize={'13px'}>
                {formatPropertySize(asset?.unit?.unit_size)}
              </Text>
            </Flex>
            <Flex justify={'space-between'} align={'center'}>
              <Text color="matador_form.label" fontSize={'12px'}>
                Unit Type
              </Text>
              <Text color="text" fontSize={'13px'}>
                {asset?.unit?.unit_title ?? '-'}
              </Text>
            </Flex>
            {!packet?.packet && !HOME__OWNERS__PACKETS?.isLoading ? null : (
              <Flex justify={'space-between'} align={'center'}>
                <Text color="matador_form.label" fontSize={'12px'}>
                  Terms of Agreement
                </Text>
                {HOME__OWNERS__PACKETS?.isLoading ? (
                  <ThreeDots />
                ) : (
                  <a rel="noreferrer" target="_blank" href={packet?.packet}>
                    <Button
                      border="1px solid !important"
                      h="22px"
                      w="50px"
                      bg="transparent"
                      borderColor="text"
                    >
                      <Text color={'text'} fontWeight={300} fontSize={'12px'}>
                        View
                      </Text>
                    </Button>
                  </a>
                )}
              </Flex>
            )}
            <Flex justify={'space-between'} align={'center'}>
              <Text color="matador_form.label" fontSize={'12px'}>
                Offer Date
              </Text>
              <Text color="text" fontSize={'13px'}>
                {formatDateToString(asset?.created_at)}
              </Text>
            </Flex>
            <Flex justify={'space-between'} align={'center'}>
              <Text color="matador_form.label" fontSize={'12px'}>
                Offer Expiration Date
              </Text>
              <Text color="text" fontSize={'13px'}>
                {formatDateToString(asset?.offer_expires)}
              </Text>
            </Flex>

            {isTheHost && (
              <Flex justify={'space-between'} align={'center'}>
                <Text color="matador_form.label" fontSize={'12px'}>
                  Co-owners
                </Text>
                <Button
                  border="1px solid"
                  h="22px"
                  w="50px"
                  bg="transparent"
                  borderColor="text"
                  onClick={() => setType('coOwnersList')}
                >
                  <Text color={'text'} fontWeight={300} fontSize={'12px'}>
                    View
                  </Text>
                </Button>
              </Flex>
            )}
          </VStack>

          {asset?.payment_plan?.plan_type === 'custom' && (
            <Flex
              mt="8px"
              py="12px"
              px="16px"
              align={'center'}
              justify={'space-between'}
              borderRadius={'2px'}
              cursor={'pointer'}
              border="1px solid"
              borderColor={`matador_border_color.100`}
              onClick={() => setType('breakdown')}
            >
              <Text color="matador_text.500" fontSize={'14px'} fontWeight={400}>
                Payment Breakdown
              </Text>
              <HStack align={'center'} justify={'center'} spacing={0}>
                <Text color="matador_text.500" fontSize={'14px'} fontWeight={500}>
                  View
                </Text>
                <Icon as={BiCaretRight} color="text" fontSize={'25px'} />
              </HStack>
            </Flex>
          )}

          <PaymentAccess
            content={
              <Button
                h="48px"
                w="full"
                mt="30px"
                bg="custom_color.color"
                color="custom_color.contrast"
                onClick={handleProceed}
              >
                Proceed to Payment
              </Button>
            }
          />
        </Box>
      ) : (
        <Box w="full">
          <Stack gap={`12px`}>
            {asset?.offer_started ? (
              <>
                <Flex
                  w="full"
                  color="text"
                  border="1px solid"
                  bg="matador_background.100"
                  borderColor={'matador_border_color.100'}
                  align={'center'}
                  justify={'center'}
                  direction="column"
                  p={{base: `24.5px`}}
                  gap={`8px`}
                >
                  <Text fontSize={{base: '14px'}} fontWeight={`400`} className="sub-text-regular">
                    {`Total${asset?.payment_plan ? ' Initial Deposit' : ''} Paid`}
                  </Text>
                  <Text
                    fontSize={{base: '24px'}}
                    fontStyle={`normal`}
                    fontWeight={`600`}
                    lineHeight={`100%`}
                    letterSpacing={`0.48px`}
                  >
                    {formatToCurrency(asset?.amount_paid)}
                  </Text>

                  <Flex
                    alignSelf={'flex-end'}
                    w="full"
                    justify={'space-between'}
                    align={'flex-end'}
                  >
                    <Text fontSize={'11px'} fontWeight={400}>
                      Group Payment Progress
                    </Text>
                    <Text fontSize={'11px'} fontWeight={400}>
                      {outrightGroupPercentage}%
                    </Text>
                  </Flex>
                  <Box bg="fill" w="full" h="5.4px" borderRadius={'full'} mt="4px" p="0">
                    <Box
                      h="5.4px"
                      w={`${outrightGroupPercentage}%`}
                      borderRadius={'full'}
                      bg="text"
                    />
                  </Box>
                </Flex>

                <Flex
                  w="full"
                  color="text"
                  border="1px solid"
                  bg="matador_background.100"
                  borderColor={'matador_border_color.100'}
                  align={'center'}
                  justify={'center'}
                  direction="column"
                  p={{base: `24.5px`}}
                  gap={`8px`}
                >
                  <Text fontSize={{base: '14px'}} fontWeight={`400`} className="sub-text-regular">
                    {`Total${asset?.payment_plan ? ' Initial Deposit' : ''} Paid`}
                  </Text>
                  <Text
                    fontSize={{base: '24px'}}
                    fontStyle={`normal`}
                    fontWeight={`600`}
                    lineHeight={`100%`}
                    letterSpacing={`0.48px`}
                  >
                    {formatToCurrency(loggedInCoownerData?.user_amount_paid)}
                  </Text>

                  <Flex
                    alignSelf={'flex-end'}
                    w="full"
                    justify={'space-between'}
                    align={'flex-end'}
                  >
                    <Text fontSize={'11px'} fontWeight={400}>
                      Individual Payment Progress
                    </Text>
                    <Text fontSize={'11px'} fontWeight={400}>
                      {outrightIndividualPercentage}%
                    </Text>
                  </Flex>
                  <Box bg="fill" w="full" h="5.4px" borderRadius={'full'} mt="4px" p="0">
                    <Box
                      h="5.4px"
                      w={`${outrightIndividualPercentage}%`}
                      borderRadius={'full'}
                      bg="text"
                    />
                  </Box>
                </Flex>
              </>
            ) : (
              <>
                <Flex
                  w="full"
                  color="text"
                  border="1px solid"
                  bg="matador_background.100"
                  borderColor={'matador_border_color.100'}
                  align={'center'}
                  justify={'center'}
                  direction="column"
                  p={{base: `24.5px`}}
                  gap={`8px`}
                >
                  <Text fontSize={{base: '14px'}} fontWeight={`400`} className="sub-text-regular">
                    Total unit price{' '}
                  </Text>
                  <Text
                    fontSize={{base: '24px'}}
                    fontStyle={`normal`}
                    fontWeight={`600`}
                    lineHeight={`100%`}
                    letterSpacing={`0.48px`}
                  >
                    {formatToCurrency(asset?.total_unit_price)}{' '}
                  </Text>
                </Flex>
                <Flex
                  w="full"
                  color="text"
                  border="1px solid"
                  bg="matador_background.100"
                  borderColor={'matador_border_color.100'}
                  align={'center'}
                  justify={'center'}
                  direction="column"
                  p={{base: `24.5px`}}
                  gap={`8px`}
                >
                  <Text fontSize={{base: '14px'}} fontWeight={`400`} className="sub-text-regular">
                    Shared Unit price
                  </Text>
                  <Text
                    fontSize={{base: '24px'}}
                    fontStyle={`normal`}
                    fontWeight={`600`}
                    lineHeight={`100%`}
                    letterSpacing={`0.48px`}
                  >
                    {formatToCurrency(sharedUnitPrice)}
                  </Text>
                </Flex>
              </>
            )}
          </Stack>

          <Stack gap={`12px`} mt={`12px`}>
            <Stack
              w="full"
              gap={'0px'}
              mt="0px"
              border="1px solid"
              borderColor={'matador_border_color.100'}
              divider={<StackDivider borderColor={'matador_border_color.100'} />}
              p={{base: `8px 20px`}}
            >
              <Flex w="full" p="12px 0px" align={'center'} justify={'space-between'}>
                <Text color="matador_text.400" fontSize={'14px'} fontWeight={400}>
                  Split Ownership{' '}
                </Text>
                <Text color="text" fontSize={'16px'} fontWeight={600}>
                  {coownerInfo?.equity_value ?? '-'}%
                </Text>
              </Flex>
              <Flex w="full" p="12px 0px" align={'center'} justify={'space-between'}>
                <Text color="matador_text.400" fontSize={'14px'} fontWeight={400}>
                  Unit Size
                </Text>
                <Text color="text" fontSize={'16px'} fontWeight={600}>
                  {formatPropertySize(asset?.unit?.unit_size)}
                </Text>
              </Flex>
              <Flex w="full" p="12px 0px" align={'center'} justify={'space-between'}>
                <Text color="matador_text.400" fontSize={'14px'} fontWeight={400}>
                  Unit Type
                </Text>
                <Text color="text" fontSize={'16px'} fontWeight={600}>
                  {asset?.unit?.unit_title ?? '-'}
                </Text>
              </Flex>
              <Flex w="full" p="12px 0px" align={'center'} justify={'space-between'}>
                <Text color="matador_text.400" fontSize={'14px'} fontWeight={400}>
                  Unit Type
                </Text>
                <Text color="text" fontSize={'16px'} fontWeight={600}>
                  {asset?.unit?.unit_title ?? '-'}
                </Text>
              </Flex>
              <Flex w="full" p="12px 0px" align={'center'} justify={'space-between'}>
                <Text color="matador_text.400" fontSize={'14px'} fontWeight={400}>
                  Offer Date
                </Text>
                <Text color="text" fontSize={'16px'} fontWeight={600}>
                  {formatDateToString(asset?.created_at)}
                </Text>
              </Flex>
              <Flex w="full" p="12px 0px" align={'center'} justify={'space-between'}>
                <Text color="matador_text.400" fontSize={'14px'} fontWeight={400}>
                  Offer Expiration Date
                </Text>
                <Text color="text" fontSize={'16px'} fontWeight={600}>
                  {formatDateToString(asset?.offer_expires)}{' '}
                </Text>
              </Flex>
            </Stack>
            {isTheHost && (
              <Stack
                w="full"
                gap={'0px'}
                mt="0px"
                border="1px solid"
                borderColor={'matador_border_color.100'}
                divider={<StackDivider borderColor={'matador_border_color.100'} />}
                p={{base: `8px 20px`}}
              >
                <Flex w="full" p="12px 0px" align={'center'} justify={'space-between'}>
                  <Text color="matador_text.400" fontSize={'14px'} fontWeight={400}>
                    Co-owners
                  </Text>
                  <Text
                    fontSize={'16px'}
                    color={`custom_color.color`}
                    textTransform={`capitalize`}
                    fontWeight={`600`}
                    cursor={`pointer`}
                    onClick={() => setType('coOwnersList')}
                  >
                    <HStack gap={`10px`}>
                      <Text>View</Text>
                      <IoChevronForward />
                    </HStack>
                  </Text>
                </Flex>
              </Stack>
            )}
            {!packet?.packet && !HOME__OWNERS__PACKETS?.isLoading ? null : (
              <Stack
                w="full"
                gap={'0px'}
                mt="0px"
                border="1px solid"
                borderColor={'matador_border_color.100'}
                divider={<StackDivider borderColor={'matador_border_color.100'} />}
                p={{base: `8px 20px`}}
              >
                <Flex w="full" p="12px 0px" align={'center'} justify={'space-between'}>
                  <Text color="matador_text.400" fontSize={'14px'} fontWeight={400}>
                    Terms of Agreement
                  </Text>
                  <Text color="text" fontSize={'16px'} fontWeight={600}>
                    {HOME__OWNERS__PACKETS?.isLoading ? (
                      <ThreeDots />
                    ) : (
                      <Link
                        rel="noreferrer"
                        target="_blank"
                        href={packet?.packet}
                        color={`custom_color.color`}
                        textTransform={`capitalize`}
                        fontWeight={`600`}
                      >
                        <HStack gap={`10px`}>
                          <Text>View</Text>
                          <IoChevronForward />
                        </HStack>
                      </Link>
                    )}
                  </Text>
                </Flex>
              </Stack>
            )}
          </Stack>
          <Flex direction={`column`} w="full" gap="12px" mx={'auto'} align="center" py={`8px`}>
            <PaymentAccess
              content={
                <Button
                  variation={`primary`}
                  fontSize="16px"
                  fontWeight="600"
                  w="full"
                  onClick={handleProceed}
                  boxStyle={{width: `100%`}}
                  p={`9px`}
                >
                  Proceed to Payment
                </Button>
              }
            />
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default CoOwnSummary;
