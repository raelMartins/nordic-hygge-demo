import {
  Box,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {SearchIcon} from '@chakra-ui/icons';

import users_icon from '@/realtors_portal/images/icons/contact_icon.svg';
import request_icon from '@/realtors_portal/images/icons/request_icon.svg';
import users_icon_dark from '@/realtors_portal/images/icons/users_icon_dark.svg';
import listing_icon from '@/realtors_portal/images/icons/listings_icon.png';
import listing_icon_dark from '@/realtors_portal/images/icons/listings_icon_dark.svg';
import request_icon_dark from '@/realtors_portal/images/icons/request_icon_dark.svg';
import {navbar_height} from './View';
import {NavSearchIcon} from './assets/NavbarSvgs';

const dashboardTabs = [
  {
    iconSrc: listing_icon, //listing_icon,
    linkText: 'Listings',
    component: <Text>Listings</Text>,
    slug: `listings`,
    dark_iconSrc: listing_icon_dark, //listing_icon_dark,
  },
  {
    iconSrc: users_icon,
    linkText: 'Referrals',
    component: <Text>Subscribers</Text>,
    slug: `users`,
    dark_iconSrc: users_icon_dark,
  },

  {
    iconSrc: request_icon,
    linkText: 'Request',
    component: <Text>Request</Text>,
    slug: `request`,
    dark_iconSrc: request_icon_dark,
  },
];

export function AgentsLayoutNavigation() {
  const router = useRouter();
  const [showProgress, setShowProgress] = useState(false);

  const activePage = router.pathname?.split('/')[2];

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
    <Box h={{base: '0px', lg: 'fit-content'}} color="#191919" mt={{base: '-55px', lg: '0px'}}>
      <Stack spacing={4} alignItems={'center'} justify="center" w="100%" mx="auto">
        <Box
          bg="#FFF"
          px="43.5px"
          // boxShadow="0px 4px 8px 0px rgba(0, 0, 0, 0.02)"
          boxShadow="0px 2px 32px 6px rgba(0, 0, 0, 0.08)"
          py={`4px`}
          display={{base: 'none', md: 'none', lg: 'flex'}}
          w={`100%`}
        >
          <HStack
            align="center"
            justifyContent="space-between"
            w="full"
            maxW={`1500px`}
            mx={`auto`}
          >
            {dashboardTabs.map((link, index) => {
              const isActive = activePage === link?.slug;
              return (
                <Box key={index} flex={`1`}>
                  <HStack
                    borderRadius="8px"
                    onClick={() => router.push(`/agents/${link.slug}`)}
                    // bg={isActive ? '#FAFAFA' : 'transparent'}
                    bg={isActive ? '#f5f5f5' : 'transparent'}
                    // border={`1px solid`}
                    border={`none`}
                    borderColor={isActive ? `#E4E4E7` : `transparent`}
                    cursor={`pointer`}
                    // p={`7px 33px`}
                    p={`8px 16px`}
                    fontSize="14px"
                    color={isActive ? '#191919' : '#606060'}
                    fontWeight={isActive ? 600 : 400}
                    maxW={`185px`}
                    mx={`auto`}
                    w={`100%`}
                    justify={`center`}
                  >
                    <Image
                      alt=""
                      alignSelf="center"
                      boxSize={'20px'}
                      src={isActive ? link.dark_iconSrc.src : link.iconSrc.src}
                      mr="5px"
                    />
                    <Text>{link.linkText}</Text>
                  </HStack>
                </Box>
              );
            })}
            <InputGroup alignItems="center" maxW="320px">
              <InputLeftElement>
                <NavSearchIcon boxSize="12px" color="#919191" cursor="pointer" ml={`0px`} />
              </InputLeftElement>
              <Input
                type="search"
                color="#919191"
                background="#FAFAFA"
                borderRadius="8px"
                fontSize="12px"
                _placeholder={{
                  color: '#a1a1a1',
                  opacity: `1`,
                  fontSize: `12px`,
                }}
                p={'16px'}
                pl={`32px`}
                placeholder="Search... properties, subscribers here"
                border={`1px solid`}
                borderColor={`#E4E4E7 !important`}
                w={`100%`}
              />
            </InputGroup>
          </HStack>
        </Box>
        {showProgress && (
          <Progress
            w="full"
            size="xs"
            left={'0'}
            colorScheme="gray"
            top={navbar_height}
            position="fixed"
            isIndeterminate
            zIndex={'1'}
          />
        )}
      </Stack>
    </Box>
  );
}
