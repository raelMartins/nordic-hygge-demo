import {HStack, Image, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import empty from '/src/images/icons/empty-icon.svg';

const EmptyStateForFlter = ({handleReset, height}) => {
  return (
    <VStack h={height || '250px'} w="full" justify="center" my="13px" mb="24px">
      <VStack spacing="12px">
        <Text
          className="heading-text-regular"
          pt={4}
          fontWeight="500"
          color="matador_text.100"
          fontSize="16px"
          textAlign="center"
        >
          NOTHING FOUND
        </Text>

        <Text fontWeight="400" color="matador_form.label" fontSize="12px" textAlign="center">
          Oops, it seems we couldn&apos;t locate what you were searching for.
        </Text>
        <HStack
          p="12px 20px"
          border="1px solid"
          bg="matador_background.200"
          borderColor="matador_border_color.100"
          onClick={handleReset}
          role="button"
        >
          <Text
            className="heading-text-regular"
            color="matador_text.100"
            fontSize="12px"
            fontWeight="400"
          >
            RESET FILTER
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default EmptyStateForFlter;
