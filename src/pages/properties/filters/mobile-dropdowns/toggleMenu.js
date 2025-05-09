import { Box, Text, HStack } from "@chakra-ui/react";
import ToggleButton from "react-toggle-button";
import { themeStyles } from "../../../../theme";

const trackStyle = {
  height: "12px",
  width: "40px",
  p: '0'
};
const thumbStyle = {
  height: "20px",
  width: "20px",
};

const Toggle = ({ value, onChange, label }) => {
  return (
    <HStack mt='30px' mb='30px' w={"100%"} cursor={"pointer"} alignItems='center' justify={'space-between'}>
      <Text color='text' fontWeight={400} fontSize={'16px'}>{label}</Text>
      <Box my={"8px"}>
        <ToggleButton
          inactiveLabel={""}
          activeLabel={""}
          colors={{
            activeThumb: {
              base: "#009900",
            },
            inactiveThumb: {
              base: "#191919",
            },
            active: {
              base: "#D9D9D9",
            },
            inactive: {
              base: "#D9D9D9",
            },
          }}
          trackStyle={trackStyle}
          thumbStyle={thumbStyle}
          thumbAnimateRange={[0, 20]}
          value={value}
          onToggle={(value) => onChange(!value)}
        />
      </Box>
    </HStack>
  );
};


export default Toggle