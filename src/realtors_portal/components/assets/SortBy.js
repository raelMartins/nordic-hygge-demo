import {
  Box,
  Button,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import sortByIcon from '/src/realtors_portal/images/icons/sort-by-icon.svg';
import sortIdentityIcon from '/src/realtors_portal/images/icons/sortByIdentifier.svg';

import React, {useState} from 'react';
import {useRouter} from 'next/router';

export const SortBy = ({
  sort_params = [],
  sortFor,
  defaultValue,
  tableDisplayOption,
  url,
  setUrl,
  display,
  hideText = false,
  ...rest
}) => {
  const sort_name = (url?.sort ?? url) || defaultValue;

  const router = useRouter();

  const handleSort = e => {
    if (sortFor === 'listing') {
      if (e.target.name === 'none') {
        setUrl({
          ...url,
          sort: '',
          param: `${url.filter && '?'}${url.filter}`,
        });
        router.push(`${router.route}${url.filter && '?'}${url.filter}`);
      } else {
        setUrl({
          ...url,
          sort: `${e.target.name.toLowerCase()}=true`,
          param: `?${e.target.name.toLowerCase()}=true${url.filter && '&'}${url.filter}`,
        });
        router.push(
          `${router.route}?${e.target.name.toLowerCase()}=true${url.filter && '&'}${url.filter}`
        );
      }
    }

    if (sortFor === 'manage_agent') {
      if (e.target.name === 'none') {
        setUrl({
          ...url,
          sort: '',
          param: `${url.filter && '?lower_filter=true&'}${url.filter}`,
        });
        router.push(
          `${router.route.replace('[id]', router?.query?.id ?? '')}${
            url.filter && '?lower_filter=true&'
          }${url.filter}`
        );
      } else {
        setUrl({
          ...url,
          sort: `sort=${e.target.name.toLowerCase()}`,
          param: `?${url.filter && 'lower_filter=true&'}sort=${e.target.name.toLowerCase()}${
            url.filter && '&'
          }${url.filter}`,
        });
        router.push(
          `${router.route.replace('[id]', router?.query?.id ?? '')}?${
            url.filter && 'lower_filter=true&'
          }sort=${e.target.name.toLowerCase()}${url.filter && '&'}${url.filter}`
        );
      }
    }

    if (sortFor === 'blacklist') {
      if (e.target.name === 'none') {
        setUrl({sort: '', param: `?blacklist=${tableDisplayOption}`});
        router.push(`${router.route}?blacklist=${tableDisplayOption}`);
      } else {
        setUrl({
          sort: `&sort=${e.target.name.toLowerCase()}`,
          param: `?blacklist=${tableDisplayOption}&sort=${e.target.name.toLowerCase()}`,
        });
        router.push(
          `${router.route}?blacklist=${tableDisplayOption}&sort=${e.target.name.toLowerCase()}`
        );
      }
    }

    if (sortFor === 'users') {
      if (e.target.name === 'none') {
        setUrl({
          ...url,
          sort: '',
          param: `${url.filter && 'lower_filter=true&'}${url.filter}`,
        });
        router.push(`${router.route}${url.filter && '?lower_filter=true&'}${url.filter}`);
      } else {
        setUrl({
          ...url,
          sort: `sort=${e.target.name.toLowerCase()}`,
          param: `${url.filter && 'lower_filter=true&'}sort=${e.target.name.toLowerCase()}${
            url.filter && '&'
          }${url.filter}`,
        });
        router.push(
          `${router.route}?${
            url.filter && 'lower_filter=true&'
          }sort=${e.target.name.toLowerCase()}${url.filter && '&'}${url.filter}`
        );
      }
    }

    if (sortFor === 'outstanding_balance') {
      if (e.target.name === 'none') {
        setUrl('');
        router.push(`${router.route}`);
      } else {
        setUrl(`?sort=${e.target.name.toLowerCase()}`);
        router.push(`${router.route}/?sort=${e.target.name.toLowerCase()}`);
      }
    }

    if (sortFor === 'outstanding_balance_id') {
      const query = router.query;
      query.sort = `${e.target.name.toLowerCase()}`;
      const param = `${Object.entries(query)
        .map(([name, value]) => {
          if (name === 'id') {
            return null;
          }
          if (name === 'sort') {
            return value === 'none' ? null : `${name}=${value}`;
          }
          return `${name}=${value}`;
        })
        .filter(item => item)
        .join('&')}`;
      if (e.target.name === 'none') {
        setUrl('');
        router.push(`${router.route.replace('[id]', router?.query?.id ?? '')}?${param}`);
      } else {
        setUrl(`sort=${e.target.name.toLowerCase()}`);
        router.push(`${router.route.replace('[id]', router?.query?.id ?? '')}?${param}`);
      }
    }

    if (sortFor === 'deposit_breakdown') {
      if (e.target.name === 'none') {
        setUrl('');
        router.push(`${router.route.replace('[id]', router?.query?.id ?? '')}`);
      } else {
        setUrl(`?sort=${e.target.name.toLowerCase()}`);
        router.push(
          `${router.route.replace(
            '[id]',
            router?.query?.id ?? ''
          )}/?sort=${e.target.name.toLowerCase()}`
        );
      }
    }
    if (sortFor === 'fractional') {
      if (e.target.name === 'none') {
        setUrl('');
        router.push(`${router.route.replace('[id]', router?.query?.id ?? '')}`);
      } else {
        setUrl(`?sort=${e.target.name.toLowerCase().replace('.', '')}`);
        router.push(
          `${router.route.replace(
            '[id]',
            router?.query?.id ?? ''
          )}/?sort=${e.target.name.toLowerCase()}`
        );
      }
    }
  };

  return (
    <Box display={display} {...rest}>
      <Menu autoSelect={false}>
        <MenuButton
          alignSelf="flex-end"
          bg="#ffffff"
          fontWeight="400"
          fontSize="14px"
          lineHeight="18px"
          color="#191919"
          width={hideText ? `max-content` : {md: '144px'}}
          height={hideText ? `max-content` : {md: '48px'}}
          p={hideText ? `10px` : {base: 4, md: 0}}
          border="1px solid #E0E0E0"
          borderRadius={hideText ? `8px` : {base: 'full', md: '12px'}}
        >
          <HStack justify="center" spacing="9px">
            <Image w="18px" h="18px" src={sortByIcon.src} alt="sort by icon" fontSize="10px" />{' '}
            {!hideText && <Text display={{base: 'none', md: 'flex'}}>Sort By</Text>}
          </HStack>
        </MenuButton>
        <MenuList
          position="relative"
          zIndex="2"
          p="20px"
          _focus={{
            boxShadow:
              '4px 4px 8px 0px rgba(123, 157, 157, 0.15), -4px -4px 8px 0px rgba(123, 157, 157, 0.15) !immportant',
          }}
          _active={{
            boxShadow:
              '4px 4px 8px 0px rgba(123, 157, 157, 0.15), -4px -4px 8px 0px rgba(123, 157, 157, 0.15) !immportant',
          }}
          _hover={{
            boxShadow:
              '4px 4px 8px 0px rgba(123, 157, 157, 0.15), -4px -4px 8px 0px rgba(123, 157, 157, 0.15) !immportant',
          }}
          boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.15), -4px -4px 8px 0px rgba(123, 157, 157, 0.15) !important"
          borderRadius="16px"
          border="1px solid #E4E4E4"
          bg="#ffffff"
        >
          {sort_params.map((item, idx) => {
            return (
              <MenuItem
                key={idx}
                as={Button}
                display="flex"
                gap="2px"
                justifyContent="start"
                _hover={{
                  bg: 'transparent',
                }}
                _focus={{
                  bg: 'transparent',
                }}
                _active={{
                  bg: 'transparent',
                }}
                onClick={handleSort}
                fontWeight="400"
                name={item.replace(/[-\s]/g, '_')}
                fontSize="14px"
                px="0px"
              >
                {' '}
                {item}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default SortBy;
