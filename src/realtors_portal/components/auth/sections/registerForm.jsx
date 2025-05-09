import React, {useState} from 'react';
import {Box, useToast} from '@chakra-ui/react';
import {useMutation} from 'react-query';
import {useFormik} from 'formik';
import {formatDateStringDayFirst} from '@/realtors_portal/utils/formatDate';
import {BasicRegistrationInfo} from './registration/BasicInfo';
import {MoreRegistrationInfo} from './registration/MoreInfo';
import default_avatar from '@/realtors_portal/images/avatar.svg';
import useFormError from '@/realtors_portal/utils/Hook/useFormError';
import {agentSignUp} from '@/realtors_portal/api/agents';
import {toastForError} from '@/realtors_portal/utils/toastForErrors';

export const form_input_style = {
  _placeholder: {fontSize: '16px', color: `matador_form.label`},
  fontSize: '16px',
  padding: {base: '10px 14px'},
  height: '100%',
  lineHeight: '120%',
  fontWeight: '400',
  boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
  color: `matador_form.label`,
  borderColor: `matador_border_color.100 !important`,
};

const RegisterForm = ({email, signInType, setPage, setEmail, ...rest}) => {
  const [screen, setScreen] = useState('basicInfo');
  const toast = useToast();
  const [avatar, setAvatar] = useState(default_avatar.src);
  const [active, setActive] = useState('');
  const [doc, setDoc] = useState([]);

  const {handleError, formError} = useFormError();

  const handleDocument = file => {
    const document = file ? file.map(item => item.replace('data:', '').replace(/^.+,/, '')) : null;
    console.log({file});
    console.log({document});

    setDoc(document);
  };

  const mutation = useMutation(
    formData => {
      return agentSignUp({...formData});
    },
    {
      onSuccess: res => {
        if (res?.code === 'ERR_NETWORK') {
          toastForError(res, true, toast);
        }

        if (res?.statusText === 'Created') {
          // sendRequest();
          setPage('pendingApproval');
        }
      },
      onError: err => {
        toast({
          title: 'Oops...',
          description: `${
            err?.response?.data?.message ?? err?.response?.message ?? 'Something went wrong'
          }`,
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  const onAvatarChange = file => {
    setAvatar(file[0]?.preview);
    formik.setFieldValue('avatar', file[0]?.image.replace('data:', '').replace(/^.+,/, ''));
  };

  const formik = useFormik({
    initialValues: {
      avatar: '',
      first_name: '',
      last_name: '',
      middle_name: '',
      date_of_birth: '',
      marital_status: '',
      gender: '',
      phone: '',
      highest_education: '',
      email,
      employment_status: '',
      company_name: '',
      company_address: '',
    },
    onSubmit: () => {},
  });

  const handleDate = e => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');

    const formattedValue = formatDateStringDayFirst(numericValue);

    if (!e.target.value.trim()) {
      const {date_of_birth, ...rest} = formik.values;
      return formik.setValues(rest);
    }
    formik.setValues({
      ...formik.values,
      date_of_birth: formattedValue,
    });

    formik.setErrors({
      ...formik.errors,
      date_sold: '',
    });
  };

  function formatDate(date, forBackEnd) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    let formattedDate = `${day}/${month}/${year}`;

    if (forBackEnd) {
      formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }

    return date;
  }

  const handleEdit = opt => {
    if (active === opt) {
      return setActive('');
    }
    return setActive(opt);
  };

  const handleUpdate = () => {
    const [d, m, y] = formik?.values.date_of_birth?.split('/');
    const DOB = new Date(`${y}-${m}-${d}`);

    // const DOB = new Date(formik.values.date_of_birth);
    const payload = {
      ...formik.values,
      date_of_birth: formatDate(DOB, true),
      company_address: formik.values.company_address.toLowerCase(),
      address: formik.values.address.toLowerCase(),
      document_type: null,
      document_type: null,
      id_number: null,
      document: doc,
      country: 'Nigeria',
    };

    mutation.mutate(payload);
  };

  const isValid =
    !Object.values(formError).some(item => item) &&
    !!formik.values.gender &&
    !!formik.values.avatar &&
    !!formik.values.phone &&
    !!formik.values.middle_name &&
    !!formik.values.first_name &&
    !!formik.values.last_name &&
    !!formik.values.highest_education &&
    // !!formik.values.employment_status &&
    !!formik.values.address?.trim() &&
    !!formik.values.marital_status &&
    !!formik.values.address &&
    doc?.length &&
    !!formik.values.date_of_birth;
  //  &&
  // checked;

  return (
    <Box
      maxW="440px"
      w={{base: `100%`, lg: `440px`}}
      bg="matador_background.200"
      // maxH={'358px'}
      px={{base: `24px`, md: '40px'}}
      py="32px"
      borderRadius={5}
      {...rest}
      boxShadow={'0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)'}
    >
      {screen === `basicInfo` ? (
        <BasicRegistrationInfo formik={formik} setScreen={setScreen} />
      ) : screen === `moreInfo` ? (
        <MoreRegistrationInfo
          formik={formik}
          handleDate={handleDate}
          handleDocument={handleDocument}
          doc={doc}
          onAvatarChange={onAvatarChange}
          avatar={avatar}
          handleUpdate={handleUpdate}
          isValid={isValid}
          mutation={mutation}
        />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default RegisterForm;
