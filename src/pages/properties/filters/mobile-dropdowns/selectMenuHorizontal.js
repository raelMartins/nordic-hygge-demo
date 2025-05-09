import {Flex, Text, Center, VStack} from '@chakra-ui/react';
import {useState} from 'react';

const SelectMenuHorizontal = ({label, options, selected, onApply}) => {
  return (
    <VStack mt="28px" w={'100%'} alignItems="stretch">
      <Text color="text" fontWeight={400} fontSize={'16px'}>
        {label}
      </Text>
      <Flex mt="27px" w="full" direction="row" justify="space-between">
        {options?.map(option => (
          <Center
            w="35px"
            h="30px"
            borderRadius={'8px'}
            border="0.545px solid"
            borderColor={'matador_border_color.100'}
            justify="flex-start"
            align="center"
            onClick={() => onApply(option.value)}
            bg={selected === option.value ? 'text' : 'inverse_text'}
          >
            <Text fontSize="14px" color={selected === option.value ? 'inverse_text' : 'text'}>
              {option.label}
            </Text>
          </Center>
        ))}
      </Flex>
    </VStack>
  );
};

export default SelectMenuHorizontal;
