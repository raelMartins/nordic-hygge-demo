/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import AgentsLayoutView from '@/realtors_portal/components/AgentLayout/View';
import {Heading, HStack, Stack, useToast} from '@chakra-ui/react';
import ProfileUpdate from '@/realtors_portal/components/settings/ProfileUpdate';
import UpdateBankDetails from '@/realtors_portal/components/settings/UpdateBankDetails';
import {useQuery} from 'react-query';
import {fetchAgentSettingsInfo} from '@/realtors_portal/api/agents';
import router from 'next/router';
import useGetSession from '@/utils/hooks/getSession';
import {GoBack} from '@/realtors_portal/components/assets/BackArrow';

export const Settings = () => {
  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;
  const handleBack = () => {
    return router.back();
  };

  const toast = useToast();

  const SETTINGS_INFO = useQuery(
    ['agents_settings_data'],

    () => fetchAgentSettingsInfo(agentToken, storeName)
  );

  if (SETTINGS_INFO?.isError) {
    toast({
      title: 'Oops ...',
      description: `${
        SETTINGS_INFO?.error?.response?.data?.message ??
        SETTINGS_INFO?.error?.response?.message ??
        SETTINGS_INFO?.error?.message ??
        'Something went wrong'
      }`,
      status: 'error',
      duration: 8000,
      isClosable: true,
      position: 'top-right',
    });
  }

  return (
    <AgentsLayoutView isLoading={SETTINGS_INFO?.isLoading} isError={SETTINGS_INFO?.isError}>
      <Stack gap={{base: `20px`}}>
        <HStack py={{base: `16px`, lg: `32px`}} pb={{base: `0px`, lg: `32px`}}>
          <GoBack text="Settings" />
          <Heading
            display={{base: `block`, lg: `none`}}
            color={`#000`}
            fontSize={{base: `28px`, lg: `19px`}}
            fontWeight={`600`}
            lineHeight={`130%`}
          >
            Profile
          </Heading>
        </HStack>
        <ProfileUpdate
          Data={SETTINGS_INFO.data?.data?.message?.user}
          refetch={SETTINGS_INFO.refetch}
        />

        <UpdateBankDetails
          bank={SETTINGS_INFO.data?.data?.message?.banks[0]}
          refetch={SETTINGS_INFO.refetch}
        />
      </Stack>
    </AgentsLayoutView>
  );
};

export default Settings;
