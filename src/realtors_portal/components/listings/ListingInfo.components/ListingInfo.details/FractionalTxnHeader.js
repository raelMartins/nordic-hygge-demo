import {Stack, Text} from '@chakra-ui/react';
import {handleLastTwoDigits, removeLasttTwoDigits} from '/src/realtors_portal/utils';

export const FractionalTxnHeader = ({data}) => {
  return (
    <Stack
      maxW={'660px'}
      justify={'center'}
      align="center"
      spacing="14px"
      height="130px"
      background="#FFFFFF"
      border="1px solid #E4E4E4"
      borderRadius="12px"
      mx={`auto`}
    >
      <Text color={'#4545FE'} fontWeight="600" fontSize={'24px'}>
        {/* {`${removeLasttTwoDigits(parseInt(data?.total_value))}`}
        {handleLastTwoDigits(parseInt(data?.total_value))} */}
        --
      </Text>
      <Text fontSize="12px" fontWeight={'400'} color="#606060">
        Total Value of Fractions
      </Text>
    </Stack>
  );
};

export default FractionalTxnHeader;
