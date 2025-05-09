import {useRef} from 'react';
import {
  AbsoluteCenter,
  Box,
  Flex,
  Image,
  TabList,
  Tabs,
  Stack,
  Text,
  VStack,
  HStack,
  Tab,
  TabIndicator,
  TabPanel,
  TabPanels,
  Input,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Center,
  useMediaQuery,
  Link,
} from '@chakra-ui/react';
import warning_icon from '/src/images/icons/warning-alert.svg';
import {fetchInvestorPackets, sendInvestorPackets} from '../../../api/payment';
import {LIGHT} from '../../../constants/names';
import {useMutation, useQuery} from 'react-query';
import {encodeFileToBase64} from '../../../utils';
import {IoChevronForward, IoCloudUploadOutline} from 'react-icons/io5';
import homeOwner from '../../../images/home-owner.svg';
import {appCurrentTheme} from '../../../utils/localStorage';
import {toastForError} from '../../../utils/toastForErrors';
import {formatDateToString} from '../../../utils/formatDate';
import EmptyState from '../../../components/appState/empty-state';
import homeOwnerLight from '../../../images/home-owner-light.svg';
import {drawer_styles, drawer_title_styles} from '@/components/navbar/Navbar';
import {
  Button,
  ResponsivePopup,
  ResponsivePopupCloseButton,
  ResponsivePopupContent,
  Spinner,
} from '@/ui-lib';
import {ArrowBackIcon} from '@chakra-ui/icons';
import {useCustomToast} from '@/components/CustomToast';

