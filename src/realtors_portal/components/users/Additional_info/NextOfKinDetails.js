import {Box, HStack, Stack, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import {BsDashLg} from 'react-icons/bs';

export const NextOfKinDetails = ({customerInfo}) => {
  return (
    <Stack w="full">
      <Text
        textAlign="start"
        color={{base: '#191919', md: '#4545FE'}}
        fontSize={{base: '16px', md: '24px'}}
        fontWeight={500}
      >
        Next of Kin Details
      </Text>

      <Box
        bg="#ffffff"
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
            Legal First Name
          </Text>
          <Text fontWeight="500" fontSize="18px" lineHeight="24px" color="#191919">
            {customerInfo?.first_name ?? <BsDashLg />}
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
            Legal Last Name
          </Text>
          <Text fontWeight="500" fontSize="18px" lineHeight="24px" color="#191919">
            {customerInfo?.last_name ?? <BsDashLg />}
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
            Relationship
          </Text>
          <Text fontWeight="500" fontSize="18px" lineHeight="24px" color="#191919">
            {customerInfo?.relationship ?? <BsDashLg />}
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
            Email address
          </Text>
          <Text
            fontWeight="500"
            fontSize="18px"
            lineHeight="24px"
            color={customerInfo?.email ? '#4545FE' : '#191919'}
          >
            {customerInfo?.email ?? <BsDashLg />}
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
            Phone
          </Text>
          <Text fontWeight="500" fontSize="18px" lineHeight="24px" color="#191919">
            {customerInfo?.phone ?? <BsDashLg />}
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
            Residential
          </Text>
          <Text
            fontWeight="500"
            fontSize="18px"
            lineHeight="24px"
            color="#191919"
            maxW={526}
            textAlign="right"
          >
            {customerInfo?.residential_address ?? <BsDashLg />}
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};
