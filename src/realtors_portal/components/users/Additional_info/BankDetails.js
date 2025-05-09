import {Box, HStack, Stack, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import {BsDashLg} from 'react-icons/bs';

export const BankDetails = ({bankDetails}) => {
  return (
    <Stack w="full" mb={{base: '20px', md: '58px'}}>
      <Text
        textAlign="start"
        color={{base: '#191919', md: '#4545FE'}}
        fontSize={{base: '16px', md: '24px'}}
        fontWeight={500}
      >
        Bank Details
      </Text>

      <Box
        bg="#fff"
        padding={{base: '16px', md: '20px 0px 10px'}}
        border={{base: '.5px solid', md: `none`}}
        borderColor={`#E4E4E7 !important`}
        borderRadius={{base: `8px`, md: `16px`}}
        overflow={`hidden`}
      >
        <Stack
          flexDir={{base: 'column', md: 'row'}}
          alignItems={{base: 'flex-start', md: 'center'}}
          textAlign={'left'}
          gap="10px"
          justify="space-between"
          fontSize={'16px'}
          color="#191919"
          borderBottom="1px solid #F5F5F5"
          pt={4}
          pb={2}
        >
          <Text
            fontWeight="400"
            fontSize="14px"
            lineHeight="20px"
            color={{base: `#9D9D9D`, lg: '#606060'}}
          >
            Bank
          </Text>
          <Text fontWeight="500" fontSize="18px" lineHeight="24px" color="#191919">
            {bankDetails?.bank ?? <BsDashLg />}{' '}
          </Text>
        </Stack>
        <Stack
          flexDir={{base: 'column', md: 'row'}}
          alignItems={{base: 'flex-start', md: 'center'}}
          textAlign={'left'}
          gap="10px"
          justify="space-between"
          fontSize={'16px'}
          color="#191919"
          borderBottom="1px solid #F5F5F5"
          pt={4}
          pb={2}
        >
          <Text
            fontWeight="400"
            fontSize="14px"
            lineHeight="20px"
            color={{base: `#9D9D9D`, lg: '#606060'}}
          >
            Account Number{' '}
          </Text>
          <Text fontWeight="500" fontSize="18px" lineHeight="24px" color="#191919">
            {bankDetails?.account_number ?? <BsDashLg />}{' '}
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};

export default BankDetails;
