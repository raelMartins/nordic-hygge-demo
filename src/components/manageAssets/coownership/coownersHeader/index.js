import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';
import TransactionInfo from './transactionInfo';
import CoownersCarousel from './coownersCarousel';
import angledArrow from '/src/images/icons/angledArrow.svg';
import {useRouter} from 'next/router';
import {useQuery} from 'react-query';
import useLocalStorage from '../../../../utils/hooks/useLocalStorage';
import {changeDateFormat} from '../../../../utils/formatDate';
import {formatToCurrency} from '../../../../utils';
import {
  fetchListOfCoowners,
  fetchCustomersInfo,
  fetchIndividualCoOwnersData,
} from '../../../../api/co_owners';
import {BUSINESS_ID} from '../../../../constants/routes';
import useGetSession from '../../../../utils/hooks/getSession';

const CoownersHeader = ({
  setTransactionInfo,
  equityInfo,
  transactionInfo,
  calculatePercentagePaid,
  groupTransactioninfo,
}) => {
  const {query} = useRouter();
  const equity_id = query?.id;
  let coownersList = [];
  const [isBelowXl] = useMediaQuery('(max-width: 1024px)');

  const {sessionData} = useGetSession(['businessId', 'loggedIn']);

  const userId = sessionData?.loggedIn?.user?.id;
  const businessId = sessionData?.businessId;

  const listOfCoownersFetch = useQuery(
    ['coowners', query?.id],
    () => fetchListOfCoowners(query?.id),
    {enabled: !!equity_id}
  );

  const coowners = listOfCoownersFetch?.data?.data?.data ?? [];

  const queryForCustomersInfo = `${coowners
    .map(element => {
      return `user[]=${element?.invitee?.id}`;
    })
    .join('&')}&business_id=${businessId}`;

  const customersFetch = useQuery(
    ['users', queryForCustomersInfo],
    () => fetchCustomersInfo(queryForCustomersInfo),
    {enabled: !!coowners?.length}
  );

  const placeLoggedInCustomerFirstInArray = coownerArray =>
    coownerArray.sort((a, b) => {
      if (Number(a?.invitee?.id) === userId) {
        return -1;
      } else if (Number(b?.invitee?.id) === userId) {
        return 1;
      } else {
        return 0;
      }
    });

  const findCustomerObjOfCoowner = (email, key) =>
    customersFetch?.data?.data?.user.find(item => item.email === email)?.[key] ?? '-';

  if (customersFetch.data) {
    coownersList = placeLoggedInCustomerFirstInArray(coowners).map((item, index) => {
      return {
        infoFor: 'individual',
        slideIndex: index,
        userId: item?.invitee?.id,
        amount_paid_heading: 'Shared amount paid',
        amountPaid: '-',
        progress: '-',
        due_balance: '-',
        due_date: changeDateFormat(equityInfo?.next_due_date),
        outStanding_balance: '-',
        equityValue: `${item?.equity_value}%`,
        status: item?.status,
        email: item?.invitee?.email,
        avatar: findCustomerObjOfCoowner(item?.invitee?.email, 'avatar'),
        name: `${findCustomerObjOfCoowner(
          item?.invitee?.email,
          'first_name'
        )} ${findCustomerObjOfCoowner(item?.invitee?.email, 'last_name')}`,
      };
    });
  }

  const switchTransitonInfo = () => {
    const newTransactionInfo =
      transactionInfo.infoFor === 'individual' ? groupTransactioninfo : coownersList?.[0];
    setTransactionInfo(newTransactionInfo);
  };

  useQuery(
    ['coownerInfo', transactionInfo?.userId, equity_id],
    () => fetchIndividualCoOwnersData(transactionInfo?.userId, equity_id),
    {
      enabled: !!transactionInfo?.userId,
      onSuccess: res => {
        const updatedTransactionData = {
          amountPaid: formatToCurrency(res?.data?.user_amount_paid),
          progress: calculatePercentagePaid(
            res?.data?.user_total_share,
            res?.data?.user_amount_paid
          ),
          due_balance: formatToCurrency(res?.data?.next_due_payment),
          outStanding_balance: formatToCurrency(res?.data?.individual_outstanding_balance),
        };
        setTransactionInfo({
          ...transactionInfo,
          ...updatedTransactionData,
        });
      },
    }
  );

  return (
    <Stack w="full" spacing={{base: 'none', xl: '10px'}}>
      <Box
        // spacing="10px"
        position="absolute"
        px="24px"
        pt="18px"
        left="0px"
        gap="10.68px"
        right="0px"
        display="flex"
        flexDirection={{xl: 'row', base: 'column'}}
        justifyContent="space-between"
        alignItems="center"
        top="0px"
        h={{base: '107px', xl: '89px'}}
      >
        <HStack
          spacing="20px"
          justify={{xl: 'start', base: 'space-between'}}
          w={{base: 'full', xl: 'fit-content'}}
        >
          <Text
            as="header"
            className="heading-text-regular"
            fontSize={{base: '16px', md: '18px'}}
            fontWeight="400"
            color="#191919"
          >
            Co-ownership
          </Text>
          <Button
            onClick={switchTransitonInfo}
            cursor={
              customersFetch.isError || !equityInfo || listOfCoownersFetch.isError
                ? 'not-allowed'
                : customersFetch.isLoading || listOfCoownersFetch.isLoading
                ? 'wait'
                : 'pointer'
            }
            isDisabled={
              !equityInfo ||
              customersFetch.isError ||
              customersFetch.isLoading ||
              listOfCoownersFetch.isError ||
              listOfCoownersFetch.isLoading
            }
            maxH={{base: '36px', xl: '29.801px'}}
            p={{md: '4.967px 12px', base: '8px 0px'}}
            maxW="158px"
            lineHeight="14px"
            fontSize={{xl: '10.75px', base: '11.921px'}}
            fontWeight="400"
            color={{base: '#191919', xl: '#ffffff'}}
            _focus={{opacity: 1}}
            borderRadius="0px"
            _active={{
              opacity: 1,
            }}
            bg={{base: 'transparent', xl: '#191919'}}
            _hover={{opacity: 1}}
            iconSpacing="6.62px"
            rightIcon={
              isBelowXl ? (
                <Image
                  transform="rotate(180deg)"
                  src={angledArrow.src}
                  display={{base: 'inline-block', xl: 'none'}}
                  alt="back arrow"
                  boxSize="20px"
                />
              ) : null
            }
          >
            {`View ${
              !!(transactionInfo.infoFor === 'individual') ? 'Group' : 'Individual'
            } Payment`}
          </Button>
        </HStack>

        <CoownersCarousel
          coownersList={coownersList}
          transactionInfo={transactionInfo}
          setTransactionInfo={setTransactionInfo}
          isOpen={!!(transactionInfo.infoFor === 'individual')}
        />
      </Box>
      <Box
        position="relative"
        zIndex={1}
        transition={`0.5s ease-in-out`}
        mt={{
          base: transactionInfo.infoFor !== 'individual' ? '46.68px' : '135px',
          xl: '0px',
        }}
      >
        <TransactionInfo equityInfo={equityInfo} transactionInfo={transactionInfo} />
      </Box>
    </Stack>
  );
};

export default CoownersHeader;
