import React, {useState} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Text,
  SimpleGrid,
  Box,
  ModalCloseButton,
} from '@chakra-ui/react';
import {Button, FormInput} from '@/ui-lib';
import {Formik, Form} from 'formik';
import {themeStyles} from '@/theme';
import {FaTimes} from 'react-icons/fa';

const Invite = ({inviteModal}) => {
  const [current, setCurrent] = useState('form');

  return (
    <Modal
      autoFocus={false}
      onCloseComplete={() => setCurrent('form')}
      isCentered
      onClose={inviteModal?.onClose}
      isOpen={inviteModal?.isOpen}
    >
      <ModalOverlay />

      {current === 'form' ? (
        <ModalContent maxW="430px" px="40px" minH="581px" py="32px">
          <ModalBody>
            <Formik
              initialValues={{
                fullName: '',
                email: '',
                splitOwnership: '',
                offerExpDate: '',
              }}
              onSubmit={values => {}}
            >
              {({values, handleChange}) => (
                <Form>
                  <Flex direction="row" justify="space-between" align={'center'} mb="44px">
                    <Text fontSize={'25px'} fontWeight={600} fontFamily="optimaMedium">
                      Invite a co-owner
                    </Text>
                    <FaTimes size="20" />
                  </Flex>
                  <SimpleGrid gap="28px" column={1}>
                    <FormInput
                      type="text"
                      label="Full Name"
                      onChange={handleChange('fullName')}
                      value={values.fullName}
                    />
                    <FormInput
                      type="text"
                      label="Email Address"
                      onChange={handleChange('email')}
                      value={values.email}
                    />
                    <FormInput
                      type="text"
                      label="Split Ownership"
                      onChange={handleChange('splitOwnership')}
                      value={values.splitOwnership}
                    />
                    <FormInput
                      type="text"
                      label="Offer Expiration Date"
                      onChange={handleChange('offerExpDate')}
                      value={values.offerExpDate}
                      placeholder="Select offer expiration period"
                    />
                    <Button
                      onClick={() => setCurrent('confirm')}
                      color="white"
                      borderRadius="5px"
                      bg="#E6192A"
                      h="49px"
                    >
                      Proceed{' '}
                    </Button>
                  </SimpleGrid>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      ) : current === 'confirm' ? (
        <ModalContent maxW="430px" px="40px" minH="581px" py="32px">
          <ModalBody>
            <Box>
              <Flex direction="row" justify="space-between" align={'center'} mb="44px">
                <Text fontSize={'25px'} fontWeight={600} fontFamily="optimaMedium">
                  Invitation summary
                </Text>
                <FaTimes size="20" />
              </Flex>
              <SimpleGrid gap="8px" column={1}>
                <FormInput
                  border="none"
                  fontWeight="600"
                  fontFamily="optimaMedium"
                  px="0"
                  py="0"
                  type="text"
                  label="Full Name"
                  value={'Ahmed Taraj'}
                />
                <FormInput
                  border="none"
                  fontWeight="600"
                  fontFamily="optimaMedium"
                  px="0"
                  py="0"
                  type="text"
                  label="Email Address"
                  value={'Ahmed@mail.com'}
                />
                <FormInput
                  border="none"
                  fontWeight="600"
                  fontFamily="optimaMedium"
                  px="0"
                  py="0"
                  type="text"
                  label="Split Ownership"
                  value={'20%'}
                />
                <FormInput
                  border="none"
                  fontWeight="600"
                  fontFamily="optimaMedium"
                  px="0"
                  py="0"
                  type="text"
                  label="Shared unit price"
                  value={'NGN 20,000.00'}
                />
                <FormInput
                  border="none"
                  fontWeight="600"
                  fontFamily="optimaMedium"
                  px="0"
                  py="0"
                  type="text"
                  label="Offer Expiration Date"
                  value={'18th Oct, 2022'}
                />
                <Button
                  onClick={() => setCurrent('invited')}
                  color="white"
                  borderRadius="5px"
                  bg="#E6192A"
                  h="49px"
                >
                  Proceed{' '}
                </Button>
              </SimpleGrid>
            </Box>
          </ModalBody>
        </ModalContent>
      ) : (
        <ModalContent maxW="638px" h="431px" px="41px">
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={'column'} justify={'center'} h="full">
              <Text {...themeStyles.textStyles.sb3} textAlign="center">
                Co-ownership invitation sent successfully
              </Text>
              <Flex gap="20px" mt="48px" direction={'row'} w="full">
                <Button
                  w="213px"
                  h="60px"
                  border="1px solid"
                  borderColor="#E6192A"
                  color="#E6192A"
                  bg="white"
                  onClick={inviteModal?.onClose}
                >
                  Invite another user
                </Button>
                <Button w="213px" h="60px" color="white" bg="#E6192A">
                  View invited
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      )}
    </Modal>
  );
};

export default Invite;
