import React from 'react';
import {Flex, Text, Icon, HStack} from '@chakra-ui/react';
import {ArrowBackIcon} from '@chakra-ui/icons';
import {BiMenu} from 'react-icons/bi';

export const MobileWalletHeader = ({
  step,
  setPage,
  setStep,
  activePage,
  onDrawerOpen,
  onDrawerClose,
}) => {
  let page = '';

  switch (activePage) {
    case 'withdrawal':
      page = 'Withdrawal';
      break;
    case 'deposit':
      page = 'Make a deposit';
      break;
    case 'wallet':
      page = 'Wallet';
    default:
      page = 'Wallet';
  }

  const handleBack = () => {
    switch (activePage) {
      case 'withdrawal':
        return setPage('wallet');
      case 'deposit':
        if (step !== 'method') return setStep('method');
        else return setPage('wallet');
      case 'wallet':
      default:
        return onDrawerClose();
    }
  };

  return (
    <Flex
      justify={'space-between'}
      display={{base: 'flex', lg: 'none'}}
      align={'center'}
      p="16px"
      borderBottom="1px solid"
      borderColor={`matador_border_color.100`}
    >
      <HStack spacing="8px" onClick={handleBack} cursor="pointer">
        <ArrowBackIcon fontSize={'22px'} cursor="pointer" color="text" />
        <Text fontSize={'23px'} fontWeight={500} color="text" className="heading-text-regular">
          {page}
        </Text>
      </HStack>
      <Icon as={BiMenu} color="text" onClick={onDrawerOpen} fontSize={'30px'} />
    </Flex>
  );
};

export default MobileWalletHeader;
