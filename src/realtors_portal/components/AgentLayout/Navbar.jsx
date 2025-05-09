import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Center,
  Text,
  Badge,
  Show,
  StackDivider,
} from '@chakra-ui/react';
import {HamburgerIcon} from '@chakra-ui/icons';
import {useRouter} from 'next/router';

import {ShareAgentLink} from '../ShareAgentLink';
import RequestCommission from '../requestCommission/RequestCommission';
import {useQuery} from 'react-query';
import Wallet from './Wallet';
import MobileNavigation from './MobileNavigation';
import {SuggestAnIdeaDrawer} from './drawers/SuggestIdeaDrawer';
import {FeedbackDrawer} from './drawers/FeedbackDrawer';
import {ReportABugDrawer} from './drawers/ReportABugDrawer';
import {deleteCookies} from '@/utils/sessionmanagers';
import useGetSession from '@/utils/hooks/getSession';
import {getLocalStorageData} from '@/constants/routes';
import Link from 'next/link';
import Image from 'next/image';
import {BiCaretDown} from 'react-icons/bi';
import {
  NavSettingsIcon,
  NavWalletIcon,
  PMFeedbackIcon,
  PMHelpCenterIcon,
  PMLogoutIcon,
  PMReportBugIcon,
  PMSuggestIdeaIcon,
} from './assets/NavbarSvgs';
import {RButton, UploadAgentPicture} from '@/realtors_portal/ui-lib';
import {storeDetails} from '@/realtors_portal/api/auth';
import {CommissionRequestIcon} from '../assets/UsefulSVGs';
import {FiShare2} from 'react-icons/fi';
import {LayoutNotifications} from './Notification';

