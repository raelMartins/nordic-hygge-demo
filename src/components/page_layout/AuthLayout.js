// import auth_background from '/src/images/auth_background_mobile.png';
import {Box, Center, Flex, Image, Text, useMediaQuery, useTheme} from '@chakra-ui/react';
import React, {cloneElement, createElement, isValidElement, useEffect, useState} from 'react';
import {Spinner} from '@/ui-lib';
import {useRouter} from 'next/router';
import {Footer} from './footer';
import {Navbar} from '../navbar';
import Register from '../auth/register';
import AgentRegister from '@/realtors_portal/components/auth/agent_register';
import useGetSession from '@/utils/hooks/getSession';
import {storeDetails} from '@/api/auth';
import {useQuery} from 'react-query';

export function AuthLayout({
  agent,
  authPage,
  screen,
  disableClick = false,
  InnerComponent,
  children,
}) {
  const [loading, set_loading] = useState(false);
  const [clicked, set_clicked] = useState(authPage ? true : false);
  const [mount, set_mount] = useState(authPage ? true : false);
  const [isNotMobile] = useMediaQuery('(min-width: 992px)');
  const theme = useTheme();
  const router = useRouter();
  const {sessionData: LoggedinUser} = useGetSession('loggedIn');
  const STOREINFO = useQuery(['storeInfo'], storeDetails, {enabled: !!agent});
  const store_data = STOREINFO.data?.data?.data;

  const company_logo =
    store_data?.theme_mode === 'light' && store_data?.light_logo
      ? store_data?.light_logo
      : store_data?.theme_mode !== 'light' && store_data?.dark_logo
      ? store_data?.dark_logo
      : store_data?.company_image; //fixed deployment issue

  const handle_click = () => {
    if (authPage) return;
    // if (isNotMobile) {
    if (!clicked) {
      set_mount(true);
      setTimeout(() => {
        set_clicked(true);
      }, 50);
    } else {
      set_clicked(false);
      setTimeout(() => {
        set_mount(false);
      }, 600);
    }
    // } else if (clicked) {
    //   return;
    // } else {
    //   set_clicked(true);
    //   set_loading(true);
    //   set_mount(true);
    //   setTimeout(() => {
    //     set_loading(false);
    //   }, 600);
    // }
  };

  useEffect(() => {
    console.log(theme?.colors?.matador_background?.[`100`]);
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

  useEffect(() => {}, [router?.query]);

  return LoggedinUser && !agent && (children || InnerComponent) ? (
    InnerComponent ? (
      isValidElement(InnerComponent) ? (
        cloneElement(InnerComponent, {
          openAuth: handle_click,
        })
      ) : (
        children
      )
    ) : (
      children
    )
  ) : loading ? (
    <Center h={`100vh`}>
      <Spinner />
    </Center>
  ) : (
    <Flex
      w="full"
      minH="100vh"
      h={clicked ? `100vh` : `100%`}
      overflow={clicked ? `hidden` : `auto`}
      position={`relative`}
      direction={`column`}
      color={`matador_text.100`}
    >
      {!authPage && (
        <Box zIndex={`2001`} w={`100%`} maxW={`1800px`} mx={`auto`} position={`relative`}>
          {/* {agent ? null : !isNotMobile && clicked ? null : (
            <Navbar navBarStyle={{zIndex: `3`}} handleGetStarted={handle_click} />
          )} */}
          {agent ? null : <Navbar navBarStyle={{zIndex: `3`}} handleGetStarted={handle_click} />}
        </Box>
      )}

      {/* <Box position={`fixed`} bottom={`0px`} left={`0px`} right={`0px`} zIndex={`2001`}>
        <Footer
          bg={`matador_background.100`}
          opacity={`1`}
          zIndex={`2001`}
          w={`100%`}
          maxW={`1800px`}
          mx={`auto`}
        />
      </Box> */}
      {(mount || disableClick) && (
        <Flex
          position={'fixed'}
          alignItems={{lg: `center`}}
          justifyContent={{lg: `center`}}
          left={`0px`}
          top={`0px`}
          right={`0px`}
          bottom={`0px`}
          flexDir={`column`}
          // bgImage={authPage ? auth_background.src : {base: auth_background.src, lg: `none`}}
          // bgImage={authPage ? auth_background.src : {base: `none`}}  //allow popup auth effect on mobile
          bgImage={{base: `none`}}
          // bgColor={authPage ? `#ffffff` : {base: `#ffffff`, lg: `transparent`}}
          // bgColor={authPage ? `#ffffff` : {base: `transparent`}} //allow popup auth effect on mobile
          bgColor={authPage ? `matador_background.100` : {base: `transparent`}} //allow popup auth effect on mobile
          transition={`.5s`}
          opacity={clicked ? `1` : `0`}
          zIndex={`2000`}
        >
          <Box
            position={`absolute`}
            top={`0px`}
            left={`0px`}
            bottom={`0px`}
            right={`0px`}
            width={`100%`}
            height={`100%`}
            // bgColor={`matador_background.100`}
            bgColor={`rgba(0,0,0)`}
            // opacity={authPage ? `.95` : clicked ? {base: `.95`, lg: '.7'} : `0`}
            // opacity={authPage ? `.5` : clicked ? {base: `.3`, lg: '.3'} : `0`}
            opacity={authPage ? `0` : clicked ? {base: `.3`, lg: '.3'} : `0`}
            onClick={handle_click}
            transition={`.5s`}
            zIndex={`1`}
            cursor={!authPage ? `pointer` : `auto`}
          />
          {agent ? (
            <Box
              // w={`100%`}
              w={{base: `100%`, lg: `max-content`}}
              overflow={`auto`}
              my={{base: `15px`}}
              zIndex={`1`}
            >
              {company_logo && (
                <Center
                  position={`fixed`}
                  top={{base: `20px`, lg: `64px`}}
                  left={{base: `20px`, lg: `90px`}}
                  height={{base: `60px`}}
                  width={{base: `auto`}}
                  maxW={{base: `100px`}}
                  overflow={`hidden`}
                >
                  <Image
                    src={company_logo}
                    alt={`company_logo`}
                    fill
                    style={{objectFit: `cover`, height: `100%`}}
                  />
                </Center>
              )}
              <AgentRegister screen={screen} />
              <Box position={`fixed`} bottom={`0px`} left={`0px`} right={`0px`} zIndex={`2001`}>
                <Footer
                  agent
                  bg={`matador_background.100`}
                  opacity={`1`}
                  zIndex={`2001`}
                  w={`100%`}
                  maxW={`1800px`}
                  mx={`auto`}
                  py="12px"
                />
              </Box>
            </Box>
          ) : (
            <Box
              w={authPage ? `100%` : {base: `100%`, lg: `max-content`}}
              overflow={`auto`}
              // mt={{base: `0px`, md: `70px`}}
              my={{base: `70px`}}
            >
              <Register
                zIndex={disableClick && !clicked ? `0` : `1`}
                screen={screen}
                authPage={authPage}
              />
            </Box>
          )}
        </Flex>
      )}

      <Flex
        flex="1"
        h={`100%`}
        alignItems={{base: 'flex-start', md: `center`}}
        pointerEvents={disableClick ? `none` : `auto`}
      >
        {InnerComponent
          ? isValidElement(InnerComponent)
            ? cloneElement(InnerComponent, {
                openAuth: handle_click,
              })
            : children
          : children}
        {/* {children} */}
      </Flex>
    </Flex>
  );
}
