import React, {useState} from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import {Button, Checkbox2, FormInput, PhoneInput} from '@/ui-lib/ui-lib.components';
import {
  AttemptLogin,
  confirmPhoneVerificationOTP,
  requestOTPforPhoneVerification,
  storeDetails,
} from '@/api/auth';
import {useMutation, useQuery} from 'react-query';
import {store_name} from '@/constants/routes';
import {useFormik} from 'formik';
import {submit_button_style} from '../register';
import * as Yup from 'yup';
import {useCustomToast} from '@/components/CustomToast';

// const storeName = STORENAMEFROMDOMAIN;

const formSchema = Yup.object().shape({
  phone: Yup.string()
    .min(10, 'Please enter a valid phone number')
    .max(15, 'Please enter a valid phone number')
    .matches(
      /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[456789]\d{9}|(\d[ -]?){10}\d$/,
      'Please enter a valid phone number'
    )
    .required('Please enter a valid phone number'),
});
export const VerifyPhone = ({changePage, setEmail, email, ...rest}) => {
  const [phoneOTP, setPhoneOTP] = useState('');
  const [sent, setSent] = useState(false);

  const toast = useCustomToast();

  const formik = useFormik({
    initialValues: {
      phone: '',
    },
    onSubmit: values => {
      sendOTPMutation.mutate({
        phone: values?.phone?.replace('+234', ''),
      });
    },
    validateOnChange: true,
    validationSchema: formSchema,
  });

  const inputStyles = {
    fontSize: '45px',
    color: 'matador_form.label',
    fontWeight: '500',
    border: '1px solid #D6D6D6',
    borderRadius: '3px',
    w: {base: '45px'},

    h: {base: '70px'},
    textAlign: 'center',
    _focusVisible: {
      outline: 'none',
    },
    _placeholder: {
      color: '#E5E5E5',
    },
    lineHeight: `120%`,
    letterSpacing: `-0.9px`,
  };

  //this  is for making the request for the otp
  const sendOTPMutation = useMutation(payload => requestOTPforPhoneVerification(payload), {
    onSuccess: () => {
      toast({
        description: `Otp sent successfully`,
        status: 'success',
      });
      setSent(true);
    },
    onError: error => {
      // if (
      //   error.response?.data?.message === 'Email already belongs to a user'
      //   // && !forForgotPassword
      // ) {
      // } else if (
      //   error.response?.data?.message === 'Customer does not exist' ||
      //   error.response?.data?.message === 'Email already belongs to a user'
      // ) {
      // }
      return toast({
        error,
        status: 'error',
        title: 'Oops...',
        description: `Something went wrong.`,
      });
    },
  });

  //this  is for verifyng the otp
  const confirmOTPMutation = useMutation(formData => confirmPhoneVerificationOTP(formData), {
    onSuccess: res => {
      changePage('createPassword');
    },
    onError: error => {
      toast({error});
    },
  });

  const handleVerify = e => {
    e.preventDefault();
    return confirmOTPMutation.mutate({
      phone: formik?.values?.phone?.replace('+234', ''),
      phone_verification_code: phoneOTP,
    });
  };

  const sendOtp = () => {
    return sendOTPMutation.mutate({
      phone: formik?.values?.phone?.replace('+234', ''),
    });
  };

  return (
    <Flex h="full" direction="column" justify={'center'} align="center">
      <Text fontSize={'23px'} fontWeight={600} color="text" className="heading-text-regular">
        Verify Phone Number
      </Text>

      {!sent ? (
        <Stack
          w={`100%`}
          gap={{base: `24px`, md: `16px`}}
          mt={`8px`}
          textAlign={`left`}
          align={`flex-start`}
        >
          <PhoneInput
            type="phone"
            onChange={formik.handleChange('phone')}
            value={formik.values.phone?.replace('+234', '')}
            placeholder={'Phone Number'}
            fontSize={13}
            formik={formik}
            bg={`matador_background.200`}
          />
          <Button
            variation={`primary`}
            {...submit_button_style}
            textTransform={`capitalize`}
            onClick={formik?.handleSubmit}
            isLoading={sendOTPMutation?.isLoading}
            isDisabled={!formik.isValid}
            boxStyle={{padding: `6px 11px`, width: `100%`}}
          >
            Proceed
          </Button>
        </Stack>
      ) : (
        <Stack
          w={`100%`}
          gap={{base: `24px`, md: `16px`}}
          mt={`8px`}
          textAlign={`left`}
          align={`flex-start`}
          as="form"
          onSubmit={handleVerify}
        >
          <Text
            color="matador_form.label"
            fontWeight={`500`}
            fontSize={{base: '12px'}}
            lineHeight={`130%`}
          >
            Enter your 6-digit code
          </Text>
          <HStack spacing="10px">
            <PinInput value={phoneOTP} onChange={value => setPhoneOTP(value)} placeholder="0">
              <PinInputField {...inputStyles} />
              <PinInputField {...inputStyles} />
              <PinInputField {...inputStyles} />
              <Text color="#737373" fontSize="32px" fontWeight="500">
                -
              </Text>
              <PinInputField {...inputStyles} />
              <PinInputField {...inputStyles} />
              <PinInputField {...inputStyles} />
            </PinInput>
          </HStack>
          <Button
            variation={`primary`}
            {...submit_button_style}
            textTransform={`capitalize`}
            onClick={handleVerify}
            isDisabled={phoneOTP.length < 6}
            isLoading={confirmOTPMutation?.isLoading}
            boxStyle={{padding: `6px 11px`, width: `100%`}}
          >
            Proceed
          </Button>
          <Text w={`100%`} textAlign={'center'} fontSize={`12px`}>
            Please enter the verification code we sent to{' '}
            <Text as="span" color="custom_color.color" cursor={'pointer'}>
              {formik.values.phone}
            </Text>
            .
          </Text>
          <Text w={`100%`} color="text" textAlign={'center'} fontSize={'12px'}>
            Didn&apos;t get an email?{` `}
            <Text as="span" color="custom_color.color" cursor={'pointer'} onClick={sendOtp}>
              Resend Link
            </Text>
          </Text>
        </Stack>
      )}
    </Flex>
  );
};
