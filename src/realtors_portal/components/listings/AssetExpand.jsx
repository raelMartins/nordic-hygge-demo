import {
  Box,
  Center,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import {useEffect, useRef, useState} from 'react';
import {IoChevronBack, IoChevronForward} from 'react-icons/io5';
import imageFallback from '@/realtors_portal/images/image-fallback.png';
import {drawer_style} from '../AgentLayout/drawers/drawer_style';

export const AssetExpand = ({disclosure, images, current_image, set_current_image}) => {
  const galleryRef = useRef();
  const [screenWidth, setScreenWidth] = useState(0);
  const breakpoint = 996;

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  const next_slide = () => {
    const slider = galleryRef?.current;
    console.log({usereef: galleryRef?.current});
    if (current_image + 1 == images?.length) {
      set_current_image(0);
      setImageIndex(0);

      slider?.scrollTo(0, 0);
    } else {
      set_current_image(current_image + 1);
      setImageIndex(imageIndex + 1);
      slider?.scrollBy(slider?.clientWidth || 1000, 0);
    }
  };
  const previous_slide = () => {
    const slider = galleryRef?.current;
    if (current_image == 0) {
      set_current_image(images?.length);
      setImageIndex(images?.length);

      slider?.scrollTo(slider?.clientWidth * images?.length, 0);
    } else {
      set_current_image(current_image - 1);
      setImageIndex(imageIndex - 1);
      slider?.scrollBy(-slider?.clientWidth || 1000, 0);
    }
  };
  const select_slide = index => {
    const slider = galleryRef?.current;
    set_current_image(index);
    setImageIndex(index);
    if (index == 1) {
      slider?.scrollTo(0, 0);
    } else {
      slider?.scrollTo((index - 1) * slider?.clientWidth || 1000, 0);
    }
  };

  const BackArrow = () => {
    return (
      <VStack
        h={`100%`}
        position="absolute"
        top={'0px'}
        left={`0px`}
        bg={`transparent`}
        alignItems={`flex-end`}
        justifyContent={`center`}
        p={`20px`}
        zIndex={`1`}
        onClick={previous_slide}
        cursor={`pointer`}
        display={{
          base: imageIndex <= 0 ? 'none' : `flex`,
          lg: current_image <= 0 ? 'none' : `flex`,
        }}
      >
        <Center
          w={`40px`}
          h={`40px`}
          minW={`40px`}
          minH={`40px`}
          borderRadius={`50%`}
          bg={`rgba(255, 255, 255, .7)`}
        >
          <IoChevronBack fontSize={`20px`} />
        </Center>
      </VStack>
    );
  };
  const ForwardArrow = () => {
    return (
      <VStack
        h={`100%`}
        position="absolute"
        top={'0px'}
        right={`0px`}
        bg={`transparent`}
        alignItems={`flex-end`}
        justifyContent={`center`}
        p={`20px`}
        zIndex={`1`}
        onClick={next_slide}
        cursor={`pointer`}
        display={{
          base: imageIndex >= images.length - 1 ? 'none' : `flex`,
          lg: current_image >= images.length - 1 ? 'none' : `flex`,
        }}
      >
        <Center
          w={`40px`}
          h={`40px`}
          minW={`40px`}
          minH={`40px`}
          borderRadius={`50%`}
          bg={`rgba(255, 255, 255, .7)`}
        >
          <IoChevronForward fontSize={`20px`} />
        </Center>
      </VStack>
    );
  };
  return screenWidth < breakpoint ? (
    <Drawer isOpen={disclosure.isOpen} onClose={disclosure.onClose} size={'full'} dark>
      <DrawerOverlay />
      <DrawerContent
        {...drawer_style}
        maxW={{base: `100%`, sm: `100%`}}
        bg="#222222"
        position={`relative`}
      >
        <DrawerCloseButton fontSize={`20px`} color="#FFFFFF" zIndex={`800000`} />
        <BackArrow />
        <Box
          w={`100%`}
          h={`100%`}
          position={'relative'}
          css={{
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          id={`image_slider`}
          scrollBehavior={`smooth !important`}
          scrollSnapType={`x mandatory`}
          ref={galleryRef}
          overflow={`auto`}
        >
          <HStack w={`${images?.length}00%`} gap={`0px`} h={`100%`} my={`auto`}>
            {images?.map((el, i) => (
              <Center
                key={i}
                position="relative"
                aspectRatio={`1 / 1`}
                overflow={'hidden'}
                h={`100%`}
                flex={`1`}
                scrollSnapAlign={`start`}
              >
                <Image
                  alt=""
                  // src={images[current_image] || imageFallback.src}
                  src={el?.original || el?.photo || el}
                  fill
                  style={{objectFit: `contain`}}
                />
              </Center>
            ))}
          </HStack>
        </Box>

        <ForwardArrow />
      </DrawerContent>
    </Drawer>
  ) : (
    <Modal
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      isCentered
      // zIndex="2000"
      size={'2xl'}
    >
      <ModalOverlay />
      <ModalContent fontFamily="Euclid Circular B " bg="transparent" boxShadow={'none'}>
        <BackArrow />
        <Center position="relative" w="100%" aspectRatio={`1 / 1`} overflow={'hidden'}>
          <Image
            alt=""
            src={images[current_image] || imageFallback.src}
            fill
            style={{objectFit: `contain`}}
          />
        </Center>
        <ForwardArrow />
      </ModalContent>
    </Modal>
  );
};
