import React, {useRef} from 'react';
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
  Icon,
  DrawerCloseButton,
  Center,
  useMediaQuery,
  Link,
} from '@chakra-ui/react';
import warning_icon from '/src/images/icons/warning-alert.svg';
import {fetchInvestorPackets, sendInvestorPackets} from '../../../api/payment';
import {useMutation, useQuery} from 'react-query';
import {formatDateToString} from '../../../utils/formatDate';
import homeOnwersImage from '../../../images/home-owners-packet.svg';
import {BiCaretRight} from 'react-icons/bi';
import uploadIcon from '../../../images/icons/uploadForHomeOwnerPacket.svg';
import {encodeFileToBase64} from '../../../utils';
import {toastForError} from '../../../utils/toastForErrors';
// import isMobile from '../../../utils/extras';
import EmptyState from '../../../components/appState/empty-state';
import homeOwner from '../../../images/home-owner.svg';
import homeOwnerLight from '../../../images/home-owner-light.svg';
import {appCurrentTheme} from '../../../utils/localStorage';
import {LIGHT} from '../../../constants/names';
import {IoCloudUploadOutline} from 'react-icons/io5';
import {drawer_styles, drawer_title_styles} from '@/components/navbar/Navbar';
import {ResponsivePopup, ResponsivePopupCloseButton, ResponsivePopupContent} from '@/ui-lib';
import {useCustomToast} from '@/components/CustomToast';

export const InvestorsPacket = ({equityId, packets, modal}) => {
  const INVESTORS_PACKETS = useQuery(['fetchInvestorPackets', equityId], () =>
    fetchInvestorPackets(equityId)
  );

  const [isMobile] = useMediaQuery('(max-width: 700px)');
  const inputRef = useRef(null);
  const toast = useCustomToast();
  const packetData = INVESTORS_PACKETS?.data?.data;

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
      await INVESTORS_PACKETS.refetch();
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
                  <Text className="heading-text-regular" color="text" fontWeight={500}>
                    {/* Purchase Agreement */}
                    {item?.packet_name || `Terms of Agreement`}
                  </Text>
                  <Text color="text" fontSize={'12px'} fontWeight={400}>
                    {item?.added_at ? `Uploaded: ${formatDateToString(item?.added_at)}` : 'n/a'}
                  </Text>
                </VStack>
              </Flex>
            ))}
          </VStack>
        ) : (
          <EmptyState
            icon
            text="No home owner's packet has been uploaded yet"
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
                  <Text className="heading-text-regular" color="text" fontWeight={500}>
                    {/* Purchase Agreement */}
                    {item?.packet_name || `Terms of Agreement`}
                  </Text>
                  <Text color="text" fontSize={'12px'} fontWeight={400}>
                    {item?.added_at ? `Uploaded: ${formatDateToString(item?.added_at)}` : 'n/a'}
                  </Text>
                </VStack>
              </Flex>
            ))}
          </VStack>
        ) : (
          // <EmptyState text="No sent packet yet" />
          <EmptyState
            icon
            text="No investor's packet has been uploaded yet"
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
      tablist: 'Received',
      component: <ReceivedPacket />,
    },
    {
      tablist: 'Sent',
      component: <SentPacket />,
    },
  ];

  const mainContent = (
    <>
      {/* {INVESTORS_PACKETS?.isLoading ? (
        <Center minH={`300px`}>
          <AbsoluteCenter>
            <Spinner />
          </AbsoluteCenter>
        </Center>
      ) : INVESTORS_PACKETS?.isError ? (
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
      ) : ( */}
      {
        <Box w="full" h="full">
          <Flex {...drawer_title_styles}>
            <Text>Documents</Text>
            {/* <CloseIcon cursor={'pointer'} onClick={modal.onClose} fontSize={'16px'} /> */}
            <ResponsivePopupCloseButton position="initial" onClick={modal.onClose} />
          </Flex>

          <Box sx={customScrollbarStyles} h="45vh" overflow="auto">
            {/* {packetTabs.map((item, index) => (
                <TabPanel key={index} px="0px" py="18px" h="full">
                  {item.component}
                </TabPanel>
              ))} */}
            {packets?.length ? (
              <VStack
                // mt="20px"
                align={'stretch'}
                mx="auto"
                w="full"
                spacing="12px"
                height={'80%'}
                overflowY={'auto'}
              >
                {packets?.map((item, index) => (
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
                      <Text className="heading-text-regular" color="text" fontWeight={500}>
                        {/* Purchase Agreement */}
                        {item?.packet_name || `Terms of Agreement`}
                      </Text>
                      <Text color="text" fontSize={'12px'} fontWeight={400}>
                        {item?.added_at ? `Uploaded: ${formatDateToString(item?.added_at)}` : 'n/a'}
                      </Text>
                    </VStack>
                  </Flex>
                ))}
              </VStack>
            ) : (
              <EmptyState
                icon
                text="No investor's packet has been uploaded yet"
                textSize={12}
                headerStyle={{textTransform: 'uppercase', fontWeight: 700, fontSize: '14px'}}
                height={{base: '200px', md: '300px'}}
              />
            )}
          </Box>
        </Box>
      }
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
      <ResponsivePopupContent {...drawer_styles}>{mainContent}</ResponsivePopupContent>
    </ResponsivePopup>
  );
};

export default InvestorsPacket;
