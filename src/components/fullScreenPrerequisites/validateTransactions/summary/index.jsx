import {fetchInvestorPackets} from '@/api/payment';
import {useQuery} from 'react-query';
import {ValidateSummaryView} from './view';

export const ValidateSummary = ({asset, changeScreen, handleConfirm}) => {
  const HOME__OWNERS__PACKETS = useQuery(['fetchInvestorPackets', asset?.id], () =>
    fetchInvestorPackets(asset?.id)
  );
  const packet =
    HOME__OWNERS__PACKETS?.data?.data?.received?.length &&
    HOME__OWNERS__PACKETS?.data?.data?.received[0];

  const handleValidate = () => {
    handleConfirm();
  };
  const FEES_ARRAY = asset?.payment_plan ? [] : asset?.equity_fees || FEES || [];

  return (
    <ValidateSummaryView
      asset={asset}
      packet={packet}
      closingCosts={FEES_ARRAY}
      loadingPacket={HOME__OWNERS__PACKETS?.isLoading}
      changeScreen={changeScreen}
      handleValidate={handleValidate}
    />
  );
};
