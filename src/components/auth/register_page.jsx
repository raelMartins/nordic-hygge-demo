import React, {useState} from 'react';
import {Center, Flex, Modal, ModalOverlay} from '@chakra-ui/react';
import GetStarted from './sections/getStarted';
import SuccessLink from './sections/successLink';
import RegisterForm from './sections/registerForm';
import ThankYou from './sections/thankYou';
import {storeDetails} from '../../api/auth';
import {useQuery} from 'react-query';
import {useEffect} from 'react';
import {GetStartedForm} from './login_page/getStartedForm';
import {SuccessContent} from './login_page/successContent';
import RegisterPageForm from './login_page/registerPageForm';
import HowYouHeardSection from './login_page/howYouHeardSection';

const RegisterPage = () => {
  const [page, setPage] = useState('get_started');
  const [email, setEmail] = useState('olamide@gmail.com');

  const STOREINFO = useQuery(['storeInfo'], storeDetails);
  const business_id = STOREINFO.data?.data?.business;

  const page_steps = {
    get_started: <GetStartedForm setEmail={setEmail} setPage={setPage} />,
    success_link: <SuccessContent email={email} setEmail={setEmail} setPage={setPage} />,
    register: <RegisterPageForm email={email} setEmail={setEmail} setPage={setPage} />,
    how_you_heard: <HowYouHeardSection email={email} setEmail={setEmail} setPage={setPage} />,
  }[page];

  useEffect(() => {
    localStorage.setItem('businessId', JSON.stringify(business_id));
  }, [STOREINFO.data]);

  console.log({email, page});

  return (
    <>
      <Flex
        minH={'85vh'}
        p="25px"
        // backgroundColor={
        //   page === 'get_started' || page === 'success_link' ? '#ffffff' : ''
        // }
        bg="#ffffff"
      >
        <Flex maxW={'380px'} width={'100%'} mx={'auto'}>
          {page_steps}
        </Flex>
      </Flex>
    </>
  );
};

export default RegisterPage;
