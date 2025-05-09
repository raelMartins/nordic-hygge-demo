import {Flex, Text, HStack, useDisclosure, Center, Image} from '@chakra-ui/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useQuery} from 'react-query';
import {storeDetails} from '../../api/auth';
import {LIGHT} from '../../constants/names';
import {ChevronLeftIcon} from '@chakra-ui/icons';
import {getSettingsData} from '../../api/Settings';
import {appCurrentTheme} from '../../utils/localStorage';
import ProfileMenu from './profile_menu';
import {Notification} from '../notification_drawer';
import {Wallet} from '../wallet_drawer';
import Feedback from '../feedback/feedback';
import {ReportBug} from '../report_bug';
import {SuggestIdea} from '../suggest_idea';
import {MyAssets} from '../my_asset';
import {Watchlist} from '../watchlist_drawer';
import {Button} from '../../ui-lib';
import useGetSession from '@/utils/hooks/getSession';
import {GoBell} from 'react-icons/go';

export const drawer_styles = {
  top: {base: 'unset !important', lg: '24px !important'},
  right: {base: '0', lg: '24px !important'},
  bottom: {base: '0', lg: 'unset !important'},
  maxW: {md: '400px'},
  h: {base: `100%`, lg: '725px'},
  bg: 'matador_background.200',
  boxShadow: {base: 'none', lg: 'md'},
  p: `0px`,
  pb: `10px`,
  borderRadius: {base: `0px`, lg: `5px`},
  overflow: `hidden`,
  color: `text`,
  marginTop: `0px`,
};

export const drawer_title_styles = {
  w: 'full',
  justify: 'space-between',
  align: 'center',
  background: `matador_background.100`,
  borderBottom: `1px solid`,
  borderColor: `matador_border_color.100 !important`,
  p: `20px 16px`,
  fontSize: '19px',
  fontWeight: 500,
  className: 'heading-text-regular',
  color: 'matador_text.100',
  lineHeight: `130%`,
};

