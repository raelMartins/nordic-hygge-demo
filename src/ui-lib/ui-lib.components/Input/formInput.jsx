import React from 'react';
import {
  InputGroup,
  Input,
  FormControl,
  Text,
  InputRightElement,
  InputLeftElement,
  HStack,
} from '@chakra-ui/react';
import {defaultLabelStyling, getFormInputStyles} from '.';
import {ErrorTextFadeIn} from './ErrorTextFadeIn';

export const FormInput = ({
  label,
  labelStyles = {},
  leftAddon,
  rightAddon,
  leftAddonStyle,
  rightAddonStyle,
  error,
  group,
  formik,
  _placeholder = {
    color: 'text',
    opacity: `.6`,
  },
  ...rest
}) => {
  const disabled = rest?.isDisabled || rest?.disabled;
  const label_styles = {...defaultLabelStyling, ...labelStyles};
  const input_style = getFormInputStyles(error, rest);

  return (
    <FormControl>
      {label && <Text {...label_styles}>{label}</Text>}

      <HStack w="full" gap={`12px`} cursor={disabled ? `not-allowed` : `auto`}>
        <InputGroup borderColor={'matador_border_color.200'} {...group}>
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