export const HomeOwnersPacket = ({equityId, modal}) => {
  const HOME__OWNERS__PACKETS = useQuery(['fetchInvestorPackets', equityId], () =>
    fetchInvestorPackets(equityId)
  );

  const [isMobile] = useMediaQuery('(max-width: 700px)');
  const inputRef = useRef(null);
  const toast = useCustomToast();
  const packetData = HOME__OWNERS__PACKETS?.data?.data;

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#ffffff',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const {mutate, isLoading} = useMutation(formData => sendInvestorPackets(equityId, formData), {
    onSuccess: async res => {
      await HOME__OWNERS__PACKETS.refetch();
      toast({
        description: `Packet Uploaded successfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      inputRef.current.value = '';
    },
    onError: err => {
      inputRef.current.value = '';
      toastForError(err, true, toast);
    },
  });

  const handleUpload = e => {
    let based = [];
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      encodeFileToBase64(files[i]).then(filed => {
        const body = {
          packet: filed.replace('data:', '').replace(/^.+,/, ''),
          packet_name: files[i]?.name,
        };
        based.push(body);
        if (files.length === based.length) {
          return mutate(based);
        }
      });
    }
  };

  const ReceivedPacket = () => {
    return (
      <>
        {packetData?.received?.length ? (
          <VStack
            // mt="20px"
            align={'stretch'}
            mx="auto"
            w="full"
            spacing="12px"
            height={'80%'}
            overflowY={'auto'}
          >
            {packetData?.received?.map((item, index) => (
              <Flex
                as={Link}
                href={item?.packet}
                target="_blank"
                key={index}
                _hover={{textDecoration: 'none'}}
                align={'center'}
                w="full"
                p={'16px'}
                border="1px solid"
                borderColor="matador_border_color.100 !important"
                gap="12px"
              >
                <Image
                  alt="next_image"
                  src={appCurrentTheme === LIGHT ? homeOwner.src : homeOwnerLight.src}
                />
                <VStack align={'flex-start'} spacing="0">
                  <Text color="text" fontWeight={500}>
                    {/* Purchase Agreement */}
                    {item?.packet_name || `Terms of Agreement`}
                  </Text>
                  {console.log({item_here: item})}
                  <Text color="text" fontSize={'12px'} fontWeight={400}>
                    {item?.added_at ? `Uploaded: ${formatDateToString(item?.added_at)}` : 'n/a'}
                  </Text>
                </VStack>
                <HStack
                  cursor={`pointer`}
                  fontSize={`11px`}
                  gap={`4px`}
                  color={`text`}
                  fontWeight={`500`}
                  ml={`auto`}
                >
                  <Text lineHeight={`140%`}>View</Text>
                  <IoChevronForward />
                </HStack>
              </Flex>
            ))}
          </VStack>
        ) : (
          <EmptyState
            icon
            text="Looks like no document has been uploaded yet"
            textSize={12}
            headerStyle={{textTransform: 'uppercase', fontWeight: 700, fontSize: '14px'}}
            height={{base: '200px', md: '300px'}}
          />
        )}
      </>
    );
  };

  const SentPacket = () => {
    return (
      <>
        {packetData?.sent?.length ? (
          <VStack
            // mt="20px"
            align={'stretch'}
            mx="auto"
            w="full"
            height={'80%'}
            overflowY="auto"
          >
            {packetData?.sent?.map((item, index) => (
              <Flex
                key={index}
                align={'center'}
                w="full"
                p={'16px'}
                border="1px solid"
                borderColor="matador_border_color.100 !important"
                gap="12px"
              >
                <Image
                  alt="next_image"
                  src={appCurrentTheme === LIGHT ? homeOwner.src : homeOwnerLight.src}
                />
                <VStack align={'flex-start'} spacing="0">
                  <Text color="text" fontWeight={500}>
                    {/* Purchase Agreement */}
                    {item?.packet_name || `Terms of Agreement`}
                  </Text>
                  <Text color="text" fontSize={'12px'} fontWeight={400}>
                    {item?.added_at ? `Uploaded: ${formatDateToString(item?.added_at)}` : 'n/a'}
                  </Text>
                </VStack>
                <HStack
                  cursor={`pointer`}
                  fontSize={`11px`}
                  gap={`4px`}
                  color={`text`}
                  fontWeight={`500`}
                  ml={`auto`}
                >
                  <Text lineHeight={`140%`}>View</Text>
                  <IoChevronForward />
                </HStack>
              </Flex>
            ))}
          </VStack>
        ) : (
          // <EmptyState text="No sent packet yet" />
          <EmptyState
            icon
            text="Looks like no document has been uploaded yet"
            textSize={12}
            headerStyle={{textTransform: 'uppercase', fontWeight: 700, fontSize: '14px'}}
            height={{base: '200px', md: '300px'}}
          />
        )}
      </>
    );
  };

  const packetTabs = [
    {
      tablist: 'Sent',
      component: <SentPacket />,
    },
    {
      tablist: 'Received',
      component: <ReceivedPacket />,
    },
  ];

  const mainContent = (
    <>
      {HOME__OWNERS__PACKETS?.isLoading ? (
        <Center minH={`300px`}>
          <AbsoluteCenter>
            <Spinner />
          </AbsoluteCenter>
        </Center>
      ) : HOME__OWNERS__PACKETS?.isError ? (
        <Center mt="50%">
          <Stack mb="40px" align="center" spacing={'14px'} direction={'column'} w="full" h="full">
            <Image boxSize="68px" src={warning_icon.src} alt="" />
            <Text fontWeight="600" fontSize="28px" lineHeight="36px" color="text">
              {`No Documents found`}
            </Text>
            <Text
              textAlign="center"
              fontWeight="400"
              fontSize="16px"
              lineHeight="20px"
              color="text"
            >
              {`There was a problem retrieving the document. Please try again.`}
            </Text>
          </Stack>
        </Center>
      ) : (
        <Box w="full" h="full">
          <Flex {...drawer_title_styles}>
            <HStack gap={`8px`}>
              <ArrowBackIcon onClick={modal?.onClose} cursor={`pointer`} />
              <Text>Documents</Text>
            </HStack>
            <ResponsivePopupCloseButton />
          </Flex>

          <Tabs isFitted variant="enclosed" align="center" isLazy h="full">
            <TabList
              bg="transparent"
              boxShadow="none"
              fontWeight="600"
              fontSize="18px"
              lineHeight="23px"
              color="text"
              maxW="100%"
              px="20px"
              py="0px"
              mt="5px"
              justifyContent={'space-between'}
              borderColor={`matador_border_color.100 !important`}
            >
              {packetTabs.map((item, index) => (
                <Tab
                  key={index}
                  wordBreak="keep-all"
                  pb="10px"
                  color="text"
                  _focusVisible={{
                    boxShadow: 'none',
                  }}
                  fontWeight={400}
                  border="none"
                  maxW="85px"
                  _selected={{color: 'text', border: 'none', fontWeight: '500'}}
                >
                  {item.tablist}
                </Tab>
              ))}
            </TabList>
            <TabIndicator
              mt="-2px"
              height="4px"
              bg="text"
              borderRadius="27px"
              borderColor={`text !important`}
            />
            <TabPanels sx={customScrollbarStyles} h="45vh" overflow="auto">
              {packetTabs.map((item, index) => (
                <TabPanel key={index} px="0px" py="18px" h="full">
                  {item.component}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      )}

      {HOME__OWNERS__PACKETS?.isError || HOME__OWNERS__PACKETS?.isLoading ? null : (
        <Box p="22px">
          <Button
            variation={`primary`}
            py="10px"
            h="45px"
            mx="auto"
            // borderRadius="4px"
            position="relative"
            w="full"
            align="center"
            cursor="pointer"
            justify="center"
            spacing="8px"
            boxStyle={{width: `100%`}}
          >
            <Input
              type="file"
              w="full"
              opacity="0"
              bg="red"
              h="full"
              position="absolute"
              ref={inputRef}
              onChange={handleUpload}
              top="0"
              cursor="pointer"
              left="0"
              accept=".pdf"
              multiple
              isDisabled={isLoading}
              _disabled={{bg: 'transparent', opacity: '0'}}
            />
            <Text fontSize="16px" fontWeight="600" lineHeight="140%">
              {isLoading ? 'Uploading...' : 'Upload Document'}
            </Text>
          </Button>
        </Box>
      )}
    </>
  );

  return (
    <ResponsivePopup
      placement="right"
      autoFocus={false}
      color="text"
      isOpen={modal?.isOpen}
      onClose={modal?.onClose}
    >
      <ResponsivePopupContent {...drawer_styles}>
        {/* <Flex {...drawer_title_styles}> */}
        {mainContent}
      </ResponsivePopupContent>
    </ResponsivePopup>
  );
};

export default HomeOwnersPacket;
