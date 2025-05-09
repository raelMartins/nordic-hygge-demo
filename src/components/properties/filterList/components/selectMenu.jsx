import React from 'react';
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
  Stack,
  Button,
} from '@chakra-ui/react';
import {HiOutlineChevronDown} from 'react-icons/hi';
import {useState} from 'react';
import {truncateLongText} from '../../../../utils/truncateLongText';
import {CheckIconForFilterSVG, DropDownArrorFilterSVG} from '../../../assets/svgs';

const SelectMenu = ({
  label,
  placeholder,
  objKey,
  updateOption,
  options,
  selectedOptions,
  onApply,
  ...rest
}) => {
  const getSelectedLabels = () => {
    if (selectedOptions.length) {
      const selectedOptionsLabelArray = options.flatMap(({value, label}) =>
        selectedOptions.includes(value) ? [label] : []
      );
      const truncated = truncateLongText(selectedOptionsLabelArray.join(', '), 20);
      return truncated.truncatedText;
    } else {
      return placeholder;
    }
  };

  const handleSelect = value => () => {
    let options = [...selectedOptions];
    options.includes(value)
      ? options.splice(options.indexOf(value), 1)
      : value === ''
      ? (options = [])
      : options.push(value);

    return updateOption(prev => {
      return {...prev, [objKey]: [...options]};
    });
  };
  return (
    <Menu placement="bottom-start" autoSelect={false} closeOnSelect={false}>
      {({isOpen}) => (
        <>
          <Stack justify="space-between" spacing="8px" w="full" maxW="157px">
            <Text fontSize="13px" fontWeight="400" color="matador_text.200">
              {label}
            </Text>
            <MenuButton cursor="pointer" w="full" as={Box}>
              <HStack justify="space-between" w="full">
                <Text
                  textTransform="capitalize"
                  fontSize="16px"
                  fontWeight="600"
                  color="matador_form.label"
                >
                  {getSelectedLabels()}
                </Text>

                <DropDownArrorFilterSVG
                  transition="0.3s ease-in-out"
                  transform={`rotate(${isOpen ? '180deg' : '0deg'})`}
                />
              </HStack>
            </MenuButton>
          </Stack>

          <MenuList
            bg="matador_background.200"
            border="1px solid"
            borderColor="matador_border_color.100"
            mt={'-5px'}
            minW="117px"
            borderRadius="5px"
            p="15px 20px"
            px="0px"
            {...rest}
          >
            <Stack spacing="15px">
              {options?.map((option, idx) => (
                <MenuItem
                  value={option.value}
                  _focus={{
                    bg: 'matador_background.200',
                  }}
                  p="0px"
                  px="20px"
                  bg="matador_background.200"
                  color="text"
                  key={idx}
                  fontSize="13px"
                  fontWeight="400"
                  icon={
                    <Box p="0.5px" key={idx} borderRadius="2px" bg="matador_border_color.100">
                      <CheckIconForFilterSVG
                        opacity={
                          selectedOptions.includes(option.value) ||
                          (!selectedOptions?.length && !option.value)
                            ? 1
                            : 0
                        }
                        transform={`scale(${
                          selectedOptions.includes(option.value) ||
                          (!selectedOptions?.length && !option.value)
                            ? 1
                            : 0
                        })`}
                        transition="0.4s ease-in-out"
                      />
                    </Box>
                  }
                  iconSpacing={'15px'}
                  onClick={handleSelect(option.value)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Stack>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default SelectMenu;
