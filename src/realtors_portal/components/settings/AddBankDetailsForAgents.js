import React, {useEffect, useState} from 'react';
import {
  FormControl,
  VStack,
  HStack,
  Box,
  SlideFade,
  Text,
  Select,
  Image,
  useToast,
  Input,
  Stack,
  FormLabel,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import axios from 'axios';
import successIcon from '@/realtors_portal/images/icons/check-icon-unscreen.gif';
import {fetchBanksForAgents, updateAgentSettingsInfo} from '@/realtors_portal/api/agents';

import {DropDown} from '@/realtors_portal/components/profileStyles';
import useGetSession from '@/utils/hooks/getSession';
import {RButton, ResponsivePopup, ResponsivePopupContent} from '@/realtors_portal/ui-lib';
import {input_container_style, input_style, label_style} from './styles';

export const AddBankDetailsForAgents = ({refetch, isOpen, onClose, type, bank}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [successful, setSuccessful] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [shouldVerify, setShouldVerify] = useState(false);
  const [agentBank, setAgentBank] = useState(null);
  const [bankLoading, setBankLoading] = useState(null);
  const [bankError, setBankError] = useState(null);

  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

  const handleAdd = () => {
    setIsClicked(!isClicked);
    return formik.handleSubmit();
  };
  const {
    data,
    isError,
    error,
    isLoading: loading,
  } = useQuery(['fetchBanksforAgents'], () => fetchBanksForAgents(agentToken, storeName));

  const validateForm = values => {
    const errors = {};

    if (!Boolean(values.bank_code)) {
      errors.bank_code = 'Please Select The Bank !';
    }

    if (!values.account_number || values.account_number.length != 10) {
      errors.account_number = 'Please Enter the 10 digit Account Number !';
    } else if (!/^[0-9]+$/.test(values.account_number)) {
      errors.account_number = 'Please Enter the Digit Only !';
    }
    return errors;
  };

  const displayError = () =>
    formik.touched.account_number && formik.errors.account_number
      ? formik.errors.account_number
      : null;

  const formik = useFormik({
    initialValues: {
      bank_code: '',
      account_number: '',
    },
    onSubmit: values => {
      mutate({...values, store_name: storeName});
    },
    validate: validateForm,
    validateOnChange: true,
  });

  const {mutate, isLoading} = useMutation(
    values => {
      return updateAgentSettingsInfo(values, agentToken, storeName);
    },
    {
      onSuccess: async res => {
        queryClient.invalidateQueries(['agents_settings_data']);
        await queryClient.refetchQueries(['agents_settings_data']);
        await refetch();
        formik.resetForm();
        setSuccessful(true);
        setIsClicked(false);
        setAgentBank(null);
      },
      onError: err => {
        formik.resetForm();
        onClose();
        setIsClicked(false);
        setAgentBank(null);
        toast({
          title: 'The name on this bank account does not match your registered name',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  const VerifyBanksForAgents = async () => {
    try {
      setBankLoading(true);
      const response = await axios.get(
        `https://dev.matadortrust.com/v2/agents/settings/?resolve=true&account_number=${formik.values.account_number}&bank_code=${formik.values.bank_code}`
      );

      setAgentBank(response.data);
      setBankLoading(false);
    } catch (error) {
      console.error('Couldnt fetch bank info');
      setBankError(error.message);
      setBankLoading(false);
    }
  };

  useEffect(() => {
    if (formik.values.bank_code && formik.values.account_number.length === 10) {
      setShouldVerify(true);
      VerifyBanksForAgents();
    } else {
      setShouldVerify(false);
      setAgentBank(null);
      setBankError(null);
    }
  }, [formik.values.bank_code, formik.values.account_number]);

  return (
    <>
      <ResponsivePopup
        isCentered
        placement={`bottom`}
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={() => {
          formik.resetForm();
          setAgentBank(null);
          onClose();
        }}
        scrollBehavior="inside"
        blockScrollOnMount={'true'}
        size={{base: 'sm', md: 'lg'}}
        h={'550px'}
      >
        <ResponsivePopupContent
          fontFamily="Euclid Circular B "
          borderRadius={{base: `12px 12px 0px 0px`, lg: '12px'}}
          p="24px"
          w={{base: `100%`, lg: `400px`}}
        >
          {!successful ? (
            <Stack gap={`20px`}>
              <Stack>
                <Text fontSize={'19px'} lineHeight={'130%'} fontWeight={'600'} textAlign="left">
                  Link Your Bank Account
                </Text>
                <Text
                  size="13px"
                  fontWeight="400"
                  color="#52525B"
                  lineHeight={`150%`}
                  letterSpacing={`0.26px`}
                >
                  You can only link your own bank account and cannot add a third-party account.
                </Text>
              </Stack>
              <Stack as="form" gap={`12px`} onSubmit={formik.handleSubmit}>
                <Box>
                  <FormLabel {...label_style}>Bank Name</FormLabel>
                  <Box {...input_container_style} px={`0px !important`}>
                    <Select
                      required
                      icon={<DropDown />}
                      id="bank_code"
                      name="bank_code"
                      onChange={formik.handleChange}
                      value={formik.values.bank_code}
                      onBlur={formik.handleBlur}
                      placeholder="Enter Bank Name"
                      {...input_style}
                    >
                      {loading || isError
                        ? null
                        : data?.data?.message?.data
                            ?.sort(function (a, b) {
                              var textA = a?.name?.toUpperCase();
                              var textB = b?.name?.toUpperCase();
                              return textA < textB ? -1 : textA > textB ? 1 : 0;
                            })
                            ?.map(item => (
                              <option value={item.code} key={item.id}>
                                {item.name}
                              </option>
                            ))}
                    </Select>
                  </Box>
                  <SlideFade
                    in={!!formik.touched.bank_code && formik.errors.bank_code}
                    offsetY="20px"
                  >
                    <Text textStyle="p-sm" color="red" fontSize={'14px'}>
                      {formik.touched.bank_code && formik.errors.bank_code}
                    </Text>
                  </SlideFade>
                </Box>
                <Box>
                  <FormLabel {...label_style}>Account Number</FormLabel>
                  <Box {...input_container_style}>
                    <Input
                      required
                      as="input"
                      type="input"
                      id="account_number"
                      name="account_number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.account_number}
                      placeholder="Enter Account Number"
                      borderColor={!!displayError() && 'red !important'}
                      {...input_style}
                    />
                  </Box>
                  <SlideFade in={!!displayError()} offsetY="20px">
                    <Text textStyle="p-sm" color="red" fontSize={'14px'}>
                      {displayError()}
                    </Text>
                  </SlideFade>
                </Box>
                <Box>
                  <FormLabel {...label_style}>Account Name</FormLabel>
                  <Box {...input_container_style}>
                    <Input
                      required
                      value={
                        bankLoading
                          ? 'Verifying bank info...'
                          : bankError
                          ? ``
                          : agentBank?.message?.account_name
                          ? agentBank?.message?.account_name
                          : ''
                      }
                      isDisabled
                      placeholder="Enter account name"
                      {...input_style}
                      borderColor={bankError && 'red !important'}
                      _disabled={{opacity: `1`}}
                    />
                  </Box>
                  <SlideFade in={!!bankError} offsetY="20px">
                    <Text textStyle="p-sm" color="red" fontSize={'14px'}>
                      Incorrect account details
                    </Text>
                  </SlideFade>
                </Box>
              </Stack>
              <HStack>
                <RButton
                  variation={`primary`}
                  bg={'#4545FE'}
                  borderColor={'#4545FE'}
                  isDisabled={!agentBank?.message?.account_name || isLoading}
                  w={'100%'}
                  type="submit"
                  isLoading={isLoading}
                  onClick={handleAdd}
                >
                  {type ? 'Proceed' : 'Save'}
                </RButton>
              </HStack>
            </Stack>
          ) : (
            <>
              <VStack gap={`20px`}>
                <Image
                  width="50%"
                  src={successIcon.src}
                  objectFit="cover"
                  alt="commission request successful image"
                />

                <Text fontSize={'19px'} lineHeight={'130%'} fontWeight={'600'} textAlign="left">
                  Account Added Successfully
                </Text>
                <RButton
                  bg="#4545FE"
                  borderColor="#4545FE"
                  w={`85%`}
                  onClick={() => {
                    onClose();
                    setSuccessful(false);
                  }}
                >
                  <Text color="#Ffffff" fontSize="18px" fontWeight="400">
                    Ok
                  </Text>
                </RButton>
              </VStack>
            </>
          )}
        </ResponsivePopupContent>
      </ResponsivePopup>
    </>
  );
};
export default AddBankDetailsForAgents;
