import React, {useEffect, useState} from 'react';
import {
  ModalContent,
  Box,
  ModalBody,
  VStack,
  Image,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Center,
  Stack,
} from '@chakra-ui/react';
import {CloseIcon} from '@chakra-ui/icons';
import stack from '@/images/payment-plan-img.svg';
import rhombus from '@/images/outright-purchase-img.svg';
import isMobile from '@/utils/extras';
import {Button, CustomizableButton} from '@/ui-lib';
import {useRouter} from 'next/router';

export const DisclosureContent = ({
  go_back,
  isFractionalDetailLoading,
  setStep,
  fractionalData,
}) => {
  const router = useRouter();

  return (
    <Stack maxW={{base: `430px`}} gap={`22px`} h={`100%`} flex={`1`}>
      <Flex w="full" justify="space-between" align="center">
        <Text
          // color="matador_text.100"
          fontSize={{base: '23px', md: '33px'}}
          fontWeight={400}
          className="heading-text-regular"
        >
          Fractional Disclosure
        </Text>
        <Center p="8px">
          <CloseIcon
            // color="text"
            cursor={'pointer'}
            // onClick={fractionalModal?.onClose}
            onClick={go_back}
            fontSize={'12px'}
          />
        </Center>
      </Flex>

      <Text fontSize="16px" fontWeight={400} flex={`1`}>
        Fractional ownership is illiquid outside of our platform. For a comprehensive explanation of
        the conditions, restrictions, and limitations associated with fractional ownership, please
        refer to our terms of service on fractional ownership.
      </Text>

      <Flex justify="center" align="center" gap="20px" mt="20px">
        <Box flex={`1`}>
          <Button
            border="1px solid !important"
            color="custom_color.dark_background_pop"
            borderColor="custom_color.dark_background_pop"
            bg="transparent"
            w="100%"
            minWidth={`max-content`}
            // onClick={fractionalModal?.onClose}
            onClick={go_back}
            textTransform={`uppercase`}
          >
            Cancel
          </Button>
        </Box>
        <Button
          variation={`primary`}
          boxStyle={{flex: `1`}}
          p={`5px 11px`}
          isDisabled={isFractionalDetailLoading}
          onClick={() => setStep('price')}
          fontSize={`16px`}
          fontWeight={`600`}
          lineHeight={`140%`} /* 22.4px */
          letterSpacing={`0.48px`}
          textTransform={`uppercase`}
        >
          Proceed
        </Button>
      </Flex>
    </Stack>
  );
};

const Disclosure = ({
  onCloseModal,
  fractionalData,
  setFullPayment,
  setStep,
  isFractionalDetailLoading,
  fractionalModal,
  fullPayment,
  change_screen,
}) => {
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  const mainContent = (
    <Box w="full">
      <Flex w="full" justify="space-between" align="center">
        <Text
          color="matador_text.100"
          fontSize={{base: '23px', md: '33px'}}
          fontWeight={400}
          className="heading-text-regular"
        >
          Fractional Disclosure
        </Text>
        <Center p="8px">
          <CloseIcon
            color="text"
            cursor={'pointer'}
            onClick={fractionalModal?.onClose}
            fontSize={'12px'}
          />
        </Center>
      </Flex>

      <Text fontSize="16px" fontWeight={400} mt="22px" color={'matador_text.500'}>
        Fractional ownership is illiquid outside of our platform. For a comprehensive explanation of
        the conditions, restrictions, and limitations associated with fractional ownership, please
        refer to our terms of service on fractional ownership.
      </Text>

      <Flex justify="center" align="center" gap="20px" mt="42px">
        <CustomizableButton
          border="1px solid !important"
          color="custom_color.color"
          borderColor="custom_color.color"
          bg="custom_color.background"
          h="49px"
          w="302px"
          onClick={fractionalModal?.onClose}
        >
          Cancel
        </CustomizableButton>
        <Button
          isDisabled={isFractionalDetailLoading}
          onClick={() => setStep('price')}
          color="custom_color.contrast"
          bg="custom_color.color"
          h="49px"
          w="302px"
        >
          Accept & Continue
        </Button>
      </Flex>
    </Box>
  );

  return (
    <>
      {screenWidth < 768 ? (
        <Drawer
          autoFocus={false}
          onCloseComplete={onCloseModal}
          isCentered
          onClose={fractionalModal?.onClose}
          isOpen={fractionalModal?.isOpen}
          placement="bottom"
        >
          <DrawerOverlay />
          <DrawerContent
            bg="card_bg"
            color={`text`}
            maxW="716px"
            pt={{base: '20px', md: '35px'}}
            pb={{base: '40px', md: '50px'}}
            px={{base: '12px', md: '37px'}}
            // borderTopRadius={{base: '10px', md: '16px'}}
          >
            <DrawerBody px="0">{mainContent}</DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          autoFocus={false}
          onCloseComplete={onCloseModal}
          isCentered
          onClose={fractionalModal?.onClose}
          isOpen={fractionalModal?.isOpen}
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            color={`text`}
            w="full"
            maxW="716px"
            py={{base: '20px', md: '35px'}}
            px={{base: '12px', md: '37px'}}
            borderRadius={0}
          >
            {mainContent}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Disclosure;
