import { Box, Text } from "@chakra-ui/react";
import { themeStyles } from "../../theme";
import { CustomisedTag } from "../../ui-lib/ui-lib.components";

export const Attribute = ({ label, value, labelSize, valueSize, ...rest }) => (
  <Box my={"5px"} {...rest} overflow={'hidden'}>
    <Text
      color='white'
      {...themeStyles.textStyles.sb4}
      fontSize={valueSize || "24px"}
      w={"max-content"}
    >
      {label}
    </Text>
    <Text
      whiteSpace={'nowrap'}
      w='100%'
      overflow='hidden'
      textOverflow={'ellipsis'}
      {...themeStyles.textStyles.sl5}
      color={"white"}
      mt={"9px"}
      fontSize={labelSize}
    >
      {value}
    </Text>
  </Box>
);

export const AttributeTag = ({ label, tag }) => (
  <Box my={"5px"}>
    <Text {...themeStyles.textStyles.sl6} color={"#606060"} my={"4px"}>
      {label}
    </Text>
    {tag == 0 ? (
      <CustomisedTag label={"Sold Out"} variant="gray" my={"4px"} />
    ) : (
      <CustomisedTag
        label={tag == 1 ? `${tag} Unit ` : `${tag} units`}
        variant={tag < 5 ? "red" : "blue"}
        my={"4px"}
      />
    )}
  </Box>
);

export const UnitAttribute = ({ label, value, ...rest }) => (
  <Box my={"8px"} {...rest}>
    <Text
      fontSize={"18px"}
      {...themeStyles.textStyles.sl4}
      color='white'
      my={"2px"}>
      {label}
    </Text>
    <Text
      {...themeStyles.textStyles.sl6}
      color={"#606060"}
      my={"3px"}>
      {value}
    </Text>
  </Box>
);
