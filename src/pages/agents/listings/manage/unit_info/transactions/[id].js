import {useRouter} from 'next/router';
import {useQuery} from 'react-query';
import {useEffect, useState} from 'react';

import {useToast, Box, Flex, Image, HStack, Text, SkeletonText, Heading} from '@chakra-ui/react';
import {CSVLink} from 'react-csv';
import downloadIcon from '@/realtors_portal/images/icons/download-icon.svg';
import AgentsLayoutView from '@/realtors_portal/components/AgentLayout/View';
import SortBy from '@/realtors_portal/components/assets/SortBy';
import {LISTINGS_TRANSACTIONS, UNIT_TRANSACTIONS} from '@/realtors_portal/constants/listings';
import {MatadorCustomTable} from '@/realtors_portal/components/Table/Table';
import {unitTransactions} from '@/realtors_portal/api/agents';
import {changeDateFormat} from '@/realtors_portal/utils/formatDate';
import useGetSession from '@/utils/hooks/getSession';
import {RButton} from '@/realtors_portal/ui-lib';
import {GoBack} from '@/realtors_portal/components/assets/BackArrow';

export const UnitTransactionHistory = () => {
  const [addedParam, setAddedParam] = useState('');
  const toast = useToast();
  const router = useRouter();
  const id = router?.query?.id;
  const name = router?.query?.name;
  const [value, setValue] = useState('1');

  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

  const LISTING_DATA = useQuery(['unit-listing', id && parseInt(id), agentToken, storeName], () =>
    unitTransactions(id && parseInt(id), agentToken, storeName)
  );

  const customersList = LISTING_DATA?.data && LISTING_DATA?.data?.data?.data;

  const sort_params = [
    'A-Z',
    'Z-A',
    'Date Joined Oldest to Newest',
    'Date Joined Newest to Oldest',
  ];

  useEffect(() => {
    LISTING_DATA?.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const getDataFromJSON = data => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          name: `${data[i]?.customer?.first_name} ${data[i]?.customer?.last_name}`,
          purchase_price: data[i]?.purchase_price,
          total_paid: data[i]?.total_paid,
          outstanding_balance: data[i]?.outstanding_balance,
          date: changeDateFormat(data[i]?.date),
          status: data[i]?.status,
        });
    }
    return result;
  };

  return (
    <AgentsLayoutView
      isLoading={LISTING_DATA?.isFetching}
      isError={LISTING_DATA?.isError}
      error={LISTING_DATA?.error}
    >
      <Flex align={`center`} justify={`space-between`} py={{base: `24px`}}>
        <GoBack text={name ?? 'Back'} />
        <Heading
          display={{base: `block`, lg: `none`}}
          color={`#000`}
          fontSize={{base: `28px`, lg: `19px`}}
          fontWeight={`600`}
          lineHeight={`130%`}
        >
          {name}
        </Heading>
        <HStack>
          <RButton
            variation={`tertiary`}
            w="max-content"
            h={`max-content`}
            color="#4545FE"
            borderRadius="8px"
            bg="#ffffff"
            fontWeight="400"
            fontSize="14px"
            lineHeight="18px"
            p={`10px`}
          >
            <Image w="18px" h="18px" src={downloadIcon.src} alt="" />
          </RButton>{' '}
          <SortBy
            url={addedParam}
            setUrl={setAddedParam}
            sortFor="outstanding_balance_id"
            sort_params={sort_params}
            hideText
          />
        </HStack>
      </Flex>

      <HStack mb="18px" mt="45px" w="full" justify="flex-end" gap="12px"></HStack>

      {/* Table */}
      <Box
        padding="0"
        border={LISTING_DATA?.isFetching && 'solid 1px #f4f4f4'}
        borderRadius={LISTING_DATA?.isFetching && '8px'}
        overflow={LISTING_DATA?.isFetching && 'hidden'}
        bg={LISTING_DATA?.isFetching && 'white'}
      >
        <SkeletonText isLoaded={!LISTING_DATA?.isFetching} skeletonHeight="60px" noOfLines={1} />
        <SkeletonText
          isLoaded={!LISTING_DATA?.isFetching}
          mt="4"
          noOfLines={6}
          spacing="10px"
          skeletonHeight="20px"
        >
          {!LISTING_DATA?.isLoading && (
            <MatadorCustomTable
              // isManageAgentEmpty="Oops you don't have any data yet"
              isManageAgentEmpty="Looks like there is no transaction yet"
              isRefetching={LISTING_DATA?.isFetching}
              // nextPageUrl={'/agents/users/user_payment_breakdown_fractional'}
              minW="full"
              dontExpand
              headerSpace="evenly"
              DATA={customersList}
              COLUMNS={UNIT_TRANSACTIONS}
              linkText={''}
              border={{base: 'solid 1px #e4e4e4'}}
              overflow={`hidden`}
            />
          )}
        </SkeletonText>
      </Box>
    </AgentsLayoutView>
  );
};

export default UnitTransactionHistory;
