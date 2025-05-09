import React, {useRef} from 'react';
import {Stack, Text, useToast} from '@chakra-ui/react';
import {Box} from '@chakra-ui/react';
import {MdClose} from 'react-icons/md';

export const CreateToast = () => {
  const toast = useToast();
  const toastIdRef = React.useRef();

  function close() {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  }

  function addToast(msg, options = {}) {
    toastIdRef.current = toast({
      position: 'bottom-right',
      duration: '3000',
      render: () => (
        <Box
          color="white"
          p={'20px'}
          bg="black"
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          pl={'40px'}
          pr={'25px'}
        >
          <Text color="#fff">{msg}</Text>
          <Box ml={'30px'}>
            <MdClose size={'20px'} onClick={close} cursor={'pointer'} />
          </Box>
        </Box>
      ),
      ...options,
    });
  }

  return addToast;
};

export const CustomToast = ({title, titleStyle = {}, description, background, ...rest}) => {
  const toastTextStyles = {
    textAlign: 'left',
    fontSize: '18px',
    color: ' #FFFFFF',
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 'normal',
    fontFamily: 'Segoe UI',
    py: 1,
  };
  return (
    <Box
      px={5}
      py={2}
      w="420px"
      color="white"
      h="fit-content"
      borderRadius="md"
      bg={background || '#344054'}
      {...rest}
    >
      {title ? (
        <Text {...toastTextStyles} style={titleStyle}>
          {title}
        </Text>
      ) : null}
      <Text
        {...toastTextStyles}
        fontSize={'14px'}
        fontWeight={'normal'}
        fontFamily={'Euclid Circular B'}
      >
        {description}
      </Text>
    </Box>
  );
};

export const displayToast = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const toast = useToast();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const toastIdRef = useRef();

  const renderToastObj = (variant, errMsg) => {
    switch (variant) {
      case 'error':
        return {
          title: 'Something went wrong',
          msg: `${
            errMsg?.response?.status === 500
              ? "Apologies for the inconvenience. We're working on it. Please try again later."
              : errMsg?.response?.status === 401
              ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
              : errMsg?.response?.data?.message ??
                errMsg?.response?.message ??
                errMsg?.message ??
                'Something went wrong'
          }`,
          primary: 'red.500',
        };
      case 'transaction':
        return {
          title: 'Transaction Successful!',

          primary: '#2F855A',
        };
      case 'sucess':
        return {
          text: 'Sucess:',

          primary: '#2F855A',
        };
      default:
        return {
          title: 'Transaction Successful!',

          primary: '#2F855A',
        };
    }
  };

  function close() {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  }

  function addToast({msg, title, errMsg, variant, ...rest}) {
    toastIdRef.current = toast({
      position: 'bottom-right',
      duration: '8000',
      containerStyle: {
        minWidth: '340px',
        maxWidth: 'fit-content',
      },

      render: () => (
        <Box
          color="white"
          p={'20px'}
          bg={renderToastObj(variant).primary}
          display={'flex'}
          alignItems={'center'}
          borderRadius="3.333px"
          justifyContent={'space-between'}
          w="full"
        >
          <Stack spacing="5.33px">
            <Text color="#fff" fontSize="16px" fontWeight="700">
              {title ?? renderToastObj(variant).title}
            </Text>
            <Text color="#fff" fontSize="14px" fontWeight="400">
              {msg ?? renderToastObj(variant, errMsg).msg}
            </Text>
          </Stack>
          <Box ml={'30px'}>
            <MdClose size={'20px'} onClick={close} cursor={'pointer'} />
          </Box>
        </Box>
      ),
      ...rest,
    });
  }

  return addToast;
};
