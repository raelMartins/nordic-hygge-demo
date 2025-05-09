import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import {useRouter} from 'next/router';
import React from 'react';
import {fetchInspectionHistoryForAgents} from '/src/realtors_portal/api/agents';
import backArrow from '/src/realtors_portal/images/icons/back-arrow.png';

// import { LayoutView } from "/src/components";
// import { BackArrowWithText } from "/src/realtors_portal/components/assets/BackArrow";
// import { Spinner } from "/src/realtors_portal/components/loaders/AnimatedLoader";
import {InspectionDetails} from '/src/realtors_portal/components/inspection/InspectionDetails';
import PropertyProfileAside from './PropertyProfileAside';
import AgentsLayoutView from '/src/realtors_portal/components/AgentLayout/View';
import {OvalLoader} from '/src/realtors_portal/components/loaders/AnimatedLoader';

export const InspectionHistory = () => {
  const router = useRouter();
  const {id} = router.query;
  const [addedParam, setAddedParam] = React.useState('');

  const handleBack = () => {
    router.back();
  };

  const param = {addedParam, id};

  const toast = useToast();

  const {data, isLoading, isError, error} = useQuery(['inspectionHistoryagent', param], () =>
    fetchInspectionHistoryForAgents(param)
  );

  if (isError) {
    toast({
      title: 'Oops ...',
      description: `${
        error?.response?.data?.message ??
        error?.response?.message ??
        error?.message ??
        'Something went wrong,kindly check your network connection'
      }`,
      status: 'error',
      duration: 8000,
      isClosable: true,
      position: 'top-right',
    });
    return (
      <AgentsLayoutView activePage={'Users'}>
        <Box mt="20px">{/* <BackArrowWithText text="Back" /> */}</Box>
        <Text mt="50px">Oops something went wrong</Text>
      </AgentsLayoutView>
    );
  }
  return (
    <AgentsLayoutView activePage={'Users'}>
      <Box mt="20px">{/* <BackArrowWithText text="Back" /> */}</Box>
      <HStack zIndex={10}>
        <Image
          onClick={handleBack}
          style={{cursor: 'pointer'}}
          mr={2}
          boxSize="50px"
          src={backArrow.src}
          alt="back_arrow"
        />
        <Heading fontSize="20px" fontWeight="600">
          Back
        </Heading>
      </HStack>

      <VStack mt="23px" minH="80vh" w="full" pb="50px">
        {isLoading ? (
          <Center h="70vh" w="100%">
            <OvalLoader />
          </Center>
        ) : isError ? (
          <div></div>
        ) : (
          <HStack w="full" spacing="25px" align="start" justify="center">
            <PropertyProfileAside data={data.data.user} />

            <InspectionDetails
              sign_up={data.data.user}
              isLoading={isLoading}
              addedParam={addedParam}
              setAddedParam={setAddedParam}
              isError={isError}
              data={data.data.message}
            />
          </HStack>
        )}
      </VStack>
    </AgentsLayoutView>
  );
};

export default InspectionHistory;
