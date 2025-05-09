import {
  ModalContent,
  Box,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Image,
  Flex,
  HStack,
  Divider,
} from '@chakra-ui/react';
import {Button, CustomizableButton} from '@/ui-lib';
import isMobile from '@/utils/extras';

const customScrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '4px',
    borderRadius: '16px',
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: '16px',
    WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '16px',
    backgroundColor: '#ffffff',
    // outline: "1px solid slategrey", // You can include this line if needed
  },
};

const buyModal = ({onCloseModal, buyModal, listCoOwner, setStep}) => {
  const mainContent = (
    <Box w="full">
      <Text fontSize={'23px'} fontWeight={400} className="heading-text-regular" mb="18px">
        Invites
      </Text>
      <VStack
        align={'stretch'}
        gap="16px"
        pb="16px"
        divider={<Divider />}
        maxH="30vh"
        overflowY="auto"
        __css={customScrollbarStyles}
      >
        {(listCoOwner || []).map((coOwner, i) => (
          <HStack align={'center'} justify={'space-between'} key={i}>
            <Flex gap="10px">
              <Image w="50px" h="50px" borderRadius={'full'} src={coOwner.avatar} />
              <VStack align={'stretch'} spacing="3px">
                <Text fontWeight={500} fontSize={'17px'}>
                  {coOwner.full_name}
                </Text>
                <Text fontWeight={400} fontSize={'12px'}>
                  {coOwner.email}
                </Text>
              </VStack>
            </Flex>
            <Text fontWeight={500} fontSize={'13px'} p="4px 12px" borderRadius={'4px'} bg="#F0F0F0">
              {coOwner.split_ownership}%
            </Text>
          </HStack>
        ))}
      </VStack>
      <Flex align={'center'} gap="12px" justify={'center'} mt="24px" w="full">
        <CustomizableButton
          border="1px solid !important"
          borderColor={`custom_color.color`}
          bg="custom_color.background"
          color="custom_color.color"
          h="48px"
          w="50%"
          onClick={buyModal.onClose}
        >
          Done
        </CustomizableButton>
        <Button
          w="50%"
          h="48px"
          bg="custom_color.color"
          color="custom_color.contrast"
          onClick={() => setStep('inviteMore')}
        >
          Invite Another User
        </Button>
      </Flex>
    </Box>
  );

  return mainContent;

  return (
    <>
      {isMobile ? (
        <Drawer
          autoFocus={false}
          onCloseComplete={onCloseModal}
          isCentered
          onClose={buyModal?.onClose}
          isOpen={buyModal?.isOpen}
          placement="bottom"
        >
          <DrawerOverlay />
          <DrawerContent
            bg="card_bg"
            color={`text`}
            maxW="430px"
            px={{base: '15px', md: '32px'}}
            minH={{base: 'unset', md: '518px'}}
            py={{base: '28px', md: '38px'}}
            // borderTopRadius={{base: '10px', md: '16px'}}
          >
            {mainContent}
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          autoFocus={false}
          onCloseComplete={onCloseModal}
          isCentered
          onClose={buyModal?.onClose}
          isOpen={buyModal?.isOpen}
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            color={`text`}
            maxW="470px"
            px={{base: '15px', md: '24px'}}
            minH="unset"
            py={{base: '28px', md: '24px'}}
            borderRadius={0}
          >
            {mainContent}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default buyModal;
