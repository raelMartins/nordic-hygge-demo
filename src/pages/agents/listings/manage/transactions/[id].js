import {useRouter} from 'next/router';
import {useQuery} from 'react-query';
import {useEffect, useState} from 'react';
import {useToast, Box, Flex, Image, HStack, Text, SkeletonText, Heading} from '@chakra-ui/react';
import {CSVLink} from 'react-csv';
import downloadIcon from '@/realtors_portal/images/icons/download-icon.svg';
import TransactionHeader from '@/realtors_portal/components/listings/ListingInfo.components/ListingInfo.details/TransactionHeader';
import AgentsLayoutView from '@/realtors_portal/components/AgentLayout/View';
import SortBy from '@/realtors_portal/components/assets/SortBy';
import {LISTINGS_TRANSACTIONS} from '@/realtors_portal/constants/listings';
import {fetchListingTransactions} from '@/realtors_portal/api/agents';
import {MatadorCustomTable} from '@/realtors_portal/components/Table/Table';
import {toastForError} from '@/realtors_portal/utils/toastForErrors';
import useGetSession from '@/utils/hooks/getSession';
import {GoBack} from '@/realtors_portal/components/assets/BackArrow';
import {RButton} from '@/realtors_portal/ui-lib';
import isMobile from '@/utils/extras';

export const OutstandingBalanceCustomersForSingleListing = ({id}) => {
  const [addedParam, setAddedParam] = useState('');
  const toast = useToast();
  const router = useRouter();
  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

  const isFractional = router?.query?.isFractional;
  const name = router?.query?.name;
  const [value, setValue] = useState('1');

  const CUSTOMERS_DATA = useQuery(
    ['outstanding-balance-customers', id, value, addedParam],
    () => fetchListingTransactions(id, value, addedParam, agentToken, storeName),
    {
      refetchOnWindowFocus: true,
    }
  );

  const customersList = CUSTOMERS_DATA?.data && CUSTOMERS_DATA?.data?.data?.customer_list;
  const customersMetaData = CUSTOMERS_DATA?.data && CUSTOMERS_DATA?.data?.data;

  const sort_params = [
    'A-Z',
    'Z-A',
    'Date Joined Oldest to Newest',
    'Date Joined Newest to Oldest',
  ];

  useEffect(() => {
    CUSTOMERS_DATA?.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const getDataFromJSON = data => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          name: data[i]?.name,
          unit: data[i]?.unit,
          purchase_price: data[i]?.purchase_price,
          total_paid: data[i]?.total_paid,
          outstanding_balance: data[i]?.outstanding_balance,
          date: data[i]?.created_at,
          status: data[i]?.status,
        });
    }
    return result;
  };

  const handleNextPage = arg => {
    arg == 'fractional' &&
      router.push(`/agents/listings/manage/transactions/fractional/${parseInt(id)}?name=${name}`);
  };

  if (CUSTOMERS_DATA?.isError) {
    toastForError(CUSTOMERS_DATA?.error, CUSTOMERS_DATA?.isError, toast);
    return (
      <AgentsLayoutView>
        <Box mt="20px"></Box>
        <Text mt="50px">Oops something went wrong</Text>
      </AgentsLayoutView>
    );
  }
  const handleBack = () => {
    router.back();
  };

  return (
    <AgentsLayoutView isLoading={CUSTOMERS_DATA?.isLoading} isError={CUSTOMERS_DATA?.isError}>
      <Box pb={{base: `80px`, lg: `0px`}}>
        <Flex w="full" justify="space-between">
          <HStack gap="20px" w={`100%`} justify="space-between" py={{base: `24px`}}>
            <GoBack text={name} />
            <Heading
              display={{base: `block`, lg: `none`}}
              color={`#000`}
              fontSize={{base: `28px`, lg: `19px`}}
              fontWeight={`600`}
              lineHeight={`130%`}
            >
              {name}
            </Heading>

            {isFractional == 'true' && (
              <Flex
                position={{base: 'fixed', lg: 'static'}}
                bottom={{base: `0px`}}
                left={{base: `0px`}}
                bg={{base: '#fff', lg: 'transparent'}}
                w={{base: 'full', lg: 'max-content'}}
                zIndex={10}
                p={{base: `24px`, lg: `0px`}}
              >
                <RButton
                  variation={isMobile ? `primary` : `tertiary`}
                  color={{base: '#fff', lg: '#4545FE'}}
                  onClick={() => handleNextPage('fractional')}
                  w={{base: `100%`, lg: `max-content`}}
                >
                  Fractional
                </RButton>
              </Flex>
            )}
          </HStack>
        </Flex>

        {/* Meta data */}
        <TransactionHeader
          customersMetaData={customersMetaData}
          value={value}
          setValue={setValue}
        />

        {/* Table */}
        <Box
          padding="0"
          borderRadius={CUSTOMERS_DATA?.isLoading && '8px'}
          overflow={CUSTOMERS_DATA?.isLoading && 'hidden'}
          bg={CUSTOMERS_DATA?.isLoading && 'white'}
          width={{base: 'full'}}
        >
          <SkeletonText isLoaded={!CUSTOMERS_DATA?.isLoading} skeletonHeight="60px" noOfLines={1} />
          <SkeletonText
            isLoaded={!CUSTOMERS_DATA?.isLoading}
            mt="4"
            noOfLines={6}
            spacing="10px"
            skeletonHeight="20px"
          >
            {!CUSTOMERS_DATA?.isLoading && (
              <MatadorCustomTable
                // isManageAgentEmpty="Oops you don't have any data yet"
                isManageAgentEmpty="Looks like there is no transaction yet"
                // downloadcsv={
                //   <CSVLink data={getDataFromJSON(customersList)}>
                //     <RButton
                //       variation={`tertiary`}
                //       w="max-content"
                //       h={`max-content`}
                //       color="#4545FE"
                //       borderRadius="8px"
                //       bg="#ffffff"
                //       fontWeight="400"
                //       fontSize="14px"
                //       lineHeight="18px"
                //       p={`10px`}
                //     >
                //       <Image w="18px" h="18px" src={downloadIcon.src} alt="" />
                //     </RButton>
                //   </CSVLink>
                // }
                sortBy={
                  <SortBy
                    url={addedParam}
                    setUrl={setAddedParam}
                    sortFor="outstanding_balance_id"
                    sort_params={sort_params}
                    hideText
                  />
                }
                isRefetching={CUSTOMERS_DATA?.isLoading}
                // nextPageUrl={'/agents/users/user_payment_breakdown'}
                minW="full"
                dontExpand
                headerSpace="evenly"
                DATA={customersList}
                forData={[value, addedParam]}
                forColumn={[value, addedParam]}
                COLUMNS={LISTINGS_TRANSACTIONS}
                // border={{base: 'solid 1px #EAECF0', lg: `none`}}
                border={{base: 'solid 1px #e4e4e4'}}
                overflow={`hidden`}
              />
            )}
            {console.log({customersList})}
          </SkeletonText>
        </Box>
      </Box>
    </AgentsLayoutView>
  );
};

export async function getServerSideProps(context) {
  const {query} = context;
  const id = query.id;

  return {
    props: {
      id,
    },
  };
}

export default OutstandingBalanceCustomersForSingleListing;
