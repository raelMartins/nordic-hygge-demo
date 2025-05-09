import {Button, useDisclosure} from '@chakra-ui/react';
import React from 'react';
import TransactionDetailsDrawer from '.';

export const TransactionDrawerWrapper = ({row}) => {
  const transactionDrawer = useDisclosure();
  return (
    <>
      <Button
        variant="outline"
        onClick={transactionDrawer.onOpen}
        color="#242526"
        w="115px"
        _hover={{
          bg: 'transparent',
        }}
        _focus={{
          bg: 'transparent',
        }}
        _active={{
          bg: 'transparent',
        }}
        padding="10px 10px"
        border="1.6px solid #242526"
        h="40px"
        borderRadius="12px"
      >
        View
      </Button>
      <TransactionDetailsDrawer
        modalDisclosure={transactionDrawer}
        runQuery={transactionDrawer.isOpen}
        equityId={row?.equity_id}
        userId={row?.owner_id}
      />
    </>
  );
};

export default TransactionDrawerWrapper;
