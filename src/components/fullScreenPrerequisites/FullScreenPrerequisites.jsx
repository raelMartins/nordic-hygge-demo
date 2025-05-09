import {fetchForCustomerEquityValidation} from '@/api/listing';
import {Center, Flex, HStack, Image, Stack, Text, VStack} from '@chakra-ui/react';
import {useState} from 'react';
import {useQuery} from 'react-query';
import useGetSession from '@/utils/hooks/getSession';
import {FullScreenFooter} from './footer';
import {storeDetails} from '@/api/auth';
import {CheckSVG} from './assets';
import {timeRelativeGreeting} from './helper_functions';
import {ValidateTransactionsScreen} from './validateTransactions';
import {Spinner} from '@/ui-lib';

export const FullScreenPreRequisites = ({children}) => {
  const {sessionData: LoggedinUser} = useGetSession('loggedIn');

  const STOREINFO = useQuery(['storeInfo'], storeDetails);
  const [index, setIndex] = useState(0);
  const [screen, setScreen] = useState(`summary`);

  const store_data = STOREINFO.data?.data?.data;

  const validate_asset_query = useQuery(
    ['fetchcustomervalidationEquity'],
    () => fetchForCustomerEquityValidation(),
    {refetchOnMount: true}
  );

  const validate_asset_data = validate_asset_query?.data?.data?.all_pending_requests;

  // const transactions_query = useQuery(['Pending'], () => fetchUserEquity('PENDING'), {
  //   refetchOnMount: true,
  // });
  // const transactions_data = transactions_query?.data?.data?.results;

  // const offers_query = useQuery(['Offers'], fetchOffers, {refetchOnMount: true});
  // const offers_data = offers_query?.data?.data?.data;

  const handleProgress = async () => {
    await validate_asset_query?.refetch();
    setIndex(index + 1);
    setScreen(`summary`);
  };

  const assets_object = {
    asset_validation: {
      type: `asset_validation`,
      title: `${timeRelativeGreeting(LoggedinUser?.first_name)}!`,
      text: `We kindly request your confirmation regarding this transaction. 
      Please review the property details, the amount paid, and the transaction date. 
      If all the information is accurate, kindly select “This looks correct”. 
      However, if any detail appears to be incorrect, please select “Something doesn’t look right”.`,
      component: (
        <ValidateTransactionsScreen
          screen={screen}
          setScreen={setScreen}
          asset={validate_asset_data?.[0] || null}
          handleProgress={handleProgress}
        />
      ),
      show: validate_asset_data?.length,
    },
    // private_offer: {
    //   type: `private_offer`,
    //   title: `We have sent you an offer!`,
    //   text: `Please complete the transaction before it expires.`,
    //   handleClick: offers_drawer.onOpen,
    //   show: offers_data?.length && !skippedPopup?.includes(`private_offer`),
    // },
    // pending_transaction: {
    //   type: `pending_transaction`,
    //   title: `${timeRelativeGreeting(LoggedinUser?.first_name)}. You have ${
    //     transactions_data?.length
    //   } pending ${pluralizeText(`transaction`, transactions_data?.length)}.`,
    //   text: `Please proceed to complete the ${pluralizeText(
    //     `transaction`,
    //     transactions_data?.length
    //   )} at your earliest convenience.`,
    //   handleClick: transactions_drawer.onOpen,
    //   show: transactions_data?.length && !skippedPopup?.includes(`pending_transaction`),
    // },
  };

  const asset = assets_object?.asset_validation?.show
    ? assets_object?.asset_validation
    : // : assets_object?.private_offer?.show
      // ? assets_object?.private_offer
      // : assets_object?.pending_transaction?.show
      // ? assets_object?.pending_transaction
      null;

  const count = validate_asset_data?.length;
  const loading = validate_asset_query?.isLoading;

  // return !LoggedinUser || !asset ? (
  return loading ? (
    <Center minH={`100vh`} bg={`matador_background.100`}>
      <Spinner />
    </Center>
  ) : !LoggedinUser || !asset ? (
    children
  ) : (
    <>
      <Stack minH={`100vh`} bg={`matador_background.100`} color={`text`}>
        <VStack
          align={`stretch`}
          justify={`stretch`}
          flex={`1`}
          pb={{base: `30px`}}
          px={{base: `20px`, lg: `100px`}}
        >
          <HStack gap={'20px'} pt={{base: `24px`}}>
            <Center
              w={`max-content`}
              maxW="219px"
              h="50px"
              position={`relative`}
              overflow={`hidden`}
            >
              {store_data?.company_image && (
                <Image
                  src={store_data?.company_image}
                  alt={'Company Image'}
                  fill
                  style={{objectFit: `contain`, height: `100%`, width: `auto`}}
                />
              )}
            </Center>
          </HStack>
          <Flex direction={{base: `column`, lg: `row`}} gap={`32px`} flex={`1`} align={`stretch`}>
            <VStack
              className="supplementary-font"
              flex={{base: `none`, lg: `1`}}
              gap={`24px`}
              align={`stretch`}
              maxW={{base: `100%`, lg: `560px`}}
            >
              <Stack flex={`1`} justify={`center`} gap={{base: `4px`, lg: `6px`}}>
                <CheckSVG boxSize={{base: `52px`, lg: `84px`}} mb={{base: `12px`, lg: `18px`}} />
                <Text
                  fontWeight={`600`}
                  fontSize={{base: `19px`, lg: `28.5px`}}
                  lineHeight={`130%`}
                  letterSpacing={`0%`}
                  textTransform={`capitalize`}
                >
                  {asset?.title}
                </Text>
                <Text
                  fontWeight={`400`}
                  fontSize={{base: `13px`, lg: `19.5px`}}
                  lineHeight={`150%`}
                  letterSpacing={`2%`}
                  color={`matador_text.400`}
                  opacity={`.8`}
                >
                  {asset?.text}
                </Text>
              </Stack>
              <Text
                fontWeight={`600`}
                fontSize={{base: `24px`, lg: `48px`}}
                lineHeight={`130%`}
                letterSpacing={`0%`}
                color={`matador_text.300`}
                opacity={`.6`}
                position={{base: `absolute`, lg: `static`}}
                top={`25px`}
                right={`15px`}
              >
                {index + 1} of {count + index}
              </Text>
            </VStack>
            <Center flex={{base: `none`, lg: `1`}} flexDir={`column`} className="tertiary-text">
              {asset?.component}
            </Center>
          </Flex>
        </VStack>
        <FullScreenFooter store_data={store_data} />
      </Stack>
    </>
  );
};
