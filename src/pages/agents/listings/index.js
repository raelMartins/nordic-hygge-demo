import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useToast,
} from '@chakra-ui/react';
import {useState} from 'react';
import {useQuery} from 'react-query';
import {AgentListings} from '@/realtors_portal/api/agents';
import SortBy from '@/realtors_portal/components/assets/SortBy';
import Filter from '@/realtors_portal/components/listings/filter';
import {RealtorListingCard} from '@/realtors_portal/components/cards/RealtorListingCard';
import {AgentsLayoutView} from '@/realtors_portal/components/AgentLayout';
import useGetSession from '@/utils/hooks/getSession';
import {formatToCurrency} from '@/realtors_portal/utils';
import {monthDayYear} from '@/realtors_portal/utils/formatDate';
import {EmptyState} from '@/realtors_portal/components/common/Table';
import {EmptyListingsIcon} from '@/realtors_portal/components/assets/UsefulSVGs';
import {DownloadCSV} from '@/realtors_portal/components/assets/DownloadCSV';
import {NavSearchIcon} from '@/realtors_portal/components/AgentLayout/assets/NavbarSvgs';

export default function AllListingsPage() {
  const [search, setSearch] = useState('');

  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

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

  const forFilter = data && {
    max_price: data?.data?.max_price,
    min_price: data?.data?.min_price,
  };

  const listingData = data?.data?.listings;

  const property_list = listingData?.filter(
    el =>
      el?.name?.toLowerCase()?.includes(search.toLowerCase()) ||
      el?.address?.toLowerCase()?.includes(search.toLowerCase()) ||
      el?.landmark?.toLowerCase()?.includes(search.toLowerCase())
  );

  const getDataFromJSON = data => {
    const result = [];
    for (var i = 0; i < data?.length; i++) {
      data &&
        result.push({
          Name: data[i]?.name,
          Address: data[i]?.address,
          'Building type': data[i]?.building_type,
          'Price Starting From': formatToCurrency(data[i]?.starting_from),
          'Created On': monthDayYear(data[i]?.created_at),
        });
    }
    return result;
  };

  return (
    <AgentsLayoutView isLoading={loading}>
      <Stack gap={{base: `16px`, lg: `32px`}} overflow="auto">
        <Heading
          display={{base: `block`, lg: `none`}}
          color={`#000`}
          fontSize={{base: `28px`, lg: `19px`}}
          fontWeight={`600`}
          lineHeight={`130%`}
        >
          Our Offerings
        </Heading>
        <HStack justify={`flex-end`}>
          <SortBy
            setUrl={setAddedParam}
            url={addedParam}
            defaultValue={defaultValue}
            sortFor="listing"
            sort_params={sort_params}
            hideText
            display={{base: `none`, lg: `flex`}}
          />
          <InputGroup alignItems="center" display={{base: `inline-block`, lg: `none`}}>
            <InputLeftElement>
              <NavSearchIcon cursor="pointer" ml={`10px`} color="#52525B" />
            </InputLeftElement>
            <Input
              type="search"
              color="#919191"
              background="#FAFAFA"
              borderRadius="8px"
              fontSize="14px"
              _placeholder={{
                color: '#52525B',
                opacity: `1`,
                fontSize: `14px`,
              }}
              p={'16px'}
              pl={`48px`}
              placeholder="Search"
              border={`1px solid`}
              borderColor={`#E4E4E7 !important`}
              w={`100%`}
              onChange={e => setSearch(e.target.value)}
            />
          </InputGroup>
          <Filter forFilter={forFilter} setUrl={setAddedParam} url={addedParam} hideText />
          {/* <DownloadCSV filename="Listings CSV Sheet" handleData={getDataFromJSON(listingData)} /> */}
        </HStack>
        <Grid
          gap={`20px`}
          templateColumns={{base: `1fr`, md: `1fr 1fr`, xl: `1fr 1fr 1fr`}}
          w="100%"
          minW={{base: `100%`}}
        >
          {loading ? (
            Array(9)
              .fill('')
              .map((el, i) => <RealtorListingCard key={i} isLoading={true} />)
          ) : !property_list?.length ? (
            <GridItem colSpan={{base: 1, md: 2, xl: 3}}>
              <EmptyState
                emptyIcon={<EmptyListingsIcon />}
                text="No Listings"
                description="Looks like there no listings has been added yet"
                p={{base: '150px 24px', md: '150px 50px'}}
                bg="#fff"
                border={`1px solid`}
                borderColor={`#e4e4e7 !important`}
                borderRadius="9px"
              />
            </GridItem>
          ) : (
            property_list?.map((el, i) => <RealtorListingCard key={i} data={el} />)
          )}
        </Grid>
        <HStack></HStack>
      </Stack>
    </AgentsLayoutView>
  );
}
