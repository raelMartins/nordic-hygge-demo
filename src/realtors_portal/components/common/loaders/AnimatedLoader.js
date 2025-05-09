import {
  AbsoluteCenter,
  Center,
  Spinner as ChakraSpinner,
  resolveStyleConfig,
} from '@chakra-ui/react';

export const AnimatedLoader = ({...rest}) => {
  return (
    <AbsoluteCenter>
      <ChakraSpinner
        height={`80px`}
        width={`80px`}
        ariaLabel="oval-loading"
        color="#000000"
        speed="0.65s"
        thickness={`3px`}
        h={{base: `50px`, lg: `70px`}}
        w={{base: `50px`, lg: `70px`}}
        {...rest}
      />
    </AbsoluteCenter>
  );
};

export const Spinner = ({noAbsolute, absoluteStyle, size, ...rest}) => {
  return noAbsolute ? (
    <RegularSpinner
      // thickness="10px"
      speed="0.65s"
      // emptyColor="gray.200"
      color="#000000"
      size={size || '300px'}
      h={{base: `50px`, lg: `70px`}}
      w={{base: `50px`, lg: `70px`}}
      {...rest}
      {...resolveStyleConfig}
    />
  ) : (
    <OvalLoader absoluteStyle={absoluteStyle} {...rest} />
  );
};

export const OvalLoader = ({absoluteStyle, ...rest}) => {
  return (
    <AbsoluteCenter {...absoluteStyle}>
      <ChakraSpinner
        height={`80px`}
        width={`80px`}
        ariaLabel="oval-loading"
        color="#000000"
        speed="0.65s"
        thickness={`3px`}
        // emptyColor="gray.200"
        h={{base: `50px`, lg: `70px`}}
        w={{base: `50px`, lg: `70px`}}
        {...rest}
      />
    </AbsoluteCenter>
  );
};
export const RegularSpinner = ({...rest}) => {
  return (
    <Center>
      <ChakraSpinner
        height={`80px`}
        width={`80px`}
        ariaLabel="oval-loading"
        color="#000000"
        speed="0.65s"
        thickness={`3px`}
        h={{base: `50px`, lg: `70px`}}
        w={{base: `50px`, lg: `70px`}}
        {...rest}
      />
    </Center>
  );
};
