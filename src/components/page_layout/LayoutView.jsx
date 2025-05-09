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
  ...rest
}) => {
  const router = useRouter();
  const theme = useTheme();
  const [showProgress, setShowProgress] = useState(false);

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
  );
};

export default LayoutView;
