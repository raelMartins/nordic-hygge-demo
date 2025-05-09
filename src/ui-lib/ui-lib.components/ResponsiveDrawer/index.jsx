import isMobile from '@/utils/extras';
import {
  Center,
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
import {Spinner} from '../Spinner';

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
export const ResponsivePopupContent = ({children, isLoading, ...rest}) => {
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
        <DrawerContent {...rest}>
          {isLoading ? (
            <Center w="full" h="250px">
              <Spinner disableAbsoluteCenteredSpinner h={`50px`} w={`50px`} />
            </Center>
          ) : (
            children
          )}
        </DrawerContent>
      ) : (
        <ModalContent position={`fixed`} {...rest}>
          {isLoading ? (
            <Center w="full" h="300px">
              <Spinner disableAbsoluteCenteredSpinner h={`50px`} w={`50px`} />
            </Center>
          ) : (
            children
          )}
        </ModalContent>
      )}
    </>
  );
};
