import {
  Avatar,
  AvatarGroup,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react';

export const CoOwners = ({propInfo, display}) => {
  return (
    <VStack display={display} width="auto" spacing="7px" align="left">
      <Text fontWeight="400" fontSize="12px" lineHeight="15px" textAlign="start" color="#606060">
        Co-owners
      </Text>
      <Menu>
        <MenuButton>
          <AvatarGroup size="sm" max={2}>
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
            <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
          </AvatarGroup>
        </MenuButton>
        <MenuList>
          <MenuItem _hover={{bg: 'transparent'}}>
            <HStack justifyContent="space-between" width="100%">
              <HStack>
                <Avatar size="xs" name="Ryan Florence" src="https://bit.ly/ryan-florence" />
                <Text fontSize="14px">Daniel Tanay</Text>
              </HStack>
              <Text fontSize="14px">20%</Text>
            </HStack>
          </MenuItem>
          <MenuItem _hover={{bg: 'transparent'}}>
            <HStack justifyContent="space-between" width="100%">
              <HStack>
                <Avatar size="xs" name="Ryan Florence" src="https://bit.ly/ryan-florence" />
                <Text fontSize="14px">Adam Smith</Text>
              </HStack>
              <Text fontSize="14px">40%</Text>
            </HStack>
          </MenuItem>
          <MenuItem _hover={{bg: 'transparent'}}>
            <HStack justifyContent="space-between" width="100%">
              <HStack>
                <Avatar size="xs" name="Ryan Florence" src="https://bit.ly/ryan-florence" />
                <Text fontSize="14px">John Howard</Text>
              </HStack>
              <Text fontSize="14px">10%</Text>
            </HStack>
          </MenuItem>
          <MenuItem _hover={{bg: 'transparent'}}>
            <HStack justifyContent="space-between" width="100%">
              <HStack>
                <Avatar size="xs" name="Mattew Tanay" src="https://bit.ly/ryan-florence" />
                <Text fontSize="14px">Mattew Tanay</Text>
              </HStack>
              <Text fontSize="14px">15%</Text>
            </HStack>
          </MenuItem>
          <MenuItem _hover={{bg: 'transparent'}}>
            <HStack justifyContent="space-between" width="100%">
              <HStack>
                <Avatar size="xs" name="Ryan Florence" src="https://bit.ly/ryan-florence" />
                <Text fontSize="14px">Ben Tanay</Text>
              </HStack>
              <Text fontSize="14px">5%</Text>
            </HStack>
          </MenuItem>
        </MenuList>
      </Menu>
    </VStack>
  );
};
