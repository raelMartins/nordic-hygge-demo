import {Image, VStack, Text, Flex, Box} from '@chakra-ui/react';
import {Spinner} from '../../ui-lib';
import {formatDateToString} from '../../utils/formatDate';
import ErrorState from '../appState/error-state';
import EmptyState from '../appState/empty-state';
import {EquityCard} from '../cards/EquityCard';

const TransactionsList = ({
  assetData,
  drawer,
  isError,
  isLoading,
  setType,
  customScrollbarStyles,
  setAsset,
  setAmountToPay,
}) => {
  const handleManageAssets = property => {
    setAsset(property);

    // pure outright purchase
    if (property?.type == 'WHOLE' && !property?.payment_plan && !property?.co_owners?.length) {
      setAmountToPay(Number(property?.total_unit_price));
      setType('summary');
    }
    // pure payment plan
    if (property?.type == 'WHOLE' && property?.payment_plan && !property?.co_owners?.length) {
      setAmountToPay(property?.payment_plan?.initial_deposit_in_value);
      setType('summary');
    }
    // co-ownership
    if (property?.co_owners?.length) {
      // co-ownership with outright
      if (property?.type == 'WHOLE' && !property?.payment_plan) {
        // setAmountToPay(Number(property?.total_unit_price))
        setType('coOwn');
      }
      // co-ownership with payment plan
      if (property?.type == 'WHOLE' && property?.payment_plan) {
        // setAmountToPay(property?.payment_plan?.initial_deposit_in_value)
        setType('coOwn');
      }
    }
    // property?.type == 'FRACTIONAL' && router.push(`/asset/fractional/${property?.id}?status=${paymentStatus}`);
  };

  return (
    <Box h={'fit-content'} overflowY="auto" __css={customScrollbarStyles}>
      {isLoading ? (
        <VStack w="80vw">
          <Spinner />
        </VStack>
      ) : isError ? (
        <ErrorState />
      ) : (
        <>
          {assetData?.length > 0 ? (
            <VStack align="stretch" spacing={'12px'}>
              {(assetData || [])?.map((equity, idx) => (
                <EquityCard
                  key={idx}
                  equity={equity}
                  sub_text={equity?.unit?.unit_title}
                  handleClick={() => handleManageAssets(equity)}
                  tag={`Expiration Date: ${formatDateToString(equity?.offer_expires)}`}
                />
              ))}
            </VStack>
          ) : (
            <EmptyState text={`No pending transactions yet`} />
          )}
        </>
      )}
    </Box>
  );
};

export default TransactionsList;
