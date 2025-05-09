import {Box, Heading, SimpleGrid, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {handleLastTwoDigits, removeLasttTwoDigits} from '/src/realtors_portal/utils';

export const UserPaymentPaymentsFractional = () => {
  return (
    <Stack mt="25px" spacing="22px" w="full">
      <Heading as="h2" fontWeight="500" textAlign="start" fontSize="24px">
        Payments
      </Heading>
      <Box bg="#F5F5F5" px="21px" py="17px" pb="36px" w="full" borderRadius="16px">
        <SimpleGrid
          w="full"
          // bg="red"
          gridTemplateColumns="max-content auto auto auto auto"
          columns={5}
          columnGap="50px"
          spacing={10}
        >
          <Text fontWeight="400" color="#606060" fontSize="16px"></Text>

          <Text w="auto" textAlign="start" fontWeight="400" color="#606060" fontSize="16px">
            Purchase price
          </Text>
          <Text w="auto" textAlign="start" fontWeight="400" color="#606060" fontSize="16px">
            Price per fraction
          </Text>
          <Text w="auto" textAlign="start" fontWeight="400" color="#606060" fontSize="16px">
            Fractions bought
          </Text>
          <Text w="auto" textAlign="start" fontWeight="400" color="#606060" fontSize="16px">
            Payment date
          </Text>
          <Text fontWeight="600" color="#606060" fontSize="24px">
            1.
          </Text>
          <Text w="auto" textAlign="start" fontWeight="600" color="#606060" fontSize="24px">
            <Text as="span" textAlign="center" color="#191919">
              {removeLasttTwoDigits('800000.00')}
            </Text>{' '}
            {handleLastTwoDigits('800000.00')}
          </Text>
          <Text w="auto" textAlign="start" fontWeight="600" color="#606060" fontSize="24px">
            <Text as="span" textAlign="center" color="#191919">
              {removeLasttTwoDigits('8000.00')}
            </Text>{' '}
            {handleLastTwoDigits('8000.00')}
          </Text>
          <Text w="auto" textAlign="start" fontWeight="600" color="#606060" fontSize="24px">
            10
          </Text>
          <Text w="auto" textAlign="start" fontWeight="600" color="#606060" fontSize="24px">
            Jun 11, 2022
          </Text>
        </SimpleGrid>
      </Box>
    </Stack>
  );
};

export default UserPaymentPaymentsFractional;
