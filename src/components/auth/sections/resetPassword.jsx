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
import {Button, Checkbox2, FormInput} from '@/ui-lib/ui-lib.components';
import {AttemptLogin, resetPassword, storeDetails} from '@/api/auth';
import {useMutation, useQuery} from 'react-query';
import {store_name} from '@/constants/routes';
import {useFormik} from 'formik';
import {CreatePassword} from './createPassword';
import {auth_button_style, submit_button_style} from '../register';
import {useCustomToast} from '@/components/CustomToast';

// const storeName = STORENAMEFROMDOMAIN;
export const ResetPassword = ({changePage, setEmail, email, ...rest}) => {
  const [tab, setTab] = useState('email');
  const [emailOTP, setemailOTP] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  const toast = useCustomToast();

  const validateForm = values => {
    const errors = {};

    if (!values.email) errors.email = 'Please enter the email address';
    else if (!values.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      errors.email = 'Please enter valid email address';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      changePage('createPassword');
      // mutate({
      //   email: values?.email,
      //   store_name: store_name(),
      //   // storeName,
      // });
    },
    validateOnChange: true,
    validate: validateForm,
  });

  const {mutate, isLoading} = useMutation(formData => resetPassword(formData), {
    onSuccess: () => {
      toast({description: 'Password reset successfully', status: 'success'});
      changePage('createPassword');
    },
    onError: error => {
      return toast({error, title: 'Oops...', status: 'error'});
    },
  });
  const handleResetPassword = password => {
    const {email} = formik.values;
    const payload = {
      email,
      password,
      business_id,
      'forget-password': true,
    };

    mutate(payload);
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

  return tab === 'changePassword' ? (
    <CreatePassword
      resetPassword={true}
      email={email}
      setEmail={setEmail}
      changePage={changePage}
    />
  ) : (
    <Flex h="full" direction="column" justify={'center'} align="center">
      <Text fontSize={'23px'} fontWeight={600} color="text" className="heading-text-regular">
        Reset Password
      </Text>
      {!sent && (
        <Text
          color={`matador_text.400)`}
          textAlign={`center`}
          fontSize={`12px`}
          fontWeight={`500`}
          lineHeight={`140%`} /* 16.8px */
          letterSpacing={`0.12px`}
        >
          It happens sometimes. Enter your email and we’d send you an OTP{' '}
        </Text>
      )}

      {!sent ? (
        <Stack
          w={`100%`}
          gap={{base: `24px`, md: `16px`}}
          mt={`8px`}
          textAlign={`left`}
          align={`flex-start`}
        >
          <FormInput
            type="text"
            onChange={formik.handleChange('email')}
            value={formik.values.email}
            placeholder={'Enter your email'}
            fontSize={13}
            formik={formik}
            bg={`matador_background.200`}
          />
          <Button
            variation={`primary`}
            {...submit_button_style}
            onClick={() => setSent(true)}
            isLoading={isLoading}
            isDisabled={!formik.values.email}
          >
            Proceed
          </Button>
          {/* <Button {...auth_button_style} onClick={() => changePage('helpCenter')}>
            Go Back
          </Button> */}
        </Stack>
      ) : (
        <Stack
          w={`100%`}
          gap={{base: `24px`, md: `16px`}}
          mt={`8px`}
          textAlign={`left`}
          align={`flex-start`}
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
            <PinInput value={emailOTP} onChange={value => setemailOTP(value)} placeholder="0">
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
            // onClick={formik.handleSubmit}
            onClick={() => setTab('changePassword')}
            isDisabled={emailOTP.length < 6}
            isLoading={isLoading}
            boxStyle={{padding: `6px 11px`, width: `100%`}}
          >
            Proceed
          </Button>
          <Text w={`100%`} textAlign={'center'} fontSize={`12px`}>
            Please enter the verification code we sent to{' '}
            <Text as="span" color="custom_color.color" cursor={'pointer'}>
              {formik.values.email}
            </Text>
            .
          </Text>
          <Text w={`100%`} color="text" textAlign={'center'} fontSize={'12px'}>
            Didn&apos;t get an email?{` `}
            <Text
              as="span"
              color="custom_color.color"
              cursor={'pointer'}
              // onClick={() => changePage('verifyPhone')}
            >
              Resend Link
            </Text>
          </Text>
        </Stack>
      )}
    </Flex>
  );
};
