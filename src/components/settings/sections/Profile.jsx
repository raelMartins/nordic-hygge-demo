import React from 'react';
import {
  Box,
  GridItem,
  Image,
  SimpleGrid,
  useToast,
  Center,
  Text,
  VStack,
  Divider,
  FormLabel,
  Flex,
  Stack,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {
  Button,
  CurrencyInput,
  FormInput,
  FormSelect,
  PhoneInput,
  Spinner,
  UploadProfilePicture,
} from '@/ui-lib';
import {getSettingsData, updateSettings} from '@/api/Settings';
import {useMutation, useQuery} from 'react-query';
import Documents from '../Documents';
import {formatDateStringDayFirst, isValidDate} from '@/realtors_portal/utils/formatDate';
import {formatWithCommas} from '@/utils';
import {settings_input_field_style, settings_select_field_style} from '..';
import NextOfKin from '@/components/settings/sections/NextOfKin';
import {useCustomToast} from '@/components/CustomToast';

const Profile = () => {
  const toast = useCustomToast();

  const profileQuery = useQuery(['Profile_Data'], () => getSettingsData({profile: true}), {
    onSuccess: res => {
      const [y, m, d] = res?.data?.data?.date_of_birth
        ? res?.data?.data?.date_of_birth?.split('-')
        : [``, ``, ``];
      console.log({settings_profile_data: res});

      formik.setValues({
        avatar: res.data?.data?.avatar,
        first_name: res.data?.data?.first_name || '',
        last_name: res.data?.data?.last_name || '',
        date_of_birth: res.data?.data?.date_of_birth ? `${d}/${m}/${y}` : '',
        gender: res.data?.data?.gender || '',
        email: res.data?.data?.email || '',
        marital_status: res.data?.data?.marital_status || '',
        phone: res.data?.data?.phone || '',
        highest_education: res.data?.data?.highest_education || '',
        employment_status: res.data?.data?.employment_status || '',
        company_name: res.data?.data?.company_name || '',
        occupation: res.data?.data?.occupation || '',
        monthly_income: res.data?.data?.monthly_income || '',
        bvn: res.data?.data?.bvn || '',
        address: res.data?.data?.address || '',
        company_address: res.data?.data?.company_address || '',
        country: res.data?.data?.country || '',
        currency: res.data?.data?.currency || '',
      });
    },
  });

  const mutation = useMutation(forlgata => updateSettings(forlgata), {
    onSuccess: async res => {
      toast({
        title: 'Changes updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      console.log(`Ending Mutation`);

      return await profileQuery?.refetch();
    },
    onError: err => {
      console.log(`Catching error`);
      toast({
        title: err?.message === 'Network Error' ? 'Network Error' : 'Oops something went wrong',
        description: `${err?.response?.data?.message ?? 'please check your network connection'}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const validateForm = values => {
    const errors = {};
    let hasChanged = false; // Initialize a flag
    const date = new Date();
    const [d, m, y] = values?.date_of_birth?.split('/');
    const inputDate = new Date(`${m}-${d}-${y?.padStart(4, '0')}`);

    // Validate date_of_birth
    if (isNaN(inputDate?.getTime())) {
      errors.date_of_birth = 'Invalid Date format';
    } else if (inputDate > date) {
      errors.date_of_birth = "Hmm, date selected can't be in the future";
    }

    // Check if any other value has changed
    for (const [key, value] of Object.entries(values)) {
      if (['first_name', 'last_name', 'phone', 'avatar', 'country', 'email'].includes(key)) {
        continue; // Skip these keys
      }
      const initialValue = formik.initialValues[key];
      const currentValue = values[key];
      if (initialValue !== currentValue) {
        hasChanged = true; // Set the flag if any value has changed
      }
    }

    if (!hasChanged) {
      errors._error = 'At least one value must be changed.';
    }

    return errors;
  };

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

  const handleAmount = e => {
    const inputValue = e.target.value;
    const currency = inputValue.slice(0, 1);
    const numericValue = inputValue.replace(/\D/g, '');

    // const formattedValue = formatWithCommas(numericValue, true); //leave this for now until we figure out how to handle currency specifics

    // formatWithCommas(e.target.value.replace(/\D/g, ''), true); //leave this for now until we figure out how to handle currency specifics

    if (!inputValue.trim()) {
      formik.setValues({
        ...formik.values,
        monthly_income: '', // Set to empty string when input is cleared
      });
    } else {
      formik.setValues({
        ...formik.values,
        monthly_income: numericValue * 1,
        // monthly_income: formattedValue, //leave this for now until we figure out how to handle currency specifics
        // monthly_income: `${currency}${formattedValue}`, //leave this for now until we figure out how to handle currency specifics
      });
    }

    formik.setFieldTouched('monthly_income');
  };

  const handleBlur = e => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    const month = numericValue.substr(0, 2);
    const day = numericValue.substr(2, 2);
    const year = numericValue.substr(4);

    if (numericValue.length === 10 && !isValidDate(day, month, year)) {
      formik.setErrors({
        ...formik.errors,
        date_sold: 'Please enter a valid date',
      });
    } else {
      formik.setErrors({
        ...formik.errors,
        date_sold: '',
      });
    }

    formik.setFieldTouched('date_sold');
  };

  const formik = useFormik({
    initialValues: {
      avatar: '',
      first_name: '',
      last_name: '',
      date_of_birth: '',
      gender: '',
      email: '',
      marital_status: '',
      phone: '',
      highest_education: '',
      employment_status: '',
      company_name: '',
      occupation: '',
      monthly_income: '',
      bvn: '',
      address: '',
      company_address: '',
      currency: '',
    },
    onSubmit: values => {
      let exp = {};
      if (values?.date_of_birth) {
        const [d, m, y] = values?.date_of_birth?.split('/');

        for (const [key, value] of Object.entries(values)) {
          let val = value?.toString();
          if (val.trim() !== '') {
            exp[key] = value;
          }
        }
        exp = {profile_details: true, ...exp, date_of_birth: `${y}-${m}-${d}`};
      } else {
        exp = {profile_details: true, ...exp};
      }
      delete exp.avatar;
      console.log(`Starting Mutation`);

      mutation.mutate(exp);
    },
    validateOnChange: true,
    // validateOnMount: true,
    validate: validateForm,
  });

  return (
    <>
      <Stack padding={{base: '0', lg: '34px'}} pt={{lg: '10px'}} w="full" gap={{base: '64px'}}>
        {profileQuery?.isLoading ? (
          <Center w="full" h="50vh">
            <Spinner disableAbsoluteCenteredSpinner h={{base: `50px`}} w={{base: `50px`}} />
          </Center>
        ) : (
          <Box w="full">
            <VStack
              mt={{base: '30px', lg: '40px'}}
              w="full"
              align={'stretch'}
              gap={{base: '64px'}}
              // divider={<Divider w="full" borderColor={`matador_border_color.100`} />}
            >
              {/* first section */}
              <SimpleGrid
                // columns={{base: 1, lg: 3}}
                columns={{base: 1}}
                spacing={{base: '24px'}}
                justifyContent={'space-between'}
              >
                <Text
                  className="heading-text-regular"
                  fontSize={{base: `16px`, md: `24px`}}
                  fontWeight={`600`}
                  textTransform={'uppercase'}
                  color={{base: `text`}}
                  lineHeight={{base: `130%`}}
                >
                  Basic Information
                </Text>
                <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={{base: '24px 48px'}}>
                  <FormInput
                    type="text"
                    label="Full Name"
                    value={formik.values.first_name + ' ' + formik.values.last_name}
                    placeholder="Enter full name"
                    fontSize={13}
                    disabled
                    {...settings_input_field_style}
                  />
                  <FormInput
                    label="Date of Birth"
                    type="text"
                    onChange={handleDate}
                    placeholder="DD/MM/YYYY"
                    value={formik.values.date_of_birth}
                    disabled={profileQuery?.data?.data?.data?.date_of_birth}
                    fontSize={13}
                    error={formik.touched.date_of_birth && formik.errors.date_of_birth}
                    onBlur={handleBlur}
                    {...settings_input_field_style}
                  />
                  <FormInput
                    label="Email address"
                    type="email"
                    onChange={formik.handleChange('email')}
                    value={formik.values.email}
                    placeholder={'Enter email address'}
                    disabled={true}
                    fontSize={13}
                    {...settings_input_field_style}
                  />
                  <PhoneInput
                    label="Phone number"
                    type="phone"
                    onChange={formik.handleChange('phone')}
                    value={formik.values.phone.replace('+234', '')}
                    placeholder={'Enter phone number'}
                    fontSize={13}
                    formik={formik}
                    {...settings_input_field_style}
                  />
                  <GridItem colSpan={{base: 1, lg: 2}}>
                    <FormInput
                      label="Residential Address"
                      type="text"
                      onChange={formik.handleChange('address')}
                      value={formik.values.address}
                      placeholder="Enter residential address"
                      {...settings_input_field_style}
                    />
                  </GridItem>

                  <FormSelect
                    options={['Married', 'Single', 'Divorced', 'Rather not say']}
                    label="Marital Status"
                    type="text"
                    onChange={formik.handleChange('marital_status')}
                    value={formik.values.marital_status}
                    placeholder="Select marital status"
                    borderColor={`matador_border_color.100`}
                    {...settings_select_field_style}
                  />

                  <FormSelect
                    options={['male', 'female']}
                    label="Gender"
                    type="text"
                    onChange={formik.handleChange('gender')}
                    value={formik.values.gender}
                    defaultValue={formik.values.gender}
                    placeholder="Select gender"
                    borderColor={`matador_border_color.100`}
                    // isDisabled={profileQuery?.data?.data?.data?.gender}
                    textTransform={`capitalize`}
                    {...settings_select_field_style}
                  />

                  {profileQuery?.data?.data?.data?.customer_ref && (
                    <FormInput
                      label="Ref No."
                      type="text"
                      value={profileQuery?.data?.data?.data?.customer_ref}
                      disabled={true}
                      fontSize={13}
                      {...settings_input_field_style}
                    />
                  )}
                </SimpleGrid>
              </SimpleGrid>

              {/* second section */}
              <SimpleGrid
                // columns={{base: 1, lg: 3}}
                columns={{base: 1}}
                spacing={{base: '24px'}}
                justifyContent={'space-between'}
              >
                <Text
                  className="heading-text-regular"
                  fontSize={{base: `16px`, md: `24px`}}
                  fontWeight={`600`}
                  textTransform={'uppercase'}
                  color={{base: `text`}}
                  lineHeight={{base: `130%`}}
                >
                  education & employment
                </Text>
                <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={{base: '24px 48px'}}>
                  <FormSelect
                    label="Highest Education Level"
                    type="text"
                    onChange={formik.handleChange('highest_education')}
                    value={formik.values.highest_education}
                    placeholder="Select level"
                    options={[
                      'High School Diploma',
                      `Bachelor's Degree`,
                      'Post-Secondary Certificate',
                      'College',
                      `Master's Degree`,
                      'PHD',
                    ]}
                    borderColor={`matador_border_color.100`}
                    {...settings_select_field_style}
                  />
                  <FormSelect
                    label="Employment Status"
                    type="text"
                    onChange={formik.handleChange('employment_status')}
                    value={formik.values.employment_status}
                    placeholder="Select"
                    options={['Employed', 'Unemployed', 'Self employed']}
                    borderColor={`matador_border_color.100`}
                    {...settings_select_field_style}
                  />

                  <FormInput
                    label="Occupation"
                    type="text"
                    onChange={formik.handleChange('occupation')}
                    value={formik.values.occupation}
                    placeholder="Enter occupation"
                    {...settings_input_field_style}
                  />
                  <FormInput
                    label="Company Name"
                    type="text"
                    onChange={formik.handleChange('company_name')}
                    value={formik.values.company_name}
                    placeholder="Enter company's name"
                    {...settings_input_field_style}
                  />

                  <GridItem colSpan={{base: 1, lg: 2}}>
                    <FormInput
                      label="Company Address"
                      type="text"
                      onChange={formik.handleChange('company_address')}
                      value={formik.values.company_address}
                      placeholder="Enter company address"
                      {...settings_input_field_style}
                    />
                  </GridItem>
                  <CurrencyInput
                    label="Monthly Income"
                    type="amount"
                    // onChange={formik.handleChange('monthly_income')}//leave this for now until we figure out how to handle currency specifics
                    onChange={handleAmount}
                    changeCurrency={formik.handleChange('currency')}
                    selectedCurrency={formik.values.currency}
                    // value={formik.values.monthly_income}  //leave this for now until we figure out how to handle currency specifics
                    value={formatWithCommas(
                      `${formik.values.monthly_income}`.replace(/\D/g, ''),
                      true
                    )}
                    placeholder="0.00"
                    {...settings_input_field_style}
                  />
                </SimpleGrid>
              </SimpleGrid>

              {/* third section */}
              <SimpleGrid
                // columns={{base: 1, lg: 3}}
                columns={{base: 1}}
                spacing={{base: '24px'}}
                justifyContent={'space-between'}
              >
                <Text
                  className="heading-text-regular"
                  fontSize={{base: `16px`, md: `24px`}}
                  fontWeight={`600`}
                  textTransform={'uppercase'}
                  color={{base: `text`}}
                  lineHeight={{base: `130%`}}
                >
                  Documents
                </Text>

                <SimpleGrid columns={{base: 1, md: 2, xl: 3}} gap={{base: '24px 48px'}}>
                  <Stack gap={`0px`}>
                    <FormLabel
                      fontSize={'16px'}
                      color="matador_form.label"
                      fontWeight={400}
                      lineHeight={`140%`}
                    >
                      Upload ID
                    </FormLabel>
                    <Documents type="id" />
                  </Stack>
                  <Stack gap={`0px`}>
                    <FormLabel
                      fontSize={'16px'}
                      color="matador_form.label"
                      fontWeight={400}
                      lineHeight={`140%`}
                    >
                      Upload Bill
                    </FormLabel>
                    <Documents type="utility_bill" />
                  </Stack>
                </SimpleGrid>
              </SimpleGrid>
            </VStack>
          </Box>
        )}

        <Flex justify={`flex-end`}>
          <Button
            variation={`primary`}
            w={{base: 'full', lg: 'max-content'}}
            minW={`200px`}
            fontSize={`16px`}
            p={`9px 28px`}
            fontWeight={`600`}
            lineHeight={`140%`}
            letterSpacing={`0.48px`}
            onClick={formik.handleSubmit}
            isLoading={profileQuery?.isLoading || mutation?.isLoading}
            isDisabled={!formik.isValid}
          >
            Save Changes
          </Button>
        </Flex>
        <NextOfKin />
      </Stack>
    </>
  );
};

export default Profile;
