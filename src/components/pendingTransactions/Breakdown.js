import React from 'react';
import {Box, VStack, Flex, Text, Center, Stack, StackDivider} from '@chakra-ui/react';
import {fetchCustomPlanSummary} from '../../api/payment';
import {useQuery} from 'react-query';
import {formatToCurrency} from '../../utils';
import {Spinner} from '../../ui-lib';

const Breakdown = ({asset, customScrollbarStyles}) => {
  const customPlanBreakDown = useQuery(
    ['customPLansummary', asset?.payment_plan?.id],
    () => fetchCustomPlanSummary(asset?.payment_plan?.id),
    {
      enabled: !!asset?.payment_plan,
    }
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

  const FEES = asset?.equity_fees;

  return (
    <Box h={'fit-content'} overflowY="auto" __css={customScrollbarStyles}>
      <Stack gap={`12px`} mt={`12px`}>
        {asset?.payment_plan && (
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
                Initial Deposit
              </Text>
              <Text color="text" fontSize={'16px'} fontWeight={600}>
                {formatToCurrency(asset?.payment_plan?.initial_deposit_in_value)}
              </Text>
            </Flex>
          </Stack>
        )}
        {customPlanBreakDown.data?.data?.data?.length > 0 && (
          <Stack
            w="full"
            gap={'0px'}
            mt="0px"
            border="1px solid"
            borderColor={'matador_border_color.100'}
            divider={<StackDivider borderColor={'matador_border_color.100'} />}
            p={{base: `8px 20px`}}
          >
            {customPlanBreakDown.data?.data?.data?.map((fee, idx) => (
              <Flex
                key={fee?.id}
                w="full"
                p="12px 0px"
                align={'center'}
                justify={'space-between'}
                display={fee?.private ? `none` : `flex`}
              >
                <Stack gap={`4px`}>
                  <Text color="matador_text.400" fontSize={'14px'} fontWeight={400}>
                    {fee.name || fee?.created_at
                      ? monthDayYear(fee?.created_at)
                      : `${getOrdinal(idx + 1)} payment`}
                  </Text>
                  <Text fontSize={`10px`}>
                    {`Due After ${fee?.period_in_months} month${
                      Number(fee?.period_in_months) === 1 ? '' : 's'
                    }`}
                  </Text>
                </Stack>
                <Text color="text" fontSize={'16px'} fontWeight={600}>
                  {fee?.amount ? formatToCurrency(fee?.amount) : '-'}
                </Text>
              </Flex>
            ))}
          </Stack>
        )}
        {FEES?.length > 0 && (
          <Stack
            w="full"
            gap={'0px'}
            mt="0px"
            border="1px solid"
            borderColor={'matador_border_color.100'}
            divider={<StackDivider borderColor={'matador_border_color.100'} />}
            p={{base: `8px 20px`}}
          >
            {FEES?.map((fee, idx) => (
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
        )}
      </Stack>
    </Box>
  );
};

export default Breakdown;
