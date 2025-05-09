import {Divider, Stack, useToast} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';

import {useMutation} from 'react-query';
import CoownersHeader from './coownersHeader';

// import {toastForError} from 'utils/toastForErrors';
// import { COOWNERSHIPTRANSACTIONHISTORYCOLUMN } from "constants/tableColumns/coownerShipTransactionHistoryColumn";
import {formatToCurrency} from '../../../utils';
import {changeDateFormat} from '../../../utils/formatDate';
import TransactionHistory from '../components/assetsTransactionHistory';
import {toastForError} from '../../../utils/toastForErrors';
import {COOWNERSHIPTRANSACTIONHISTORYCOLUMN} from '../../../constants/tables/coownerShipTransactionHistoryColumn';
import {fetchPurchaseHistory} from '../../../api/payment';
import {useCustomToast} from '@/components/CustomToast';

const CoownersTransactions = ({displayTab, equityInfo}) => {
  const toast = useCustomToast();

  const calculatePercentagePaid = (amountToBePaid, amountPaid) => {
    let percentPaid;
    try {
      percentPaid = ((Number(amountPaid) / Number(amountToBePaid)) * 100).toFixed(2);

      if (percentPaid == 'NaN') {
        throw new Error('');
      }
      return `${percentPaid}%`;
    } catch (error) {
      return '-';
    }
  };

  const equityTransactionInfo = {
    infoFor: 'group',
    amount_paid_heading: 'Total paid',
    amountPaid: formatToCurrency(equityInfo?.amount_paid),
    progress: calculatePercentagePaid(equityInfo?.total_unit_price, equityInfo?.amount_paid),
    due_balance: formatToCurrency(equityInfo?.total_due_balance),
    due_date: changeDateFormat(equityInfo?.next_due_date),
    outStanding_balance: formatToCurrency(equityInfo?.current_outstanding_balance),
  };

  const [transactionInfo, setTransactionInfo] = useState(equityTransactionInfo);

  useEffect(() => {
    setTransactionInfo(equityTransactionInfo);
  }, [equityInfo]);

  //scrollbar style
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
  const equityId = query?.id;

  const TRANSACTIONS_HISTORY = useMutation(
    () => fetchPurchaseHistory(equityId, transactionInfo?.userId),
    {
      onError: err => {
        toastForError(err, true, toast);
      },
      mutationKey: ['transaction_history', equityId, transactionInfo?.userId],
      retry: 0,
    }
  );
  useEffect(() => {
    if (equityId && transactionInfo?.amountPaid !== '-') {
      TRANSACTIONS_HISTORY?.mutate();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionInfo]);

  const arrayData = TRANSACTIONS_HISTORY?.data?.data ?? [];

  return (
    <Stack
      sx={customScrollbarStyles()}
      overflowY="auto"
      scrollBehavior="smooth"
      maxH={{base: 'full', xl: '460px'}}
      maxW={{base: 'full', xl: '608.81px'}}
      w={{base: 'full', xl: 'full'}}
      h="fit-content"
      display={{
        base: displayTab === 'transaction' ? 'block' : 'none',
        xl: 'block',
      }}
      border={{base: 'none', xl: '1.125px'}}
      borderColor={`matador_border_color.100 !important`}
    >
      <TransactionHistory
        arrayData={arrayData}
        isLoading={TRANSACTIONS_HISTORY?.isLoading}
        Column={COOWNERSHIPTRANSACTIONHISTORYCOLUMN}
        isError={TRANSACTIONS_HISTORY?.isError}
        error={TRANSACTIONS_HISTORY?.error}
        numberOfTransactions={arrayData?.length}
        spacing="15.2px"
        w="full"
        maxW={{base: 'full', xl: '608.81px'}}
        border="none"
      >
        <Divider border="none" h="0.95px" bg="matador_border_color.100" />

        <CoownersHeader
          setTransactionInfo={setTransactionInfo}
          transactionInfo={transactionInfo}
          equityInfo={equityInfo}
          calculatePercentagePaid={calculatePercentagePaid}
          groupTransactioninfo={equityTransactionInfo}
        />
      </TransactionHistory>
    </Stack>
  );
};

export default CoownersTransactions;
