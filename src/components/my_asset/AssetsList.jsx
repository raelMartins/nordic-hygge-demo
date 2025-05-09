import {Box, Center, Flex, HStack, Stack, Text} from '@chakra-ui/react';
import EmptyState from '../appState/empty-state';
import {BsArrowUp} from 'react-icons/bs';
import ErrorState from '../appState/error-state';
import {fetchUserEquity} from '@/api/listing';
import {useInfiniteQuery} from 'react-query';
import {useRef, useState} from 'react';
import {drawer_title_styles} from '../navbar/Navbar';
import {EquityCard} from '../cards/EquityCard';
import {useCustomToast} from '../CustomToast';
import ThreeDots from '../loaders/ThreeDots';
import {Footer} from '../page_layout/footer';

export const AssetsList = ({handleManageAssets}) => {
  const toast = useCustomToast();
  const [shouldScroll, setScrollDirection] = useState('down');

  const {data, isError, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage} =
    useInfiniteQuery({
      queryKey: ['infinitePaidAssets', 'PAID'],
      queryFn: ({pageParam = `PAID&page=1`}) => {
        return fetchUserEquity(pageParam);
      },
      getNextPageParam: (lastPage, pages) => {
        const maxPageNumber = Math.ceil(lastPage?.data?.count / 10);
        const nextPageNumber = pages.length + 1;
        return nextPageNumber <= maxPageNumber ? `PAID&page=${nextPageNumber}` : undefined;
      },
    });

  const USER_EQUITY = data?.pages?.flatMap(assetsData =>
    assetsData?.data?.results?.map(item => item)
  );

  console.log({USER_EQUITY});

  const readScollToRef1 = useRef();

  const wrap = document?.getElementById('assetsWrap');

  const scrollToTop = () => {
    wrap.scrollTop = 0;
  };
  const numberOfAssets =
    data?.pages?.flatMap(assetsData => assetsData?.data?.results?.map(() => 0))?.length ?? 0;

  const handleAnimation = () => {
    const currentScrollY = wrap?.scrollTop;

    if (currentScrollY > 540 && numberOfAssets > 10) {
      setScrollDirection('up');
    } else {
      setScrollDirection('down');
    }
  };

  const handleScroll = () => {
    console.log(`scrolling`);
    const wrap = document?.getElementById('assetsWrap');

    handleAnimation();

    if (!isFetchingNextPage && wrap?.clientHeight + wrap?.scrollTop >= wrap?.scrollHeight) {
      console.log({scrol: 'insode'});

      return hasNextPage ? fetchNextPage() : null;
    }
  };

  if (data?.code === 'ERR_NETWORK') {
    toast({
      title: `${data?.message}`,
      description: ` please check your network connection`,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  }

  return (
    <>
      <Flex {...drawer_title_styles}>
        <Text>Portfolio</Text>
      </Flex>
      {isLoading ? (
        <Center w="full" h="300px">
          {/* <Spinner disableAbsoluteCenteredSpinner h={`50px`} w={`50px`} /> */}
          <ThreeDots />
        </Center>
      ) : isError ? (
        <ErrorState />
      ) : (
        <Box px={3} pt={{base: '10px', md: '15px'}} overflowY="auto" onScroll={handleScroll}>
          {USER_EQUITY?.length > 0 ? (
            <>
              <Stack
                scrollBehavior={'smooth'}
                className="hide_scroll"
                ref={readScollToRef1}
                id="assetsWrap"
              >
                <Stack gap={`20px`} alignItems={'center'}>
                  {(USER_EQUITY || [])?.map((equity, idx) => (
                    <EquityCard
                      key={idx}
                      equity={equity}
                      sub_text={
                        equity?.type === 'FRACTIONAL'
                          ? `${equity?.fractions_distributed - equity?.fractions_left} fraction${
                              equity?.fractions_distributed - equity?.fractions_left > 1 ? `s` : ''
                            }`
                          : equity?.unit?.unit_title
                      }
                      handleClick={() => handleManageAssets(equity)}
                    />
                  ))}
                  {isFetchingNextPage && (
                    <Center py={`10px`}>
                      <ThreeDots />
                    </Center>
                  )}
                  {/* <SlideFade in={isFetchingNextPage}>
                    <Text color="text" fontSize="12px" textAlign="center">
                      Just a sec ...
                    </Text>
                  </SlideFade> */}
                  <ScrollToTop shouldScroll={shouldScroll} scrollToTop={scrollToTop} />
                </Stack>
              </Stack>
            </>
          ) : (
            <Stack h={`100%`}>
              <EmptyState
                icon
                textSize={12}
                headerStyle={{textTransform: 'uppercase', fontWeight: 700, fontSize: '14px'}}
                height={{base: '300px', md: '400px'}}
                minH={{base: '300px', md: '400px'}}
                text={`Looks like you haven't purchased anything yet.`}
              />
              <Footer
                mt={`auto`}
                isDrawer
                position={`absolute`}
                bottom={`0px`}
                left={`0px`}
                right={`0px`}
              />
            </Stack>
          )}
        </Box>
      )}
    </>
  );
};

const ScrollToTop = ({shouldScroll, scrollToTop}) => {
  return (
    <HStack
      justify="center"
      opacity={shouldScroll === 'up' ? 1 : 0}
      visibility={shouldScroll === 'up' ? 'visible' : 'hidden'}
      transition="ease-in-out 0.3s"
      transform={`translateY(${shouldScroll === 'up' ? '0px' : '20px'}) scale(${
        shouldScroll === 'up' ? 1 : 0.8
      })`}
      position="fixed"
      bottom="10"
      right={{base: '3%', md: '10'}}
      align="center"
      p="5px"
      role="button"
      onClick={scrollToTop}
      borderRadius="full"
      bg="rgba(255, 255, 255, 0.6)"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)"
    >
      <BsArrowUp fontSize={`20px`} />
    </HStack>
  );
};
