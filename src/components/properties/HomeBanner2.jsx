import {fetchForCustomerEquityValidation, fetchOffers, fetchUserEquity} from '@/api/listing';
import {Button} from '@/ui-lib';
import {Box, HStack, Stack, Text, useDisclosure, VStack} from '@chakra-ui/react';
import {useState} from 'react';
import {useQuery} from 'react-query';
import ValidateCustomerEquity from '../validateCustomerAssets';
import useGetSession from '@/utils/hooks/getSession';
import {pluralizeText, timeRelativeGreeting} from '@/utils/truncateLongText';
import OffersDrawer from '../offers';
import PendingTransactionsDrawer from '../pendingTransactions';

export const HomeBanner2 = ({}) => {
  const {sessionData: LoggedinUser} = useGetSession('loggedIn');

  const [skippedPopup, setSkippedPopup] = useState([]);

  const validate_drawer = useDisclosure();
  const transactions_drawer = useDisclosure();
  const offers_drawer = useDisclosure();

  const validate_asset_query = useQuery(
    ['fetchcustomervalidationEquity'],
    () => fetchForCustomerEquityValidation(),
    {refetchOnMount: true}
  );

  const validate_asset_data = validate_asset_query?.data?.data?.all_pending_requests;

  const hide_banner = validate_asset_query?.isLoading || validate_asset_data?.length;

  const transactions_query = useQuery(['Pending'], () => fetchUserEquity('PENDING'), {
    refetchOnMount: true,
  });
  const transactions_data = transactions_query?.data?.data?.results;

  const offers_query = useQuery(['Offers'], fetchOffers, {refetchOnMount: true});
  const offers_data = offers_query?.data?.data?.data;

  const banner_type = {
    asset_validation: {
      type: `asset_validation`,
      title: `Hi ${LoggedinUser?.first_name}, Welcome Onboard.`,
      text: `Could you spare a moment to quickly verify some past transactions?.`,
      handleClick: validate_drawer.onOpen,
      // show: validate_asset_data?.length && !skippedPopup?.includes(`asset_validation`),
      show: false,
    },
    private_offer: {
      type: `private_offer`,
      title: `We have sent you an offer!`,
      text: `Please complete the transaction before it expires.`,
      handleClick: offers_drawer.onOpen,
      show: !hide_banner && offers_data?.length && !skippedPopup?.includes(`private_offer`),
    },
    pending_transaction: {
      type: `pending_transaction`,
      title: `${timeRelativeGreeting(LoggedinUser?.first_name)}. You have ${
        transactions_data?.length
      } pending ${pluralizeText(`transaction`, transactions_data?.length)}.`,
      text: `Please proceed to complete the ${pluralizeText(
        `transaction`,
        transactions_data?.length
      )} at your earliest convenience.`,
      handleClick: transactions_drawer.onOpen,
      show:
        !hide_banner && transactions_data?.length && !skippedPopup?.includes(`pending_transaction`),
    },
  };

  const asset = banner_type?.asset_validation?.show
    ? banner_type?.asset_validation
    : banner_type?.private_offer?.show
    ? banner_type?.private_offer
    : banner_type?.pending_transaction?.show
    ? banner_type?.pending_transaction
    : null;

  return (
    asset && (
      <>
        <Stack
          align={`center`}
          gap={`12px`}
          fontSize={{base: `14px`, lg: `16px`}}
          background={`#191919`}
          color={`#D0D5DD`}
          box-shadow={`0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)`}
          textAlign={`center`}
          flexWrap={`wrap`}
          p={` 14px 25px`}
          fontWeight={`500`}
          lineHeight={`140%`}
          letterSpacing={`0.16px`}
          justify={`center`}
        >
          <Text fontWeight={`400`} opacity={`.95`}>
            <Box as={`span`} fontWeight={`600`}>
              {asset?.title}
            </Box>{' '}
            {asset?.text}
          </Text>
          <HStack gap={`24px`} maxW={`350px`} w={`100%`}>
            <Button
              variation={`primary`}
              fontSize={`14px`}
              fontWeight={`500`}
              lineHeight={`130%`}
              w={`100%`}
              p={`8px 16px`}
              textTransform={`uppercase`}
              onClick={asset?.handleClick}
              flex={`1`}
              boxStyle={{flex: `1`}}
            >
              View
            </Button>
            <Button
              fontSize={`14px`}
              fontWeight={`500`}
              lineHeight={`130%`}
              w={`100%`}
              p={`8px 16px`}
              textTransform={`uppercase`}
              bg={`transparent`}
              color={`custom_color.contrast`}
              border={`1px solid`}
              borderColor={`custom_color.contrast`}
              onClick={() => setSkippedPopup(prev => [...prev, asset?.type])}
              flex={`1`}
            >
              Skip for now
            </Button>
          </HStack>
        </Stack>
        <ValidateCustomerEquity
          equitiesData={validate_asset_data}
          drawer={validate_drawer}
          refetch={validate_asset_query?.refetch}
          isLoading={validate_asset_query?.isLoading}
        />
        <PendingTransactionsDrawer
          refetch={transactions_query?.refetch}
          assetData={transactions_data}
          isLoading={transactions_query?.isLoading}
          isOpen={transactions_drawer.isOpen}
          drawer={transactions_drawer}
          isError={transactions_query?.isError}
        />
        <OffersDrawer
          refetch={offers_query?.refetch}
          assetData={offers_data}
          isLoading={offers_query?.isLoading}
          isOpen={offers_drawer.isOpen}
          drawer={offers_drawer}
          isError={offers_query?.isError}
        />
      </>
    )
  );
};
