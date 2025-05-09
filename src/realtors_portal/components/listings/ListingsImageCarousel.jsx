import {Box, Center, Grid, useDisclosure} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import imageFallback from '@/realtors_portal/images/image-fallback.png';
import Image from 'next/image';
import {AssetExpand} from './AssetExpand';
import {EmbedVideo} from '@/realtors_portal/ui-lib';

export const ListingImageCarousel = ({
  images = [],
  show_bottom_gallery = true,
  show_Slider_buttons = true,
  video_url,
  ...rest
}) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [current_image, set_current_image] = useState(0);
  const disclosure = useDisclosure();
  const breakpoint = 996;

  // const images_to_show = screenWidth < breakpoint ? 4 : 5;
  const images_to_show = 5;

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  const expand_image = () => {
    disclosure.onOpen();
  };

  const select_photo = index => {
    set_current_image(index);
  };

  return (
    <Box w={`100%`}>
      <Center
        position="relative"
        w="100%"
        aspectRatio={'583 / 360'}
        overflow={'hidden'}
        cursor={'pointer'}
        minW={{lg: '405px'}}
        borderRadius={{lg: '20px'}}
        {...rest}
      >
        <Image
          src={images?.[current_image]?.photo || images?.[current_image] || imageFallback.src}
          alt="image"
          fill
          style={{objectFit: 'cover'}}
          onClick={expand_image}
        />

        {video_url ? <EmbedVideo videoId={video_url?.slice(-11)} /> : null}
      </Center>
      {show_bottom_gallery && (
        <Grid
          gridTemplateColumns={`repeat(${images_to_show}, 1fr)`}
          gap={`8px`}
          mt={'10px'}
          padding={{base: `8px`, lg: `0px`}}
          display={{base: `none`, lg: `grid`}}
        >
          {images?.slice(0, images_to_show - 1)?.map((item, idx) => (
            <Center
              key={idx}
              aspectRatio={'1 / 1'}
              borderRadius="12px"
              overflow={'hidden'}
              cursor="pointer"
              w={`100%`}
              position={`relative`}
              onClick={() => select_photo(idx)}
            >
              <Image
                src={item?.photo || item || imageFallback.src}
                alt="image"
                fill
                style={{objectFit: `cover`}}
              />
            </Center>
          ))}
          {images?.length >= images_to_show && (
            <Center
              aspectRatio={'1 / 1'}
              borderRadius="12px"
              overflow={'hidden'}
              cursor="pointer"
              w={`100%`}
              onClick={() => {
                select_photo(images_to_show);
                expand_image();
              }}
              position={`relative`}
            >
              <Center
                pos={`absolute`}
                top={`0px`}
                left={`0px`}
                bottom={`0px`}
                right={`0px`}
                bg={`rgba(0,0,0, .7)`}
                color={`#fff`}
                fontSize={'20px'}
              >
                +
                {images?.length - (images_to_show - 1) < 100
                  ? images?.length - (images_to_show - 1)
                  : `99`}
              </Center>

              <Image
                src={images[images_to_show - 1] || imageFallback.src}
                alt="image"
                fill
                style={{objectFit: `cover`}}
              />
            </Center>
          )}
        </Grid>
      )}

      <AssetExpand
        disclosure={disclosure}
        images={images}
        current_image={current_image}
        set_current_image={set_current_image}
      />
    </Box>
  );
};
