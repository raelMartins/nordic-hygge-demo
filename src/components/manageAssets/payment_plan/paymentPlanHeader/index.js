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

const PaymentPlanHeader = ({
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
      <Box position="relative" zIndex={1} transition={`0.5s ease-in-out`}>
        <TransactionInfo equityInfo={equityInfo} transactionInfo={transactionInfo} />
      </Box>
    </Stack>
  );
};

export default PaymentPlanHeader;
