import { Stack, Text } from "@chakra-ui/react";

const Attribute = ({ lable, value, ...rest }) => {

  return (
    <Stack spacing={{ base: '0px', md: "15px" }} {...rest}>
      <Text
        minW={"110px"} color={"text"}
        fontSize={{ base: '13px', md: '16px' }}
        fontWeight={400}
      >
        {lable}
      </Text>
      <Text color='text' fontSize={{ base: '12px', md: '18px' }} fontWeight={500}>
        {value}
      </Text>
    </Stack>
  );
};


export default Attribute