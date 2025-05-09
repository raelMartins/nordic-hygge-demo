import React, {useEffect} from 'react';
import {toastForError} from '@/realtors_portal/utils/toastForErrors';
import {VerifyTokenAgents} from '@/realtors_portal/api/auth';
import {useRouter} from 'next/router';
import {Center, useToast} from '@chakra-ui/react';
import {useMutation} from 'react-query';
import {setSession} from '@/utils/sessionmanagers';
import {OvalLoader} from '@/realtors_portal/components/loaders/AnimatedLoader';
import useGetSession from '@/utils/hooks/getSession';
export const Agents = ({magic}) => {
  const toast = useToast();
  const router = useRouter();

  const {sessionData: LoggedInAgent} = useGetSession('a_details');

  const {mutate: verified} = useMutation(magic => VerifyTokenAgents(magic), {
    onSuccess: res => {
      if (res?.status !== 200) {
        toastForError(res, true, toast);
        router.push('/agents/auth/login');
        location.assign('/agents/auth/login');
      } else {
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const {owner, store_name} = res?.data?.store;

        const {email, first_name, last_name, avatar, initial_status, sign_up_time, id, agent_id} =
          res?.data?.user;

        const userDetails = {
          email,
          first_name,
          last_name,
          avatar,
          initial_status,
          sign_up_time,
          id,
          agent_id,
          storeName: store_name,
          companyName: owner?.company_name,
        };

        setSession(res?.data?.user_tokens?.token, 'a_token', expires);
        setSession(userDetails, 'a_details', expires);
        location.assign('/agents/listings');
      }
    },
    onError: err => {
      toastForError(err, true, toast);
      router.push('/agents/auth/login');
      location.assign('/agents/auth/login');
    },
  });

  useEffect(() => {
    if (LoggedInAgent) {
      location.assign('/agents/listings');
    } else if (magic) {
      verified({
        token: magic,
      });
    } else {
      router.push('/agents/auth/login');
    }
  }, [magic]);

  return (
    <Center h="100vh" w="100%">
      <OvalLoader />
    </Center>
  );
};
export default Agents;

export async function getServerSideProps(context) {
  const {query} = context;
  const magic = query.magic;

  return {
    props: {
      magic: magic ? `${magic}` : null,
    },
  };
}
