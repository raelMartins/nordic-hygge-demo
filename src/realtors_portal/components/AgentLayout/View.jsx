/* eslint-disable @next/next/no-page-custom-font */
import {
  Box,
  Center,
  Flex,
  HStack,
  ScaleFade,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Head from 'next/head';
import {AgentsLayoutNavbar} from './Navbar';
import {AgentsLayoutNavigation} from './Navigation';

import {useRouter} from 'next/router';
import {useQuery} from 'react-query';
import {storeDetails} from '@/realtors_portal/api/auth';

import SupportMenu from '@/realtors_portal/components/support/SupportMenu';
import useGetSession from '@/utils/hooks/getSession';
import {getLocalStorageData} from '@/constants/routes';
import {Spinner} from '../loaders/AnimatedLoader';
import {toastForError} from '@/realtors_portal/utils/toastForErrors';
import {useEffect} from 'react';
import Link from 'next/link';

export const navbar_height = {base: `62px`, lg: '112px'};
export const view_height = {base: `calc(100vh - 62px)`, lg: 'calc(100vh - 112px)'};

export const AgentsLayoutView = ({
  isLoading,
  isError,
  error = {},
  noPadding = false,
  desktopXPadding = `80px`,
  mobileXPadding = `24px`,
  children,
  ...restProps
}) => {
  const router = useRouter();
  const toast = useToast();
  const {sessionData: LoggedInAgent, fetching} = useGetSession('a_details');
  const {sessionData: agentToken, fetching: fetchingToken} = useGetSession('a_token');

  const companyImage = getLocalStorageData('companyImage');
  const STOREINFO = useQuery(['storeInfo'], storeDetails, {enabled: !companyImage});
  const storeInfo = STOREINFO.data?.data?.data;
  const PRIVACY_POLICY = storeInfo?.agent_privacy_policy;
  const TERMS = storeInfo?.agent_document;

  const companyName = getLocalStorageData('businessName') || LoggedInAgent?.companyName;

  const {isOpen, onOpen, onClose} = useDisclosure();
  const isAuthPage = router.pathname.indexOf('auth') !== -1;

  const maxWidth = `1500px`;

  agentToken && toastForError(error, isError, toast);

  useEffect(() => {
    if (!fetchingToken && !agentToken) {
      location.assign(`/agents`);
      toastForError({response: {status: 401}}, true, toast);
    }
  }, [fetchingToken, agentToken]);

  return (
    <>
      <Head>
        <link rel="icon" href={companyImage ?? storeInfo?.company_image} />
        <title>Realtors Portal | {companyName}</title>
        <meta property="og:title" content={`Realtors Portal | ${companyName}`} key="title" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400..800&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.cdnfonts.com/css/euclid-circular-b" rel="stylesheet" />
      </Head>
      <Stack w="100%" minH="100vh" gap={`0px`} bg="#FBFCFC" fontFamily="Euclid Circular B">
        <Box position="fixed" zIndex={{base: `1401`, lg: `10`}} w="100%" top={`0px`} left={`0px`}>
          <AgentsLayoutNavbar company_image={companyImage ?? storeInfo?.company_image} />
          <AgentsLayoutNavigation />
        </Box>
        <Box
          marginTop={navbar_height}
          pb={{base: `40px`}}
          px={!noPadding && {base: mobileXPadding, lg: desktopXPadding}}
          mx="auto"
          maxW={{base: maxWidth}}
          w="100%"
          textAlign={'left'}
          {...restProps}
        >
          {isLoading ? (
            <Center h={{base: `50vh`, lg: '60vh'}} w="100%">
              <Spinner />
            </Center>
          ) : isError ? (
            <Center h="60vh" w="100%">
              <Text>Oops something went wrong</Text>
            </Center>
          ) : (
            <>
              {/* <ScaleFade key={router.route} initialScale={0.9} in="true">
              <Box position="fixed" top={navbar_height} height={view_height} overflow={`auto`}> */}
              {children}
              {/* </Box>
            </ScaleFade> */}
            </>
          )}
        </Box>
        <Flex
          px={{base: '20px', lg: '60px'}}
          py={`12px`}
          mt={`auto`}
          borderTop={`1px solid`}
          borderColor={`#e4e4e7`}
          justify={`space-between`}
          gap={`10px`}
          color={{base: `#71717A`}}
          fontSize={{base: `12px`, lg: `14px`}}
          fontWeight={{base: `400`}}
          lineHeight={{base: `150%`}}
          letterSpacing={{base: `0.26px`}}
        >
          <Link href={`https://www.myxellia.io`} target="_blank" rel="noopener noreferrer">
            Created with Myxellia.io
          </Link>
          <HStack gap={{base: '16px', md: '40px'}}>
            {TERMS && (
              <Link href={TERMS} target="_blank" rel="noopener noreferrer">
                Terms of Service
              </Link>
            )}
            {PRIVACY_POLICY && (
              <Link href={PRIVACY_POLICY} target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </Link>
            )}
          </HStack>
        </Flex>
      </Stack>
    </>
  );
};

export default AgentsLayoutView;
