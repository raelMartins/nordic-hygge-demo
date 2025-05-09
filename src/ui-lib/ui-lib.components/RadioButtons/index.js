import React from "react";
import { Box, Text, useRadio } from "@chakra-ui/react";

export const RadioButtons = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        fontWeight={"300"}
        color={"rgba(255, 255, 255, 0.4)"}
        bg="transparent"
        border="none"
        fontSize="24px"
        boxShadow="none"
        // _checked={{
        //   bg: "transparent",
        //   color: "#FFFFFF",
        //   fontWeight: "600",
        //   fontSize: "27px",
        //   borderTop: "2px solid #FFFFFF !important",
        //   borderBottom: "2px solid #FFFFFF !important",
        // }}
        _focus={{
          boxShadow: "none",
          outline: "none",
        }}
        // px={3}

        w="full"
        // w="121px"
        alignItems="center"
        display="flex"
        flexDirection="column"
        gap="10px"
      >
        <Box
          {...checkbox}
          _checked={{
            bg: "transparent",
            color: "#FFFFFF",
            fontWeight: "600",
            fontSize: "27px",
            // borderTop: "2px solid #FFFFFF !important",
            // bg: "#fff",
            borderColor: "#fff !important",
            // borderBottom: "2px solid #FFFFFF !important",
          }}
          //   h="2px"
          border="2px solid transparent !important"
          w="121px"
          bg="transparent"
        ></Box>
        <Text
          {...checkbox}
          _checked={{
            color: "#FFFFFF",
            fontWeight: "600",
            fontSize: "27px",
          }}
          transition="0.3s ease-in-out"
          whiteSpace="nowrap"
          //   textAlign="center"

          //   lineHeight="52px"
          w="fit-content"
          wordBreak="keep-all"
        >
          {props.children}
        </Text>
        <Box
          {...checkbox}
          _checked={{
            bg: "transparent",
            color: "#FFFFFF",
            fontWeight: "600",
            fontSize: "27px",
            // borderTop: "2px solid #FFFFFF !important",
            // borderBottom: "2px solid #FFFFFF !important",
            // bg: "#fff",
            borderColor: "#fff !important",
          }}
          border="2px solid transparent !important"
          w="121px"
          bg="transparent"
        ></Box>
      </Box>
    </Box>
  );
};
