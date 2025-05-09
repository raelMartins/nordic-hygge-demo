import {Button} from '@/ui-lib';
import {Flex, Modal, ModalBody, ModalContent, ModalOverlay, Text, VStack} from '@chakra-ui/react';
import {CheckSVG} from './assets';

export const ConfirmPopup = ({
  disclosure,
  proceedAction,
  isLoading,
  text,
  proceedText = `Yes, Proceed`,
  cancelText = `No, Go Back`,
}) => {
  return (
    <Modal isOpen={disclosure.isOpen} onClose={disclosure?.onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        maxW={{base: `90%`, lg: `600px`}}
        bg={`matador_background.200`}
        color={`text`}
        className="supplementary-font"
      >
        <ModalBody p={`24px`}>
          <VStack flex={`1`} justify={`center`} gap={`6px`} textAlign={`center`}>
            <CheckSVG boxSize={{base: `52px`, lg: `84px`}} mb={{base: `18px`}} />
            <Text
              fontWeight={{base: `600`}}
              fontSize={{base: `28.5px`}}
              lineHeight={{base: `130%`}}
              letterSpacing={{base: `0%`}}
            >
              Are you sure?
            </Text>
            <Text
              fontWeight={{base: `400`}}
              fontSize={{base: `19.5px`}}
              lineHeight={{base: `150%`}}
              letterSpacing={{base: `2%`}}
              color={`matador_text.400`}
              opacity={`.8`}
            >
              {text}
            </Text>
          </VStack>
          <Flex direction={`column`} gap={`8px`} pt={`20px`} position={`sticky`} bottom={`0px`}>
            <Button
              color="#DD4449"
              fontSize="16px"
              fontWeight="500"
              bg="matador_background.100"
              className={`tertiary-text`}
              lineHeight={`140%`}
              letterSpacing={`1%`}
              p={`12.5px`}
              border={`1px solid`}
              borderColor={`matador_border_color.100`}
              onClick={disclosure?.onClose}
            >
              {cancelText}
            </Button>
            <Button
              fontSize="16px"
              fontWeight="500"
              bg="custom_color.color"
              color="custom_color.contrast"
              onClick={proceedAction}
              className={`tertiary-text`}
              lineHeight={`140%`}
              letterSpacing={`1%`}
              p={`12.5px`}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              {proceedText}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
