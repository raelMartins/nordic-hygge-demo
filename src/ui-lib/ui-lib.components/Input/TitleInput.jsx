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
import {defaultLabelStyling, getFormInputStyles, getInputDropDownStyle} from '.';
import {ErrorTextFadeIn} from './ErrorTextFadeIn';

export const TitleInput = ({
  label,
  labelStyles = {},
  leftAddon,
  rightAddon,
  leftAddonStyle,
  rightAddonStyle,
  error,
  group,
  formik,
  _placeholder = {opacity: 0.8},
  ...rest
}) => {
  const [title, setTitle] = useState(
    TITLES?.find(el => el?.gender === formik?.values?.gender)?.text || `Mr`
  );

  const handleTitle = val => {
    const tit_gen = TITLES?.find(el => el?.text === val);
    const gender = tit_gen?.gender;
    setTitle(val);
    formik?.setFieldValue('gender', gender);
  };

  const disabled = rest?.isDisabled || rest?.disabled;
  const label_styles = {...defaultLabelStyling, ...labelStyles};
  const input_style = getFormInputStyles(error, rest);
  const dropdown_style = getInputDropDownStyle(error, rest);

  return (
    <FormControl>
      {label && <Text {...label_styles}>{label}</Text>}
      <HStack w="full" gap={`12px`} cursor={disabled ? `not-allowed` : `auto`}>
        <Box {...input_style} p={`0px`} w="100px" minW="100px" opacity={disabled ? `.4` : `auto`}>
          <HStack pl="12px" w="full" h="full">
            <Text>{title}</Text>
          </HStack>
          <Select
            {...dropdown_style}
            name="gender"
            onChange={e => {
              handleTitle(e.target.value);
            }}
            w="70px"
            required
            id="currencySelect"
            isDisabled={disabled}
          >
            {TITLES.map((item, index) => {
              return (
                <option key={index} value={item?.text} style={{color: `black`}}>
                  {`${item?.text}`}
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
const TITLES = [
  {text: 'Mr.', gender: `male`},
  {text: 'Mrs.', gender: `female`},
  {text: 'Miss.', gender: `female`},
  {text: 'Ms.', gender: `female`},
];
