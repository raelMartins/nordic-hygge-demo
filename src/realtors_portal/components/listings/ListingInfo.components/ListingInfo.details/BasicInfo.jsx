import React, {Fragment, useState} from 'react';
import {
  Box,
  Center,
  Flex,
  HStack,
  Hide,
  Image as ChakraImage,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Show,
  Tag,
  TagLabel,
  Text,
  VStack,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Drawer,
  DrawerCloseButton,
} from '@chakra-ui/react';
import imageFallback from '@/realtors_portal/images/image-fallback.png';
import {ContactPersons} from './ContactPersons';
import {EmbedVideo} from '@/realtors_portal/ui-lib';

import {ListingImageCarousel} from '../../ListingsImageCarousel';

export const BasicInfo = ({listingDetail}) => {
  const [photoViewSrc, setPhotoViewSrc] = useState(
    listingDetail?.photos ? listingDetail?.photos[0]?.photo : imageFallback.src
  );
  const [direction, setDirection] = useState(0);
  const [viewId, setViewId] = useState(0);

  const handlePhotoView = (src, idx) => {
    setPhotoViewSrc(src);
    setViewId(idx);
    idx <= direction ? setDirection(-1) : setDirection(1);
  };

  return (
    <Box maxW={{lg: '710px'}} h="full">
      <Flex direction={{base: 'column', lg: 'row'}} gap="25px">
        <ListingImageCarousel
          images={listingDetail?.photo_urls || []}
          video_url={listingDetail?.youtube_url}
        />
        <ListingInformation listingDetail={listingDetail} />
      </Flex>
      <HStack justify="space-between" alignItems="baseline" w="full">
        <ContactPersons contactPerson={listingDetail?.contact_persons} />
      </HStack>
    </Box>
  );
};
export default BasicInfo;

