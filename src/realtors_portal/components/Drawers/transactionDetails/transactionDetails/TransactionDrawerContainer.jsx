import {Box, useDisclosure} from '@chakra-ui/react';
import React from 'react';
import TransactionDetailsDrawer from '.';

export const TransactionDrawerContainer = ({row, children}) => {
  const transactionDrawer = useDisclosure();
  return (
    <>
      <Box cursor={'pointer'} onClick={transactionDrawer.onOpen}>
        {children}
      </Box>
      <TransactionDetailsDrawer
        modalDisclosure={transactionDrawer}
        runQuery={transactionDrawer.isOpen}
        equityId={row?.equity_id || row?.equity?.id}
        userId={row?.owner_id || row?.owner?.id || row?.id}
      />
    </>
  );
};

export default TransactionDrawerContainer;
