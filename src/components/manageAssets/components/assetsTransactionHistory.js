import React from 'react';
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Hide,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import StaggeredSkeleton from '../../tables/assetTableSkeleton';
import AssetsTransactionTable from '../../tables/assetsTransactionTable';
import {formatToCurrency} from '@/utils';
import {monthDayYear} from '@/utils/formatDate';
import {Spinner} from '@/ui-lib';
import ThreeDots from '@/components/loaders/ThreeDots';
import {EmptyTransactionsIcon2} from '@/components/wallet_drawer/wallet_content';
import EmptyState from '@/components/appState/empty-state';

const TransactionHistory = ({
  arrayData,
  isLoading,
  isError,
  error,
  title,
  showTitle = true,
  customEmptyState = {},
  ...rest
}) => {
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

  return (
    <Stack gap={`8px`} {...rest}>
      {showTitle && (
        <Heading
          color={`matador_text.500`}
          fontSize={`14px`}
          fontWeight={`700`}
          letterSpacing={`-0.277px`}
          textTransform={`uppercase`}
        >
          {title || `Transaction History`}
        </Heading>
      )}

      {/* <StaggeredSkeleton isLoading={isLoading} number={1}> */}
      {isLoading ? (
        <Center h={`50px`}>
          <ThreeDots />
        </Center>
      ) : (
        <Stack
          w="full"
          gap={'0px'}
          mt="0px"
          border="1px solid"
          borderColor={'matador_border_color.100'}
          divider={<StackDivider borderColor={'matador_border_color.100'} />}
          p={{base: `8px 20px`}}
        >
          {!arrayData?.length || arrayData?.length === 0 ? (
            <EmptyState
              icon={<EmptyTransactionsIcon2 />}
              textSize={12}
              headerStyle={{textTransform: 'uppercase', fontWeight: 700, fontSize: '14px'}}
              height={{base: '100px'}}
              minH={{base: '100px'}}
              // noIcon
              noHeader
              text={`Looks like you haven't processed any transactions yet.`}
              textStyle={{fontSize: `12px`, fontWeight: `400`}}
              {...customEmptyState}
            />
          ) : (
            arrayData?.map(item =>
              item?.hide ? null : (
                <Flex
                  key={item?.id}
                  w="full"
                  p="12px 0px"
                  align={'center'}
                  justify={'space-between'}
                >
                  <Text
                    color="matador_text.400"
                    fontSize={'14px'}
                    fontWeight={400}
                    letterSpacing={`0.84px`}
                    textTransform={`capitalize`}
                  >
                    {item?.label || monthDayYear(item?.created_at)}
                  </Text>
                  <Text
                    color="text"
                    fontSize={'16px'}
                    fontWeight={600}
                    letterSpacing={`0.48px`}
                    lineHeight={`100%`}
                  >
                    {item?.value || formatToCurrency(item?.amount)}
                  </Text>
                </Flex>
              )
            )
          )}
        </Stack>
      )}
      {/* </StaggeredSkeleton> */}
    </Stack>
  );
};

export default TransactionHistory;