export const AnimateImagePresence = ({
  sourceUrl,
  refetch,
  videoUrl,
  layoutId,
  onClick = () => {},
  ...rest
}) => {
  const modal_disclosure = useDisclosure();
  const drawer_disclosure = useDisclosure();
  const variants = {
    enter: direction => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 1,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: direction => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  const handleClick = () => {
    modal_disclosure.onOpen();
    // onClick();
  };

  const handleClickMobile = () => {
    drawer_disclosure.onOpen();
    // onClick();
  };

  return (
    // <AnimatePresence >
    <>
      <Box
        variants={variants}
        transition={{
          x: {type: 'spring', stiffness: 300, damping: 30},
          opacity: 1,
          duration: 1.2,
        }}
        drag="x"
        dragConstraints={{left: 0, right: 0}}
        dragElastic={1}
        layoutId={layoutId}
        cursor="pointer"
      >
        {/* this is for mobile */}
        <Center
          position="relative"
          display={{base: 'flex', lg: 'none'}}
          w="100%"
          aspectRatio={'430 / 364'}
          overflow={'hidden'}
          {...rest}
        >
          <ChakraImage
            src={sourceUrl || imageFallback.src}
            alt=""
            minW={'100%'}
            minH="100%"
            w="100%"
            fill
            style={{objectFit: 'cover'}}
            onClick={handleClickMobile}
          />

          {videoUrl ? <EmbedVideo videoId={videoUrl?.slice(-11)} /> : null}
          <Drawer
            isOpen={drawer_disclosure.isOpen}
            onClose={drawer_disclosure.onClose}
            size={'full'}
            dark
          >
            <DrawerOverlay />
            <DrawerContent fontFamily="Euclid Circular B " bg="#222222">
              <DrawerCloseButton fontSize={`20px`} color="#FFFFFF" zIndex={`800000`} />
              <DrawerBody p="0px">
                <Center position="relative" w="100%" overflow={'hidden'} h={`100%`}>
                  <ChakraImage
                    alt=""
                    src={sourceUrl || imageFallback.src}
                    objectFit={'cover'}
                    // lazy={true}
                    {...rest}
                  />
                </Center>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Center>

        {/* this is for pc/laptop */}
        <Box position="relative" display={{base: 'none', lg: 'block'}}>
          <ChakraImage
            alt=""
            // h="380px"
            w="full"
            maxW={{lg: '465px'}}
            src={sourceUrl || imageFallback.src}
            objectFit={'cover'}
            borderRadius={{lg: '36px'}}
            lazy={true}
            onClick={handleClick}
            {...rest}
          />

          {videoUrl ? <EmbedVideo videoId={videoUrl?.slice(-11)} /> : null}
          <Modal
            isOpen={modal_disclosure.isOpen}
            onClose={modal_disclosure.onClose}
            isCentered
            // mt="20vh"
            zIndex="2000"
            size={'2xl'}
          >
            <ModalOverlay />
            <ModalContent fontFamily="Euclid Circular B " bg="transparent" boxShadow={'none'}>
              <ModalBody maxW="80vw" minW={'300px'} bg="teal" p="0px" mx="auto">
                <Center position="relative" w="100%" overflow={'hidden'}>
                  <ChakraImage
                    alt=""
                    src={sourceUrl || imageFallback.src}
                    objectFit={'cover'}
                    // lazy={true}
                    {...rest}
                  />
                </Center>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </>
    // </AnimatePresence>
  );
};

const ListingInformation = ({listingDetail}) => {
  return (
    <Fragment>
      <Show above="lg">
        <VStack align="flex-start" spacing="38px" mt="28px" w="200px">
          <Box w="full">
            <Text fontSize="32px" fontWeight={500} color="#191919" lineHeight={'38px'}>
              {listingDetail?.name}
            </Text>
            <Text fontSize="12px" color="#606060">
              {listingDetail?.status}
            </Text>
          </Box>
          {listingDetail?.status == 'Post Construction' && (
            <Box>
              <Text fontSize="14px" color="#606060">
                Year Built
              </Text>
              <Text fontSize="14px" fontWeight={500} color="#191919" mt={2}>
                {`${listingDetail?.end_period} ${listingDetail?.end_year}`}
              </Text>
            </Box>
          )}
          {listingDetail?.status !== 'Post Construction' &&
            listingDetail?.building_type?.toLowerCase() !== 'land' && (
              <Fragment>
                <Box>
                  <Text fontSize="14px" color="#606060">
                    Start date
                  </Text>
                  <Text fontSize="14px" fontWeight={500} color="#191919" mt={2}>
                    {`${listingDetail?.start_period} ${listingDetail?.start_year}`}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="14px" color="#606060">
                    Est. completion date
                  </Text>
                  <Text fontSize="14px" fontWeight={500} color="#191919" mt={2}>
                    {`${listingDetail?.end_period} ${listingDetail?.end_year}`}
                  </Text>
                </Box>
              </Fragment>
            )}
          {listingDetail?.payment_plan_is_available == true && (
            <Box>
              <Text fontSize="14px" color="#606060">
                Payment plan
              </Text>
              <Tag borderRadius="48px" bg="#DBFFF5" mt={2} w="98px" h="36px">
                <TagLabel color="teal" mx="auto">
                  Available
                </TagLabel>
              </Tag>
            </Box>
          )}
        </VStack>
      </Show>
      <Hide above="lg">
        <VStack align="flex-start" spacing="20px" mt={{base: `0px`, lg: '28px'}} w="full" px={6}>
          <HStack justify={'space-between'} w="full">
            <VStack alignItems={`flex-start`} gap={`4px`} w="full">
              <Text fontSize="24px" fontWeight={500} color="#191919">
                {listingDetail?.name}
              </Text>
              <Text fontSize="14px" color="#606060">
                {listingDetail?.status}
              </Text>
            </VStack>
            {listingDetail?.payment_plan_is_available == true && (
              <VStack alignItems={`flex-start`} gap={`9px`}>
                <Text fontSize="14px" color="#606060" minW={`max-content`}>
                  Payment plan
                </Text>
                <Tag borderRadius="48px" bg="#DBFFF5" p="8px 13px">
                  <TagLabel color="#08C38F" fontSize={`14px`}>
                    Available
                  </TagLabel>
                </Tag>
              </VStack>
            )}
          </HStack>
          {listingDetail?.status !== 'Post Construction' &&
            listingDetail?.building_type?.toLowerCase() !== 'land' && (
              <HStack justify={'space-between'} w="full">
                <VStack alignItems="flex-start" gap="5px">
                  <Text fontSize="14px" color="#606060">
                    Start date
                  </Text>
                  <Text fontSize="14px" fontWeight={500} color="#191919">
                    {`${listingDetail?.start_period} ${listingDetail?.start_year}`}
                  </Text>
                </VStack>
                <VStack alignItems="flex-start" gap="5px">
                  <Text fontSize="14px" color="#606060">
                    Est. completion date
                  </Text>
                  <Text fontSize="14px" fontWeight={500} color="#191919">
                    {`${listingDetail?.end_period} ${listingDetail?.end_year}`}
                  </Text>
                </VStack>
              </HStack>
            )}
        </VStack>
      </Hide>
    </Fragment>
  );
};
