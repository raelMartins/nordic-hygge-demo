import React from "react";
import {
  InputGroup,
  Textarea,
  FormControl,
  Text,
  SlideFade,
  InputRightElement,
} from "@chakra-ui/react";
import { themeStyles } from "../../../theme";

export const FormTextarea = ({ label, rightAddon, error, ...rest }) => {
  return (
    <FormControl {...themeStyles.textStyles.sl5}>
      <Text fontSize={{ base: '11px', md: '13px' }} color='text' fontWeight={{ base: '400', md: '400' }} mb={"7px"}>
        {label}
      </Text>
      <InputGroup borderColor={"text"}>
        <Textarea
          color='text'
          h={"44px"}
          fontSize={"18px"}
          {...rest}
          isInvalid={error}
          _focus={{ border: error ? "0.5px solid red !important" : `0.5px solid #747474 !important`, }}
          _hover={{ border: error ? "0.5px solid red !important" : `0.5px solid #747474 !important`, }}
          _focusVisible={{ border: error ? "0.5px red solid !important" : `0.5px solid #747474 !important`, }}
        />
        {rightAddon ? (
          <InputRightElement>
            {rightAddon}
          </InputRightElement>
        ) : null}
      </InputGroup>
      <SlideFade in={error} offsetY="10px">
        <Text
          color={themeStyles.color.matador__red}
          my={"5px"}
          fontSize={"14px"}
        >
          {error}
        </Text>
      </SlideFade>
    </FormControl>
  );
};
