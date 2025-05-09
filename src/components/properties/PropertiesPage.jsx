import {
  SimpleGrid,
  Skeleton,
  Stack,
  Box,
  Text,
  Flex,
  SlideFade,
  Center,
  GridItem,
  Grid,
} from '@chakra-ui/react';
import {ListingCard} from '../../components/cards';
import {useEffect, useState} from 'react';
import {LayoutView} from '../../components/page_layout';
import {fetchProjectsWithFilters} from '../../api/listing';
import {useInfiniteQuery, useQuery} from 'react-query';
import {fetchWatchlist} from '../../api/watchlist';
import OffersBar from '../../components/offers/offersBar';
import InspectionFeedBack from '../../components/feedback';
import ValidateCustomerEquity from '../../components/validateCustomerAssets/ValidateCustomerEquityBar';
import ErrorState from '../../components/appState/error-state';
import EmptyState from '../../components/appState/empty-state';
import PendingTransactionsBar from '../../components/pendingTransaction/pendingTransactionsBar';
import {ArrowBackIcon} from '@chakra-ui/icons';
import FilterList from './filterList';
import EmptyStateForFlter from './filterList/components/emptyStateForFilter';
import filterBG from '../../images/filter-bg.png';
// import layoutBG from '../../images/layoutBackground.png';
import layoutBG from '../../images/nordic_background.jpeg';
import {Button, Spinner} from '@/ui-lib';
import useGetSession from '@/utils/hooks/getSession';
import Image from 'next/image';
import {useRouter} from 'next/router';
import isMobile from '@/utils/extras';

const defaultFilterObj = {
  paymentPlan: false,
  propertyType: [],
  priceRange: {
    priceFrom: '',
    priceTo: '',
  },
  no_of_bedroom: [],
  searchString: '',
};

