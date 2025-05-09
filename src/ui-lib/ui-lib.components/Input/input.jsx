import React from "react";
import {
  InputGroup,
  InputRightElement,
  InputRightAddon,
  Input as ChakraInput,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { themeStyles } from "/src/theme";

export const Input = ({
  label,
  message,
  isError,
  rightAddon,
  lableStyle,
  onChange,
  value,
  maxLength,
  messageColor,
  placeholder,
  ...rest
}) => {
  return (
    <FormControl isInvalid={isError} {...themeStyles.textStyles.l6}>
      <FormLabel {...lableStyle} {...themeStyles.textStyles.sl5}>
        {label}
      </FormLabel>
      <InputGroup
        border={"1px solid #A4A4A4"}
        borderRadius={"5px"}
        borderColor={
          value && message
            ? isError
              ? themeStyles.color.matador__red
              : themeStyles.color.matador__green
            : "A4A4A4"
        }
        color={"#141414"}
        bg={themeStyles.color.matador__white}
        {...rest}
      >
        <ChakraInput
          p={"10px"}
          pl={"18px"}
          h={"100%"}
          border={"none !important"}
          value={value}
          isInvalid={false}
          _focus={{ visible: { border: "none" } }}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || label}
          maxLength={maxLength}
        />
        {rightAddon ? (
          <InputRightAddon
            w={"max-content"}
            h={"100%"}
            p={"10px"}
            border={"none"}
            borderRadius={"0px 5px 5px 0px"}
            bg={themeStyles.color.matador__grey}
          >
            <Text>{rightAddon} </Text>
          </InputRightAddon>
        ) : null}
      </InputGroup>

      {!isError ? (
        <FormHelperText
          color={messageColor || themeStyles.color.matador__green}
        >
          {message}
        </FormHelperText>
      ) : (
        <FormErrorMessage color={themeStyles.color.matador__red}>
          {message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
