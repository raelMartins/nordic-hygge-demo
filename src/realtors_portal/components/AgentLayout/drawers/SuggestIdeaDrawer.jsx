import React, {useState} from 'react';

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {UploadImages} from '/src/realtors_portal/components/navbarMenuComponent/UploadLoadDocForNavBar';
import {toastForError} from '/src/realtors_portal/utils/toastForErrors';
import {suggestAFeature} from '/src/realtors_portal/api/navbarMenu';
import {useMutation} from 'react-query';
import useLocalStorage from '/src/realtors_portal/utils/Hook/useLocalStorage';
import {drawer_style} from './drawer_style';
import {CreateToast, RButton} from '@/realtors_portal/ui-lib';

export const SuggestAnIdeaDrawer = ({children}) => {
  const modalDisclosure = useDisclosure();
  const [document, setDocument] = useState([]);
  const [message, setMessage] = useState('');
  const toast = useToast();
  const toaster = CreateToast();

  const [objOfkeyValues] = useLocalStorage(['a_Token', 'businessId']);

  const agentToken = objOfkeyValues?.a_Token;
  const businessId = objOfkeyValues?.businessId;

  const handleClosedModal = () => {
    modalDisclosure.onClose();
    setDocument([]);
    return setMessage('');
  };

  const suggestAFeatureMutation = useMutation(
    formData => suggestAFeature(formData, businessId, agentToken),
    {
      onSuccess: res => {
        toaster("Thank you for your suggestion! It's now in our review process.");
        handleClosedModal();
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );

  const handleMessage = e => {
    return setMessage(e.target.value);
  };
  const handleSubmit = () => {
    const image = document.map(item => item?.image.replace('data:', '').replace(/^.+,/, ''));
    const body = {image, message};
    return suggestAFeatureMutation.mutate(body);
  };

  const isValid = message.trim() && document.length;
  return (
    <>
      <HStack
        onClick={modalDisclosure.onOpen}
        cursor="pointer"
        w="full"
        spacing="5px"
        align="center"
      >
        {children}
      </HStack>
      <Drawer
        isOpen={modalDisclosure.isOpen}
        onClose={handleClosedModal}
        px="40px"
        pt="37px"
        pb="27px"
        // darkMode
        minW="648px"
        minH="592px"
        borderRadius="16px"
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />

        <DrawerContent {...drawer_style}>
          <HStack
            boxShadow="0px 3.20641px 6.41283px 0px rgba(0, 0, 0, 0.02)"
            py="12px"
            bg="#F5F5F5"
            pl="27.3px"
            pr="19.9px"
            justify="space-between"
            align="center"
            position="relative"
          >
            <HStack spacing="8px">
              <Text fontSize="20px" fontWeight={600} color="#191919">
                Suggest an idea
              </Text>
            </HStack>

            <VStack
              position="relative"
              justify="center"
              align="center"
              w="30px"
              h="30px"
              borderRadius="5px"
              transition="0.3s ease-in-out"
              _hover={{
                width: '30px',
                height: '30px',
              }}
            >
              <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
            </VStack>
          </HStack>
          <DrawerBody pt="10px" pb="39" pl="22.75px" pr="21.34px">
            <Stack w="full" spacing="none">
              <Text fontSize="12px" maxW="336.673px" fontWeight="300">
                Do you have any new ideas or desired enhancements for our app.
              </Text>
              <Text
                textAlign="start"
                w="full"
                mt="30.52px"
                mb="4.44px"
                as="label"
                htmlFor="message"
                fontSize="11.222px"
                fontWeight="300"
              >
                Comment
              </Text>
              <Textarea
                // w="291px"
                py="6.41px"
                id="message"
                value={message}
                w="full"
                h="105px"
                fontSize={'14px'}
                resize="none"
                name="message"
                mb="10px"
                // value={formik.values.message}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                borderRadius="3.09px"
                bg="#fff"
                border=" 1px solid "
                borderColor={`#e4e4e7 !important`}
                outline={`none`}
                _focus={{
                  outline: `none`,
                }}
                _hover={{
                  outline: `none`,
                }}
                _focusVisible={{
                  outline: `none`,
                }}
                onChange={handleMessage}
              />
              <Text
                textAlign="start"
                mb="4.44px"
                as="label"
                htmlFor="uploadImage"
                w="full"
                fontSize="11.222px"
                fontWeight="300"
              >
                Upload image
              </Text>
              <UploadImages
                maxFiles={5}
                id="document"
                name="document"
                files={document}
                setFiles={setDocument}
                lable={'Upload image'}
                message="Upload image"
                border={'0.3px solid #DADADA'}
                w="full"
                h="78.557px"
              />
              <RButton
                variation={`primary`}
                width="100%"
                mt="20.04px"
                fontSize="12.826px"
                fontWeight="400"
                isDisabled={!isValid}
                onClick={handleSubmit}
                isLoading={suggestAFeatureMutation.isLoading}
              >
                Submit
              </RButton>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
