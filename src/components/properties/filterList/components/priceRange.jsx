import {Divider, HStack, Input, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {formatToCurrency} from '../../../../utils';

const PriceRange = ({label, shouldDisable, upDatePrice, priceRange}) => {
  const handleInput = (e, max) => {
    const input = e.target;
    let val = input.value;

    const key = max ? 'priceTo' : 'priceFrom';

    const cleanedString = val.replace(/[^\d]/g, ''); // Remove non-numeric characters
    val = cleanedString.replace(/^0+(?=\d)/, '');

    const length = val.length;

    if (length <= 2) {
      val = '0.' + val.padStart(2, '0');
    } else {
      const integerPart = val.slice(0, length - 2);
      const decimalPart = val.slice(-2);
      val = integerPart + '.' + decimalPart;
    }

    return upDatePrice(prev => ({...prev, priceRange: {...prev.priceRange, [key]: val}}));
  };

  return (
    <Stack opacity={shouldDisable ? 0.5 : 1} spacing="8px" justify="start">
      <Text fontSize="13px" fontWeight="400" color="matador_text.200">
        {label}
      </Text>
      <HStack justify="space-between" w="full" maxW="260px">
        <Input
          w="full"
          maxW="105px"
          readOnly={shouldDisable}
          h="33px"
          border="none"
          borderBottom="0.5px solid"
          borderColor="matador_border_color.100"
          borderRadius="0px"
          placeholder="Min"
          _hover={{
            bg: 'transparent',
          }}
          _focusVisible={{
            bg: 'transparent',
            boxShadow: 'none',
            borderColor: 'matador_form.label',
          }}
          _placeholder={{
            color: 'matador_form.label',
          }}
          color="matador_form.label"
          fontSize="16px"
          fontWeight="500"
          onChange={e => handleInput(e, false)}
          value={priceRange.priceFrom ? formatToCurrency(priceRange.priceFrom) : ''}
          p="8px"
        />
        <Divider w="8px" bg="matador_form.label" />
        <Input
          readOnly={shouldDisable}
          w="full"
          maxW="105px"
          h="33px"
          border="none"
          _hover={{
            bg: 'transparent',
          }}
          _focusVisible={{
            bg: 'transparent',
            boxShadow: 'none',
            borderColor: 'matador_form.label',
          }}
          borderBottom="0.5px solid "
          borderColor="matador_border_color.100"
          borderRadius="0px"
          placeholder="Max"
          color="matador_form.label"
          _placeholder={{
            color: 'matador_form.label',
          }}
          fontSize="16px"
          fontWeight="600"
          p="8px"
          onChange={e => handleInput(e, true)}
          value={priceRange.priceTo ? formatToCurrency(priceRange.priceTo) : ''}
        />
      </HStack>
    </Stack>
  );
};

export default PriceRange;
