import {
  HStack,
  Radio,
  RadioGroup,
  Grid,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
  Box,
  Center,
} from '@chakra-ui/react';

const UsersHeader = ({
  number_of_customers,
  customers_with_outstanding_payment,
  customers_without_outstanding_payment,
  defaulters,
  setValue,
  value,
}) => {
  const cssForHeaders = {
    head_wrap: {
      borderRadius: '12px',
      paddingTop: {base: '7.5px', lg: '15px'},
      height: {base: '100px', lg: '120px'},
      width: {base: '100%', lg: '270px'},
      paddingBottom: {lg: '22px'},
      flex: '1',
      cursor: 'pointer',
      bg: '#fff',
      // maxWidth: {base: '100%', lg: 'unset'},
    },
    text_Bold: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#191919',
    },
    text_light: {
      lineHeight: '18px',
      fontSize: {base: '12px', lg: '14px'},
      fontWeight: '400',
      color: '#606060',
    },
  };

  return (
    <Grid
      templateColumns={{base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)'}}
      w="full"
      bg={{lg: '#ffffff'}}
      p={{lg: '19px 26px'}}
      mb="30px"
      gap="24px"
      borderRadius="16px"
      border={{lg: '1px solid #E4E4E4'}}
    >
      <VStack
        spacing={{base: '5px', lg: '17px'}}
        sx={cssForHeaders.head_wrap}
        border={value == '1' ? `1px solid #4545FE` : '1px solid #CBCBCB'}
        onClick={() => setValue('1')}
        textAlign={`center`}
      >
        <Text sx={cssForHeaders.text_Bold}>{number_of_customers ?? '-'}</Text>
        <Text sx={cssForHeaders.text_light}>
          Total Subscriber{number_of_customers == 1 ? '' : 's'}
        </Text>
      </VStack>
      <VStack
        spacing={{base: '5px', lg: '17px'}}
        sx={cssForHeaders.head_wrap}
        border={value == '4' ? `1px solid #4545FE` : '1px solid #CBCBCB'}
        onClick={() => setValue('4')}
        textAlign={`center`}
      >
        <Text sx={cssForHeaders.text_Bold}>{customers_with_outstanding_payment ?? '-'}</Text>
        <Text sx={cssForHeaders.text_light} w={{lg: '197px'}} px={{base: 4, lg: 0}}>
          Subscriber{customers_with_outstanding_payment == 1 ? '' : 's'} with outstanding payment
        </Text>
      </VStack>
      <VStack
        spacing={{base: '5px', lg: '17px'}}
        sx={cssForHeaders.head_wrap}
        border={value == '5' ? `1px solid #4545FE` : '1px solid #CBCBCB'}
        onClick={() => setValue('5')}
        textAlign={`center`}
      >
        <Text sx={cssForHeaders.text_Bold}>{customers_without_outstanding_payment ?? '-'}</Text>
        <Text sx={cssForHeaders.text_light} w={{lg: '205px'}} px={{base: 4, lg: 0}}>
          Subscriber{customers_without_outstanding_payment == 1 ? '' : 's'} without outstanding
          payment
        </Text>
      </VStack>
      <VStack
        spacing={{base: '5px', lg: '17px'}}
        sx={cssForHeaders.head_wrap}
        border={value == '3' ? `1px solid #4545FE` : '1px solid #CBCBCB'}
        onClick={() => setValue('3')}
        textAlign={`center`}
      >
        <Text sx={cssForHeaders.text_Bold}>{defaulters ?? '-'}</Text>
        <Text sx={cssForHeaders.text_light}>Defaulting Subscriber{defaulters == 1 ? '' : 's'}</Text>
      </VStack>
    </Grid>
  );
};

export default UsersHeader;
