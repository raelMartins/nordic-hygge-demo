import {Image, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure} from '@chakra-ui/react';

import {RemoveBankDetails} from './RemoveBankDetails';
import {RxDotsVertical} from 'react-icons/rx';

export const BankActionMenu = ({refetch, id}) => {
  const {
    isOpen: removeBankIsopen,
    onClose: removeBankOnclose,
    onOpen: removeBankOnpen,
  } = useDisclosure();

  return (
    <Menu closeOnSelect>
      <MenuButton aria-label="Options" variant="outline">
        <RxDotsVertical fontSize={`24px`} />
      </MenuButton>
      <MenuList borderRadius={'16px'}>
        <MenuItem onClick={() => removeBankOnpen()}>
          <Text
            fontWeight="400"
            fontSize="16px"
            lineHeight="20px"
            textAlign="center"
            color="#3D3D3D"
            p={'10px'}
          >
            Remove
          </Text>
          <RemoveBankDetails
            isOpen={removeBankIsopen}
            onClose={removeBankOnclose}
            refetch={refetch}
            id={id}
          />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
