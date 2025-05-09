import { Box, Text, Flex } from "@chakra-ui/react";
import ToggleButton from "react-toggle-button";
import { themeStyles } from "../../../theme";
import { color } from "../../../theme/colors";

const trackStyle = {
  height: "26px",
  width: "50px",
  p: '0'
  // boxShadow: "-1px 1px 10px 0px #0000001A",
};
const thumbStyle = {
  height: "10px",
  width: "10px",
};

export const Toggle = ({ maxW, value, onChange, label }) => {
  return (
    <Flex w={"100%"} maxW={maxW} mx={"10px"} cursor={"pointer"} justify='space-between' align='flex-start' direction={'column'}>
      <Text fontSize='13px' fontWeight='500' fontFamily='Roboto'>{label}</Text>
      <Box my={"8px"}>
        <ToggleButton
          inactiveLabel={""}
          activeLabel={""}
          colors={{
            activeThumb: {
              base: '#fff',
            },
            inactiveThumb: {
              base: "#191919",
            },
            active: {
              base: color.primary,
            },
            inactive: {
              base: color.primary,
            },
          }}
          trackStyle={trackStyle}
          thumbStyle={thumbStyle}
          thumbAnimateRange={[10, 30]}
          value={value}
          onToggle={(value) => onChange(!value)}
        />
      </Box>
    </Flex>
  );
};
