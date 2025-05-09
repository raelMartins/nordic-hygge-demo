/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Center,
  Grid,
  HStack,
  Heading,
  Hide,
  Image,
  Show,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, {useEffect, useMemo, useState} from 'react';
import {useQuery} from 'react-query';
import {fetchCustomers} from '@/realtors_portal/api/agents';
import {AGENT_USERS_COLUMN} from '@/realtors_portal/constants/agentUser';
import AgentsLayoutView from '@/realtors_portal/components/AgentLayout/View';
import {MatadorCustomTable} from '@/realtors_portal/components/Table/Table';
import UsersHeader from './users_header';
import Filter from '@/realtors_portal/components/users/filter';
import {toastForError} from '@/realtors_portal/utils/toastForErrors';
import SortBy from '@/realtors_portal/components/assets/SortBy';
import backArrow from '@/realtors_portal/images/icons/back-arrow.png';
import router from 'next/router';
import {OvalLoader, Spinner} from '@/realtors_portal/components/loaders/AnimatedLoader';
import useGetSession from '@/utils/hooks/getSession';
import {ArrowUpIcon} from '@chakra-ui/icons';
import {EmptyReferralsIcon} from '@/realtors_portal/components/assets/UsefulSVGs';
import {DownloadCSV} from '@/realtors_portal/components/assets/DownloadCSV';

