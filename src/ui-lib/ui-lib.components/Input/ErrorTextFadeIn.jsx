import {SlideFade, Text} from '@chakra-ui/react';

export const ErrorTextFadeIn = ({errorSize, error}) => {
  return (
    <SlideFade in={error} offsetY="10px">
      <Text
        color={`#FF3636`}
        my={{base: '3px', md: '5px'}}
        fontSize={errorSize || {base: '10px', md: '14px'}}
      >
        {error}
      </Text>
    </SlideFade>
  );
};
