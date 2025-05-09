import React from 'react';
import {Stack, Box, Image} from '@chakra-ui/react';
import {CheckIcon} from '@chakra-ui/icons';

export const Checkbox = ({isChecked, onClick, children}) => {
  return (
    <Stack gap={'5px'} direction="row">
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        h={'23px !important'}
        w={'43px !important'}
        bgPosition={'center'}
        bgSize={'cover'}
        onClick={onClick}
        border={'0.5px solid'}
        borderColor={'custom_color.color'}
        borderRadius={'5px'}
        bg={isChecked ? 'custom_color.color' : null}
      >
        <CheckIcon color={isChecked ? 'text' : 'custom_color.color'} />
      </Box>
      {children}
    </Stack>
  );
};

export const Checkbox2 = ({isChecked, onClick, background, children}) => {
  return (
    <Stack gap={'8px'} direction="row">
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        h={'24px !important'}
        w={'24px !important'}
        minW={'24px !important'}
        bgPosition={'center'}
        bgSize={'cover'}
        onClick={onClick}
        border={'1px solid'}
        borderColor={isChecked ? 'custom_color.color' : 'matador_border_color.100'}
        borderRadius={'0px'}
        // bg={isChecked ? 'custom_color.color' : null}
        bg={isChecked ? 'custom_color.color' : background ? background : `transparent`}
        cursor={`pointer`}
      >
        {/* <CheckIcon color={isChecked ? 'text' : 'custom_color.color'} /> */}
        <CheckIcon color={isChecked ? 'custom_color.contrast' : 'transparent'} />
      </Box>
      {children}
    </Stack>
  );
};
