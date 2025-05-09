import {
  Button,
  Center,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from '@chakra-ui/react';
import {BiCaretDown} from 'react-icons/bi';

const MenuForListings = ({
  err,
  listings,
  isLoading,
  setListingId,
  setListingName,
  listingName,
  ...rest
}) => {
  return (
    <Menu matchWidth>
      <MenuButton
        as={Button}
        rightIcon={<BiCaretDown />}
        w={'full'}
        textAlign={'left'}
        justifyContent={'flex-start'}
        color={'#606060'}
        fontWeight={400}
        variation={`tertiary`}
        bg={`transparent`}
        border={`1px solid`}
        borderColor="#e4e4e7 !important"
        {...rest}
      >
        {listingName ? listingName : 'Select'}
      </MenuButton>
      <MenuList h={`300px`} overflow={`auto`}>
        {isLoading ? (
          <Center h="70px">
            <Spinner />
          </Center>
        ) : err ? (
          <MenuItem isDisabled>An error occured while loading</MenuItem>
        ) : listings.length > 0 ? (
          listings.map((unit, num) => (
            <MenuItem
              key={num}
              onClick={() => {
                setListingId(unit?.id);
                setListingName(unit?.name);
              }}
            >
              <Image
                boxSize="2rem"
                borderRadius="full"
                src={unit.photos[0]?.photo}
                alt="listing"
                mr="12px"
              />
              <span>{unit?.name}</span>
            </MenuItem>
          ))
        ) : (
          <MenuItem isDisabled>no available listing</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default MenuForListings;
