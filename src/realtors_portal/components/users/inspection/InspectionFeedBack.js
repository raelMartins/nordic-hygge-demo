import {
  FormControl,
  HStack,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Image,
  Button,
  Input,
  useToast,
} from '@chakra-ui/react';
import {useMutation} from 'react-query';
import send from '@/realtors_portal/images/icons/sendIcon.png';
import avatar from '@/realtors_portal/images/icons/avatar_.png';
import {useFormik} from 'formik';
import React from 'react';

export const InspectionFeedBack = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const formik = useFormik({
    initialValues: {},
    onSubmit: values => {
      mutation.mutate(values);
    },
  });
  const [emailed, setEmailed] = React.useState('');

  const toast = useToast();
  const mutation = useMutation(
    formData => {
      // return addTeamMember(formData);
    },
    {
      onSuccess: res => {
        setEmailed(formik?.values?.email);
        formik.resetForm();
        //   refetch();
      },
      onError: err => {
        onClose();
        formik.resetForm();
        toast({
          title: 'An error occured',
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  // check if fields are empty
  const isEmpty = !formik?.values?.email?.trim() && !formik?.values.role;

  return (
    <>
      <Button
        mt="16px"
        onClick={onOpen}
        variant="dark"
        alignSelf="end"
        fontSize="18px"
        fontWeight="400"
        px="31px"
        py="12.5px"
        width={'fit-content'}
        color="#FFFFFF"
        // _hover={{ borderColor: "black" }}
      >
        Respond to feedback
      </Button>
      <Modal isCentered h="636px" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent fontFamily="Euclid Circular B " maxW="644px" borderRadius="16px">
          <ModalHeader pt="12px" pb="0">
            Feedback
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pt="26px" pb="31px" px="31">
            <HStack spacing="8px" justify={'start'} align={'center'} pb={'10px'}>
              <Image alt="" src={avatar.src} boxSize="72px" />
              <Text as="span" fontSize="18px" fontWeight="600">
                Mary Jane
              </Text>
            </HStack>
            <Text fontSize="16px" fontweight="300">
              Suspendisse potenti. Pellentesque habitant morbi tristique senectuset netus et
              malesuada fames ac turpis egestas. Quisque in nibh libero. Nullam feugiat turpis vel
              varius laoreet. Nulla volutpat leo id elit convallis
            </Text>
            <Text mt="12px" as="span" fontSize="12px" fontweight="300">
              22/4/2022 11:00am
            </Text>
            <FormControl
              as="form"
              mt="114px"
              display="flex"
              onSubmit={formik.handleSubmit}
              // flexDirection="column"
              gap="12px"
              align="center"
            >
              <Input
                required
                type="input"
                id="text_for_inspection_feedback"
                name="text"
                onChange={formik.handleChange}
                value={formik.values.text}
                noLabel
                notes
                placeholder="Type in your message"
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Button
                alignSelf="center"
                _hover={{bg: 'transparent'}}
                notes
                w="fit-content"
                p="0"
                m="0"
                type="submit"
                isLoading={mutation.isLoading}
              >
                <Image alt="" cursor="pointer" src={send.src} />
              </Button>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default InspectionFeedBack;
