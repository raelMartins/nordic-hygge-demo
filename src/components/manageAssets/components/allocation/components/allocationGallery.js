import {AspectRatio, Box, Flex, HStack, Image as ChakraImage, Text, VStack} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import house from '/src/images/houses/landing-house.png';
import {Carousel} from 'react-responsive-carousel';
import ExpandedImageForAllocation from './expandedImageForAllocation';
import galleryIcon from '/src/images/icons/gallery.svg';
import Image from 'next/image';

const AllocationGallery = ({uploads}) => {
  const [expandedImage, setExpandedImage] = useState('');
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [expandedImageSelectedSlide, setExpandedImageSelectedSlide] = useState(0);

  const handleImageExpansion = index => () => {
    setExpandedImage(true);
    return setExpandedImageSelectedSlide(index);
  };
  useEffect(() => {
    if (expandedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    // return (document.body.style.overflow = "visible");
  }, [expandedImage]);
  const customScrollbarStyle = {
    '&::-webkit-scrollbar': {
      display: 'none', // Hide the scrollbar
    },
  };
  return (
    <>
      <Carousel
        showStatus={false}
        useKeyboardArrows
        selectedItem={selectedSlide}
        w="full"
        renderIndicator={false}
        showThumbs={false}
        onChange={index => setSelectedSlide(index)}
      >
        {uploads?.map((upload, index) => (
          <>
            {/* <AspectRatio key={index} ratio={{md: 2.4, base: 1.93}}> */}
            <Box
              w="full"
              h="200px"
              bg="matador_background.100"
              borderRadius="6px"
              border="1px solid"
              borderColor={`matador_border_color.100`}
            >
              <Image
                src={upload?.image_file}
                style={{objectFit: `cover`, borderColor: `none`}}
                fill
                alt="image"
              />
            </Box>
            {/* </AspectRatio> */}
            <HStack
              h="24px"
              pos="absolute"
              role="button"
              bottom="14px"
              minW="98px"
              right="18px"
              justify="space-between"
              spacing="8px"
              bg="#191919"
              p="4px 8px"
              borderRadius="200px"
              onClick={handleImageExpansion(index)}
            >
              <ChakraImage src={galleryIcon.src} boxSize="16px" w="16px !important" />
              <Text fontSize="10.44px" fontWeight="300" color="#ffffff">
                View Image
              </Text>
            </HStack>
          </>
        ))}
      </Carousel>

      {/* <HStack
        position={'relative'}
        align={'center'}
        w="full"
        sx={customScrollbarStyle}
        overflowX="auto"
        spacing="10px"
      >
        {uploads?.map((upload, index) => (
          <Flex wrap="flex-wrap" key={index} align="center" h="full">
            <VStack
              border={selectedSlide === index ? '1.7px solid #747474' : '0.75px solid #E4E4E4'}
              width="53.036px"
              height="54px"
              borderRadius="6px"
            >
              <ChakraImage
                cursor={'pointer'}
                onClick={() => setSelectedSlide(index)}
                src={upload?.image_file}
                filter={selectedSlide === index ? '' : 'grayscale(70%)'}
                width="full"
                objectFit="cover"
                height="full"
                borderRadius="6px"
                alt="allocation image"
              />
            </VStack>
          </Flex>
        ))}
      </HStack> */}

      <ExpandedImageForAllocation
        selectedSlide={expandedImageSelectedSlide}
        setSelectedSlide={setExpandedImageSelectedSlide}
        setExpandedImage={setExpandedImage}
        expandedImage={expandedImage}
        images={uploads}
      />
    </>
  );
};

export default AllocationGallery;