const ScrollDownIcon = ({...rest}) => {
  const color = `#ffffff`;
  return (
    <Box height={`72px`} width={`72px`} {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="scroll_down_icon"
      >
        <rect width="72" height="72" rx="36" fill="black" fillOpacity="0.4" />
        <rect x="0.5" y="0.5" width="71" height="71" rx="35.5" stroke="black" strokeOpacity="0.2" />
        <path
          d="M35.47 40.278C35.6106 40.4184 35.8013 40.4973 36 40.4973C36.1988 40.4973 36.3894 40.4184 36.53 40.278L38.78 38.029C38.9125 37.8868 38.9846 37.6988 38.9812 37.5045C38.9777 37.3102 38.899 37.1248 38.7616 36.9874C38.6242 36.85 38.4388 36.7712 38.2445 36.7678C38.0502 36.7644 37.8622 36.8365 37.72 36.969L36 38.686L34.28 36.967C34.2108 36.8954 34.128 36.8383 34.0365 36.799C33.945 36.7598 33.8465 36.7391 33.7469 36.7383C33.6474 36.7375 33.5486 36.7565 33.4565 36.7943C33.3643 36.832 33.2806 36.8877 33.2102 36.9582C33.1398 37.0287 33.0842 37.1124 33.0465 37.2046C33.0088 37.2968 32.9899 37.3956 32.9908 37.4951C32.9917 37.5947 33.0125 37.6931 33.0518 37.7846C33.0912 37.8761 33.1483 37.9588 33.22 38.028L35.47 40.278ZM36 33.055C35.7878 33.055 35.5843 32.9707 35.4343 32.8207C35.2843 32.6706 35.2 32.4672 35.2 32.255C35.2 32.0428 35.2843 31.8393 35.4343 31.6893C35.5843 31.5393 35.7878 31.455 36 31.455C36.2122 31.455 36.4157 31.5393 36.5657 31.6893C36.7157 31.8393 36.8 32.0428 36.8 32.255C36.8 32.4672 36.7157 32.6706 36.5657 32.8207C36.4157 32.9707 36.2122 33.055 36 33.055ZM35.2 35.071C35.2 35.176 35.2207 35.2801 35.2609 35.3771C35.3011 35.4742 35.36 35.5624 35.4343 35.6367C35.5086 35.711 35.5968 35.7699 35.6939 35.8101C35.7909 35.8503 35.8949 35.871 36 35.871C36.1051 35.871 36.2091 35.8503 36.3061 35.8101C36.4032 35.7699 36.4914 35.711 36.5657 35.6367C36.64 35.5624 36.6989 35.4742 36.7391 35.3771C36.7793 35.2801 36.8 35.176 36.8 35.071C36.8 34.8588 36.7157 34.6553 36.5657 34.5053C36.4157 34.3553 36.2122 34.271 36 34.271C35.7878 34.271 35.5843 34.3553 35.4343 34.5053C35.2843 34.6553 35.2 34.8588 35.2 35.071Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M36 26.001C34.0109 26.001 32.1032 26.7912 30.6967 28.1977C29.2902 29.6042 28.5 31.5119 28.5 33.501V38.501C28.5 40.4901 29.2902 42.3978 30.6967 43.8043C32.1032 45.2108 34.0109 46.001 36 46.001C37.9891 46.001 39.8968 45.2108 41.3033 43.8043C42.7098 42.3978 43.5 40.4901 43.5 38.501V33.501C43.5 31.5119 42.7098 29.6042 41.3033 28.1977C39.8968 26.7912 37.9891 26.001 36 26.001ZM30 33.501C30 31.9097 30.6321 30.3836 31.7574 29.2584C32.8826 28.1331 34.4087 27.501 36 27.501C37.5913 27.501 39.1174 28.1331 40.2426 29.2584C41.3679 30.3836 42 31.9097 42 33.501V38.501C42 40.0923 41.3679 41.6184 40.2426 42.7436C39.1174 43.8689 37.5913 44.501 36 44.501C34.4087 44.501 32.8826 43.8689 31.7574 42.7436C30.6321 41.6184 30 40.0923 30 38.501V33.501Z"
          fill={color}
        />
      </svg>
    </Box>
  );
};

const PropertiesPage = ({...rest}) => {
  const [queryString, setQueryString] = useState(null);
  const [filterObj, setFilterObj] = useState(defaultFilterObj);

  const [scrollDirection, setScrollDirection] = useState('down');
  const [count, setCount] = useState(0);
  const router = useRouter();

  const {sessionData: LoggedinUser} = useGetSession('loggedIn');

  const isAppendable = item => {
    if (item === '' || item === undefined || item === null) return false;
    else return true;
  };

  const {
    data: infiniteData,
    error: infiniteError,
    isError: infiniteIsError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isLoading: infiniteLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['infiniteListingData', queryString],
    queryFn: ({pageParam = `${queryString ? `${queryString}&` : ''}page=1`}) => {
      return fetchProjectsWithFilters(pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      const maxPageNumber = Math.ceil(lastPage?.data?.count / 10);
      const nextPageNumber = pages.length + 1;
      return nextPageNumber <= maxPageNumber
        ? `${queryString ? `${queryString}&` : ''}page=${nextPageNumber}`
        : undefined;
    },
  });

  const numberOfProjects =
    infiniteData?.pages?.flatMap(projectData => projectData?.data?.project?.map(() => 0))?.length ??
    0;

  const getQueryString = () => {
    const queryString = new URLSearchParams();

    const {
      paymentPlan,
      propertyType = [],
      priceRange = {},
      no_of_bedroom = [],
      searchString,
    } = filterObj ?? {};

    let {priceFrom, priceTo} = priceRange;
    const maxValue = infiniteData?.pages?.[0]?.data?.max_price;
    const minValue = infiniteData?.pages?.[0]?.data?.min_price;

    if (Number(priceFrom) > Number(priceTo)) {
      priceFrom = minValue;
      if (Number(priceFrom) > Number(priceTo)) {
        priceTo = maxValue;
        priceFrom = priceRange.priceFrom;
      }

      setFilterObj(prevState => ({
        ...prevState,
        priceRange: {
          ...prevState.priceRange,
          priceFrom,
          priceTo,
        },
      }));
    }

    propertyType.forEach(item => {
      queryString.append('building_type[]', item);
    });

    queryString.append('payment_plan_is_available', paymentPlan ? 'true' : 'false');

    if (isAppendable(priceFrom)) {
      queryString.append('price_from', priceFrom);
    }
    if (isAppendable(priceTo)) {
      queryString.append('price_to', priceTo);
    }

    no_of_bedroom.forEach(item => {
      queryString.append('no_of_bedroom[]', item);
    });

    if (isAppendable(searchString)) {
      queryString.append('search', searchString?.formatted_address ?? searchString);
    }

    return queryString.toString();
  };

  const handleFilter = () => {
    const queryString = getQueryString();
    return setQueryString(queryString);
  };
  const handleReset = () => {
    setFilterObj(defaultFilterObj);
    return setQueryString(null);
  };

  const scrollToTop = () => {
    return window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const arrayForLoaders = lens => Array.from({length: lens || 3 - (numberOfProjects % 3)}, () => 0);

  const handleAnimation = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 840 && numberOfProjects > 10) {
      setScrollDirection('up');
    } else {
      setScrollDirection('down');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      handleAnimation();
      if (
        !isFetchingNextPage &&
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 10
      ) {
        return hasNextPage ? fetchNextPage() : null;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const {data: watchlistData, refetch: refetchForWatchlist} = useQuery(
    ['waitlistipoiid'],
    fetchWatchlist
  );

  const isIdWatchlisted = id =>
    watchlistData?.data?.watchlist
      ? watchlistData?.data?.watchlist?.some(item => item.project.id === id)
      : undefined;

  const display_product = infiniteData?.pages?.[0]?.data?.project?.[0] || {};

  useEffect(() => {
    if (!display_product) return;
    let index = count || 0;
    const rifle_interval = setInterval(() => {
      if (index === display_product?.photos?.length - 1) {
        index = 0;
        setCount(0);
      } else {
        index++;
        setCount(index);
      }
    }, 7000);
    return () => {
      clearInterval(rifle_interval);
    };
  }, [display_product]);

  return (
    <LayoutView
      noPadding
      noFooter={infiniteLoading}
      noNavbar={!LoggedinUser || infiniteLoading}
      fullFooter
      isLoading={infiniteLoading}
      isError={infiniteIsError}
      error={infiniteError}
      position={`relative`}
    >
      <Box width={`100%`} height={{base: `80vh`}} position={`relative`} overflow={`hidden`}>
        <Box
          position={`absolute`}
          top={`0px`}
          left={`0px`}
          right={`0px`}
          bottom={`0px`}
          background={`rgba(0, 0, 0, 0.40)`}
          zIndex={`1`}
        />

        {display_product?.photos?.map((image, i) => (
          <Image
            key={i}
            src={image?.photo}
            // src={layoutBG.src}
            fill
            style={{
              objectFit: `cover`,
              opacity: isMobile ? i == 0 : count == i ? `1` : `0`,
              transition: `.6s`,
            }}
            alt={`background image`}
            priority
          />
        ))}

        <Stack
          w="full"
          position={'absolute'}
          top={`0px`}
          left={`0px`}
          p={{base: '32px 22px', lg: '64px 120px'}}
          gap={{base: `16px`, md: `16px`}}
          zIndex={`2`}
          justifyContent={`center`}
          color={`#fff`}
          h={`100%`}
          textAlign={{base: `left`}}
          textTransform={{base: `uppercase`}}
        >
          <Text
            fontSize={{base: `48px`}}
            fontWeight={{base: `600`}}
            lineHeight={{base: `130%`}}
            letterSpacing={{base: `1.908px`}}
            className="heading-text-regular"
          >
            {display_product?.name}
          </Text>
          <Text
            fontSize={{base: `20px`}}
            fontWeight={{base: `500`}}
            lineHeight={{base: `100%`}}
            letterSpacing={{base: `6px`}}
            mb={`16px`}
          >
            {display_product?.address}
          </Text>
          <Button
            variation={`primary`}
            maxW={`max-content`}
            p={`9px 28px`}
            boxStyle={{maxWidth: `max-content`}}
            fontSize={{base: `16px`}}
            fontWeight={{base: `600`}}
            lineHeight={{base: `140%`}}
            letterSpacing={{base: `0.48px`}}
            onClick={() => {
              router.push(`/listing-details/${display_product?.id}`);
            }}
          >
            Learn More
          </Button>
        </Stack>
        <ScrollDownIcon
          position="absolute"
          bottom={{base: `20px`, lg: `40px`}}
          right={{base: `22px`, lg: `120px`}}
          cursor={`pointer`}
          onClick={() => window?.scrollBy(0, 700)}
          zIndex={`2`}
        />
      </Box>
      <Stack
        w="full"
        position={'relative'}
        p={{base: '32px 22px', lg: '64px 120px'}}
        gap={{base: `30px`, md: `24px`}}
        bg={`matador_background.100`}
        pb={{base: `60px`, lg: `100px`}}
      >
        <Text
          className="heading-text-regular"
          fontSize={{base: `36px`, lg: '48px'}}
          color="text"
          lineHeight={`130%`}
          textTransform={`uppercase`}
          fontWeight={`600`}
          letterSpacing={`1.908px`}
        >
          Our Projects
        </Text>

        {numberOfProjects > 0 ? (
          <>
            <Grid
              templateColumns={{base: `1fr`, md: `1fr 1fr`}}
              gap={{base: `32px`, md: '40px'}}
              w={`100%`}
              justify={'center'}
              // alignItems={'center'}
            >
              {infiniteData.pages.map((projectData, i) =>
                projectData?.data?.project?.map((data, index) =>
                  index === 0 && i === 0 ? (
                    <></>
                  ) : (
                    <GridItem
                      key={data?.id}
                      colSpan={{
                        base: 1,
                        md:
                          infiniteData.pages?.length === i + 1 && //if we are on the last page
                          projectData?.data?.project?.length === index + 1 && //and on the last item of that page
                          index % 2 == 1 //and there is only one item on that line
                            ? 2
                            : 1,
                      }}
                      w={`100%`}
                    >
                      <ListingCard
                        key={data?.id}
                        data={data}
                        refetch={refetchForWatchlist}
                        justifyContent="center"
                        is_id_watchlisted={isIdWatchlisted(data?.id)}
                        index={i * 10 + index + 1}
                        full_width={
                          infiniteData.pages?.length === i + 1 && //if we are on the last page
                          projectData?.data?.project?.length === index + 1 && //and on the last item of that page
                          index % 2 == 1 //and there is only one item on that line
                            ? true
                            : false
                        }
                      />
                    </GridItem>
                  )
                )
              )}
              {isFetchingNextPage
                ? // ? arrayForLoaders().map((item, index) => (
                  [{}, {}].map((item, index) => (
                    <SlideFade key={index} in={isFetchingNextPage}>
                      <ListingCard
                        key={index}
                        isLoading={true}
                        index={infiniteData.pages?.length * 10 + index}
                      />
                    </SlideFade>
                  ))
                : null}
            </Grid>
            {/* <ScrollToTop scrollDirection={scrollDirection} scrollToTop={scrollToTop} /> */}
          </>
        ) : queryString ? (
          <EmptyStateForFlter handleReset={handleReset} />
        ) : (
          <EmptyState heading={'Nothing found'} text={`No property was found`} />
        )}
      </Stack>
    </LayoutView>
  );
};

const ScrollToTop = ({scrollDirection, scrollToTop}) => {
  return (
    <Center
      opacity={scrollDirection === 'up' ? 1 : 0}
      visibility={scrollDirection === 'up' ? 'visible' : 'hidden'}
      transition="ease-in-out 0.3s"
      transform={`translateY(${scrollDirection === 'up' ? '0px' : '20px'}) scale(${
        scrollDirection === 'up' ? 1 : 0.8
      })`}
      position="fixed"
      bottom="20"
      right={{base: '3%', md: '10'}}
      p="4px"
      boxSize="50px"
      role="button"
      onClick={scrollToTop}
      borderRadius="full"
      bg="#f5f5f5"
      color={`#191919`}
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)"
    >
      <Box transform="rotate(90deg)">
        <ArrowBackIcon fontSize={`24px`} />
      </Box>
    </Center>
  );
};

export default PropertiesPage;
