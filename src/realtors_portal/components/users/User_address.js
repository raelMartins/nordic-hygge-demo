import {HStack, Image, Stack, Text, Container, Box} from '@chakra-ui/react';
import React from 'react';

import locationIcon from '/src/realtors_portal/images/icons/location_icon_store.svg';
import {BsDashLg} from 'react-icons/bs';

export const UserAddress = ({customerInfo}) => {
  return (
    <Stack>
      <Box
        pb={4}
        maxW="888px"
        background="#FFFFFF"
        h="171px"
        p={22}
        border={{base: '.5px solid'}}
        borderColor={`#E4E4E7 !important`}
        borderRadius={{base: `8px`, md: `16px`}}
        overflow={`hidden`}
      >
        <Stack mb={4}>
          <HStack>
            <Image alt="" boxSize="24px" src={locationIcon.src} />
            <Text color={customerInfo?.address ? '#191919' : '#606060'} fontWeight="bold">
              Home Address
            </Text>
          </HStack>
          <Text textAlign="start">
            {customerInfo?.address ? customerInfo?.address : <BsDashLg />}
          </Text>
        </Stack>
        <Stack>
          <HStack>
            <Image alt="" boxSize="24px" src={locationIcon.src} />
            <Text color={customerInfo?.company_address ? '#191919' : '#606060'} fontWeight="bold">
              Company Address
            </Text>
          </HStack>
          <Text textAlign="start">
            {customerInfo?.company_address ? customerInfo?.company_address : <BsDashLg />}
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};
