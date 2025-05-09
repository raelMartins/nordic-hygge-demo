import {Box, Stack, Text} from '@chakra-ui/react';

export const ToastTemplate = ({title, description}) => {
  return (
    <Box bg={`#000000`} color={`#ffffff`} p={`30px`} borderRadius={`5px`} className="tertiary-text">
      <Stack gap={`8px`}>
        {title && (
          <Text fontWeight={`600`} fontSize={`16px`} lineHeight={`100%`} letterSpacing={`0%`}>
            {title}
          </Text>
        )}
        {description && (
          <Text fontWeight={`400`} fontSize={`13px`} lineHeight={`150%`} letterSpacing={`2%`}>
            {description}
          </Text>
        )}
      </Stack>
    </Box>
  );
};
