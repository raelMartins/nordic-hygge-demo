import useGetSession from '@/utils/hooks/getSession';
import {cloneElement, isValidElement, useEffect} from 'react';

export const PaymentAccess = ({
  content,
  checkPayment = true,
  checkWallet = false,
  checkWithdrawal = false,
  checkFractions = false,
  showAsDisabled = false,
}) => {
  const {sessionData: store_data, fetching, refetch} = useGetSession('store_data');
  const gateway_disabled = store_data?.gateway_disabled;
  const withdrawal_enabled = store_data?.withdrawal_enabled;
  const wallet_features = store_data?.wallet_features;
  const fractions_enabled = store_data?.fractions_enabled;

  const isHidden =
    fetching ||
    (gateway_disabled && checkPayment) ||
    (!wallet_features && checkWallet) ||
    (!withdrawal_enabled && checkWithdrawal) ||
    (!fractions_enabled && checkFractions);

  console.log({checkWallet, store_data});

  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 2000);
  }, []);

  return (
    isValidElement(content) && (
      <>
        {isHidden && !showAsDisabled ? (
          <></>
        ) : isHidden && showAsDisabled ? (
          cloneElement(content, {isDisabled: true})
        ) : (
          cloneElement(content, {})
        )}
      </>
    )
  );
};
