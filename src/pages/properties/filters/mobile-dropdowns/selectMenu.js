import {Flex, Text, Center, VStack, Box} from '@chakra-ui/react';
import {CheckIcon} from '@chakra-ui/icons';

const SelectMenu = ({label, options, selected, onApply}) => {
  return (
    <VStack mt="28px" w={'100%'} alignItems="stretch">
      <Text color="text" fontWeight={400} fontSize={'16px'}>
        {label}
      </Text>
      <Flex mt="26px" w="full" gap="26px" direction="column">
        {options?.map(option => (
          <Flex align="center" gap="10px" onClick={() => onApply(option.value)}>
            <Center
              w="22px"
              h="22px"
              borderRadius={'3px'}
              border="0.545px solid"
              borderColor={'matador_border_color.100'}
            >
              {selected === option.value ? (
                <Center w="16px" h="16px" borderRadius={'2px'} bg="text">
                  <CheckIcon fontSize="12px" color="card_bg" />
                </Center>
              ) : (
                <Center w="16px" h="16px" borderRadius={'2px'} bg="text">
                  <CheckIcon fontSize="12px" color="text" />
                </Center>
              )}
            </Center>
            <Text color="text">{option.label}</Text>
          </Flex>
        ))}
      </Flex>
    </VStack>
  );
};

export default SelectMenu;
