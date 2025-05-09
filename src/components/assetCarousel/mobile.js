import React, {useEffect, useRef, useState} from 'react';
import {Box, Center, Flex, Image} from '@chakra-ui/react';
import ImageGallery from 'react-image-gallery';
import backIcon from '../../images/navar/backIconMobile.svg';
import {useRouter} from 'next/router';
import AssetImagePreview from './assetImagePreview';
import {EmbedVideo} from '.';

const AssetCarouselMobile = ({
  leftItem,
  rightItem,
  videoUrl,
  slideImages,
  noBorderRadius = false,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const galleryRef = useRef();
  const router = useRouter();

  useEffect(() => {
    galleryRef.current?.play();
  }, []);

  const handleImageExpansion = index => {
    galleryRef.current?.pause();
    setShowPreview(true);
  };

  const buttonStyles = {
    zIndex: 2,
    top: '45%',
    display: 'flex',
    aspectRatio: 1 / 1,
    position: 'absolute',
    borderRadius: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'xl',
    border: '1px solid #EAEAEA',
    backgroundColor: '#FFFFFFB2',
  };

  return (
    <>
      <Box w="full" h="250px" position={`relative`}>
        <Box w="full" h="full">
          <ImageGallery
            onClick={() => handleImageExpansion()}
            showPlayButton={false}
            disableKeyDown
            ref={galleryRef}
            showNav={false}
            slideInterval={3000}
            showThumbnails={false}
            items={slideImages}
            showFullscreenButton={false}
            renderItem={item => (
              <Image
                alt=""
                borderRadius={noBorderRadius ? 'none' : '16px'}
                src={item?.original}
                objectFit={'cover'}
                w="full"
                h="250px"
              />
            )}
          />
          <Center pos={`absolute`} bottom={`5%`} right={`5%`} zIndex={2}>
            {videoUrl ? <EmbedVideo videoUrl={videoUrl} /> : null}
          </Center>
        </Box>

        {/* {(leftItem || rightItem) && (
          <Box
            bg="linear-gradient(3.29deg, #000000 -19.04%, rgba(0, 0, 0, 0) 97.48%)"
            h="90px"
            w="full"
            right="0"
            bottom="0"
            position={'absolute'}
            zIndex={0}
            borderBottomRightRadius="xl"
            borderBottomLeftRadius="xl"
          />
        )}
        <Flex
          h="20%"
          w="full"
          position={'absolute'}
          bottom="0"
          right="0"
          zIndex={50}
          px="20px"
          pb="18px"
          align={'center'}
          justify={'space-between'}
        >
          {leftItem}
          {rightItem}
        </Flex> */}
      </Box>

      <AssetImagePreview
        slideImages={slideImages}
        setShowPreview={setShowPreview}
        showPreview={showPreview}
      />
    </>
  );
};

export default AssetCarouselMobile;
