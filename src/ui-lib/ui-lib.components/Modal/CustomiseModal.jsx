import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { themeStyles } from "../../../theme";

export const CustomModal = ({ onClose, isOpen, children, ...rest }) => {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      scrollBehavior={"inside"}
      motionPreset="slideInBottom"
      {...rest}
    >
      <ModalOverlay bg="rgba(0,0,0,0.85)" />
      <ModalContent px={"60px"} py={"30px"} minInlineSize={"fit-content"}>
        {children}
      </ModalContent>
    </Modal>
  );
};

const PopupHeader = ({ children }) => {
  return (
    <ModalHeader px={"0px"}>
      <Text
        fontSize={"28px"}
        lineHeight={"36px"}
        fontWeight={"600"}
        textAlign="left"
      >
        {children}
      </Text>
      <ModalCloseButton />
    </ModalHeader>
  );
};
const PopupFooter = ({ children, ...rest }) => {
  return (
    <ModalFooter px={"0px"} {...rest}>
      <VStack w={"100%"}>{children}</VStack>
    </ModalFooter>
  );
};

const PopupBody = ({ children, ...rest }) => {
  return (
    <ModalBody pl={"0px"} my={"10px"} py={"5px"} {...rest}>
      <VStack>{children}</VStack>
    </ModalBody>
  );
};

CustomModal.Body = PopupBody;
CustomModal.Header = PopupHeader;
CustomModal.Footer = PopupFooter;
