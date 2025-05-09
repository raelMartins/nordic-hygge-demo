import React from "react";
import {
  Radio,
  RadioGroup as DRadioGroup,
  Text,
  Stack,
  FormControl,
  Flex,
} from "@chakra-ui/react";
import { themeStyles } from "../../../theme";

export const RadioGroup = ({
  lable,
  options,
  value,
  onChange,
  direction,
  ...rest
}) => {
  return (
    <DRadioGroup onChange={onChange} value={value} {...rest} as={FormControl}>
      <Text {...themeStyles.textStyles.sl5} my={"11px"} color={"#919191"}>
        {lable}
      </Text>
      <Stack spacing={5} direction={direction || "row"}>
        {options.map((item, index) => {
          return (
            <Flex flexDir={"column"} key={index}>
              <Radio
                colorScheme={"blackAlpha"}
                value={item?.value}
                key={item?.value}
              >
                {item.lable}
              </Radio>
              {value === item.value && item?.child ? item.child : null}
            </Flex>
          );
        })}
      </Stack>
    </DRadioGroup>
  );
};
