import {useRouter} from 'next/router';
import {HStack, Stack, Box, useToast, Flex} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import {fetchCustomerInfo} from '@/realtors_portal/api/agents';
import UserProperties from '@/realtors_portal/components/users/UserProperties';
import AgentsLayoutView, {navbar_height} from '@/realtors_portal/components/AgentLayout/View';
import User_profile_info from '@/realtors_portal/components/users/User_profile_info';
import {toastForError} from '@/realtors_portal/utils/toastForErrors';
import useGetSession from '@/utils/hooks/getSession';
import {GoBack} from '@/realtors_portal/components/assets/BackArrow';

export default function SingleCustomerPage() {
  const router = useRouter();
  const toast = useToast();
  const {id} = router?.query;
  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

  const {
    data: UniqueCustomer,
    isError,
    error,
    isLoading,
  } = useQuery(['customer-profile-id', id], () => fetchCustomerInfo(id, agentToken, storeName));

  toastForError(error, isError, toast);

  return (
    <AgentsLayoutView isLoading={isLoading} isError={isError} pt={{base: '0px', lg: '0px'}}>
      <Flex direction={{base: 'column', lg: 'row'}} gap={{base: `26px`}}>
        <Box position={{base: `static`, lg: 'sticky'}} top={navbar_height} h={`max-content`}>
          {/* <Box position={{base: `static`, lg: 'sticky'}} top={`0px`} h={`max-content`}> */}
          <HStack py={{base: `12px`, lg: `32px`}}>
            <GoBack text="Profile" />
          </HStack>
          <User_profile_info
            referral={UniqueCustomer?.data?.referred_by}
            customerInfo={UniqueCustomer?.data?.user_info}
          />
        </Box>
        <UserProperties id={id} customerInfo={UniqueCustomer?.data} />
      </Flex>
    </AgentsLayoutView>
  );
}
