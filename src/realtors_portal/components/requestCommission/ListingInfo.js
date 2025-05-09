/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {fetchAllListingBundleid} from '@/realtors_portal/api/agents';
import {useQuery} from 'react-query';
import {Button, Center, Menu, MenuButton, MenuItem, MenuList, Spinner} from '@chakra-ui/react';
import useGetSession from '@/utils/hooks/getSession';
import {BiCaretDown} from 'react-icons/bi';

export default function ListingInfo({listing, listingId, formik, ...rest}) {
  const [Unit, setUnit] = useState('');

  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

  const {data, isError, isLoading} = useQuery(
    ['allbundlesAgent', listingId, agentToken, storeName],
    () => fetchAllListingBundleid(listingId, agentToken, storeName),
    {
      enabled: !!listingId,
    }
  );

  useEffect(() => {
    formik.setValues({...formik.values, bundle_id: ''});
  }, [listingId]);

  return (
    <Menu matchWidth>
      <MenuButton
        bg={'white'}
        border={'1px solid #E4E4E4'}
        as={Button}
        rightIcon={<BiCaretDown />}
        w={'full'}
        _active={{
          opacity: '1',
        }}
        textAlign={'left'}
        justifyContent={'flex-start'}
        color={'#606060'}
        fontWeight={400}
        _hover={{bg: '#fff'}}
        {...rest}
      >
        {Unit || `Select`}
      </MenuButton>
      <MenuList h={`300px`} overflow={`auto`}>
        {isLoading ? (
          <Center h="70px">
            <Spinner color="black" />{' '}
          </Center>
        ) : !listingId ? (
          <MenuItem isDisabled>Please select a listing first</MenuItem>
        ) : isError ? (
          <MenuItem isDisabled>An error occured while loading</MenuItem>
        ) : data.data.results.length ? (
          data.data.results.map((unit, num) => (
            <MenuItem
              key={num}
              value={Number(`${unit.id}`)}
              onClick={e => {
                formik.setFieldValue('bundle_id', e.target.value);
                setUnit(unit.unit_title);
              }}
            >
              {unit.unit_title}
            </MenuItem>
          ))
        ) : (
          <MenuItem isDisabled>no available listing</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}
