import React, {useState} from 'react';
import {Box, Center, Flex, Image, ModalContent, Text, useToast} from '@chakra-ui/react';
import justLogo from '../../../images/just-logo.svg';
import {Button, FormInput} from '../../../ui-lib/ui-lib.components';
import {themeStyles} from '../../../theme';
import {AttemptLogin} from '../../../api/auth';
import {STORENAMEFROMDOMAIN, store_name} from '../../../constants/routes';
import {useMutation} from 'react-query';
import {useFormik} from 'formik';
import {CloseIcon} from '@chakra-ui/icons';
import {useCustomToast} from '@/components/CustomToast';

const storeName = STORENAMEFROMDOMAIN;

export const GetStartedForm = ({setPage = () => {}, setEmail = () => {}}) => {
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
      mutate({
        email: values?.email,
        store_name: store_name(),
        // storeName
      });
    },
    validateOnChange: true,
    validate: validateForm,
  });

  const {mutate, isLoading} = useMutation(formData => AttemptLogin(formData), {
    onSuccess: res => {
      if (
        res?.response?.data?.action == 'signup' ||
        res?.response?.data?.action == 'not_customer'
      ) {
        // formik.resetForm();
        setPage('register');
        setEmail(formik.values.email);
      } else if (res?.data?.action == 'login') {
        setPage('success_link');
        setEmail(formik.values.email);
        // return formik.resetForm();
      } else {
        // formik.resetForm();
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
      const data = err?.response?.data;
      if (data?.action == 'signup' || data?.action == 'not_customer') {
        // formik.resetForm();
        setPage('register');
        setEmail(formik.values.email);
      } else if (data?.action == 'login') {
        setPage('success_link');
        setEmail(formik.values.email);
        // return formik.resetForm();
      } else {
        // formik.resetForm();
        return toast({
          title: `Oops...`,
          description: `${data?.message || 'Something went wrong,we are working to resolve it'}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      }
    },
  });

  return (
    <Center
      h={'max-content'}
      w={'100%'}
      margin={'auto'}
      flexDir="column"
      justifyContent={'center'}
      alignContent="center"
      bg="matador_background.200"
      borderRadius={'8px'}
      padding={'48px 15px'}
      border="1px solid #E4E4E4 !important"
    >
      <Text fontSize={'20px'} fontWeight={600} lineHeight={'35.45px'}>
        Get Started
      </Text>
      <Text fontFamily="optimaMedium" color="#475467" fontSize={'16px'} lineHeight={'26.59px'}>
        Enter your Email address
      </Text>
      <FormInput
        type="email"
        name="email"
        id="email"
        lable={'Email address'}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.touched.email && formik.errors.email}
        placeholder="Email Address"
        color={'#191919'}
        fontSize="16px"
        mt="14px"
        borderRadius="8px"
        fontFamily="optimaMedium"
      />
      <Button
        mt="16px"
        type="submit"
        color="white"
        bg="#E6192A"
        w="full"
        borderRadius="8px"
        fontSize={'18px'}
        onClick={formik.handleSubmit}
        isLoading={isLoading}
      >
        <Text lineHeight={'28px'} fontWeight={'600'} fontSize={'18px'}>
          Get Started
        </Text>
      </Button>
    </Center>
  );
};
