import {
  Box,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Button as OkButton,
  Text,
  VStack,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import successIcon from '/src/realtors_portal/images/icons/check-icon-unscreen.gif';

const RequestSuccess = ({isOpen, onClose}) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);
  return screenWidth >= 768 ? (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent fontFamily="Euclid Circular B ">
        <ModalBody p="1rem">
          <VStack>
            <Image
              mb="23px"
              src={successIcon.src}
              objectFit="cover"
              alt="commission request successful image"
            />

            <Text pb="54px" fontSize="24px" fontWeight="600" as="h1">
              Commission Request Successful
            </Text>
            <HStack
              borderRadius="12px"
              h="55px"
              color="white"
              w="full"
              cursor="pointer"
              py="16px"
              justify="center"
              bg="#4545FE"
              onClick={onClose}
            >
              <Text color="#Ffffff" fontSize="18px" fontWeight="400">
                Ok
              </Text>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  ) : (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
      <DrawerOverlay />
      <DrawerContent fontFamily="Euclid Circular B " maxH="95vh" borderRadius="16px 16px 0px 0px">
        <DrawerBody p="1rem">
          <VStack>
            <Image
              mb="23px"
              src={successIcon.src}
              objectFit="cover"
              alt="commission request successful image"
            />

            <Text pb="54px" fontSize="24px" fontWeight="600" as="h1">
              Commission Request Successful
            </Text>
            <HStack
              borderRadius="12px"
              h="55px"
              color="white"
              w="full"
              cursor="pointer"
              py="16px"
              justify="center"
              bg="#4545FE"
              onClick={onClose}
            >
              <Text color="#Ffffff" fontSize="18px" fontWeight="400">
                Ok
              </Text>
            </HStack>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default RequestSuccess;
