import React, {useState} from 'react';
import {Flex, Stack, Text} from '@chakra-ui/react';
import {Button, Checkbox2, FormInput} from '@/ui-lib/ui-lib.components';
import {useFormik} from 'formik';
import {submit_button_style} from '../register';

export const CreatePassword = ({changePage, resetPassword, email, ...rest}) => {
  const [loading, setLoading] = useState(false);
  const validateForm = values => {
    const errors = {};
    if (!values.password) errors.password = 'Please enter your password';
    if (!values.confirm_password || values.password !== values.confirm_password)
      errors.confirm_password = 'Your passwords must match';
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: '',
    },
    onSubmit: values => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (resetPassword) {
          changePage('successLink');
        } else {
          changePage('register');
        }
      }, 2000);
    },
    validateOnChange: true,
    validate: validateForm,
  });

  return (
    <Flex h="full" direction="column" justify={'center'} align="center">
      <Text fontSize={'23px'} fontWeight={600} color="text" className="heading-text-regular">
        Create Password
      </Text>

      <Stack
        w={`100%`}
        gap={{base: `24px`, md: `16px`}}
        mt={`8px`}
        textAlign={`left`}
        align={`flex-start`}
      >
        <FormInput
          type="password"
          onChange={formik.handleChange('password')}
          value={formik?.values?.password}
          placeholder={'Create Password'}
          fontSize={13}
          formik={formik}
          bg={`matador_background.200`}
        />
        <FormInput
          type="password"
          onChange={formik.handleChange('confirm_password')}
          value={formik?.values?.confirm_password}
          placeholder={'Confirm Password'}
          fontSize={13}
          formik={formik}
          bg={`matador_background.200`}
        />
        <Button
          variation={`primary`}
          isDisabled={!formik?.isValid}
          {...submit_button_style}
          // onClick={() => {
          //   if (resetPassword) {
          //     changePage('successLink');
          //   } else {
          //     changePage('register');
          //   }
          // }}
          isLoading={loading}
          onClick={formik?.handleSubmit}
        >
          Proceed
        </Button>
      </Stack>
    </Flex>
  );
};
