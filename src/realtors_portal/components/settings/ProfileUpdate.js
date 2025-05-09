/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {
  Box,
  Flex,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
  HStack,
  Grid,
  GridItem,
  Stack,
} from '@chakra-ui/react';
import {useMutation, useQueryClient} from 'react-query';
import {Formik, useFormik} from 'formik';
import {DropDown} from '@/realtors_portal/components/profileStyles';
import useFormError from '@/realtors_portal/utils/Hook/useFormError';
import {updateAgentSettingsInfo} from '@/realtors_portal/api/agents';
import useGetSession from '@/utils/hooks/getSession';
import {RButton, UploadAgentPicture} from '@/realtors_portal/ui-lib';
import {input_container_style, input_style, label_style} from './styles';
import Link from 'next/link';

const EditSVG = ({boxSize = `16px`, color = `#71717A`}) => {
  return (
    <Box>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.83958 2.39999L3.36624 8.19332C3.15958 8.41332 2.95958 8.84665 2.91958 9.14665L2.67291 11.3067C2.58624 12.0867 3.14624 12.62 3.91958 12.4867L6.06624 12.12C6.36624 12.0667 6.78624 11.8467 6.99291 11.62L12.4662 5.82665C13.4129 4.82665 13.8396 3.68665 12.3662 2.29332C10.8996 0.91332 9.78624 1.39999 8.83958 2.39999Z"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.92578 3.3667C8.21245 5.2067 9.70578 6.61337 11.5591 6.80003"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 14.6667H14"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};

const ProfileUpdate = ({Data, refetch}) => {
  const {handleError, formError} = useFormError();
  const toast = useToast();
  const [active, setActive] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

  const queryClient = useQueryClient();

  const mutation = useMutation(
    formData => updateAgentSettingsInfo(formData, agentToken, storeName),
    {
      onSuccess: async res => {
        // await refetch();
        queryClient.invalidateQueries(['agents_settings_data']);
        await queryClient.refetchQueries(['agents_settings_data']);
        toast({
          title: 'changes updated successfully',
          status: 'success',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
        formik.resetForm();

        return setIsClicked(false);
      },
      onError: res => {
        // setIsClicked(false);
        // formik.resetForm();
        return toast({
          title: res?.message === 'Network Error' ? 'Network Error' : 'Oops something went wrong',
          description: `${
            res?.response?.data?.message ??
            res?.response?.message ??
            res?.message ??
            'Something went wrong, we are working on resolving it.'
          }`,
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  const mutation_avatar = useMutation(
    formData => updateAgentSettingsInfo(formData, agentToken, storeName),
    {
      onSuccess: async res => {
        setIsClicked(false);

        toast({
          title: 'changes updated successfully',
          status: 'success',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
        return refetch();
      },
      onError: res => {
        return toast({
          title: res?.message === 'Network Error' ? 'Network Error' : 'Oops something went wrong',
          description: `${
            res?.response?.data?.message ??
            res?.response?.message ??
            res?.message ??
            'Something went wrong, we are working on resolving it.'
          }`,
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  const validateForm = values => {
    const errors = {};

    // if (!values.phone || !(values.phone.length >= 10 && values.phone.length <= 15)) {
    //   errors.phone = 'Invalid input length !';
    // } else if (!/^[0-9]+$/.test(values.phone)) {
    //   errors.phone = 'Please Enter Digits Only !';
    // } else if (!/^\d+$/.test(values.monthly_income)) {
    //   errors.monthly_income = 'please Enter  Digits only';
    // }
    return errors;
  };
  const formik = useFormik({
    initialValues: {},
    onSubmit: values => {
      let exp = {};
      for (const [key, value] of Object.entries(values)) {
        let val = value.toString();
        if (val.trim() !== '') {
          exp[key] = value;
        }
      }
      exp = {profile_update: true, ...exp};
      mutation.mutate(exp);
    },
    validate: validateForm,
    validateOnChange: true,
  });

  const handleUpdate = () => {
    setIsClicked(true);
    // return formik.handleSubmit();
    let exp = {};
    for (const [key, value] of Object.entries(formik.values)) {
      let val = value.toString();
      if (val.trim() !== '') {
        exp[key] = value;
      }
    }
    exp = {profile_update: true, ...exp};
    mutation.mutate(exp);
    return formik.handleReset();
  };

  const handleChange = (e, name) => {
    formik.setFieldError(e.target.name, '');
    // handleError(name, e.target.value);
    formik.setFieldValue(e.target.name, e.target.value);
  };

  const handleEdit = opt => {
    if (active === opt) {
      return setActive('');
    }

    return setActive(opt);
  };

  const onAvatarChange = async file => {
    mutation_avatar.mutate({
      avatar_update: true,
      avatar: file[0]?.image.replace('data:', '').replace(/^.+,/, ''),
    });
    await refetch();
    return;
  };

  return (
    <Box
      w="100%"
      margin="0 auto"
      borderRadius="8px"
      border={{base: `none`, md: '1px solid'}}
      borderColor={`#E4E4E7 !important`}
      overflow={`hidden`}
      bg={{md: `#fff`}}
      p={{base: `0px`, md: `32px`}}
    >
      <Formik>
        <Stack
          as="form"
          onSubmit={formik.handleSubmit}
          w="100%"
          gap={{base: `20px`, md: `32px 24px`}}
        >
          <HStack
            gap={`12px`}
            w={`100%`}
            justify={{base: `flex-start`}}
            p={{base: `16px 12px`, md: `0px`}}
            borderRadius={`8px`}
            bg={{base: `#fff`, md: `transparent`}}
            border={{base: `1px solid`, md: `none`}}
            borderColor={{base: `#e4e4e7`, md: `none`}}
          >
            <UploadAgentPicture
              boxSize={{base: '64px', md: `128px`}}
              cameraSize={{base: `18px`, md: '30px'}}
            />
            <Stack gap={`8px`} display={{base: `flex`}}>
              <Text fontSize={`18px`} fontWeight={`600`} textTransform={`capitalize`}>
                {LoggedInAgent?.first_name} {LoggedInAgent?.last_name}
              </Text>
              <Text
                as={Link}
                href={`mailto:${LoggedInAgent?.email}`}
                color={`#4545FE`}
                fontWeight={`400`}
                fontSize={`14px`}
              >
                {LoggedInAgent?.email}
              </Text>
            </Stack>
          </HStack>

          <Grid
            gap={{base: `20px`, md: `32px 24px`}}
            templateColumns={{base: '1fr', md: 'repeat(3, 1fr)'}}
          >
            {/* <GridItem w="full">
              <FormLabel {...label_style}>Full Name</FormLabel>
              <Flex {...input_container_style}>
                <Input
                  value={
                    Data?.first_name
                      ? `${Data?.first_name} ${Data?.middle_name ?? ''} ${Data?.last_name ?? ''}`
                      : ``
                  }
                  placeholder="Full Name"
                  type="text"
                  required
                  isDisabled={true}
                  {...input_style}
                />
              </Flex>
            </GridItem>
            <GridItem w="full">
              <FormLabel {...label_style}>Email Address</FormLabel>
              <Flex {...input_container_style}>
                <Input
                  value={Data?.email ?? 'email'}
                  placeholder="Email"
                  type="email"
                  required
                  isDisabled
                  {...input_style}
                />
              </Flex>
            </GridItem> */}
            <GridItem w="full">
              <FormLabel {...label_style}>Phone Number</FormLabel>
              <Flex {...input_container_style}>
                <Input
                  px="0"
                  placeholder={Data?.phone || 'phone number'}
                  onChange={e => handleChange(e, 'phone')}
                  onBlur={e => {
                    if (!e.target.value.trim()) {
                      const {phone, ...rest} = formik.values;
                      formik.setValues(rest);
                    }
                    handleError('phone', e.target.value);
                  }}
                  type="number"
                  name="phone"
                  value={formik.values.phone}
                  required
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  onFocus={() => handleEdit('phone number')}
                  id="phone number"
                  isDisabled
                  {...input_style}
                />

                <EditSVG />
              </Flex>
              <Text textStyle="p-sm" textAlign="start" fontSize={'14px'} color="red">
                {formError.phone ?? ''}
              </Text>
            </GridItem>
            <GridItem w="full">
              <FormLabel {...label_style}>Date of Birth</FormLabel>
              <Box {...input_container_style}>
                <Input
                  onChange={formik.handleChange}
                  type="date"
                  value={Data?.date_of_birth}
                  required
                  isDisabled
                  {...input_style}
                  textAlign={`left !important`}
                />
              </Box>
            </GridItem>
            <GridItem w="full">
              <FormLabel {...label_style}>Marital Status</FormLabel>
              <Box
                {...input_container_style}
                pl={`0px !important`}
                onClick={() => setActive('marital status')}
              >
                <Select
                  name="marital_status"
                  defaultValue={Data?.marital_status}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.marital_status}
                  required
                  icon={<DropDown />}
                  {...input_style}
                  ml={`-3px`}
                >
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="domestic partnership">Domestic Partnership</option>
                  <option value="widowed">Widowed</option>
                  <option value="divorced">Divorced</option>
                </Select>
              </Box>
            </GridItem>
            <GridItem w="full">
              <FormLabel {...label_style}>Highest Education Level</FormLabel>
              <Box
                {...input_container_style}
                pl={`0px !important`}
                onClick={() => setActive('Education')}
              >
                <Select
                  defaultValue={Data?.highest_education}
                  name="highest_education"
                  onChange={formik.handleChange}
                  icon={<DropDown />}
                  value={formik.values.highest_education}
                  onFocus={() => handleEdit('Education')}
                  {...input_style}
                  ml={`-3px`}
                >
                  <option disabled value="Highest Education">
                    Highest Education
                  </option>

                  <option value="Bachelor’s Degree">Bachelor’s Degree</option>
                  <option value="Masters Degree">Masters Degree</option>
                  <option value="High School Diploma">High School Diploma</option>
                  <option value="Post - Secondary Certificate">Post - Secondary Certificate</option>
                  <option value="PHD">PHD</option>
                </Select>
              </Box>
            </GridItem>
            <GridItem w="full">
              <FormLabel {...label_style}>Residential Address</FormLabel>
              <Flex {...input_container_style}>
                <Input
                  placeholder={'Residential Address'}
                  name="address"
                  onChange={formik.handleChange}
                  type="text"
                  onBlur={e => {
                    if (!e.target.value.trim()) {
                      const {address, ...rest} = formik.values;
                      formik.setValues(rest);
                    }
                  }}
                  required
                  value={formik.values.address}
                  onFocus={() => handleEdit('address')}
                  {...input_style}
                />

                <EditSVG />
              </Flex>
            </GridItem>{' '}
            <GridItem w="full">
              <FormLabel {...label_style}>Company Name</FormLabel>
              <Flex {...input_container_style}>
                <Input
                  placeholder={'Company Name'}
                  onChange={formik.handleChange}
                  type="text"
                  name="company_name"
                  value={formik.values.company_name}
                  required
                  onFocus={() => handleEdit('company')}
                  onBlur={e => {
                    if (!e.target.value.trim()) {
                      const {company_name, ...rest} = formik.values;
                      formik.setValues(rest);
                    }
                  }}
                  {...input_style}
                />
                <EditSVG />
              </Flex>
            </GridItem>
            <GridItem w="full">
              <FormLabel {...label_style}>Company Address</FormLabel>
              <Flex {...input_container_style}>
                <Input
                  placeholder={'Company Address'}
                  onChange={formik.handleChange}
                  type="text"
                  name="company_address"
                  value={formik.values.company_address}
                  required
                  onFocus={() => handleEdit('com address')}
                  onBlur={e => {
                    if (!e.target.value.trim()) {
                      const {company_address, ...rest} = formik.values;
                      formik.setValues(rest);
                    }
                  }}
                  {...input_style}
                />
                <EditSVG />
              </Flex>
            </GridItem>
          </Grid>

          <HStack justify="flex-end">
            <RButton
              variation={`primary`}
              isDisabled={formError.phone || !Object.keys(formik.values).length || isClicked}
              isLoading={mutation.isLoading}
              onClick={handleUpdate}
              p={{base: `12px 40px`}}
              w={{base: `100%`, md: `max-content`}}
            >
              Update
            </RButton>
          </HStack>
        </Stack>
      </Formik>
    </Box>
  );
};

export default ProfileUpdate;
