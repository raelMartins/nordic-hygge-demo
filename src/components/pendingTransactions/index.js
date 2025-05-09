import {useEffect, useState} from 'react';
import TransactionsList from './TransactionsList';
import SummaryDrawer from './Summary';
import PaymentDrawer from './payment';
import {
  DrawerContent,
  Flex,
  Box,
  Text,
  Drawer,
  DrawerOverlay,
  HStack,
  Icon,
  DrawerHeader,
} from '@chakra-ui/react';
import isMobile from '../../utils/extras';
import Breakdown from './Breakdown';
import CoOwnSummary from './CoOwnSummary';
import CoOwnersList from './CoOwnersList';
import {useQuery} from 'react-query';
import {fetchListOfCoowners} from '../../api/co_owners';
import {ChevronLeftIcon, CloseIcon} from '@chakra-ui/icons';
import {drawer_styles, drawer_title_styles} from '../navbar/Navbar';
import {ResponsivePopup, ResponsivePopupContent} from '@/ui-lib';
import useGetSession from '@/utils/hooks/getSession';

export const PendingTransactionsDrawer = ({assetData, drawer, isError, isLoading, refetch}) => {
  const [type, setType] = useState('list');
  const [asset, setAsset] = useState(null);
  const [amount, setAmountToPay] = useState('');
  const {sessionData: LoggedinUser} = useGetSession('loggedIn');

  const {data, isLoading: coOwnerLoading} = useQuery(
    ['coowners', asset?.id],
    () => fetchListOfCoowners(asset?.id),
    {enabled: !!asset?.id}
  );

  const coowners = data?.data?.data ?? [];
  const theHost = coowners?.length
    ? coowners.find(item => item?.host?.id === item?.invitee?.id)
    : null;
  const isTheHost = coowners?.length
    ? coowners.find(item => item?.host?.id == LoggedinUser?.user?.id)
    : null;

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#ffffff',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const handleBackFromBreakdown = () => {
    if (asset?.co_owners?.length) setType('coOwn');
    else setType('summary');
  };

  useEffect(() => {
    if (assetData?.length === 1) {
      let property = assetData?.[0];
      setAsset(property);

      // pure outright purchase
      if (property?.type == 'WHOLE' && !property?.payment_plan && !property?.co_owners?.length) {
        setAmountToPay(Number(property?.total_unit_price));
        setType('summary');
      }
      // pure payment plan
      if (property?.type == 'WHOLE' && property?.payment_plan && !property?.co_owners?.length) {
        setAmountToPay(property?.payment_plan?.initial_deposit_in_value);
        setType('summary');
      }
      // co-ownership
      if (property?.co_owners?.length) {
        // co-ownership with outright
        if (property?.type == 'WHOLE' && !property?.payment_plan) {
          // setAmountToPay(Number(property?.total_unit_price))
          setType('coOwn');
        }
        // co-ownership with payment plan
        if (property?.type == 'WHOLE' && property?.payment_plan) {
          // setAmountToPay(property?.payment_plan?.initial_deposit_in_value)
          setType('coOwn');
        }
      }
    }
  }, [assetData]);

  const handleClose = () => {
    if (assetData?.length === 1) {
      handleBackFromBreakdown();
    } else {
      setType('list');
      setAsset(null);
      setAmountToPay('');
    }
  };

  return (
    <ResponsivePopup
      onCloseComplete={handleClose}
      blockScrollOnMount
      scrollBehavior="inside"
      onClose={drawer?.onClose}
      isOpen={drawer?.isOpen}
      // placement={isMobile ? 'bottom' : 'right'}
      placement={'right'}
    >
      <ResponsivePopupContent {...drawer_styles}>
        <Flex
          {...drawer_title_styles}
          borderBottom={`1px solid`}
          borderColor={`matador_border_color.100 !important`}
        >
          {type === 'list' ? (
            <Text>Pending Transaction</Text>
          ) : type === 'breakdown' ? (
            <HStack align={'center'} w={`100%`} textAlign={`center`}>
              <ChevronLeftIcon
                cursor={'pointer'}
                onClick={handleBackFromBreakdown}
                fontSize={'35px'}
                color={'text'}
              />
              <Text flex={`1`} px={`20px`}>
                {asset?.unit?.unit_title}
              </Text>
            </HStack>
          ) : type === 'coOwnersList' ? (
            <HStack align={'center'}>
              <ChevronLeftIcon
                cursor={'pointer'}
                onClick={() => setType('coOwn')}
                fontSize={'35px'}
                color={'text'}
              />
              <Text>Co-owners {asset?.offer_started ? '(payment)' : '(acceptance)'}</Text>
            </HStack>
          ) : type === 'summary' || type === 'coOwn' ? (
            <HStack align={'center'} w={`100%`} textAlign={`center`}>
              <ChevronLeftIcon
                cursor={'pointer'}
                onClick={() => setType('list')}
                fontSize={'35px'}
                color={'text'}
              />
              <Text flex={`1`} px={`20px`}>
                {asset?.unit?.unit_title}
              </Text>
            </HStack>
          ) : (
            <HStack align={'center'}>
              <ChevronLeftIcon
                cursor={'pointer'}
                onClick={() => setType('list')}
                fontSize={'35px'}
                color={'text'}
              />
              <Text>Payment Method</Text>
            </HStack>
          )}
          <CloseIcon cursor={'pointer'} fontSize={'14px'} color="text" onClick={drawer?.onClose} />
        </Flex>

        <Flex
          flexDir={`column`}
          w="full"
          maxH={'100%'}
          minH={'50vh'}
          // overflowY={`auto`}
          px={{base: '18px', md: '24px'}}
          pt={`10px`}
          pb={`30px`}
        >
          {type === 'list' ? (
            <TransactionsList
              assetData={assetData}
              drawer={drawer}
              isError={isError}
              isLoading={isLoading}
              type={type}
              setType={setType}
              asset={asset}
              setAsset={setAsset}
              customScrollbarStyles={customScrollbarStyles}
              setAmountToPay={setAmountToPay}
              amount={amount}
              coowners={coowners}
              coOwnerLoading={coOwnerLoading}
            />
          ) : type === 'summary' ? (
            <SummaryDrawer
              assetData={assetData}
              drawer={drawer}
              isError={isError}
              isLoading={isLoading}
              type={type}
              setType={setType}
              asset={asset}
              setAsset={setAsset}
              customScrollbarStyles={customScrollbarStyles}
              setAmountToPay={setAmountToPay}
              amount={amount}
              coowners={coowners}
              coOwnerLoading={coOwnerLoading}
            />
          ) : type === 'coOwn' ? (
            <CoOwnSummary
              isTheHost={isTheHost}
              assetData={assetData}
              drawer={drawer}
              isError={isError}
              isLoading={isLoading}
              type={type}
              setType={setType}
              asset={asset}
              setAsset={setAsset}
              customScrollbarStyles={customScrollbarStyles}
              setAmountToPay={setAmountToPay}
              amount={amount}
              coowners={coowners}
              coOwnerLoading={coOwnerLoading}
            />
          ) : type === 'breakdown' ? (
            <Breakdown
              assetData={assetData}
              drawer={drawer}
              isError={isError}
              isLoading={isLoading}
              type={type}
              setType={setType}
              asset={asset}
              setAsset={setAsset}
              customScrollbarStyles={customScrollbarStyles}
              setAmountToPay={setAmountToPay}
              amountToPay={amount}
              coowners={coowners}
              coOwnerLoading={coOwnerLoading}
            />
          ) : type === 'coOwnersList' ? (
            <CoOwnersList
              theHost={theHost}
              isTheHost={isTheHost}
              assetData={assetData}
              drawer={drawer}
              isError={isError}
              isLoading={isLoading}
              type={type}
              setType={setType}
              asset={asset}
              setAsset={setAsset}
              customScrollbarStyles={customScrollbarStyles}
              setAmountToPay={setAmountToPay}
              amountToPay={amount}
              coowners={coowners}
              coOwnerLoading={coOwnerLoading}
            />
          ) : (
            <PaymentDrawer
              assetData={assetData}
              drawer={drawer}
              isError={isError}
              isLoading={isLoading}
              type={type}
              setType={setType}
              asset={asset}
              setAsset={setAsset}
              customScrollbarStyles={customScrollbarStyles}
              setAmountToPay={setAmountToPay}
              amount={amount}
              coowners={coowners}
              coOwnerLoading={coOwnerLoading}
            />
          )}
        </Flex>
      </ResponsivePopupContent>
    </ResponsivePopup>
  );
};

export default PendingTransactionsDrawer;
