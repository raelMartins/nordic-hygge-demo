import React, {useState} from 'react';
import {Flex, VStack, Text, useToast, Box, Stack} from '@chakra-ui/react';
import {Button, FormTextarea, Radio} from '@/ui-lib/ui-lib.components';
import {store_name} from '@/constants/routes';
import {useMutation} from 'react-query';
import {AttemptLogin, outreach} from '@/api/auth';
import {themeStyles} from '@/theme';
import {CloseIcon} from '@chakra-ui/icons';
import {useCustomToast} from '@/components/CustomToast';

const ThankYou = ({setEmail, signInType, changePage, email, ...rest}) => {
  const toast = useCustomToast();
  const [select, setSelect] = useState(null);
  const [other, setOther] = useState(null);
  const isAgentorOthers = name => name === 'Others' || name === 'agent';
  const storeName = store_name();

  const loginForRegister = useMutation(formData => AttemptLogin(formData), {
    onSuccess: res => {
      if (res?.response?.data?.action == 'signup') {
        formik.resetForm();
        setEmail(email);
        changePage('successLink');
      } else if (res?.data?.action == 'login') {
        changePage('successLink');
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
        ...(select === 'agent' ? {agent_name: other.toLowerCase()} : {}),
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

  const list = [
    {name: 'Facebook', value: 'Facebook'},
    {name: 'Linkedin', value: 'Linkedin'},
    {name: 'Instagram', value: 'Instagram'},
    {name: 'Via a Consultant', value: 'agent'},
    {name: 'Others', value: 'Others'},
  ];

  const isDisabled = !select || (select === `agent` && !other) || (select === `Others` && !other);

  const handleFinish = () => {
    mutate();
  };

  return (
    <Flex h="full" direction="column" justify={'center'} align="center" gap={{base: '24px'}}>
      <Stack align={`center`} gap="4px">
        <Text
          color="text"
          fontSize={'23px'}
          fontWeight={600}
          mt="0px"
          lineHeight={`140%`}
          className="heading-text-regular"
        >
          Thank You!
        </Text>
        <Text
          fontSize={'16px'}
          fontWeight={'400'}
          mt="0px !important"
          lineHeight={`160%`}
          color={`matador_text.500`}
          letterSpacing={`.32px`}
        >
          Where did you hear about us?
        </Text>
      </Stack>
      {/* <Flex
          cursor={'pointer'}
          justify={'space-between'}
          align={'center'}
          px="14px"
          borderRadius={'0px'}
          onClick={() => setCollapse(!collapse)}
          py="10px"
          mt="20px"
          border="1px solid #D0D5DD"
          w="full"
        >
          <Text color="text">{select || 'Where did you here about us?'}</Text>
          <Box>
            {collapse ? (
              <MdKeyboardArrowDown size={30} color="#292D32" />
            ) : (
              <MdKeyboardArrowUp size={30} color="#292D32" />
            )}
          </Box>
        </Flex> */}
      <VStack
        mt="0px"
        align="start"
        w="full"
        // display={collapse ? 'none' : 'block'}
        transition={`.5s`}
        // h={collapse ? '0px' : '250px'}
        overflow={`hidden`}
        gap={`0px`}
      >
        {list.map(ref => (
          <>
            <Radio
              key={ref.name}
              px="2px"
              py="13px"
              onClick={() => {
                setSelect(ref.value);
                setOther(null);
              }}
              isActive={select === ref.value}
            >
              <Text
                color="matador_text.00"
                cursor={'pointer'}
                fontSize={'16px'}
                fontWeight={`400`}
                lineHeight={`160%`}
                letterSpacing={`0.32px`}
              >
                {ref.name}
              </Text>
            </Radio>
            {select === ref.value && (ref.value === 'Others' || ref.value === 'agent') && (
              <Box
                w="100%"
                h={select === 'Others' || select === 'agent' ? '92px' : `0px`}
                transition=".5s"
                overflow="hidden"
              >
                <FormTextarea
                  p="10px 16px"
                  w="100%"
                  h="84px"
                  mt="0px"
                  resize="none"
                  border="1px solid "
                  borderColor="matador_border_color.100"
                  onChange={e => setOther(e.target.value)}
                  placeholder={
                    select === 'agent'
                      ? `Tell us the consultant's name`
                      : 'Where did you hear about us?'
                  }
                  color={`matador_text.300`}
                  fontSize={`14px`}
                  borderRadius={`none`}
                  bg={`matador_background.100`}
                  _placeholder={{
                    color: `matador_text.300`,
                    fontSize: `14px`,
                    fontWeight: `300`,
                  }}
                />
              </Box>
            )}
          </>
        ))}
        {/* {select === 'Others' && ( */}
      </VStack>

      <Button
        variation={`primary`}
        isDisabled={isDisabled}
        isLoading={isLoading || loginForRegister.isLoading}
        // onClick={
        //   signInType === 'email_and_password' ? () => changePage('successLink') : handleFinish
        // }
        onClick={handleFinish}
        type="submit"
        fontSize={`12px`}
        lineHeight={`150%`}
        textTransform={`capitalize`}
        p={`7px 11px`}
        boxStyle={{padding: `6px 11px`, width: `100%`}}
      >
        Finish
      </Button>
    </Flex>
  );
};

export default ThankYou;
