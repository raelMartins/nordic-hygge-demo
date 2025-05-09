import {Center, Flex, Text} from '@chakra-ui/react';
import PaymentPlanTransaction from '../manageAssets/payment_plan/paymentPlanTransaction';
import FractionalTransactionInfo from '../manageAssets/fractionalTransactionInfo';
import {IoArrowBack} from 'react-icons/io5';
import OutrightTransactionInfo from '../manageAssets/outrightTransactionInfo';
import {useQuery} from 'react-query';
import {fetchEquity} from '@/api/listing';
import {Spinner} from '@/ui-lib';
import ThreeDots from '../loaders/ThreeDots';

export const AssetInfo = ({property, go_back}) => {
  const asset_type =
    property?.type == 'WHOLE' && !property?.payment_plan && !property?.co_owners?.length
      ? `outright`
      : property?.type == 'WHOLE' && property?.payment_plan && !property?.co_owners?.length
      ? `payment_plan`
      : property?.type == 'WHOLE' && property?.co_owners?.length
      ? `co_ownership`
      : property?.type == 'FRACTIONAL'
      ? `fractional`
      : `outright`;

  const {data, isLoading, isError, refetch} = useQuery(
    ['fetchEquity', property?.id],
    () => fetchEquity(property?.id),
    {enabled: !!property?.id}
  );
  const info = data?.data;

  console.log({info});
  console.log({property});

  const transaction_history = {
    payment_plan: <PaymentPlanTransaction equityInfo={info} refetch={refetch} />,
    fractional: <FractionalTransactionInfo equityInfo={info} refetch={refetch} />,
    outright: <OutrightTransactionInfo equityInfo={info} refetch={refetch} />,
    // payment_plan: <OutrightTransactionInfo equityInfo={info} />,
  }[asset_type];

  return (
    <>
      <Flex
        px="10px"
        w="full"
        justify={'space-between'}
        align={'center'}
        background={`matador_background.100`}
        p={`16px`}
        justifyContent={`center`}
        position={`relative`}
      >
        <Center
          position={`absolute`}
          left={`0px`}
          top={`0px`}
          bottom={`0px`}
          p={`10px`}
          onClick={go_back}
          cursor={`pointer`}
        >
          <IoArrowBack fontSize={`18px`} />
        </Center>
        <Text
          fontSize={'20px'}
          fontWeight={700}
          className="heading-text-regular"
          color={'matador_text.100'}
          lineHeight={`113%`}
          textAlign={`center`}
          letterSpacing={`6px`}
          textTransform={`uppercase`}
          maxW={`90%`}
        >
          {property?.unit?.unit_title}
        </Text>
      </Flex>
      {isLoading ? (
        <Center flex={`1`}>
          {/* <Spinner disableAbsoluteCenteredSpinner h={{base: `50px`}} w={{base: `50px`}} /> */}
          <ThreeDots />
        </Center>
      ) : (
        transaction_history
      )}
    </>
  );
};
