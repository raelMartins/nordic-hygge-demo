import {useEffect, useState} from 'react';
import {
  DrawerContent,
  Flex,
  Box,
  Text,
  Drawer,
  DrawerOverlay,
  HStack,
  DrawerHeader,
} from '@chakra-ui/react';
import Summary from './summary';
import ConfirmValidate from './confirmValidate';
import Dispute from './dispute';
import AssetsList from './assetsList';
import {ChevronLeftIcon, CloseIcon} from '@chakra-ui/icons';
import isMobile from '../../utils/extras';
import {drawer_styles, drawer_title_styles} from '../navbar/Navbar';
import {ResponsivePopup, ResponsivePopupContent} from '@/ui-lib';

export const ValidateCustomerEquity = ({equitiesData, drawer, refetch, isLoading}) => {
  const [type, setType] = useState('list');
  const [equityData, setEquityData] = useState(null);

  useEffect(() => {
    if (equitiesData?.length === 1) {
      setType('summary');
      setEquityData(equitiesData?.[0]);
    }
  }, [equitiesData]);

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

  const handleClose = () => {
    if (equitiesData?.length > 1) {
      setType('list');
    }
  };

  const validationRequestArray = equityData?.validation_requests || [];
  const validation_requestsId = validationRequestArray?.[validationRequestArray?.length - 1]?.id;

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
          {type === 'dispute' ? (
            <HStack align={'center'}>
              <ChevronLeftIcon
                cursor={'pointer'}
                onClick={() => setType('summary')}
                fontSize={'35px'}
                color={'text'}
              />
              <Text>Dispute Transaction</Text>
            </HStack>
          ) : type === 'validate' ? (
            <HStack align={'center'}>
              <ChevronLeftIcon
                cursor={'pointer'}
                onClick={() => setType('summary')}
                fontSize={'35px'}
                color={'text'}
              />
              <Text>Transaction Validation</Text>
            </HStack>
          ) : type === 'summary' ? (
            <HStack align={'center'}>
              {equitiesData?.length > 1 && (
                <ChevronLeftIcon
                  cursor={'pointer'}
                  onClick={() => setType('list')}
                  fontSize={'35px'}
                  color={'text'}
                />
              )}
              <Text>Validate Transaction</Text>
            </HStack>
          ) : (
            <Text>Transaction Validation</Text>
          )}
          <CloseIcon cursor={'pointer'} fontSize={'14px'} color="text" onClick={drawer?.onClose} />
        </Flex>

        {/* <Box w="full" h={'fit-content'} overflowY="auto"> */}
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
          {type === 'summary' ? (
            <Summary
              equityData={equityData}
              setType={setType}
              customScrollbarStyles={customScrollbarStyles}
            />
          ) : type === 'validate' ? (
            <ConfirmValidate
              refetch={refetch}
              validation_requestsId={validation_requestsId}
              equityData={equityData}
              setType={setType}
              drawer={drawer}
              customScrollbarStyles={customScrollbarStyles}
            />
          ) : type === 'dispute' ? (
            <Dispute
              refetch={refetch}
              drawer={drawer}
              equityData={equityData}
              setType={setType}
              validation_requestsId={validation_requestsId}
              customScrollbarStyles={customScrollbarStyles}
            />
          ) : (
            <AssetsList
              drawer={drawer}
              setType={setType}
              isLoading={isLoading}
              equityData={equityData}
              equitiesData={equitiesData}
              setEquityData={setEquityData}
              validation_requestsId={validation_requestsId}
              customScrollbarStyles={customScrollbarStyles}
            />
          )}
        </Flex>
      </ResponsivePopupContent>
    </ResponsivePopup>
  );
};

export default ValidateCustomerEquity;
