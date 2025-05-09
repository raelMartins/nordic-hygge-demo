import isMobile from '@/utils/extras';
import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';

export const ResponsivePopup = ({children, ...rest}) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  return (
    <>
      {/* {screenWidth === 0 ? null : screenWidth < 992 ? ( */}
      {isMobile ? (
        <Drawer {...rest}>
          <DrawerOverlay />
          {children}
        </Drawer>
      ) : (
        <Modal {...rest}>
          <ModalOverlay />
          {children}
        </Modal>
      )}
    </>
  );
};

export const ResponsivePopupCloseButton = ({...rest}) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  return (
    <>
      {/* {screenWidth === 0 ? null : screenWidth < 992 ? ( */}
      {isMobile ? (
        <DrawerCloseButton fontSize={`12px`} p={`23px 14px`} {...rest} />
      ) : (
        <ModalCloseButton fontSize={`12px`} p={`23px 14px`} {...rest} />
      )}
    </>
  );
};
export const ResponsivePopupContent = ({children, ...rest}) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  return (
    <>
      {/* {screenWidth === 0 ? null : screenWidth < 992 ? ( */}
      {isMobile ? (
        <DrawerContent fontFamily="Euclid Circular B " {...rest}>
          {children}
        </DrawerContent>
      ) : (
        <ModalContent fontFamily="Euclid Circular B " position={`fixed`} {...rest}>
          {children}
        </ModalContent>
      )}
    </>
  );
};
