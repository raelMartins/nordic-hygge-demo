import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {Box, Center} from '@chakra-ui/react';
import {verifyMagicToken} from '@/api/auth';
import {useQuery} from 'react-query';
import {Spinner} from '@/ui-lib';
import {setSession} from '@/utils/sessionmanagers';
import ThreeDots from '@/components/loaders/ThreeDots';

const Login = () => {
  const [err, setError] = useState(null);
  const router = useRouter();
  const {magic} = router.query;

  const magicQuery = useQuery(['verifyMagicToken', magic], () => verifyMagicToken({token: magic}), {
    onSuccess: res => {
      if (res?.data?.valid === 'true' || res?.data?.valid === true) {
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const {
          first_name,
          last_name,
          id,
          customer_ref,
          middle_name,
          user,
          date_of_birth,
          email,
          avatar,
        } = res?.data?.user;

        // include required user info
        const obj = {
          avatar,
          first_name,
          middle_name,
          last_name,
          id,
          email,
          date_of_birth,

          customer_ref,
          user: {id: user.id},
        };
        setSession(obj, 'loggedIn', expires);
        setSession(res?.data?.user_tokens?.token, 'token', expires);
        //   // window.location = `${window.location.origin}/properties`;
        // router.push('/properties');
        location.assign('/');
      } else {
        setError(res?.data?.message);
        setTimeout(() => router.push('/'), 3000);
      }
    },
    onError: err => {
      setError(err?.response?.data?.message || 'Opps, Something went wrong !');
      setTimeout(() => router.push('/'), 3000);
    },
    enabled: Boolean(magic),
  });

  return (
    <Box w="full" h="full">
      {magic && (
        <Box h={'100vh'} bg={`matador_background.100`}>
          {/*{magicQuery?.isLoading && (*/}
          <Center minH={`100vh`}>
            <ThreeDots height={{base: `12px`, lg: `18px`}} width={{base: `12px`, lg: `18px`}} />
          </Center>
          {/* )} */}
        </Box>
      )}
    </Box>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const {query} = context;

  if (!query.magic) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      query: query.magic,
    },
  };
}
