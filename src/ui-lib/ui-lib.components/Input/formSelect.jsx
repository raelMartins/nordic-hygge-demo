import React from 'react';
import {
  InputGroup,
  Input,
  FormControl,
  FormLabel,
  Text,
  SlideFade,
  InputRightElement,
  InputLeftElement,
  InputLeftAddon,
  Select,
} from '@chakra-ui/react';
import {themeStyles} from '../../../theme';

export const FormSelect = ({
  label,
  labelStyles = {},
  value,
  options,
  leftAddon,
  rightAddon,
  error,
  placeholder,
  ...rest
}) => {
  return (
    <FormControl {...themeStyles.textStyles.sl5}>
      {label && (
        <Text
          fontSize={'13px'}
          color="matador_form.label"
          fontWeight={500}
          mb={`6px`}
          {...labelStyles}
        >
          {label}
        </Text>
      )}
      <InputGroup borderColor={'text'}>
        {leftAddon ? <InputLeftElement ml="2">{leftAddon}</InputLeftElement> : null}
        <Select
          borderRadius={0}
          color="text"
          h={'44px'}
          fontSize={'13px'}
          value={value}
          isInvalid={error}
          _focus={{
            border: `0.5px solid`,
            // borderColor: error ? 'red !important' : `text !important`,
            borderColor: error ? 'red !important' : `${rest.borderColor} !important`,
          }}
          _hover={{
            border: `0.5px solid`,
            // borderColor: error ? 'red !important' : `text !important`,
            borderColor: error ? 'red !important' : `${rest.borderColor} !important`,
          }}
          _focusVisible={{
            border: `0.5px solid`,
            // borderColor: error ? 'red !important' : `text !important`,
            borderColor: error ? 'red !important' : `${rest.borderColor} !important`,
          }}
          fontWeight={500}
          {...rest}
        >
          <option selected hidden disabled value="">
            {placeholder}
          </option>
          {(options || []).map(option => (
            <option value={option} key={option} selected={value === option ? 'selected' : ``}>
              {option}
            </option>
          ))}
        </Select>
        {rightAddon ? <InputRightElement>{rightAddon}</InputRightElement> : null}
      </InputGroup>
      <SlideFade in={error} offsetY="10px">
        <Text color={themeStyles.color.matador__red} my={'5px'} fontSize={'14px'}>
          {error}
        </Text>
      </SlideFade>
    </FormControl>
  );
};
