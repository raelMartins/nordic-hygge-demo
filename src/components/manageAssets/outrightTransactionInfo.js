import {Text, Stack, useDisclosure, Center} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {formatToCurrency} from '@/utils';
import TransactionHistory from './components/assetsTransactionHistory';
import {useMutation} from 'react-query';
import {useRouter} from 'next/router';
import {fetchPurchaseHistory} from '@/api/payment';
import {AssetOverview} from '../my_asset/AssetOverview';
import HomeOwnersPacket from './sections/HomeOwnersPacket';
import PurchaseFeedback from '../purchaseFeedback';
import {Button} from '@/ui-lib';
import {AllocationDrawer} from './components/allocation/AllocationDrawer';
import useGetSession from '@/utils/hooks/getSession';
import {formatPropertySize} from '@/utils/misc';

const OutrightTransactionInfo = ({displayTab, equityInfo, refetch}) => {
  const homeOwnersPacketDrawer = useDisclosure();
  const feedDrawer = useDisclosure();
  const allocationDrawer = useDisclosure();

  const {sessionData: user} = useGetSession('loggedIn');

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
  const equityId = equityInfo?.id;
  console.log({equityInfo});

  const TRANSACTIONS_HISTORY = useMutation(() => fetchPurchaseHistory(equityId, user?.user?.id), {
    onError: err => {
      toastForError(err, true, toast);
    },
    mutationKey: ['transaction_history', equityId, user?.user?.id],
    retry: 0,
  });
  useEffect(() => {
    TRANSACTIONS_HISTORY?.mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arrayData = TRANSACTIONS_HISTORY?.data?.data ?? [];

  const FEES_ARRAY =
    equityInfo?.equity_fees?.map(el => {
    // equityInfo?.unit?.fees?.map(el => {
      return {label: el?.name, value: formatToCurrency(el.amount)};
    }) || [];

  const OVERVIEWINFO = [
    // {
    //   label: 'Property Type',
    //   value: equityInfo?.project?.building_type ?? '-',
    // },
    {
      label: 'Land Title',
      value: equityInfo?.project?.land_title ?? '-',
    },
    {
      label: 'Development Stage',
      value: equityInfo?.project?.status ?? '-',
    },
    {
      label: 'Unit size',
      value: formatPropertySize(equityInfo?.unit?.unit_size),
    },

    {
      label: 'Allocated Unit',
      value: equityInfo?.allocation
        ? equityInfo?.allocation
        : equityInfo?.unit?.allocation_type === 'auto'
        ? `Eligible at ${equityInfo?.unit?.allocation_milestone ?? '-'}%`
        : `Not allocated yet`,
      hide:
        !equityInfo.can_allocate ||
        (equityInfo?.unit?.allocation_type !== 'auto' && !equityInfo?.allocation),
      // component: <Allocations equity={equityInfo} refetch={refetch} />,
    },
    {
      label: 'Select Allocation',
      component: (
        <Button
          onClick={allocationDrawer.onOpen}
          variation={`secondary`}
          fontSize={`11px`}
          p={` 6px 10px`}
          w={`max-content`}
          fontWeight={`500`}
        >
          Select
        </Button>
      ),
      hide: !equityInfo.can_allocate || equityInfo?.allocation,
    },
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
        <Center
          // p={{ md: "21.461px 24.894px", base: "16px 17.501px" }}
          p={{base: '24.5px'}}
          justifyContent="center"
          w="full"
          bg="matador_background.100"
          boxShadow="0px 3.434px 8.584px 0px rgba(0, 0, 0, 0.03)"
          border={`1px solid`}
          borderColor={`matador_border_color.100`}
        >
          <Stack align="center" gap={{base: '6px', md: '8px'}} alignSelf="center">
            <Text fontSize="14px" fontWeight="400" color={'text'}>
              Total Paid
            </Text>
            <Text
              fontSize={{base: '16px', md: '24px'}}
              fontWeight="600"
              lineHeight={{base: '100%'}}
              color={'text'}
              letterSpacing={`0.48px`}
            >
              {formatToCurrency(equityInfo.amount_paid)}
            </Text>
          </Stack>
        </Center>
        <AssetOverview arrayData={OVERVIEWINFO} />
        {FEES_ARRAY?.length > 0 && (
          <TransactionHistory
            title={`Fees`}
            arrayData={FEES_ARRAY || []}
            isLoading={TRANSACTIONS_HISTORY?.isLoading}
            isError={TRANSACTIONS_HISTORY?.isError}
            error={TRANSACTIONS_HISTORY?.error}
            spacing={{xl: '15.66px', base: '10.68px'}}
          />
        )}

        <TransactionHistory
          arrayData={arrayData}
          isLoading={TRANSACTIONS_HISTORY?.isLoading}
          isError={TRANSACTIONS_HISTORY?.isError}
          error={TRANSACTIONS_HISTORY?.error}
          spacing={{xl: '15.66px', base: '10.68px'}}
        />
      </Stack>

      <Stack gap={{base: `12px`}} mt={`auto`} pt={`10px`}>
        <Button
          variation={`primary`}
          onClick={feedDrawer.onOpen}
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
          onClick={homeOwnersPacketDrawer.onOpen}
          fontSize={`16px`}
          fontStyle={`normal`}
          fontWeight={`600`}
          lineHeight={`140%`}
          letterSpacing={`0.48px`}
          p={`9px`}
        >
          Documents
        </Button>
      </Stack>

      <AllocationDrawer equity={equityInfo} modal={allocationDrawer} refetch={refetch} />
      <HomeOwnersPacket equityId={equityInfo?.id} modal={homeOwnersPacketDrawer} />
      <PurchaseFeedback equity={equityInfo} modal={feedDrawer} />
    </Stack>
  );
};

export default OutrightTransactionInfo;
