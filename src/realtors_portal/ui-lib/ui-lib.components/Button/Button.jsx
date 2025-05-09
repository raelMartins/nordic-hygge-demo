import {Button as ChakraButton} from '@chakra-ui/react';

export const RButton = ({variation, children, hoverEffect = false, tapEffect = false, ...rest}) => {
  switch (variation) {
    case 'primary':
      return (
        <ChakraButton
          bg="#000000"
          w={`max-content`}
          p={`16px 60px`}
          h={`max-content`}
          fontSize={'16px'}
          fontWeight="500"
          lineHeight={`140%`}
          border={'1px solid'}
          borderColor="#000000"
          color="#ffffff"
          transition="ease-in-out 0.3s"
          _hover={{opacity: rest.isDisabled ? 'auto' : '1', scale: hoverEffect ? 1.04 : 1}}
          _active={{opacity: rest.isDisabled ? 'auto' : '1', scale: tapEffect ? 0.9 : 1}}
          _focus={{opacity: rest.isDisabled ? 'auto' : '1'}}
          borderRadius={`full`}
          {...rest}
        >
          {children}
        </ChakraButton>
      );
    case 'secondary':
      return (
        <ChakraButton
          w={`max-content`}
          p={`16px 60px`}
          h={`max-content`}
          fontSize={'16px'}
          fontWeight="500"
          lineHeight={`140%`}
          border={'1px solid'}
          borderColor={`#E4E4E7`}
          color="#000000"
          bg={`transparent`}
          transition="ease-in-out 0.3s"
          _hover={{opacity: rest.isDisabled ? 'auto' : '1', scale: hoverEffect ? 1.04 : 1}}
          _active={{opacity: rest.isDisabled ? 'auto' : '1', scale: tapEffect ? 0.9 : 1}}
          _focus={{opacity: rest.isDisabled ? 'auto' : '1'}}
          borderRadius={`full`}
          {...rest}
        >
          {children}
        </ChakraButton>
      );
    case 'tertiary':
      return (
        <ChakraButton
          w={`max-content`}
          p={`16px 60px`}
          h={`max-content`}
          fontSize={'16px'}
          fontWeight="500"
          lineHeight={`140%`}
          border={'1px solid'}
          color="#000000"
          bg={`transparent`}
          transition="ease-in-out 0.3s"
          _hover={{opacity: rest.isDisabled ? 'auto' : '1', scale: hoverEffect ? 1.04 : 1}}
          _active={{opacity: rest.isDisabled ? 'auto' : '1', scale: tapEffect ? 0.9 : 1}}
          _focus={{opacity: rest.isDisabled ? 'auto' : '1'}}
          borderRadius={`full`}
          {...rest}
        >
          {children}
        </ChakraButton>
      );
    default:
      return (
        <ChakraButton
          borderRadius={`full`}
          bg="transparent"
          fontSize={`16px`}
          fontWeight={500}
          lineHeight={`140%`}
          _hover={{opacity: rest.isDisabled ? 'auto' : '1', scale: hoverEffect ? 1.04 : 1}}
          _active={{opacity: rest.isDisabled ? 'auto' : '1', scale: tapEffect ? 0.9 : 1}}
          _focus={{opacity: rest.isDisabled ? 'auto' : '1'}}
          {...rest}
        >
          {children}
        </ChakraButton>
      );
  }
};
