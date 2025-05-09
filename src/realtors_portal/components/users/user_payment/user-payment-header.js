import {Box, Text, Flex, Center, HStack} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import {BsDashLg} from 'react-icons/bs';

export const UserPaymentHeader = ({data}) => {
  const accountDetails = data?.customer;
  const equityInfo = data?.project;
  const unitInfo = data?.unit;
  return (
    <Center
      borderRadius="4px"
      border="1px solid"
      borderColor={`#e4e4e7 !important`}
      bg={`#FAFAFA`}
      p="20px 8px"
      color="#191919"
      fontSize="12px"
      fontWeight="600"
      alignItems="center"
      wordBreak="break-word"
      gap={`4px`}
      justifyContent={{base: `space-between`, lg: `center`}}
    >
      <HStack
        gap={`8px`}
        display={{base: `flex`, lg: `none`}}
        justifyContent={`flex-start`}
        flex={`1`}
      >
        <Center
          boxSize={`35px`}
          minW={`35px`}
          pos={`relative`}
          borderRadius={`50%`}
          overflow={`hidden`}
        >
          <Image src={accountDetails?.avatar} alt={``} fill style={{objectFit: `cover`}} />
        </Center>

        <Text fontSize={`14px`} fontWeight={`500`} lineHeight={`150%`} letterSpacing={`0.282px`}>
          {accountDetails?.first_name ? (
            `${accountDetails?.first_name} ${accountDetails?.last_name}`
          ) : (
            <BsDashLg />
          )}
        </Text>
      </HStack>
      <Text textAlign={{base: `right`, lg: `center`}} flex={`1`}>
        {unitInfo?.unit_title ?? <BsDashLg />}, {equityInfo?.name ?? <BsDashLg />}
      </Text>

      {/* <Box display="flex" flexDirection="column">
        <Text
          color="#191919"
          fontSize="12px"
          fontWeight="600"
          alignItems="center"
          wordBreak="break-word"
        >
          {accountDetails?.account_number ?? <BsDashLg />}
        </Text>
        <Text
          color="#606060"
          fontSize="7.22px"
          fontWeight="400"
          alignItems="center"
          wordBreak="break-word"
        >
          {accountDetails?.bank_name ?? <BsDashLg />}
        </Text>
      </Box> */}
    </Center>
  );
};

export default UserPaymentHeader;
