import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Box,
  Text,
  HStack,
  Flex,
  Center,
} from '@chakra-ui/react';
import {HiOutlineChevronDown} from 'react-icons/hi';
import {useState} from 'react';
import {themeStyles} from '../../../../theme';

export const SelectMenu = ({label, placeholder, options, selected, onApply, maxW, ...rest}) => {
  const [selectedOption, setSelectedOption] = useState(selected);

  return (
    <Flex
      w={'100%'}
      maxW={maxW}
      cursor={'pointer'}
      justify="space-between"
      align="flex-start"
      direction="column"
    >
      <Text fontSize="13px" fontWeight="500" fontFamily="Roboto">
        {label}
      </Text>
      <Menu bg="card_bg" closeOnSelect={false}>
        <MenuButton as={Box}>
          <HStack my={'8px'}>
            <Text fontSize="16px" fontWeight="500" fontFamily="Roboto">
              {!selectedOption
                ? placeholder
                : selectedOption === 'Any'
                ? 'Show All'
                : selectedOption}
            </Text>
            <HiOutlineChevronDown />
          </HStack>
        </MenuButton>
        <MenuList bg="card_bg" py={'20px'} shadow={'md'}>
          <Text {...themeStyles.textStyles.sb6} px={'20px'} mb={'20px'} cursor={'pointer'}>
            Select {label}
          </Text>
          {options?.map(option => (
            <MenuItem
              bg="card_bg"
              key={option.value}
              value={option.value}
              px={'20px'}
              icon={
                <Center
                  w="20px"
                  h="20px"
                  border="1px solid"
                  borderColor={'text'}
                  borderRadius={'full'}
                >
                  {selectedOption == option.value && (
                    <Box borderRadius={'full'} w="10px" h="10px" bg="text" />
                  )}
                </Center>
              }
              iconSpacing={'15px'}
              onClick={() => {
                setSelectedOption(option.value);
              }}
            >
              <Text color="text" {...themeStyles.textStyles.sl5}>
                {option.label}
              </Text>
            </MenuItem>
          ))}
          <MenuItem bg="card_bg" my={'10px'} closeOnSelect={true}>
            <Flex width={'100%'} justify={'end'} pr={'5px'}>
              <Text
                color="custom_color.contrast"
                bg="custom_color.color"
                onClick={() => {
                  onApply(selectedOption);
                }}
                {...themeStyles.textStyles.sl6}
                px={'12px'}
                py={'6px'}
                borderRadius={'5px'}
              >
                Apply
              </Text>
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
