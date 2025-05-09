import {
  ModalContent,
  Modal,
  ModalOverlay,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import isMobile from '@/utils/extras';
import FractionalDetails from './fractionalDetails';
import {PriceContent} from './PriceContent';

const Price = ({
  fractionalData,
  onCloseModal,
  fractionalModal,
  fractions,
  setFractions,
  setStep,
  info,
}) => {
  const unitData = fractionalData?.fraction_data?.unit;

  return (
    <>
      {isMobile ? (
        <Drawer
          autoFocus={false}
          blockScrollOnMount
          onCloseComplete={onCloseModal}
          isCentered
          onClose={fractionalModal?.onClose}
          isOpen={fractionalModal?.isOpen}
          placement="bottom"
        >
          <DrawerOverlay />
          <DrawerContent bg="card_bg" color={`text`} maxW="full" w="full" h="full" maxH="80vh">
            <DrawerCloseButton />
            <FractionalDetails
              setStep={setStep}
              fractionalModal={fractionalModal}
              fractionalData={fractionalData}
              onCloseModal={onCloseModal}
              fractions={fractions}
              setFractions={setFractions}
            />
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          autoFocus={false}
          blockScrollOnMount
          onCloseComplete={onCloseModal}
          isCentered
          onClose={fractionalModal?.onClose}
          isOpen={fractionalModal?.isOpen}
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            color={`text`}
            maxW="640px"
            py={{base: '18px', md: '20px'}}
            px={{base: '18px', md: '34px'}}
            borderRadius={0}
          >
            <PriceContent
              unitData={unitData}
              fractionalData={fractionalData}
              fractionalModal={fractionalModal}
              fractions={fractions}
              setFractions={setFractions}
              setStep={setStep}
              progress_bar={info?.fractions_progress_bar}
            />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Price;
