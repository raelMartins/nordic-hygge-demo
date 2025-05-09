import React from 'react';
import {Flex, Image, Text, useToast, Box, Stack, Center} from '@chakra-ui/react';
import check from '../../../images/successful-transaction.gif';
import check_web from '../../../images/done_green_check.gif';
import {useMutation} from 'react-query';
import {AttemptLogin} from '../../../api/auth';
import {STORENAMEFROMDOMAIN, store_name} from '../../../constants/routes';
import {useCustomToast} from '@/components/CustomToast';

const SuccessLink = ({email, ...rest}) => {
  const toast = useCustomToast();

  // const storeName = STORENAMEFROMDOMAIN;
  const storeName = store_name();

  const {mutate} = useMutation(formData => AttemptLogin(formData), {
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
    <Flex
      w="full"
      h="full"
      direction="column"
      justify={'center'}
      align="center"
      textAlign={'center'}
      gap={{base: `24px`, md: `12px`}}
    >
      <Center h={{base: `100px`, md: `150px`}} w={{base: `100px`, md: `150px`}}>
        {/* <Image alt="next_image" src={{base: check.src, md: check_web.src}} /> */}
        <Image alt="next_image" src={check_web.src} />
      </Center>
      <Stack gap={`7px`}>
        <Text
          color="text"
          textAlign={'center'}
          fontWeight={600}
          fontSize={{base: `23px`, md: '28px'}}
          className="heading-text-regular"
        >
          Link sent successfully
        </Text>
        <Text
          textAlign={'center'}
          fontSize={'13px'}
          mt="0px !important"
          fontWeight={`500`}
          color="matador_text.300"
          lineHeight={`135%`}
        >
          A link has been sent to
          {/* your email address */}
          <Text as="span" color="custom_color.color">
            {' '}
            {email}.{' '}
          </Text>
          {/* Please check your inbox to confirm the link. */}
          please check your email and click the link to confirm your email address
        </Text>
      </Stack>
      <Text
        fontSize={'13px'}
        fontWeight={`500`}
        color="matador_text.300"
        lineHeight={`135%`}
        mt={{md: `6px`}}
      >
        Didn’t get any mail?{' '}
        <Text as="span" color="custom_color.color" cursor="pointer" onClick={handleResend}>
          {' '}
          Resend link{' '}
        </Text>
      </Text>
    </Flex>
  );
};

export default SuccessLink;
