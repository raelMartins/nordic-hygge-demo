/* eslint-disable react/jsx-key */
import {
  VStack,
  HStack,
  Text,
  useToast,
  Flex,
  Center,
  Stack,
  useMediaQuery,
  DrawerCloseButton,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {useQuery} from 'react-query';
import {useRef, useState} from 'react';
import {formatToCurrency} from '/src/utils';
import {Spinner} from '/src/ui-lib';
import {Drawer, DrawerOverlay, DrawerContent, Box} from '@chakra-ui/react';
import {ArrowBackIcon, ArrowForwardIcon, CloseIcon} from '@chakra-ui/icons';
import {fetchWatchlist} from '../../api/watchlist';
import EmptyState from '../appState/empty-state';
import ErrorState from '../appState/error-state';
import Image from 'next/image';
import {drawer_styles, drawer_title_styles} from '../navbar/Navbar';
import {EquityCard} from '../cards/EquityCard';
import {ResponsivePopup, ResponsivePopupCloseButton, ResponsivePopupContent} from '@/ui-lib';
import {useCustomToast} from '../CustomToast';
import ThreeDots from '../loaders/ThreeDots';
import {Footer} from '../page_layout/footer';

export const Watchlist = ({isWatchOpen, onWatchClose, onDrawerOpen}) => {
  const router = useRouter();
  const toast = useCustomToast();
  const [scrollPosition1, setScrollPosition1] = useState(0);
  const {data, isError, isLoading} = useQuery(['waitlistipoiid'], fetchWatchlist);
  const dataToUse = data?.data?.watchlist;
  const readScollToRef1 = useRef();

  const handleMostReadScroll = scrollAmount => {
    const newScrollPosition = scrollPosition1 + scrollAmount;
    setScrollPosition1(newScrollPosition);
    readScollToRef1.current.scrollLeft = newScrollPosition;
  };

  if (data?.code === 'ERR_NETWORK') {
    toast({
      title: `${data?.message}`,
      description: ` please check your network connection`,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  }

  const [isNotMobile] = useMediaQuery('(min-width: 768px)');
  const drawerHeight = dataToUse?.length > 2 ? '600px' : '430px';

  const handleManageWatchs = equity => {
    onWatchClose();
    router.push(`/listing-details/${equity?.project?.id}`);
  };

  return (
    <ResponsivePopup
      autoFocus={false}
      placement="right"
      scrollBehavior="inside"
      isOpen={isWatchOpen}
      onClose={onWatchClose}
    >
      {/* {isNotMobile && <ResponsivePopupOverlay />} */}
      <ResponsivePopupContent {...drawer_styles}>
        <ResponsivePopupCloseButton />
        <Flex {...drawer_title_styles}>
          <Text>Watchlist</Text>
        </Flex>

        {isLoading ? (
          <Center w="full" h="300px">
            {/* <Spinner disableAbsoluteCenteredSpinner h={{base: `50px`}} w={{base: `50px`}} /> */}
            <ThreeDots />
          </Center>
        ) : isError ? (
          <ErrorState />
        ) : (
          <Box px={3} mt={{base: '10px', md: '15px'}} h="full" overflowY="auto">
            {dataToUse?.length > 0 ? (
              <>
                <Stack
                  scrollBehavior={'smooth'}
                  className="hide_scroll"
                  ref={readScollToRef1}
                  id="assetsWrap"
                >
                  <Stack gap={`20px`} alignItems={'center'}>
                    {(dataToUse || [])?.map((equity, idx) => (
                      <EquityCard
                        key={idx}
                        equity={equity}
                        handleClick={() => handleManageWatchs(equity)}
                      />
                    ))}
                  </Stack>
                </Stack>
              </>
            ) : (
              <Stack h={`100%`}>
                <EmptyState
                  icon
                  textSize={12}
                  headerStyle={{textTransform: 'uppercase', fontWeight: 700, fontSize: '14px'}}
                  height={{base: '300px', md: '400px'}}
                  minH={{base: '300px', md: '400px'}}
                  text={`Looks like you haven't added anything to watchlist yet.`}
                />
                <Footer
                  mt={`auto`}
                  isDrawer
                  position={`absolute`}
                  bottom={`0px`}
                  left={`0px`}
                  right={`0px`}
                />
              </Stack>
            )}
          </Box>
        )}
      </ResponsivePopupContent>
    </ResponsivePopup>
  );
};

export default Watchlist;