export const Navbar = ({handleGetStarted}) => {
  const {sessionData: LoggedinUser, fetching} = useGetSession('loggedIn');
  const settingsQuery = useQuery(
    ['getSettingsData', 'profile'],
    () => getSettingsData({profile: true}),
    {
      enabled: !!LoggedinUser,
    }
  );
  const avatar = settingsQuery?.data?.data?.data?.avatar;

  const STOREINFO = useQuery(['storeInfo'], storeDetails);
  const store_data = STOREINFO.data?.data?.data;

  const TERMS = store_data?.customer_document;
  const PRIVACY_POLICY = store_data?.customer_privacy_policy;
  const wallet_features = store_data?.wallet_features;

  const useLightItems = appCurrentTheme !== LIGHT;

  const router = useRouter();
  const {isOpen: isNotOpen, onOpen: onNotOpen, onClose: onNotClose} = useDisclosure();
  const {isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose} = useDisclosure();
  const feedBackModal = useDisclosure();
  const reportBugModal = useDisclosure();
  const suggestModal = useDisclosure();
  const portfolioDisclosure = useDisclosure();
  const walletDisclosure = useDisclosure();
  const watchlistDisclosure = useDisclosure();

  return (
    <>
      <Flex
        w="full"
        p={{base: `32px 24px`, lg: '12px 80px'}}
        zIndex={100}
        alignItems={'center'}
        justify={'space-between'}
        background={`linear-gradient(180deg, rgba(0, 0, 0, 0.25) 33.02%, rgba(0, 0, 0, 0) 100%)`}
        position={`absolute`}
        top={`0px`}
      >
        {fetching ? (
          <></>
        ) : LoggedinUser ? (
          <>
            <Center
              as={Link}
              href={LoggedinUser ? '/properties' : '/'}
              display={{
                base:
                  router.pathname === '/' || router.pathname === '/properties' ? `flex` : `none`,
                lg: `flex`,
              }}
            >
              <HStack gap={'20px'}>
                <Center w={`auto`} maxW="177px" h="46px" position={`relative`} overflow={`hidden`}>
                  {store_data?.company_image && (
                    <Image
                      src={store_data?.company_image}
                      alt={'Company Image'}
                      fill
                      style={{objectFit: `contain`, height: `100%`}}
                    />
                  )}
                </Center>
              </HStack>
            </Center>

            <Flex
              cursor={'pointer'}
              onClick={() => router.back()}
              display={{
                base:
                  router.pathname === '/' || router.pathname === '/properties' ? `none` : `flex`,
                lg: `none`,
              }}
            >
              <ChevronLeftIcon fontSize={'38px'} color={'#fff'} />
            </Flex>

            <HStack gap={`32px`}>
              <Center
                position={`relative`}
                fontSize={`24px`}
                color={`#ffffff`}
                onClick={onNotOpen}
                cursor={`pointer`}
              >
                <GoBell />
                {/* <Center
                  position={`absolute`}
                  top={`-7.5px`}
                  right={`-7.5px`}
                  bg={`red`}
                  borderRadius={`10px`}
                  // p={`2px`}
                  h={`20px`}
                  minW={`20px`}
                  p={`4px`}
                >
                  <Text fontSize={`12px`} fontWeight={`600`} lineHeight={`140%`} m={`0px`}>
                    1
                  </Text>
                </Center> */}
              </Center>

              <ProfileMenu
                TERMS={TERMS}
                PRIVACY_POLICY={PRIVACY_POLICY}
                avatar={avatar}
                suggestModal={suggestModal}
                reportBugModal={reportBugModal}
                feedBackModal={feedBackModal}
                LoggedinUser={LoggedinUser}
                useLightItems={useLightItems}
                about_us_link={store_data?.about_us}
                portfolioDisclosure={portfolioDisclosure}
                walletDisclosure={walletDisclosure}
                watchlistDisclosure={watchlistDisclosure}
                wallet_features={wallet_features}
                store_data={store_data}
              />
            </HStack>
            <Notification
              onDrawerOpen={onDrawerOpen}
              isNotOpen={isNotOpen}
              onNotClose={onNotClose}
            />
            <Wallet
              onDrawerOpen={onDrawerOpen}
              avatar={avatar}
              isWalOpen={walletDisclosure?.isOpen}
              onWalClose={walletDisclosure?.onClose}
            />
            <Feedback onDrawerOpen={onDrawerOpen} feedModal={feedBackModal} user={LoggedinUser} />
            <ReportBug
              onDrawerOpen={onDrawerOpen}
              reportBugModal={reportBugModal}
              user={LoggedinUser}
            />
            <SuggestIdea
              onDrawerOpen={onDrawerOpen}
              suggestModal={suggestModal}
              user={LoggedinUser}
            />
            <MyAssets
              onDrawerOpen={onDrawerOpen}
              isAssetOpen={portfolioDisclosure?.isOpen}
              onAssetClose={portfolioDisclosure?.onClose}
            />
            <Watchlist
              onDrawerOpen={onDrawerOpen}
              isWatchOpen={watchlistDisclosure?.isOpen}
              onWatchClose={watchlistDisclosure?.onClose}
            />
          </>
        ) : (
          <>
            <Link href={LoggedinUser ? '/properties' : '/'}>
              <HStack gap={'20px'}>
                <Center w={`auto`} maxW="177px" h="46px" position={`relative`} overflow={`hidden`}>
                  {store_data?.company_image && (
                    <Image
                      src={store_data?.company_image}
                      alt={'Company Image'}
                      fill
                      style={{objectFit: `contain`, height: `100%`}}
                    />
                  )}
                </Center>
              </HStack>
            </Link>
            <Flex justify="center" align="center" gap={'45px'}>
              <Flex align={'center'} justify={'center'} gap={`42px`}>
                {store_data?.about_us && (
                  <Text
                    as={Link}
                    href={store_data.about_us}
                    target="_blank"
                    rel="noopener norefferer"
                    cursor="pointer"
                    fontSize={{base: `12px`, lg: '16px'}}
                    textTransform={'uppercase'}
                    fontWeight={`400`}
                    color={`#fff`}
                    lineHeight={`140%`}
                    w={`max-content`}
                  >
                    About Us
                  </Text>
                )}
              </Flex>
              <Button
                variation={`primary`}
                fontSize={{base: `10px`, lg: `16px`}}
                fontWeight={`600`}
                lineHeight={`140%`}
                letterSpacing={`0.48px`}
                textTransform={`uppercase`}
                onClick={handleGetStarted}
                p={{base: `12px 20px`, lg: `9px 28px`}}
                boxStyle={{padding: `4px 8px`}}
              >
                Get Started
              </Button>
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
};

export default Navbar;
