import React from 'react';
import {VStack, Flex, Image, Text, useToast, ModalContent, Center} from '@chakra-ui/react';
import {themeStyles} from '../../../theme';
// import check from '../../../images/animated_icons/check-icon.gif';
import check from '../../../images/animated_icons/check-icon-black.gif';
import {useRouter} from 'next/router';
import {useMutation} from 'react-query';
import {AttemptLogin} from '../../../api/auth';
import {STORENAMEFROMDOMAIN, store_name} from '../../../constants/routes';
import {useCustomToast} from '@/components/CustomToast';

export const SuccessContent = ({email}) => {
  const toast = useCustomToast();
  const router = useRouter();

  // const storeName = STORENAMEFROMDOMAIN;
  const storeName = store_name();

  const {mutate, isLoading} = useMutation(formData => AttemptLogin(formData), {
    onSuccess: res => {
      if (
        res?.response?.data?.action === 'signup' ||
        res?.response?.data?.action === 'not_customer'
      ) {
        toast({
          title: `hmm...`,
          description: `${res?.response?.data?.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        // return router.push(`register`);
      } else if (res?.data?.action == 'login') {
        return toast({
          title: `A link was sent to ${email}`,
          description: 'please check your Email',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      } else if (res?.message === 'Network Error') {
        return toast({
          title: `${res?.message}`,
          description: 'please check your network connection',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      }
    },
    onError: err => {
      toast({
        title: 'An error occured',
        description: `${err?.response?.message ?? err?.message ?? err?.code ?? 'An error occured'}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleResend = () => {
    mutate({
      email: email,
      store_name: storeName,
    });
  };

  return (
    <Center
      h={'max-content'}
      w={'100%'}
      margin={'auto'}
      flexDir="column"
      justifyContent={'center'}
      alignContent="center"
      textAlign={'center'}
      bg="matador_background.200"
      borderRadius={'8px'}
      padding={'48px 15px'}
      border="1px solid #E4E4E4 !important"
      gap={'12px'}
    >
      <Image alt="next_image" src={check.src} h="100px" />

      <Text textAlign={'center'} fontWeight={600} fontSize={'20px'} lineHeight={'24.6px'}>
        Link Sent Successfully
      </Text>
      <Text textAlign={'center'} fontSize={'14px'} fontWeight={'300'} lineHeight={'17.75px'}>
        A link has been sent to your email address{' '}
        <Text as="span" color="#4545FE">
          {email}.{' '}
        </Text>
        Please check your inbox to confirm the link.
      </Text>
      <Text fontSize="12px" lineHeight={'15.22px'} fontWeight="300" mt="20px">
        Didn’t get any mail?{' '}
        <Text as="span" color="#932128" cursor="pointer" onClick={handleResend}>
          Resend link
        </Text>
      </Text>
      {/* </VStack> */}
    </Center>
  );
};
