import React from 'react';
import {Box, GridItem, SimpleGrid, Text, Stack, Flex} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {Button, FormInput, FormSelect, PhoneInput, Spinner} from '@/ui-lib';
import {getSettingsData, updateSettings} from '@/api/Settings';
import {useMutation, useQuery} from 'react-query';
import {settings_input_field_style, settings_select_field_style} from '..';
import {useCustomToast} from '@/components/CustomToast';

const Profile = () => {
  const toast = useCustomToast();

  const next_of_kinQuery = useQuery(
    ['Next_Of_Kin_Data'],
    () => getSettingsData({next_of_kin: true}),
    {
      onSuccess: res => {
        formik.setValues({
          avatar: res?.data?.data?.avatar || '',
          first_name: res?.data?.data?.first_name || '',
          middle_name: res?.data?.data?.middle_name || '',
          last_name: res?.data?.data?.last_name || '',
          email: res?.data?.data?.email || '',
          phone: res?.data?.data?.phone || '',
          relationship: res?.data?.data?.relationship || '',
          residential_address: res?.data?.data?.residential_address || '',
        });
      },
    }
  );

  const validateForm = values => {
    const errors = {};
    // if (!values?.phone || values?.phone?.length != 10) {
    //   errors.phone = 'Please Enter the 10 digit Number !';
    // } else if (!/^[0-9]+$/.test(values?.phone)) {
    //   errors.phone = 'Please Enter the Digit Only !';
    // }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      phone: '',
      relationship: '',
      residential_address: '',
    },
    onSubmit: values => {
      let exp = {};
      for (const [key, value] of Object.entries(values)) {
        let val = value.toString();
        if (val.trim() !== '') {
          exp[key] = value;
        }
      }
      exp = {next_of_kin: true, ...exp};
      mutation.mutate(exp);
    },
    validate: validateForm,
    validateOnChange: true,
  });

  const mutation = useMutation(forlgata => updateSettings(forlgata), {
    onSuccess: async res => {
      toast({
        title: 'changes updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      await next_of_kinQuery?.refetch();
    },
    onError: err => {
      toast({
        description: `${err?.response?.data?.message || 'please check your network connection'}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const AvatarMutation = useMutation(forlgata => updateSettings(forlgata), {
    onSuccess: res => {
      toast({
        title: 'changes updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      next_of_kinQuery?.refetch();
    },
    onError: res => {
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

  const onAvatarChange = async file => {
    AvatarMutation.mutate({
      next_of_kin: true,
      avatar: file[0]?.image.replace('data:', '').replace(/^.+,/, ''),
    });
    return await next_of_kinQuery.refetch();
  };

  const handleUpdate = () => {
    let exp = {};
    for (const [key, value] of Object.entries(formik.values)) {
      let val = value.toString();
      if (val.trim() !== '') {
        exp[key] = value;
      }
    }
    exp = {next_of_kin: true, ...exp};
    mutation.mutate(exp);
  };

  return (
    <Stack padding={{base: '0', lg: '14px 34px'}} w="full">
      {next_of_kinQuery?.isLoading ? (
        <Spinner disableAbsoluteCenteredSpinner h={{base: `50px`}} w={{base: `50px`}} />
      ) : (
        <Box>
          <SimpleGrid columns={{base: 1}} spacing={{base: '24px'}} justifyContent={'space-between'}>
            <Text
              className="heading-text-regular"
              fontSize={{base: `16px`, md: `24px`}}
              fontWeight={`600`}
              textTransform={'uppercase'}
              color={{base: `text`}}
              lineHeight={{base: `130%`}}
            >
              {/* PERSONAL INFORMATION */}
              Next of Kin
            </Text>
            <SimpleGrid columns={{base: 1, md: 2, xl: 3}} gap={{base: '24px 48px'}}>
              <FormInput
                type="text"
                label="First Name"
                onChange={formik.handleChange('first_name')}
                value={formik.values.first_name}
                placeholder="Enter first name"
                // disabled={formik.values.first_name?.length > 0}
                {...settings_input_field_style}
              />
              <FormInput
                type="text"
                label="Last Name"
                onChange={formik.handleChange('last_name')}
                value={formik.values.last_name}
                placeholder="Enter last name"
                // disabled={formik.values.last_name?.length > 0}
                {...settings_input_field_style}
              />
              <Box display={{base: `none`, xl: `block`}} />
              <FormInput
                label="Email address"
                type="email"
                onChange={formik.handleChange('email')}
                value={formik.values.email}
                placeholder={'Enter email address'}
                {...settings_input_field_style}
              />
              <PhoneInput
                label="Phone number"
                type="phone"
                onChange={formik.handleChange('phone')}
                value={formik.values.phone}
                formik={formik}
                placeholder={'Enter phone number'}
                {...settings_input_field_style}
              />
              <Box display={{base: `none`, xl: `block`}} />

              <FormSelect
                options={['Father', 'Mother', 'Brother', 'Sister', 'Partner']}
                label="Relationship"
                type="text"
                onChange={formik.handleChange('relationship')}
                value={formik.values.relationship}
                placeholder="Select relationship"
                borderColor={`matador_border_color.100`}
                {...settings_select_field_style}
              />
              {/* <GridItem colSpan={{base: 1, lg: 2}}> */}
              <GridItem colSpan={{base: 1}}>
                <FormInput
                  label="Residential Address"
                  type="email"
                  onChange={formik.handleChange('residential_address')}
                  value={formik.values.residential_address}
                  placeholder="Enter residential address"
                  {...settings_input_field_style}
                />
              </GridItem>
            </SimpleGrid>
          </SimpleGrid>

          <Flex justify={`flex-end`} mt={`24px`}>
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
              isLoading={next_of_kinQuery?.isLoading || mutation.isLoading}
              isDisabled={!formik.isValid}
            >
              {/* Update */}
              Save Changes
            </Button>
          </Flex>
        </Box>
      )}
    </Stack>
  );
};

export default Profile;
