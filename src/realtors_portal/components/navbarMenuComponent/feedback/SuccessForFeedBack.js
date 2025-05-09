import React from 'react';
import successicon from '/src/realtors_portal/images/icons/successgiDarkMode.gif';
import {Button, Image, Text, VStack} from '@chakra-ui/react';

export const SuccessForFeedBack = ({handleClose}) => {
  return (
    <VStack
      px="22.94px"
      justify="center"
      mt="19.43%"
      border="0.756px solid #1A1D24"
      bg="#0D0D0D"
      minH="377.32px"
      spacing="21.48px"
    >
      <Image src={successicon.src} alt="successIcon" boxSize="113.42px" />
      <Text fontSize="18.147px" fontWeight="600" color="#fff">
        Thank you for your feedback
      </Text>
      <Button
        _hover={{opacity: '1'}}
        fontSize="12.098px"
        fontWeight="400"
        color="#0D0D0D"
        border="0.756px solid #FFF"
        borderRadius="3.781px"
        w="full"
        bg="#fff"
        onClick={handleClose}
      >
        Ok
      </Button>
    </VStack>
  );
};

export default SuccessForFeedBack;
