import {Box, Text, VStack, Flex} from '@chakra-ui/react';
import {FormInput} from '../../../../ui-lib';
import {MY_COUNTRY} from '@/constants/country';

const SliderMenu = ({label, priceFrom, setPriceFrom, priceTo, setPriceTo}) => {
  const handleMinChange = e => {
    const formatNumber = parseInt(e.target.value.replace(/,/g, '')).toLocaleString();
    if (formatNumber !== 'NaN') {
      setPriceFrom(formatNumber);
    } else {
      setPriceFrom('');
    }
  };

  const handleMaxChange = e => {
    const formatNumber = parseInt(e.target.value.replace(/,/g, '')).toLocaleString();
    if (formatNumber !== 'NaN') {
      setPriceTo(formatNumber);
    } else {
      setPriceTo('');
    }
  };

  return (
    <VStack mt="20px" w={'100%'} alignItems="stretch">
      <Text color="text" fontWeight={400} fontSize={'16px'}>
        {label}
      </Text>
      <Box mt="17px">
        <Flex align="center" justify={'space-between'} w="full" gap="14px">
          <Box>
            <Text color="text">Min</Text>
            <FormInput
              px="3px"
              leftAddon={
                <Text color="text" mt="12px" fontSize={'20px'}>
                  {MY_COUNTRY?.symbol}
                </Text>
              }
              w={'full'}
              mt="4px"
              color="text"
              border={'1px solid !important'}
              borderRadius={'5px'}
              value={priceFrom}
              onChange={handleMinChange}
              borderColor="text"
            />
          </Box>
          <Box>
            <Text color="text">Max</Text>
            <FormInput
              px="0px"
              leftAddon={
                <Text color="text" mt="12px" fontSize={'20px'}>
                  {MY_COUNTRY?.symbol}
                </Text>
              }
              w={'full'}
              mt="4px"
              color="text"
              border={'1px solid !important'}
              borderRadius={'5px'}
              value={priceTo}
              onChange={handleMaxChange}
              borderColor="text"
            />
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
};

export default SliderMenu;
