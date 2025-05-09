import {Divider, Heading, Stack, useDisclosure, useToast} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useMutation} from 'react-query';
import {formatToCurrency} from '../../../utils';
import {changeDateFormat} from '../../../utils/formatDate';
import TransactionHistory from '../components/assetsTransactionHistory';
import {toastForError} from '../../../utils/toastForErrors';
import {COOWNERSHIPTRANSACTIONHISTORYCOLUMN} from '../../../constants/tables/coownerShipTransactionHistoryColumn';
import {fetchPurchaseHistory} from '../../../api/payment';
import PaymentPlanHeader from './paymentPlanHeader';
import MakeDepositModal from '../sections/MakeDeposit';
import {Button} from '@/ui-lib';
import HomeOwnersPacket from '../sections/HomeOwnersPacket';
import {useCustomToast} from '@/components/CustomToast';
import {PaymentAccess} from '@/components/payment/PaymentAccess';

const PaymentPlanTransaction = ({displayTab, equityInfo, refetch}) => {
  const toast = useCustomToast();
  const depositModal = useDisclosure();
  const homeOwnersPacketModal = useDisclosure();

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

  console.log({equityInfo});
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

  const equityId = equityInfo?.id;

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
      w={{base: 'full'}}
      p={{base: `24px 20px`}}
      gap={`12px`}
      h={`100%`}
    >
      <Stack flex={`1`} overflowY={`auto`} gap={`12px`}>
        <PaymentPlanHeader
          setTransactionInfo={setTransactionInfo}
          transactionInfo={transactionInfo}
          equityInfo={equityInfo}
          calculatePercentagePaid={calculatePercentagePaid}
          groupTransactioninfo={equityTransactionInfo}
        />

        <TransactionHistory
          arrayData={arrayData}
          isLoading={TRANSACTIONS_HISTORY?.isLoading}
          isError={TRANSACTIONS_HISTORY?.isError}
          // flex={`1`}
          // overflowY={`auto`}
        />
      </Stack>
      <Stack gap={{base: `12px`}} mt={`auto`} pt={`10px`}>
        <PaymentAccess
          content={
            <Button
              variation={`primary`}
              onClick={depositModal.onOpen}
              fontSize={`16px`}
              fontStyle={`normal`}
              fontWeight={`600`}
              lineHeight={`140%`}
              letterSpacing={`0.48px`}
              p={`9px`}
            >
              Make a Deposit
            </Button>
          }
        />
        <Button
          variation={`secondary`}
          onClick={homeOwnersPacketModal.onOpen}
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

      <MakeDepositModal refetch={refetch} info={equityInfo} depositModal={depositModal} />
      <HomeOwnersPacket equityId={equityInfo?.id} modal={homeOwnersPacketModal} />
    </Stack>
  );
};

export default PaymentPlanTransaction;
