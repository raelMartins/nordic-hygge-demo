import {AbsoluteCenter, Center} from '@chakra-ui/react';
import ThreeDots from '@/components/loaders/ThreeDots';

export const Spinner = ({disableAbsoluteCenteredSpinner, absoluteStyle, size, ...rest}) => {
  return disableAbsoluteCenteredSpinner ? (
    <ThreeDots boxSize={{base: `8px`, lg: `16px`}} {...rest} />
  ) : (
    <OvalLoader absoluteStyle={absoluteStyle} {...rest} />
  );
};

export const OvalLoader = ({absoluteStyle, ...rest}) => {
  return (
    <AbsoluteCenter color={`text`} {...absoluteStyle}>
      <ThreeDots boxSize={{base: `8px`, lg: `16px`}} {...rest} />
    </AbsoluteCenter>
  );
};
export const RegularSpinner = ({...rest}) => {
  return (
    <Center color="text">
      <ThreeDots boxSize={{base: `8px`, lg: `16px`}} {...rest} />
    </Center>
  );
};
