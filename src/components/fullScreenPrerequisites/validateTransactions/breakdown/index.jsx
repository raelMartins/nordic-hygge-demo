import {useQuery} from 'react-query';
import {fetchAllPurchaseHistory, fetchUpcomingPayments} from '@/api/payment';
import {getAllUpcomingPayment} from '@/api/listing';
import {ValidationPaymentBreakdownView} from './view';

export const ValidationPaymentBreakdown = ({asset, changeScreen, handleConfirm}) => {
  const plan_type = asset?.payment_plan?.plan_type;
  const FEES = asset?.payment_plan?.bundle?.fees;

  const TRANSACTIONS_HISTORY = useQuery(['fetchAllPurchaseHistory', asset?.id], () =>
    fetchAllPurchaseHistory(asset?.id)
  );

  const UPCOMING_PAYMENTS = useQuery(
    ['upcoming_payments', asset?.id],
    () => getAllUpcomingPayment(asset?.id),
    {isenabled: !!asset?.id && plan_type === 'custom', retry: 0}
  );

  const UPCOMING_PAYMENTS_2 = useQuery(
    ['upcoming_payments_proper', asset?.id],
    () => fetchUpcomingPayments(asset?.id),
    {isenabled: !!asset?.id && plan_type === 'custom', retry: 0}
  );

  const FEES_ARRAY = asset?.equity_fees || FEES || [];
  const HISTORY = TRANSACTIONS_HISTORY.data?.data.filter(el => !el.is_fees)?.toReversed();
  const UPCOMING_OLD = UPCOMING_PAYMENTS.data?.data?.results?.filter(el => !el.is_fees);
  const UPCOMING = UPCOMING_PAYMENTS_2.data?.data?.data?.filter(el => !el.is_fees);

  return (
    <ValidationPaymentBreakdownView
      asset={asset}
      changeScreen={changeScreen}
      handleConfirm={handleConfirm}
      loadingHistory={TRANSACTIONS_HISTORY?.isLoading}
      loadingUpcoming={UPCOMING_PAYMENTS?.isLoading}
      HISTORY={HISTORY}
      UPCOMING={UPCOMING}
      FEES_ARRAY={FEES_ARRAY}
    />
  );
};
