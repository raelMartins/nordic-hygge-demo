import React, {useState} from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Flex,
  Text,
  Box,
  Image,
  Center,
  Textarea,
  useToast,
  HStack,
  Stack,
} from '@chakra-ui/react';
import processingLoader from '../../images/processing-transaction.gif';
import successfulLoader from '../../images/successful-transaction.gif';
import {CloseIcon} from '@chakra-ui/icons';
import {Button} from '/src/ui-lib';
import {useMutation} from 'react-query';
import UploadImages from '../uploadImages';
import {scrollBarStyles} from '../common/ScrollBarStyles';
import {reportABug} from '../../api/navbarMenu';
import {drawer_styles, drawer_title_styles} from '../navbar/Navbar';
import isMobile from '@/utils/extras';
import {ResponsivePopup, ResponsivePopupContent} from '@/ui-lib';
import {useCustomToast} from '../CustomToast';

export const ReportBug = ({reportBugModal, onDrawerOpen}) => {
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
    reportBugModal.onClose();
  };

  const isValid = !!message.trim();

  return (
    <ResponsivePopup
      autoFocus={false}
      isCentered
      onCloseComplete={handleResetModal}
      blockScrollOnMount={true}
      onClose={reportBugModal?.onClose}
      isOpen={reportBugModal?.isOpen}
      placement={isMobile ? 'bottom' : 'right'}
    >
      <ResponsivePopupContent
        {...drawer_styles}
        // top={{base: 'auto !important', lg: 'auto !important'}}
        // bottom={{base: '0', md: '24px !important'}}
        maxH={{base: '475px', lg: `100%`}}
        borderRadius={{base: `16px 16px 0px 0px`, lg: `5px`}}
      >
        <Flex {...drawer_title_styles}>
          <Text>Spotted a bug?</Text>
          <CloseIcon
            color={'text'}
            cursor="pointer"
            fontSize="17px"
            onClick={reportBugModal?.onClose}
          />
        </Flex>

        <Box overflowY={'auto'} css={scrollBarStyles}>
          {reportMutation.isSuccess ? (
            <Center p="24px" gap={`16px`} w="full" flexDirection={'column'} textAlign={'center'}>
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
            <Stack gap={`16px`} p={{base: `10px 24px`}}>
              <Text
                color="text"
                fontSize={{base: '13px'}}
                fontWeight={500}
                letterSpacing="0.26px"
                lineHeight={`150%`}
              >
                Encountered an issue? Let us know so we can fix it for you!
              </Text>
              <Textarea
                color="text"
                onChange={e => setMessage(e.target.value)}
                value={message}
                resize="none"
                border="1px solid !important"
                borderColor="matador_border_color.100 !important"
                borderRadius={'8px'}
                w="full"
                h="113px"
                boxShadow={`0px 1px 2px 0px rgba(16, 24, 40, 0.05)`}
              />
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

              <Flex justify={'flex-end'} alignSelf={'flex-end'} align={'center'} w="full">
                <Button
                  isDisabled={!message}
                  isLoading={reportMutation.isLoading}
                  onClick={handleSubmit}
                  variation={`primary`}
                  p={`9px`}
                  fontSize={`16px`}
                  fontStyle={`normal`}
                  fontWeight={`600`}
                  lineHeight={`140%`}
                  letterSpacing={`0.48px`}
                  boxStyle={{width: `100%`}}
                >
                  Submit
                </Button>
              </Flex>
            </Stack>
          )}
        </Box>
      </ResponsivePopupContent>
    </ResponsivePopup>
  );
};

export default ReportBug;
