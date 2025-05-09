import React, {useState} from 'react';
import {Box, Flex, Link, Stack, Text, useToast} from '@chakra-ui/react';
import {Button, Checkbox2, FormInput} from '@/ui-lib/ui-lib.components';
import {AttemptLogin, storeDetails} from '@/api/auth';
import {useMutation, useQuery} from 'react-query';
import {store_name} from '@/constants/routes';
import {useFormik} from 'formik';
import {submit_button_style} from '../register';
import {useCustomToast} from '@/components/CustomToast';

// const storeName = STORENAMEFROMDOMAIN;
const GetStarted = ({changePage, setEmail, ...rest}) => {
  const toast = useCustomToast();
  const [ischecked, setChecked] = useState(false);
  const STOREINFO = useQuery(['storeInfo'], storeDetails);
  const store_data = STOREINFO.data?.data?.data;
  const TERMS = store_data?.customer_document;
  const PRIVACY_POLICY = store_data?.customer_privacy_policy;

  const agentActive =
    STOREINFO?.data?.data?.data?.agent_active && STOREINFO?.data?.data?.data?.agent_status;

  // const [storeName] = useLocalStorage('storeName');
  // console.log({storeName});

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
        // storeName,
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

  return (
    <Flex h="full" direction="column" justify={'center'} align="center">
      <Text fontSize={'23px'} fontWeight={600} color="text" className="heading-text-regular">
        Create Account
      </Text>
      <Stack
        w={`100%`}
        gap={{base: `24px`, md: `16px`}}
        mt={`8px`}
        textAlign={`center`}
        align={`center`}
      >
        {/* <Text
            {...themeStyles.textStyles.sl5}
            color="matador_text.500"
            // mt="8px"
            fontSize={{base: '13px', lg: '16px'}}
            lineHeight={`140%`}
          >
            Enter your email address
          </Text> */}
        <FormInput
          // mt="24px"
          type="email"
          name="email"
          id="email"
          lable={'Enter your email'}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email}
          placeholder="Email Address"
          _placeholder={{fontSize: '13px'}}
          fontSize="16px"
          padding={{base: `12px 14px`, md: '14px 15px'}}
          height="100%"
          lineHeight="140%"
          bg={`matador_background.100`}
          // border={`1px solid`}
          // borderColor={`matador_text.400`}
          // borderColor={`teal`}
        />
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

        <Checkbox2
          isChecked={ischecked}
          onClick={() => setChecked(!ischecked)}
          background={`matador_background.100`}
        >
          <Text
            fontSize={{base: '11px', md: `13px`}}
            fontWeight={500}
            color="matador_text.300"
            display={'inline'}
            ml={`0px !important`}
            textAlign={`left`}
          >
            By commencing usage, you hereby acknowledge and agree to abide by the{' '}
            <Link
              onClick={!PRIVACY_POLICY ? e => e.preventDefault() : null}
              href={PRIVACY_POLICY ? PRIVACY_POLICY : '#'}
              target={PRIVACY_POLICY ? '_blank' : ''}
            >
              <Text cursor="pointer" color={'custom_color.color'} display={'inline'}>
                Privacy Policy
              </Text>
            </Link>{' '}
            and{' '}
            <Link
              onClick={!TERMS ? e => e.preventDefault() : null}
              href={TERMS ? TERMS : '#'}
              target={TERMS ? '_blank' : ''}
            >
              <Text cursor="pointer" color="custom_color.color" display={'inline'}>
                {' '}
                Terms of Service
              </Text>
            </Link>
          </Text>
        </Checkbox2>
        <Button
          variation={`primary`}
          {...submit_button_style}
          textTransform={`capitalize`}
          onClick={formik.handleSubmit}
          isLoading={isLoading}
          boxStyle={{padding: `6px 11px`, width: `100%`}}
          isDisabled={!ischecked}
        >
          Proceed
        </Button>
        <Text color="text" textAlign={'center'} fontSize={'12px'} mt="12px">
          Already have an account?{` `}
          <Text
            as="span"
            color="custom_color.color"
            cursor={'pointer'}
            onClick={() => changePage('signInOptions')}
          >
            Login
          </Text>
        </Text>
      </Stack>
    </Flex>
  );
};

export default GetStarted;
