import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Text,
  HStack,
  Flex,
  Divider,
} from '@chakra-ui/react';
import {HiOutlineChevronDown} from 'react-icons/hi';
import {useState} from 'react';
import {themeStyles} from '../../../../theme';
import {Slider} from '../../Slider';
import {priceString} from '../../../../utils/priceString';

const ps = value => priceString(value, {notation: 'compact', compactDisplay: 'short'});

export const SliderMenu = ({
  label,
  placeholder,
  range,
  onApply,
  domain,
  stepOfIncrement,
  maxW,
  ...rest
}) => {
  const [localRange, setLocalRange] = useState(range);

  const getSelctedRangeLabel = range => {
    let selectedRange;

    if (range[0] === domain[0]) {
      if (range[1] === domain[1]) {
        selectedRange = placeholder;
      } else {
        selectedRange = `${ps(range[1])} or less`;
      }
    } else if (range[1] === domain[1]) {
      if (range[0] === domain[0]) {
        selectedRange = placeholder;
      } else {
        selectedRange = `${ps(range[0])} or more`;
      }
    } else {
      selectedRange = `Between ${ps(range[0])} and ${ps(range[1])}`;
    }
    return selectedRange;
  };

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
      <Menu bg="card_bg" closeOnSelect={false} width>
        <MenuButton as={Box}>
          <HStack my={'8px'}>
            <Text fontSize="16px" fontWeight="500" fontFamily="Roboto">
              {placeholder}
            </Text>
            <HiOutlineChevronDown size="20" />
          </HStack>
        </MenuButton>
        <MenuList bg="card_bg" py={'20px'} shadow={'md'} px={'20px'}>
          <MenuItem bg="card_bg" pb={'15px'}>
            <Box>
              <Text color="text" mb={'0px'} {...themeStyles.textStyles.sb6}>
                Select {label}
              </Text>

              <Slider
                selectedRange={range}
                onRangeUpdate={setLocalRange}
                domain={domain}
                stepOfIncrement={stepOfIncrement}
              />
              <Flex gap={'140px'}>
                <Text
                  color="text"
                  minW={'50px'}
                  w={'max-content'}
                  border={'0.5px solid #313131 !important'}
                  p={'10px'}
                  pr={'40px'}
                  borderRadius={'5px'}
                  {...themeStyles.textStyles.sl5}
                >
                  {localRange[0] === domain[0] ? ps(0) : ps(localRange[0])}
                </Text>
                <Text
                  color="text"
                  minW={'150px'}
                  w={'max-content'}
                  border={'0.5px solid #313131 !important'}
                  p={'10px'}
                  pr={'40px'}
                  borderRadius={'5px'}
                  {...themeStyles.textStyles.sl5}
                >
                  {localRange[1] === domain[1] ? ps(900000000) : ps(localRange[1])}
                </Text>
              </Flex>
              <Divider mt="20px" />
            </Box>
          </MenuItem>

          <MenuItem bg="card_bg" closeOnSelect={true} pt={'15px'}>
            <Flex width={'100%'} justify={'flex-end'} align={'center'}>
              <Text
                color="custom_color.contrast"
                bg="custom_color.color"
                onClick={() => onApply(localRange)}
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
