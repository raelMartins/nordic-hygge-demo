import {HStack, Image, Text, useDisclosure, Box, VStack, Stack, Center} from '@chakra-ui/react';
import React, {useState} from 'react';
import cancelICon from '/src/images/icons/closeIcon.svg';
import {useQuery} from 'react-query';
import DrawerForPendingTransaction from '../pendingTransactions';
import {Button} from '/src/ui-lib';
import {CloseIcon} from '@chakra-ui/icons';
import {fetchUserEquity} from '../../api/listing';
import {PendingTransactionBarSVG} from '../assets/svgs';
import {appCurrentTheme} from '../../utils/localStorage';
import {LIGHT} from '../../constants/names';
import {HomeBanner} from '../properties/HomeBanner';
import useGetSession from '@/utils/hooks/getSession';
import {timeRelativeGreeting} from '@/utils/truncateLongText';

export const PendingTransactionsBar = () => {
  const [willDisplay, setWillDisplay] = useState(true);
  const pendingQuery = useQuery(['fetchUserEquity', 'PENDING'], () => fetchUserEquity('PENDING'), {
    refetchOnMount: true,
  });
  const assetData = pendingQuery?.data?.data?.results;
  const {sessionData: LoggedinUser} = useGetSession('loggedIn');

  const drawerDisclosure = useDisclosure();
  return (
    <>
      {assetData?.length ? (
        <>
          {willDisplay && (
            <HomeBanner
              icon={<PendingTransactionBarSVG boxSize={{base: '24px'}} />}
              title={`${timeRelativeGreeting(LoggedinUser?.first_name)}, You have ${
                assetData?.length
              } pending transaction.`}
              text={`Please proceed to complete the transaction at your earliest convenience.`}
              handleClick={drawerDisclosure.onOpen}
            />
          )}
          <DrawerForPendingTransaction
            refetch={pendingQuery?.refetch}
            assetData={assetData}
            isLoading={pendingQuery?.assetLoading}
            isOpen={drawerDisclosure.isOpen}
            drawer={drawerDisclosure}
            isError={pendingQuery?.isError}
          />
        </>
      ) : null}
    </>
  );
};

export default PendingTransactionsBar;
