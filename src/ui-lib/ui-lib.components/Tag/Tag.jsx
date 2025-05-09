import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { themeStyles } from "../../../theme";

const sharedProps = {
  borderRadius: "48px",
  px: "10px",
  py: "4px",
  w: "max-content",
  h: "max-content",
};

export const CustomisedTag = ({ variant, label, fontSize, icon, ...rest }) => {
  switch (variant) {
    case "green":
      return (
        <Box {...sharedProps} color={"#08C38F"} bg={"#DBFFF5"} {...rest}>
          <Text {...themeStyles.textStyles.sl6} fontSize={fontSize}>
            {label}
          </Text>
        </Box>
      );

    case "red":
      return (
        <Box {...sharedProps} color={"#FF3636"} bg={"#FFDDDD"} {...rest}>
          <Text {...themeStyles.textStyles.sl6} fontSize={fontSize}>
            {label}
          </Text>
        </Box>
      );

    case "blue":
      return (
        <Box {...sharedProps} color={"#5451FF"} bg={"#E4EFFF"} {...rest}>
          <Text {...themeStyles.textStyles.sl6} fontSize={fontSize}>
            {label}
          </Text>
        </Box>
      );

    case "orange":
      return (
        <Box {...sharedProps} color={"#FF9103"} bg={"#FFF7DB"} {...rest}>
          <Text {...themeStyles.textStyles.sl6} fontSize={fontSize}>
            {label}{" "}
          </Text>
        </Box>
      );
    case "gray":
      return (
        <Flex
          {...sharedProps}
          color={"#606060"}
          bg={"#F5F5F5"}
          {...rest}
          gap={"8px"}
          align={"center"}
        >
          {icon && <Image src={icon} size={"24px"} alt={"icon"} />}
          <Text {...themeStyles.textStyles.sl6} fontSize={fontSize}>
            {label}
          </Text>
        </Flex>
      );

    default:
      return (
        <Box {...sharedProps} color={"#5451FF"} bg={"#F5F5F5"} {...rest}>
          <Text {...themeStyles.textStyles.sl6} fontSize={fontSize}>
            {label}
          </Text>
        </Box>
      );
  }
};
