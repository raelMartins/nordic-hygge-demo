import {
  Box,
  Button,
  HStack,
  Image,
  Text,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Stack,
  Heading,
  Input,
} from '@chakra-ui/react';
import React from 'react';
import {HiOutlineShare} from 'react-icons/hi';
import {formatToCurrency} from '../../utils';
// import clipIcon from "/src/images/icons/clipBoard_icon.svg";

const ShareModal = ({startingFrom, propertyImg, title, color}) => {
  const {isOpen: displayIsOpen, onClose: displayOnClose, onOpen: displayOnOpen} = useDisclosure();

  const handleShareModal = e => {
    e.stopPropagation();
    return displayOnOpen();
  };

  return (
    <>
      <Box bg="white" borderRadius="7px" px="8px" py="7px" onClick={handleShareModal}>
        <HiOutlineShare color={color || 'black'} size={'20px'} />
      </Box>
      <Modal autoFocus={false} isOpen={displayIsOpen} onClose={displayOnClose}>
        <ModalOverlay />
        <ModalContent borderRadius="16px" maxW="723px" px="30px">
          <ModalHeader pb="13px" fontSize={28} fontWeight={500} px="0">
            Share this Property
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p="0">
            <Heading mb="15px" fontSize="24px" fontWeight="400">
              {title}
            </Heading>
            <HStack spacing="15" mb="20px">
              <Text as="span" fontSize="14px" fontWeight="400" color="#606060">
                Starting From
              </Text>
              <Text as="span" fontSize="18px" fontWeight="400" color="#191919">
                {startingFrom}
              </Text>
            </HStack>
            <Stack direction={['column', 'row']} spacing="30px">
              {/* <AspectRatio maxW="291px" object-fit="cover" ratio={1/1.06}> */}

              <Image
                alt={`${title} image`}
                borderRadius="5px"
                minW="291px"
                objectFit="cover"
                src={propertyImg}
                h="309px"
                bg="whitesmoke"
                // w="100%"
                w="340px"
              />

              {/* </AspectRatio> */}
              <Stack minW="291px" spacing="25px">
                <Stack>
                  <label style={{color: '#949494'}} htmlFor="shareName">
                    Name
                  </label>
                  <Input id="shareName" name="name" type="text" />
                </Stack>
                <Stack>
                  <label style={{color: '#949494'}} htmlFor="shareEmail">
                    Email
                  </label>

                  <Input id="shareEmail" name="email" type="email" />
                </Stack>

                <Stack>
                  <label style={{color: '#949494'}} htmlFor="shareComment">
                    Comment (Optional)
                  </label>

                  <Textarea id="shareComment" name="comment" resize="none" />
                </Stack>
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter px="0">
            <HStack w="full" justify="space-between" spacing="31px">
              <Button
                borderRadius="12px"
                h="63px"
                bg="transparent"
                w="340px"
                border="solid 1px #e4e4e4"
              >
                <HStack justify="space-between" w="full">
                  <Text color="#616161" fontWeight="400" fontSize="16px">
                    matador.private/list-0083920
                  </Text>
                  {/* <Image src={clipIcon.src} alt="clip icon" boxSize="24px" /> */}
                </HStack>
              </Button>
              <Button
                borderRadius="12px"
                h="63px"
                bg="matador_text.100"
                border="none"
                color="#ffffff"
                w="300px"
              >
                Email
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShareModal;
