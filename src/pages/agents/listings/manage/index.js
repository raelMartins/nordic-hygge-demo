import {Box, Center, Grid, Hide, HStack, Show, Spinner, Text, useToast} from '@chakra-ui/react';
import {useState} from 'react';
import {useQuery} from 'react-query';
import {AgentListings} from '@/realtors_portal/api/agents';
import SortBy from '@/realtors_portal/components/assets/SortBy';
import LISTINGSVIEWCOLUMN from '@/realtors_portal/constants/listings';
import {MatadorCustomTable} from '@/realtors_portal/components/Table/Table';
import Filter from '@/realtors_portal/components/listings/filter';
import {OvalLoader} from '@/realtors_portal/components/loaders/AnimatedLoader';
import {toastForError} from '@/realtors_portal/utils/toastForErrors';
import {STORENAMEFROMDOMAIN} from '@/constants/routes';
import {RealtorListingCard} from '@/realtors_portal/components/cards/RealtorListingCard';
import useGetSession from '@/utils/hooks/getSession';

export const ListingsTable = () => {
  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [addedParam, setAddedParam] = useState({
    sort: '',
    filter: '',
    param: '',
  });

  const toast = useToast();
  const param = addedParam;

  const sort_params = [
    'Most sold to least sold',
    'Least sold  to most sold',
    'Highest price to lowest price',
    'Lowest price to highest price',
    'Highest rating to lowest rating',
    'Lowest rating to highest rating',
  ];

  const defaultValue = 'most_sold_to_least_sold';

  const {
    data,
    isLoading: loading,
    error,
    isError: isErr,
  } = useQuery(['agent_listings', param?.param], () =>
    AgentListings(param?.param, agentToken, storeName)
  );

  toastForError(error, isErr, toast);

  const forFilter = data && {
    max_price: data?.data?.max_price,
    min_price: data?.data?.min_price,
  };

  const listingData = data?.data?.listings;

  const handleCollapsed = prop => {
    setIsCollapsed(!isCollapsed);
    if (prop === 'expand') {
      return window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      return window.scrollTo({
        top: document.body.scrollHeight + 500,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box pb="1.5em" overflow="auto">
      <HStack justify={`flex-end`} py="32px">
        <SortBy
          setUrl={setAddedParam}
          url={addedParam}
          defaultValue={defaultValue}
          sortFor="listing"
          sort_params={sort_params}
          hideText
        />
        <Filter forFilter={forFilter} setUrl={setAddedParam} url={addedParam} hideText />
      </HStack>
      <Grid
        gap={`20px`}
        templateColumns={{base: `1fr`, md: `1fr 1fr`, xl: `1fr 1fr 1fr`}}
        w="100%"
        minW={{base: `100%`, md: `90vw`}}
      >
        {loading
          ? Array(9)
              .fill('')
              .map((el, i) => <RealtorListingCard key={i} isLoading={true} />)
          : listingData?.map((el, i) => <RealtorListingCard key={i} data={el} />)}
      </Grid>
      {/* {loading ? (
        <>
          <Center h="70vh" w="100%">
            <Show above="md">
              <OvalLoader />
            </Show>
            <Hide above="md">
              <Spinner />
            </Hide>{' '}
          </Center>
        </>
      ) : isErr ? (
        <Center h="70vh" w="100%">
          <Text>An Error Occured!</Text>
        </Center>
      ) : (
        <MatadorCustomTable
          noTopPaginate
          dontExpand
          columnHeight
          sortBy={
            <SortBy
              setUrl={setAddedParam}
              url={addedParam}
              defaultValue={defaultValue}
              sortFor="listing"
              sort_params={sort_params}
            />
          }
          filter={<Filter forFilter={forFilter} setUrl={setAddedParam} url={addedParam} />}
          DATA={listingData}
          forData={[data?.data, addedParam.filter]}
          isRefetching={loading}
          isCollapsed={isCollapsed}
          COLUMNS={LISTINGSVIEWCOLUMN([listingData])}
          cellPadding={{base: '12px 8px', md: '16px 24px'}}
          headerCellPadding={{base: '12px 8px', md: '16px 24px'}}
          handleExpand={handleCollapsed}
          headerSpace="evenly"
          isManageAgentEmpty="Oops! you don't have any listing yet....."
          linkText={<Text fontWeight={600}>Listings</Text>}
          border={`1px solid #e4e4e4`}
          overflow={`hidden`}
        />
      )} */}
    </Box>
  );
};

export default ListingsTable;
