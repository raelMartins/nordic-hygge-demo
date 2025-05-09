import {
  InputGroup,
  Input,
  FormControl,
  Text,
  HStack,
  Select,
  Box,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import {MY_COUNTRY} from '@/constants/country';
import {defaultCountries, parseCountry, usePhoneInput} from 'react-international-phone';
import {PhoneNumberUtil} from 'google-libphonenumber';
import {defaultLabelStyling, getFormInputStyles, getInputDropDownStyle} from '.';
import {ErrorTextFadeIn} from './ErrorTextFadeIn';

const phoneUtil = PhoneNumberUtil.getInstance();

export const PhoneInput = ({
  label,
  labelStyles = {},
  leftAddon,
  rightAddon,
  leftAddonStyle,
  rightAddonStyle,
  error,
  group,
  formik,
  value,
  _placeholder = {opacity: 0.8},
  ...rest
}) => {
  const {inputValue, handlePhoneValueChange, inputRef, country, setCountry, phone} = usePhoneInput({
    defaultCountry: MY_COUNTRY,
    value: formik.values.phone,
    disableDialCodeAndPrefix: true,
    disableDialCodePrefill: true,
    countries: defaultCountries,
    onChange: data => {
      handlePhone(data.inputValue);
      formik?.setFieldValue('country', data.country.name);
    },
  });

  const handlePhone = val => {
    function extractNumbers(inputString) {
      const result = inputString.replace(/\D/g, '');
      return result;
    }

    const phonenumber = extractNumbers(val);

    try {
      const parsedNumber = phoneUtil.parse(phone, formik.values.country);
      const isValid = phoneUtil.isValidNumber(parsedNumber);
      if (!isValid) {
        formik?.setFieldError('phone', 'Please enter a valid phone number');
      }
    } catch (error) {
      console.error('Error parsing phone number: ', error.message);
    }

    formik?.setFieldValue('phone', phonenumber);
  };

  const displayDialCode = country => {
    return `+${
      defaultCountries.find(item => {
        return item[0] === country?.name;
      })?.[2] || '1'
    }`;
  };

  const disabled = rest?.isDisabled || rest?.disabled;
  const label_styles = {...defaultLabelStyling, ...labelStyles};
  const input_style = getFormInputStyles(error, rest);
  const dropdown_style = getInputDropDownStyle(error, rest);

  const selected_country = defaultCountries.find(item => {
    return item[0] === country?.name;
  });

  console.log({selected_country});
  console.log({defaultCountries});

  const country_list = [
    ...defaultCountries?.map((item, index) => {
      const country = parseCountry(item);
      return (
        <option key={index} value={country.iso2} style={{color: `black`}}>
          +{`${country.dialCode} ${country.name}`}
        </option>
      );
    }),
  ];
  return (
    <FormControl>
      {label && <Text {...label_styles}>{label}</Text>}
      <HStack w="full" gap={`12px`} cursor={disabled ? `not-allowed` : `auto`}>
        <Box {...input_style} p={`0px`} w="100px" minW="80px" opacity={disabled ? `.4` : `auto`}>
          <HStack pl="12px" w="full" h="full">
            <Text>{displayDialCode(country)}</Text>
          </HStack>
          <Select
            {...dropdown_style}
            name="country"
            onChange={e => {
              setCountry(e.target.value);
            }}
            w="70px"
            required
            id="countryPhoneNumber"
            isDisabled={disabled}
          >
            {country_list}
          </Select>
        </Box>
        <InputGroup borderColor={'matador_border_color.100'} {...group}>
          {leftAddon ? (
            <InputLeftElement ml="0" {...leftAddonStyle}>
              {leftAddon}
            </InputLeftElement>
          ) : null}
          <Input
            {...input_style}
            isInvalid={error}
            _placeholder={{..._placeholder}}
            autoFocus={false}
            ref={inputRef}
            value={inputValue}
            onChange={handlePhoneValueChange}
            {...rest}
          />
          {rightAddon ? (
            <InputRightElement mr="0" {...rightAddonStyle}>
              {rightAddon}
            </InputRightElement>
          ) : null}{' '}
        </InputGroup>
      </HStack>
      <ErrorTextFadeIn error={error} errorSize={rest.errorSize || {base: '10px', md: '14px'}} />
    </FormControl>
  );
};
