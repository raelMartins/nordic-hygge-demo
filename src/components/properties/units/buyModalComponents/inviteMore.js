import {
  ModalContent,
  Box,
  Text,
  Modal,
  ModalOverlay,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Flex,
  Spinner,
  Icon,
  Center,
  Image,
  useToast,
} from '@chakra-ui/react';
import {Button, CustomizableButton, FormInput} from '@/ui-lib';
import isMobile from '@/utils/extras';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useMutation, useQuery} from 'react-query';
import {fetchCustomerViaEmail} from '@/api/customers';
import {BsExclamationCircle} from 'react-icons/bs';
import {inviteCoOwners} from '@/api/co_owners';
import processingLoader from '@/images/processing-transaction.gif';
import successfulLoader from '@/images/successful-transaction.gif';
import {useCustomToast} from '@/components/CustomToast';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const InviteMore = ({
  onCloseModal,
  setListCoOwner,
  listCoOwner,
  selectedPlan,
  unitData,
  setStep,
  returnedData,
  buyModal,
}) => {
  const toast = useCustomToast();

  let totalPercentage = 100;
  let usedPercentage = 0;
  (listCoOwner || []).forEach(coOwner => {
    usedPercentage += Number(coOwner?.split_ownership);
  });
  totalPercentage = totalPercentage - usedPercentage;

  const inviteMoreMutation = useMutation(inviteCoOwners, {
    onSuccess: res => {
      setListCoOwner(prev => [...prev, {...formik.values, ...userData?.data?.data}]);
      formik.resetForm();
    },
  });

  const formSchema = Yup.object().shape({
    full_name: Yup.string().required('Populate full name'),
    email: Yup.string().required('Please enter your email').email('Enter a valid email'),
    split_ownership: Yup.string().required('Please enter split ownership'),
  });

  const formik = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      split_ownership: '',
    },
    onSubmit: values => {
      if (!userData?.data?.data)
        return toast({
          title: `You can only invite an existing user`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      if (listCoOwner.find(coOwner => coOwner.email === formik.values.email))
        return toast({
          title: `This user has already been invited`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      const bodyToSubmit = {
        invitees: [{email: values.email, equity_value: Number(values.split_ownership)}],
        from_store: true,
        equity_id: returnedData?.data?.id,
      };
      inviteMoreMutation.mutate(bodyToSubmit);
    },
    validationSchema: formSchema,
    // validateOnChange: false,
    validate: ({split_ownership}) => {
      const errors = {};
      if (Number(split_ownership) >= Number(totalPercentage))
        errors.split_ownership =
          'Hold on! Ensure you distribute the percentage between the invitees and yourself.';
      return errors;
    },
  });

  const {data: userData, isLoading} = useQuery(
    [formik.values?.email],
    () => fetchCustomerViaEmail(formik.values?.email),
    {
      onSuccess: res => {
        formik.setFieldValue(
          'full_name',
          `${res?.data?.data?.first_name} ${res?.data?.data?.last_name}`
        );
      },
      enabled: emailRegex.test(formik.values.email),
    }
  );

  const mainContent = (
    <>
      {inviteMoreMutation.isSuccess ? (
        <Center mt="20px" w="full" h="full" flexDirection={'column'}>
          <Image alt="loader" w="150px" h="150px" src={successfulLoader.src} />
          <Text
            color="text"
            textAlign={'center'}
            fontWeight={{base: 600, md: 400}}
            className="heading-text-regular"
            fontSize={'28px'}
            my={{base: '12px', md: '25px'}}
          >
            Co-ownership invitation sent successfully
          </Text>
          <Flex
            align={'center'}
            gap="16px"
            justify={'center'}
            mt="15px"
            w="full"
            px={{base: 'unset', md: '24px'}}
          >
            <CustomizableButton
              border="1px solid !important"
              borderColor="custom_color.color !important"
              color="custom_color.color"
              bg="custom_color.background"
              h="48px"
              w="50%"
              onClick={() => setStep('invitees')}
            >
              View Invited Users
            </CustomizableButton>
            <Button
              w="50%"
              h="48px"
              color="custom_color.contrast"
              bg="custom_color.color"
              onClick={inviteMoreMutation.reset}
            >
              Invite Another User
            </Button>
          </Flex>
        </Center>
      ) : inviteMoreMutation.isLoading ? (
        <Center mt="20px" w="full" h="full" flexDirection={'column'}>
          <Image alt="loader" w="150px" h="150px" src={processingLoader.src} />
          <Text
            color="text"
            textAlign={'center'}
            fontWeight={{base: 600, md: 400}}
            className="heading-text-regular"
            fontSize={'28px'}
            my={{base: '12px', md: '25px'}}
          >
            Processing...
          </Text>
          <Text color="text" opacity={0.8} fontSize={{base: '14px', md: '16px'}} fontWeight="400">
            Wait a moment
          </Text>
        </Center>
      ) : (
        <Box w="full">
          <Flex w="full" direction={'column'} align={'stretch'} gap={{base: '14px', md: '23px'}}>
            <Text fontSize={'23px'} fontWeight={400} className="heading-text-regular">
              Invite a co-owner
            </Text>
            <Box w="full">
              <FormInput
                name="email"
                h="44px"
                w="full"
                px="14px"
                mt="16px"
                label={'Email address'}
                type="email"
                error={formik.touched.email && formik.errors.email}
                onChange={formik.handleChange('email')}
                value={formik.values.email}
                placeholder="Enter email address"
              />
              {formik.values.email &&
                (isLoading ? (
                  <Spinner />
                ) : (
                  <>
                    {userData?.data?.data ? (
                      <Text
                        color="matador_form.label"
                        fontSize={'11px'}
                      >{`${userData?.data?.data?.first_name} ${userData?.data?.data?.last_name}`}</Text>
                    ) : (
                      <Flex gap="10px" align={'center'}>
                        <Icon color="text" fontSize={'17px'} as={BsExclamationCircle} />
                        <Text color="text" fontSize={'11px'}>
                          Account does not exist. The user will have to create an account.
                        </Text>
                      </Flex>
                    )}
                  </>
                ))}
            </Box>

            <FormInput
              h="44px"
              w="full"
              px="14px"
              mt="16px"
              label={'Full name'}
              type="text"
              error={formik.touched.full_name && formik.errors.full_name}
              // onChange={formik.handleChange('full_name')}
              value={formik.values.full_name}
              placeholder="Enter full name"
            />

            <Box>
              <FormInput
                h="44px"
                w="full"
                px="14px"
                mt="16px"
                label={'Split ownership'}
                type="number"
                error={formik.touched.split_ownership && formik.errors.split_ownership}
                onChange={formik.handleChange('split_ownership')}
                value={formik.values.split_ownership}
                placeholder="0%"
              />
              <Text color="matador_form.label" fontSize={'11px'}>{`${
                formik.values.split_ownership || 0
              }% of ${totalPercentage}%`}</Text>
            </Box>
          </Flex>

          <Button
            w="full"
            mt={{base: '50px', md: '80px'}}
            bg="custom_color.color"
            color="custom_color.contrast"
            onClick={formik.submitForm}
          >
            Proceed
          </Button>
        </Box>
      )}
    </>
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
            maxW="558px"
            px={{base: '15px', md: '32px'}}
            minH="318px"
            py={{base: '28px', md: '38px'}}
            borderRadius={0}
          >
            {mainContent}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default InviteMore;
