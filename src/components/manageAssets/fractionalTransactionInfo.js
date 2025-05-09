import {
  GridItem,
  HStack,
  Text,
  Stack,
  Box,
  Divider,
  useMediaQuery,
  useDisclosure,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import {formatToCurrency, formatWithCommas} from '../../utils';
import {changeDateFormat} from '../../utils/formatDate';
import TransactionHistory from './components/assetsTransactionHistory';
import FRACTIONTRANSACTIONHISTORYCOLUMN from '../../constants/tables/fractionsTransactionHistoryColumns';
import {useInfiniteQuery, useQuery} from 'react-query';
import {fetchFractionalInfo, fractionalEquityTransactionHistory} from '../../api/listing';
import {useRouter} from 'next/router';
import {Button} from '@/ui-lib';
import {AssetOverview} from '../my_asset/AssetOverview';
import PurchaseFeedback from '../purchaseFeedback';
import InvestorsPacket from './sections/InvestorsPacket';

const FractionalTransactionInfo = ({displayTab, equityInfo, refetch}) => {
  const investorsPacketDrawer = useDisclosure();
  const feedbackDrawer = useDisclosure();
  const customScrollbarStyles = (trackColor = '#fff', thumbColor = '#cbcbcb') => ({
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: `inset 0 0 6px ${trackColor}`,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: thumbColor,
    },
  });

  const {query} = useRouter();

  const [shouldScroll, setScrollDirection] = useState('down');

  const {
    data: infiniteData,
    error,
    isError,

    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fraction transaction', equityInfo?.id],
    queryFn: ({pageParam = `${equityInfo?.id}&page=1`}) => {
      return fractionalEquityTransactionHistory(pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      const maxPageNumber = Math.ceil(lastPage?.data?.count / 10);
      const nextPageNumber = pages.length + 1;

      return nextPageNumber <= maxPageNumber
        ? `${equityInfo?.id}&page=${nextPageNumber}`
        : undefined;
    },
  });

  const {data: fractionalDetail} = useQuery(
    ['fractional', equityInfo?.unit?.id],
    () => fetchFractionalInfo(equityInfo?.unit?.id),
    {enabled: !!equityInfo?.unit?.id}
  );

  console.log({fractionalDetail, equityInfo});

  const stackHolders = fractionalDetail?.data?.partners;
  const dividendObj = fractionalDetail?.data?.extra_info;

  const stake_holders_array = stackHolders
    ? stackHolders?.map(item => {
        return {label: item?.stakeholder_type, value: item.stakeholder_name};
      })
    : [];

  const FEES_ARRAY =
    equityInfo?.equity_fees?.map(el => {
      // equityInfo?.unit?.fees?.map(el => {
      return {label: el?.name, value: formatToCurrency(el.amount)};
    }) || [];

  const scrollToTop = () => {
    const wrap = document?.getElementById('tnxsHistory');

    wrap.scrollTop = 0;
  };
  const numberOfTransactions =
    infiniteData?.pages?.flatMap(trnx => trnx?.data?.results?.map(() => 0))?.length ?? 0;

  const handleAnimation = wrap => {
    const currentScrollY = wrap?.scrollTop;

    if (currentScrollY > 840 && numberOfTransactions > 10) {
      setScrollDirection('up');
    } else {
      setScrollDirection !== 'down' ? setScrollDirection('down') : null;
    }
  };

  const handleScroll = () => {
    const wrap = document?.getElementById('tnxsHistory');

    handleAnimation(wrap);

    if (
      !isFetchingNextPage &&
      numberOfTransactions >= 10 &&
      wrap?.clientHeight + wrap?.scrollTop + 10 >= wrap?.scrollHeight
    ) {
      return hasNextPage ? fetchNextPage() : null;
    }
  };
  const arrayData = infiniteData?.pages?.flatMap(transHistory =>
    transHistory?.data?.results?.map(item => item)
  );

  const OVERVIEWINFO = [
    {
      label: 'Fractional Value',
      value: equityInfo?.unit?.price_per_fraction
        ? formatToCurrency(equityInfo?.unit?.price_per_fraction)
        : '-',
    },
    {label: 'Total Fractions', value: equityInfo?.amount_of_fractions ?? '-'},
    ...(equityInfo?.allocation
      ? [
          {
            label: 'Allocation',
            value: equityInfo?.allocation ? equityInfo?.allocation : 'Not Allocated',
          },
        ]
      : []),
    {label: 'Holding Period', value: equityInfo?.unit?.holding_period ?? '-'},
    ...stake_holders_array,
  ];

  return (
    <Stack
      sx={customScrollbarStyles()}
      overflowY="auto"
      scrollBehavior="smooth"
      w={{base: 'full'}}
      p={{base: `24px 20px`}}
      gap={`12px`}
      h={`100%`}
    >
      <Stack flex={`1`} overflowY={`auto`} gap={`12px`}>
        <Stack spacing="14px" w="full" className="sub-text-regular">
          <Stack
            // p={{ md: "21.461px 24.894px", base: "16px 17.501px" }}
            p={{base: '13px'}}
            justifyContent="center"
            w="full"
            bg="matador_background.100"
            boxShadow="0px 3.434px 8.584px 0px rgba(0, 0, 0, 0.03)"
            border={`1px solid`}
            borderColor={`matador_border_color.100`}
          >
            <Stack align="center" gap={{base: '6px', md: '8px'}} alignSelf="center" p={`10px`}>
              <Text fontSize="14px" fontWeight="400" color={'text'}>
                Unit Price
              </Text>
              <Text
                fontSize={{base: '16px', md: '24px'}}
                fontWeight="600"
                lineHeight={{base: '100%'}}
                color={'text'}
                letterSpacing={`0.48px`}
              >
                {formatToCurrency(equityInfo.total_unit_price)}
              </Text>
            </Stack>

            {dividendObj?.enable_dividend ? (
              <HStack
                w="full"
                align={`stretch`}
                spacing={{base: '12.33px', md: '21.84px'}}
                justify={`space-between`}
                p={{base: `27.5px 0px`}}
              >
                <Stack h="full" spacing={{base: '2.41px', md: '3.43px'}}>
                  <Text
                    fontSize={'16px'}
                    lineHeight={`15px`}
                    fontWeight={{base: '600'}}
                    color="matador_text.100"
                    letterSpacing={`0.48px`}
                  >
                    {formatToCurrency(dividendObj?.dividend_amount)}
                  </Text>

                  <Text
                    textTransform="capitalize"
                    color="matador_text.500"
                    fontSize={'12px'}
                    lineHeight={`14px`}
                    fontWeight="400"
                    letterSpacing={`-0.24px`}
                  >
                    {dividendObj?.dividend_payout} Income
                  </Text>
                </Stack>
                <Stack spacing={{base: '2.41px', md: '3.43px'}} align="flex-end">
                  <Text
                    fontSize={'16px'}
                    lineHeight={`15px`}
                    fontWeight={{base: '600'}}
                    color="matador_text.100"
                    letterSpacing={`0.48px`}
                  >
                    {dividendObj?.dividend_start_date ?? '-'}
                  </Text>
                  <Text
                    textTransform="capitalize"
                    color="matador_text.500"
                    fontSize={'12px'}
                    lineHeight={`14px`}
                    fontWeight="400"
                    letterSpacing={`-0.24px`}
                  >
                    Income Date
                  </Text>
                </Stack>
              </HStack>
            ) : null}
          </Stack>
        </Stack>
        <AssetOverview arrayData={OVERVIEWINFO} />
        {FEES_ARRAY?.length > 0 && (
          <TransactionHistory
            title={`Fees`}
            arrayData={FEES_ARRAY || []}
            isLoading={isLoading}
            isError={isError}
            error={error}
          />
        )}
        <TransactionHistory
          arrayData={arrayData || []}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
      </Stack>

      <Stack gap={{base: `12px`}} mt={`auto`} pt={`10px`}>
        <Button
          variation={`secondary`}
          onClick={feedbackDrawer.onOpen}
          fontSize={`16px`}
          fontStyle={`normal`}
          fontWeight={`600`}
          lineHeight={`140%`}
          letterSpacing={`0.48px`}
          p={`9px`}
        >
          Give Feedback
        </Button>
        <Button
          variation={`secondary`}
          onClick={investorsPacketDrawer.onOpen}
          fontSize={`16px`}
          fontStyle={`normal`}
          fontWeight={`600`}
          lineHeight={`140%`}
          letterSpacing={`0.48px`}
          p={`9px`}
        >
          Investors Packet
        </Button>
      </Stack>
      <InvestorsPacket
        equityId={equityInfo?.id}
        modal={investorsPacketDrawer}
        packets={fractionalDetail?.data?.packets}
      />
      <PurchaseFeedback equity={equityInfo} modal={feedbackDrawer} />
    </Stack>
  );
};

export default FractionalTransactionInfo;
