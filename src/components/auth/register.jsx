import React, {useState} from 'react';
import {Box, Center, Flex, HStack, Image, Text, VStack} from '@chakra-ui/react';
import GetStarted from './sections/getStarted';
import SuccessLink from './sections/successLink';
import RegisterForm from './sections/registerForm';
import ThankYou from './sections/thankYou';
import {storeDetails} from '../../api/auth';
import {useQuery} from 'react-query';
import {useEffect} from 'react';
import {RiBuilding4Fill} from 'react-icons/ri';
import {SignInOptions} from './sections/signInOptions';
import {SignInWithLink} from './sections/signInWithLink';
import {VerifyEmail} from './sections/verifyEmail';
import {VerifyPhone} from './sections/verifyPhone';
import {CreatePassword} from './sections/createPassword';
import {HelpCenter} from './sections/helpCenter';
import {ResetPassword} from './sections/resetPassword';
import {ReportBug} from './sections/reportBug';
import {IoArrowBack, IoChevronBack} from 'react-icons/io5';

const button_style = {
  textTransform: 'uppercase',
  fontSize: `12px`,
  fontStyle: `normal`,
  fontWeight: `400`,
  lineHeight: `150%`,
  letterSpacing: `0.36px`,
  width: `100%`,
};

export const auth_button_style = {
  ...button_style,
  padding: `13.5px 18px`,
  color: `text`,
  background: `transparent`,
  border: `1px solid`,
  borderColor: `matador_border_color.200`,
  width: `100%`,
};

export const submit_button_style = {
  ...button_style,
  padding: `8px`,
  boxStyle: {padding: `6px 11px`, width: `100%`},
};

const Register = ({onAuthClose, authPage, ...rest}) => {
  const [page, setPage] = useState('signInOptions');
  const [pageHistory, setPageHistory] = useState([]);
  const [email, setEmail] = useState('');
  const [signInType, setSignInType] = useState('email_and_password');

  const STOREINFO = useQuery(['storeInfo'], storeDetails);
  const store_data = STOREINFO.data?.data?.data;
  const business_id = STOREINFO.data?.data?.business;

  useEffect(() => {
    localStorage.setItem('businessId', JSON.stringify(business_id));
  }, [STOREINFO.data]);

  const changePage = newPage => {
    setPageHistory([...pageHistory, page]);
    setPage(newPage);
    return;
  };

  const go_back = () => {
    const history = [...pageHistory];
    const lastPage = history.pop();
    setPageHistory([...history]);
    setPage(lastPage);
    return;
  };

  const authentication_screen = {
    signInOptions: (
      <SignInOptions setEmail={setEmail} changePage={changePage} setSignInType={setSignInType} />
    ),
    signInWithLink: <SignInWithLink setEmail={setEmail} changePage={changePage} />,
    getStarted: <GetStarted setEmail={setEmail} changePage={changePage} />,
    successLink: <SuccessLink email={email} />,
    verifyEmail: <VerifyEmail email={email} setEmail={setEmail} changePage={changePage} />,
    verifyPhone: <VerifyPhone email={email} setEmail={setEmail} changePage={changePage} />,
    createPassword: <CreatePassword email={email} setEmail={setEmail} changePage={changePage} />,
    register: (
      <RegisterForm
        email={email}
        setEmail={setEmail}
        changePage={changePage}
        signInType={signInType}
      />
    ),
    thankYou: (
      <ThankYou email={email} setEmail={setEmail} changePage={changePage} signInType={signInType} />
    ),
    helpCenter: <HelpCenter email={email} setEmail={setEmail} changePage={changePage} />,
    resetPassword: <ResetPassword email={email} setEmail={setEmail} changePage={changePage} />,
    reportABug: <ReportBug changePage={changePage} />,
  }[page];

  return (
    <Flex
      w="full"
      // h="full"
      justify={'flex-end'}
      px={{base: '1rem', md: `170px`}}
      py={`20px`}
      pt={{base: `40px`, md: `20px`}}
      align={{base: `flex-start`, md: 'center'}}
      className="sub-text-regular"
      zIndex={2}
    >
      <Flex
        flexDir={`column`}
        w={{base: `100%`}}
        gap={`40px`}
        align={{base: `center`, md: authPage ? `flex-end` : `center`}}
        justify={`center`}
        h={`100%`}
        {...rest}
      >
        <Box
          maxW="400px"
          w={{base: `100%`, lg: `400px`}}
          bg="matador_background.200"
          color={`text`}
          p={{base: `24px`}}
          // pt={{base: `46px`}}
          borderRadius={`6px`}
          boxShadow={
            '0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)'
          }
        >
          <HStack h={{base: `22px`}}>
            {pageHistory?.length > 0 && (
              <Center cursor={`pointer`} onClick={go_back}>
                <IoArrowBack fontSize={`20px`} />
              </Center>
            )}
          </HStack>
          {authentication_screen}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Register;
