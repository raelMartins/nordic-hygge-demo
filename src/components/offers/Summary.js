import React from 'react';
import {Flex, Box, Text, VStack, Stack, StackDivider, HStack, Link} from '@chakra-ui/react';
import {Button, CustomizableButton} from '../../ui-lib';
import {formatToCurrency} from '../../utils';
import {useQuery} from 'react-query';
import {fetchInvestorPackets} from '../../api/payment';
import ThreeDots from '../loaders/ThreeDots';
import {formatDateToString, formatPaymentPlanInMonthsString} from '../../utils/formatDate';
import TransactionHistory from '../manageAssets/components/assetsTransactionHistory';
import {IoChevronForward} from 'react-icons/io5';

const SummaryDrawer = ({asset, setType, customScrollbarStyles}) => {
  const HOME__OWNERS__PACKETS = useQuery(['fetchInvestorPackets', asset?.id], () =>
    fetchInvestorPackets(asset?.id)
  );
  const packet =
    HOME__OWNERS__PACKETS?.data?.data?.received?.length &&
    HOME__OWNERS__PACKETS?.data?.data?.received[0];

  const handleProceed = () => {
    setType('payment');
  };

  return (
    <>
      {/* <Box h={'fit-content'} overflowY="auto" __css={customScrollbarStyles}> */}
      <Box h={'fit-content'} overflowY="auto" py={`20px`}>
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
          {/* <Text fontSize={{base: '14px', md: '18px'}} fontWeight={400} className="sub-text-regular">
            {asset?.payment_plan ? 'Initial Deposit' : 'Offer Price'}
          </Text>
          <Text color="matador_text.500" fontSize={{base: '28px', md: '34px'}} fontWeight={600}>
            {asset?.payment_plan
              ? formatToCurrency(asset?.payment_plan?.initial_deposit_in_value)
              : formatToCurrency(asset?.offer_price)}
          </Text> */}
          <Text fontSize={{base: '14px'}} fontWeight={`400`} className="sub-text-regular">
            Offer Price
          </Text>
          <Text
            fontSize={{base: '24px'}}
            fontStyle={`normal`}
            fontWeight={`600`}
            lineHeight={`100%`}
            letterSpacing={`0.48px`}
          >
            {formatToCurrency(asset?.offer_price)}
          </Text>
        </Flex>

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
                Payment Type
              </Text>
              <Text color="text" fontSize={'16px'} fontWeight={600}>
                {asset?.payment_plan?.plan_type === 'custom'
                  ? formatPaymentPlanInMonthsString(asset?.payment_plan?.payment_period_in_months)
                  : asset?.payment_plan
                  ? formatPaymentPlanInMonthsString(asset?.payment_plan?.payment_period_in_months)
                  : 'Outright'}{' '}
              </Text>
            </Flex>
            {asset?.payment_plan && (
              <Flex w="full" p="12px 0px" align={'center'} justify={'space-between'}>
                <Text color="matador_text.400" fontSize={'14px'} fontWeight={400}>
                  Initial Deposit
                </Text>
                <Text color="text" fontSize={'16px'} fontWeight={600}>
                  {formatToCurrency(asset?.payment_plan?.initial_deposit_in_value)}
                </Text>
              </Flex>
            )}
          </Stack>
          <Stack
            w="full"
            gap={'0px'}
            mt="0px"
            border="1px solid"
            borderColor={'matador_border_color.100'}
            divider={<StackDivider borderColor={'matador_border_color.100'} />}
            p={{base: `8px 20px`}}
          >
            {asset?.equity_fees?.map(fee => (
              <Flex
                key={fee?.id}
                w="full"
                p="12px 0px"
                align={'center'}
                justify={'space-between'}
                display={fee?.private ? `none` : `flex`}
              >
                <Text color="matador_text.400" fontSize={'14px'} fontWeight={400}>
                  {fee.name}
                </Text>
                <Text color="text" fontSize={'16px'} fontWeight={600}>
                  {formatToCurrency(fee.amount)}
                </Text>
              </Flex>
            ))}
          </Stack>
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
                {formatDateToString(asset?.offer_expires)}
              </Text>
            </Flex>
            {asset?.payment_plan && asset?.payment_plan?.purchase_price * 1 && (
              <Flex w="full" p="12px 0px" align={'center'} justify={'space-between'}>
                <Text color="matador_text.400" fontSize={'14px'} fontWeight={400}>
                  Initial deposit percentage
                </Text>
                <Text color="text" fontSize={'16px'} fontWeight={600}>
                  {Math.round(
                    ((asset?.payment_plan?.initial_deposit_in_value * 1) /
                      asset?.payment_plan?.purchase_price) *
                      1 *
                      100
                  )}
                  %
                </Text>
              </Flex>
            )}
          </Stack>
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
      </Box>
      <Flex direction={`column`} w="full" gap="12px" mx={'auto'} align="center" py={`8px`}>
        {asset?.payment_plan?.plan_type === 'custom' && (
          <Button
            variation={`secondary`}
            fontSize="16px"
            fontWeight="600"
            w="full"
            onClick={() => setType('breakdown')}
            p={`9px`}
          >
            Payment Breakdown
          </Button>
        )}

        <Button
          variation={`primary`}
          fontSize="16px"
          fontWeight="600"
          w="full"
          onClick={handleProceed}
          boxStyle={{width: `100%`}}
          p={`9px`}
        >
          Make Payment
        </Button>
      </Flex>
    </>
  );
};

export default SummaryDrawer;
