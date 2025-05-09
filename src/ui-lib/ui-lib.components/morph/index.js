import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

export const Morph = () => {
  return <></>;
};

Morph.modal = ({ children, ...rest }) => {
  return (
    <Modal
      autoFocus={false}
      scrollBehavior={"inside"}
      motionPreset="slideInBottom"
      {...rest}
    >
      {children}
    </Modal>
  );
};

Morph.modal.overlay = ({ ...rest }) => {
  return <ModalOverlay {...rest} />;
};

Morph.modal.content = ({ children, ...rest }) => {
  return <ModalContent {...rest}>{children}</ModalContent>;
};

Morph.modal.header = ({ children, ...rest }) => {
  return <ModalHeader {...rest}>{children}</ModalHeader>;
};

Morph.modal.body = ({ children, ...rest }) => {
  return <ModalBody {...rest}>{children}</ModalBody>;
};

Morph.modal.footer = ({ children, ...rest }) => {
  return <ModalFooter {...rest}>{children}</ModalFooter>;
};

Morph.modal.closeBtn = ({ ...rest }) => {
  return <ModalCloseButton {...rest} />;
};

Morph.drawer = ({ children, ...rest }) => {
  return (
    <Drawer
      autoFocus={false}
      scrollBehavior={"inside"}
      motionPreset="slideInBottom"
      {...rest}
    >
      {children}
    </Drawer>
  );
};

Morph.drawer.overlay = ({ ...rest }) => {
  return <DrawerOverlay {...rest} />;
};

Morph.drawer.content = ({ children, ...rest }) => {
  return <DrawerContent {...rest}>{children}</DrawerContent>;
};

Morph.drawer.body = ({ children, ...rest }) => {
  return <DrawerBody {...rest}>{children}</DrawerBody>;
};

Morph.drawer.header = ({ children, ...rest }) => {
  return <DrawerHeader {...rest}>{children}</DrawerHeader>;
};

Morph.drawer.footer = ({ children, ...rest }) => {
  return <DrawerFooter {...rest}>{children}</DrawerFooter>;
};

Morph.drawer.closeBtn = ({ ...rest }) => {
  return <DrawerCloseButton {...rest} />;
};
