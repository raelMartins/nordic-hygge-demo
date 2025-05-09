import {
  Box,
  Center,
  Divider,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {ReportABugDrawer} from './drawers/ReportABugDrawer';
import {MobileNavTab} from './MobileNavTab';
import {SuggestAnIdeaDrawer} from './drawers/SuggestIdeaDrawer';
import {FeedbackDrawer} from './drawers/FeedbackDrawer';
import {useQuery} from 'react-query';
import {fetchTermsAndConditionsPDF} from '@/realtors_portal/api/agents';
import mobile_logout_icon from '@/realtors_portal/images/icons/mobile_nav/mobile_logout_icon.svg';

import Wallet from './Wallet';

import request_icon from '@/realtors_portal/images/icons/request_icon.svg';
import mobile_listing_icon from '@/realtors_portal/images/icons/mobile_nav/mobile_listing_icon.svg';
import mobile_subscribers_icon from '@/realtors_portal/images/icons/mobile_nav/mobile_subscribers_icon.svg';
import mobile_wallet_icon from '@/realtors_portal/images/icons/mobile_nav/mobile_wallet_icon.svg';
import mobile_commission_request_icon from '@/realtors_portal/images/icons/mobile_nav/mobile_commission_request_icon.svg';

import mobile_report_bug_icon from '@/realtors_portal/images/icons/mobile_nav/mobile_report_bug_icon.svg';
import mobile_settings_icon from '@/realtors_portal/images/icons/mobile_nav/mobile_settings_icon.svg';
import mobile_share_link_icon from '@/realtors_portal/images/icons/mobile_nav/mobile_share_link_icon.svg';
import mobile_suggest_idea_icon from '@/realtors_portal/images/icons/mobile_nav/mobile_suggest_idea_icon.svg';
import mobile_feedback_icon from '@/realtors_portal/images/icons/mobile_nav/mobile_feedback_icon.svg';
import mobile_terms_icon from '@/realtors_portal/images/icons/mobile_nav/mobile_terms_icon.svg';
import {deleteCookies} from '@/utils/sessionmanagers';
import useGetSession from '@/utils/hooks/getSession';
import {CreateToast, UploadAgentPicture} from '@/realtors_portal/ui-lib';
import Link from 'next/link';
import {drawer_style} from './drawers/drawer_style';
import {ellipsize} from '@/realtors_portal/utils/ellipsize';
import {BiCopy} from 'react-icons/bi';

export default function MobileNavigation({
  mobileNavigationDrawer,
  commission_disclosure,
  share_disclosure,
  wallet_disclosure,
}) {
  const toaster = CreateToast();
  const {sessionData: agentInfo} = useGetSession('a_details');

  const baseUrl = window?.location?.origin;
  const agentId = agentInfo?.agent_id;
  const copy_link = () => {
    navigator?.clipboard?.writeText(`${baseUrl}/auth/login?ref_id=${agentId}`);
    toaster('Link copied!', {
      // position: 'top-right',
    });
  };

  const mobile_top_menu = [
    {
      iconSrc: mobile_listing_icon,
      linkText: 'Listings',
      name: 'Our Offerings',
    },
    {
      iconSrc: mobile_subscribers_icon,
      linkText: 'Referrals',
      name: 'Referrals',
    },
    {
      iconSrc: mobile_wallet_icon,
      linkText: 'Transactions',
      name: 'Transactions',
      component: (
        <MobileNavTab
          link={{iconSrc: mobile_wallet_icon, linkText: 'Transactions', name: 'Transactions'}}
          handleClick={() => {
            mobileNavigationDrawer?.onClose();
            wallet_disclosure?.onOpen();
          }}
        />
      ),
    },
    {
      iconSrc: mobile_commission_request_icon,
      linkText: 'Commission Request',
      name: 'Commission Request',
      component: (
        <MobileNavTab
          link={{
            iconSrc: mobile_commission_request_icon,
            linkText: 'Commission Request',
            name: 'Commission Request',
          }}
          handleClick={() => {
            mobileNavigationDrawer?.onClose();
            commission_disclosure?.onOpen();
          }}
        />
      ),
    },
    {
      iconSrc: request_icon,
      linkText: 'Request',
      name: 'Request History',
    },
  ];

  const mobile_sub_menus = [
    // {
    //   iconSrc: mobile_share_link_icon,
    //   linkText: 'Share Link',
    //   name: 'Share Link',
    //   component: (
    //     <MobileNavTab
    //       sub_menu
    //       link={{iconSrc: mobile_share_link_icon, linkText: 'Share Link', name: 'Share Link'}}
    //       handleClick={() => {
    //         mobileNavigationDrawer?.onClose();
    //         share_disclosure?.onOpen();
    //       }}
    //     />
    //   ),
    // },
    {
      iconSrc: mobile_settings_icon,
      linkText: 'settings',
      name: 'Settings',
    },
    {
      iconSrc: mobile_feedback_icon,
      linkText: 'Feedback',
      name: 'Feedback',
      component: (
        <FeedbackDrawer>
          <MobileNavTab
            sub_menu
            link={{iconSrc: mobile_feedback_icon, linkText: 'Feedback', name: 'Feedback'}}
          />
        </FeedbackDrawer>
      ),
    },

    {
      iconSrc: mobile_suggest_idea_icon,
      linkText: 'Suggest',
      name: 'Suggest an Idea',
      component: (
        <SuggestAnIdeaDrawer>
          <MobileNavTab
            sub_menu
            link={{iconSrc: mobile_suggest_idea_icon, linkText: 'Suggest', name: 'Suggest an Idea'}}
          />
        </SuggestAnIdeaDrawer>
      ),
    },
    {
      iconSrc: mobile_report_bug_icon,
      linkText: 'Report-bug',
      name: 'Report a Bug',
      component: (
        <ReportABugDrawer>
          <MobileNavTab
            sub_menu
            link={{iconSrc: mobile_report_bug_icon, linkText: 'Report-bug', name: 'Report a Bug'}}
          />
        </ReportABugDrawer>
      ),
    },
    {
      iconSrc: mobile_terms_icon,
      linkText: 'Terms',
      name: 'Terms of Service',
    },
  ];

  const router = useRouter();

  const TERMS_PDF = useQuery(['terms_conditions_pdf'], () => fetchTermsAndConditionsPDF());

  const handleNav = linkText => {
    if (linkText === 'Terms') {
      return window.open(TERMS_PDF?.data?.data?.message?.document);
    }
    const link = linkText.toLowerCase();
    // setTabIndex(dashboardNavs.indexOf(link));
    mobileNavigationDrawer?.onClose();
    return router.push(`/agents/${link === 'referrals' ? 'users' : link}`);
  };

  const {sessionData: user} = useGetSession('a_details');

  const handleLogout = () => {
    deleteCookies(['a_token', 'a_details']);

    router.push('/agents/auth/login');
    location.assign('/agents/auth/login');
  };

  return (
    <Drawer
      size="md"
      placement={'right'}
      onClose={mobileNavigationDrawer.onClose}
      isOpen={mobileNavigationDrawer.isOpen}

      // style={{position: 'fixed', height: '100vh', zIndex: 10500, top: 0, left: 0}}
    >
      <DrawerOverlay />
      <DrawerContent {...drawer_style}>
        <DrawerCloseButton />
        <Box p={`10px`}>
          <Stack
            justifyContent="space-between"
            mt="30px"
            divider={<StackDivider borderColor={`#e4e4e7 !important`} margin={`0px !important`} />}
            borderRadius={`8px`}
            border={`0.5px solid #E4E4E7`}
            background={`#FAFAFA`}
            p={`12px 16px`}
            gap={`8px`}
          >
            <HStack gap={`12px`} w={`100%`}>
              <UploadAgentPicture boxSize="56px" cameraSize="16px" />
              <Stack gap={`8px`}>
                <Text fontSize={`18px`} fontWeight={`600`} textTransform={`capitalize`}>
                  {user?.first_name} {user?.last_name}
                </Text>
                <Text
                  as={Link}
                  // href={`mailto:${user?.email}`}
                  href={`/agents/settings`}
                  color={`#4545FE`}
                  fontWeight={`400`}
                  fontSize={`14px`}
                >
                  {/* {user?.email} */}
                  View Profile
                </Text>
              </Stack>
            </HStack>
            <HStack
              onClick={copy_link}
              cursor={`pointer`}
              justify={`space-between`}
              w={`100%`}
              gap={`10px`}
            >
              <VStack align={`stretch`} gap={`0px`} py={`8px`}>
                <Text
                  color={{base: `#18181B`}}
                  fontSize={{base: `16px`}}
                  fontWeight={{base: `500`}}
                  lineHeight={{base: `140%`}}
                  letterSpacing={{base: `0.16px`}}
                >
                  Share link
                </Text>
                <Text
                  color={`#4545FE`}
                  fontSize={`13px`}
                  fontWeight={`400`}
                  lineHeight={`150%`}
                  letterSpacing={`0.26px`}
                >
                  {ellipsize(`${baseUrl}/auth/login?ref_id=${agentId}`, 35)}
                </Text>
              </VStack>
              <Center fontSize={`20px`}>
                <BiCopy />
              </Center>
            </HStack>
          </Stack>
        </Box>

        <VStack overflowY={'auto'} p={`16px`} alignItems={`stretch`} gap={`24px`}>
          <VStack width="100%" gap={`4px`} alignItems={'flex-start'}>
            {mobile_top_menu.map((link, index) =>
              link.component ? (
                link.component
              ) : (
                <MobileNavTab
                  key={index}
                  link={link}
                  handleClick={() => handleNav(link.linkText)}
                />
              )
            )}
            <Divider my={`7px`} border={`1px solid #EAECF0`} />
            {mobile_sub_menus.map((link, index) => {
              if (link.component) {
                return link.component;
              } else {
                return (
                  <MobileNavTab
                    sub_menu
                    key={index}
                    link={link}
                    handleClick={() => handleNav(link.linkText)}
                  />
                );
              }
            })}
            <MobileNavTab
              color="#FF6A6A"
              link={{iconSrc: mobile_logout_icon, linkText: 'Logout', name: 'Logout'}}
              handleClick={handleLogout}
            />
          </VStack>
        </VStack>
      </DrawerContent>
    </Drawer>
  );
}
