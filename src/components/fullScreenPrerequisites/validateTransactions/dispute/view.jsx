import {Text, Textarea, Stack, Flex} from '@chakra-ui/react';
import {Button} from '@/ui-lib';

export const DisputeValidationView = ({
  handleDispute,
  changeScreen,
  message,
  isLoading,
  setMessage,
}) => {
  return (
    <Stack
      w={{base: `100%`, lg: `412px`}}
      bg={`matador_background.200`}
      maxH={`600px`}
      p={{base: `24px`}}
      position={`relative`}
      boxShadow={`0px 7.92px 7.92px -3.96px rgba(16, 24, 40, 0.03), 0px 19.8px 23.76px -3.96px rgba(16, 24, 40, 0.08)`}
    >
      <Flex direction="column" h={`100%`} overflowY={`auto`} flex={`1`} gap={`5px`} px={`4px`}>
        <Text
          className="heading-text-regular"
          fontWeight={`600`}
          fontSize={'20px'}
          color={'text'}
          lineHeight={`140%`}
          letterSpacing={`0%`}
        >
          Raise a Concern
        </Text>
        <Text
          fontWeight={`400`}
          fontSize={`13.39px`}
          lineHeight={`150%`}
          letterSpacing={`2%`}
          opacity={`.8`}
          color={`matador_text.400`}
        >
          Tell us what doesn’t look right.
        </Text>

        <Textarea
          onChange={e => setMessage(e.target.value)}
          value={message}
          resize="none"
          border="0.5px solid"
          borderColor={`matador_border_color.100 !important`}
          bg={`matador_background.100`}
          borderRadius={'2px'}
          color={`text`}
          w="full"
          h="163px"
        />
      </Flex>
      <Flex direction={`column`} gap={`8px`} pt={`20px`} position={`sticky`} bottom={`0px`}>
        <Button
          fontSize="16px"
          fontWeight="500"
          bg="custom_color.color"
          color="custom_color.contrast"
          onClick={handleDispute}
          className={`tertiary-text`}
          lineHeight={`140%`}
          letterSpacing={`1%`}
          p={`12.5px`}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          Submit
        </Button>
        <Button
          color="#DD4449"
          fontSize="16px"
          fontWeight="500"
          bg="matador_background.100"
          className={`tertiary-text`}
          lineHeight={`140%`}
          letterSpacing={`1%`}
          p={`12.5px`}
          border={`1px solid`}
          borderColor={`matador_border_color.100`}
          onClick={() => changeScreen(`summary`)}
        >
          No, Go Back
        </Button>
      </Flex>
    </Stack>
  );
};
