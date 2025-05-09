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
  FormControl,
  Spinner,
  Icon,
  HStack,
} from '@chakra-ui/react';
import {Button, FormInput} from '@/ui-lib';
import isMobile from '@/utils/extras';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {CustomSingleDatePicker} from '@/components/common/Calendar/forDateAndTime';
import {useQuery} from 'react-query';
import {fetchCustomerViaEmail} from '@/api/customers';
import {themeStyles} from '@/theme';
import {BsExclamationCircle} from 'react-icons/bs';
import {ArrowBackIcon, CloseIcon} from '@chakra-ui/icons';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const InviteForm = ({onCloseModal, setListCoOwner, setCoOwnerDetails, setStep, buyModal}) => {
  const totalPercentage = 100;

  const formSchema = Yup.object().shape({
    full_name: Yup.string().required('Populate full name'),
    email: Yup.string().required('Please enter your email').email('Enter a valid email'),
    split_ownership: Yup.string().required('Please enter split ownership'),
    exp_date: Yup.string().required('Please enter an expiration date'),
  });

  const formik = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      split_ownership: '',
      exp_date: '',
    },
    onSubmit: values => {
      setStep('inviteSummary');
      setListCoOwner(prev => [...prev, {...values, ...userData?.data?.data}]);
      setCoOwnerDetails(values);
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

  const handleSelectedDate = date => {
    formik.setFieldValue('exp_date', date);
  };

  const mainContent = (
    <Box w="full">
      <Flex w="full" direction={'column'} align={'stretch'} gap={{base: '14px', md: '23px'}}>
        <Flex justify={'space-between'} align={'center'}>
          <HStack spacing="12px" onClick={() => setStep('summary')} cursor="pointer">
            <ArrowBackIcon fontSize={'25px'} cursor="pointer" color="text" />
            <Text
              className="heading-text-regular"
              fontSize={{base: '23px', md: '28px'}}
              fontWeight={400}
            >
              Invite a co-owner
            </Text>
          </HStack>
          <CloseIcon fontSize={'15px'} cursor="pointer" color="text" onClick={buyModal?.onClose} />
        </Flex>

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
        <FormControl>
          <Text
            className="sub-text-regular"
            fontSize={{base: '11px', md: '13px'}}
            color="matador_form.label"
            fontWeight={{base: '400', md: '400'}}
            mb="6px"
          >
            Offer expiration date
          </Text>
          <CustomSingleDatePicker
            mainDate={formik.values.exp_date}
            handleSelectedDate={handleSelectedDate}
            bg={`matador_background.100`}
          />
          {formik.touched.exp_date && formik.errors.exp_date && (
            <Text
              color={themeStyles.color.matador__red}
              my={{base: '3px', md: '5px'}}
              fontSize={{base: '10px', md: '14px'}}
            >
              {formik.errors.exp_date}
            </Text>
          )}
        </FormControl>
      </Flex>
      <Button
        w="full"
        mt={{base: '50px', md: '80px'}}
        h="48px"
        bg="custom_color.color"
        color="custom_color.contrast"
        onClick={formik.submitForm}
      >
        Proceed
      </Button>
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
            minH="518px"
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
            maxW="430px"
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

export default InviteForm;
