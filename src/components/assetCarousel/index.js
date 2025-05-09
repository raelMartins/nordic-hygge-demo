import React, {useEffect, useRef, useState} from 'react';
import {
  Box,
  Text,
  Flex,
  HStack,
  Image as ChakraImage,
  Skeleton,
  useDisclosure,
  Stack,
  Center,
} from '@chakra-ui/react';
import AssetImagePreview from './assetImagePreview';
import {BsImage} from 'react-icons/bs';
import {HiArrowLongLeft, HiArrowLongRight} from 'react-icons/hi2';
import videoIcon from '../../images/icons/videoIcon.svg';
import Image from 'next/image';

let timer;
const AssetCarousel = ({videoUrl, loading, slideImages, height, width, ...rest}) => {
  const galleryRef = useRef();
  const gallery_disclosure = useDisclosure();
  const [imageIndex, setImageIndex] = useState(1);

  useEffect(() => {
    const slider = galleryRef?.current;
    if (slideImages?.length === 1) return;
    let step = 1;
    // setInterval(() => {
    //   if (step == slideImages?.length) {
    //     step = 1;
    //     slider?.scrollTo(0, 0);
    //   } else {
    //     step++;
    //     slider?.scrollBy(slider?.clientWidth || 1000, 0);
    //   }
    // }, 3000);
  }, []);

  const next_slide = () => {
    const slider = galleryRef?.current;
    console.log({usereef: galleryRef?.current});
    if (imageIndex == slideImages?.length) {
      setImageIndex(1);

      slider?.scrollTo(0, 0);
    } else {
      setImageIndex(imageIndex + 1);
      slider?.scrollBy(slider?.clientWidth || 1000, 0);
    }
  };
  const previous_slide = () => {
    const slider = galleryRef?.current;
    if (imageIndex == 1) {
      setImageIndex(slideImages?.length);

      slider?.scrollTo(slider?.clientWidth * slideImages?.length, 0);
    } else {
      setImageIndex(imageIndex - 1);
      slider?.scrollBy(-slider?.clientWidth || 1000, 0);
    }
  };
  const select_slide = index => {
    const slider = galleryRef?.current;
    setImageIndex(index);
    if (index == 1) {
      slider?.scrollTo(0, 0);
    } else {
      slider?.scrollTo((index - 1) * slider?.clientWidth || 1000, 0);
    }
  };

  const handleImageExpansion = index => {
    gallery_disclosure?.onOpen();
  };

  return (
    <>
      <Box w={width || '100%'} {...rest} position={`relative`}>
        <Box
          w={width || '100%'}
          overflowX={`hidden`}
          overflowY={`hidden`}
          height={height || {base: `628px`}}
          position={'relative'}
          css={{
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          id={`image_slider`}
          scrollBehavior={`smooth`}
          scrollSnapType={`x mandatory`}
          bg={`rgba(0,0,0,.8)`}
          ref={galleryRef}
          {...rest}
        >
          <Flex w={loading ? `100%` : `${slideImages?.length}00%`} position={'relative'}>
            {loading ? (
              <Skeleton
                shadow={'sm'}
                w="full"
                h={height || {base: `628px`}}
                cursor={'pointer'}
                startColor="rgba(128,128,128,.3)"
                endColor="rgba(128,128,128,.5)"
              />
            ) : (
              slideImages?.map((slideImage, i) => (
                <Box
                  key={i}
                  // display={`${slide === i + 1 ? 'block' : 'none'}`}
                  alt="next_image"
                  w="full"
                  h={height || {base: `628px`}}
                  onClick={() => handleImageExpansion()}
                  position={`relative`}
                  scrollSnapAlign={`start`}
                >
                  <Image
                    cursor={'pointer'}
                    fill
                    style={{objectFit: `cover`}}
                    src={slideImage?.original || slideImage?.photo || slideImage}
                    alt={`Image`}
                  />
                </Box>
              ))
            )}
          </Flex>
        </Box>
        {slideImages?.length > 1 && (
          <Flex
            align={`center`}
            justify={{base: `center`, lg: `flex-end`, xl: `center`}}
            width={`100%`}
            gap={`6px`}
            p={`12px 10px`}
            position="absolute"
            bottom={`0px`}
            left={`0px`}
            right={`0px`}
            color={`#fff`}
            // transform={`translateY(100%)`}
          >
            <Center onClick={previous_slide} _hover={{scale: `1.2`}} transition={`.5s`}>
              <HiArrowLongLeft fontSize={`24px`} cursor={`pointer`} />
            </Center>
            {slideImages?.map((image, i) => (
              <Box
                key={i}
                boxSize={`20px`}
                borderRadius={`3px`}
                cursor={`pointer`}
                bg={imageIndex === i + 1 ? `text` : `matador_border_color.200`}
                onClick={() => select_slide(i + 1)}
                transition={`.3s`}
                opacity={`.7`}
              />
            ))}
            <Center onClick={next_slide} scale={`2`} _hover={{scale: `1.2`}} transition={`.5s`}>
              <HiArrowLongRight fontSize={`24px`} cursor={`pointer`} />
            </Center>
          </Flex>
        )}
      </Box>

      {/* <StatusBox total={slideImages?.length} videoUrl={videoUrl} /> */}
      {/* </Box> */}

      <AssetImagePreview disclosure={gallery_disclosure} slideImages={slideImages} />
    </>
  );
};

export default AssetCarousel;

const StatusBox = ({total, videoUrl}) => {
  return (
    <HStack position={'absolute'} bottom={'5%'} right={'5%'} zIndex={2} spacing="14px">
      <Flex
        bg={'#FFFFFFCC'}
        color={'#191919'}
        py={'8px'}
        px={'10px'}
        gap={'12px'}
        align={'center'}
        borderRadius={'5px'}
      >
        <BsImage size={'18px'} />
        <Text>
          {total} {total > 1 ? 'Photos' : 'Photo'}
        </Text>
      </Flex>
      {videoUrl ? <EmbedVideo videoUrl={videoUrl} /> : null}
    </HStack>
  );
};

export const EmbedVideo = ({videoUrl}) => {
  const iframeRef = useRef(null);
  const playRef = useRef(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const playVideo = () => {
    setIsVideoVisible(true);

    const element = playRef?.current;

    // Modify the styles or attributes
    if (element) {
      element.style.opacity = '0'; // Change opacity to 0.5 (50%)
      element.style.pointerEvents = 'none'; // Disable pointer events
      element.style.visibility = 'hidden'; // Hide the element (it won't occupy space)
    }
  };

  useEffect(() => {
    function handleFullscreenChange() {
      if (
        !document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
      ) {
        // The video is no longer in fullscreen
        setIsVideoVisible(null);
      }
    }

    // Add an event listener for fullscreenchange
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    var rx =
      /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

    const r = videoUrl.match(rx);
    const videoId = r[1];

    if (isVideoVisible) {
      // Play the video
      iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      // Request fullscreen for the iframe
      const iframe = iframeRef.current;
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    }
  }, [isVideoVisible]);

  return (
    <>
      <Flex
        bg={'#FFFFFFCC'}
        onClick={playVideo}
        py={'8px'}
        px={'10px'}
        align={'center'}
        borderRadius={'5px'}
        cursor="pointer"
      >
        <ChakraImage src={videoIcon.src} fontSize="4px" alt="youtube icon for listing" />
      </Flex>
      {isVideoVisible ? (
        <iframe
          ref={iframeRef}
          style={{
            position: `fixed`,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: '',
            width: '100%',
            height: '100%',
            maxWidth: '660px',
            maxHeight: '587px',
          }}
          controls="false"
          width="660"
          height="587"
          src={``}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      ) : null}
    </>
  );
};