const index = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [value, setValue] = useState('1');

  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

  const columns = useMemo(() => AGENT_USERS_COLUMN, []);
  const [addedParam, setAddedParam] = useState({
    sort: '',
    filter: '',
    param: '',
  });

  const QUERY_PARAMS =
    value == '2'
      ? 'asset_holders=true'
      : value == '3'
      ? 'defaulting=true'
      : value == '4'
      ? 'outstanding=true'
      : value == '5'
      ? 'outstanding=false'
      : value == '6'
      ? 'fractions=true'
      : '';

  const mainParam = (addedParam.param && addedParam.param) + (QUERY_PARAMS && '&') + QUERY_PARAMS;

  const customers = useQuery(['users_for_agentis', mainParam], () =>
    fetchCustomers(mainParam, agentToken, storeName)
  );

  const handleCollapsed = () => {
    return setIsCollapsed(!isCollapsed);
  };

  const toast = useToast();

  useEffect(() => {
    const fetch = async () => await customers.refetch();
    fetch();
    // eslint-disable-next-line
  }, [value, addedParam]);

  const sort_params = [
    'A-Z',
    'Z-A',
    'Date joined oldest to newest',
    'Date joined newest to oldest',
  ];
  toastForError(customers.error, customers.isError, toast);

  const header_stats = [
    {
      label: `Total Referrals`,
      value: customers?.data?.data?.total_customers,
      percentage_growth: 0,
    },
    {
      label: `Subscribers with outstanding balance`,
      value: customers?.data?.data?.customers_with_outstanding,
      percentage_growth: null,
    },
    {
      label: `Subscribers without outstanding balance`,
      value: customers?.data?.data?.customers_without_outstanding,
      percentage_growth: null,
    },
    {
      label: `Defaulting Subscribers`,
      value: customers?.data?.data?.total_defaulters,
      percentage_growth: null,
    },
  ];

  const getDataFromJSON = data => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          Name: data[i]?.name,
          Email: data[i]?.email,
          Phone: data[i]?.phone,
        });
    }
    return result;
  };

  return (
    <AgentsLayoutView isError={customers.isError}>
      {/* {!isCollapsed ? (
        <VStack align={'flex-start'} mt={{base: 4, lg: 0}} pt="20px">
          <Heading display={{base: 'flex', lg: 'none'}} fontSize="20px" fontWeight="600">
            Subscribers
          </Heading>
          <UsersHeader
            value={value}
            setValue={setValue}
            number_of_customers={customers?.data?.data?.total_customers}
            customers_with_outstanding_payment={customers?.data?.data?.customers_with_outstanding}
            customers_without_outstanding_payment={
              customers?.data?.data?.customers_without_outstanding
            }
            defaulters={customers?.data?.data?.total_defaulters}
          />
        </VStack>
      ) : null} */}

      <Stack gap={{base: `13px`, lg: `16px`}} pt={`16px`}>
        <Heading
          display={{base: `block`, lg: `none`}}
          color={`#000`}
          fontSize={{base: `28px`, lg: `19px`}}
          fontWeight={`600`}
          lineHeight={`130%`}
        >
          Referrals
        </Heading>
        <Box
          w={'100%'}
          maxW={'100%'}
          overflowX={'auto'}
          css={{
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Grid templateColumns={{base: `repeat(4, 1fr)`}} gap={`12px`}>
            {header_stats?.map((el, i) => (
              <Stack
                key={i}
                justify={`center`}
                borderRadius={{base: `6px`, lg: `12px`}}
                border={{base: `0.5px solid `}}
                borderColor={`#E4E4E7 !important`}
                background={{base: `#FFF`}}
                p={{base: `20px 12px`, lg: `28px 24px`}}
                gap={{base: `4px`, lg: `8px`}}
                minW={`246px`}
              >
                <Text
                  color={{base: `#52525B`}}
                  fontSize={{base: `13px`, lg: `16px`}}
                  fontWeight={{base: `400`, lg: `500`}}
                  lineHeight={{base: `150%`}}
                  letterSpacing={{base: `0.26px`}}
                >
                  {el?.label}
                </Text>
                <Text
                  color={{base: ` #18181B`}}
                  fontSize={{base: `23px`, lg: `36px`}}
                  fontWeight={{base: `600`}}
                  lineHeight={{base: `130%`}}
                  letterSpacing={`-0.72px`}
                >
                  {el.value || 0}
                </Text>
                {(el.percentage_growth || el.percentage_growth == 0) && (
                  <HStack
                    borderRadius={`full`}
                    background={`#F0FDF4`}
                    p={`8px`}
                    gap={`4px`}
                    flexWrap={`wrap`}
                    color={{base: ` #27272A`}}
                    fontSize={{base: `11px`, lg: `14px`}}
                    fontWeight={{base: `500`}}
                    lineHeight={{base: `150%`}}
                    letterSpacing={{base: `0.33px`}}
                    w={`max-content`}
                  >
                    <Text color={`#116932`}>
                      <ArrowUpIcon fontSize={`18px`} /> {el.percentage_growth}%
                    </Text>
                    <Text>vs last month</Text>
                  </HStack>
                )}
              </Stack>
            ))}
          </Grid>
        </Box>
        {customers.isLoading ? (
          <Center h={`40vh`}>
            <Spinner noAbsolute />
          </Center>
        ) : (
          <MatadorCustomTable
            noTopPaginate
            emptyIcon={<EmptyReferralsIcon />}
            isRefetching={customers.isLoading}
            forData={[addedParam, value]}
            DATA={customers.data?.data?.data}
            isCollapsed={isCollapsed}
            COLUMNS={columns}
            sortBy={
              <SortBy
                sortFor="users"
                setUrl={setAddedParam}
                url={addedParam}
                sort_params={sort_params}
                hideText
              />
            }
            filter={
              <Filter
                setUrl={setAddedParam}
                url={addedParam}
                listings={customers?.data?.data?.listings_available}
                isFractional={customers?.data?.data?.total_fractions_holders}
                hideText
              />
            }
            // downloadcsv={
            //   <DownloadCSV
            //     filename="Users CSV Sheet"
            //     handleData={getDataFromJSON(customers.data?.data?.data)}
            //   />
            // }
            handleExpand={handleCollapsed}
            headerSpace="evenly"
            nextPageUrl={`/agents/users/customer_profile`}
            // isManageAgentEmpty="No subscribers yet."
            isManageAgentEmpty="Looks like there are no referrals yet"
            collapseText={
              <HStack display={{base: 'flex', lg: 'none'}} mb="10px" zIndex={10} mt="-5">
                <Image
                  onClick={() => router.back()}
                  style={{cursor: 'pointer'}}
                  mr={2}
                  boxSize="50px"
                  src={backArrow.src}
                  alt="back_arrow"
                />
                <Heading fontSize="20px" fontWeight="600">
                  Subscribers
                </Heading>
              </HStack>
            }
          />
        )}
      </Stack>
    </AgentsLayoutView>
  );
};

export default index;
