import {Image, VStack, Text, Flex, Box} from '@chakra-ui/react';
import EmptyState from '../appState/empty-state';
import {formatToCurrency} from '../../utils';
import ErrorState from '../appState/error-state';
import {Spinner} from '../../ui-lib';
import {formatDateToString} from '../../utils/formatDate';
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
    if (property?.type == 'WHOLE' && !property?.payment_plan && !property?.co_owners?.length) {
      setAmountToPay(Number(property?.total_unit_price));
    }
    if (property?.type == 'WHOLE' && property?.payment_plan && !property?.co_owners?.length) {
      setAmountToPay(property?.payment_plan?.initial_deposit_in_value);
    }
    setType('payment_plan');
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
              {(assetData || [])?.map((equity, i) => (
                <EquityCard
                  key={i}
                  equity={equity}
                  sub_text={equity?.unit?.unit_title}
                  handleClick={() => handleManageAssets(equity)}
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
