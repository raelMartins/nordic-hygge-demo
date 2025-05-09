import {useEffect, useState} from 'react';
import TransactionsList from './TransactionsList';
import SummaryDrawer from './Summary';
import PaymwntDrawer from './payment';
import Breakdown from './Breakdown';
import {RxCross1} from 'react-icons/rx';
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
import {BsArrowLeft} from 'react-icons/bs';
import isMobile from '../../utils/extras';
import {ChevronLeftIcon, CloseIcon} from '@chakra-ui/icons';
import {drawer_styles, drawer_title_styles} from '../navbar/Navbar';
import {ResponsivePopup, ResponsivePopupContent} from '@/ui-lib';

export const OffersDrawer = ({assetData, drawer, isError, isLoading, refetch}) => {
  const [type, setType] = useState('list');
  const [asset, setAsset] = useState(null);
  const [amountToPay, setAmountToPay] = useState('');

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
  useEffect(() => {
    if (assetData?.length === 1) {
      setType('payment_plan');
      const property = assetData?.[0];
      setAsset(property);
      if (property?.type == 'WHOLE' && !property?.payment_plan && !property?.co_owners?.length) {
        setAmountToPay(Number(property?.total_unit_price));
      }
      if (property?.type == 'WHOLE' && property?.payment_plan && !property?.co_owners?.length) {
        setAmountToPay(property?.payment_plan?.initial_deposit_in_value);
      }
    }
  }, [assetData]);

  const handleClose = () => {
    if (assetData?.length === 1) {
      setType('payment_plan');
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
            <Text>Offers</Text>
          ) : type === 'payment_plan' ? (
            <HStack align={'center'} w={`100%`} textAlign={`center`}>
              {assetData?.length !== 1 && (
                <ChevronLeftIcon
                  cursor={'pointer'}
                  onClick={() => setType('list')}
                  fontSize={'35px'}
                  color={'text'}
                />
              )}
              <Text flex={`1`} p={`4px 20px`} noOfLines={`2`}>
                {asset?.unit?.unit_title}
              </Text>
            </HStack>
          ) : type === 'breakdown' ? (
            <HStack align={'center'} w={`100%`} textAlign={`center`}>
              <ChevronLeftIcon
                cursor={'pointer'}
                onClick={() => setType('payment_plan')}
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
                onClick={() => setType('payment_plan')}
                fontSize={'35px'}
                color={'text'}
              />
              <Text>Payment</Text>
            </HStack>
          )}
          <CloseIcon cursor={'pointer'} fontSize={'14px'} color="text" onClick={drawer?.onClose} />
        </Flex>

        {/* <Box pt={{base: '60px', md: '75px'}} w="full" h={'fit-content'} overflowY="auto"> */}
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
          {' '}
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
              amountToPay={amountToPay}
            />
          ) : type === 'payment_plan' ? (
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
              amountToPay={amountToPay}
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
              amountToPay={amountToPay}
            />
          ) : (
            <PaymwntDrawer
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
              amount={amountToPay}
              refetch={refetch}
            />
          )}
        </Flex>
        {/* </Box> */}
      </ResponsivePopupContent>
    </ResponsivePopup>
  );
};

export default OffersDrawer;
