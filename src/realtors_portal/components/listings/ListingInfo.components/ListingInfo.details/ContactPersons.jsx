import {Center, Flex, Image, Stack, Text, useDisclosure} from '@chakra-ui/react';
import React, {Fragment, useRef} from 'react';
import {FaCaretRight} from 'react-icons/fa';
import callIcon from '@/realtors_portal/images/icons/call-icon.svg';
import {ContactPersonDrawer} from '@/realtors_portal/components/Drawers/savedContactPerson';

export const ContactPersons = ({contactPerson}) => {
  const ContactPersonsModal = useDisclosure();
  const btnRef = useRef();

  return (
    <Fragment>
      <Flex
        px={{base: 6, lg: '20px'}}
        pr={{base: 6, lg: '20px'}}
        mt={{base: 4, lg: '46px'}}
        h={{lg: '101px'}}
        w={`100%`}
        maxW={{base: `100%`, lg: '370px'}}
        align="center"
        gap={{base: '8px', lg: `24px`}}
        borderRadius={{base: `7px`, lg: '12px'}}
        border={{base: `none`, lg: '1px solid #e5e5e5'}}
        bg={{base: `#F2F4F7`, lg: `transparent`}}
        py={{base: 6, lg: 0}}
        mx={{base: 4, lg: 0}}
        mb={{base: 4, lg: 0}}
      >
        <Center
          h={{base: `16px`, lg: `48px`}}
          w={{base: `16px`, lg: `48px`}}
          minH={{base: `16px`, lg: `48px`}}
          minW={{base: `16px`, lg: `48px`}}
        >
          <Image alt="" src={callIcon.src} fill objectFit={`contain`} />
        </Center>
        <Stack
          w="full"
          flexDirection={{base: `row`, lg: `column`}}
          alignItems={{base: `center`, lg: `flex-start`}}
          justifyContent={`space-between`}
        >
          <Text fontWeight="500" fontSize={{base: `14px`, lg: '24px'}} color="#191919">
            Contact Persons
          </Text>
          <Text
            cursor="pointer"
            display="flex"
            fontSize="14px"
            fontWeight={500}
            color="#4545FE"
            onClick={ContactPersonsModal.onOpen}
          >
            View
            <FaCaretRight style={{marginTop: '3px'}} fontSize="18px" color="#191919" />
          </Text>
        </Stack>
      </Flex>
      <ContactPersonDrawer
        modalDisclosure={ContactPersonsModal}
        btnRef={btnRef}
        contactPerson={contactPerson}
      />
    </Fragment>
  );
};

export default ContactPersons;
