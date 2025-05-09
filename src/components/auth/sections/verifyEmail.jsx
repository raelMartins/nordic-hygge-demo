import React, {useEffect, useState} from 'react';
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
import {Button, Checkbox2, FormInput} from '@/ui-lib/ui-lib.components';
import {
  AttemptLogin,
  confirmEmailVerificationOTP,
  requestOTPforEmailVerification,
  storeDetails,
} from '@/api/auth';
import {useMutation, useQuery} from 'react-query';
import {store_name} from '@/constants/routes';
import {useFormik} from 'formik';
import {submit_button_style} from '../register';
import useGetSession from '@/utils/hooks/getSession';
import {useCustomToast} from '@/components/CustomToast';

// const storeName = STORENAMEFROMDOMAIN;
export const VerifyEmail = ({changePage, setEmail, email, forForgotPassword, ...rest}) => {
  const [emailOTP, setEmailOTP] = useState('');
  const {sessionData: business_id} = useGetSession('businessId');

  const toast = useCustomToast();

  //this  is for making the request for the otp
  const sendOTPMutation = useMutation(payload => requestOTPforEmailVerification(payload), {
    onSuccess: () => {
      toast({
        description: `Otp sent successfully`,
        status: 'success',
      });
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

  //call it once the component renders
  useEffect(() => {
    if (business_id) {
      const payload = {
        email: email,
        business_id,
        ...(forForgotPassword ? {} : {'sign-up': true}),
      };
      sendOTPMutation.mutate(payload);
      console.log({business_id});
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [business_id]);

  //this  is for verifyng the otp
  const confirmOTPMutation = useMutation(formData => confirmEmailVerificationOTP(formData), {
    onSuccess: res => {
      changePage('verifyPhone');
    },
    onError: error => {
      toast({error});
    },
  });

  const handleVerify = e => {
    e.preventDefault();
    return confirmOTPMutation.mutate({
      email: email,
      email_verification_code: emailOTP,
      business_id,
    });
  };

  const resendOtp = () => {
    const payload = {
      email: email,
      business_id,
      ...(forForgotPassword ? {} : {'sign-up': true}),
    };
    return sendOTPMutation.mutate(payload);
  };

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

  return (
    <Flex h="full" direction="column" justify={'center'} align="center">
      <Text fontSize={'23px'} fontWeight={600} color="text" className="heading-text-regular">
        Create Account
      </Text>
      <Text
        color={`matador_text.400)`}
        textAlign={`center`}
        fontSize={`12px`}
        fontWeight={`500`}
        lineHeight={`140%`} /* 16.8px */
        letterSpacing={`0.12px`}
      >
        Verify your email address
      </Text>
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
          <PinInput value={emailOTP} onChange={value => setEmailOTP(value)} placeholder="0">
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
          onClick={handleVerify}
          isDisabled={emailOTP.length < 6}
          isLoading={confirmOTPMutation?.isLoading}
        >
          Proceed
        </Button>
        <Text w={`100%`} textAlign={'center'} fontSize={`12px`}>
          Please enter the verification code we sent to{' '}
          <Text as="span" color="custom_color.color" cursor={'pointer'}>
            {email}
          </Text>
          .
        </Text>
        <Text w={`100%`} color="text" textAlign={'center'} fontSize={'12px'}>
          Didn&apos;t get an email?{` `}
          <Text as="span" color="custom_color.color" cursor={'pointer'} onClick={resendOtp}>
            Resend Link
          </Text>
        </Text>
      </Stack>
    </Flex>
  );
};
