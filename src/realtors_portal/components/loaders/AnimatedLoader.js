import isMobile from '@/utils/extras';
import {
  AbsoluteCenter,
  Center,
  Spinner as ChakraSpinner,
  resolveStyleConfig,
} from '@chakra-ui/react';
import {Oval} from 'react-loader-spinner';

export const AnimatedLoader = ({...rest}) => {
  return (
    <AbsoluteCenter>
      <Oval
        height={isMobile ? `50px` : `70px`}
        width={isMobile ? `50px` : `70px`}
        ariaLabel="oval-loading"
        color="#333333"
        secondaryColor={`a3a3a3`}
        speed="0.65s"
        thickness={`3px`}
        strokeWidth={3}
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
      color="#333333"
      secondaryColor={`a3a3a3`}
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
      <Oval
        height={isMobile ? `50px` : `70px`}
        width={isMobile ? `50px` : `70px`}
        ariaLabel="oval-loading"
        color="#333333"
        secondaryColor={`a3a3a3`}
        speed="0.65s"
        thickness={`3px`}
        strokeWidth={3}
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
      <Oval
        height={isMobile ? `50px` : `70px`}
        width={isMobile ? `50px` : `70px`}
        ariaLabel="oval-loading"
        color="#333333"
        secondaryColor={`a3a3a3`}
        speed="0.65s"
        thickness={`3px`}
        strokeWidth={3}
        h={{base: `50px`, lg: `70px`}}
        w={{base: `50px`, lg: `70px`}}
        {...rest}
      />
    </Center>
  );
};
