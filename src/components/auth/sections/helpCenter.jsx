import {Button, FormInput} from '@/ui-lib';
import {Box, Flex, HStack, Stack, Text} from '@chakra-ui/react';
import {IoChevronForward} from 'react-icons/io5';
import {auth_button_style} from '../register';
import {useQuery} from 'react-query';
import {storeDetails} from '@/api/auth';

export const HelpCenter = ({changePage, ...rest}) => {
  const STOREINFO = useQuery(['storeInfo'], storeDetails);
  const store_data = STOREINFO.data?.data?.data;

  const open_contact_support = () => {
    if (!store_data?.whatsapp_url) return;
    window.open(store_data?.whatsapp_url);
  };

  return (
    <Flex h="full" direction="column" justify={'center'} align="center">
      <Text fontSize={'23px'} fontWeight={600} color="text" className="heading-text-regular">
        Help Center
      </Text>
      <Text
        color={`matador_text.400)`}
        textAlign={`center`}
        fontSize={`12px`}
        fontWeight={`500`}
        lineHeight={`140%`} /* 16.8px */
        letterSpacing={`0.12px`}
        mb={`15px`}
      >
        Do you need assistance? Don’t worry we can help you here.{' '}
      </Text>
      <Stack
        w={`100%`}
        gap={{base: `24px`, md: `16px`}}
        mt={`8px`}
        textAlign={`center`}
        align={`center`}
      >
        <Button {...auth_button_style} onClick={() => changePage('resetPassword')}>
          <HStack justify={`space-between`} w={`100%`}>
            <Text>Forgot Password?</Text>
            <IoChevronForward />
          </HStack>
        </Button>
        <Button {...auth_button_style} onClick={() => changePage('reportABug')}>
          <HStack justify={`space-between`} w={`100%`}>
            <Text>Spotted A Bug?</Text>
            <IoChevronForward />
          </HStack>
        </Button>
        <Button {...auth_button_style} onClick={open_contact_support}>
          <HStack justify={`space-between`} w={`100%`}>
            <Text>Contact Support</Text>
            <IoChevronForward />
          </HStack>
        </Button>
        {/* <Button {...auth_button_style} onClick={() => changePage('signInOptions')}>
          Go Back
        </Button> */}
      </Stack>
    </Flex>
  );
};
