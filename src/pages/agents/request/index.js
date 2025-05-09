import {useQuery} from 'react-query';
//prettier-ignore
import {
  Box, Center, Flex, Heading,
  List, ListItem, Text, 
  InputRightElement, InputGroup, Input,
} from '@chakra-ui/react';
import {fetchAgentRequest} from '@/realtors_portal/api/agents';
import AgentsLayoutView from '@/realtors_portal/components/AgentLayout/View';
import {useState} from 'react';
import {SearchIcon} from '@chakra-ui/icons';
import {RequestPagePagination} from '@/realtors_portal/components/request/RequestPagePagination';
import {RequestSidebar} from '@/realtors_portal/components/request/RequestSidebar';
import {OvalLoader} from '@/realtors_portal/components/loaders/AnimatedLoader';
import {EmptyRequestsIcon} from '@/realtors_portal/components/assets/UsefulSVGs';
import {Request} from '@/realtors_portal/components/request/Request';
import {EmptyState} from '@/realtors_portal/components/common/Table';

const RequestPage = () => {
  const tabs = ['listing_inspection', 'sales_commission'];
  const [tab, setTab] = useState(tabs[0] || '');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const {data, isError, isLoading, error} = useQuery(['agent_request_pending', tab], () =>
    fetchAgentRequest(`?status=pending`)
  );
  const {
    data: data2,
    isError: isError2,
    isLoading: isLoading2,
    error: error2,
  } = useQuery(['agent_request_history', tab], () => fetchAgentRequest(``));

  const list_data = {
    listing_inspection:
      !data || !data2
        ? []
        : [
            ...data?.data?.inspection_requests?.filter(el =>
              el?.project?.constructed_by?.toLowerCase()?.includes(search.toLowerCase())
            ),
            ...data2?.data?.inspection_requests?.filter(el =>
              el?.project?.constructed_by?.toLowerCase()?.includes(search.toLowerCase())
            ),
          ] || [],
    sales_commission:
      !data || !data2
        ? []
        : [
            ...data?.data?.commission_requests?.filter(el =>
              el?.property_info?.toLowerCase()?.includes(search.toLowerCase())
            ),
            ...data2?.data?.commission_requests?.filter(el =>
              el?.property_info?.toLowerCase()?.includes(search.toLowerCase())
            ),
          ] || [],
  };

  return (
    <AgentsLayoutView isError={isError || isError2} error={error || error2}>
      <Flex
        gap={'24px'}
        minW={'100%'}
        direction={{base: 'column', lg: 'row'}}
        w={'100%'}
        maxW={'100%'}
      >
        <RequestSidebar
          tab={tab}
          tabs={tabs}
          changeTab={el => {
            setTab(el);
            setPage(1);
          }}
          setSearch={setSearch}
        />
        <Box
          flex={'1'}
          borderRadius="8px"
          border="1px solid #EAECF0"
          backgroundColor={'white'}
          textAlign={'left'}
          my={{base: `0px`, lg: `32px`}}
        >
          {isLoading || isLoading2 ? (
            <>
              <Center
                minH="70vh"
                w="100%"
                minW={{base: '200px', sm: '500px'}}
                position={'relative'}
              >
                <OvalLoader />
              </Center>
            </>
          ) : (
            <>
              <Flex
                padding={'16px 18px'}
                justify="space-between"
                align={{base: 'flex-start', lg: 'center'}}
                borderBottom="1px solid #EAECF0"
                direction={{base: 'column', lg: 'row'}}
                gap="20px"
                display={{base: `none`, lg: `flex`}}
              >
                <Heading
                  fontSize={'18.448px'}
                  lineHeight="150%"
                  color={'#475467'}
                  textTransform={'capitalize'}
                  textAlign={'left'}
                  fontWeight={'400'}
                >
                  {tab?.split('_')?.join(' ')}
                </Heading>
                <Flex gap={'10px'} align="center" w={{base: '100%', lg: 'max-content'}}>
                  <InputGroup alignItems="center" width="100%">
                    <Input
                      pr="4.5rem"
                      type="search"
                      color="#98A2B3"
                      background="#F5f5f5"
                      borderRadius="12px"
                      _placeholder={{
                        color: 'gray.500',
                        fontsize: '12px',
                        textColor: '#919191',
                      }}
                      p={'10px 16px'}
                      placeholder="Search"
                      border={'1px solid #E4E4E4'}
                      onChange={e => setSearch(e.target.value)}
                      maxW={{base: '100%', lg: '152px'}}
                      _focus={{maxWidth: '310px'}}
                      _focusVisible={{maxWidth: '310px'}}
                      _active={{maxWidth: '310px'}}
                      transition={'.5s'}
                    />
                    <InputRightElement>
                      <SearchIcon cursor="pointer" color="#98A2B3" />
                    </InputRightElement>
                  </InputGroup>
                </Flex>
              </Flex>
              <List minH={{base: `40vh`, lg: '60vh'}} display={'flex'} flexDir={'column'}>
                {isLoading || isLoading2 ? (
                  <Center
                    flexDir="column"
                    spacing={3}
                    mx="auto"
                    w="full"
                    h="100%"
                    py="100px"
                    flex={'1'}
                  >
                    <Center
                      mx={'auto'}
                      w={{base: '500px', lg: '100%'}}
                      minW={{base: '0px', lg: '500px'}}
                      maxW={'100%'}
                    >
                      <Center w="100%">
                        <OvalLoader position="absolute" top="20%" left="44.6%" h="70vh" />
                      </Center>
                    </Center>
                  </Center>
                ) : list_data[tab]?.slice(limit * (page - 1), limit * page)?.length === 0 ? (
                  // <Center
                  //   flexDir="column"
                  //   spacing={3}
                  //   mx="auto"
                  //   w="full"
                  //   h="100%"
                  //   py="100px"
                  //   flex={'1'}
                  //   minW={{base: '0px', lg: '500px'}}
                  // >
                  //   <Center boxSize={`40px`} position={`relative`}>
                  //     <EmptyRequestsIcon />
                  //   </Center>
                  //   <Text fontSize="14px" fontWeight="500" textTransform={`uppercase`}>
                  //     Nothing Found
                  //   </Text>
                  //   <Text
                  //     w="full"
                  //     textAlign="center"
                  //     fontSize="14px"
                  //     fontWeight="400"
                  //     color="#606060"
                  //     mx="auto"
                  //   >
                  //     Looks like, there is no request at the moment
                  //     {/* for{' '}
                  // <b style={{textTransform: 'capitalize'}}>{tab?.split('_')?.join(' ')}</b> */}
                  //   </Text>
                  // </Center>
                  <EmptyState
                    emptyIcon={<EmptyRequestsIcon />}
                    description={`Looks like, there is no request at the moment`}
                  />
                ) : (
                  list_data[tab]
                    ?.slice(limit * (page - 1), limit * page)
                    ?.map((request_data, i) => (
                      <ListItem key={i} py={'24px'} borderBottom="1px solid #EAECF0">
                        <Request request_data={request_data} tab={tab} />
                      </ListItem>
                    ))
                )}
              </List>
              {list_data[tab].length > 0 && (
                <RequestPagePagination
                  page={page}
                  limit={limit}
                  total={list_data[tab].length}
                  setPage={setPage}
                  list={list_data[tab]}
                />
              )}
            </>
          )}
        </Box>
      </Flex>
    </AgentsLayoutView>
  );
};

export default RequestPage;
