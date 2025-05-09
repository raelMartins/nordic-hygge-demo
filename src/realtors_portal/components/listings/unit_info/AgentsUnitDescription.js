import {Box, HStack, Text, VStack} from '@chakra-ui/react';
import React from 'react';

const AgentsUnitDescription = ({description}) => {
  return description ? (
    <Box mt={{base: '30px', lg: '60px'}} p={{base: 4, lg: 0}}>
      <Text
        display={'flex'}
        gap="15px"
        alignContent="center"
        fontWeight={500}
        fontSize={{base: '18px', lg: '26px'}}
        lineHeight="41px"
        color="#191919"
      >
        Unit Description
      </Text>
      <HStack
        border={{lg: '1px solid #e4e4e4'}}
        justify="start"
        padding={{lg: '10px 36px'}}
        bg={{lg: '#FFFFFF'}}
        borderRadius="16px"
        mx="0px"
        w="full"
      >
        <VStack justify={'start'} align="start" w="full" h="full">
          <Text
            p={{lg: '23px'}}
            fontWeight={300}
            fontSize="14px"
            color="#191919"
            lineHeight={{base: `150%`, lg: `28px`}}
          >
            {description}
          </Text>
        </VStack>
      </HStack>
    </Box>
  ) : null;
};

export default AgentsUnitDescription;
