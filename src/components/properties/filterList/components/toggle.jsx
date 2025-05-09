import {Box, Stack, Text, useDisclosure} from '@chakra-ui/react';
import ToggleButton from 'react-toggle-button';

export const Toggle = ({value, onChange, label}) => {
  const toggle = () => {
    onChange(prev => ({...prev, paymentPlan: !prev.paymentPlan}));
  };
  return (
    <Stack spacing="6px" justify="start">
      <Text fontSize="12px" fontWeight="400" color="matador_text.200">
        {label}
      </Text>

      <Box
        role="button"
        onClick={toggle}
        position="relative"
        bg={value ? 'custom_color.color' : 'matador_form.label'}
        transition="0.5s ease-in-out"
        w="44.87px"
        h="24px"
        borderRadius="full"
        display="flex"
        alignItems="center"
      >
        <Box
          borderRadius="full"
          transition="0.5s ease-in-out"
          w="12px"
          h="12px"
          bg="matador_background.200"
          position="absolute"
          left={value ? 'calc(100% - 19px)' : '7px'}
          top="50%"
          transform={`translateY(-50%)`}
        />
      </Box>
    </Stack>
  );
};
