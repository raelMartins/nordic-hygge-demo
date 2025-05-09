import {Box, Button as ChakraButton, Text} from '@chakra-ui/react';
import {motion} from 'framer-motion';

export const Button = ({variation, children, boxStyle, ...rest}) => {
  switch (variation) {
    case 'primary':
      return (
        <Box
          bg="custom_color.color"
          p={`4px`}
          as={motion.button}
          whileTap={{scale: 0.9}}
          whileHover={{scale: 1.04}}
          opacity={rest.isDisabled ? `.5` : `auto`}
          _hover={{opacity: rest.isDisabled ? 'auto' : '1'}}
          _active={{opacity: rest.isDisabled ? 'auto' : '1'}}
          _focus={{opacity: rest.isDisabled ? 'auto' : '1'}}
          transition="ease-in-out 0.3s"
          style={boxStyle}
        >
          <ChakraButton
            bg="custom_color.color"
            w={`100%`}
            p={`14px`}
            h={`max-content`}
            fontSize={'16px'}
            fontWeight="400"
            border={'1px solid'}
            borderColor="custom_color.contrast"
            color="custom_color.contrast"
            transition="ease-in-out 0.3s"
            _hover={{opacity: rest.isDisabled ? 'auto' : '1'}}
            _active={{opacity: rest.isDisabled ? 'auto' : '1'}}
            _focus={{opacity: rest.isDisabled ? 'auto' : '1'}}
            borderRadius={0}
            // letterSpacing={'4px'}
            textTransform={'uppercase'}
            {...rest}
          >
            {children}
          </ChakraButton>
        </Box>
      );
    case 'secondary':
      return (
        <ChakraButton
          w={`100%`}
          p={`14px`}
          h={`max-content`}
          fontSize={'16px'}
          fontWeight="400"
          border={'1px solid'}
          color="custom_color.color"
          bg={`custom_color.background`}
          transition="ease-in-out 0.3s"
          _hover={{opacity: rest.isDisabled ? 'auto' : '1'}}
          _active={{opacity: rest.isDisabled ? 'auto' : '1'}}
          _focus={{opacity: rest.isDisabled ? 'auto' : '1'}}
          borderRadius={0}
          // letterSpacing={'4px'}
          textTransform={'uppercase'}
          as={motion.button}
          whileTap={{scale: 0.9}}
          whileHover={{scale: 1.04}}
          {...rest}
        >
          {children}
        </ChakraButton>
      );
    default:
      return (
        <ChakraButton
          borderRadius={0}
          fontWeight={500}
          as={motion.button}
          whileTap={{scale: 0.9}}
          whileHover={{scale: 1.04}}
          _hover={{opacity: rest.isDisabled ? 'auto' : '1'}}
          _active={{opacity: rest.isDisabled ? 'auto' : '1'}}
          _focus={{opacity: rest.isDisabled ? 'auto' : '1'}}
          {...rest}
        >
          {children}
        </ChakraButton>
      );
  }
};
