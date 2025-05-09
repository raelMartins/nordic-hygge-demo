import {
  HStack,
  Image,
  VStack,
  Text,
  useDisclosure,
  Box,
  useTheme,
  Center,
  Stack,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import homeIcon from '../../images/icons/validateAssetHomeIcon.svg';
import {useQuery} from 'react-query';
import {Button} from '/src/ui-lib';
import {CloseIcon} from '@chakra-ui/icons';
import cancelICon from '/src/images/icons/closeIcon.svg';
import {fetchForCustomerEquityValidation} from '../../api/listing';
import DrawerForValidateCustomerEquity from './index';
import {ValidateAssetHomeIcon} from '../assets/svgs';
import useLocalStorage from '../../utils/hooks/useLocalStorage';
import {appCurrentTheme} from '../../utils/localStorage';
import {LIGHT} from '../../constants/names';
import {HomeBanner} from '../properties/HomeBanner';
import useGetSession from '@/utils/hooks/getSession';

const ValidateCustomerEquityBar = () => {
  const [willDisplay, setWillDisplay] = useState(true);
  // const [business_id] = useLocalStorage('businessId');
  const fetchcustomeQuery = useQuery(
    ['fetchcustomervalidationEquity'],
    () => fetchForCustomerEquityValidation(),
    {refetchOnMount: true}
  );

  const {sessionData: LoggedinUser} = useGetSession('loggedIn');

  const datasToUse = fetchcustomeQuery?.data?.data?.all_pending_requests;

  const drawerDisclosure = useDisclosure();

  return (
    <>
      {datasToUse?.length ? (
        <>
          {willDisplay && (
            <HomeBanner
              icon={<ValidateAssetHomeIcon boxSize={{base: '24px'}} />}
              title={`Hi ${LoggedinUser?.first_name}, Welcome Onboard`}
              text={`Could you spare a moment to quickly verify some past transactions?.`}
              handleClick={drawerDisclosure.onOpen}
            />
          )}
          <DrawerForValidateCustomerEquity
            equitiesData={datasToUse}
            drawer={drawerDisclosure}
            refetch={fetchcustomeQuery?.refetch}
            isLoading={fetchcustomeQuery?.isLoading}
          />
        </>
      ) : null}
    </>
  );
};

export default ValidateCustomerEquityBar;
