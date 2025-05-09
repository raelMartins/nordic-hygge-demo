import React, {Fragment, useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {useFormik} from 'formik';
import {
  useToast,
  Input,
  Text,
  useDisclosure,
  Flex,
  Textarea,
  HStack,
  Center,
  Stack,
} from '@chakra-ui/react';
import {useQuery, useMutation} from 'react-query';
import {AgentListings, fetchAllListings, requestCommission} from '@/realtors_portal/api/agents';
import ListingInfo from './ListingInfo';
import RequestSuccess from './RequestSuccess';
import MenuForListings from './MenuForListings';
import {RequestWrap} from './styledForCommission';
import useFormError from '@/realtors_portal/utils/Hook/useFormError';
import RequestComissionIcon from '@/realtors_portal/images/icons/mobile_nav/mobile_commission_request_icon.svg';

import {isValidDate} from '@/realtors_portal/utils/formatDate';
import {formatDateStringDayFirst} from '@/realtors_portal/utils/formatDate';
import useGetSession from '@/utils/hooks/getSession';
import {
  RButton,
  ResponsivePopup,
  ResponsivePopupCloseButton,
  ResponsivePopupContent,
} from '@/realtors_portal/ui-lib';

const RequestCommissionContent = ({onClose = () => {}}) => {
  const {handleError, formError} = useFormError();
  const [listingId, setListingId] = useState('');
  const [listingName, setListingName] = useState('');
  const [willDisplay, setWillDisplay] = useState(false);
  const dateInput = useRef(null);
  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;
  const {
    isOpen: successIsOpen = true,
    onOpen: successOnOpen,
    onClose: successOnClose,
  } = useDisclosure();

  const {
    data,
    isLoading: load,
    isError: err,
  } = useQuery(['all_agent_listings'], () => AgentListings(``));

  const toast = useToast();

  const mutation = useMutation(formData => requestCommission(formData, storeName, agentToken), {
    onSuccess: () => {
      setWillDisplay(true);
      setListingId('');
      formik.handleReset();
      onClose();
      // successOnOpen();
      toast({
        title: 'Success',
        description: 'Commission Request sent successfully!',
        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: error => {
      toast({
        title: 'Oops...',
        description: `${
          error?.response?.data?.message ??
          error?.response?.message ??
          'Something went wrong,we are working on resolving it'
        }`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  // function formatDate(date, forBackEnd) {
  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const year = date.getFullYear().toString();
  //   let formattedDate = `${day}/${month}/${year}`;

  //   if (forBackEnd) {
  //     formattedDate = `${year}-${month}-${day}`;
  //     return formattedDate;
  //   }

  //   return date;
  // }

  const validateForm = values => {
    const errors = {};
    const date = new Date();
    console.log(values.inputDate);
    // const input_date_arr = values.inputDate?.split('/');

    const [d, m, y] = values.inputDate.split('/');
    const inputDate = new Date(`${y}-${m}-${d}`);

    if (!values?.client_email?.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
      errors.client_email = 'Please enter a valid email address';

    if (isNaN(inputDate?.getTime())) errors.date_sold = 'Invalid Date format';

    if (inputDate > date) errors.date_sold = "Hmm, date selected can't be in the future";

    // if (!/^\d+$/.test(formik.values.quantity)) errors.quantity = 'invalid format';
    // const date_arr = date.toLocaleDateString().split('/');

    if (!isValidDate(d, m, y)) errors.date_sold = 'Invalid date';

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      search: '',
      client_email: '',
      date_sold: '',
      listingId: '',
      bundle_id: '',
      inputDate: '',
      note: '',
      // quantity: '',
    },

    onSubmit: values => {
      // const {date_sold, note, quantity, client_email, bundle_id} = values;
      const {date_sold, note, client_email, bundle_id} = values;
      const new_date_arr = date_sold?.split('/');
      const new_date_string = `${new_date_arr[2]}-${new_date_arr[1]}-${new_date_arr[0]}`;
      return mutation.mutate({
        date_sold: new_date_string,
        note,
        quantity: 1,
        email: client_email,
        bundle_id: ~~bundle_id,
      });
    },
    validateOnChange: true,
    validate: validateForm,
  });

  const isValid =
    !formik.errors.date_sold &&
    formik.values.date_sold &&
    !formError.email &&
    !!formik.values.bundle_id.trim();
  // &&!formError.quantity;

  const handleDate = e => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');

    const formattedValue = formatDateStringDayFirst(numericValue);

    if (!e.target.value.trim()) {
      const {date_sold, ...rest} = formik.values;
      return formik.setValues(rest);
    }
    formik.setValues({
      ...formik.values,
      date_sold: formattedValue,
      inputDate: formattedValue,
    });
    formik.setErrors({
      ...formik.errors,
      date_sold: '',
    });
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

  const getProject = projId =>
    data?.data?.listings && data?.data?.listings?.filter(item => item.id == projId);
  const projects = data?.data?.listings;

  const input_style = {
    border: `1px solid`,
    borderColor: '#e4e4e7 !important',
    padding: `8px 12px`,
    bg: `#fff`,
    borderRadius: `8px`,
    color: `#71717A`,
    fontSize: `13px`,
    fontWeight: `400`,
    lineHeight: `150%`,
    letterSpacing: `0.26px`,
    _placeholder: {opacity: `1`},
    _hover: {outline: 'none', opacity: `1`},
    _active: {outline: 'none', opacity: `1`},
    _focus: {outline: 'none', opacity: `1`},
    _focusVisible: {outline: 'none', opacity: `1`},
  };

  return (
    <>
      {/* border={`1px solid`}
                    borderColor="#e4e4e7 !important" */}
      <Flex direction={`column`} gap={`16px`} w="full">
        <HStack mb={`4px`} justify={`space-between`}>
          <Text
            color={{base: `#18181B`}}
            fontSize={{base: `19px`}}
            fontWeight={{base: `600`}}
            lineHeight={{base: `130%`}}
          >
            Request Commission
          </Text>
          <ResponsivePopupCloseButton />
        </HStack>
        <Stack w={`100%`} gap={`6px`}>
          <Text
            color="#3F3F46"
            fontSize={{base: `13px`}}
            fontWeight={{base: `400`}}
            lineHeight={{base: `150%`}}
            letterSpacing={{base: `0.26px`}}
          >
            Select the listing
          </Text>
          <MenuForListings
            err={err}
            listings={projects}
            isLoading={load}
            setListingId={setListingId}
            listingName={listingName}
            setListingName={setListingName}
            {...input_style}
          />
        </Stack>
        <Stack w={`100%`} gap={`6px`}>
          <Text
            color="#3F3F46"
            fontSize={{base: `13px`}}
            fontWeight={{base: `400`}}
            lineHeight={{base: `150%`}}
            letterSpacing={{base: `0.26px`}}
          >
            What unit did you sell?
          </Text>
          <ListingInfo
            listingId={listingId}
            listing={getProject(listingId)}
            formik={formik}
            {...input_style}
          />
        </Stack>
        <Stack w={`100%`} gap={`6px`}>
          <Text
            color="#3F3F46"
            fontSize={{base: `13px`}}
            fontWeight={{base: `400`}}
            lineHeight={{base: `150%`}}
            letterSpacing={{base: `0.26px`}}
          >
            Subscriber’s Email Address
          </Text>

          <Input
            onChange={formik.handleChange}
            value={formik.values.client_email}
            onBlur={e => handleError('email', e.target.value)}
            name="client_email"
            placeHolder="Enter subscriber’s email address"
            {...input_style}
          />
          <Text textStyle="p-sm" textAlign="start" fontSize={'12px'} color="red">
            {formError.email ?? ''}
          </Text>
        </Stack>
        <Stack w={`100%`} gap={`6px`}>
          <Text
            color="#3F3F46"
            fontSize={{base: `13px`}}
            fontWeight={{base: `400`}}
            lineHeight={{base: `150%`}}
            letterSpacing={{base: `0.26px`}}
          >
            Date Sold
          </Text>
          <Input
            ref={dateInput}
            type="text"
            placeholder="DD/MM/YYYY"
            value={formik.values.date_sold}
            name="date_sold"
            onChange={handleDate}
            onBlur={handleBlur}
            maxLength={10}
            {...input_style}
          />
          <Text textStyle="p-sm" textAlign="start" fontSize={'14px'} color="red">
            {formik.touched.date_sold && formik.errors.date_sold ? formik.errors.date_sold : ''}
          </Text>
        </Stack>
        <Stack w={`100%`} gap={`6px`}>
          <Textarea
            placeholder="Do you want to add any  comment?"
            name="note"
            h="78px"
            resize="none"
            onChange={formik.handleChange}
            value={formik.values.note}
            {...input_style}
          />
        </Stack>
        <HStack gap={`12px`} justifyContent={'flex-end'}>
          <RButton
            variation={`tertiary`}
            color="#FF3636"
            onClick={onClose}
            w={{base: '100%'}}
            order={{base: '2', md: '1'}}
            display={{base: 'none', md: `flex`}}
          >
            Discard
          </RButton>
          <RButton
            variation={`primary`}
            type="submit"
            isDisabled={!isValid}
            isLoading={mutation.isLoading}
            onClick={() => {
              formik.handleSubmit();
            }}
            w={{base: '100%'}}
            order={{base: '1', md: '2'}}
          >
            Proceed
          </RButton>
        </HStack>
      </Flex>
    </>
  );
};

const RequestCommission = ({closeDrawer = () => {}, disclosure, children, ...rest}) => {
  const handleClose = () => {
    closeDrawer();
    disclosure?.onClose();
  };

  const handleOpen = () => {
    // closeDrawer();
    disclosure?.onOpen();
  };

  return (
    <ResponsivePopup
      isOpen={disclosure?.isOpen}
      onClose={handleClose}
      placement="bottom"
      isCentered
    >
      <ResponsivePopupContent
        maxW={{base: `100%`, md: `400px`}}
        maxH={{base: '80vh', md: `max-content`}}
        borderRadius={{base: '12px 12px 0px 0px', md: `12px`}}
        overflow={`auto`}
        boxShadow={{
          base: `0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)`,
        }}
        p={`24px`}
      >
        <RequestCommissionContent onClose={handleClose} />
      </ResponsivePopupContent>
    </ResponsivePopup>
  );
};

export default RequestCommission;
