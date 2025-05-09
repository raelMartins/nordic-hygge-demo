import React from 'react';
import {Stack, Box, Image, Center} from '@chakra-ui/react';

export const Radio = ({isActive, onClick, children, ...rest}) => {
  return (
    <Stack gap={'6px'} direction="row" onClick={onClick} {...rest}>
      <Center
        h={'24px !important'}
        w={'24px !important'}
        minW={'24px !important'}
        border={isActive ? '1px solid' : `1px solid`}
        borderColor={isActive ? 'custom_color.color_pop' : 'matador_text.300'}
        borderRadius={'50%'}
        bg={`transparent`}
        cursor={`pointer`}
      >
        <Center
          bg={isActive ? 'custom_color.color_pop' : `transparent`}
          h={'10px !important'}
          w={'10px !important'}
          minW={'10px !important'}
          borderRadius={'50%'}
        ></Center>
      </Center>
      {children}
    </Stack>
  );
};
