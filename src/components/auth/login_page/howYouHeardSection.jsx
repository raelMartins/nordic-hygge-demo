import React, {useState} from 'react';
import {Flex, VStack, Text, useToast, Select, Box, Image} from '@chakra-ui/react';
import {Button, FormTextarea} from '../../../ui-lib/ui-lib.components';
import {STORENAMEFROMDOMAIN, store_name} from '../../../constants/routes';
import {useMutation} from 'react-query';
import {AttemptLogin, outreach} from '../../../api/auth';
import justLogo from '../../../images/just-logo.svg';
import {themeStyles} from '../../../theme';
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from 'react-icons/md';
import {useCustomToast} from '@/components/CustomToast';

const HowYouHeardSection = ({setEmail, setPage, email, ...rest}) => {
  const toast = useCustomToast();
  const [select, setSelect] = useState(null);
  const [other, setOther] = useState(null);
  const [collapse, setCollapse] = useState(true);
  // const storeName = STORENAMEFROMDOMAIN;
  const storeName = store_name();

  console.log({email, select, storeName});

  const loginForRegister = useMutation(formData => AttemptLogin(formData), {
    onSuccess: res => {
      if (res?.response?.data?.action == 'signup') {
        formik.resetForm();
        setEmail(email);
        setPage('success_link');
      } else if (res?.data?.action == 'login') {
        setPage('success_link');
      } else {
        return toast({
          description: `${
            res?.response?.data?.message ??
            res?.response?.message ??
            res?.message ??
            'Something went wrong,we are working to resolve it'
          }`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      }
    },
    onError: err => {
      toast({
        title: `${err.response.data.resolve ?? 'Oops...'}`,
        description: `${err.message ?? err.response.data.message ?? err}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const {mutate, isLoading} = useMutation(
    () => {
      return outreach({
        outreach: select,
        ...(select === 'Others' ? {others_field: other.toLowerCase()} : {}),
        store_name: storeName,
        email: email,
      });
    },
    {
      onSuccess: res => {
        return loginForRegister.mutate({
          email: email,
          store_name: storeName,
        });
      },
      onError: error => {
        return toast({
          title: 'Oops ...',
          description: `${
            error?.response?.data?.message ??
            error?.response?.message ??
            error?.message ??
            'Something went wrong,we are working to resolve it'
          }`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  const list = ['Facebook', 'Linkedin', 'Instagram', 'Via an Agent', 'Others'];

  const handleFinish = () => {
    mutate();
  };

  return (
    <Flex h="100%" w="full" direction="column" justify={'space-between'}>
      <Flex
        h="full"
        // w='100%'
        direction="column"
        fontFamily="optimaMedium"
      >
        <Text
          fontSize={'16px'}
          fontWeight={500}
          // mt='16px'
          textAlign={'left'}
          lineHeight={'35.45px'}
          color="#101828"
        >
          Where did you hear about us?
        </Text>
        <Text
          {...themeStyles.textStyles.sl5}
          fontSize={'14px'}
          fontWeight={'400'}
          mt="4px"
          color="#475467"
        >
          Thank You!
        </Text>
        <Box position={'relative'} mt="20px">
          <Flex
            cursor={'pointer'}
            justify={'space-between'}
            align={'center'}
            px="14px"
            borderRadius={'8px'}
            onClick={() => setCollapse(!collapse)}
            fontFamily="optimaMedium"
            py="10px"
            mt="20px"
            border="1px solid #D0D5DD"
            w="full"
            fontSize={'14px'}
            lineHeight={'24px'}
            color="#667085"
            fontWeight={'400'}
            bg="#fff"
          >
            <Text>{select || 'Where did you here about us?'}</Text>
            <Box>
              {collapse ? (
                <MdKeyboardArrowDown size={30} color="#292D32" />
              ) : (
                <MdKeyboardArrowUp size={30} color="#292D32" />
              )}
            </Box>
          </Flex>
          <VStack
            mt="10px"
            align="start"
            w="full"
            display={collapse ? 'none' : 'block'}
            border={'1px solid #E4E4E4 !important'}
            borderRadius={'8px'}
            bg="matador_background.200"
            position={'absolute'}
            bottom={'-20px'}
            transform={'translateY(100%)'}
            zIndex={'1'}
          >
            {list.map(ref => (
              <Text
                key={ref}
                cursor={'pointer'}
                fontSize={'14px'}
                fontWeight={400}
                color="#1B1B1B"
                opacity={'.4'}
                px="27px"
                py="8px"
                onClick={() => {
                  setSelect(ref);
                  setCollapse(true);
                }}
                fontFamily="optimaMedium"
              >
                {ref}
              </Text>
            ))}
          </VStack>
        </Box>
        {select === 'Others' && (
          <FormTextarea
            fontFamily="optimaMedium"
            p="16px"
            h="220px"
            mt="16px"
            resize="none"
            fontSize="12.95px"
            lineHeight="15.93px"
            fontWeight="400"
            border="1px solid #E4E4E4 !important"
            borderRadius="none"
            onChange={e => setOther(e.target.value)}
            placeholder="Where did you here about us?"
          />
        )}
      </Flex>
      <Button
        isDisabled={!(other || select)}
        isLoading={isLoading || loginForRegister.isLoading}
        onClick={handleFinish}
        mt="33px"
        type="submit"
        bg="#E6192A"
        w="full"
        color="white"
      >
        Proceed
      </Button>
    </Flex>
  );
};

export default HowYouHeardSection;
