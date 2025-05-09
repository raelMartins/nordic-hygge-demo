import React from "react";
import {
  Box,
  Text,
  Modal,
  ModalProps,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  useColorModeValue,
  VStack,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";

export const Popup2 = ({ isOpen, onClose, children, ...restModalProps }) => {
  const bg = useColorModeValue("blue.80", "gray.800");

  return (
    <Modal
      isCentered
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
    // blockScrollOnMount={"true"}
    // size={"lg"}
    // h={"550px"}
    >
      <ModalOverlay bg="rgba(0,0,0,0.85)" />
      <ModalContent
        px={"38px"}
        py={"15px"}
        shadow="lg"
        borderRadius="2xl"
        boxShadow="0px 40px 80px -1px rgba(31, 91, 242, 0.27)"
        {...restModalProps}
      >
        <ModalCloseButton onClose={onClose} />

        {children}
      </ModalContent>
    </Modal>
  );
};

const PopupHeader = ({ children }) => {
  return (
    <ModalHeader px={"0px"} pb={"0px"}>
      <Text
        fontSize={"24px"}
        lineHeight={"30px"}
        fontWeight={"600"}
        textAlign="left"
      >
        {children}
      </Text>
    </ModalHeader>
  );
};
const PopupFooter = ({ children }) => {
  return (
    <ModalFooter pb={"90px"} px={"0px"}>
      <VStack w={"100%"}>{children}</VStack>
    </ModalFooter>
  );
};

const PopupDescription = ({ children, ...rest }) => {
  return (
    <Text p={"0px"} mt={"5px"} fontSize={"14px"} fontWeight={"300"} {...rest}>
      {children}
    </Text>
  );
};

const PopupBody = ({ children, ...rest }) => {
  return (
    <ModalBody pl={"0px"} my={"10px"} py={"5px"} {...rest}>
      <VStack>{children}</VStack>
    </ModalBody>
  );
};

Popup2.Body = PopupBody;
Popup2.Header = PopupHeader;
Popup2.Description = PopupDescription;
Popup2.Footer = PopupFooter;
