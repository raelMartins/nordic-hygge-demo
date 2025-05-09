import { Box, Tag, TagLabel, Text } from '@chakra-ui/react';
import { appCurrentTheme } from '../../utils/localStorage';
import { LIGHT } from '../../constants/names';

const PaymentTransactionType = ({ type }) => {
  let val = type.toLowerCase();
  // 
  switch (val) {
    case 'equity_outright':
      return (
        <Box
          borderRadius='full'
          px={{ base: '8px', md: '18px' }}
          py={{ base: '5px', md: '9px' }}
        >
          <Text
            display={'none'} noOfLines={1}
            fontSize={{ base: '10px', md: '16px' }}
            fontWeight={400} color='text' mx='auto'
          >
            Outright payment
          </Text>
        </Box>
      );
    case 'equity_plan_initial':
      return (
        <Box
          borderRadius='full'
          px={{ base: '8px', md: '18px' }}
          py={{ base: '5px', md: '9px' }}
        >
          <Text
            display={'none'} noOfLines={1}
            fontSize={{ base: '10px', md: '16px' }}
            fontWeight={400} color='text' mx='auto'
          >
            Initial deposit
          </Text>
        </Box>
      );
    case 'equity_plan_deposit':
      return (
        <Box
          borderRadius='full'
          px={{ base: '8px', md: '18px' }}
          py={{ base: '5px', md: '9px' }}
        >
          <Text
            display={'none'} noOfLines={1}
            fontSize={{ base: '10px', md: '16px' }}
            fontWeight={400} color='text' mx='auto'
          >
            Equity deposit
          </Text>
        </Box>
      );

    default:
      break;
  }
  if (val.slice(0, 6) == 'shared') {
    return (
      <Tag w='130px' colorScheme='blue' borderRadius='full' h='36px'>
        <TagLabel mx='auto'>shared payment</TagLabel>
      </Tag>
    );
  }
};

export default PaymentTransactionType;