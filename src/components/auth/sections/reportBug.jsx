import React, {useState} from 'react';
import {Flex, Image, Text, useToast, Box, Stack, Center, Textarea} from '@chakra-ui/react';
import check from '@/images/successful-transaction.gif';
import check_web from '@/images/done_green_check.gif';
import {useMutation} from 'react-query';
import {AttemptLogin} from '@/api/auth';
import {STORENAMEFROMDOMAIN, store_name} from '@/constants/routes';
import {reportABug} from '@/api/navbarMenu';
import {scrollBarStyles} from '@/components/common/ScrollBarStyles';
import {Button} from '@/ui-lib';
import UploadImages from '@/components/uploadImages';
import successfulLoader from '@/images/successful-transaction.gif';
import {auth_button_style, submit_button_style} from '../register';
import { useCustomToast } from '@/components/CustomToast';

export const ReportBug = ({changePage, ...rest}) => {
  const [message, setMessage] = useState('');
  const toast = useCustomToast();
  const [document, setDocument] = useState([]);

  const reportMutation = useMutation(reportABug, {
    onSuccess: async res => {},
    onError: err => {
      toast({
        title: 'Oops...',
        description: `${
          err?.response?.data?.message ??
          err?.response?.message ??
          err?.response?.data[0] ??
          'Something went wrong'
        }`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleSubmit = () => {
    if (!isValid)
      return toast({
        description: `Please leave a comment`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    const image = document.map(item => item?.image.replace('data:', '').replace(/^.+,/, ''));
    const body = {image, message, error: ''};
    return reportMutation.mutate(body);
  };

  const handleResetModal = () => {
    setMessage('');
    setDocument([]);
    reportMutation.reset();
    changePage('signInOptions');
  };

  const isValid = !!message.trim();

  return (
    <Box overflowY={'auto'} css={scrollBarStyles}>
      {reportMutation.isSuccess ? (
        <Center gap={`16px`} w="full" flexDirection={'column'} textAlign={'center'}>
          <Image alt="success" w="150px" h="150px" src={successfulLoader.src} mx="auto" />
          <Text
            color="text"
            fontWeight={700}
            fontSize={'23px'}
            className="heading-text-regular"
            lineHeight={`140%`}
          >
            Thank you
          </Text>
          <Text color={'text'} fontSize={'16px'} fontWeight="400">
            Our technical team will review and get back to you as soon as possible
          </Text>
          <Button
            disabled={reportMutation.isLoading}
            loading={reportMutation.isLoading}
            onClick={handleResetModal}
            variation={`primary`}
            p={`9px`}
            fontSize={`16px`}
            fontStyle={`normal`}
            fontWeight={`600`}
            lineHeight={`140%`}
            letterSpacing={`0.48px`}
            boxStyle={{width: `100%`}}
          >
            Finish
          </Button>
        </Center>
      ) : (
        <Stack gap={`16px`}>
          <Stack gap={`4px`}>
            <Text
              fontSize={'23px'}
              textAlign={`center`}
              fontWeight={600}
              color="text"
              className="heading-text-regular"
            >
              Report A Bug
            </Text>
            <Text
              color={`matador_text.400)`}
              textAlign={`center`}
              fontSize={`12px`}
              fontWeight={`500`}
              lineHeight={`140%`} /* 16.8px */
              letterSpacing={`0.12px`}
              maxW={`90%`}
              mx={`auto`}
            >
              Encountered a bug? Let us know! Our team will investigate and work to resolve this
              issue asap.{' '}
            </Text>
          </Stack>
          <Stack>
            <Text
              color="text"
              fontSize={{base: '13px'}}
              fontWeight={500}
              letterSpacing="0.26px"
              lineHeight={`150%`}
            >
              Upload Image
            </Text>
            <UploadImages
              maxFiles={5}
              id="document"
              name="document"
              files={document}
              setFiles={setDocument}
              lable={'Upload image'}
              message="Upload image"
              border={'0.3px solid'}
              w="full"
              mt={0}
              borderColor={`matador_border_color.100`}
              borderRadius={`8px`}
            />
          </Stack>

          <Stack>
            <Text
              color="text"
              fontSize={{base: '13px'}}
              fontWeight={500}
              letterSpacing="0.26px"
              lineHeight={`150%`}
            >
              Comment
            </Text>
            <Textarea
              color={'text'}
              onChange={e => setMessage(e.target.value)}
              value={message}
              resize="none"
              border="0.3px solid "
              borderColor={`matador_border_color.100`}
              borderRadius={'8px'}
              w="full"
              h="105px"
              _focus={{
                outline: '.3px solid ',
                outlineColor: 'matador_text.400',
              }}
            />
          </Stack>

          <Stack justify={'flex-end'} alignSelf={'flex-end'} align={'center'} w="full">
            <Button
              isDisabled={!message}
              isLoading={reportMutation.isLoading}
              onClick={handleSubmit}
              variation={`primary`}
              {...submit_button_style}
            >
              Proceed
            </Button>
            {/* <Button {...auth_button_style} onClick={() => changePage('helpCenter')}>
              Go Back
            </Button> */}
          </Stack>
        </Stack>
      )}
    </Box>
  );
};
