import React, {useState} from 'react';
import {Center, Flex, HStack, Image, Text, VStack} from '@chakra-ui/react';
import GetStarted from './sections/getStarted';
import SuccessLink from './sections/successLink';
import {storeDetails} from '/src/realtors_portal/api/auth';
import {useQuery} from 'react-query';
import {useEffect} from 'react';
import PendingApproval from './sections/pendingApproval';
import RegisterForm from './sections/registerForm';
// import RegisterForm from './sections/oldR/egisterForm';

const AgentRegister = ({onAuthClose, screen, ...rest}) => {
  const [page, setPage] = useState(screen || 'getStarted');
  const [email, setEmail] = useState('');

  const STOREINFO = useQuery(['storeInfo'], storeDetails);
  const store_data = STOREINFO.data?.data?.data;
  const business_id = STOREINFO.data?.data?.business;

  useEffect(() => {
    localStorage.setItem('businessId', JSON.stringify(business_id));
  }, [STOREINFO.data]);

  const authentication_screen = {
    getStarted: <GetStarted setEmail={setEmail} setPage={setPage} onAuthClose={onAuthClose} />,
    successLink: <SuccessLink email={email} setEmail={setEmail} setPage={setPage} />,
    pendingApproval: <PendingApproval />,
    registerForm: <RegisterForm email={email} setEmail={setEmail} setPage={setPage} />,
  }[page];

  return (
    <Flex
      w="full"
      h="full"
      justify={'flex-end'}
      px={{base: '1rem', md: `170px`}}
      py={`20px`}
      pt={{base: `120px`, lg: `20px`}}
      align={{base: `flex-start`, md: 'center'}}
      className="montserrat-regular"
      zIndex={2}
    >
      <Flex
        flexDir={`column`}
        w={`100%`}
        gap={`40px`}
        align={{base: `center`, md: 'flex-end'}}
        h={`100%`}
      >
        {authentication_screen}
      </Flex>
    </Flex>
  );
};

export default AgentRegister;
