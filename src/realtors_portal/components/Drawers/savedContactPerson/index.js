import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Hide,
  Image,
  Show,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import ContactComponent from './ContactComponent';
import {Fragment, useEffect, useState} from 'react';
import {drawer_style} from '../../AgentLayout/drawers/drawer_style';
import {EmptyState} from '../../common/Table';
import {BsPerson} from 'react-icons/bs';

export const ContactPersonDrawer = ({modalDisclosure, contactPerson, btnRef}) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);
  return (
    <Drawer
      isOpen={modalDisclosure.isOpen}
      placement={screenWidth <= 992 ? 'bottom' : 'right'}
      onClose={modalDisclosure.onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay bg="rgba(0,0,0,0.1)" />
      <DrawerContent
        {...drawer_style}
        minH={{base: `200px`}}
        maxH={{base: '35vh', lg: `100%`}}
        p="0px"
        pb={{base: '20px', lg: '0px'}}
        borderRadius={{base: '12.9px 12.9px 0px 0px', lg: '0px'}}
      >
        <HStack
          boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.05), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
          // mb="20px"
          py="12px"
          px="29px"
          justify="space-between"
          align="center"
          bg={{base: 'transparent', lg: '#F5F5F5'}}
          position="relative"
        >
          <Text fontSize="20px" fontWeight={600} color="#191919">
            Contact Persons
          </Text>

          <HStack spacing="15px">
            <VStack
              position="relative"
              justify="center"
              align="center"
              w="30px"
              h="30px"
              borderRadius="5px"
              transition="0.3s ease-in-out"
              _hover={{
                width: '30px',
                height: '30px',
              }}
            >
              <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
            </VStack>
          </HStack>
        </HStack>

        <DrawerBody p="20px 24px">
          {contactPerson?.length ? (
            <Stack divider={<StackDivider my="10px" borderColor="#f5f5f5" />}>
              {contactPerson.map((item, idx) => (
                <Fragment key={idx}>
                  <ContactComponent contactObj={item} />
                </Fragment>
              ))}
            </Stack>
          ) : (
            <>
              <EmptyState
                emptyIcon={<BsPerson fontSize={`32px`} />}
                description="No contact Available"
                p={{base: '24px', md: '52px'}}
                bg="#fff"
                borderRadius="9px"
              />
            </>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
