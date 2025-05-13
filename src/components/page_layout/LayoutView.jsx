import {Box, Center, Progress, Stack, useTheme} from '@chakra-ui/react';
import {Navbar} from '../navbar';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {Footer} from './footer';
import {FullFooter} from './footer/FullFooter';
import ErrorState from '../appState/error-state';
import {WhatsappSupport} from '../properties/WhatsappSupport';
import ThreeDots from '../loaders/ThreeDots';
import {FullScreenPreRequisites} from '../fullScreenPrerequisites/FullScreenPrerequisites';
import Head from 'next/head';
import useGetSession from '@/utils/hooks/getSession';
import {capitalizeString} from '@/utils/misc';

export const LayoutView = ({
  children,
  noPadding,
  navBarStyle,
  activePage,
  noFooter,
  noNavbar,
  fullFooter,
  isLoading,
  isError,
  error,
  metaData = {title: ``, image: ``, description: ``},
  ...rest
}) => {
  const router = useRouter();
  const theme = useTheme();
  const [showProgress, setShowProgress] = useState(false);
  const {sessionData: store_data} = useGetSession('store_data');

  useEffect(() => {
    document.body.style.background = `${theme?.colors?.matador_background?.[`100`]}`;

    var css = `
      html { 
        background: ${theme?.colors?.matador_background?.[`100`]};
      } 
      *::-webkit-scrollbar {
        width: 10px;
      }
      *::-webkit-scrollbar-thumb {
        border: 2px solid rgba(0, 0, 0, 0);
        background-clip: padding-box;
        border-radius: 9999px;
        background-color: ${theme?.colors?.matador_form?.label};
      };
      `,
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

    head.appendChild(style);

    // style.type = 'text/css';
    if (style.styleSheet) {
      // This is required for IE8 and below.
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }, []);

  useEffect(() => {
    router?.events?.on('routeChangeStart', url => {
      setShowProgress(true);
    });
    router?.events?.on('routeChangeComplete', url => {
      setShowProgress(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        {/* Basic */}
        {metaData?.title && (
          <title>{capitalizeString(`${metaData?.title} | ${store_data?.store_name}`)}</title>
        )}
        {metaData?.description && <meta name="description" content={metaData?.description} />}

        {/* Open Graph Meta Tags */}
        {metaData?.title && (
          <meta
            property="og:title"
            content={capitalizeString(`${metaData?.title} | ${store_data?.store_name}`)}
          />
        )}
        {metaData?.description && (
          <meta property="og:description" content={metaData?.description} />
        )}
        <meta
          property="og:image"
          content={
            metaData?.image?.photo ||
            metaData?.image?.original ||
            metaData?.image ||
            store_data?.company_image
          }
        />
        <meta property="og:site_name" content={store_data?.store_name} />

        {/* Twitter Meta Tags */}
        {metaData?.title && (
          <meta
            name="twitter:title"
            content={capitalizeString(`${metaData?.title} | ${store_data?.store_name}`)}
          />
        )}
        {metaData?.description && (
          <meta name="twitter:description" content={metaData?.description} />
        )}
        <meta
          name="twitter:image"
          content={
            metaData?.image?.photo ||
            metaData?.image?.photo?.[0] ||
            metaData?.image?.original ||
            metaData?.image ||
            store_data?.company_image
          }
        />
        <meta name="twitter:image:alt" content={`Image of ${store_data?.store_name}`} />
        <meta name="twitter:site" content={`@${store_data?.store_name}`} />
        <meta name="twitter:card" content={'summary_large_image'} />
      </Head>
      <FullScreenPreRequisites>
        <Stack
          bg="matador_background.200"
          h={'100%'}
          w={`100%`}
          maxW={`1800px`}
          mx={`auto`}
          minH="100vh"
          minInlineSize={'fit-content'}
          justify="space-between"
          color={`text`}
          gap={`0px`}
          position="relative"
          {...rest}
        >
          {showProgress && (
            <Progress
              w="full"
              variant={`main_store`}
              size="xs"
              left={'0'}
              top={`0px`}
              position="fixed"
              isIndeterminate
              zIndex={'10'}
              bg={`transparent`}
            />
          )}
          <WhatsappSupport />
          {!noNavbar && <Navbar navBarStyle={navBarStyle} activePage={activePage} />}
          <Box
            flex={1}
            h="full"
            w={'100%'}
            px={noPadding ? '0' : {base: '20px', lg: '100px'}}
            mt={`0px !important `}
            maxW={`1800px`}
            pb={noPadding ? '0' : {base: `20px`, lg: `60px`}}
          >
            {isLoading ? (
              <Center minH={`100vh`}>
                <ThreeDots height={{base: `12px`, lg: `18px`}} width={{base: `12px`, lg: `18px`}} />
              </Center>
            ) : isError ? (
              <ErrorState
                text={`${
                  error?.response?.status === 500
                    ? "Apologies for the inconvenience. We're working on it. Please try again later."
                    : error?.response?.status === 401
                    ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
                    : error?.response?.data?.message ??
                      error?.response?.message ??
                      error?.message ??
                      'Something went wrong'
                }`}
              />
            ) : (
              children
            )}
          </Box>
          {!noFooter && <>{fullFooter ? <FullFooter /> : <Footer />}</>}
        </Stack>
      </FullScreenPreRequisites>
    </>
  );
};

export default LayoutView;
