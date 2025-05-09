import {Box, Center, Divider, Flex, Image, Stack, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import {useQuery} from 'react-query';
import {fetchAllPurchaseHistory} from '../../../api/payment';
import EmptyState from '../../../components/appState/empty-state';
import {formatToCurrency} from '../../../utils';
import {formatDateToString} from '../../../utils/formatDate';
import warning_icon from '../../../images/icons/empty-icon.svg';
import PaymentTransactionType from '../../../components/transactions/PaymentTransactionType';
import {Spinner} from '../../../ui-lib';
import {fractionalEquityTransactionHistory} from '../../../api/listing';

const Transactions = ({equityId}) => {
  const TRANSACTIONS_HISTORY = useQuery(['fetchAllPurchaseHistory', equityId], () =>
    fetchAllPurchaseHistory(equityId)
  );
  const FRACTIONAL_TRANSACTIONS_HISTORY = useQuery(
    ['fractionalEquityTransactionHistory', equityId],
    () => fractionalEquityTransactionHistory(equityId)
  );

  return (
    <Box
      border="1px solid #E4E4E4 !important"
      py="16px"
      boxShadow={'0px 1px 2px 0px rgba(16, 24, 40, 0.05)'}
    >
      <Text
        px="15px"
        pb="15px"
        fontSize={{base: '16px', md: '27px'}}
        color="text"
        fontWeight={{base: '500', md: '400'}}
        textAlign="left"
        className="heading-text-regular"
      >
        Transaction History
      </Text>
      {TRANSACTIONS_HISTORY?.isLoading ? (
        <Center mx="auto" align="center" justify="center" w="full" h="240px">
          <Spinner disableAbsoluteCenteredSpinner size="400px" />
        </Center>
      ) : TRANSACTIONS_HISTORY?.isError ? (
        <Stack
          mx="auto"
          mt="40px"
          align="center"
          spacing={'14px'}
          direction={'column'}
          w="full"
          h="full"
        >
          <Image boxSize="68px" src={warning_icon.src} alt="" />
          <Text
            textAlign={'center'}
            fontWeight="600"
            fontSize="28px"
            lineHeight="36px"
            color="#191919"
          >
            {`Your purchase history will show up here when a succcessful payment is made`}
          </Text>
        </Stack>
      ) : TRANSACTIONS_HISTORY?.data?.data?.length > 0 ? (
        <VStack
          h="300px"
          overflowY="auto"
          __css={{
            '&::-webkit-scrollbar': {
              w: '1',
            },
            '&::-webkit-scrollbar-track': {
              w: '6',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '10',
              bg: `#333`,
            },
          }}
          divider={<Divider />}
        >
          {TRANSACTIONS_HISTORY?.data?.data?.map((item, index) => (
            <Flex
              px={{base: '10px', md: '30px'}}
              direction="row"
              w="full"
              justifyContent="space-between"
              align={'center'}
              key={index}
            >
              <Text
                fontSize={{base: '10px', md: '18px'}}
                fontWeight={{base: '400', md: '500'}}
                color="text"
              >{`${formatToCurrency(item?.amount)}`}</Text>
              <PaymentTransactionType type={item?.transaction_action_type} />
              <Text fontSize={{base: '10px', md: '16px'}} fontWeight="500" color="text">
                {formatDateToString(item?.created_at)}
              </Text>
            </Flex>
          ))}
        </VStack>
      ) : (
        <EmptyState text={'No transaction yet'} />
      )}
    </Box>
  );
};

export default Transactions;
