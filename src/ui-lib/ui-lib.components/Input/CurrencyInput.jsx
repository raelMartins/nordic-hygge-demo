import {useState} from 'react';
import {
  InputGroup,
  Input,
  FormControl,
  Text,
  InputRightElement,
  InputLeftElement,
  HStack,
  Select,
  Box,
} from '@chakra-ui/react';
import countries, {MY_COUNTRY} from '@/constants/country';
import {defaultLabelStyling, getFormInputStyles, getInputDropDownStyle} from '.';
import {ErrorTextFadeIn} from './ErrorTextFadeIn';

export const CurrencyInput = ({
  label,
  labelStyles = {},
  leftAddon,
  rightAddon,
  leftAddonStyle,
  rightAddonStyle,
  error,
  group,
  formik,
  selectedCurrency,
  changeCurrency,
  _placeholder = {opacity: 0.8},
  ...rest
}) => {
  const [currency, setCurrency] = useState(selectedCurrency || MY_COUNTRY?.abbreviation);

  const handleCurrency = val => {
    changeCurrency(val);
    setCurrency(val);
  };

  const disabled = rest?.isDisabled || rest?.disabled;
  const label_styles = {...defaultLabelStyling, ...labelStyles};
  const input_style = getFormInputStyles(error, rest);
  const dropdown_style = getInputDropDownStyle(error, rest);

  return (
    <FormControl>
      {label && <Text {...label_styles}>{label}</Text>}
      <HStack w="full" gap={`12px`} cursor={disabled ? `not-allowed` : `auto`}>
        <Box {...input_style} p={`0px`} w="70px" minW="70px" opacity={disabled ? `.4` : `auto`}>
          <HStack pl="12px" w="full" h="full">
            <Text>{currency}</Text>
          </HStack>
          <Select
            {...dropdown_style}
            name="currency"
            onChange={e => {
              handleCurrency(e.target.value);
            }}
            w="65px"
            required
            id="currencySelect"
            isDisabled={disabled}
            value={currency}
          >
            {countries?.map((item, index) => {
              return (
                <option key={index} value={item.abbreviation} style={{color: `black`}}>
                  {`${item.abbreviation}`}
                </option>
              );
            })}
          </Select>
        </Box>
        <InputGroup borderColor={'matador_border_color.100'} {...group}>
          {leftAddon ? (
            <InputLeftElement ml="0" {...leftAddonStyle}>
              {leftAddon}
            </InputLeftElement>
          ) : null}
          <Input {...input_style} isInvalid={error} _placeholder={{..._placeholder}} {...rest} />
          {rightAddon ? (
            <InputRightElement mr="0" {...rightAddonStyle}>
              {rightAddon}
            </InputRightElement>
          ) : null}
        </InputGroup>
      </HStack>
      <ErrorTextFadeIn error={error} errorSize={rest.errorSize || {base: '10px', md: '14px'}} />
    </FormControl>
  );
};
