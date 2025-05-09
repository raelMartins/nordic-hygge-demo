import React from 'react';
import {
  Flex,
  Text,
  Center,
  HStack,
  Stack,
  Divider,
  useDisclosure,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {deleteCookies} from '@/utils/sessionmanagers';
import Image from 'next/image';
import {
  AboutIconPM,
  BugIconPM,
  FeedbackIconPM,
  FileIconPM,
  IdeaIconPM,
  PortfolioIconPM,
  SignoutIconPM,
  WalletIconPM,
  WatchlistIconPM,
} from './icons';
import {ResponsivePopup, ResponsivePopupCloseButton, ResponsivePopupContent} from '@/ui-lib';
import {drawer_styles} from '../Navbar';
import {BiMenu} from 'react-icons/bi';
import {PaymentAccess} from '@/components/payment/PaymentAccess';

export const ProfileMenu = ({
  feedBackModal,
  reportBugModal,
  suggestModal,
  LoggedinUser,
  avatar,
  TERMS,
  PRIVACY_POLICY,
  about_us_link,
  portfolioDisclosure,
  walletDisclosure,
  watchlistDisclosure,
  store_data,
}) => {
  const router = useRouter();
  const disclosure = useDisclosure();

  const handleSettings = () => {
    router.push('/settings');
  };
  const handleLogout = () => {
    deleteCookies(['token', 'loggedIn']);
    location.assign('/');
  };

  const handleAboutUs = () => {
    if (about_us_link) {
      window.open(about_us_link);
    }
  };

  const menu_item_style = {
    color: `matador_text.400`,
    fontSize: `20px`,
    fontStyle: `normal`,
    fontWeight: `500`,
    lineHeight: `140%`,
    letterSpacing: `0.4px`,
    gap: `8px`,
    w: `100%`,
    align: 'center',
    p: '12px 16px',
    bg: 'matador_background.200',
    cursor: `pointer`,
  };

  const handle_click = func => {
    return () => {
      disclosure?.onClose();
      func();
    };
  };

  return (
    <>
      <Center onClick={disclosure?.onOpen} cursor={`pointer`}>
        <Tooltip
          hasArrow
          label={
            <Stack gap={`0px`}>
              <Text fontSize={`14px`} textTransform={`uppercase`}>
                {store_data?.business_name}
              </Text>
              <Text fontSize={`15px`} textTransform={`capitalize`}>
                {LoggedinUser?.first_name} {LoggedinUser?.last_name}
              </Text>
              <Text fontSize={`12px`}>{LoggedinUser?.email}</Text>
            </Stack>
          }
          placement="left"
          bg="#333"
          color={`#fff`}
          padding={`12px`}
        >
          <Center
            pos={`relative`}
            boxSize={`36px`}
            borderRadius={`50%`}
            overflow={`hidden`}
            bg={`#fff`}
            display={{base: `none`, lg: `flex`}}
            color={`#141414`}
            textTransform={`uppercase`}
            fontWeight={`700`}
            fontSize={`13.5px`}
            transition={`.3s`}
            _hover={{outline: `5px solid #ffffff4d`}}
          >
            {LoggedinUser?.first_name?.split(``)[0]} {LoggedinUser?.last_name?.split(``)[0]}
          </Center>
        </Tooltip>
        <Center display={{base: `flex`, lg: `none`}}>
          <Icon as={BiMenu} color="#fff" fontSize={'30px'} />
        </Center>
      </Center>
      <ResponsivePopup
        autoFocus={false}
        scrollBehavior="inside"
        isOpen={disclosure?.isOpen}
        onClose={disclosure?.onClose}
        blockScrollOnMount={true}
        placement="right"
      >
        <ResponsivePopupContent
          {...drawer_styles}
          maxW={{base: `360px`, lg: `400px`}}
          h={{base: `100%`, lg: 'max-content'}}
          maxH={{base: `100%`, lg: `725px`}}
        >
          <ResponsivePopupCloseButton display={{base: `flex`, lg: `none`}} />
          <Stack
            bg="matador_background.200"
            gap={{base: '24px', lg: '5px'}}
            border={`none`}
            p={`16px`}
            minW={{base: `360px`}}
            overflowY={`auto`}
          >
            <Flex
              onClick={handleSettings}
              bg="matador_background.200"
              gap={`10px`}
              p={{base: `14px 16px`}}
              cursor={`pointer`}
            >
              <Center
                boxSize={`72px`}
                minW={`72px`}
                position="relative"
                borderRadius={`50%`}
                overflow={`hidden`}
              >
                {avatar ? (
                  <Image alt="profile_icon" src={avatar} fill style={{objectFit: `cover`}} />
                ) : (
                  <Text
                    color={`custom_color.contrast_pop`}
                    textTransform={`uppercase`}
                    fontWeight={`600`}
                    fontSize={`18px`}
                  >
                    {LoggedinUser?.first_name?.split(``)[0]} {LoggedinUser?.last_name?.split(``)[0]}
                  </Text>
                )}
              </Center>
              <Stack gap={`4px`}>
                <Text
                  textTransform={`uppercase`}
                  fontSize={`20px`}
                  fontWeight={`500`}
                  lineHeight={`130%`}
                >
                  {LoggedinUser?.first_name} {LoggedinUser?.last_name}
                </Text>
                <Text
                  fontSize={`14px`}
                  fontWeight={`400`}
                  lineHeight={`150%`}
                  letterSpacing={`0.42px`}
                  color={`matador_form.label`}
                >
                  {LoggedinUser?.email}
                </Text>
                <Text
                  fontSize={`14px`}
                  fontWeight={`400`}
                  lineHeight={`150%`}
                  letterSpacing={`0.42px`}
                  color={`custom_color.accent`}
                >
                  Manage Profile
                </Text>
              </Stack>
            </Flex>

            <Stack gap={{base: '24px', lg: '5px'}} overflowY={`auto`} flex={`1`}>
              <HStack {...menu_item_style} onClick={handle_click(portfolioDisclosure?.onOpen)}>
                <PortfolioIconPM />
                <Text>Portfolio</Text>
              </HStack>

              <PaymentAccess
                checkWallet
                content={
                  <HStack {...menu_item_style} onClick={handle_click(walletDisclosure?.onOpen)}>
                    <WalletIconPM />
                    <Text>Wallet</Text>
                  </HStack>
                }
              />

              <HStack {...menu_item_style} onClick={handle_click(watchlistDisclosure?.onOpen)}>
                <WatchlistIconPM />
                <Text>Watchlist</Text>
              </HStack>

              <Divider borderColor={`matador_border_color.100`} />

              <HStack {...menu_item_style} onClick={handle_click(feedBackModal?.onOpen)}>
                <FeedbackIconPM />
                <Text>Feedback</Text>
              </HStack>

              {/* about_us_link */}
              <HStack {...menu_item_style} onClick={handle_click(reportBugModal?.onOpen)}>
                <BugIconPM />
                <Text>Spotted a bug?</Text>
              </HStack>
              <HStack {...menu_item_style} onClick={handle_click(suggestModal?.onOpen)}>
                <IdeaIconPM />
                <Text>Help us improve!</Text>
              </HStack>
              {PRIVACY_POLICY && (
                <HStack
                  {...menu_item_style}
                  onClick={handle_click(() => window.open(`${PRIVACY_POLICY}`))}
                >
                  <FileIconPM />
                  <Text>Privacy Policy</Text>
                </HStack>
              )}
              {TERMS && (
                <HStack {...menu_item_style} onClick={handle_click(() => window.open(`${TERMS}`))}>
                  <FileIconPM />
                  <Text>Terms of Service</Text>
                </HStack>
              )}
              {about_us_link && (
                <HStack {...menu_item_style} onClick={handle_click(handleAboutUs)}>
                  <AboutIconPM />
                  <Text>About Us</Text>
                </HStack>
              )}
            </Stack>
            <HStack {...menu_item_style} onClick={handleLogout}>
              <SignoutIconPM />
              <Text color="#D92E33">Sign Out</Text>
            </HStack>
          </Stack>
        </ResponsivePopupContent>
      </ResponsivePopup>
    </>
  );
};

export default ProfileMenu;
