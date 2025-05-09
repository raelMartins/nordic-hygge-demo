import React, {useState} from 'react';
import {Box, Flex, Stack, Text, useToast} from '@chakra-ui/react';
import {Button, FormInput, FormSelect, PhoneInput} from '../../../ui-lib/ui-lib.components';
import {themeStyles} from '../../../theme';
import {useMutation} from 'react-query';
import {AttemptLogin, registerUser} from '../../../api/auth';
import {useRouter} from 'next/router';
import {store_name} from '../../../constants/routes';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {formatDateStringDayFirst, isValidDate} from '@/realtors_portal/utils/formatDate';
import {submit_button_style} from '../register';
import {useCustomToast} from '@/components/CustomToast';

const formSchema = Yup.object().shape({
  // account_type: Yup.string().required('Please select an account type'),
  first_name: Yup.string().required('Please enter your First Name'),
  last_name: Yup.string().required('Please enter your Last Name'),
  gender: Yup.string().required('Please enter your gender'),
  phone: Yup.string()
    .min(10, 'Please enter a valid phone number')
    .max(15, 'Please enter a valid phone number')
    .matches(
      /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[456789]\d{9}|(\d[ -]?){10}\d$/,
      'Please enter a valid phone number'
    )
    .required('Please enter a valid phone number'),
});

