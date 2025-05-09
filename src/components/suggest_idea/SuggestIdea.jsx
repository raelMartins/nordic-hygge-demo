import {useState} from 'react';
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
  Stack,
} from '@chakra-ui/react';
import processingLoader from '../../images/processing-transaction.gif';
import successfulLoader from '../../images/successful-transaction.gif';
import {CloseIcon} from '@chakra-ui/icons';
import {suggestAFeature} from '../../api/navbarMenu';
import {Button} from '/src/ui-lib';
import {useMutation} from 'react-query';
import {scrollBarStyles} from '../common/ScrollBarStyles';
import UploadImages from '../uploadImages';
import {drawer_styles, drawer_title_styles} from '../navbar/Navbar';
import isMobile from '@/utils/extras';
import {ResponsivePopup, ResponsivePopupContent} from '@/ui-lib';
import {timeRelativeGreeting} from '@/utils/truncateLongText';
import {useCustomToast} from '../CustomToast';

export const SuggestIdea = ({suggestModal, user, onDrawerOpen}) => {
  const [message, setMessage] = useState('');
  const toast = useCustomToast();
  const [document, setDocument] = useState([]);

  const suggestMutation = useMutation(suggestAFeature, {
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
    return suggestMutation.mutate(body);
  };

  const handleResetModal = () => {
    setMessage('');
    setDocument([]);
    suggestMutation.reset();
    suggestModal.onClose();
  };

  const isValid = !!message.trim();

  return (
    <ResponsivePopup
      autoFocus={false}
      isCentered
      onCloseComplete={handleResetModal}
      blockScrollOnMount={true}
      onClose={suggestModal?.onClose}
      isOpen={suggestModal?.isOpen}
      placement={isMobile ? 'bottom' : 'right'}
    >
      <ResponsivePopupContent
        {...drawer_styles}
        // top={{base: 'auto !important', lg: 'auto !important'}}
        // bottom={{base: '0', md: '24px !important'}}
        maxH={{base: '500px', lg: `100%`}}
        borderRadius={{base: `16px 16px 0px 0px`, lg: `5px`}}
      >
        <Flex {...drawer_title_styles}>
          <Text>Help us improve!</Text>
          <CloseIcon
            color="text"
            cursor="pointer"
            fontSize="17px"
            onClick={suggestModal?.onClose}
          />
        </Flex>
        <Box overflowY={'auto'} css={scrollBarStyles} px={2} pb={`30px`}>
          {suggestMutation.isSuccess ? (
            <Center p="24px" gap={`14px`} w="full" flexDirection={'column'} textAlign={'center'}>
              <Image alt="success" w="140px" h="140px" src={successfulLoader.src} mx="auto" />
              <Text
                color="text"
                fontWeight={700}
                fontSize={'22px'}
                className="heading-text-regular"
                lineHeight={`140%`}
              >
                Thank you
              </Text>
              <Text color={'text'} fontSize={'13px'} fontWeight="400">
                We appreciate your contribution and we’d reach out to you if we need more clarity
              </Text>
              <Button
                disabled={suggestMutation.isLoading}
                loading={suggestMutation.isLoading}
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
            <Stack gap={`16px`} p={`10px 24px`}>
              <Stack>
                <Text
                  color="text"
                  fontSize={{base: '13px'}}
                  fontWeight={500}
                  letterSpacing="0.26px"
                  lineHeight={`150%`}
                >
                  <Box as={`span`} fontWeight={`700`}>
                    {timeRelativeGreeting(user?.first_name)}
                  </Box>
                  <br />
                  <br />
                  If you have any ideas to make your experience even better, we’re all ears!{' '}
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
                  borderColor={`matador_border_color.100`}
                  borderRadius={`8px`}
                />
              </Stack>

              <Flex justify={'flex-end'} align={'center'} w="full">
                <Button
                  isDisabled={!message || suggestMutation.isLoading}
                  isLoading={suggestMutation.isLoading}
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

export default SuggestIdea;
