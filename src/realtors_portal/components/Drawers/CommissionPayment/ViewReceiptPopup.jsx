import {CloseIcon} from '@chakra-ui/icons';
import {Center, Modal, ModalContent, ModalOverlay} from '@chakra-ui/react';
import Image from 'next/image';

export const ViewReceiptPopup = ({disclosure, data}) => {
  return (
    <Modal isOpen={disclosure?.isOpen} onClose={disclosure?.onClose} isCentered>
      <ModalOverlay />

      <ModalContent
        bg={`transparent`}
        maxW={`80vw`}
        aspectRatio={`1 / 1`}
        maxH={`80vh`}
        w={`100%`}
        h={`100%`}
        boxShadow={`none`}
      >
        <Center position={`relative`} w={`100%`} h={`100%`}>
          <Center
            onClick={disclosure?.onClose}
            position={`absolute`}
            top={`12px`}
            right={`12px`}
            boxSize={`28px`}
            borderRadius={`50%`}
            bg={`rgba(0, 0, 0, .7)`}
            color={`#fff`}
            zIndex={`1`}
          >
            <CloseIcon fontSize={`12px`} />
          </Center>
          {data?.file_type?.includes('image') ? (
            <Image
              src={data?.payment_receipt}
              alt={`receipt`}
              fill
              style={{objectFit: `contain`}}
            />
          ) : (
            <embed src={data?.payment_receipt} style={{height: `100%`, width: `100%`}} />
          )}
          {console.log({data})}
        </Center>
      </ModalContent>
    </Modal>
  );
};
