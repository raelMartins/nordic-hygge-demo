import React, {useState} from 'react';
import {
  Box,
  Flex,
  FormControl,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  ModalContent,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';
import {Button, Checkbox, FormInput} from '../../../ui-lib/ui-lib.components';
import {themeStyles} from '../../../theme';
import {useMutation} from 'react-query';
import {AttemptLogin, registerUser} from '../../../api/auth';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {STORENAMEFROMDOMAIN, store_name} from '../../../constants/routes';
import {useFormik} from 'formik';
import justLogo from '../../../images/just-logo.svg';
import * as Yup from 'yup';
import {useCustomToast} from '@/components/CustomToast';

const formSchema = Yup.object().shape({
  account_type: Yup.string().required('Please select an account type'),
  first_name: Yup.string().required('Please enter your First Name'),
  last_name: Yup.string().required('Please enter your Last Name'),
  company_name: Yup.string(),
  phone: Yup.string()
    .matches(
      /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[456789]\d{9}|(\d[ -]?){10}\d$/,
      'Please enter a valid phone number'
    )
    .required('Please enter a valid phone number'),
});

const RegisterPageForm = ({email, setPage, setEmail, ...rest}) => {
  const toast = useCustomToast();
  const router = useRouter();
  const {ref_id} = router.query;
  const [ischecked, setChecked] = useState(false);
  const [countryCode, setCountryCode] = useState('+234');

  // const storeName = STORENAMEFROMDOMAIN;
  const storeName = store_name();

  const loginForRegister = useMutation(formData => AttemptLogin(formData), {
    onSuccess: res => {
      if (res?.response?.data?.action == 'signup') {
      } else if (res?.data?.action == 'login') {
        setPage('success_link');
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
            setPage('how_you_heard');
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
        return formik.resetForm();
      },
    }
  );

  const PHONEPREFIX = [
    {
      id: '1',
      code: '+234',
      name: 'Nigeria',
    },
    {
      id: '5',
      code: '+1',
      name: 'Canada',
    },
    {
      id: '6',
      code: '+44',
      name: 'United Kingdom',
    },
    {
      id: '7',
      code: '+1',
      name: 'United States of America',
    },
  ];

  const formik = useFormik({
    initialValues: {},
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: values => {
      if (!ischecked)
        return toast({
          title: 'Cannot proceed',
          description: `Agree to terms and condition before proceeding`,
          status: 'info',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      mutate(values);
    },
    validationSchema: formSchema,
    validate: values => {
      const errors = {};

      if (
        (values.account_type === 'Business' || values.account_type === 'Corporate') &&
        !values.company_name
      )
        errors.company_name = 'Please enter your business name';
      return errors;
    },
  });

  return (
    <Flex h="100%" direction="column" justify={'space-between'}>
      <Flex h="full" direction="column" fontFamily="optimaMedium">
        <Text
          fontSize={'16px'}
          fontWeight={500}
          // mt='16px'
          textAlign={'left'}
          lineHeight={'35.45px'}
          color="#101828"
        >
          Register your account
        </Text>
        <Text
          {...themeStyles.textStyles.sl5}
          fontSize={'14px'}
          fontWeight={'400'}
          mt="4px"
          color="#475467"
        >
          Enter your personal details
        </Text>
        <Select
          // fontFamily='optimaMedium'
          // placeholder='Account Type'
          mt="20px"
          w="full"
          h="44px"
          fontSize={'14px'}
          lineHeight={'24px'}
          color="#667085"
          fontWeight={'400'}
          bg="#fff"
          variant="outline"
          border={
            formik.errors.account_type
              ? '2px solid #E6192A !important'
              : '1px solid #D0D5DD !important'
          }
          // error={formik.errors.account_type}
          onChange={formik.handleChange('account_type')}
          value={formik.values.account_type}
          _focus={{border: '1px solid  !important', borderColor: 'matador_text.400 !important'}}
        >
          <option value={'Account Type'} hidden>
            Select Account Type
          </option>
          <option value={'Personal'}>Personal</option>
          <option value={'Business'}>Business</option>
          <option value={'Corporate'}>Corporate</option>
        </Select>
        {formik.errors.account_type && (
          <Text
            w="full"
            textAlign={'left'}
            color={themeStyles.color.matador__red}
            my={'5px'}
            fontSize={'14px'}
          >
            {formik.errors.account_type}
          </Text>
        )}
        <FormInput
          fontFamily="optimaMedium"
          h="44px"
          w="full"
          px="14px"
          mt="16px"
          type="text"
          error={formik.errors.first_name}
          onChange={formik.handleChange('first_name')}
          value={formik.values.first_name}
          placeholder="First Name"
          fontSize={'14px'}
          lineHeight={'24px'}
          color="#667085"
          fontWeight={'400'}
          bg="#fff"
        />
        <FormInput
          fontFamily="optimaMedium"
          h="44px"
          w="full"
          px="14px"
          mt="16px"
          type="text"
          error={formik.errors.last_name}
          onChange={formik.handleChange('last_name')}
          value={formik.values.last_name}
          placeholder="Last Name"
          fontSize={'14px'}
          lineHeight={'24px'}
          color="#667085"
          fontWeight={'400'}
          bg="#fff"
        />
        {formik.values.account_type === 'Business' || formik.values.account_type === 'Corporate' ? (
          <FormInput
            fontFamily="optimaMedium"
            h="44px"
            w="full"
            px="14px"
            mt="16px"
            type="text"
            error={formik.errors.company_name}
            onChange={formik.handleChange('company_name')}
            value={formik.values.company_name}
            placeholder="Business Name"
            fontSize={'14px'}
            lineHeight={'24px'}
            color="#667085"
            fontWeight={'400'}
            bg="#fff"
          />
        ) : (
          <></>
        )}

        <FormControl my="16px" fontFamily="optimaMedium">
          <InputGroup h={'44px'}>
            <InputLeftElement width="6rem">
              <Select
                top="0"
                left="0"
                zIndex={1}
                bottom={0}
                opacity={0}
                height="100%"
                w="100%"
                position="absolute"
                value={''}
                appearance={'none'}
                // color='#D0D5DD'
                mt="2"
                _focus={{color: '#747474'}}
                onChange={e => setCountryCode(e.target.value)}
                fontSize={'14px'}
                lineHeight={'24px'}
                color="#667085"
                fontWeight={'400'}
                bg="#fff"
              >
                {PHONEPREFIX.map(phone => (
                  <option value={'+234'} key={phone.id}>
                    {phone.code} {phone.name}
                  </option>
                ))}
              </Select>
              <Flex
                pr={3}
                width="100%"
                alignIte
                ms="center"
                justify={'space-around'}
                // color={'#747474'}
                fontSize={'14px'}
                lineHeight={'24px'}
                color="#667085"
                fontWeight={'400'}
              >
                <Text>{countryCode}</Text>
              </Flex>
            </InputLeftElement>
            <Input
              h={'44px'}
              _focus={{border: '1px solid  !important', borderColor: 'matador_text.400 !important'}}
              pl="6rem"
              type="phone"
              value={formik.values.phone}
              onChange={formik.handleChange('phone')}
              pattern="[0-9]"
              placeholder={'Phone Number'}
              border={formik.errors.phone ? '2px solid red' : '1px solid #D0D5DD !important'}
              fontSize={'14px'}
              lineHeight={'24px'}
              color="#667085"
              fontWeight={'400'}
              bg="#fff"
            />
          </InputGroup>
          <Text color={themeStyles.color.matador__red} my={'5px'} fontSize={'14px'}>
            {formik.errors.phone}
          </Text>
        </FormControl>

        <Checkbox isChecked={ischecked} onClick={() => setChecked(!ischecked)}>
          <Text
            fontSize={'14px'}
            fontWeight={400}
            color={'#606060'}
            display={'inline'}
            lineHeight={'17.75px'}
          >
            By Creating an account you agree to accept our{' '}
            <Link href={'/'}>
              <Text cursor="pointer" color={'#E6192A'} display={'inline'}>
                Privacy Policy
              </Text>
            </Link>{' '}
            and{' '}
            <Link href={'/'}>
              <Text cursor="pointer" color="#E6192A" display={'inline'}>
                {' '}
                Terms of Service
              </Text>
            </Link>
          </Text>
        </Checkbox>
      </Flex>
      <Button
        // mt='16px'
        type="submit"
        onClick={formik.handleSubmit}
        isLoading={isLoading}
        disabled={ischecked}
        isDisabled={!ischecked}
        bg="#E6192A"
        w="full"
        color="white"
      >
        <Text lineHeight={'28px'} fontWeight={'600'} fontFamily="optimaMedium" fontSize={'18px'}>
          Proceed
        </Text>
      </Button>
    </Flex>
  );
};

export default RegisterPageForm;
