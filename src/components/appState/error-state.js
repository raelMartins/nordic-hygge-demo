import {Image, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import empty from '../../images/icons/empty-icon.svg';
import {appCurrentTheme} from '@/utils/localStorage';
import {LIGHT} from '@/constants/names';

const ErrorState = ({text, height, ...rest}) => {
  return (
    <VStack
      h={height || '450px'}
      borderRadius="5px"
      w="full"
      justify="center"
      my="13px"
      mb="24px"
      {...rest}
    >
      <VStack>
        <Image
          w="152px"
          h="118px"
          src={empty.src}
          alt="notification empty state"
          filter={appCurrentTheme !== LIGHT ? `invert(1)` : ``}
        />
        <Text pt={4} fontWeight="600" color="matador_form.label" fontSize="16px" textAlign="center">
          {text || 'An error occurred'}
        </Text>
      </VStack>
    </VStack>
  );
};

export default ErrorState;
