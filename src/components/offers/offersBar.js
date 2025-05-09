import {HStack, Image, Text, useDisclosure, Box, VStack, Stack, Center} from '@chakra-ui/react';
import React, {useState} from 'react';
import cancelICon from '/src/images/icons/closeIcon.svg';
import {useQuery} from 'react-query';
import {fetchOffers} from '../../api/listing';
import DrawerForOffers from '.';
import offerIcon from '../../images/icons/offers-icons.svg';
import {Button} from '../../ui-lib';
import {CloseIcon} from '@chakra-ui/icons';
import {OffersIcon} from '../assets/svgs';
import {appCurrentTheme} from '../../utils/localStorage';
import {LIGHT} from '../../constants/names';
import {HomeBanner} from '../properties/HomeBanner';

export const OffersBar = () => {
  const [willDisplay, setWillDisplay] = useState(true);
  const pendingQuery = useQuery(['fetchUserEquity', 'OFFERS'], fetchOffers, {refetchOnMount: true});

  const assetData = pendingQuery?.data?.data?.data;

  const drawerDisclosure = useDisclosure();
  return (
    <>
      {assetData?.length ? (
        <>
          {willDisplay && (
            <HomeBanner
              icon={<OffersIcon boxSize={{base: '24px'}} />}
              title={`We have sent you an offer!`}
              text={`Please complete the transaction before it expires.`}
              handleClick={drawerDisclosure.onOpen}
            />
          )}
          <DrawerForOffers
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

export default OffersBar;
