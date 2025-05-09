import React, {useEffect} from 'react';
import {Box, Flex, HStack, Link, Stack, Text, useToast} from '@chakra-ui/react';
import {Button, FormInput} from '../../../ui-lib/ui-lib.components';
import {themeStyles} from '../../../theme';
import {AttemptLogin, storeDetails} from '../../../api/auth';
import {useMutation, useQuery} from 'react-query';
import {STORENAMEFROMDOMAIN, store_name} from '../../../constants/routes';
import {useFormik} from 'formik';
import useLocalStorage from '../../../utils/hooks/useLocalStorage';
import {useRouter} from 'next/router';
import {auth_button_style, submit_button_style} from '../register';
import {useCustomToast} from '@/components/CustomToast';

// const storeName = STORENAMEFROMDOMAIN;
export const SignInOptions = ({changePage, setSignInType, setEmail, ...rest}) => {
  const toast = useCustomToast();
  const router = useRouter();
  const STOREINFO = useQuery(['storeInfo'], storeDetails);

  const agentActive =
    STOREINFO?.data?.data?.data?.agent_active && STOREINFO?.data?.data?.data?.agent_status;

  // const [storeName] = useLocalStorage('storeName');
  // console.log({storeName});

  const validateForm = values => {
    const errors = {};

    if (!values.email) errors.email = 'Please enter the email address';
    if (!values.password) errors.password = 'Please enter your password';
    else if (!values.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      errors.email = 'Please enter valid email address';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ``,
    },
    onSubmit: values => {
      mutate({
        email: values?.email,
        password: values?.password,
        store_name: store_name(),
        // storeName,
      });
    },
    validateOnChange: true,
    validateOnBlur: false,
    validate: validateForm,
  });

  const {mutate, isLoading} = useMutation(formData => AttemptLogin(formData), {
    onSuccess: res => {
      if (
        res?.response?.data?.action == 'signup' ||
        res?.response?.data?.action == 'not_customer'
      ) {
        // changePage('register');
        changePage('verifyEmail');
        setEmail(formik.values.email);
      } else if (res?.data?.action == 'login') {
        changePage('successLink');
        setEmail(formik.values.email);
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
      const data = err?.response?.data;
      if (data?.action == 'signup' || data?.action == 'not_customer') {
        // changePage('register');
        changePage('verifyEmail');
        setEmail(formik.values.email);
      } else if (data?.action == 'login') {
        changePage('successLink');
        setEmail(formik.values.email);
      } else {
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

  useEffect(() => {
    setSignInType('email_and_password');
  }, []);

  const button_style = {
    padding: `13.5px 18px`,
    textTransform: 'capitalize',
    color: `text`,
    fontSize: `12px`,
    fontStyle: `normal`,
    fontWeight: `400`,
    lineHeight: `150%`,
    letterSpacing: `0.36px`,
    background: `transparent`,
    border: `1px solid`,
    width: `100%`,
  };

  return (
    <Flex h="full" direction="column" justify={'center'} align="center">
      <Text fontSize={'23px'} fontWeight={600} color="text" className="heading-text-regular">
        Sign In
      </Text>
      <Stack
        w={`100%`}
        gap={{base: `24px`, md: `16px`}}
        mt={`8px`}
        textAlign={`center`}
        align={`center`}
      >
        <Text
          {...themeStyles.textStyles.sl5}
          color="matador_text.500"
          // mt="8px"
          fontSize={{base: '13px', lg: '16px'}}
          lineHeight={`140%`}
        >
          Enter your login details
        </Text>
        <FormInput
          // mt="24px"
          type="email"
          name="email"
          id="email"
          lable={'Email address'}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email}
          placeholder="Enter your email"
          _placeholder={{fontSize: '13px'}}
          fontSize="16px"
          padding={{base: `12px 14px`, md: '14px 15px'}}
          height="100%"
          lineHeight="140%"
          bg={`matador_background.200`}
        />
        <FormInput
          // mt="24px"
          type="password"
          name="password"
          id="password"
          lable={'Password'}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.touched.password && formik.errors.password}
          placeholder="Enter your password"
          _placeholder={{fontSize: '13px'}}
          fontSize="16px"
          padding={{base: `12px 14px`, md: '14px 15px'}}
          height="100%"
          lineHeight="140%"
          bg={`matador_background.200`}
        />
        <HStack justify={`flex-end`} w={`100%`}>
          <Text
            color={`#2B54AD`}
            fontSize={`12px`}
            fontWeight={`500`}
            cursor={`pointer`}
            onClick={() => changePage('helpCenter')}
          >
            Need Assistance?
          </Text>
        </HStack>
        {/* <Button
            // mt="24px"
            type="submit"
            color="custom_color.contrast"
            bg="custom_color.color"
            w="full"
            fontSize={'18px'}
            onClick={formik.handleSubmit}
            isLoading={isLoading}
            // border={`1px solid`}
            p="26px"
            // borderColor={`text`}
          >
            <Text lineHeight={'28px'} fontWeight={'500'} fontSize={'18px'}>
              Proceed
            </Text>
          </Button> */}
        <Button
          variation={`primary`}
          {...submit_button_style}
          onClick={formik.handleSubmit}
          isLoading={isLoading}
        >
          Sign In
        </Button>
        <Button
          {...auth_button_style}
          onClick={() => {
            changePage('signInWithLink');
            setSignInType('link');
          }}
        >
          Sign In With Link Instead
        </Button>
        {agentActive && (
          <Button {...auth_button_style} onClick={() => location.assign('/agents')}>
            Go to Realtor&apos;s Portal
          </Button>
        )}
      </Stack>
      <Text color="text" textAlign={'center'} fontSize={'12px'} mt="12px">
        New here ?{` `}
        <Text
          as="span"
          color="custom_color.color"
          cursor={'pointer'}
          onClick={() => changePage('getStarted')}
        >
          Create an account
        </Text>
      </Text>
      {/*<Text color='text' textAlign={'center'} fontSize={'16px'} mt='12px'>
          Are you an agent?{` `}
          <Link as='span' color="custom_color.color">
            Signup as an agent
          </Link>
        </Text> */}
    </Flex>
  );
};