const RegisterForm = ({email, signInType, changePage, setEmail, ...rest}) => {
  const toast = useCustomToast();
  const router = useRouter();
  const {ref_id} = router.query;
  const [countryCode, setCountryCode] = useState('+234');

  // const storeName = STORENAMEFROMDOMAIN;
  const storeName = store_name();

  const loginForRegister = useMutation(formData => AttemptLogin(formData), {
    onSuccess: res => {
      if (res?.response?.data?.action == 'signup') {
      } else if (res?.data?.action == 'login') {
        changePage('successLink');
        setEmail(email);
        // return
      } else {
        return toast({
          title: `Oops...`,
          description: `${
            res?.response?.data?.message ??
            res?.response?.message ??
            res?.message ??
            'Something went wrong,we are working to resolve it'
          }`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      }
    },
    onError: err => {
      toast({
        title: `${err.response.data.resolve ?? 'Oops...'}`,
        description: `${err.message ?? err.response.data.message ?? err}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const {mutate, isLoading} = useMutation(
    formData => {
      const data = ref_id
        ? {
            ref_id: ref_id,
            store_name: storeName,
            email: email,
            ...formData,
          }
        : {
            store_name: storeName,
            email: email,
            ...formData,
          };
      return registerUser(data);
    },
    {
      onSuccess: res => {
        if (res?.status == 200) {
          formik.resetForm();
          if (ref_id) {
            return loginForRegister.mutate({
              email: email,
              store_name: storeName,
            });
          } else {
            changePage('thankYou');
            setEmail(email);
          }
        } else {
          toast({
            title: 'Oops ...',
            description: `${
              res?.response?.data?.message ??
              res?.response?.message ??
              res?.message ??
              'Something went wrong,we are working to resolve it'
            }`,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
        }
      },
      onError: err => {
        toast({
          title: 'Oops ...',
          description: `${'Something went wrong,we are working to resolve it'}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        return formik.resetForm();
      },
    }
  );

  const formik = useFormik({
    initialValues: {},
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: true,
    onSubmit: values => {
      // console.log(values);
      mutate(values);
    },
    validationSchema: formSchema,
  });

  // const isDisabled = !ischecked || !formik.isValid;
  const isDisabled = !formik.isValid;

  const handleDate = e => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');

    const formattedValue = formatDateStringDayFirst(numericValue);

    if (!inputValue.trim()) {
      formik.setValues({
        ...formik.values,
        date_of_birth: '', // Set to empty string when input is cleared
      });
    } else {
      formik.setValues({
        ...formik.values,
        date_of_birth: formattedValue,
      });

      // Validate the formatted date
      const [d, m, y] = formattedValue.split('/');
      if (!isValidDate(d, m, y)) {
        formik.setErrors({
          ...formik.errors,
          date_of_birth: 'Please enter a valid date',
        });
      } else {
        formik.setErrors({
          ...formik.errors,
          date_of_birth: '',
        });
      }
    }

    formik.setFieldTouched('date_of_birth');
  };

  return (
    <Flex h="full" direction="column" justify={'center'} align="center" gap={`12px`}>
      <Stack textAlign={`center`} align={`center`} gap={`8px`}>
        <Text
          color="text"
          fontSize={'23px'}
          fontWeight={600}
          mt="0px"
          lineHeight={`140%`}
          className="heading-text-regular"
        >
          Tell Us More About Yourself
        </Text>
        <Text
          {...themeStyles.textStyles.sl5}
          fontSize={'13px'}
          fontWeight={'300'}
          mt="0px !important"
          lineHeight={`140%`}
          color={`matador_text.500`}
        >
          Enter your personal details
        </Text>
      </Stack>
      <FormInput
        h="44px"
        w="full"
        px="14px"
        type="text"
        error={formik.errors.first_name && formik.touched.first_name}
        onChange={formik.handleChange('first_name')}
        value={formik.values.first_name}
        placeholder="First Name"
        formik={formik}
      />
      <FormInput
        h="44px"
        w="full"
        px="14px"
        type="text"
        error={formik.errors.middle_name && formik.touched.middle_name}
        onChange={formik.handleChange('middle_name')}
        value={formik.values.middle_name}
        placeholder="Middle Name (Optional)"
      />
      <FormInput
        h="44px"
        w="full"
        px="14px"
        type="text"
        error={formik.errors.last_name && formik.touched.last_name}
        onChange={formik.handleChange('last_name')}
        value={formik.values.last_name}
        placeholder="Last Name"
      />
      <FormSelect
        h="44px"
        w="100%"
        options={['male', 'female', 'rather not say']}
        type="text"
        onChange={formik.handleChange('gender')}
        value={formik.values.gender}
        defaultValue={formik.values.gender}
        placeholder="Gender"
        borderColor={`matador_border_color.100`}
        color={formik.values.gender ? `text` : `matador_text.500`}
        textTransform={`capitalize`}
        _placeholder={{
          // fontSize,
          opacity: 0.6,
          color: `green`,
        }}
      />
      <FormInput
        h="44px"
        w="full"
        px="14px"
        type="text"
        onChange={handleDate}
        placeholder="Date of Birth (DD/MM/YYYY)"
        value={formik.values.date_of_birth}
        error={formik.touched.date_of_birth && formik.errors.date_of_birth}
      />
      {/* {signInType !== 'email_and_password' && ( */}
      <Box w="full">
        <Flex h={'44px'} w="full" align={'center'} gap={`12px`}>
          <PhoneInput
            h={'44px'}
            borderRadius={0}
            _focus={{
              border: '1px solid  !important',
              borderColor: 'matador_text.400 !important',
            }}
            type="phone"
            formik={formik}
            value={formik.values.phone}
            onChange={formik.handleChange('phone')}
            getDialCode={el => setCountryCode(el)}
            pattern="[0-9]"
            placeholder={'Phone number'}
            _placeholder={{
              // fontSize,
              opacity: 0.6,
            }}
            border={formik.errors.phone && formik.touched.phone ? '2px solid' : '1px solid'}
            borderColor={
              formik.errors.phone && formik.touched.phone ? 'red' : 'matador_border_color.100'
            }
            error={formik.errors.phone && formik.touched.phone}
          />
        </Flex>
        <Text color={themeStyles.color.matador__red} my={'5px'} fontSize={'14px'}>
          {formik.errors.phone && formik.touched.phone}
        </Text>
      </Box>
      {/* )} */}
      <Button
        // onClick={
        //   signInType === 'email_and_password' ? () => changePage('thankYou') : formik.handleSubmit
        // }
        onClick={formik.handleSubmit}
        isLoading={isLoading}
        isDisabled={isDisabled}
        variation={`primary`}
        {...submit_button_style}
      >
        <Text>Proceed</Text>
      </Button>
    </Flex>
  );
};

export default RegisterForm;