export function AgentsLayoutNavbar({activePage, company_image}) {
  const router = useRouter();
  const MOBILE_NAVIGATION_DRAWER = useDisclosure();
  const commission_disclosure = useDisclosure();
  const share_disclosure = useDisclosure();
  const notif_mobile_disclosure = useDisclosure();
  const wallet_disclosure = useDisclosure();
  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');
  const storeName = LoggedInAgent?.storeName;
  const STOREINFO = useQuery(['storeInfo'], storeDetails);
  const store_data = STOREINFO.data?.data?.data;

  const PRIVACY_POLICY = store_data?.agent_privacy_policy;
  const TERMS = store_data?.agent_document;

  const SETTINGS_INFO = useQuery(['agent_data'], () =>
    fetchAgentSettingsInfo(agentToken, storeName)
  );

  const agent_data = SETTINGS_INFO.data?.data?.message?.user;
  console.log({store_data});
  const companyName = LoggedInAgent?.companyName || getLocalStorageData('businessName');

  const open_terms = () => {
    window.open(TERMS);
  };
  const open_privacy_policy = () => {
    window.open(PRIVACY_POLICY);
  };
  const open_help_center = () => {
    window.open(`https://veerge-support.myxellia.io`);
  };

  const handleLogout = () => {
    deleteCookies(['a_token', 'a_details']);
    router.push('/agents/auth/login');
    location.assign('/agents/auth/login');
  };

  const handleSettings = () => {
    router.push('/agents/settings');
  };

  return (
    <>
      <Stack>
        <Box bg={'#171923'} px={{base: '20px', lg: '60px'}} py={{base: `11px`, lg: '11px'}}>
          <Flex alignItems={'center'} justifyContent={'space-between'} gap="20px">
            <HStack spacing="8px" alignItems={'center'} flex={`1`}>
              {store_data?.dark_logo ? (
                <Center position={`relative`} width={`145px`} height={`32px`}>
                  <Image
                    src={store_data?.dark_logo}
                    alt={`storelogo`}
                    fill
                    style={{objectFit: `cover`}}
                  />
                </Center>
              ) : (
                <Text
                  as={Link}
                  href={`/agents`}
                  cursor={'pointer'}
                  lineHeight={'30px'}
                  fontFamily={'Syne'}
                  fontSize={{base: '20px', lg: '24px'}}
                  fontWeight={'400'}
                  textAlign={'left'}
                  color="#FFFFFF"
                  textTransform={'capitalize'}
                  _hover={{textDecoration: `none`}}
                  w={`max-content`}
                  noOfLines={1}
                >
                  {companyName || 'Realtors Portal'}
                </Text>
              )}
              {/* <Center position={`relative`} as={Link} href={`/agents`}>
                <ChakraImage
                  src={company_image}
                  height={{base: `24px`, lg: `40px`}}
                  w={`max-content`}
                  maxW={{base: `48px`, lg: `80px`}}
                  minW={`max-content`}
                />
              </Center> */}
            </HStack>
            <Flex align="center" justify={`space-between`} gap={`50px`} flex={{base: `0`, lg: `2`}}>
              <HStack
                gap="15px"
                alignItems={'center'}
                display={{base: 'none', md: 'none', lg: 'flex'}}
                flex={`1`}
              >
                {agent_data?.initial_status == 'Pending' && (
                  <Badge
                    borderRadius="md"
                    variant="outline"
                    mr={4}
                    px={3}
                    py={2}
                    colorScheme="yellow"
                  >
                    ACCOUNT PENDING
                  </Badge>
                )}
                <Button
                  ml="0"
                  borderRadius={'72px'}
                  h="100%"
                  p={`12px 25.5px`}
                  // w="139px"
                  w="max-content"
                  color="#FFFFFF"
                  onClick={() => {
                    share_disclosure?.onOpen();
                    MOBILE_NAVIGATION_DRAWER?.onClose;
                  }}
                  bg={'#4545FE'}
                  leftIcon={<FiShare2 fontSize={'18px'} />}
                  _hover={{opacity: `1`}}
                  _active={{opacity: `1`}}
                  _focus={{opacity: `1`}}
                  _focusVisible={{opacity: `1`}}
                  fontWeight="400"
                  fontSize={'14px'}
                >
                  Share link
                </Button>
                <RButton
                  variation={`tertiary`}
                  onClick={() => {
                    commission_disclosure?.onOpen();
                    MOBILE_NAVIGATION_DRAWER?.onClose;
                  }}
                  color={`#ffffff`}
                  borderColor={'#474747 !important'}
                  p={`10px 16px`}
                  leftIcon={<CommissionRequestIcon />}
                  fontWeight="400"
                  fontSize={'14px'}
                  letterSpacing={`0.16px`}
                  lineHeight={`100%`}
                  bg={`#18181B`}
                >
                  Commission Request
                </RButton>
              </HStack>
              <HStack gap="20px" align="center" ml={`autos`}>
                <Show above="lg">
                  <Center
                    position="relative"
                    h={{base: '24px', md: '35px'}}
                    w={{base: '24px', md: '35px'}}
                    minH={{base: '24px', md: '35px'}}
                    minW={{base: '24px', md: '35px'}}
                  >
                    <NavWalletIcon
                      cursor="pointer"
                      onClick={wallet_disclosure?.onOpen}
                      color={wallet_disclosure?.isOpen ? `#c2c2c2` : `#ffffff`}
                    />
                  </Center>
                </Show>
                <LayoutNotifications
                  notif_mobile_disclosure={notif_mobile_disclosure}
                  menu_disclosure={MOBILE_NAVIGATION_DRAWER}
                  closeOnOpen={() => {
                    commission_disclosure?.onClose();
                    share_disclosure?.onClose();
                  }}
                />
                <NavSettingsIcon
                  onClick={handleSettings}
                  cursor="pointer"
                  display={{base: 'none', md: 'none', lg: 'flex'}}
                />
                <Center>
                  <IconButton
                    size={'md'}
                    bg="transparent"
                    _focus={{bg: 'transparent'}}
                    icon={<HamburgerIcon color={'#fff'} height="23px" width={'23px'} />}
                    aria-label={'Open Menu'}
                    display={{lg: 'none'}}
                    _hover={{bg: 'transparent', color: '#fff'}}
                    onClick={
                      MOBILE_NAVIGATION_DRAWER.isOpen
                        ? MOBILE_NAVIGATION_DRAWER.onClose
                        : () => {
                            notif_mobile_disclosure?.onClose();
                            commission_disclosure?.onClose();
                            share_disclosure?.onClose();
                            MOBILE_NAVIGATION_DRAWER.onOpen();
                          }
                    }
                  />
                </Center>
              </HStack>
              <Flex alignItems={'center'} display={{base: 'none', md: 'none', lg: 'flex'}}>
                <Menu>
                  {({isOpen}) => (
                    <>
                      <MenuButton
                        color="#fff"
                        cursor={'pointer'}
                        textTransform={'capitalize'}
                        _active={{color: '#fff'}}
                      >
                        <HStack gap={'14px'}>
                          <Center
                            boxSize={`33px`}
                            minW={`33px`}
                            borderRadius={`50%`}
                            position="relative"
                            overflow={`hidden`}
                          >
                            <Image
                              borderRadius="full"
                              src={agent_data?.avatar}
                              fill
                              style={{objectFit: `cover`}}
                              alt=""
                            />
                          </Center>
                          <Text fontSize={`16px`} fontWeight="500" minW={`max-content`}>
                            {agent_data?.first_name} {agent_data?.last_name?.slice(0, 1)}
                          </Text>
                          <BiCaretDown
                            fontSize={`20px`}
                            style={
                              !isOpen
                                ? {transform: 'rotate(180deg)', transition: '.3s'}
                                : {transition: '.3s'}
                            }
                          />
                        </HStack>
                      </MenuButton>
                      <MenuList
                        alignItems={'center'}
                        p={`16px`}
                        w={`380px`}
                        color={`#27272A`}
                        fontWeight={500}
                        borderRadius={`8px`}
                        border={`1px solid`}
                        borderColor={`#e4e4e7 !important`}
                        boxShadow={`-4px -4px 8px 0px rgba(123, 157, 157, 0.15), 4px 4px 8px 0px rgba(123, 157, 157, 0.15) !important`}
                        zIndex={`2`}
                      >
                        <HStack
                          borderRadius={`8px`}
                          border={`0.5px solid #E4E4E7`}
                          background={`#FAFAFA`}
                          p={`16px 12px`}
                          gap={`12px`}
                          mb={`12px`}
                        >
                          <UploadAgentPicture boxSize="56px" cameraSize="16px" />
                          <Stack ga={`8px`}>
                            <Text fontSize={`18px`} fontWeight={`600`} textTransform={`capitalize`}>
                              {agent_data?.first_name} {agent_data?.last_name}
                            </Text>
                            <Text
                              as={Link}
                              href={`mailto:${agent_data?.email}`}
                              color={`#4545FE`}
                              fontWeight={`400`}
                              fontSize={`14px`}
                            >
                              {agent_data?.email}
                            </Text>
                          </Stack>
                        </HStack>
                        <Stack
                          gap={`12px`}
                          divider={
                            <StackDivider borderColor={`#e4e4e7 !important`} m={`0px !important`} />
                          }
                        >
                          <MenuItem bg={{base: `none`}} _hover={{bg: `transparent`}} p={`0px`}>
                            <FeedbackDrawer>
                              <HStack gap={`16px`} py={`12px`} fontWeight={`500`}>
                                <PMFeedbackIcon />
                                <Text>Feedback</Text>
                              </HStack>
                            </FeedbackDrawer>
                          </MenuItem>
                          <MenuItem bg={{base: `none`}} _hover={{bg: `transparent`}} p={`0px`}>
                            <SuggestAnIdeaDrawer>
                              <HStack gap={`16px`} py={`12px`} fontWeight={`500`}>
                                <PMSuggestIdeaIcon />
                                <Text>Suggest an idea</Text>
                              </HStack>
                            </SuggestAnIdeaDrawer>
                          </MenuItem>
                          <MenuItem bg={{base: `none`}} _hover={{bg: `transparent`}} p={`0px`}>
                            <ReportABugDrawer>
                              <HStack gap={`16px`} py={`12px`} fontWeight={`500`}>
                                <PMReportBugIcon />
                                <Text>Report a bug</Text>
                              </HStack>
                            </ReportABugDrawer>
                          </MenuItem>
                          {/* <MenuItem
                            onClick={open_help_center}
                            bg={{base: `none`}}
                            _hover={{bg: `transparent`}}
                            p={`0px`}
                          >
                            <HStack gap={`16px`} py={`12px`} fontWeight={`500`}>
                              <PMHelpCenterIcon />
                              <Text>Help center</Text>
                            </HStack>
                          </MenuItem> */}
                          {/* <MenuItem onClick={open_terms} bg={{base: `none`}}_hover={{bg: `transparent`}} p={`0px`}>
                            <HStack gap={`16px`} py={`12px`} fontWeight={`500`}>
                              <BsFileEarmarkPdf fontSize={`24px`} />

                              <Text>Terms of Service</Text>
                            </HStack>
                          </MenuItem>
                          <MenuItem onClick={open_privacy_policy} bg={{base: `none`}}_hover={{bg: `transparent`}} p={`0px`}>
                            <HStack gap={`16px`} py={`12px`} fontWeight={`500`}>
                              <BsFileEarmarkPdf fontSize={`24px`} />

                              <Text>Privacy Policy </Text>
                            </HStack>
                          </MenuItem> */}

                          <MenuItem
                            onClick={handleLogout}
                            bg={{base: `none`}}
                            _hover={{bg: `transparent`}}
                            p={`0px`}
                          >
                            <HStack gap={`16px`} py={`12px`} color={`#EF4444`}>
                              <PMLogoutIcon />
                              <Text>Logout</Text>
                            </HStack>
                          </MenuItem>
                        </Stack>
                      </MenuList>
                    </>
                  )}
                </Menu>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Stack>
      <MobileNavigation
        commission_disclosure={commission_disclosure}
        share_disclosure={share_disclosure}
        mobileNavigationDrawer={MOBILE_NAVIGATION_DRAWER}
        wallet_disclosure={wallet_disclosure}
        activePage={activePage}
      />
      <RequestCommission disclosure={commission_disclosure} />
      <ShareAgentLink disclosure={share_disclosure} />
      <Wallet WALLET_DRAWER={wallet_disclosure} />
    </>
  );
}
